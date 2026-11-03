export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  bloodGroup: BloodGroup;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  allergies: string[];
  chronicConditions: string[];
  city: string;
}

export type UrgencyLevel = 'emergency' | 'high' | 'moderate' | 'low';

export interface SymptomAnalysisResult {
  specialty: string;
  urgency: UrgencyLevel;
  confidence: number;
  matchedSymptoms: string[];
  possibleCauses: string[];
  triageAdvice: string;
  isEmergencyAlert: boolean;
  emergencyWarningSigns?: string[];
  recommendedDoctorCategory: string;
  questionsForDoctor: string[];
}

export interface Doctor {
  id: string;
  name: string;
  degrees: string;
  specialty: string;
  designation: string;
  hospital: string;
  bmdcRegNo: string;
  experienceYears: number;
  chamberAddress: string;
  area: string;
  visitingHours: string;
  consultationFeeBDT: number;
  contactNumber: string;
  rating: number;
  totalReviews: number;
  availableDays: string[];
  availableSlots?: string[];
  latitude: number;
  longitude: number;
  verified: boolean;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  hospitalOrChamber: string;
  chamberAddress: string;
  date: string;
  timeSlot: string;
  serialNumber: number;
  patientName: string;
  patientPhone: string;
  feeBDT: number;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  bookedAt: string;
}

export interface Hospital {
  id: string;
  name: string;
  type: 'Government' | 'Private' | 'Specialized';
  address: string;
  area: string;
  emergencyPhone: string;
  hotline: string;
  icuAvailable: boolean;
  ambulanceAvailable: boolean;
  totalBeds: number;
  latitude: number;
  longitude: number;
  verified: boolean;
}

export interface AmbulanceProvider {
  id: string;
  name: string;
  type: 'ICU / AC' | 'Standard Non-AC' | 'Freezing / Mortuary';
  provider: string;
  phone: string;
  alternatePhone?: string;
  baseLocation: string;
  coverageArea: string;
  estimatedArrivalMin: string;
  baseChargeBDT: number;
  oxygenEquipped: boolean;
  verified: boolean;
}

export interface ReportParameter {
  name: string;
  value: number | string;
  unit: string;
  referenceRange: string;
  status: 'normal' | 'high' | 'low' | 'critical';
  clinicalMeaning: string;
  minNormal?: number;
  maxNormal?: number;
}

export interface MedicalReportData {
  id: string;
  title: string;
  date: string;
  labName: string;
  category: 'Complete Blood Count' | 'Lipid Profile' | 'Liver Function' | 'Diabetic Panel' | 'Thyroid Panel' | 'Kidney Function';
  patientName: string;
  patientAge: number;
  parameters: ReportParameter[];
  overallSummary: string;
  questionsForPhysician: string[];
  urgencyNote?: string;
}

export interface MedicineInfo {
  id: string;
  brandName: string;
  genericName: string;
  manufacturer: string;
  therapeuticClass: string;
  form: 'Tablet' | 'Capsule' | 'Syrup' | 'Suspension' | 'Injection' | 'Ointment';
  strengths: string[];
  commonUses: string[];
  sideEffects: string[];
  precautions: string[];
  contraindications: string[];
  foodInteractions: string;
  isPregnancySafe: string;
}

export interface DrugInteraction {
  drug1: string;
  drug2: string;
  severity: 'Severe / Contraindicated' | 'Moderate' | 'Minor / Monitor';
  effect: string;
  recommendation: string;
}

export interface FirstAidGuide {
  id: string;
  title: string;
  titleBn?: string;
  category: string;
  iconName: string;
  shortDesc: string;
  severityWarning?: string;
  recommendedTimerSeconds?: number;
  timerLabel?: string;
  immediateSafety: string[];
  steps: { stepNumber: number; title: string; instruction: string }[];
  dos: string[];
  donts: string[];
  whenToSeekEmergency: string[];
}

export interface BMILogEntry {
  id: string;
  date: string;
  weightKg: number;
  heightCm: number;
  bmi: number;
  category: 'Underweight' | 'Normal weight' | 'Overweight' | 'Obesity';
  notes?: string;
}

export interface HealthActivityLog {
  id: string;
  type: 'symptom_check' | 'report_analyzed' | 'bmi_logged' | 'doctor_booked' | 'medicine_checked';
  title: string;
  timestamp: string;
  summary: string;
  tag?: string;
  severity?: UrgencyLevel;
}
