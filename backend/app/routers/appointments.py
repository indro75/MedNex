"""
Appointments & Doctor Chamber Serial Booking Router
"""
import uuid
import random
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Appointment, Doctor, HealthActivity
from ..schemas import AppointmentCreate, AppointmentOut

router = APIRouter(prefix="/api/appointments", tags=["Appointments"])

@router.post("", response_model=AppointmentOut)
def book_appointment(data: AppointmentCreate, db: Session = Depends(get_db)):
    doctor = db.query(Doctor).filter(Doctor.id == data.doctor_id).first()
    if not doctor:
        raise HTTPException(status_code=404, detail="Selected doctor not found.")

    # Calculate serial number for this doctor and date
    existing_count = db.query(Appointment).filter(
        Appointment.doctor_id == data.doctor_id,
        Appointment.appointment_date == data.appointment_date
    ).count()

    serial_no = existing_count + 1
    # Estimate time (e.g., base visiting time + (serial_no - 1)*12 mins)
    base_hour = 17  # 5:00 PM
    minutes_offset = (serial_no - 1) * 12
    est_hour = base_hour + (minutes_offset // 60)
    est_min = minutes_offset % 60
    period = "PM"
    est_display_hour = est_hour if est_hour <= 12 else est_hour - 12
    est_time = f"{est_display_hour:02d}:{est_min:02d} {period}"

    new_appointment = Appointment(
        id=f"apt-{uuid.uuid4().hex[:8]}",
        user_id=data.user_id,
        doctor_id=data.doctor_id,
        doctor_name=doctor.name,
        specialty=doctor.specialty,
        hospital_or_chamber=doctor.chamber_address,
        appointment_date=data.appointment_date,
        serial_number=serial_no,
        estimated_time=est_time,
        patient_name=data.patient_name,
        patient_phone=data.patient_phone,
        patient_age=data.patient_age,
        symptom_summary=data.symptom_summary,
        status="Confirmed"
    )
    db.add(new_appointment)

    # Log to health activity timeline
    act = HealthActivity(
        id=f"act-{uuid.uuid4().hex[:8]}",
        user_id=data.user_id,
        type="appointment",
        title=f"Booked Serial #{serial_no}: {doctor.name}",
        timestamp="Just now",
        summary=f"Chamber serial confirmed for {data.appointment_date} ({est_time}) at {doctor.chamber_address}.",
        tag=doctor.specialty,
        severity="success"
    )
    db.add(act)

    db.commit()
    db.refresh(new_appointment)
    return new_appointment

@router.get("/user/{user_id}", response_model=List[AppointmentOut])
def get_user_appointments(user_id: str, db: Session = Depends(get_db)):
    return db.query(Appointment).filter(Appointment.user_id == user_id).order_by(Appointment.created_at.desc()).all()

@router.delete("/{appointment_id}")
def cancel_appointment(appointment_id: str, db: Session = Depends(get_db)):
    apt = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if not apt:
        raise HTTPException(status_code=404, detail="Appointment not found.")
    apt.status = "Cancelled"
    db.commit()
    return {"message": "Appointment cancelled successfully."}

