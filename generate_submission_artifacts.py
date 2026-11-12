"""
MedNex Platform - Academic Submission PDF Generator
Generates all 4 required submission PDFs using Chrome Headless with high-resolution vector SVGs and clean typography.
"""

import os
import subprocess
import re

SUBMISSIONS_DIR = os.path.abspath("submissions")
os.makedirs(SUBMISSIONS_DIR, exist_ok=True)

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
if not os.path.exists(CHROME_PATH):
    CHROME_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

def run_chrome_pdf(html_path, pdf_path, landscape=False):
    args = [
        CHROME_PATH,
        "--headless=new",
        "--no-sandbox",
        "--disable-gpu",
        f"--print-to-pdf={pdf_path}",
    ]
    if landscape:
        # Chrome flag for landscape
        args.append("--print-to-pdf-landscape")
    args.append(f"file:///{html_path.replace(os.sep, '/')}")
    
    result = subprocess.run(args, capture_output=True, text=True)
    if os.path.exists(pdf_path):
        size_kb = os.path.getsize(pdf_path) / 1024
        print(f"✓ Generated: {os.path.basename(pdf_path)} ({size_kb:.1f} KB)")
        return True
    else:
        print(f"✗ Failed generating {pdf_path}: {result.stderr}")
        return False

# ==========================================
# 1. GENERATE USE CASE DIAGRAM SVG & PDF
# ==========================================
def build_use_case_diagram_svg():
    return '''
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 860" width="100%" height="100%" style="background:#ffffff; font-family:'Segoe UI', Inter, system-ui, sans-serif;">
  <defs>
    <linearGradient id="gradHeader" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e3a8a"/>
      <stop offset="100%" stop-color="#2563eb"/>
    </linearGradient>
    <linearGradient id="gradActor" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#e2e8f0"/>
    </linearGradient>
    <linearGradient id="gradUcNormal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#eff6ff"/>
      <stop offset="100%" stop-color="#dbeafe"/>
    </linearGradient>
    <linearGradient id="gradUcEmergency" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef2f2"/>
      <stop offset="100%" stop-color="#fee2e2"/>
    </linearGradient>
    <linearGradient id="gradUcAdmin" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f0fdf4"/>
      <stop offset="100%" stop-color="#dcfce7"/>
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="3" stdDeviation="4" flood-opacity="0.08"/>
    </filter>
  </defs>

  <!-- Title Header Banner -->
  <rect x="30" y="20" width="1140" height="65" rx="12" fill="url(#gradHeader)" filter="url(#shadow)"/>
  <text x="50" y="50" fill="#ffffff" font-size="20" font-weight="700" letter-spacing="0.5">UML USE CASE DIAGRAM – MEDNEX HEALTHCARE PLATFORM</text>
  <text x="50" y="70" fill="#93c5fd" font-size="12" font-weight="500">Course: CSE4104 | System Boundary, Actors, Primary Interactions &amp; Extended Emergency Overrides</text>

  <!-- System Boundary Box -->
  <rect x="230" y="105" width="740" height="730" rx="16" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="6,6" filter="url(#shadow)"/>
  <rect x="250" y="115" width="340" height="28" rx="6" fill="#2563eb"/>
  <text x="260" y="134" fill="#ffffff" font-size="12" font-weight="700" letter-spacing="0.5">MEDNEX PLATFORM BOUNDARY</text>

  <!-- ACTORS (LEFT) -->
  <!-- Patient Actor -->
  <g transform="translate(60, 360)">
    <circle cx="50" cy="30" r="22" fill="#dbeafe" stroke="#2563eb" stroke-width="2.5"/>
    <!-- Head -->
    <circle cx="50" cy="24" r="10" fill="#2563eb"/>
    <!-- Body -->
    <path d="M 32 46 C 32 38, 68 38, 68 46" fill="none" stroke="#2563eb" stroke-width="3"/>
    <text x="50" y="75" text-anchor="middle" fill="#0f172a" font-size="13" font-weight="700">Patient / User</text>
    <text x="50" y="92" text-anchor="middle" fill="#64748b" font-size="10">(Primary Actor)</text>
  </g>

  <!-- ACTORS (RIGHT) -->
  <!-- Doctor Actor -->
  <g transform="translate(1040, 180)">
    <circle cx="50" cy="30" r="22" fill="#e0e7ff" stroke="#4f46e5" stroke-width="2.5"/>
    <circle cx="50" cy="24" r="10" fill="#4f46e5"/>
    <path d="M 32 46 C 32 38, 68 38, 68 46" fill="none" stroke="#4f46e5" stroke-width="3"/>
    <text x="50" y="75" text-anchor="middle" fill="#0f172a" font-size="13" font-weight="700">Doctor / Chamber</text>
    <text x="50" y="92" text-anchor="middle" fill="#64748b" font-size="10">(Healthcare Provider)</text>
  </g>

  <!-- Emergency Dispatcher Actor -->
  <g transform="translate(1040, 420)">
    <circle cx="50" cy="30" r="22" fill="#fee2e2" stroke="#dc2626" stroke-width="2.5"/>
    <circle cx="50" cy="24" r="10" fill="#dc2626"/>
    <path d="M 32 46 C 32 38, 68 38, 68 46" fill="none" stroke="#dc2626" stroke-width="3"/>
    <text x="50" y="75" text-anchor="middle" fill="#0f172a" font-size="13" font-weight="700">Emergency 999</text>
    <text x="50" y="92" text-anchor="middle" fill="#64748b" font-size="10">&amp; Ambulance Pool</text>
  </g>

  <!-- System Administrator Actor -->
  <g transform="translate(1040, 660)">
    <circle cx="50" cy="30" r="22" fill="#dcfce7" stroke="#16a34a" stroke-width="2.5"/>
    <circle cx="50" cy="24" r="10" fill="#16a34a"/>
    <path d="M 32 46 C 32 38, 68 38, 68 46" fill="none" stroke="#16a34a" stroke-width="3"/>
    <text x="50" y="75" text-anchor="middle" fill="#0f172a" font-size="13" font-weight="700">System Admin</text>
    <text x="50" y="92" text-anchor="middle" fill="#64748b" font-size="10">(Platform &amp; BMDC)</text>
  </g>

  <!-- USE CASES INSIDE BOUNDARY -->

  <!-- Column 1 (Left within Boundary: Intake & Assessment) -->
  <!-- UC-01 -->
  <g transform="translate(260, 160)">
    <rect width="200" height="42" rx="21" fill="url(#gradUcNormal)" stroke="#3b82f6" stroke-width="1.5" filter="url(#shadow)"/>
    <text x="100" y="26" text-anchor="middle" fill="#1e3a8a" font-size="11" font-weight="600">UC-01: Register &amp; Login</text>
  </g>

  <!-- UC-02 -->
  <g transform="translate(260, 225)">
    <rect width="200" height="42" rx="21" fill="url(#gradUcNormal)" stroke="#3b82f6" stroke-width="1.5" filter="url(#shadow)"/>
    <text x="100" y="26" text-anchor="middle" fill="#1e3a8a" font-size="11" font-weight="600">UC-02: Manage Health Profile</text>
  </g>

  <!-- UC-03 -->
  <g transform="translate(260, 295)">
    <rect width="200" height="44" rx="22" fill="url(#gradUcNormal)" stroke="#2563eb" stroke-width="2" filter="url(#shadow)"/>
    <text x="100" y="27" text-anchor="middle" fill="#1e3a8a" font-size="11" font-weight="700">UC-03: AI Symptom Triage</text>
  </g>

  <!-- UC-04 (Emergency Extend) -->
  <g transform="translate(540, 295)">
    <rect width="210" height="44" rx="22" fill="url(#gradUcEmergency)" stroke="#ef4444" stroke-width="2" filter="url(#shadow)"/>
    <text x="105" y="27" text-anchor="middle" fill="#991b1b" font-size="11" font-weight="700">UC-04: Red-Flag 999 Override</text>
  </g>

  <!-- UC-05 -->
  <g transform="translate(260, 380)">
    <rect width="200" height="44" rx="22" fill="url(#gradUcNormal)" stroke="#2563eb" stroke-width="1.5" filter="url(#shadow)"/>
    <text x="100" y="27" text-anchor="middle" fill="#1e3a8a" font-size="11" font-weight="600">UC-05: Find Verified Doctors</text>
  </g>

  <!-- UC-06 (Include) -->
  <g transform="translate(540, 380)">
    <rect width="210" height="44" rx="22" fill="url(#gradUcNormal)" stroke="#4f46e5" stroke-width="1.5" filter="url(#shadow)"/>
    <text x="105" y="27" text-anchor="middle" fill="#312e81" font-size="11" font-weight="600">UC-06: Book Chamber Serial</text>
  </g>

  <!-- UC-07 -->
  <g transform="translate(260, 465)">
    <rect width="200" height="44" rx="22" fill="url(#gradUcNormal)" stroke="#3b82f6" stroke-width="1.5" filter="url(#shadow)"/>
    <text x="100" y="27" text-anchor="middle" fill="#1e3a8a" font-size="11" font-weight="600">UC-07: Analyze Lab Reports</text>
  </g>

  <!-- UC-08 -->
  <g transform="translate(260, 535)">
    <rect width="200" height="44" rx="22" fill="url(#gradUcEmergency)" stroke="#ef4444" stroke-width="1.5" filter="url(#shadow)"/>
    <text x="100" y="27" text-anchor="middle" fill="#991b1b" font-size="11" font-weight="600">UC-08: 24/7 Ambulance &amp; ER</text>
  </g>

  <!-- UC-09 -->
  <g transform="translate(260, 605)">
    <rect width="200" height="44" rx="22" fill="url(#gradUcNormal)" stroke="#3b82f6" stroke-width="1.5" filter="url(#shadow)"/>
    <text x="100" y="27" text-anchor="middle" fill="#1e3a8a" font-size="11" font-weight="600">UC-09: First Aid &amp; CPR Metro</text>
  </g>

  <!-- UC-10 -->
  <g transform="translate(260, 675)">
    <rect width="200" height="44" rx="22" fill="url(#gradUcNormal)" stroke="#3b82f6" stroke-width="1.5" filter="url(#shadow)"/>
    <text x="100" y="27" text-anchor="middle" fill="#1e3a8a" font-size="11" font-weight="600">UC-10: Drug Interaction Check</text>
  </g>

  <!-- UC-11 -->
  <g transform="translate(260, 745)">
    <rect width="200" height="44" rx="22" fill="url(#gradUcNormal)" stroke="#3b82f6" stroke-width="1.5" filter="url(#shadow)"/>
    <text x="100" y="27" text-anchor="middle" fill="#1e3a8a" font-size="11" font-weight="600">UC-11: Track BMI &amp; Vitals</text>
  </g>

  <!-- Provider & Admin Specific Use Cases -->
  <!-- UC-12 -->
  <g transform="translate(540, 200)">
    <rect width="210" height="44" rx="22" fill="url(#gradUcNormal)" stroke="#4f46e5" stroke-width="1.5" filter="url(#shadow)"/>
    <text x="105" y="27" text-anchor="middle" fill="#312e81" font-size="11" font-weight="600">UC-12: Manage Chamber Queue</text>
  </g>

  <!-- UC-13 -->
  <g transform="translate(540, 535)">
    <rect width="210" height="44" rx="22" fill="url(#gradUcEmergency)" stroke="#ef4444" stroke-width="1.5" filter="url(#shadow)"/>
    <text x="105" y="27" text-anchor="middle" fill="#991b1b" font-size="11" font-weight="600">UC-13: Receive Dispatch Calls</text>
  </g>

  <!-- UC-14 -->
  <g transform="translate(540, 700)">
    <rect width="210" height="44" rx="22" fill="url(#gradUcAdmin)" stroke="#16a34a" stroke-width="1.5" filter="url(#shadow)"/>
    <text x="105" y="27" text-anchor="middle" fill="#14532d" font-size="11" font-weight="600">UC-14: Audit BMDC &amp; Seed DB</text>
  </g>

  <!-- RELATIONSHIP LINES -->
  <!-- Patient to Use Cases -->
  <line x1="130" y1="390" x2="260" y2="181" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="130" y1="395" x2="260" y2="246" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="130" y1="400" x2="260" y2="317" stroke="#2563eb" stroke-width="2"/>
  <line x1="130" y1="405" x2="260" y2="402" stroke="#2563eb" stroke-width="2"/>
  <line x1="130" y1="410" x2="260" y2="487" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="130" y1="415" x2="260" y2="557" stroke="#dc2626" stroke-width="1.5"/>
  <line x1="130" y1="420" x2="260" y2="627" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="130" y1="425" x2="260" y2="697" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="130" y1="430" x2="260" y2="767" stroke="#94a3b8" stroke-width="1.5"/>

  <!-- Include / Extend Dashed Arrows -->
  <!-- UC-03 to UC-04 (Extend) -->
  <line x1="460" y1="317" x2="540" y2="317" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,4"/>
  <polygon points="536,312 546,317 536,322" fill="#ef4444"/>
  <text x="500" y="310" text-anchor="middle" fill="#ef4444" font-size="10" font-weight="700">&lt;&lt;extend&gt;&gt;</text>

  <!-- UC-05 to UC-06 (Include) -->
  <line x1="460" y1="402" x2="540" y2="402" stroke="#4f46e5" stroke-width="2" stroke-dasharray="4,4"/>
  <polygon points="536,397 546,402 536,407" fill="#4f46e5"/>
  <text x="500" y="395" text-anchor="middle" fill="#4f46e5" font-size="10" font-weight="700">&lt;&lt;include&gt;&gt;</text>

  <!-- Doctor lines -->
  <line x1="750" y1="222" x2="1040" y2="210" stroke="#4f46e5" stroke-width="2"/>
  <line x1="750" y1="402" x2="1040" y2="220" stroke="#94a3b8" stroke-width="1.5"/>

  <!-- Emergency Dispatch lines -->
  <line x1="750" y1="317" x2="1040" y2="445" stroke="#ef4444" stroke-width="2"/>
  <line x1="750" y1="557" x2="1040" y2="455" stroke="#ef4444" stroke-width="2"/>

  <!-- Admin lines -->
  <line x1="750" y1="722" x2="1040" y2="690" stroke="#16a34a" stroke-width="2"/>

</svg>
'''

# ==========================================
# 2. GENERATE ENTITY RELATIONSHIP DIAGRAM SVG
# ==========================================
def build_er_diagram_svg():
    return '''
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1350 940" width="100%" height="100%" style="background:#ffffff; font-family:'Segoe UI', Inter, system-ui, sans-serif;">
  <defs>
    <linearGradient id="headerBlue" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e40af"/>
      <stop offset="100%" stop-color="#3b82f6"/>
    </linearGradient>
    <linearGradient id="headerTeal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f766e"/>
      <stop offset="100%" stop-color="#14b8a6"/>
    </linearGradient>
    <linearGradient id="headerPurple" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#581c87"/>
      <stop offset="100%" stop-color="#9333ea"/>
    </linearGradient>
    <linearGradient id="headerRed" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#991b1b"/>
      <stop offset="100%" stop-color="#ef4444"/>
    </linearGradient>
    <linearGradient id="headerAmber" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#92400e"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>
    <filter id="cardShadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="4" stdDeviation="5" flood-opacity="0.08"/>
    </filter>
  </defs>

  <!-- Banner -->
  <rect x="25" y="15" width="1300" height="60" rx="10" fill="url(#headerBlue)"/>
  <text x="45" y="44" fill="#ffffff" font-size="20" font-weight="700">ENTITY RELATIONSHIP DIAGRAM (ERD) – MEDNEX RELATIONAL SCHEMA</text>
  <text x="45" y="62" fill="#bfdbfe" font-size="11">Course: CSE4104 | Complete Database Entities, Data Types, Primary Keys (PK), Foreign Keys (FK) &amp; Cardinalities</text>

  <!-- ENTITY 1: USERS -->
  <g transform="translate(30, 95)" filter="url(#cardShadow)">
    <rect width="260" height="340" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    <rect width="260" height="34" rx="8" fill="url(#headerBlue)"/>
    <text x="15" y="22" fill="#ffffff" font-size="13" font-weight="700">USERS (Table: users)</text>
    
    <text x="15" y="55" fill="#ef4444" font-weight="700" font-size="11">PK</text>
    <text x="45" y="55" fill="#0f172a" font-size="11" font-weight="600">id</text>
    <text x="175" y="55" fill="#64748b" font-size="10">String(36)</text>
    
    <text x="45" y="78" fill="#0f172a" font-size="11">name</text>
    <text x="175" y="78" fill="#64748b" font-size="10">String(100)</text>
    
    <text x="15" y="101" fill="#3b82f6" font-weight="700" font-size="11">UK</text>
    <text x="45" y="101" fill="#0f172a" font-size="11">email</text>
    <text x="175" y="101" fill="#64748b" font-size="10">String(100)</text>
    
    <text x="45" y="124" fill="#0f172a" font-size="11">password_hash</text>
    <text x="175" y="124" fill="#64748b" font-size="10">String(255)</text>

    <text x="45" y="147" fill="#0f172a" font-size="11">phone</text>
    <text x="175" y="147" fill="#64748b" font-size="10">String(20)</text>

    <text x="45" y="170" fill="#0f172a" font-size="11">age / gender</text>
    <text x="175" y="170" fill="#64748b" font-size="10">Integer / Str</text>

    <text x="45" y="193" fill="#0f172a" font-size="11">blood_group</text>
    <text x="175" y="193" fill="#64748b" font-size="10">String(10)</text>

    <text x="45" y="216" fill="#0f172a" font-size="11">city</text>
    <text x="175" y="216" fill="#64748b" font-size="10">String(100)</text>

    <text x="45" y="239" fill="#0f172a" font-size="11">emergency_contact</text>
    <text x="175" y="239" fill="#64748b" font-size="10">String(20)</text>

    <text x="45" y="262" fill="#0f172a" font-size="11">allergies</text>
    <text x="175" y="262" fill="#64748b" font-size="10">JSON (List)</text>

    <text x="45" y="285" fill="#0f172a" font-size="11">chronic_conditions</text>
    <text x="175" y="285" fill="#64748b" font-size="10">JSON (List)</text>

    <text x="45" y="308" fill="#0f172a" font-size="11">created_at</text>
    <text x="175" y="308" fill="#64748b" font-size="10">DateTime</text>
  </g>

  <!-- ENTITY 2: APPOINTMENTS -->
  <g transform="translate(370, 95)" filter="url(#cardShadow)">
    <rect width="270" height="340" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    <rect width="270" height="34" rx="8" fill="url(#headerPurple)"/>
    <text x="15" y="22" fill="#ffffff" font-size="13" font-weight="700">APPOINTMENTS</text>

    <text x="15" y="55" fill="#ef4444" font-weight="700" font-size="11">PK</text>
    <text x="45" y="55" fill="#0f172a" font-size="11" font-weight="600">id</text>
    <text x="185" y="55" fill="#64748b" font-size="10">String(50)</text>

    <text x="15" y="78" fill="#8b5cf6" font-weight="700" font-size="11">FK</text>
    <text x="45" y="78" fill="#0f172a" font-size="11">user_id (users.id)</text>
    <text x="185" y="78" fill="#64748b" font-size="10">String(36)</text>

    <text x="15" y="101" fill="#8b5cf6" font-weight="700" font-size="11">FK</text>
    <text x="45" y="101" fill="#0f172a" font-size="11">doctor_id (doctors.id)</text>
    <text x="185" y="101" fill="#64748b" font-size="10">String(50)</text>

    <text x="45" y="124" fill="#0f172a" font-size="11">doctor_name</text>
    <text x="185" y="124" fill="#64748b" font-size="10">String(100)</text>

    <text x="45" y="147" fill="#0f172a" font-size="11">specialty</text>
    <text x="185" y="147" fill="#64748b" font-size="10">String(100)</text>

    <text x="45" y="170" fill="#0f172a" font-size="11">hospital_or_chamber</text>
    <text x="185" y="170" fill="#64748b" font-size="10">String(200)</text>

    <text x="45" y="193" fill="#0f172a" font-size="11">appointment_date</text>
    <text x="185" y="193" fill="#64748b" font-size="10">String(30)</text>

    <text x="45" y="216" fill="#0f172a" font-size="11">serial_number</text>
    <text x="185" y="216" fill="#64748b" font-size="10">Integer</text>

    <text x="45" y="239" fill="#0f172a" font-size="11">estimated_time</text>
    <text x="185" y="239" fill="#64748b" font-size="10">String(50)</text>

    <text x="45" y="262" fill="#0f172a" font-size="11">patient_name / phone</text>
    <text x="185" y="262" fill="#64748b" font-size="10">String(100)</text>

    <text x="45" y="285" fill="#0f172a" font-size="11">symptom_summary</text>
    <text x="185" y="285" fill="#64748b" font-size="10">Text</text>

    <text x="45" y="308" fill="#0f172a" font-size="11">status (Confirmed)</text>
    <text x="185" y="308" fill="#64748b" font-size="10">String(30)</text>
  </g>

  <!-- ENTITY 3: DOCTORS -->
  <g transform="translate(710, 95)" filter="url(#cardShadow)">
    <rect width="280" height="340" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    <rect width="280" height="34" rx="8" fill="url(#headerTeal)"/>
    <text x="15" y="22" fill="#ffffff" font-size="13" font-weight="700">DOCTORS (Verified BMDC)</text>

    <text x="15" y="55" fill="#ef4444" font-weight="700" font-size="11">PK</text>
    <text x="45" y="55" fill="#0f172a" font-size="11" font-weight="600">id</text>
    <text x="195" y="55" fill="#64748b" font-size="10">String(50)</text>

    <text x="45" y="78" fill="#0f172a" font-size="11">name</text>
    <text x="195" y="78" fill="#64748b" font-size="10">String(100)</text>

    <text x="45" y="101" fill="#0f172a" font-size="11">degrees / specialty</text>
    <text x="195" y="101" fill="#64748b" font-size="10">String(200)</text>

    <text x="45" y="124" fill="#0f172a" font-size="11">designation</text>
    <text x="195" y="124" fill="#64748b" font-size="10">String(200)</text>

    <text x="45" y="147" fill="#0f172a" font-size="11">hospital</text>
    <text x="195" y="147" fill="#64748b" font-size="10">String(200)</text>

    <text x="15" y="170" fill="#3b82f6" font-weight="700" font-size="11">UK</text>
    <text x="45" y="170" fill="#0f172a" font-size="11">bmdc_reg_no</text>
    <text x="195" y="170" fill="#64748b" font-size="10">String(50)</text>

    <text x="45" y="193" fill="#0f172a" font-size="11">chamber_address / area</text>
    <text x="195" y="193" fill="#64748b" font-size="10">Text / String</text>

    <text x="45" y="216" fill="#0f172a" font-size="11">consultation_fee</text>
    <text x="195" y="216" fill="#64748b" font-size="10">Integer (BDT)</text>

    <text x="45" y="239" fill="#0f172a" font-size="11">visiting_hours / days</text>
    <text x="195" y="239" fill="#64748b" font-size="10">String(100)</text>

    <text x="45" y="262" fill="#0f172a" font-size="11">phone / serial_phone</text>
    <text x="195" y="262" fill="#64748b" font-size="10">String(30)</text>

    <text x="45" y="285" fill="#0f172a" font-size="11">latitude / longitude</text>
    <text x="195" y="285" fill="#64748b" font-size="10">Float</text>

    <text x="45" y="308" fill="#0f172a" font-size="11">rating / verified</text>
    <text x="195" y="308" fill="#64748b" font-size="10">Float / Boolean</text>
  </g>

  <!-- ENTITY 4: HOSPITALS -->
  <g transform="translate(1060, 95)" filter="url(#cardShadow)">
    <rect width="255" height="340" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    <rect width="255" height="34" rx="8" fill="url(#headerBlue)"/>
    <text x="15" y="22" fill="#ffffff" font-size="13" font-weight="700">HOSPITALS (Khulna)</text>

    <text x="15" y="55" fill="#ef4444" font-weight="700" font-size="11">PK</text>
    <text x="45" y="55" fill="#0f172a" font-size="11" font-weight="600">id</text>
    <text x="175" y="55" fill="#64748b" font-size="10">String(50)</text>

    <text x="45" y="78" fill="#0f172a" font-size="11">name</text>
    <text x="175" y="78" fill="#64748b" font-size="10">String(150)</text>

    <text x="45" y="101" fill="#0f172a" font-size="11">type (Govt/Private)</text>
    <text x="175" y="101" fill="#64748b" font-size="10">String(50)</text>

    <text x="45" y="124" fill="#0f172a" font-size="11">address / area</text>
    <text x="175" y="124" fill="#64748b" font-size="10">Text / String</text>

    <text x="45" y="147" fill="#0f172a" font-size="11">emergency_number</text>
    <text x="175" y="147" fill="#64748b" font-size="10">String(30)</text>

    <text x="45" y="170" fill="#0f172a" font-size="11">reception_number</text>
    <text x="175" y="170" fill="#64748b" font-size="10">String(30)</text>

    <text x="45" y="193" fill="#0f172a" font-size="11">has_icu / has_er</text>
    <text x="175" y="193" fill="#64748b" font-size="10">Boolean</text>

    <text x="45" y="216" fill="#0f172a" font-size="11">ambulance_available</text>
    <text x="175" y="216" fill="#64748b" font-size="10">Boolean</text>

    <text x="45" y="239" fill="#0f172a" font-size="11">total_beds</text>
    <text x="175" y="239" fill="#64748b" font-size="10">Integer</text>

    <text x="45" y="262" fill="#0f172a" font-size="11">latitude / longitude</text>
    <text x="175" y="262" fill="#64748b" font-size="10">Float</text>
  </g>

  <!-- ENTITY 5: AMBULANCES -->
  <g transform="translate(30, 480)" filter="url(#cardShadow)">
    <rect width="260" height="260" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    <rect width="260" height="34" rx="8" fill="url(#headerRed)"/>
    <text x="15" y="22" fill="#ffffff" font-size="13" font-weight="700">AMBULANCES (24/7)</text>

    <text x="15" y="55" fill="#ef4444" font-weight="700" font-size="11">PK</text>
    <text x="45" y="55" fill="#0f172a" font-size="11" font-weight="600">id</text>
    <text x="175" y="55" fill="#64748b" font-size="10">String(50)</text>

    <text x="45" y="78" fill="#0f172a" font-size="11">name</text>
    <text x="175" y="78" fill="#64748b" font-size="10">String(150)</text>

    <text x="45" y="101" fill="#0f172a" font-size="11">type (ICU / BLS)</text>
    <text x="175" y="101" fill="#64748b" font-size="10">String(50)</text>

    <text x="45" y="124" fill="#0f172a" font-size="11">base_location</text>
    <text x="175" y="124" fill="#64748b" font-size="10">String(150)</text>

    <text x="45" y="147" fill="#0f172a" font-size="11">phone / alt_phone</text>
    <text x="175" y="147" fill="#64748b" font-size="10">String(30)</text>

    <text x="45" y="170" fill="#0f172a" font-size="11">available_24_7</text>
    <text x="175" y="170" fill="#64748b" font-size="10">Boolean</text>

    <text x="45" y="193" fill="#0f172a" font-size="11">has_oxygen / ventilator</text>
    <text x="175" y="193" fill="#64748b" font-size="10">Boolean</text>

    <text x="45" y="216" fill="#0f172a" font-size="11">estimated_response</text>
    <text x="175" y="216" fill="#64748b" font-size="10">String(50)</text>
  </g>

  <!-- ENTITY 6: MEDICINES -->
  <g transform="translate(370, 480)" filter="url(#cardShadow)">
    <rect width="270" height="260" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    <rect width="270" height="34" rx="8" fill="url(#headerAmber)"/>
    <text x="15" y="22" fill="#ffffff" font-size="13" font-weight="700">MEDICINES (Pharma)</text>

    <text x="15" y="55" fill="#ef4444" font-weight="700" font-size="11">PK</text>
    <text x="45" y="55" fill="#0f172a" font-size="11" font-weight="600">id</text>
    <text x="185" y="55" fill="#64748b" font-size="10">String(50)</text>

    <text x="45" y="78" fill="#0f172a" font-size="11">brand_name / generic</text>
    <text x="185" y="78" fill="#64748b" font-size="10">String(100)</text>

    <text x="45" y="101" fill="#0f172a" font-size="11">therapeutic_class</text>
    <text x="185" y="101" fill="#64748b" font-size="10">String(150)</text>

    <text x="45" y="124" fill="#0f172a" font-size="11">manufacturer</text>
    <text x="185" y="124" fill="#64748b" font-size="10">String(100)</text>

    <text x="45" y="147" fill="#0f172a" font-size="11">dosage_form / strength</text>
    <text x="185" y="147" fill="#64748b" font-size="10">String(50)</text>

    <text x="45" y="170" fill="#0f172a" font-size="11">price_bdt</text>
    <text x="185" y="170" fill="#64748b" font-size="10">Float</text>

    <text x="45" y="193" fill="#0f172a" font-size="11">indications / side_eff</text>
    <text x="185" y="193" fill="#64748b" font-size="10">JSON</text>

    <text x="45" y="216" fill="#0f172a" font-size="11">pregnancy / food_rel</text>
    <text x="185" y="216" fill="#64748b" font-size="10">String</text>
  </g>

  <!-- ENTITY 7: DRUG_INTERACTIONS -->
  <g transform="translate(710, 480)" filter="url(#cardShadow)">
    <rect width="280" height="260" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    <rect width="280" height="34" rx="8" fill="url(#headerAmber)"/>
    <text x="15" y="22" fill="#ffffff" font-size="13" font-weight="700">DRUG_INTERACTIONS</text>

    <text x="15" y="55" fill="#ef4444" font-weight="700" font-size="11">PK</text>
    <text x="45" y="55" fill="#0f172a" font-size="11" font-weight="600">id</text>
    <text x="195" y="55" fill="#64748b" font-size="10">Integer</text>

    <text x="45" y="78" fill="#0f172a" font-size="11">drug1 (Generic)</text>
    <text x="195" y="78" fill="#64748b" font-size="10">String(100)</text>

    <text x="45" y="101" fill="#0f172a" font-size="11">drug2 (Generic)</text>
    <text x="195" y="101" fill="#64748b" font-size="10">String(100)</text>

    <text x="45" y="124" fill="#0f172a" font-size="11">severity (Severe/Mod)</text>
    <text x="195" y="124" fill="#64748b" font-size="10">String(20)</text>

    <text x="45" y="147" fill="#0f172a" font-size="11">effect</text>
    <text x="195" y="147" fill="#64748b" font-size="10">Text</text>

    <text x="45" y="170" fill="#0f172a" font-size="11">recommendation</text>
    <text x="195" y="170" fill="#64748b" font-size="10">Text</text>
  </g>

  <!-- ENTITY 8: BMI_LOGS & HEALTH_ACTIVITIES (STACKED RIGHT) -->
  <g transform="translate(1060, 480)" filter="url(#cardShadow)">
    <rect width="255" height="180" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    <rect width="255" height="34" rx="8" fill="url(#headerTeal)"/>
    <text x="15" y="22" fill="#ffffff" font-size="13" font-weight="700">BMI_LOGS</text>

    <text x="15" y="55" fill="#ef4444" font-weight="700" font-size="11">PK</text>
    <text x="45" y="55" fill="#0f172a" font-size="11">id</text>
    <text x="175" y="55" fill="#64748b" font-size="10">Integer</text>

    <text x="15" y="78" fill="#8b5cf6" font-weight="700" font-size="11">FK</text>
    <text x="45" y="78" fill="#0f172a" font-size="11">user_id</text>
    <text x="175" y="78" fill="#64748b" font-size="10">String(36)</text>

    <text x="45" y="101" fill="#0f172a" font-size="11">date / weight_kg</text>
    <text x="175" y="101" fill="#64748b" font-size="10">String / Float</text>

    <text x="45" y="124" fill="#0f172a" font-size="11">height_cm / bmi</text>
    <text x="175" y="124" fill="#64748b" font-size="10">Float / Float</text>

    <text x="45" y="147" fill="#0f172a" font-size="11">category / notes</text>
    <text x="175" y="147" fill="#64748b" font-size="10">String</text>
  </g>

  <!-- RELATIONSHIP CONNECTORS -->
  <!-- Users to Appointments (1 to N) -->
  <line x1="290" y1="160" x2="370" y2="160" stroke="#2563eb" stroke-width="2.5"/>
  <text x="300" y="152" fill="#2563eb" font-size="10" font-weight="700">1</text>
  <text x="355" y="152" fill="#2563eb" font-size="10" font-weight="700">N</text>

  <!-- Doctors to Appointments (1 to N) -->
  <line x1="710" y1="180" x2="640" y2="180" stroke="#4f46e5" stroke-width="2.5"/>
  <text x="695" y="172" fill="#4f46e5" font-size="10" font-weight="700">1</text>
  <text x="655" y="172" fill="#4f46e5" font-size="10" font-weight="700">N</text>

  <!-- Users to BMI_Logs (1 to N) -->
  <path d="M 160 435 L 160 820 L 1180 820 L 1180 660" fill="none" stroke="#0d9488" stroke-width="2" stroke-dasharray="4,4"/>
  <text x="170" y="450" fill="#0d9488" font-size="10" font-weight="700">1 (users)</text>
  <text x="1115" y="685" fill="#0d9488" font-size="10" font-weight="700">N (bmi_logs)</text>

  <!-- Footer Legend -->
  <rect x="30" y="865" width="1285" height="45" rx="6" fill="#f8fafc" stroke="#e2e8f0"/>
  <text x="45" y="892" fill="#0f172a" font-size="11" font-weight="600">Schema Summary: 9 Relational Entities, SQLite/PostgreSQL Compatible via SQLAlchemy ORM</text>
  <text x="800" y="892" fill="#64748b" font-size="11">PK: Primary Key | FK: Foreign Key | UK: Unique Key | 1:N Cardinality</text>
</svg>
'''

# ==========================================
# 3. GENERATE ARCHITECTURE DIAGRAM SVG
# ==========================================
def build_architecture_diagram_svg():
    return '''
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="100%" height="100%" style="background:#ffffff; font-family:'Segoe UI', Inter, system-ui, sans-serif;">
  <defs>
    <linearGradient id="blueBar" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e3a8a"/>
      <stop offset="100%" stop-color="#3b82f6"/>
    </linearGradient>
    <linearGradient id="cardGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f8fafc"/>
    </linearGradient>
    <filter id="boxShadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="3" stdDeviation="4" flood-opacity="0.08"/>
    </filter>
  </defs>

  <!-- Top Banner -->
  <rect x="25" y="20" width="1150" height="65" rx="10" fill="url(#blueBar)"/>
  <text x="50" y="50" fill="#ffffff" font-size="20" font-weight="700">INITIAL SYSTEM ARCHITECTURE DIAGRAM – MEDNEX PLATFORM</text>
  <text x="50" y="70" fill="#93c5fd" font-size="12">Course: CSE4104 | 4-Tier Topology: Client Frontend, FastAPI Server, Machine Learning Engine &amp; Persistence</text>

  <!-- TIER 1: PRESENTATION TIER -->
  <g transform="translate(25, 110)">
    <rect width="1150" height="160" rx="12" fill="#eff6ff" stroke="#93c5fd" stroke-width="2" filter="url(#boxShadow)"/>
    <rect x="20" y="15" width="280" height="26" rx="6" fill="#2563eb"/>
    <text x="30" y="33" fill="#ffffff" font-size="12" font-weight="700">TIER 1: PRESENTATION LAYER (SPA)</text>

    <!-- Cards inside Tier 1 -->
    <g transform="translate(20, 55)">
      <rect width="210" height="85" rx="8" fill="#ffffff" stroke="#bfdbfe" stroke-width="1.5"/>
      <text x="15" y="25" fill="#1e3a8a" font-size="12" font-weight="700">React 19 + TypeScript</text>
      <text x="15" y="45" fill="#64748b" font-size="10">• Vite v8 Build Tooling</text>
      <text x="15" y="62" fill="#64748b" font-size="10">• React Router v7 Navigation</text>
    </g>

    <g transform="translate(250, 55)">
      <rect width="210" height="85" rx="8" fill="#ffffff" stroke="#bfdbfe" stroke-width="1.5"/>
      <text x="15" y="25" fill="#1e3a8a" font-size="12" font-weight="700">Tailwind CSS v4 &amp; Lucide</text>
      <text x="15" y="45" fill="#64748b" font-size="10">• Mobile-First Header &amp; Nav</text>
      <text x="15" y="62" fill="#64748b" font-size="10">• Responsive Drawer &amp; Cards</text>
    </g>

    <g transform="translate(480, 55)">
      <rect width="210" height="85" rx="8" fill="#ffffff" stroke="#bfdbfe" stroke-width="1.5"/>
      <text x="15" y="25" fill="#1e3a8a" font-size="12" font-weight="700">Interactive Visual Map</text>
      <text x="15" y="45" fill="#64748b" font-size="10">• SVG Anatomical Body Map</text>
      <text x="15" y="62" fill="#64748b" font-size="10">• Multi-Region Selectors</text>
    </g>

    <g transform="translate(710, 55)">
      <rect width="210" height="85" rx="8" fill="#ffffff" stroke="#bfdbfe" stroke-width="1.5"/>
      <text x="15" y="25" fill="#1e3a8a" font-size="12" font-weight="700">Recharts &amp; Web Audio</text>
      <text x="15" y="45" fill="#64748b" font-size="10">• Longitudinal BMI Curves</text>
      <text x="15" y="62" fill="#64748b" font-size="10">• 100-120 BPM CPR Metronome</text>
    </g>

    <g transform="translate(940, 55)">
      <rect width="190" height="85" rx="8" fill="#ffffff" stroke="#bfdbfe" stroke-width="1.5"/>
      <text x="15" y="25" fill="#1e3a8a" font-size="12" font-weight="700">State &amp; Cache Store</text>
      <text x="15" y="45" fill="#64748b" font-size="10">• AuthContext &amp; User</text>
      <text x="15" y="62" fill="#64748b" font-size="10">• HealthContext Timeline</text>
    </g>
  </g>

  <!-- CONNECTION ARROWS 1 -> 2 -->
  <line x1="600" y1="270" x2="600" y2="320" stroke="#2563eb" stroke-width="3"/>
  <polygon points="595,315 600,325 605,315" fill="#2563eb"/>
  <rect x="520" y="285" width="160" height="20" rx="4" fill="#ffffff" stroke="#93c5fd"/>
  <text x="600" y="299" text-anchor="middle" fill="#2563eb" font-size="10" font-weight="700">REST API / JSON / CORS</text>

  <!-- TIER 2: APPLICATION & API TIER -->
  <g transform="translate(25, 325)">
    <rect width="1150" height="180" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" filter="url(#boxShadow)"/>
    <rect x="20" y="15" width="310" height="26" rx="6" fill="#0f172a"/>
    <text x="30" y="33" fill="#ffffff" font-size="12" font-weight="700">TIER 2: APPLICATION API LAYER (FASTAPI)</text>
    
    <!-- Endpoints Grid -->
    <g transform="translate(20, 55)">
      <rect width="170" height="100" rx="6" fill="#ffffff" stroke="#e2e8f0"/>
      <text x="12" y="24" fill="#0f172a" font-size="11" font-weight="700">Auth Router</text>
      <text x="12" y="42" fill="#64748b" font-size="10">/api/auth/login</text>
      <text x="12" y="58" fill="#64748b" font-size="10">/api/auth/signup</text>
      <text x="12" y="74" fill="#64748b" font-size="10">/api/auth/profile</text>
      <text x="12" y="90" fill="#10b981" font-size="9" font-weight="600">JWT / Password Hash</text>
    </g>

    <g transform="translate(205, 55)">
      <rect width="170" height="100" rx="6" fill="#ffffff" stroke="#e2e8f0"/>
      <text x="12" y="24" fill="#0f172a" font-size="11" font-weight="700">Symptom Router</text>
      <text x="12" y="42" fill="#64748b" font-size="10">/api/symptoms/triage</text>
      <text x="12" y="58" fill="#64748b" font-size="10">Duration &amp; Pain Scale</text>
      <text x="12" y="74" fill="#64748b" font-size="10">Specialty Mapping</text>
      <text x="12" y="90" fill="#ef4444" font-size="9" font-weight="600">Red-Flag Interceptor</text>
    </g>

    <g transform="translate(390, 55)">
      <rect width="170" height="100" rx="6" fill="#ffffff" stroke="#e2e8f0"/>
      <text x="12" y="24" fill="#0f172a" font-size="11" font-weight="700">Doctors &amp; Serials</text>
      <text x="12" y="42" fill="#64748b" font-size="10">/api/doctors (BMDC)</text>
      <text x="12" y="58" fill="#64748b" font-size="10">/api/appointments</text>
      <text x="12" y="74" fill="#64748b" font-size="10">Serial Reservation</text>
      <text x="12" y="90" fill="#2563eb" font-size="9" font-weight="600">Khulna Registry</text>
    </g>

    <g transform="translate(575, 55)">
      <rect width="170" height="100" rx="6" fill="#ffffff" stroke="#e2e8f0"/>
      <text x="12" y="24" fill="#0f172a" font-size="11" font-weight="700">Emergency &amp; ER</text>
      <text x="12" y="42" fill="#64748b" font-size="10">/api/ambulances</text>
      <text x="12" y="58" fill="#64748b" font-size="10">/api/hospitals</text>
      <text x="12" y="74" fill="#64748b" font-size="10">ICU / Oxygen Specs</text>
      <text x="12" y="90" fill="#dc2626" font-size="9" font-weight="600">999 Hotline Direct</text>
    </g>

    <g transform="translate(760, 55)">
      <rect width="170" height="100" rx="6" fill="#ffffff" stroke="#e2e8f0"/>
      <text x="12" y="24" fill="#0f172a" font-size="11" font-weight="700">Report &amp; OCR</text>
      <text x="12" y="42" fill="#64748b" font-size="10">/api/reports/analyze</text>
      <text x="12" y="58" fill="#64748b" font-size="10">Biomarker Regex</text>
      <text x="12" y="74" fill="#64748b" font-size="10">Reference Ranges</text>
      <text x="12" y="90" fill="#0d9488" font-size="9" font-weight="600">Question Checklist</text>
    </g>

    <g transform="translate(945, 55)">
      <rect width="185" height="100" rx="6" fill="#ffffff" stroke="#e2e8f0"/>
      <text x="12" y="24" fill="#0f172a" font-size="11" font-weight="700">Pharma &amp; Fitness</text>
      <text x="12" y="42" fill="#64748b" font-size="10">/api/medicines/search</text>
      <text x="12" y="58" fill="#64748b" font-size="10">/api/medicines/interact</text>
      <text x="12" y="74" fill="#64748b" font-size="10">/api/fitness/bmi-log</text>
      <text x="12" y="90" fill="#f59e0b" font-size="9" font-weight="600">WHO Standards</text>
    </g>
  </g>

  <!-- SPLIT CONNECTION ARROWS 2 -> 3 (LEFT) & 2 -> 4 (RIGHT) -->
  <line x1="340" y1="505" x2="340" y2="560" stroke="#0d9488" stroke-width="2.5"/>
  <polygon points="335,555 340,565 345,555" fill="#0d9488"/>
  <text x="340" y="535" text-anchor="middle" fill="#0d9488" font-size="10" font-weight="700">Inference Requests</text>

  <line x1="860" y1="505" x2="860" y2="560" stroke="#2563eb" stroke-width="2.5"/>
  <polygon points="855,555 860,565 865,555" fill="#2563eb"/>
  <text x="860" y="535" text-anchor="middle" fill="#2563eb" font-size="10" font-weight="700">SQLAlchemy ORM Queries</text>

  <!-- TIER 3 & 4 IN PARALLEL -->
  <!-- TIER 3: AI & MACHINE LEARNING TIER (LEFT) -->
  <g transform="translate(25, 570)">
    <rect width="560" height="280" rx="12" fill="#f0fdfa" stroke="#99f6e4" stroke-width="2" filter="url(#boxShadow)"/>
    <rect x="20" y="15" width="310" height="26" rx="6" fill="#0d9488"/>
    <text x="30" y="33" fill="#ffffff" font-size="12" font-weight="700">TIER 3: AI / NLP &amp; CLINICAL RULES TIER</text>

    <!-- ML Module 1 -->
    <g transform="translate(20, 55)">
      <rect width="520" height="46" rx="6" fill="#ffffff" stroke="#ccfbf1"/>
      <text x="15" y="22" fill="#0f766e" font-size="11" font-weight="700">NLP Symptom Classifier (TF-IDF + Multinomial Naive Bayes)</text>
      <text x="15" y="38" fill="#64748b" font-size="10">Classifies patient descriptions to clinical specialty categories (Accuracy &gt; 92%)</text>
    </g>

    <!-- ML Module 2 -->
    <g transform="translate(20, 110)">
      <rect width="520" height="46" rx="6" fill="#ffffff" stroke="#fee2e2"/>
      <text x="15" y="22" fill="#b91c1c" font-size="11" font-weight="700">Clinical Red-Flag Regex Rule Interceptor</text>
      <text x="15" y="38" fill="#64748b" font-size="10">Instantly detects cardiac, stroke, respiratory &amp; trauma emergencies &lt; 50 ms</text>
    </g>

    <!-- ML Module 3 -->
    <g transform="translate(20, 165)">
      <rect width="520" height="46" rx="6" fill="#ffffff" stroke="#ccfbf1"/>
      <text x="15" y="22" fill="#0f766e" font-size="11" font-weight="700">Biomarker OCR Parser &amp; Reference Interval Evaluator</text>
      <text x="15" y="38" fill="#64748b" font-size="10">Parses numerical parameters (CBC, Lipid, LFT) and tags Low/Elevated/Critical</text>
    </g>

    <!-- ML Module 4 -->
    <g transform="translate(20, 220)">
      <rect width="520" height="46" rx="6" fill="#ffffff" stroke="#ccfbf1"/>
      <text x="15" y="22" fill="#0f766e" font-size="11" font-weight="700">Fuzzy Drug Matcher &amp; Pharmacological Interaction Matrix</text>
      <text x="15" y="38" fill="#64748b" font-size="10">Fuzzy string distance on Bangladeshi drug packaging &amp; reciprocal contraindications</text>
    </g>
  </g>

  <!-- TIER 4: PERSISTENCE TIER (RIGHT) -->
  <g transform="translate(615, 570)">
    <rect width="560" height="280" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" filter="url(#boxShadow)"/>
    <rect x="20" y="15" width="280" height="26" rx="6" fill="#2563eb"/>
    <text x="30" y="33" fill="#ffffff" font-size="12" font-weight="700">TIER 4: DATA PERSISTENCE LAYER</text>

    <!-- DB Module 1 -->
    <g transform="translate(20, 55)">
      <rect width="520" height="60" rx="6" fill="#ffffff" stroke="#e2e8f0"/>
      <text x="15" y="24" fill="#1e3a8a" font-size="12" font-weight="700">SQLite / PostgreSQL Relational Database (mednex.db)</text>
      <text x="15" y="42" fill="#64748b" font-size="10">Persistent tables: users, doctors, hospitals, ambulances, appointments, medicines, bmi_logs</text>
    </g>

    <!-- DB Module 2 -->
    <g transform="translate(20, 125)">
      <rect width="520" height="65" rx="6" fill="#ffffff" stroke="#e2e8f0"/>
      <text x="15" y="24" fill="#1e3a8a" font-size="12" font-weight="700">Verified Khulna Clinical Seed Dataset</text>
      <text x="15" y="42" fill="#64748b" font-size="10">• Real BMDC Doctors (KMCH, Gazi Medical, Sheikh Abu Naser Specialized)</text>
      <text x="15" y="56" fill="#64748b" font-size="10">• 24/7 Verified Ambulance Fleet Contacts &amp; Bangladesh Pharmaceutical Catalog</text>
    </g>

    <!-- DB Module 3 -->
    <g transform="translate(20, 200)">
      <rect width="520" height="65" rx="6" fill="#ffffff" stroke="#e2e8f0"/>
      <text x="15" y="24" fill="#1e3a8a" font-size="12" font-weight="700">SQLAlchemy 2.0 ORM &amp; Pydantic Serializers</text>
      <text x="15" y="42" fill="#64748b" font-size="10">• Object relational mapping with cascaded relationships &amp; foreign key integrity</text>
      <text x="15" y="56" fill="#64748b" font-size="10">• Automated schema migration support</text>
    </g>
  </g>

</svg>
'''

# ==========================================
# 4. GENERATE FULL SRS HTML
# ==========================================
def convert_srs_markdown_to_html():
    with open("SRS.md", "r", encoding="utf-8") as f:
        md_content = f.read()

    # Pre-render Mermaid codeblocks into embedded SVG placeholders
    use_case_svg = build_use_case_diagram_svg()
    er_svg = build_er_diagram_svg()
    arch_svg = build_architecture_diagram_svg()

    # Simple clean markdown-to-html transformation
    html_body = []
    lines = md_content.split("\n")
    in_table = False
    in_code = False
    code_block = []

    for line in lines:
        # Check code block
        if line.startswith("```"):
            if in_code:
                in_code = False
                code_text = "\n".join(code_block)
                if "flowchart LR" in code_text or "Actors" in code_text:
                    html_body.append(f'<div class="diagram-container">{use_case_svg}</div>')
                elif "erDiagram" in code_text:
                    html_body.append(f'<div class="diagram-container">{er_svg}</div>')
                elif "flowchart TD" in code_text:
                    html_body.append(f'<div class="diagram-container">{arch_svg}</div>')
                else:
                    html_body.append(f'<pre><code>{code_text}</code></pre>')
                code_block = []
            else:
                in_code = True
                code_block = []
            continue

        if in_code:
            code_block.append(line)
            continue

        # Tables
        if "|" in line:
            if not in_table:
                in_table = True
                html_body.append('<div class="table-wrapper"><table>')
            cells = [c.strip() for c in line.split("|")[1:-1]]
            if len(cells) > 0 and all(c.replace("-", "").replace(":", "") == "" for c in cells):
                continue # Header separator
            row_html = "".join([f"<td>{c}</td>" for c in cells])
            html_body.append(f"<tr>{row_html}</tr>")
            continue
        else:
            if in_table:
                in_table = False
                html_body.append('</table></div>')

        # Headings
        if line.startswith("# "):
            html_body.append(f'<h1>{line[2:]}</h1>')
        elif line.startswith("## "):
            html_body.append(f'<h2 class="section-title">{line[3:]}</h2>')
        elif line.startswith("### "):
            html_body.append(f'<h3>{line[4:]}</h3>')
        elif line.startswith("#### "):
            html_body.append(f'<h4>{line[5:]}</h4>')
        elif line.startswith("- "):
            html_body.append(f'<li>{line[2:]}</li>')
        elif line.startswith("---"):
            html_body.append('<hr class="divider"/>')
        elif line.strip() == "":
            html_body.append('<br/>')
        else:
            # Inline bold / code formatting
            formatted = line
            formatted = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', formatted)
            formatted = re.sub(r'`(.*?)`', r'<code>\1</code>', formatted)
            html_body.append(f'<p>{formatted}</p>')

    if in_table:
        html_body.append('</table></div>')

    full_html = f'''<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<title>CSE4104-7A-T01_SRS</title>
<style>
  @page {{
    size: A4 portrait;
    margin: 18mm 15mm 18mm 15mm;
    @bottom-center {{
      content: counter(page);
    }}
  }}
  body {{
    font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Inter, Helvetica, Arial, sans-serif;
    color: #1e293b;
    line-height: 1.6;
    font-size: 10.5pt;
    margin: 0;
    padding: 0;
  }}
  .cover-page {{
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    page-break-after: always;
    border-bottom: 2px solid #e2e8f0;
  }}
  .cover-badge {{
    background: #dbeafe;
    color: #1e40af;
    font-size: 11pt;
    font-weight: 700;
    padding: 6px 16px;
    border-radius: 20px;
    margin-bottom: 20px;
    letter-spacing: 1px;
    display: inline-block;
  }}
  .cover-title {{
    font-size: 28pt;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.2;
    margin: 0 0 10px 0;
  }}
  .cover-subtitle {{
    font-size: 16pt;
    font-weight: 600;
    color: #2563eb;
    margin-bottom: 30px;
  }}
  .cover-meta {{
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 24px 32px;
    width: 80%;
    margin-top: 40px;
    text-align: left;
    font-size: 11pt;
  }}
  .cover-meta table {{
    width: 100%;
    border-collapse: collapse;
  }}
  .cover-meta td {{
    padding: 6px 10px;
    border-bottom: 1px solid #f1f5f9;
  }}
  .cover-meta td:first-child {{
    font-weight: 700;
    color: #475569;
    width: 35%;
  }}
  h1 {{
    font-size: 20pt;
    color: #0f172a;
    border-bottom: 2px solid #2563eb;
    padding-bottom: 8px;
    margin-top: 30px;
    page-break-after: avoid;
  }}
  h2.section-title {{
    font-size: 15pt;
    color: #1e3a8a;
    background: #f1f5f9;
    padding: 8px 12px;
    border-left: 5px solid #2563eb;
    margin-top: 28px;
    border-radius: 4px;
    page-break-before: always;
    page-break-after: avoid;
  }}
  h3 {{
    font-size: 12.5pt;
    color: #0f172a;
    margin-top: 18px;
    page-break-after: avoid;
  }}
  h4 {{
    font-size: 11pt;
    color: #334155;
    margin-top: 14px;
    page-break-after: avoid;
  }}
  p {{
    margin: 6px 0;
    text-align: justify;
  }}
  li {{
    margin: 4px 0;
  }}
  .divider {{
    border: none;
    height: 1px;
    background: #e2e8f0;
    margin: 20px 0;
  }}
  .table-wrapper {{
    margin: 15px 0;
    page-break-inside: avoid;
  }}
  table {{
    width: 100%;
    border-collapse: collapse;
    font-size: 9.5pt;
  }}
  tr:nth-child(even) {{
    background: #f8fafc;
  }}
  tr:first-child {{
    background: #1e3a8a;
    color: #ffffff;
    font-weight: 700;
  }}
  td {{
    padding: 6px 8px;
    border: 1px solid #cbd5e1;
  }}
  code {{
    background: #f1f5f9;
    color: #0f766e;
    padding: 2px 4px;
    border-radius: 4px;
    font-family: Consolas, monospace;
    font-size: 9pt;
  }}
  pre {{
    background: #0f172a;
    color: #f8fafc;
    padding: 12px;
    border-radius: 8px;
    overflow-x: auto;
    font-size: 8.5pt;
    page-break-inside: avoid;
  }}
  .diagram-container {{
    margin: 20px 0;
    page-break-inside: avoid;
    text-align: center;
  }}
</style>
</head>
<body>
  <!-- Cover Page -->
  <div class="cover-page">
    <div class="cover-badge">DEPARTMENT OF COMPUTER SCIENCE &amp; ENGINEERING</div>
    <div class="cover-title">SOFTWARE REQUIREMENTS SPECIFICATION (SRS)</div>
    <div class="cover-subtitle">MedNex – AI-Powered Healthcare Assistance &amp; Clinical Triage Platform</div>
    
    <div class="cover-meta">
      <table>
        <tr><td>Course Code:</td><td><strong>CSE4104 – Software Engineering Project</strong></td></tr>
        <tr><td>Project Title:</td><td><strong>MedNex Platform</strong></td></tr>
        <tr><td>Submission Stage:</td><td>Phase 1: Project Proposal &amp; Formal SRS</td></tr>
        <tr><td>Document ID:</td><td>CSE4104-7A-T01_SRS</td></tr>
        <tr><td>Academic Term:</td><td>Fall 2026</td></tr>
        <tr><td>Target Region:</td><td>Khulna Division, Bangladesh</td></tr>
        <tr><td>Status:</td><td>Approved for System Design &amp; Architecture Phase</td></tr>
      </table>
    </div>
  </div>

  <!-- Body Content -->
  {"".join(html_body)}
</body>
</html>
'''
    html_path = os.path.join(SUBMISSIONS_DIR, "srs_document.html")
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(full_html)
    return html_path

# ==========================================
# 5. GENERATE STANDALONE DIAGRAM HTMLS
# ==========================================
def build_standalone_diagram_html(title, subtitle, svg_content, filename):
    html = f'''<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<title>{title}</title>
<style>
  @page {{
    size: A4 landscape;
    margin: 10mm;
  }}
  body {{
    margin: 0;
    padding: 0;
    background: #ffffff;
    font-family: 'Segoe UI', Inter, system-ui, sans-serif;
    display: flex;
    flex-direction: column;
    height: 100vh;
    box-sizing: border-box;
  }}
  .diagram-box {{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
  }}
  svg {{
    max-width: 100%;
    max-height: 95vh;
  }}
</style>
</head>
<body>
  <div class="diagram-box">
    {svg_content}
  </div>
</body>
</html>
'''
    path = os.path.join(SUBMISSIONS_DIR, filename)
    with open(path, "w", encoding="utf-8") as f:
        f.write(html)
    return path

# ==========================================
# MAIN EXECUTION
# ==========================================
if __name__ == "__main__":
    print("==================================================")
    print("Building Submission Artifacts & PDFs for MedNex...")
    print("==================================================")

    # 1. Standalone Use Case Diagram
    use_case_html = build_standalone_diagram_html(
        "CSE4104-7A-T01_UseCaseDiagram",
        "UML Use Case Diagram",
        build_use_case_diagram_svg(),
        "use_case.html"
    )
    use_case_pdf = os.path.join(SUBMISSIONS_DIR, "CSE4104-7A-T01_UseCaseDiagram.pdf")
    run_chrome_pdf(use_case_html, use_case_pdf, landscape=True)

    # 2. Standalone ER Diagram
    er_html = build_standalone_diagram_html(
        "CSE4104-7A-T01_ERDiagram",
        "Entity Relationship Diagram (ERD)",
        build_er_diagram_svg(),
        "er_diagram.html"
    )
    er_pdf = os.path.join(SUBMISSIONS_DIR, "CSE4104-7A-T01_ERDiagram.pdf")
    run_chrome_pdf(er_html, er_pdf, landscape=True)

    # 3. Standalone Architecture Diagram
    arch_html = build_standalone_diagram_html(
        "CSE4104-7A-T01_ArchitectureDiagram",
        "Initial System Architecture Diagram",
        build_architecture_diagram_svg(),
        "architecture.html"
    )
    arch_pdf = os.path.join(SUBMISSIONS_DIR, "CSE4104-7A-T01_ArchitectureDiagram.pdf")
    run_chrome_pdf(arch_html, arch_pdf, landscape=True)

    # 4. Full SRS Document (Portrait)
    print("Rendering comprehensive SRS Document...")
    srs_html = convert_srs_markdown_to_html()
    srs_pdf = os.path.join(SUBMISSIONS_DIR, "CSE4104-7A-T01_SRS.pdf")
    run_chrome_pdf(srs_html, srs_pdf, landscape=False)

    print("\nAll submission PDFs generated successfully in: " + SUBMISSIONS_DIR)

