# LearnFlow

LearnFlow is a small monorepo containing a Node.js + Express backend (MySQL) and a Vite + Tailwind frontend. The project visualizes student learning progress and provides APIs for authentication, modules, progress tracking, learning paths, and subscriptions.

This README explains how to run the backend and frontend (locally or with Docker), where important files live, and the most common workflows.

**Quick Links**
- **Backend**: `backend/`
- **Frontend**: `frontend/`
- **Database SQL**: `backend/db/student_learning_db.sql`

## Quick Start (recommended: Docker)

Prerequisites: Docker & Docker Compose installed.

1. Open a terminal and run:

```powershell
cd backend
docker-compose up --build
```

2. Services started by the compose file:
- MySQL database (container name `student_learning_db`, database `student_learning_db`)
- Backend API (container name `student_learning_backend`, exposed on `localhost:5000`)

3. To stop and remove containers:

```powershell
docker-compose down
```

## Backend (local development)

Path: `backend/`

The backend is a Node.js + Express API. It uses MySQL for persistence and JWT for authentication.

Common scripts (in `backend/package.json`):
- `npm run dev` — run with `nodemon` (development)
- `npm start` — start with `node server.js` (production)

Run locally:

```powershell
cd backend
npm install

# Create a `.env` file in `backend/` with the following values (example):
# DB_HOST=localhost
# DB_USER=root
# DB_PASS=your_mysql_password
# DB_NAME=student_learning_db
# JWT_SECRET=your_jwt_secret
# JWT_EXPIRES_IN=1d
# PORT=5000

npm run dev
```

API base URL (default): `http://localhost:5000`

API overview (selected endpoints)
- `POST /api/auth/register` — register
- `POST /api/auth/login` — login
- `GET /api/modules` — list modules
- `GET /api/progress/overview` — progress overview

See `backend/README.md` for more detailed backend documentation and available endpoints.

## Frontend (local development)

Path: `frontend/`

The frontend uses Vite and Tailwind. The Vite dev server runs on the default port (usually `http://localhost:5173`).

Common scripts (in `frontend/package.json`):
- `npm run dev` — start Vite dev server
- `npm run build` — build for production
- `npm run preview` — preview built site

Run frontend locally:

```powershell
cd frontend
npm install
npm run dev
```

To create a production build:

```powershell
cd frontend
npm run build
npm run preview
```

If you run the backend with Docker (on port 5000) and the frontend with Vite, the frontend should be able to reach the API at `http://localhost:5000` (CORS is enabled in the backend).

## Database

- SQL initialization script: `backend/db/student_learning_db.sql`
- When using Docker Compose (`backend/docker-compose.yml`), the SQL script is mounted into the MySQL container and executed on first startup to create tables and seed data.

If you prefer running MySQL locally, create a database named `student_learning_db` and run the SQL file manually.

## Repository Layout (top-level)

- `backend/` — Express API, `docker-compose.yml`, `server.js`, controllers, routes, and `db/` with `student_learning_db.sql`.
- `frontend/` — Vite + Tailwind frontend source, `index.html`, `main.js`, and `src/` pages/components.
- `router/` — client-side route definitions used by the frontend

## Useful Commands

- Start backend (dev):
	- `cd backend` then `npm run dev`
- Start frontend (dev):
	- `cd frontend` then `npm run dev`
- Start both with Docker (recommended):
	- `cd backend` then `docker-compose up --build`

## Contributing

Please open issues or PRs on the repository. For code changes, make sure linting and basic testing pass and include clear commit messages.

## License

This repository does not include an explicit license file. Add a `LICENSE` if you wish to clarify reuse terms.

---

If you want, I can also:
- add a `.env.example` file under `backend/` with the expected variables
- add basic start scripts at the repo root to run both frontend and backend concurrently

Tell me which you'd like next.
