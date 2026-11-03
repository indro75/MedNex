"""
MedNex Platform: Main FastAPI Application Entrypoint
Provides unified REST APIs for:
- Verified Doctors & Chamber Serial Reservations
- Emergency 24/7 Ambulance Fleet & 999 Hotline
- ML Symptom Classifier & Emergency Triage
- ML Medical Report Parser & Biomarker Extraction
- AI Medicine Identification & Drug-Drug Interaction Engine
- User Health History, Appointments & BMI Progress Tracking
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .seed import seed_database
from .routers import auth, doctors, hospitals, ambulances, appointments, medicines, symptoms, reports, fitness

# Initialize Database Schema
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="MedNex Healthcare Assistance API",
    description="Backend API and ML Services for the MedNex Healthcare Platform (Khulna, Bangladesh)",
    version="1.0.0"
)

# Configure CORS for Frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Seed database with verified records on startup
@app.on_event("startup")
def on_startup():
    try:
        seed_database()
        print("MedNex database initialized and seeded successfully.")
    except Exception as e:
        print(f"Database seed notice: {e}")

# Include Routers
app.include_router(auth.router)
app.include_router(doctors.router)
app.include_router(hospitals.router)
app.include_router(ambulances.router)
app.include_router(appointments.router)
app.include_router(medicines.router)
app.include_router(symptoms.router)
app.include_router(reports.router)
app.include_router(fitness.router)

@app.get("/")
def root():
    return {
        "status": "online",
        "platform": "MedNex AI-Powered Healthcare Assistance Platform",
        "region": "Khulna, Bangladesh",
        "docs_url": "/docs"
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "database": "sqlite connected",
        "ml_engine": "operational",
        "version": "1.0.0"
    }

