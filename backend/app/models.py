"""
SQLAlchemy ORM Models for MedNex Platform
"""
from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, Boolean, Text, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    phone = Column(String(20), nullable=True)
    age = Column(Integer, nullable=True)
    gender = Column(String(20), nullable=True)
    blood_group = Column(String(10), nullable=True)
    city = Column(String(100), default="Khulna")
    emergency_contact = Column(String(20), nullable=True)
    allergies = Column(JSON, default=list)
    chronic_conditions = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.utcnow)

    appointments = relationship("Appointment", back_populates="user", cascade="all, delete-orphan")
    bmi_logs = relationship("BMILog", back_populates="user", cascade="all, delete-orphan")
    activities = relationship("HealthActivity", back_populates="user", cascade="all, delete-orphan")


class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(String(50), primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    degrees = Column(String(200), nullable=False)
    specialty = Column(String(100), index=True, nullable=False)
    designation = Column(String(200), nullable=False)
    hospital = Column(String(200), nullable=False)
    bmdc_reg_no = Column(String(50), unique=True, nullable=False)
    experience_years = Column(Integer, nullable=False)
    chamber_address = Column(Text, nullable=False)
    area = Column(String(100), index=True, nullable=False)
    consultation_fee = Column(Integer, nullable=False)
    visiting_hours = Column(String(100), nullable=False)
    visiting_days = Column(String(100), nullable=False)
    phone = Column(String(30), nullable=False)
    serial_phone = Column(String(30), nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    rating = Column(Float, default=4.8)
    verified = Column(Boolean, default=True)


class Hospital(Base):
    __tablename__ = "hospitals"

    id = Column(String(50), primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    type = Column(String(50), nullable=False)  # "Government Tertiary", "Private Specialized", etc.
    address = Column(Text, nullable=False)
    area = Column(String(100), index=True, nullable=False)
    emergency_number = Column(String(30), nullable=False)
    reception_number = Column(String(30), nullable=False)
    has_icu = Column(Boolean, default=True)
    has_emergency_ward = Column(Boolean, default=True)
    ambulance_available = Column(Boolean, default=True)
    total_beds = Column(Integer, nullable=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)


class AmbulanceProvider(Base):
    __tablename__ = "ambulances"

    id = Column(String(50), primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    type = Column(String(50), nullable=False)  # "ICU Ambulance", "Basic Life Support", etc.
    base_location = Column(String(150), nullable=False)
    coverage_area = Column(String(150), nullable=False)
    phone = Column(String(30), nullable=False)
    alternate_phone = Column(String(30), nullable=True)
    available_24_7 = Column(Boolean, default=True)
    has_oxygen = Column(Boolean, default=True)
    has_ventilator = Column(Boolean, default=False)
    estimated_response_time = Column(String(50), nullable=False)


class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(String(50), primary_key=True, index=True)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    doctor_id = Column(String(50), ForeignKey("doctors.id"), nullable=False)
    doctor_name = Column(String(100), nullable=False)
    specialty = Column(String(100), nullable=False)
    hospital_or_chamber = Column(String(200), nullable=False)
    appointment_date = Column(String(30), nullable=False)
    serial_number = Column(Integer, nullable=False)
    estimated_time = Column(String(50), nullable=False)
    patient_name = Column(String(100), nullable=False)
    patient_phone = Column(String(30), nullable=False)
    patient_age = Column(Integer, nullable=False)
    symptom_summary = Column(Text, nullable=True)
    status = Column(String(30), default="Confirmed")  # Confirmed, Completed, Cancelled
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="appointments")


class Medicine(Base):
    __tablename__ = "medicines"

    id = Column(String(50), primary_key=True, index=True)
    brand_name = Column(String(100), index=True, nullable=False)
    generic_name = Column(String(100), index=True, nullable=False)
    therapeutic_class = Column(String(150), nullable=False)
    manufacturer = Column(String(100), nullable=False)
    dosage_form = Column(String(50), nullable=False)
    strength = Column(String(50), nullable=False)
    price_bdt = Column(Float, nullable=False)
    indications = Column(JSON, default=list)
    side_effects = Column(JSON, default=list)
    precautions = Column(JSON, default=list)
    pregnancy_category = Column(String(10), nullable=True)
    food_relation = Column(String(100), nullable=True)


class DrugInteraction(Base):
    __tablename__ = "drug_interactions"

    id = Column(Integer, primary_key=True, autoincrement=True)
    drug1 = Column(String(100), index=True, nullable=False)
    drug2 = Column(String(100), index=True, nullable=False)
    severity = Column(String(20), nullable=False)  # "Severe", "Moderate", "Minor"
    effect = Column(Text, nullable=False)
    recommendation = Column(Text, nullable=False)


class BMILog(Base):
    __tablename__ = "bmi_logs"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    date = Column(String(30), nullable=False)
    weight_kg = Column(Float, nullable=False)
    height_cm = Column(Float, nullable=False)
    bmi = Column(Float, nullable=False)
    category = Column(String(50), nullable=False)
    notes = Column(String(200), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="bmi_logs")


class HealthActivity(Base):
    __tablename__ = "health_activities"

    id = Column(String(50), primary_key=True, index=True)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    type = Column(String(50), nullable=False)  # "symptom", "appointment", "report", "bmi", "medicine"
    title = Column(String(150), nullable=False)
    timestamp = Column(String(50), nullable=False)
    summary = Column(Text, nullable=False)
    tag = Column(String(50), nullable=False)
    severity = Column(String(20), nullable=False)  # "info", "success", "warning", "emergency"
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="activities")

