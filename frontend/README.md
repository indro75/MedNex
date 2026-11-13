# MedNex Frontend — Member 1 (Frontend Developer)

React 19 + TypeScript + Vite + Tailwind CSS v4 client for the MedNex platform. Part of the team work distribution in [../TEAM_WORK_DISTRIBUTION.md](../TEAM_WORK_DISTRIBUTION.md) — feature branch: `feature/frontend`.

## Member 1 responsibilities (from the team distribution)

- Build the user interface using React, Vite, Tailwind CSS, and React Router.
- Create the homepage, navigation, authentication screens, and responsive layouts.
- Build the symptom checker form, results screen, and specialty recommendation display.
- Create doctor search results, doctor profile cards, map view, and directions interface.
- Build the First Aid and Report Analyzer pages, including file-upload and result views.
- Create user dashboard and admin interface screens.
- Connect frontend components to backend APIs and handle loading, validation, and error states.
- Write frontend component and user-flow tests.

## Stack

- React 19, TypeScript, Vite
- Tailwind CSS v4, Lucide React icons, Recharts
- React Router v7
- Persistence: LocalStorage timeline + REST API via [src/services/api.ts](src/services/api.ts)

## Run

```bash
cd frontend
npm install
npm run dev -- --host
```

The app launches on http://localhost:5173 and expects the backend API on port 8000 (see [../backend/README.md](../backend/README.md)).

## Layout

```
src/
├── pages/            # LandingPage, LoginPage, SignupPage, dashboard/* (7 features + overview, history, settings)
├── components/       # common/ (Navbar, Footer, EmergencyBanner, MedicalDisclaimer), dashboard/, symptom/
├── layouts/          # PublicLayout (public shell), DashboardLayout (authenticated shell)
├── context/          # AuthContext (user session/demo switcher), HealthContext (BMI & health timeline)
├── data/             # khulnaMedicalData, firstAidData, sampleReports, medicineDatabase, symptomRules
├── services/api.ts   # Backend REST client
├── types/            # Shared TypeScript interfaces
└── utils/            # reportParser, translations
```

## API integration points

The frontend talks to the backend REST API (`http://localhost:8000/api/...`). Coordinate contract changes with Member 2 (`backend/`) and data changes with Member 3 (`database/`). Note the backend is FastAPI, not Node/Express as originally specified.

## Safety-critical UI

The EmergencyBanner, MedicalDisclaimer, and red-flag triage views are medical-safety surfaces — do not weaken or remove them, and keep 999 guidance prominent (see Important Project Rules in [../TEAM_WORK_DISTRIBUTION.md](../TEAM_WORK_DISTRIBUTION.md)).
