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

The backend uses the following values in `backend/.env`:

- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — JWT signing secret
- `GOOGLE_GEMINI_API_KEY` — Gemini API key
- `PORT` — backend server port

## API Endpoints

### Auth
- `POST /api/auth/register` — register a new user
- `POST /api/auth/login` — login and receive token
- `GET /api/auth/team` — get team members (protected)

### Tasks
- `POST /api/tasks` — create a task (`Manager` only)
- `GET /api/tasks` — get all tasks (protected)
- `GET /api/tasks/:id` — get one task by id (protected)
- `PUT /api/tasks/:id` — update task status or metadata (protected)
- `DELETE /api/tasks/:id` — delete task (`Manager` only)
- `POST /api/tasks/ai-optimize` — generate AI insights for a task (protected)
- `PUT /api/tasks/:id/ai-update` — save AI insights back to a task (protected)

## License

MIT License
