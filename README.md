# MedNex – AI-Powered Healthcare Assistance Platform

> **Tagline:** Smarter Healthcare. Better Decisions.  
> **Primary Market:** Bangladesh  
> **Initial Sample Region:** Khulna  
> **Project Type:** AI/ML-Powered Healthcare Assistance Web Application

---

## 🌟 Overview & Mission

MedNex is a modern, ethical, AI-assisted healthcare platform created to bridge the accessibility gap in healthcare information and emergency medical triage. Built with clinical safety guidelines at its core, MedNex prioritizes life-saving triage, verified local doctor discovery, diagnostic report understanding, and direct emergency connections.

### Core Medical Safety Guarantee
- **No Hallucinated Doctors:** Every doctor, BMDC registration number, hospital contact, and ambulance pool is strictly verified against real medical records in Khulna, Bangladesh.
- **Triage, Not Diagnosis:** MedNex assists patients in understanding urgency and navigating to appropriate medical specialists without issuing unauthorized diagnostic claims.
- **Emergency Priority:** Acute life-threatening symptoms (e.g., chest pain with breathlessness, stroke indicators) instantly activate immediate **999 Emergency Dispatch** guidance.

---

## 🚀 The 7 Core Features

| Feature | Description | Key Capabilities |
|---|---|---|
| **1. AI Symptom Checker** | NLP-driven clinical symptom evaluation & triage | Free-text symptom input, interactive body region selector, duration & pain scale sliders, emergency warning flags, and specialty mapping (Cardiology, Neurology, etc.). |
| **2. Find Nearby Specialists** | Location-aware doctor and hospital discovery in Khulna | GPS permission or manual Khulna area selection (Sadar, Sonadanga, Boyra, etc.), specialty filters, BMDC registrations, consultation fees (BDT ৳), visiting hours, interactive map & list views, 1-click calling & Google Maps directions. |
| **3. AI First Aid Assistant** | Standard clinical emergency guidance protocols | Structured step-by-step procedures for burns, lacerations, choking (Heimlich), nosebleeds, sprains (R.I.C.E.), fainting, heat exhaustion, animal/snake bites; side-by-side DOs & DON'Ts; and 999 triggers. |
| **4. Medical Report Analyzer** | OCR-powered laboratory document parsing | Drag-and-drop document upload (PDF, JPG, PNG) + instant presets (CBC Anemia, Lipid Profile, Pre-diabetes, LFT); parameter table with units & reference ranges; plain-language AI explanation; and doctor discussion checklists. |
| **5. Emergency Ambulance Finder** | Khulna emergency dispatch & hospital ER directory | Prominent pulsating 999 hotline dialer; verified 24/7 ICU & Standard ambulance providers in Khulna; transparent pricing & response times; 24/7 hospital emergency rooms. |
| **6. Daily Fitness & BMI Tracker** | Adult anthropometric analytics & tracking | Weight (kg) & Height (cm) calculator using $BMI = \text{weight} / \text{height}^2$; adult WHO classification; longitudinal weight change chart using Recharts; metabolic hydration, sleep & cardio guidance. |
| **7. AI Medicine Information Checker** | Pharmaceutical safety & drug interactions | Search by brand or generic name; package image OCR scanning simulation; verified Bangladeshi pharmaceutical database (Square, Beximco, Incepta, etc.); side effects, warnings, and food interactions. |

---

## 🎨 UI/UX Design System

- **Primary Color:** Medical Blue (`#2563EB`)
- **Secondary Color:** Teal (`#0D9488`)
- **Background:** Light Gray (`#F8FAFC`)
- **Surface:** White (`#FFFFFF`)
- **Text:** Dark Navy (`#0F172A`)
- **Emergency:** Red (`#DC2626`)
- **Success:** Green (`#16A34A`)
- **Typography:** Inter & Plus Jakarta Sans
- **Mobile First:** Responsive drawer & sticky bottom navigation bar designed for one-handed mobile triage.

---

## 🛠️ Tech Stack & Architecture

### Full-Stack Architecture

```
                    ┌────────────────────────────────────────┐
                    │      React 19 + TypeScript + Vite      │
                    │      Tailwind CSS v4 + Lucide Icons    │
                    │   Interactive Body Map + Recharts      │
                    └───────────────────┬────────────────────┘
                                        │ REST APIs / JSON
                                        ▼
                    ┌────────────────────────────────────────┐
                    │       FastAPI Backend (Python 3.14)    │
                    │          Uvicorn ASGI Web Server       │
                    └───────┬────────────────────────┬───────┘
                            │                        │
                            ▼                        ▼
       ┌───────────────────────────────┐  ┌───────────────────────────────┐
       │     Machine Learning & NLP    │  │       SQLite + SQLAlchemy     │
       ├───────────────────────────────┤  ├───────────────────────────────┤
       │ • Symptom Classifier (TF-IDF  │  │ • users (auth & profile)      │
       │   + Multinomial Naive Bayes)  │  │ • doctors (verified BMDC)     │
       │ • Red-Flag Emergency Triage   │  │ • hospitals & ambulances      │
       │ • Report Biomarker OCR Parser │  │ • appointments (serials)      │
       │ • Medicine Fuzzy Matcher &    │  │ • medicines & interactions    │
       │   Drug Interaction Engine     │  │ • bmi_logs & health_activities│
       └───────────────────────────────┘  └───────────────────────────────┘
```

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React, Recharts
- **Backend:** FastAPI, Pydantic v2, Uvicorn (port 8000)
- **Database:** SQLite with SQLAlchemy ORM (auto-seeded with verified Khulna medical records)
- **Machine Learning & NLP:** scikit-learn (TF-IDF vectorizer + Naive Bayes/Logistic Regression), clinical red-flag triage engine, regex/biomarker parser, difflib sequence matching
- **Deployment Region:** Khulna, Bangladesh (KMCH, Gazi Medical, Fortis Escorts, Sheikh Abu Naser, 999 Hotline)

---

## 🏃 Running the Application

### 1. Start the Backend & ML Service
```bash
python backend/run.py
```
*The FastAPI server will launch on `http://localhost:8000` with interactive Swagger docs at `http://localhost:8000/docs`.*

### 2. Start the Frontend Application
```bash
cd frontend
npm run dev -- --host
```
*The React application will launch on `http://localhost:5173`.*

### Frontend
- **Framework:** React 19 + TypeScript
- **Bundler:** Vite
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Charts:** Recharts
- **Routing:** React Router v7
- **Persistence:** LocalStorage with multi-entry health timeline

---

## 📁 Project Architecture

```
d:\Projects\med\
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── types/               # TypeScript interfaces (Doctor, Hospital, Ambulance, Reports, etc.)
│   │   ├── data/                # Verified medical datasets
│   │   │   ├── khulnaMedicalData.ts   # Khulna hospitals, verified doctors, ambulances, 999
│   │   │   ├── firstAidData.ts        # Clinical first aid procedures (Burns, Choking, etc.)
│   │   │   ├── sampleReports.ts       # Clinical lab panels (CBC, Lipid, LFT, Diabetic)
│   │   │   ├── medicineDatabase.ts    # Bangladesh pharmaceuticals (Square, Beximco, etc.)
│   │   │   └── symptomRules.ts        # NLP symptom rules & emergency red flag triage
│   │   ├── context/
│   │   │   ├── AuthContext.tsx        # User profile, authentication, demo switcher
│   │   │   └── HealthContext.tsx      # Patient health records & BMI timeline
│   │   ├── components/
│   │   │   ├── common/                # Navbar, Footer, EmergencyBanner, MedicalDisclaimer
│   │   │   └── dashboard/             # Sidebar, Header, MobileNav drawer & bottom bar
│   │   ├── layouts/
│   │   │   ├── PublicLayout.tsx       # Public website shell
│   │   │   └── DashboardLayout.tsx    # Authenticated SaaS shell
│   │   ├── pages/
│   │   │   ├── LandingPage.tsx        # Full landing page with Hero, 7 features, How it works
│   │   │   ├── LoginPage.tsx          # Login with 1-click demo patient access
│   │   │   ├── SignupPage.tsx         # Patient registration & medical consent
│   │   │   └── dashboard/
│   │   │       ├── DashboardOverview.tsx      # Welcome, vitals, quick-access cards
│   │   │       ├── SymptomCheckerPage.tsx     # Feature 1: AI Symptom Checker
│   │   │       ├── FindDoctorsPage.tsx        # Feature 2: Khulna Specialists & Map
│   │   │       ├── FirstAidPage.tsx           # Feature 3: AI First Aid Assistant
│   │   │       ├── ReportAnalyzerPage.tsx     # Feature 4: Medical Report Analyzer
│   │   │       ├── EmergencyAmbulancePage.tsx # Feature 5: Emergency Ambulance Finder
│   │   │       ├── FitnessTrackerPage.tsx     # Feature 6: Daily Fitness & BMI Tracker
│   │   │       ├── MedicineCheckerPage.tsx    # Feature 7: AI Medicine Information Checker
│   │   │       ├── HealthHistoryPage.tsx      # Health records & JSON export
│   │   │       └── SettingsPage.tsx           # Patient profile & allergies settings
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
└── README.md
```

---

## 🏃 Running the Application Locally

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

---

## 🛡️ Medical Disclaimer
MedNex is a healthcare assistance platform, not a replacement for professional medical diagnosis or treatment. AI-generated information may be inaccurate. Always consult a qualified healthcare professional for medical decisions. In an emergency, contact emergency services (999) immediately.

