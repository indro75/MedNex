"""
Fitness, BMI Logging, & Health Timeline Router
"""
import uuid
from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import BMILog, HealthActivity
from ..schemas import BMILogCreate, BMILogOut, HealthActivityCreate, HealthActivityOut

router = APIRouter(prefix="/api/fitness", tags=["Fitness & BMI"])

@router.post("/bmi", response_model=BMILogOut)
def log_bmi(data: BMILogCreate, db: Session = Depends(get_db)):
    entry = BMILog(
        user_id=data.user_id,
        date=data.date,
        weight_kg=data.weight_kg,
        height_cm=data.height_cm,
        bmi=data.bmi,
        category=data.category,
        notes=data.notes
    )
    db.add(entry)

    # Also log to activity history
    act = HealthActivity(
        id=f"act-{uuid.uuid4().hex[:8]}",
        user_id=data.user_id,
        type="bmi",
        title=f"Logged BMI: {data.bmi:.1f} ({data.category})",
        timestamp="Just now",
        summary=f"Weight: {data.weight_kg} kg | Height: {data.height_cm} cm. Status: {data.category}.",
        tag="Fitness",
        severity="info" if data.category == "Normal weight" else "warning"
    )
    db.add(act)

    db.commit()
    db.refresh(entry)
    return entry

@router.get("/history/{user_id}", response_model=List[BMILogOut])
def get_bmi_history(user_id: str, db: Session = Depends(get_db)):
    return db.query(BMILog).filter(BMILog.user_id == user_id).order_by(BMILog.id.asc()).all()

@router.get("/activities/{user_id}", response_model=List[HealthActivityOut])
def get_activities(user_id: str, db: Session = Depends(get_db)):
    return db.query(HealthActivity).filter(HealthActivity.user_id == user_id).order_by(HealthActivity.created_at.desc()).all()

@router.post("/activities", response_model=HealthActivityOut)
def log_activity(data: HealthActivityCreate, db: Session = Depends(get_db)):
    act = HealthActivity(
        id=f"act-{uuid.uuid4().hex[:8]}",
        user_id=data.user_id,
        type=data.type,
        title=data.title,
        timestamp=data.timestamp,
        summary=data.summary,
        tag=data.tag,
        severity=data.severity
    )
    db.add(act)
    db.commit()
    db.refresh(act)
    return act

