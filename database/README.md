# MedNex Database — Member 3 (Database Engineer)

Database design, schema, seed data, and data verification for the MedNex platform. Part of the team work distribution in [../TEAM_WORK_DISTRIBUTION.md](../TEAM_WORK_DISTRIBUTION.md) — feature branch: `feature/database`.

## Member 3 responsibilities (from the team distribution)

- Design the ER diagram and normalized PostgreSQL database schema.
  *Note: this implementation uses SQLite via SQLAlchemy ORM for development; the target production engine remains PostgreSQL.*
- Create and maintain tables for users, specialties, hospitals, doctors, symptom sessions, report metadata, first-aid guides, and saved doctors.
- Define primary keys, foreign keys, constraints, indexes, and access policies.
- Store hospital and doctor coordinates to support nearby search and map display.
- Collect and verify doctor and hospital information for the initial Khulna coverage area.
- Prepare realistic sample data for development, clearly labeling any unverified demonstration records.
- Provide SQL scripts, schema documentation, ERD, and query test cases.
- Coordinate database migrations and changes with the backend developer.

## Contents

| File | Purpose |
|---|---|
| `schema.sql` | Full SQLite DDL (9 tables + indexes), generated from `backend/app/models.py` |
| `generate_schema.py` | Regenerates `schema.sql` — run after any model change |
| `mednex.db` | Development SQLite database (verified Khulna sample data + demo accounts) |
| `../submissions/CSE4104-7A-T01_ERDiagram.pdf` | ER diagram |

## Schema overview

`users` (auth & profile) · `doctors` (BMDC-registered, coordinates for map search) · `hospitals` · `ambulances` · `medicines` · `drug_interactions` · `appointments` · `bmi_logs` · `health_activities`

Foreign keys: `appointments.user_id → users`, `appointments.doctor_id → doctors`, `bmi_logs.user_id → users`, `health_activities.user_id → users`.

## Common tasks

**Regenerate the schema** after changing `backend/app/models.py`:

```bash
python database/generate_schema.py
```

**Re-seed the dev database:** the backend seeds verified records on startup —

```bash
python backend/run.py
```

Seed source: [../backend/app/seed.py](../backend/app/seed.py). Any record not yet verified against real Khulna medical records must be labeled as unverified demonstration data (see Project Rules in [../TEAM_WORK_DISTRIBUTION.md](../TEAM_WORK_DISTRIBUTION.md)).

**Connect:** the backend reads `DATABASE_URL` (default `sqlite:///<repo-root>/database/mednex.db`). For PostgreSQL, set e.g. `DATABASE_URL=postgresql+psycopg2://user:pass@host:5432/mednex` — the schema types map directly.

## Coordination

- Table changes are shared with Member 2 (Backend) — `backend/app/models.py` is the single source of truth for the ORM schema; this folder holds the SQL export and the dev database.
- Seed data feeds the API consumed by Member 1 (Frontend) and Member 4's AI output is stored through `health_activities`.
- **Open items vs. the distribution plan:** dedicated tables for specialties, symptom sessions, report metadata, first-aid guides, and saved doctors are not yet implemented; coordinate their addition with Member 2.
