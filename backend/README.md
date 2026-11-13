# MedNex Backend — Member 2 (Backend Developer)

REST API server for the MedNex platform. Part of the team work distribution in [../TEAM_WORK_DISTRIBUTION.md](../TEAM_WORK_DISTRIBUTION.md) — feature branch: `feature/backend`.

## Member 2 responsibilities (from the team distribution)

- Set up the server, REST API structure, and environment configuration.
  *Note: this implementation uses FastAPI + Uvicorn (Python) rather than the originally specified Node.js/Express.*
- Implement authentication, protected routes, and role-based authorization with the agreed auth approach.
- Develop APIs for user profiles, dashboards, symptom sessions, doctor search, first-aid content, and reports.
- Implement doctor filtering by specialty, area, and location; coordinate query requirements with the database member.
- Build secure report-upload handling and connect it to private file storage.
- Integrate the AI engineer's service through backend endpoints. Keep AI credentials on the server.
- Add input validation, rate limiting, CORS configuration, centralized error handling, and safe logging.
- Write API tests and maintain API documentation.

## Stack

- FastAPI, Pydantic v2, Uvicorn (port 8000)
- SQLAlchemy ORM against SQLite in development (see [../database/README.md](../database/README.md))
- AI services imported from the top-level `ai/` package (see [../ai/README.md](../ai/README.md))
- Interactive API docs at `http://localhost:8000/docs`

## Run

```bash
python backend/run.py
```

The server launches on http://localhost:8000. On startup it creates missing tables and seeds verified sample data (`backend/app/seed.py`) into the development database at `database/mednex.db`.

Override the database with the `DATABASE_URL` environment variable; the default is `sqlite:///<repo-root>/database/mednex.db`.

## Layout

```
backend/
├── run.py             # Entrypoint: uvicorn app.main:app on 0.0.0.0:8000 (reload)
└── app/
    ├── main.py        # FastAPI app, CORS, router registration, startup seeding
    ├── database.py    # Engine/session setup, DATABASE_URL default (repo-root database/mednex.db)
    ├── models.py      # SQLAlchemy models (tables owned with Member 3)
    ├── schemas.py     # Pydantic request/response schemas
    ├── seed.py        # Idempotent seed of verified Khulna sample data
    └── routers/       # auth, doctors, hospitals, ambulances, appointments,
                       # medicines, symptoms, reports, fitness
```

## Integration with the other members

- **Member 3 (Database):** `models.py` is the shared contract. Any table change must be agreed with Member 3 and reflected in `../database/schema.sql` (regenerate with `python database/generate_schema.py`).
- **Member 4 (AI):** Routers import the `ai` package (`backend/app/routers/symptoms.py`, `medicines.py`, `reports.py`). Validate structured AI responses before returning them; if the model fails, return a safe fallback. Keep any external AI credentials server-side in environment variables — never in the frontend.

## API overview

| Route | Purpose |
|---|---|
| `POST /api/auth/signup`, `POST /api/auth/login` | Authentication |
| `GET /api/doctors`, `GET /api/hospitals`, `GET /api/ambulances` | Directory & nearby search |
| `POST /api/symptoms/analyze` | AI symptom triage (Member 4 engine) |
| `POST /api/reports/analyze` | Medical report biomarker analysis (Member 4 engine) |
| `/api/medicines`, `POST /api/medicines/interactions` | Medicine info & drug–drug interactions |
| `/api/appointments`, `/api/fitness` | Serial reservations, BMI & activity logs |
| `GET /api/health` | Health check |

Full request/response details are in the Swagger docs at `/docs` and in [../DOCUMENTATION.md](../DOCUMENTATION.md).
