# DevSync AI Workspace

DevSync AI Workspace is an enterprise-ready Agile Kanban solution built on the MERN stack. It combines role-based workflow governance, real-time productivity visibility, and AI-enhanced task orchestration for modern product teams.

---

## Live Deployment

- Production preview: `https://dev-sync-ai-workspace.vercel.app/`
- API backend endpoint: `https://devsync-ai-workspace.onrender.com/api`

---

## What It Delivers

- Agile Kanban board with `To Do`, `In Progress`, `Review`, and `Completed` workflows
- Role-based access control with manager and developer authorization boundaries
- AI-generated task summaries and smart guidance via Google Gemini
- Secure JWT authentication and protected API routes
- High-performance dashboard metrics for instant portfolio visibility

---

## Quick Start

### Backend
```bash
cd backend
npm install
```

Create `backend/.env` with:
```text
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_GEMINI_API_KEY=your_google_gemini_api_key
```

Start the backend:
```bash
npm start
```

### Frontend
```bash
cd ../frontend
npm install
npm run dev
```

> Use the live preview above for the production-ready experience.

---

## Architecture

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express + MongoDB
- AI: Google Gemini generative services
- Auth: JWT token-based access control

---

## Notes

- Do not commit secrets to source control.
- Use environment variables for production credentials.
- Local development is supported, but the deployed workspace is the authoritative preview.

---

## License

MIT License

Tell me which of those you'd like next.
