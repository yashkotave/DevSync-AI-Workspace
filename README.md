# DevSync Workspace

DevSync Workspace is an Agile/Kanban workflow management system designed for modern engineering teams. It features a clean, GoodDay-inspired light theme and an integrated AI Sprint Assistant powered by Google Gemini.

## Project Overview

- Full MERN stack application with Express, MongoDB, React, and Tailwind CSS.
- AI Sprint Assistant generates roadmap insights, skill tags, and complexity scoring using Google Gemini.
- Kanban board for task status management, role-based access controls, and team collaboration.
- Automatic Git sync automation script for continuous push and commit updates.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Backend | Node.js, Express, MongoDB, Mongoose |
| Authentication | JWT, bcryptjs |
| AI | Google Gemini (`@google/generative-ai`) |
| Frontend | React, React Router DOM, Tailwind CSS |
| UX | Framer Motion, react-hot-toast, lucide-react |

## Feature Highlights

- Agile Kanban board with task statuses: `To Do`, `In Progress`, `Review`, `Completed`
- Role-based user management: `Manager` and `Developer`
- AI Sprint Assistant for task optimization and planning
- Task creation, status updates, and assignment workflows
- Clean GoodDay-inspired professional UI with responsive sidebar navigation

## Folder Structure

```
DevSync-AI-Workspace
├─ git-sync.js
├─ README.md
├─ backend
│  ├─ package.json
│  ├─ .env
│  ├─ config
│  │  └─ db.js
│  ├─ controllers
│  │  ├─ aiController.js
│  │  ├─ authController.js
│  │  └─ taskController.js
│  ├─ middleware
│  │  └─ authMiddleware.js
│  ├─ models
│  │  ├─ Task.js
│  │  └─ User.js
│  ├─ routes
│  │  ├─ authRoutes.js
│  │  └─ taskRoutes.js
│  └─ server.js
└─ frontend
   ├─ package.json
   ├─ tailwind.config.js
   ├─ postcss.config.js
   ├─ vite.config.js
   ├─ index.html
   ├─ src
      ├─ main.jsx
      ├─ index.css
      ├─ api
      │  └─ axios.js
      ├─ components
      │  ├─ common
      │  │  └─ ProtectedRoute.jsx
      │  ├─ dashboard
      │  │  └─ MetricCards.jsx
      │  ├─ kanban
      │  │  ├─ KanbanBoard.jsx
      │  │  └─ TaskCard.jsx
      │  ├─ layout
      │  │  ├─ Sidebar.jsx
      │  │  └─ TopHeader.jsx
      │  └─ modals
      │     ├─ CreateTaskModal.jsx
      │     └─ TaskDetailModal.jsx
      ├─ context
      │  ├─ AuthContext.jsx
      │  └─ TaskContext.jsx
      └─ pages
         ├─ DashboardPage.jsx
         └─ LoginPage.jsx
```

## Local Setup

1. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

3. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

4. Start the frontend app:
   ```bash
   cd frontend
   npm run dev
   ```

5. Run automatic git sync in a separate terminal tab:
   ```bash
   node git-sync.js
   ```

## Environment Reference

# DevSync Workspace

DevSync Workspace is an Agile/Kanban workflow management system built as a full MERN stack application. It features a clean, GoodDay-inspired light design and an integrated AI Sprint Assistant that helps teams create concise roadmaps, skill tags, and complexity scoring for tasks.

This README focuses on testing credentials, how to run and use the web application locally, core features, and recommended future enhancements.

---

## Quick Start (Local)

1. Backend

```bash
cd backend
npm install
npm start
```

The backend runs on `http://localhost:5000` by default.

2. Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend development server runs on `http://localhost:5173` by default.

3. Optional: Run the local git-sync watcher in a separate terminal (ensure remote is configured and no tokens are embedded):

```bash
node git-sync.js
```

---

## Testing Accounts (local/demo)

Use these test accounts for trying the application locally. These are sample credentials for development and testing only — do NOT use production secrets here.

- Manager
  - Email: manager@example.com
  - Password: Manager123!

- Developer 1
  - Email: dev1@example.com
  - Password: Dev123!

- Developer 2
  - Email: dev2@example.com
  - Password: Dev123!

To create these accounts quickly in development, either register via the UI or insert users directly into MongoDB with bcrypt-hashed passwords (or temporarily bypass password hashing in a local seed script).

---

## How to Use the Web Application (User Flow)

1. Sign in / Register
   - Visit `http://localhost:5173/login`.
   - Use one of the test accounts or register a new account (choose `Manager` to get the ability to create tasks).

2. Dashboard
   - After login you land on the Dashboard with metric cards and the Kanban board.
   - Metric cards show counts for Total Tasks, In Progress, Review, and Completed.

3. Create a Task (Manager only)
   - Click `+ New Task` in the top-right when logged in as a `Manager`.
   - Fill Title, Description, Priority, and Assign To (live list from `/api/auth/team`).

4. Manage Tasks (Kanban)
   - Use the quick chevron controls on task cards to move tasks between `To Do`, `In Progress`, `Review`, and `Completed`.
   - Click a card to open the Task Detail modal.

5. AI Sprint Assistant
   - Inside the Task Detail modal, open the AI Sprint Assistant panel.
   - Click `Generate AI Insights` to call the backend `POST /api/tasks/ai-optimize` endpoint. The assistant will return a 3-step roadmap, a `skillTag`, and a numeric `complexityScore` (1–10).
   - Click `Save to Task` to persist AI suggestions to the task via `PUT /api/tasks/:id/ai-update`.

6. Team Management
   - View team members via the Team section. Managers can create users via the register endpoint or through a future admin UI.

7. Notifications & User Menu
   - Use the bell icon for notifications (placeholder). Click the avatar for profile and logout.

---

## API Overview (concise)

All API responses follow the shape: `{ success: boolean, message: string, data: any }`.

Auth
- `POST /api/auth/register` — register
- `POST /api/auth/login` — login, returns token
- `GET /api/auth/team` — list team members (protected)

Tasks
- `POST /api/tasks` — create task (Manager only)
- `GET /api/tasks` — list tasks (protected)
- `GET /api/tasks/:id` — task details
- `PUT /api/tasks/:id` — update task (status, fields)
- `DELETE /api/tasks/:id` — delete task (Manager only)
- `POST /api/tasks/ai-optimize` — AI generate insights (protected)
- `PUT /api/tasks/:id/ai-update` — persist AI insights to task

---

## Core Features

- Agile Kanban board with clear columns: `To Do`, `In Progress`, `Review`, `Completed`.
- Role-based authentication: `Manager` and `Developer` with JWT-protected endpoints.
- AI Sprint Assistant: uses Google Gemini (via `@google/generative-ai`) to propose a 3-step roadmap, skill tag, and complexity score.
- Task assignment, priority badges, and AI indicator on analyzed tasks.
- Responsive GoodDay-inspired light UI with a fixed sidebar and top header.
- Metric cards with animated counts, framer-motion transitions, and react-hot-toast notifications.

---

## Testing & Development Notes

- The backend `.env` file contains the real production connection strings in this repository for demonstration. In typical workflows, you should NOT commit production secrets — use environment variables or secret managers and add `.env` to `.gitignore`.
- For local testing use a local MongoDB instance or a dedicated development Atlas database, and set `MONGO_URI` accordingly.
- If you need to seed the database with the test accounts above, create a short script to insert users with hashed passwords.

---

## Future Enhancements (Roadmap)

Short-term (next 1–3 months)
- Add server-side request validation with `Joi` or `zod` for stricter API contracts.
- Add unit and integration tests for backend controllers and frontend components.
- Add user profile editing and avatar upload.

Medium-term (3–9 months)
- Add real-time updates with WebSockets (task updates and notifications).
- Improve AI experience: allow model selection, adjustable creativity (temperature), and explainability notes.
- Add audit logs for critical actions (create/update/delete) and role-based activity history.

Long-term (9+ months)
- Integrate CI/CD with gated checks that block pushes containing secrets (and automate secret scanning pre-commit hooks).
- Add multi-workspace/multi-project support with role-based project permissions.
- Add export/import for backlog and sprint plans (CSV/JSON), and calendar sync for deadlines.

---

## Security & Secrets

- Never commit API keys, tokens, or database passwords to source control. Use environment variables or secret stores.
- Rotate secrets immediately if they are accidentally committed and follow provider guidance to revoke compromised keys.

---

## License

MIT License

---

If you'd like, I can also:

- Add a `docs/` folder with API examples and Postman collection.
- Create a small `seed.js` script to insert the test accounts into the database.
- Add CI config to run tests and secret scans on pushes.

Tell me which of those you'd like next.
