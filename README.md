# Majd Hsien – Portfolio

Personal portfolio of Majd Hosam Hsein, Senior Odoo Developer.

- `frontend/` – Next.js 16, TypeScript, Tailwind CSS 4
- `backend/` – Python FastAPI API for the contact form (sends email through Gmail SMTP)

Both deploy for free on [Vercel](https://vercel.com) as two projects from this one repository.

## Edit the content

All text (services, experience, projects, skills, links) is in `frontend/src/content.ts`.
Replace `frontend/public/majd.jpg` for the photo and `frontend/public/Majd-Hsien-CV.pdf` for the CV.

## Run locally

```bash
# backend
cd backend
pip install -r requirements.txt -r requirements-dev.txt
cp .env.example .env            # fill in SMTP_PASSWORD
uvicorn main:app --reload --port 8000
pytest                          # 8 tests

# frontend (new terminal)
cd frontend
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
npm run dev                     # http://localhost:3000
```

## Deploy on Vercel

1. Push this folder to a new GitHub repository.
2. **Backend:** Vercel → Add New Project → import the repo → set **Root Directory** to `backend`.
   Add the environment variables from `backend/.env.example`, then Deploy.
   Vercel detects FastAPI automatically. Check `https://<your-api>.vercel.app/health`.
3. **Frontend:** Add New Project → same repo → **Root Directory** `frontend`.
   Add `NEXT_PUBLIC_API_URL` (the backend URL from step 2) and `NEXT_PUBLIC_SITE_URL`, then Deploy.
4. Back in the backend project, set `ALLOWED_ORIGINS` to the frontend URL and redeploy.

Every `git push` redeploys both automatically.
