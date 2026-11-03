"""
Doctors Directory & Chamber Search Router
"""
from typing import List, Optional
from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Doctor
from ..schemas import DoctorOut

router = APIRouter(prefix="/api/doctors", tags=["Doctors"])

@router.get("", response_model=List[DoctorOut])
def list_doctors(
    specialty: Optional[str] = Query(None),
    area: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(Doctor)
    if specialty and specialty != "All Specialties":
        query = query.filter(Doctor.specialty.ilike(f"%{specialty}%"))
    if area and area != "All Areas":
        query = query.filter(Doctor.area.ilike(f"%{area}%"))
    if search:
        search_filter = f"%{search}%"
        query = query.filter(
            (Doctor.name.ilike(search_filter)) |
            (Doctor.specialty.ilike(search_filter)) |
            (Doctor.hospital.ilike(search_filter)) |
            (Doctor.chamber_address.ilike(search_filter))
        )
    return query.all()

@router.get("/{doctor_id}", response_model=DoctorOut)
def get_doctor(doctor_id: str, db: Session = Depends(get_db)):
    doc = db.query(Doctor).filter(Doctor.id == doctor_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Doctor not found.")
    return doc

