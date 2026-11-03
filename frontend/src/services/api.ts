/**
 * MedNex Unified API Client Service
 * Connects frontend modules to the FastAPI backend + ML services.
 * Features built-in fallback to local verified data if backend is offline.
 */

import { Doctor, Hospital, AmbulanceProvider, MedicineInfo, DrugInteraction } from '../types';
import { KHULNA_DOCTORS, KHULNA_HOSPITALS, KHULNA_AMBULANCES } from '../data/khulnaMedicalData';
import { MEDICINE_DATABASE, KNOWN_DRUG_INTERACTIONS } from '../data/medicineDatabase';

const API_BASE_URL = 'http://localhost:8000/api';

async function safeFetch<T>(endpoint: string, options?: RequestInit, fallbackData?: T): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }
    return (await res.json()) as T;
  } catch (err) {
    console.warn(`[MedNex API] Falling back for ${endpoint}:`, err);
    if (fallbackData !== undefined) {
      return fallbackData;
    }
    throw err;
  }
}

export const api = {
  // 1. Doctors
  async getDoctors(specialty?: string, area?: string, search?: string): Promise<Doctor[]> {
    const params = new URLSearchParams();
    if (specialty && specialty !== 'All Specialties') params.append('specialty', specialty);
    if (area && area !== 'All Areas') params.append('area', area);
    if (search) params.append('search', search);

    const query = params.toString() ? `?${params.toString()}` : '';
    return safeFetch<Doctor[]>(`/doctors${query}`, undefined, KHULNA_DOCTORS);
  },

  async getDoctorById(id: string): Promise<Doctor | undefined> {
    return safeFetch<Doctor>(`/doctors/${id}`, undefined, KHULNA_DOCTORS.find(d => d.id === id));
  },

  // 2. Hospitals & Ambulances
  async getHospitals(area?: string, icuOnly?: boolean): Promise<Hospital[]> {
    const params = new URLSearchParams();
    if (area && area !== 'All Areas') params.append('area', area);
    if (icuOnly) params.append('icu_only', 'true');
    const query = params.toString() ? `?${params.toString()}` : '';
    return safeFetch<Hospital[]>(`/hospitals${query}`, undefined, KHULNA_HOSPITALS);
  },

  async getAmbulances(): Promise<AmbulanceProvider[]> {
    return safeFetch<AmbulanceProvider[]>('/ambulances', undefined, KHULNA_AMBULANCES);
  },

  // 3. Chamber Serial Bookings
  async bookAppointment(data: {
    userId: string;
    doctorId: string;
    patientName: string;
    patientPhone: string;
    patientAge: number;
    appointmentDate: string;
    symptomSummary?: string;
  }) {
    return safeFetch('/appointments', {
      method: 'POST',
      body: JSON.stringify({
        user_id: data.userId,
        doctor_id: data.doctorId,
        patient_name: data.patientName,
        patient_phone: data.patientPhone,
        patient_age: data.patientAge,
        appointment_date: data.appointmentDate,
        symptom_summary: data.symptomSummary,
      }),
    });
  },

  async getUserAppointments(userId: string) {
    return safeFetch(`/appointments/user/${userId}`, undefined, []);
  },

  async cancelAppointment(appointmentId: string) {
    return safeFetch(`/appointments/${appointmentId}`, { method: 'DELETE' });
  },

  // 4. ML Symptom Classifier
  async analyzeSymptoms(payload: {
    description: string;
    selectedSymptoms?: string[];
    duration?: string;
    severity?: string;
    medicalHistory?: string;
  }) {
    return safeFetch('/symptoms/analyze', {
      method: 'POST',
      body: JSON.stringify({
        description: payload.description,
        selected_symptoms: payload.selectedSymptoms || [],
        duration: payload.duration,
        severity: payload.severity || 'Mild',
        medical_history: payload.medicalHistory,
      }),
    });
  },

  // 5. ML Medical Report Analyzer
  async analyzeReport(payload: {
    reportText: string;
    patientAge?: number;
    patientGender?: string;
    reportCategory?: string;
  }) {
    return safeFetch('/reports/analyze', {
      method: 'POST',
      body: JSON.stringify({
        report_text: payload.reportText,
        patient_age: payload.patientAge || 35,
        patient_gender: payload.patientGender || 'Male',
        report_category: payload.reportCategory || 'General Lab',
      }),
    });
  },

  // 6. Medicines & Drug Interactions
  async getMedicines(search?: string, therapeuticClass?: string): Promise<MedicineInfo[]> {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (therapeuticClass) params.append('therapeutic_class', therapeuticClass);
    const query = params.toString() ? `?${params.toString()}` : '';
    return safeFetch<MedicineInfo[]>(`/medicines${query}`, undefined, MEDICINE_DATABASE);
  },

  async checkInteractions(drugs: string[]): Promise<DrugInteraction[]> {
    return safeFetch<DrugInteraction[]>('/medicines/interactions', {
      method: 'POST',
      body: JSON.stringify({ drugs }),
    }, []);
  },

  async identifyMedicineOCR(text: string) {
    return safeFetch('/medicines/ocr-identify', {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
  },

  // 7. Fitness & Health Activity
  async logBMI(data: {
    userId: string;
    date: string;
    weightKg: number;
    heightCm: number;
    bmi: number;
    category: string;
    notes?: string;
  }) {
    return safeFetch('/fitness/bmi', {
      method: 'POST',
      body: JSON.stringify({
        user_id: data.userId,
        date: data.date,
        weight_kg: data.weightKg,
        height_cm: data.heightCm,
        bmi: data.bmi,
        category: data.category,
        notes: data.notes,
      }),
    });
  },

  async getBMIHistory(userId: string) {
    return safeFetch(`/fitness/history/${userId}`, undefined, []);
  },

  async getActivities(userId: string) {
    return safeFetch(`/fitness/activities/${userId}`, undefined, []);
  },
};
