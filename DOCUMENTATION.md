# MedNex – AI-Powered Healthcare Assistance Platform
## Complete Technical Architecture & System Documentation

---

## 1. Executive Summary & Vision

**MedNex** is a comprehensive, ethical, full-stack AI-assisted healthcare companion designed to enhance healthcare access, medical navigation, and emergency triage. Tailored for Bangladesh with its initial deployment focused on the **Khulna** metropolitan region, MedNex empowers users to interpret complex clinical symptoms, locate verified medical practitioners, comprehend diagnostic laboratory reports, acquire recognized first-aid interventions, and access immediate emergency ambulance dispatch.

### Core Medical Safety Tenets
1. **Zero-Hallucination Medical Registry:** Doctor credentials, Bangladesh Medical and Dental Council (BMDC) registration numbers, chamber locations, and ambulance contact pools are strictly verified against actual medical records in Khulna.
2. **Clinical Triage, Not Autonomous Diagnosis:** MedNex operates as an intelligent decision-support and triage system. It directs patients to proper medical specialties without asserting definitive diagnoses or altering ongoing prescriptions.
3. **Emergency Interception:** Life-threatening acute clinical patterns (e.g., suspected acute coronary syndrome, stroke, active hemorrhage, compromised airway) immediately suppress conversational flows to surface the national **999 Emergency Dispatcher** and regional emergency departments.
4. **Bilingual Accessibility:** Native support for both English and Bengali (বাংলা) for accessible healthcare navigation across all demographic sectors.

---

## 2. System Architecture & Topology

MedNex is structured as a modern decoupled multi-tier architecture composed of:
1. **Presentation Layer:** Single Page Application (SPA) built with React 19, TypeScript, Tailwind CSS v4, Lucide Icons, and Recharts.
2. **Application & API Layer:** Asynchronous high-performance RESTful API service built with Python 3.14, FastAPI, Pydantic v2, and Uvicorn.
3. **Data Layer:** Relational SQLite persistence managed through the SQLAlchemy Object-Relational Mapper (ORM), with automated database seeding.
4. **Machine Learning & NLP Services:** In-process supervised text classification pipeline (scikit-learn TF-IDF + Multinomial Naive Bayes), clinical red-flag regex evaluation engine, laboratory biomarker entity extraction, and fuzzy string distance matching.

```
┌────────────────────────────────────────────────────────────────────────┐
│                   MEDNEX CLIENT (REACT 19 + VITE)                      │
│                                                                        │
│  Landing Page   │   Visual Body Map (SVG)   │   Chamber Booking Modal  │
│  Auth Context   │   Bilingual Engine (EN/BN)│   Biomarker Gauges       │
│  Health Context │   CPR Metronome (Audio)   │   Recharts Weight Curve  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                         HTTP / REST (JSON) / CORS
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   FASTAPI REST API (PYTHON 3.14)                       │
│                                                                        │
│  /api/auth       │  /api/doctors      │  /api/appointments            │
│  /api/hospitals  │  /api/ambulances   │  /api/medicines               │
│  /api/symptoms   │  /api/reports      │  /api/fitness                 │
└───────────────┬────────────────────────────────────────┬───────────────┘
                │                                        │
                ▼                                        ▼
┌─────────────────────────────────┐    ┌─────────────────────────────────┐
│     MACHINE LEARNING ENGINE     │    │       SQLITE DATABASE           │
│                                 │    │          (mednex.db)            │
│ • TF-IDF + Naive Bayes Triage   │    │ • users & profiles              │
│ • Clinical Red-Flag Rule Engine │    │ • doctors & hospitals           │
│ • Lab Biomarker Range Parser    │    │ • ambulances & hotlines         │
│ • Medicine Fuzzy Matcher        │    │ • appointments & chamber serials│
│ • Drug-Drug Interaction Graph   │    │ • bmi_logs & health activities  │
└─────────────────────────────────┘    └─────────────────────────────────┘
```

---

## 3. Directory & File Structure

```
d:\Projects\med\
├── DOCUMENTATION.md                 # Full System Documentation (This file)
├── README.md                        # Project Overview & Quickstart Guide
├── mednex.db                        # SQLite Database with verified Khulna data
│
├── backend\                         # FastAPI Application & ML Engine
│   ├── run.py                       # Server runner script (uvicorn entrypoint)
│   └── app\
│       ├── __init__.py
│       ├── main.py                  # FastAPI application setup, CORS, route registry
│       ├── database.py              # SQLAlchemy engine, session maker, get_db yield
│       ├── models.py                # Database ORM models (SQLAlchemy)
│       ├── schemas.py               # Pydantic request & response validation schemas
│       ├── seed.py                  # Database initial seeder with Khulna medical records
│       │
│       ├── ml\                      # Machine Learning & Clinical Processing
│       │   ├── symptom_classifier.py# TF-IDF + MultinomialNB NLP classifier & Red-Flag engine
│       │   ├── report_parser.py     # Laboratory biomarker parser & reference interval evaluator
│       │   └── medicine_matcher.py  # Fuzzy string matcher for pharmaceutical packages
│       │
│       └── routers\                 # REST API Router Endpoints
│           ├── auth.py              # Authentication, login, signup, health profile
│           ├── doctors.py           # Doctor lookup, specialty & area filters
│           ├── hospitals.py         # Hospital registry, ICU & emergency room lookup
│           ├── ambulances.py        # Verified 24/7 ambulance fleets & hotlines
│           ├── appointments.py      # Doctor chamber serial booking & scheduling
│           ├── medicines.py         # Drug directory, interactions, package identification
│           ├── symptoms.py          # Symptom analysis invocation endpoint
│           ├── reports.py           # Laboratory report analysis endpoint
│           └── fitness.py           # BMI logging, BMR calculation, activity timeline
│
└── frontend\                        # React 19 Client Application
    ├── index.html                   # HTML entrypoint with Plus Jakarta Sans & Inter fonts
    ├── package.json                 # Dependencies & build scripts
    ├── tsconfig.json                # TypeScript root configuration
    ├── vite.config.ts               # Vite configuration with Tailwind CSS v4 integration
    │
    └── src\
        ├── main.tsx                 # React DOM mount point
        ├── App.tsx                  # React Router root definitions
        ├── index.css                # Tailwind CSS v4 directives & custom themes
        │
        ├── types\
        │   └── index.ts             # Complete TypeScript interface definitions
        │
        ├── services\
        │   └── api.ts               # Frontend API client service with offline fallback
        │
        ├── context\
        │   ├── AuthContext.tsx      # Authentication state & persistent profile
        │   └── HealthContext.tsx    # Appointment, BMI, and bilingual state management
        │
        ├── data\                    # Local verified datasets & reference rules
        │   ├── khulnaMedicalData.ts # Doctors, hospitals, ambulances for Khulna
        │   ├── medicineDatabase.ts  # Generic names, indications, interactions
        │   ├── firstAidData.ts      # Clinical first aid guides, timers, CPR specs
        │   ├── sampleReports.ts     # Pre-configured clinical lab report presets
        │   └── symptomRules.ts      # Red flags & symptom keyword triage rules
        │
        ├── layouts\
        │   ├── PublicLayout.tsx     # Public navbar, footer, emergency banner
        │   └── DashboardLayout.tsx  # Authenticated sidebar, top navigation, safety footer
        │
        ├── components\
        │   ├── common\              # Global shared UI components
        │   │   ├── Navbar.tsx
        │   │   ├── Footer.tsx
        │   │   ├── EmergencyBanner.tsx
        │   │   └── MedicalDisclaimer.tsx
        │   ├── dashboard\           # Dashboard layout components
        │   │   ├── Sidebar.tsx
        │   │   ├── Header.tsx
        │   │   └── MobileNav.tsx
        │   └── symptom\
        │       └── VisualBodyMap.tsx# Dual-view interactive SVG anatomical body selector
        │
        └── pages\
            ├── LandingPage.tsx      # Public landing page with features, trust, FAQ
            ├── LoginPage.tsx        # Authentication page with 1-click demo access
            ├── SignupPage.tsx       # Account creation with medical profile setup
            └── dashboard\           # Core Dashboard Functional Modules
                ├── DashboardOverview.tsx    # Summary metrics, active serials, quick actions
                ├── SymptomCheckerPage.tsx   # Interactive body map & NLP symptom analysis
                ├── FindDoctorsPage.tsx      # Doctor directory, map/list view, chamber booking
                ├── FirstAidPage.tsx         # Clinical first aid, timers, audio CPR metronome
                ├── ReportAnalyzerPage.tsx   # Biomarker gauges, upload, physician checklist
                ├── EmergencyAmbulancePage.tsx# 999 dialer, distance estimator, SMS dispatch
                ├── FitnessTrackerPage.tsx   # Metric/Imperial BMI, BMR/TDEE, Recharts timeline
                ├── MedicineCheckerPage.tsx  # Drug search, interaction checker, package scan
                ├── HealthHistoryPage.tsx    # Longitudinal activity timeline & JSON exporter
                └── SettingsPage.tsx         # User demographics, chronic conditions, emergency contacts
```

---

## 4. Machine Learning & Clinical NLP Engine

### 4.1. Module 1: NLP Symptom Classification & Specialty Triage
- **Implementation File:** `backend/app/ml/symptom_classifier.py`
- **Methodology:** Supervised Natural Language Processing utilizing a `TfidfVectorizer` (unigrams and bigrams, English stop words removed) paired with a `MultinomialNB` (Multinomial Naive Bayes) classifier.
- **Classification Categories:**
  - *Cardiology*
  - *Pulmonology / Respiratory Medicine*
  - *Gastroenterology*
  - *Neurology*
  - *Orthopedics*
  - *Dermatology*
  - *Pediatrics*
  - *ENT (Otolaryngology)*
  - *Urology / Nephrology*
  - *General Medicine*
- **Clinical Confidence & Uncertainty Handling:**
  - Softmax probabilities are calculated across all categories.
  - If the top predicted class has a confidence probability of less than 0.28, or if input symptoms are ambiguous, the system safely falls back to **General Medicine**, recommending clinical evaluation by an internist or general practitioner.
- **Urgency Classification:**
  - Categorizes patient urgency into `emergency`, `high`, `moderate`, and `low` based on severity input, symptom duration, and clinical red-flag indicators.

### 4.2. Clinical Red-Flag Rule Engine
Before running the statistical NLP classifier, input text is evaluated against a deterministic regular expression engine targeting life-threatening presentations:
1. **Suspected Acute Coronary Syndrome (ACS):** Chest pain accompanied by radiation to left arm, jaw, diaphoresis, dyspnea, or crushing pressure.
2. **Suspected Acute Stroke (FAST Criteria):** Facial drooping, slurred speech, acute unilateral extremity weakness, or sudden neurological deficits.
3. **Severe Respiratory Compromise:** Inability to maintain airway, cyanosis, stridor, or severe gasping.
4. **Active Gastrointestinal/Internal Bleeding:** Hematemesis (vomiting blood), hemoptysis (coughing blood), or melena (black tarry stool).
5. **Central Nervous System Infections:** High-grade fever combined with nuchal rigidity (stiff neck), confusion, or status epilepticus.

*Response Behavior:* If any red flag is triggered, conversational flows are bypassed, emergency status is set to `true`, confidence is set to `0.96`, and instructions immediately direct the patient to call **999** or proceed directly to **Khulna Medical College Hospital Emergency Ward**.

### 4.3. Module 2: Medical Report Parser & Biomarker Extraction
- **Implementation File:** `backend/app/ml/report_parser.py`
- **Capability:** Extracts clinical laboratory metrics from unstructured medical reports (e.g., CBC, Lipid Panels, Liver Function, Renal Function, Blood Glucose).
- **Extracted Biomarkers & Reference Ranges:**
  - *Hemoglobin (Hb):* 13.0 – 17.0 g/dL (Evaluates Anemia / Polycythemia)
  - *Total WBC Count:* 4,000 – 11,000 /cumm (Evaluates Leukocytosis / Leukopenia)
  - *Platelet Count:* 1.5 – 4.5 lakh/cumm (Thrombocytopenia warning in Dengue)
  - *Total Cholesterol:* 125.0 – 200.0 mg/dL (Atherosclerosis risk)
  - *HDL ('Good') Cholesterol:* 40.0 – 60.0 mg/dL (Cardioprotection index)
  - *LDL ('Bad') Cholesterol:* 50.0 – 100.0 mg/dL (Arterial plaque index)
  - *Triglycerides:* 50.0 – 150.0 mg/dL (Metabolic / Pancreatitis risk)
  - *HbA1c (Glycated Hemoglobin):* 4.0 – 5.7 % (Normal < 5.7%, Prediabetes 5.7–6.4%, Diabetes ≥ 6.5%)
  - *Fasting Blood Sugar (FBS):* 4.0 – 5.6 mmol/L
  - *SGPT / ALT:* 7.0 – 45.0 U/L (Hepatocellular injury / Fatty liver indicator)
  - *SGOT / AST:* 8.0 – 40.0 U/L
  - *Serum Creatinine:* 0.7 – 1.2 mg/dL (Renal filtration marker)
  - *Serum Uric Acid:* 3.5 – 7.2 mg/dL (Hyperuricemia / Gout risk)
- **Output:** Categorizes every identified value as `Normal`, `Low`, `High`, or `Critical`. Generates an overall clinical summary and a customized list of questions for the patient to ask their physician.

### 4.4. Module 3: Medicine Package OCR & Fuzzy Matcher
- **Implementation File:** `backend/app/ml/medicine_matcher.py`
- **Functionality:** Employs string pattern matching and `difflib.SequenceMatcher` to reconcile noisy OCR text or user typos with the verified pharmaceutical database.
- **Matching Levels:**
  - *Exact / Substring Match (Score ≥ 0.95):* Exact match found.
  - *High-Confidence Fuzzy Match (0.70 ≤ Score < 0.95):* Matches brand or generic name despite transcription errors.
  - *Low-Confidence Match (0.50 ≤ Score < 0.70):* Surfaces closest candidate while issuing a strict packaging re-verification alert.
  - *Unidentified (Score < 0.50):* Asks user to consult a registered pharmacist.

---

## 5. Database Schema & Data Models

The persistence layer uses SQLite with SQLAlchemy models defined in `backend/app/models.py`.

### 5.1. Table: `users`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | String(36) | Primary Key, Index | Unique UUID / User identifier |
| `name` | String(100) | Not Null | User's full legal name |
| `email` | String(100) | Unique, Index, Not Null | Account email address |
| `password_hash` | String(255) | Not Null | SHA-256 hashed password string |
| `phone` | String(20) | Nullable | Primary contact telephone number |
| `age` | Integer | Nullable | Age in years |
| `gender` | String(20) | Nullable | Male, Female, Other |
| `blood_group` | String(10) | Nullable | A+, A-, B+, B-, AB+, AB-, O+, O- |
| `city` | String(100) | Default 'Khulna' | City of residence |
| `emergency_contact` | String(20) | Nullable | Next of kin emergency telephone |
| `allergies` | JSON | Default `[]` | List of drug and environmental allergies |
| `chronic_conditions` | JSON | Default `[]` | List of pre-existing diagnosed conditions |
| `created_at` | DateTime | Default `utcnow` | Account creation timestamp |

### 5.2. Table: `doctors`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | String(50) | Primary Key, Index | Unique doctor slug |
| `name` | String(100) | Not Null | Doctor's full name with title |
| `degrees` | String(200) | Not Null | Academic & fellowship qualifications |
| `specialty` | String(100) | Index, Not Null | Primary clinical specialty |
| `designation` | String(200) | Not Null | Academic / Hospital appointment |
| `hospital` | String(200) | Not Null | Primary institution |
| `bmdc_reg_no` | String(50) | Unique, Not Null | Verified BMDC registration number |
| `experience_years` | Integer | Not Null | Clinical experience in years |
| `chamber_address` | Text | Not Null | Physical diagnostic/chamber address |
| `area` | String(100) | Index, Not Null | Area in Khulna (Sonadanga, Boyra, etc.) |
| `consultation_fee` | Integer | Not Null | Consultation charge in BDT (৳) |
| `visiting_hours` | String(100) | Not Null | Daily consultation schedule |
| `visiting_days` | String(100) | Not Null | Days of active chamber practice |
| `phone` | String(30) | Not Null | Inquiries contact number |
| `serial_phone` | String(30) | Not Null | Phone line dedicated to serial reservation |
| `latitude` | Float | Not Null | Geographic latitude coordinate |
| `longitude` | Float | Not Null | Geographic longitude coordinate |
| `rating` | Float | Default 4.8 | Patient feedback score (out of 5.0) |
| `verified` | Boolean | Default True | Administrative credential verification status |

### 5.3. Table: `hospitals`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | String(50) | Primary Key, Index | Unique hospital slug |
| `name` | String(150) | Not Null | Official hospital name |
| `type` | String(50) | Not Null | Government Tertiary, Private Specialized, etc. |
| `address` | Text | Not Null | Street address in Khulna |
| `area` | String(100) | Index, Not Null | Zone (Boyra, Sonadanga, Sadar) |
| `emergency_number` | String(30) | Not Null | Direct 24/7 emergency room telephone |
| `reception_number` | String(30) | Not Null | General hospital inquiry line |
| `has_icu` | Boolean | Default True | Intensive Care Unit availability |
| `has_emergency_ward`| Boolean | Default True | 24/7 Emergency trauma department |
| `ambulance_available`| Boolean | Default True | Hospital-operated ambulance service |
| `total_beds` | Integer | Nullable | Operational bed capacity |
| `latitude` | Float | Not Null | Latitude coordinate |
| `longitude` | Float | Not Null | Longitude coordinate |

### 5.4. Table: `ambulances`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | String(50) | Primary Key, Index | Provider slug |
| `name` | String(150) | Not Null | Organization name |
| `type` | String(50) | Not Null | ICU Ambulance, Basic Life Support, etc. |
| `base_location` | String(150) | Not Null | Stationing location |
| `coverage_area` | String(150) | Not Null | Operational dispatch boundaries |
| `phone` | String(30) | Not Null | Immediate emergency dispatch hotline |
| `alternate_phone` | String(30) | Nullable | Backup dispatch line |
| `available_24_7` | Boolean | Default True | Around-the-clock availability |
| `has_oxygen` | Boolean | Default True | Onboard medical oxygen cylinder |
| `has_ventilator` | Boolean | Default False | Mobile critical ventilator installed |
| `estimated_response_time` | String(50) | Not Null | Average time to reach patient |

### 5.5. Table: `appointments`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | String(50) | Primary Key, Index | Unique booking identifier |
| `user_id` | String(36) | Foreign Key (`users.id`) | Registered user creating the booking |
| `doctor_id` | String(50) | Foreign Key (`doctors.id`)| Targeted specialist |
| `doctor_name` | String(100) | Not Null | Name of doctor |
| `specialty` | String(100) | Not Null | Medical field |
| `hospital_or_chamber`| String(200) | Not Null | Consultation address |
| `appointment_date` | String(30) | Not Null | Date of consultation (YYYY-MM-DD) |
| `serial_number` | Integer | Not Null | Assigned sequential queue serial number |
| `estimated_time` | String(50) | Not Null | Calculated patient reporting time |
| `patient_name` | String(100) | Not Null | Name of the patient attending |
| `patient_phone` | String(30) | Not Null | Patient's active phone number |
| `patient_age` | Integer | Not Null | Patient age in years |
| `symptom_summary`| Text | Nullable | Pre-consultation symptom notes |
| `status` | String(30) | Default 'Confirmed' | Confirmed, Completed, Cancelled |
| `created_at` | DateTime | Default `utcnow` | Timestamp of booking creation |

### 5.6. Table: `medicines` & `drug_interactions`
- `medicines`: Brand name, generic molecule, therapeutic class, manufacturer (Square, Beximco, Incepta), dosage form, strength, price in BDT, indications, side effects, precautions, and pregnancy safety category.
- `drug_interactions`: Maps pairs of active drugs (`drug1`, `drug2`), interaction severity (`Severe`, `Moderate`, `Minor`), pharmacological adverse effect, and clinical physician recommendation.

---

## 6. RESTful API Reference

The backend provides complete OpenAPI (Swagger) documentation available at `http://localhost:8000/docs`.

### 6.1. System & Health Endpoints
- `GET /`: Returns root platform metadata and documentation link.
- `GET /api/health`: Health probe returning database and ML engine status.
  ```json
  {
    "status": "healthy",
    "database": "sqlite connected",
    "ml_engine": "operational",
    "version": "1.0.0"
  }
  ```

### 6.2. Authentication Endpoints
- `POST /api/auth/signup`: Create a new user profile.
- `POST /api/auth/login`: Authenticate email and password, returning user object and bearer token.
- `GET /api/auth/profile/{user_id}`: Retrieve current health profile, allergies, and chronic conditions.
- `PUT /api/auth/profile/{user_id}`: Update demographics, emergency contacts, or clinical flags.

### 6.3. Doctor Discovery & Chamber Booking
- `GET /api/doctors`: Query verified doctors with optional query params `?specialty=&area=&search=`.
- `GET /api/doctors/{id}`: Detailed physician profile including chamber address and BMDC registration.
- `POST /api/appointments`: Allocate a sequential chamber serial number.
  - *Request Body:*
    ```json
    {
      "user_id": "demo-user-khulna-01",
      "doctor_id": "dr-kabir-cardio",
      "patient_name": "Tanvir Ahmed",
      "patient_phone": "+880-1711-234567",
      "patient_age": 32,
      "appointment_date": "2026-11-05",
      "symptom_summary": "Experiencing mild exertional tightness."
    }
    ```
  - *Response:* Returns confirmation with generated `serial_number: 1` and `estimated_time: "05:00 PM"`.
- `GET /api/appointments/user/{user_id}`: Fetch all active and past serial reservations.
- `DELETE /api/appointments/{id}`: Cancel a booked serial.

### 6.4. Machine Learning Symptom Triage
- `POST /api/symptoms/analyze`: Evaluates patient natural language input.
  - *Request Body:*
    ```json
    {
      "description": "burning pain in upper stomach and acid reflux",
      "selected_symptoms": ["Heartburn", "Stomach Ache"],
      "severity": "Mild"
    }
    ```
  - *Response:*
    ```json
    {
      "urgency_level": "low",
      "is_emergency": false,
      "emergency_warning": null,
      "primary_specialty": "Gastroenterology",
      "alternative_specialties": ["General Medicine"],
      "confidence_score": 0.35,
      "possible_causes": [
        "Gastroesophageal Reflux (GERD)",
        "Functional Dyspepsia",
        "Acute Gastritis",
        "Irritable Bowel Syndrome"
      ],
      "recommended_action": "Monitor symptoms and consult a Gastroenterology specialist if symptoms persist beyond 3 days.",
      "home_care_advice": [
        "Ensure adequate hydration and rest.",
        "Maintain a log of when symptoms occur, their duration, and any triggers.",
        "Do not start prescription medications without a registered physician's review.",
        "Visit an emergency department immediately if you develop sudden shortness of breath, severe pain, or confusion."
      ],
      "red_flags": []
    }
    ```

### 6.5. Laboratory Report Analyzer
- `POST /api/reports/analyze`: Extracts parameters, checks reference ranges, and creates physician questions.
  - *Request Body:*
    ```json
    {
      "report_text": "Hemoglobin: 10.5 g/dL\nTotal WBC: 12500 /cumm\nPlatelet Count: 2.1 lakh",
      "patient_age": 32,
      "patient_gender": "Male"
    }
    ```
  - *Response:*
    ```json
    {
      "report_type": "Automated OCR Clinical Extraction",
      "biomarkers": [
        {
          "name": "Hemoglobin (Hb)",
          "value": 10.5,
          "unit": "g/dL",
          "reference_range": "13.0 - 17.0 g/dL",
          "status": "Low",
          "explanation": "Low Hemoglobin indicates anemia, potential blood loss, or nutritional deficiency."
        },
        {
          "name": "Total WBC Count",
          "value": 12500.0,
          "unit": "/cumm",
          "reference_range": "4000.0 - 11000.0 /cumm",
          "status": "High",
          "explanation": "High WBC count (leukocytosis) strongly suggests acute infection or systemic inflammation."
        },
        {
          "name": "Platelet Count",
          "value": 2.1,
          "unit": "lakh/cumm",
          "reference_range": "1.5 - 4.5 lakh/cumm",
          "status": "Normal",
          "explanation": "Platelet Count is within healthy standard reference boundaries."
        }
      ],
      "normal_count": 1,
      "abnormal_count": 2,
      "clinical_summary": "Identified 3 parameters (2 outside normal clinical ranges, 1 within normal bounds). Abnormal values should be reviewed by your physician for correlation with clinical symptoms.",
      "questions_for_doctor": [
        "Do the abnormal parameters require repeat testing or fasting confirmation?",
        "Could lifestyle modifications (dietary adjustments, aerobic exercise) address these readings?",
        "Are there any prescription medication adjustments recommended based on this panel?",
        "When should I schedule follow-up blood work?"
      ],
      "safety_disclaimer": "MedNex report analysis is an AI educational aid and does not constitute a diagnostic laboratory interpretation. Always consult a licensed physician."
    }
    ```

### 6.6. Pharmaceuticals & Drug-Drug Interactions
- `GET /api/medicines`: List and search medications by brand or generic name.
- `POST /api/medicines/interactions`: Checks multi-drug interactions across a patient's prescription list.
  - *Request Body:* `{"drugs": ["Osartil 50", "Napa Extra"]}`
  - *Response:* Returns interaction severity (`Moderate`), pharmacological explanation, and clinical monitoring recommendations.
- `POST /api/medicines/ocr-identify`: Accepts extracted packaging text and performs fuzzy string matching.

### 6.7. Fitness & Health History Tracking
- `POST /api/fitness/bmi`: Records an anthropometric measurement, calculates BMI, and logs to user activity timeline.
- `GET /api/fitness/history/{user_id}`: Retrieves longitudinal BMI recordings.
- `GET /api/fitness/activities/{user_id}`: Retrieves all health actions (symptom checks, bookings, report uploads).

---

## 7. Frontend UI/UX Design System

### 7.1. Color Palette & Typography
- **Primary Brand Color (Medical Blue):** `#2563EB` (Tailwind `blue-600`) — Evokes clinical precision and technological trust.
- **Secondary Accent Color (Teal):** `#0D9488` (Tailwind `teal-600`) — Represents healing, wellness, and serenity.
- **Background:** `#F8FAFC` (Tailwind `slate-50`) — Clean, modern canvas with minimal eye strain.
- **Surface & Cards:** `#FFFFFF` (Pure White) with subtle border lines (`border-slate-200`) and soft elevation shadows (`shadow-sm` / `shadow-md`).
- **Emergency Accent (Critical Red):** `#DC2626` (Tailwind `red-600`) — Reserved strictly for emergency indicators, 999 hotline shortcuts, and acute red-flag alerts.
- **Success / Normal Range (Clinical Green):** `#16A34A` (Tailwind `green-600`) — Indicates normal laboratory biomarker readings and verified doctor credentials.
- **Typography:** Modern clean sans-serif utilizing **Plus Jakarta Sans** for headings and **Inter** for readable body text and clinical data tables.

### 7.2. Core Features Breakdown
1. **Interactive Visual Body Map (`VisualBodyMap.tsx`):**
   - Dual-view SVG anatomical diagram allowing front and back switching.
   - Interactive clickable anatomical zones: Head/Brain, Eyes/ENT, Chest/Heart, Abdomen/Stomach, Pelvis, Arms/Joints, Legs/Knees, Spine/Back.
   - Real-time synchronization with symptom search keywords and predefined clinical presets.
2. **First Aid Assistant & Clinical Audio Metronome (`FirstAidPage.tsx`):**
   - Evidence-based first-aid protocols conforming to international standards (Burns, Wounds, Choking/Heimlich, Nosebleeds, Sprains/R.I.C.E., Fainting, Heat Stroke, Animal/Snake Bites).
   - Side-by-side DOs and DON'Ts grids.
   - Active interactive countdown timers for chemical burns, wound compression, and nosebleed pinching.
   - **CPR Audio Metronome:** Generates real-time audio beeps calibrated to **110 BPM** (the exact compression rate recommended by the American Heart Association) to guide CPR cadence during cardiac emergencies.
3. **Medical Report Analyzer & Biomarker Gauges (`ReportAnalyzerPage.tsx`):**
   - Visual biomarker gauges featuring low, normal, and elevated color zones.
   - Quick one-click preset loaders for real clinical panels (CBC Anemia, Lipid Profile, Diabetic HbA1c, Liver Function).
   - Structured checklist of physician questions ready for printing or screenshotting.
4. **Verified Doctor Chamber Booking Pass (`FindDoctorsPage.tsx`):**
   - Modal form validating patient name, age, phone number, and appointment date.
   - Instantly renders a printable **Chamber Serial Ticket** indicating serial number, visiting hours, reporting time, and exact chamber location in Khulna.
5. **Emergency 999 Dispatch Hub (`EmergencyAmbulancePage.tsx`):**
   - Prominent pulsating direct-call button for Bangladesh national emergency service **999**.
   - Direct calling buttons for Khulna ambulance providers (*KMCH ICU, Red Crescent, Gazi Medical, Fire Service*).
   - **One-Click Dispatch SMS Generator:** Copies patient current GPS location and emergency status to clipboard for SMS transmission.
6. **Fitness, BMR & Recharts Timeline (`FitnessTrackerPage.tsx`):**
   - Dual-unit toggle supporting Metric (cm, kg) and Imperial (ft, inches, lbs).
   - Anthropometric calculation of Body Mass Index ($BMI = \text{weight} / \text{height}^2$), Basal Metabolic Rate (BMR via Mifflin-St Jeor), and Total Daily Energy Expenditure (TDEE).
   - Interactive historical weight trend chart powered by **Recharts**.
7. **Medicine Information & Drug Interaction Checker (`MedicineCheckerPage.tsx`):**
   - Dual-tab interface: *Medicine Search & Information* and *Drug-Drug Interaction Checker*.
   - Multi-drug selector displaying known interactions with severity classifications (Severe, Moderate, Minor) and physician recommendations.

---

## 8. Installation & Setup Guide

### Prerequisites
- **Python 3.10+** (Python 3.14 verified)
- **Node.js 18+** (Node.js v24.21 verified) and **npm 9+**
- Git

### 8.1. Clone Repository
```bash
git clone https://github.com/your-username/mednex.git
cd mednex
```

### 8.2. Backend Setup
1. Open a terminal in the project root:
   ```bash
   pip install fastapi uvicorn scikit-learn numpy scipy sqlalchemy pydantic python-dotenv
   ```
2. Initialize and seed the SQLite database with verified Khulna records:
   ```bash
   python -c "import sys; sys.path.insert(0, './backend'); from app.seed import seed_database; seed_database()"
   ```
3. Start the FastAPI backend server:
   ```bash
   python backend/run.py
   ```
   *The backend will be available at `http://localhost:8000` (API Docs at `http://localhost:8000/docs`).*

### 8.3. Frontend Setup
1. Open a second terminal and navigate to `frontend/`:
   ```bash
   cd frontend
   npm install
   ```
2. Start the Vite development server:
   ```bash
   npm run dev -- --host
   ```
   *The frontend will launch at `http://localhost:5173`.*

---

## 9. Production Deployment Guide

### Option 1: Frontend on Vercel / Netlify + Backend on Render / Railway

#### Frontend (Vercel)
1. Push repository to GitHub.
2. In Vercel, select **Import Git Repository**.
3. Set **Root Directory** to `frontend`.
4. Build command: `npm run build` | Output directory: `dist`.
5. In Environment Variables, configure:
   `VITE_API_BASE_URL=https://your-backend.onrender.com/api`
6. Click **Deploy**.

#### Backend (Render / Railway)
1. In Render or Railway, create a new **Web Service**.
2. Root directory: `backend` or project root.
3. Build command: `pip install -r requirements.txt`
4. Start command:
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port $PORT
   ```
5. Ensure `mednex.db` is writable or mount a persistent disk for SQLite.

### Option 2: Docker Containerization

Create a `Dockerfile` in the root:
```dockerfile
# Multi-stage Dockerfile
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

FROM python:3.11-slim
WORKDIR /app
COPY backend/ ./backend/
RUN pip install --no-cache-dir fastapi uvicorn scikit-learn numpy scipy sqlalchemy pydantic
COPY --from=frontend-builder /app/frontend/dist ./frontend_dist
EXPOSE 8000
CMD ["python", "backend/run.py"]
```

---

## 10. Medical Safety, Compliance & Disclaimer

> **IMPORTANT CLINICAL NOTICE:**  
> MedNex is an educational information retrieval and medical triage platform. It **does not constitute a medical diagnosis**, an individualized treatment plan, or a replacement for an in-person clinical examination by a licensed medical practitioner.  
> 
> In any situation involving suspected acute myocardial infarction, stroke, respiratory failure, significant hemorrhage, or other acute distress, patients and bystanders must seek immediate emergency medical care or call the national emergency hotline **999**.

---

*MedNex Platform — Documented and maintained for the advancement of accessible, ethical healthcare intelligence.*

