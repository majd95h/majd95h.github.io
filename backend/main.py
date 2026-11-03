"""Portfolio API: receives contact-form messages and emails them to Majd.

Runs on Vercel (zero-config FastAPI) or any host that runs `uvicorn main:app`.
Configuration comes from environment variables, see .env.example.
"""

from __future__ import annotations

import os
import smtplib
import time
from collections import defaultdict, deque
from email.message import EmailMessage

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field, field_validator

SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "465"))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
CONTACT_TO = os.getenv("CONTACT_TO", SMTP_USER)
ALLOWED_ORIGINS = [
    o.strip() for o in os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",") if o.strip()
]
RATE_LIMIT = int(os.getenv("RATE_LIMIT_PER_HOUR", "5"))

app = FastAPI(title="Majd Hsien Portfolio API", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)


class ContactMessage(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    company: str = Field(default="", max_length=120)
    message: str = Field(min_length=10, max_length=5000)
    website: str = Field(default="", max_length=200)  # honeypot, must stay empty

    @field_validator("name", "company", "message")
    @classmethod
    def strip(cls, value: str) -> str:
        return value.strip()

    @field_validator("name", "company")
    @classmethod
    def single_line(cls, value: str) -> str:
        if "\n" in value or "\r" in value:
            raise ValueError("must be a single line")
        return value


# Best-effort, per-instance limit. Good enough to stop casual spam on a portfolio.
_hits: dict[str, deque[float]] = defaultdict(deque)


def _rate_limited(ip: str) -> bool:
    now = time.time()
    hits = _hits[ip]
    while hits and now - hits[0] > 3600:
        hits.popleft()
    if len(hits) >= RATE_LIMIT:
        return True
    hits.append(now)
    return False


def _client_ip(request: Request) -> str:
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def send_email(msg: ContactMessage) -> None:
    email = EmailMessage()
    email["Subject"] = f"Portfolio: message from {msg.name}"
    email["From"] = SMTP_USER
    email["To"] = CONTACT_TO
    email["Reply-To"] = msg.email
    email.set_content(
        f"Name: {msg.name}\nEmail: {msg.email}\nCompany: {msg.company or '-'}\n\n{msg.message}\n"
    )
    with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, timeout=15) as smtp:
        smtp.login(SMTP_USER, SMTP_PASSWORD)
        smtp.send_message(email)


@app.get("/")
def root() -> dict[str, str]:
    return {"service": "Majd Hsien Portfolio API", "docs": "/docs"}


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/contact", status_code=201)
def contact(msg: ContactMessage, request: Request) -> dict[str, str]:
    if msg.website:
        # Looks like a bot. Pretend it worked so it doesn't retry.
        return {"status": "sent"}
    if _rate_limited(_client_ip(request)):
        raise HTTPException(429, "Too many messages. Try again later.")
    if not (SMTP_USER and SMTP_PASSWORD and CONTACT_TO):
        raise HTTPException(503, "Email is not configured on the server yet. Email me directly instead.")
    try:
        send_email(msg)
    except (smtplib.SMTPException, OSError):
        raise HTTPException(502, "The email service did not accept the message. Email me directly instead.")
    return {"status": "sent"}
