"""
Pydantic Schemas for MedNex API
"""
from typing import List, Optional, Any, Dict
from pydantic import BaseModel, EmailStr

# Auth Schemas
class UserSignup(BaseModel):
    name: str
    email: EmailStr
    password: str
    phone: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    blood_group: Optional[str] = None
    city: Optional[str] = "Khulna"

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserProfileUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    blood_group: Optional[str] = None
    city: Optional[str] = None
    emergency_contact: Optional[str] = None
    allergies: Optional[List[str]] = None
    chronic_conditions: Optional[List[str]] = None

class UserOut(BaseModel):
    id: str
    name: str
    email: str
    phone: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    blood_group: Optional[str] = None
    city: Optional[str] = "Khulna"
    emergency_contact: Optional[str] = None
    allergies: List[str] = []
    chronic_conditions: List[str] = []

    class Config:
        from_attributes = True

class AuthResponse(BaseModel):
    token: str
    user: UserOut

# Doctor Schemas
class DoctorOut(BaseModel):
    id: str
    name: str
    degrees: str
    specialty: str
    designation: str
    hospital: str
    bmdc_reg_no: str
    experience_years: int
    chamber_address: str
    area: str
    consultation_fee: int
    visiting_hours: str
    visiting_days: str
    phone: str
    serial_phone: str
    latitude: float
    longitude: float
    rating: float
    verified: bool

    class Config:
        from_attributes = True

# Hospital & Ambulance Schemas
class HospitalOut(BaseModel):
    id: str
    name: str
    type: str
    address: str
    area: str
    emergency_number: str
    reception_number: str
    has_icu: bool
    has_emergency_ward: bool
    ambulance_available: bool
    total_beds: Optional[int] = None
    latitude: float
    longitude: float

    class Config:
        from_attributes = True

class AmbulanceOut(BaseModel):
    id: str
    name: str
    type: str
    base_location: str
    coverage_area: str
    phone: str
    alternate_phone: Optional[str] = None
    available_24_7: bool
    has_oxygen: bool
    has_ventilator: bool
    estimated_response_time: str

    class Config:
        from_attributes = True

# Appointment Schemas
class AppointmentCreate(BaseModel):
    user_id: str
    doctor_id: str
    patient_name: str
    patient_phone: str
    patient_age: int
    appointment_date: str
    symptom_summary: Optional[str] = None

class AppointmentOut(BaseModel):
    id: str
    user_id: str
    doctor_id: str
    doctor_name: str
    specialty: str
    hospital_or_chamber: str
    appointment_date: str
    serial_number: int
    estimated_time: str
    patient_name: str
    patient_phone: str
    patient_age: int
    symptom_summary: Optional[str] = None
    status: str

    class Config:
        from_attributes = True

# Medicine Schemas
class MedicineOut(BaseModel):
    id: str
    brand_name: str
    generic_name: str
    therapeutic_class: str
    manufacturer: str
    dosage_form: str
    strength: str
    price_bdt: float
    indications: List[str]
    side_effects: List[str]
    precautions: List[str]
    pregnancy_category: Optional[str] = None
    food_relation: Optional[str] = None

    class Config:
        from_attributes = True

class InteractionCheckRequest(BaseModel):
    drugs: List[str]

class DrugInteractionResult(BaseModel):
    drug1: str
    drug2: str
    severity: str
    effect: str
    recommendation: str

class MedicineOCRRequest(BaseModel):
    text: Optional[str] = None
    image_base64: Optional[str] = None

class MedicineOCRResponse(BaseModel):
    extracted_text: str
    matched_medicine: Optional[MedicineOut] = None
    confidence_score: float
    match_status: str

# Symptom Checker ML Schemas
class SymptomAnalysisRequest(BaseModel):
    description: str
    selected_symptoms: Optional[List[str]] = []
    duration: Optional[str] = None
    severity: Optional[str] = "Mild"  # Mild, Moderate, Severe
    medical_history: Optional[str] = None

class SymptomAnalysisResponse(BaseModel):
    urgency_level: str  # emergency, high, moderate, low
    is_emergency: bool
    emergency_warning: Optional[str] = None
    primary_specialty: str
    alternative_specialties: List[str] = []
    confidence_score: float
    possible_causes: List[str]
    recommended_action: str
    home_care_advice: List[str] = []
    red_flags: List[str] = []

# Report Analyzer Schemas
class ReportAnalysisRequest(BaseModel):
    report_text: str
    patient_age: Optional[int] = 35
    patient_gender: Optional[str] = "Male"
    report_category: Optional[str] = "General Lab"

class BiomarkerResult(BaseModel):
    name: str
    value: float
    unit: str
    reference_range: str
    status: str  # Normal, Low, High, Critical
    explanation: str

class ReportAnalysisResponse(BaseModel):
    report_type: str
    biomarkers: List[BiomarkerResult]
    normal_count: int
    abnormal_count: int
    clinical_summary: str
    questions_for_doctor: List[str]
    safety_disclaimer: str

# Fitness Tracker Schemas
class BMILogCreate(BaseModel):
    user_id: str
    date: str
    weight_kg: float
    height_cm: float
    bmi: float
    category: str
    notes: Optional[str] = None

class BMILogOut(BaseModel):
    id: int
    user_id: str
    date: str
    weight_kg: float
    height_cm: float
    bmi: float
    category: str
    notes: Optional[str] = None

    class Config:
        from_attributes = True

# Health Activity Log Schemas
class HealthActivityCreate(BaseModel):
    user_id: str
    type: str
    title: str
    timestamp: str
    summary: str
    tag: str
    severity: str

class HealthActivityOut(BaseModel):
    id: str
    user_id: str
    type: str
    title: str
    timestamp: str
    summary: str
    tag: str
    severity: str

    class Config:
        from_attributes = True

