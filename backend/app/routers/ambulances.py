"""
Emergency Ambulance Fleet & 999 Hotline Router
"""
from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import AmbulanceProvider
from ..schemas import AmbulanceOut

router = APIRouter(prefix="/api/ambulances", tags=["Ambulances"])

@router.get("", response_model=List[AmbulanceOut])
def list_ambulances(db: Session = Depends(get_db)):
    return db.query(AmbulanceProvider).all()

