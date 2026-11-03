from fastapi.testclient import TestClient

import main

client = TestClient(main.app)
VALID = {"name": "Sara Ali", "email": "sara@example.com", "company": "Acme", "message": "We need an Odoo module."}


def configure(monkeypatch, sent: list):
    monkeypatch.setattr(main, "SMTP_USER", "me@example.com")
    monkeypatch.setattr(main, "SMTP_PASSWORD", "secret")
    monkeypatch.setattr(main, "CONTACT_TO", "me@example.com")
    monkeypatch.setattr(main, "send_email", lambda m: sent.append(m))
    main._hits.clear()


def test_health():
    assert client.get("/health").json() == {"status": "ok"}


def test_contact_sends(monkeypatch):
    sent: list = []
    configure(monkeypatch, sent)
    res = client.post("/contact", json=VALID)
    assert res.status_code == 201 and len(sent) == 1
    assert sent[0].email == "sara@example.com"


def test_invalid_email_rejected(monkeypatch):
    configure(monkeypatch, [])
    assert client.post("/contact", json={**VALID, "email": "nope"}).status_code == 422


def test_short_message_rejected(monkeypatch):
    configure(monkeypatch, [])
    assert client.post("/contact", json={**VALID, "message": "hi"}).status_code == 422


def test_header_injection_rejected(monkeypatch):
    configure(monkeypatch, [])
    assert client.post("/contact", json={**VALID, "name": "Sara\nBcc: x@y.com"}).status_code == 422


def test_honeypot_silently_dropped(monkeypatch):
    sent: list = []
    configure(monkeypatch, sent)
    res = client.post("/contact", json={**VALID, "website": "spam.com"})
    assert res.status_code == 201 and sent == []


def test_rate_limit(monkeypatch):
    sent: list = []
    configure(monkeypatch, sent)
    codes = [client.post("/contact", json=VALID).status_code for _ in range(main.RATE_LIMIT + 1)]
    assert codes[-1] == 429 and len(sent) == main.RATE_LIMIT


def test_unconfigured_returns_503(monkeypatch):
    monkeypatch.setattr(main, "SMTP_PASSWORD", "")
    main._hits.clear()
    assert client.post("/contact", json=VALID).status_code == 503
