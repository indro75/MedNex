# MEDNEX — TEAM WORK DISTRIBUTION

An AI-Powered Symptom Analysis and Doctor Discovery Platform

**Tagline:** Understand Your Symptoms. Find the Right Doctor.

| Team size | Initial coverage | Target ownership |
|---|---|---|
| 4 members | Khulna, Bangladesh | 25% per member |

## Project overview

MedNex helps users describe symptoms, understand which medical specialty may be appropriate, and discover nearby doctors. It also provides basic first-aid guidance and AI-generated overviews of uploaded medical reports. The platform is an information and navigation tool, not a replacement for professional medical care.

### Core modules

1. AI symptom analysis and specialty recommendation
2. Nearby doctor discovery with map and directions
3. First-aid guidance based on approved content
4. Medical report overview in simple language

---

## 1. Individual Responsibilities

Each member leads one major area and coordinates with the other members at integration points. All four members should understand the overall system and participate in testing, documentation, and the final presentation.

### Member 1: Frontend Developer — `frontend/`

- Build the user interface using React, Vite, Tailwind CSS, and React Router.
- Create the homepage, navigation, authentication screens, and responsive layouts.
- Build the symptom checker form, results screen, and specialty recommendation display.
- Create doctor search results, doctor profile cards, map view, and directions interface.
- Build the First Aid and Report Analyzer pages, including file-upload and result views.
- Create user dashboard and admin interface screens.
- Connect frontend components to backend APIs and handle loading, validation, and error states.
- Write frontend component and user-flow tests.

### Member 2: Backend Developer — `backend/`

- Set up the Node.js and Express server, REST API structure, and environment configuration. *(This implementation uses FastAPI + Uvicorn instead of Node.js/Express; see `backend/README.md`.)*
- Implement authentication, protected routes, and role-based authorization with the agreed auth approach.
- Develop APIs for user profiles, dashboards, symptom sessions, doctor search, first-aid content, and reports.
- Implement doctor filtering by specialty, area, and location; coordinate query requirements with the database member.
- Build secure report-upload handling and connect it to private file storage.
- Integrate the AI engineer's service through backend endpoints. Keep AI credentials on the server.
- Add input validation, rate limiting, CORS configuration, centralized error handling, and safe logging.
- Write API tests and maintain API documentation.

### Member 3: Database Engineer — `database/`

- Design the ER diagram and normalized PostgreSQL database schema. *(This implementation uses SQLite + SQLAlchemy for development; see `database/README.md`.)*
- Create and maintain tables for users, specialties, hospitals, doctors, symptom sessions, report metadata, first-aid guides, and saved doctors.
- Define primary keys, foreign keys, constraints, indexes, and access policies.
- Store hospital and doctor coordinates to support nearby search and map display.
- Collect and verify doctor and hospital information for the initial Khulna coverage area.
- Prepare realistic sample data for development, clearly labeling any unverified demonstration records.
- Provide SQL scripts, schema documentation, ERD, and query test cases.
- Coordinate database migrations and changes with the backend developer.

### Member 4: AI Engineer — `ai/`

- Research and integrate the selected AI API, such as Google Gemini, through the backend. *(This implementation currently uses an offline scikit-learn ML/NLP engine; see `ai/README.md`.)*
- Develop structured symptom analysis that suggests a suitable medical specialty and explains why.
- Design safe follow-up questions and cautious urgency guidance, including escalation for red-flag symptoms.
- Build report text extraction/OCR workflow with AI-generated plain-language summaries.
- Design prompts and structured JSON outputs for reliable backend validation.
- Ground first-aid responses in approved, medically reviewed content rather than allowing unsupported AI-generated instructions.
- Create safety rules, test cases, and evaluation examples for symptom and report workflows.
- Document AI limitations, failure handling, and expected response formats.

---

## 2. Shared Responsibilities

Role ownership does not mean working in isolation. These responsibilities belong to the whole team:

| Area | Team expectation |
|---|---|
| Planning and architecture | Agree on user flows, API contracts, database relationships, module boundaries, and acceptance criteria before implementation. |
| Integration | Integrate frontend, backend, database, maps, storage, and AI in small increments. Resolve interface mismatches early. |
| Testing | Test complete user journeys, API behavior, database access, AI outputs, file uploads, responsive layouts, and failure cases. |
| Security and privacy | Use environment variables for secrets, protect private reports, validate uploads, restrict access by role, and avoid logging sensitive medical content. |
| GitHub workflow | Use feature branches and pull requests. Review changes before merging into the development branch, then release stable work to main. |
| Documentation and presentation | Maintain setup instructions, ERD, API documentation, test evidence, user guide, project report, and demo slides. Every member should be ready to explain their contribution. |

---

## 3. Suggested GitHub Workflow

Use a shared repository with a stable `main` branch and a `development` branch for integration. Each member works on a focused feature branch and opens a pull request for review.

| Branch | Purpose | Maps to folder |
|---|---|---|
| `main` | Stable, tested versions suitable for release. | — |
| `development` | Combined work before a stable release. | — |
| `feature/frontend` | Frontend pages, components, styling, and API integration. | `frontend/` |
| `feature/backend` | Express APIs, authentication, validation, and server integration. | `backend/` |
| `feature/database` | Schema, migrations, SQL scripts, and verified directory data. | `database/` |
| `feature/ai` | AI prompts, service integration, safety checks, and evaluation. | `ai/` |

Good practice: commit regularly with clear messages, link commits to tasks, review pull requests, and avoid having one person make all project changes. Contribution should be demonstrated through actual work, not assumed from the target split.

---

## 4. Suggested 8-Week Work Plan

This is a suggested sequence. Adjust the dates to match the course deadline and team availability.

| Week | Main milestones |
|---|---|
| Week 1 | Project planning, user flows, UI wireframes, backend setup, ERD draft, AI/API feasibility research. |
| Week 2 | Homepage and authentication UI, authentication APIs, initial database tables, AI provider setup. |
| Week 3 | Symptom checker interface, symptom-session APIs/tables, first version of AI symptom analysis. |
| Week 4 | Doctor search UI and APIs, specialty filters, Khulna doctor/hospital data collection and verification. |
| Week 5 | Map and geolocation integration, nearby search queries, directions interface, AI safety tests. |
| Week 6 | First-aid and report-upload interfaces, secure upload APIs, report metadata tables, report summary workflow. |
| Week 7 | User/admin dashboards, access controls, integration fixes, database optimization, end-to-end AI tests. |
| Week 8 | Full-system testing, bug fixing, deployment, documentation, presentation preparation, and final demo. |

---

## 5. Important Project Rules

- **Medical safety:** MedNex must not present AI output as a confirmed diagnosis or prescribe medication. Red-flag symptoms should trigger clear emergency guidance.
- **Verified directory:** Do not invent doctor names, qualifications, chamber addresses, or phone numbers. Mark demonstration data clearly.
- **Report privacy:** Medical reports are sensitive. Store files privately and allow access only to the authorized user and approved system roles.
- **AI reliability:** Validate structured AI responses on the backend. If the model fails or returns uncertain content, show a safe fallback.
- **Location scope:** Start with Khulna city and expand only when reliable doctor and hospital data is available.

---

## 6. Ownership and Contribution Tracking

The following is a planning target, not a claim about completed work. Actual contribution should be assessed from assigned tasks, code reviews, documentation, testing, and individual understanding.

| Member | Primary ownership | Target share | Folder |
|---|---|---|---|
| Member 1 | Frontend | 25% | `frontend/` |
| Member 2 | Backend | 25% | `backend/` |
| Member 3 | Database | 25% | `database/` |
| Member 4 | AI engineering | 25% | `ai/` |

Recommended tracking: maintain a task board with an owner, deadline, status, and evidence link for each task. Record meaningful commits and pull requests, rotate demo/testing responsibilities, and ensure every member can explain the full system at the viva.
