# MASTER BUILDER PROMPT: MedNex – AI-Powered Healthcare Assistance & Clinical Triage Platform

> **How to use this prompt:**  
> Copy and paste this prompt into an AI Coding Assistant (such as Antigravity, Claude Code, Cursor, or GPT-4o) to generate, scaffold, and build the entire full-stack **MedNex** healthcare platform from scratch.

---

```markdown
You are an expert Full-Stack Software Engineer, Healthcare Informatics Specialist, and UI/UX Designer.

Build a complete, production-ready, ethical, AI-assisted healthcare companion platform named **"MedNex"** (Tagline: *"Smarter Healthcare. Better Decisions"*). The platform is tailored for Bangladesh, with its initial sample deployment localized to the **Khulna Division**.

---

### 1. CORE MEDICAL SAFETY TENETS & PHILOSOPHY
Every feature must adhere to strict clinical ethics:
1. **Clinical Triage, Not Diagnosis:** The platform assists patients with urgency classification and specialist navigation. It must NEVER assert autonomous clinical diagnoses or prescribe prescription medications.
2. **Zero-Hallucination Medical Registry:** Doctor credentials, BMDC (Bangladesh Medical and Dental Council) registration numbers, chamber addresses, and ambulance phone numbers must represent verified real-world facilities in Khulna (e.g., KMCH, Gazi Medical, Sheikh Abu Naser, City Medical).
3. **Emergency Interception:** Acute life-threatening red-flag symptoms (suspected heart attack, acute stroke, massive hemorrhage, respiratory arrest) must immediately suppress conversational triage and launch a prominent, full-screen **National 999 Emergency Dispatch Modal**.
4. **Persistent Safety Disclaimers:** Visible disclaimer on all views: *"MedNex provides intelligent triage and health literacy support, not clinical diagnosis or medical prescriptions."*

---

### 2. FULL-STACK ARCHITECTURE & TECH STACK
Build a modern, decoupled client-server architecture:

#### A. Frontend (Single Page Application)
- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React (`lucide-react`)
- **Charts:** Recharts (Longitudinal weight and BMI trend analytics)
- **Routing:** React Router v7 (`react-router-dom`)
- **Audio:** Web Audio API (for acoustic 100–120 BPM CPR Metronome)
- **State Management:** React Context API (`AuthContext` and `HealthContext` with LocalStorage persistence and demo accounts)

#### B. Backend (RESTful API Service)
- **Framework:** Python 3.12+ / 3.14 with FastAPI
- **Web Server:** Uvicorn (ASGI)
- **Data Validation:** Pydantic v2 schemas
- **Database & ORM:** SQLAlchemy 2.0 ORM with SQLite (`mednex.db`) or PostgreSQL support
- **CORS:** Configured for local and production client domains

#### C. Machine Learning & Clinical NLP Tier
- **NLP Specialty Triage:** scikit-learn (`TfidfVectorizer` + `MultinomialNB`) trained on multi-class clinical symptom descriptions to predict appropriate doctor specialties (Cardiology, Neurology, Gastroenterology, Dermatology, Pediatrics, Orthopedics, Gynecology, ENT, Psychiatry, Pulmonology, General Medicine).
- **Red-Flag Rule Engine:** High-priority regular expression and keyword matcher detecting acute emergencies in < 50ms.
- **Biomarker OCR & Parser:** Document text extraction and biological reference interval evaluator for laboratory panels (CBC Anemia, Lipid Profile, Pre-Diabetes, Liver Function).
- **Pharmaceutical Engine:** Fuzzy string distance matcher (`difflib` / token ratio) for Bangladeshi pharmaceutical packaging and a reciprocal drug-drug interaction matrix.

---

### 3. UI/UX DESIGN SYSTEM & COLOR PALETTE
- **Primary Color:** Medical Blue (`#2563EB` / `bg-blue-600`)
- **Secondary / Wellness:** Teal (`#0D9488` / `bg-teal-600`)
- **Background:** Slate Canvas (`#F8FAFC` / `bg-slate-50`)
- **Cards & Surfaces:** Clean White (`#FFFFFF` / `bg-white`) with subtle borders (`border-slate-200`) and soft shadows
- **Text:** Dark Navy Slate (`#0F172A` / `text-slate-900`) and muted slate (`#64748B`)
- **Emergency Alert:** Crimson Red (`#DC2626` / `bg-red-600`)
- **Success / Normal:** Emerald Green (`#16A34A` / `bg-green-600`)
- **Warning / Moderate:** Amber (`#F59E0B` / `bg-amber-500`)
- **Typography:** Plus Jakarta Sans & Inter
- **Mobile-First Responsiveness:**
  - On mobile displays (`< md`), the top navbar MUST display the branded **MedNex** logo (`Activity` icon in blue box + `MedNex` text + `Khulna Portal` subtitle) in the top-left corner.
  - Sticky bottom tab bar navigation for mobile devices (`Home`, `Symptoms`, `999 SOS`, `Doctors`, `More`).
  - Slide-over service drawer for secondary features.

---

### 4. REPOSITORY STRUCTURE TO SCAFFOLD
```
mednex/
├── backend/
│   ├── run.py                       # Uvicorn entrypoint (port 8000)
│   └── app/
│       ├── main.py                  # FastAPI app, CORS, router registrations
│       ├── database.py              # SQLAlchemy engine, session maker, get_db
│       ├── models.py                # Database models (User, Doctor, Hospital, etc.)
│       ├── schemas.py               # Pydantic request/response validation schemas
│       ├── seed.py                  # Auto-seeder with verified Khulna datasets
│       ├── ml/
│       │   ├── symptom_classifier.py# TF-IDF + Naive Bayes NLP & Red-Flag engine
│       │   ├── report_parser.py     # Laboratory biomarker regex & reference ranges
│       │   └── medicine_matcher.py  # Fuzzy string matcher & drug interaction matrix
│       └── routers/
│           ├── auth.py              # /api/auth (Login, register, profile)
│           ├── symptoms.py          # /api/symptoms (Triage endpoint)
│           ├── doctors.py           # /api/doctors (Verified directory & filters)
│           ├── appointments.py      # /api/appointments (Chamber serial booking)
│           ├── hospitals.py         # /api/hospitals (Emergency rooms & ICU status)
│           ├── ambulances.py        # /api/ambulances (24/7 fleet & equipment)
│           ├── reports.py           # /api/reports (Biomarker OCR interpretation)
│           ├── medicines.py         # /api/medicines (Drug database & interaction check)
│           └── fitness.py           # /api/fitness (BMI logs & health activities)
└── frontend/
    ├── package.json
    ├── vite.config.ts
    ├── index.html
    └── src/
        ├── types/                   # TypeScript interfaces (Doctor, User, Report, etc.)
        ├── context/
        │   ├── AuthContext.tsx      # User profile, login, demo patient switcher
        │   └── HealthContext.tsx    # Vitals history, appointments, health timeline
        ├── data/
        │   ├── khulnaMedicalData.ts # Verified Khulna hospitals, doctors, ambulances
        │   ├── firstAidData.ts      # Clinical first aid steps & DOs/DON'Ts
        │   ├── sampleReports.ts     # CBC, Lipid, Diabetic, LFT preset panels
        │   ├── medicineDatabase.ts  # Square, Beximco, Incepta drugs & interactions
        │   └── symptomRules.ts      # Red-flag symptom dictionaries
        ├── components/
        │   ├── common/              # Navbar, Footer, EmergencyBanner, MedicalDisclaimer
        │   ├── dashboard/           # Sidebar, Header (with mobile MedNex brand), MobileNav
        │   └── symptom/             # VisualBodyMap (Interactive SVG)
        ├── layouts/
        │   ├── PublicLayout.tsx     # Shell for Landing, Login, Signup
        │   └── DashboardLayout.tsx  # Shell for Authenticated Portal
        └── pages/
            ├── LandingPage.tsx      # Hero, 7 features, testimonials, stats, CTA
            ├── LoginPage.tsx        # Sign-in with 1-click Demo Patient button
            ├── SignupPage.tsx       # Registration with Medical Disclaimer consent
            └── dashboard/
                ├── DashboardOverview.tsx      # Vitals summary, quick cards, active serial
                ├── SymptomCheckerPage.tsx     # Feature 1: AI Symptom Checker & Body Map
                ├── FindDoctorsPage.tsx        # Feature 2: Khulna Specialists & Serial Booking
                ├── FirstAidPage.tsx           # Feature 3: Clinical First Aid & CPR Metronome
                ├── ReportAnalyzerPage.tsx     # Feature 4: Medical Report OCR Analyzer
                ├── EmergencyAmbulancePage.tsx # Feature 5: 24/7 Ambulance & 999 Hotline
                ├── FitnessTrackerPage.tsx     # Feature 6: Daily Fitness & BMI Tracker
                ├── MedicineCheckerPage.tsx    # Feature 7: AI Medicine & Drug Interaction
                ├── HealthHistoryPage.tsx      # Medical timeline & JSON export
                └── SettingsPage.tsx           # Profile & allergy configuration
```

---

### 5. DETAILED FEATURE SPECIFICATIONS

#### Feature 1: AI Symptom Checker & Clinical Triage
- Input mechanisms:
  1. Free-text natural language textarea.
  2. Interactive Anatomical SVG Body Map with clickable regions (Head, Chest, Abdomen, Back, Limbs, Pelvis, Skin).
- Sliders for symptom duration (hours/days/weeks) and pain severity scale (1 to 10).
- Real-time **Red-Flag Interception**: If symptoms match acute markers (e.g., crushing chest pain with radiation to arm/jaw, acute stroke facial drooping, severe airway obstruction), immediately display a full-screen red emergency modal with single-tap **Call 999** button and Khulna ER recommendations.
- Non-emergency output: Probabilistic specialty prediction, urgency badge (`Low`, `Moderate`, `High`), and a direct "Find Specialist in Khulna" action button pre-filtering the doctor directory.

#### Feature 2: Verified Doctor Directory & Chamber Serial Booking
- Khulna specialist registry including:
  - Doctor Name, Qualifications (MBBS, FCPS, MD), BMDC Registration Number (e.g., `A-48291`), Designation (Professor, Consultant), Hospital Affiliation.
  - Chamber Address, Khulna Area (Sadar, Sonadanga, Boyra, Khalishpur, Daulatpur, Gollamari).
  - Consultation Fee in BDT (৳), Visiting Days & Hours, Direct Phone & Serial Booking Phone.
  - GPS Coordinates for interactive Google Maps directions.
- Filter doctors by Specialty, Geographic Area, and Consultation Fee.
- Chamber Serial Booking Modal: Users reserve an sequential appointment serial (e.g., Serial #14) with estimated appointment time and patient details. Active serials display prominently on the dashboard.

#### Feature 3: AI First Aid Assistant & Interactive CPR
- Structured clinical emergency protocols: Burns (Cool running water, avoid toothpaste/ice), Choking (Adult Heimlich maneuver), Severe Bleeding (Direct pressure & tourniquet rules), Sprains (R.I.C.E. protocol), Snake & Animal Bites, Heat Stroke, Fainting.
- Color-coded side-by-side **DOs and DON'Ts** to counteract dangerous folk remedies.
- Interactive **CPR Metronome**: Visual pulsing heart and rhythmic acoustic beeping at the clinically recommended rate of 100 to 120 compressions per minute using the HTML5 Web Audio API, with compression depth reminders (5–6 cm).

#### Feature 4: Medical Report Analyzer (OCR & Biomarkers)
- Drag-and-drop file upload for PDF, PNG, and JPG lab reports.
- Pre-configured one-click clinical presets for demonstration:
  - *Complete Blood Count (CBC) – Iron Deficiency Anemia*
  - *Lipid Profile – Hypercholesterolemia*
  - *Diabetic Fasting Glucose & HbA1c – Pre-Diabetes*
  - *Liver Function Test (LFT) – Elevated Transaminases*
- Parameter extraction table: Biomarker Name, Patient Result, Standard Adult Reference Interval, Unit.
- Color-coded status badges: `Normal` (Green), `Low` (Amber), `Elevated` (Orange), `Critical` (Red).
- Plain-language AI synthesis explaining what abnormal values mean in everyday terms.
- Doctor Discussion Checklist: 3–4 tailored clinical questions the patient should bring to their consultation.

#### Feature 5: Emergency Ambulance Finder & 999 Hotline
- Prominent pulsating **Emergency 999 Hotline Dialer** connecting directly to Bangladesh emergency services.
- Verified 24/7 ambulance providers in Khulna (ICU Ambulances, Basic Life Support, Neonatal ICU).
- Equipment breakdown: Oxygen cylinder, portable ventilator, cardiac monitor, suction machine.
- Transparent base pricing (BDT ৳) and realistic dispatch response times (e.g., 15–25 mins).
- Directory of 24/7 hospital emergency rooms in Khulna (KMCH, Gazi Medical, Sheikh Abu Naser, City Medical) with ICU bed availability and direct ER hotline links.

#### Feature 6: Daily Fitness & BMI Tracker
- Anthropometric calculator: Body Weight (kg) and Height (cm).
- Standard BMI calculation:
  $$\text{BMI} = \frac{\text{weight (kg)}}{[\text{height (m)}]^2}$$
- WHO Adult Categories: Underweight (< 18.5), Normal weight (18.5–24.9), Overweight (25–29.9), Obese (≥ 30).
- Basal Metabolic Rate (BMR) computation and recommended daily hydration targets.
- Longitudinal weight change tracking visualized with a responsive **Recharts** line chart.

#### Feature 7: AI Medicine Information & Drug Interaction Checker
- Verified database of common Bangladeshi commercial pharmaceuticals (Square, Beximco, Incepta, Renata, ACI, Eskayef).
- Searchable by commercial brand name (e.g., Napa, Seclo, Monas, Sergel, Ciprocin) or generic name (e.g., Paracetamol, Omeprazole, Montelukast).
- Detailed information: Strength, dosage form, manufacturer, unit retail price (BDT ৳), indications, side effects, precautions, food relations (before/after meals), pregnancy safety category.
- Simulated Medicine Box / Strip Camera OCR scanning.
- **Drug-Drug Interaction Checker**: Select two concurrent drugs and evaluate them against reciprocal contraindication rules. Output severity (`Severe / Contraindicated`, `Moderate / Caution`, `Minor / Monitor`) with clinical rationale and dosage timing advice.

#### Authentication & Health Profile
- User registration and login with encrypted password storage.
- **1-Click Demo Patient Button** on the login page for instant frictionless evaluation.
- Profile settings: Blood group, known allergies, chronic health conditions, emergency contact numbers.
- Health history timeline logging every symptom check, report analysis, appointment booking, and BMI log with JSON export.

---

### 6. DATABASE SCHEMA (SQLAlchemy ORM)
Implement the following relational tables in `backend/app/models.py`:
1. `users`: `id` (PK, UUID), `name`, `email` (UK), `password_hash`, `phone`, `age`, `gender`, `blood_group`, `city` (default "Khulna"), `emergency_contact`, `allergies` (JSON), `chronic_conditions` (JSON), `created_at`.
2. `doctors`: `id` (PK), `name`, `degrees`, `specialty`, `designation`, `hospital`, `bmdc_reg_no` (UK), `experience_years`, `chamber_address`, `area`, `consultation_fee`, `visiting_hours`, `visiting_days`, `phone`, `serial_phone`, `latitude`, `longitude`, `rating`, `verified` (bool).
3. `hospitals`: `id` (PK), `name`, `type`, `address`, `area`, `emergency_number`, `reception_number`, `has_icu` (bool), `has_emergency_ward` (bool), `ambulance_available` (bool), `total_beds`, `latitude`, `longitude`.
4. `ambulances`: `id` (PK), `name`, `type`, `base_location`, `coverage_area`, `phone`, `alternate_phone`, `available_24_7` (bool), `has_oxygen` (bool), `has_ventilator` (bool), `estimated_response_time`.
5. `appointments`: `id` (PK, UUID), `user_id` (FK -> users.id), `doctor_id` (FK -> doctors.id), `doctor_name`, `specialty`, `hospital_or_chamber`, `appointment_date`, `serial_number`, `estimated_time`, `patient_name`, `patient_phone`, `patient_age`, `symptom_summary`, `status`, `created_at`.
6. `medicines`: `id` (PK), `brand_name`, `generic_name`, `therapeutic_class`, `manufacturer`, `dosage_form`, `strength`, `price_bdt`, `indications` (JSON), `side_effects` (JSON), `precautions` (JSON), `pregnancy_category`, `food_relation`.
7. `drug_interactions`: `id` (PK, int), `drug1`, `drug2`, `severity`, `effect`, `recommendation`.
8. `bmi_logs`: `id` (PK, int), `user_id` (FK -> users.id), `date`, `weight_kg`, `height_cm`, `bmi`, `category`, `notes`, `created_at`.
9. `health_activities`: `id` (PK), `user_id` (FK -> users.id), `type`, `title`, `timestamp`, `summary`, `tag`, `severity`, `created_at`.

---

### 7. VERIFICATION & RUNNING INSTRUCTIONS
Ensure the built application executes seamlessly with these commands:
```bash
# Backend startup
cd backend
python run.py
# Server starts on http://localhost:8000 (Swagger docs at /docs)

# Frontend startup
cd frontend
npm install
npm run dev
# Client starts on http://localhost:5173
```
Build the platform completely with all verified datasets, functional components, mock fallback safety, and polished responsive design.
```
