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
  specialtyBn?: string;
  urgency: UrgencyLevel;
  confidence: number;
  matchedSymptoms: string[];
  possibleCauses: string[];
  possibleCausesBn?: string[];
  triageAdvice: string;
  triageAdviceBn?: string;
  isEmergencyAlert: boolean;
  emergencyWarningSigns?: string[];
  emergencyWarningSignsBn?: string[];
  recommendedDoctorCategory: string;
  questionsForDoctor: string[];
  questionsForDoctorBn?: string[];
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
  overallSummaryBn?: string;
  clinicalImpression?: string;
  clinicalImpressionBn?: string;
  riskLevel?: 'normal' | 'mild' | 'moderate' | 'high' | 'critical';
  affectedOrgans?: string[];
  affectedOrgansBn?: string[];
  bodyImpact?: string;
  bodyImpactBn?: string;
  dietaryAdvice?: string[];
  dietaryAdviceBn?: string[];
  lifestyleAdvice?: string[];
  lifestyleAdviceBn?: string[];
  recommendedSpecialty?: string;
  recommendedSpecialtyBn?: string;
  questionsForPhysician: string[];
  questionsForPhysicianBn?: string[];
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

export interface FirstAidStep {
  stepNumber: number;
  title: string;
  titleBn?: string;
  instruction: string;
  instructionBn?: string;
}

export interface FirstAidGuide {
  id: string;
  title: string;
  titleBn?: string;
  category: string;
  categoryBn?: string;
  iconName: string;
  shortDesc: string;
  shortDescBn?: string;
  severityWarning?: string;
  severityWarningBn?: string;
  recommendedTimerSeconds?: number;
  timerLabel?: string;
  immediateSafety: string[];
  immediateSafetyBn?: string[];
  steps: FirstAidStep[];
  dos: string[];
  dosBn?: string[];
  donts: string[];
  dontsBn?: string[];
  whenToSeekEmergency: string[];
  whenToSeekEmergencyBn?: string[];
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
