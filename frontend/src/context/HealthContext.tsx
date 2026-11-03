import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  BMILogEntry,
  HealthActivityLog,
  SymptomAnalysisResult,
  MedicalReportData,
  Appointment
} from '../types';
import { Language, getTranslation, TRANSLATIONS } from '../utils/translations';

interface HealthContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof TRANSLATIONS.en) => string;
  bmiLogs: BMILogEntry[];
  activities: HealthActivityLog[];
  appointments: Appointment[];
  bilingualMode: boolean;
  toggleBilingualMode: () => void;
  addBmiLog: (weightKg: number, heightCm: number, notes?: string) => void;
  addSymptomCheckActivity: (symptomsSummary: string, result: SymptomAnalysisResult) => void;
  addReportActivity: (report: MedicalReportData) => void;
  bookAppointment: (data: {
    doctorId: string;
    doctorName: string;
    specialty: string;
    hospitalOrChamber: string;
    chamberAddress: string;
    date: string;
    timeSlot: string;
    patientName: string;
    patientPhone: string;
    feeBDT: number;
  }) => Appointment;
  cancelAppointment: (id: string) => void;
  deleteActivity: (id: string) => void;
  clearAllHistory: () => void;
  currentBmi: number;
  currentBmiCategory: 'Underweight' | 'Normal weight' | 'Overweight' | 'Obesity';
}

const INITIAL_BMI_LOGS: BMILogEntry[] = [
  { id: 'bmi-1', date: '2026-06-15', weightKg: 78.5, heightCm: 172, bmi: 26.5, category: 'Overweight', notes: 'Initial baseline weigh-in' },
  { id: 'bmi-2', date: '2026-07-20', weightKg: 77.0, heightCm: 172, bmi: 26.0, category: 'Overweight', notes: 'Started 30-min evening brisk walking' },
  { id: 'bmi-3', date: '2026-08-25', weightKg: 75.8, heightCm: 172, bmi: 25.6, category: 'Overweight', notes: 'Reduced refined carbs and sugar' },
  { id: 'bmi-4', date: '2026-09-22', weightKg: 74.2, heightCm: 172, bmi: 25.1, category: 'Overweight', notes: 'Consistent morning routine' },
  { id: 'bmi-5', date: '2026-10-25', weightKg: 73.2, heightCm: 172, bmi: 24.7, category: 'Normal weight', notes: 'Crossed into healthy normal BMI range!' }
];

const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-101',
    doctorId: 'dr-kabir-cardio',
    doctorName: 'Prof. Dr. Md. Humayun Kabir',
    specialty: 'Cardiology',
    hospitalOrChamber: 'Popular Diagnostic Centre, Khulna',
    chamberAddress: '37 KDA Avenue, Sonadanga, Khulna',
    date: '2026-11-06',
    timeSlot: '05:30 PM - 06:00 PM',
    serialNumber: 14,
    patientName: 'Rahim Ahmed',
    patientPhone: '+880 1712 345678',
    feeBDT: 1000,
    status: 'Confirmed',
    bookedAt: '2026-11-01 10:15 AM'
  }
];

const INITIAL_ACTIVITIES: HealthActivityLog[] = [
  {
    id: 'act-1',
    type: 'doctor_booked',
    title: 'Chamber Serial Confirmed: Prof. Dr. Humayun Kabir',
    timestamp: '2026-11-01 10:15 AM',
    summary: 'Serial #14 booked at Popular Diagnostic Centre Khulna. Visiting Time: 05:30 PM.',
    tag: 'Chamber Serial',
    severity: 'low'
  },
  {
    id: 'act-2',
    type: 'report_analyzed',
    title: 'Complete Blood Count Analyzed',
    timestamp: '2026-10-18 11:30 AM',
    summary: 'Mild microcytic hypochromic anemia identified (Hb 10.2 g/dL). Physician consultation recommended.',
    tag: 'Report Analysis',
    severity: 'moderate'
  },
  {
    id: 'act-3',
    type: 'symptom_check',
    title: 'Mild Joint Stiffness & Calf Cramps Check',
    timestamp: '2026-10-14 07:15 PM',
    summary: 'Evaluated lower limb discomfort. Recommended Orthopedics / Physical Medicine.',
    tag: 'Symptom AI',
    severity: 'low'
  },
  {
    id: 'act-4',
    type: 'bmi_logged',
    title: 'Weight Logged: 73.2 kg',
    timestamp: '2026-10-25 08:00 AM',
    summary: 'BMI 24.7 kg/m² (Normal weight achieved). Down 5.3 kg over 4 months.',
    tag: 'Fitness Tracker'
  },
  {
    id: 'act-5',
    type: 'medicine_checked',
    title: 'Napa Extra Safety Verification',
    timestamp: '2026-10-02 03:45 PM',
    summary: 'Verified indications, maximum safe dosage (4000mg/day), and caffeine precautions.',
    tag: 'Medicine Checker'
  }
];

const HealthContext = createContext<HealthContextType | undefined>(undefined);

export const HealthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bmiLogs, setBmiLogs] = useState<BMILogEntry[]>(() => {
    const saved = localStorage.getItem('mednex_bmi_logs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_BMI_LOGS;
      }
    }
    return INITIAL_BMI_LOGS;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('mednex_appointments');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_APPOINTMENTS;
      }
    }
    return INITIAL_APPOINTMENTS;
  });

  const [activities, setActivities] = useState<HealthActivityLog[]>(() => {
    const saved = localStorage.getItem('mednex_activities');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_ACTIVITIES;
      }
    }
    return INITIAL_ACTIVITIES;
  });

  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('mednex_language');
    if (saved === 'bn' || saved === 'en') return saved as Language;
    return localStorage.getItem('mednex_bilingual') === 'true' ? 'bn' : 'en';
  });

  const bilingualMode = language === 'bn';

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('mednex_language', lang);
    localStorage.setItem('mednex_bilingual', lang === 'bn' ? 'true' : 'false');
  };

  const toggleBilingualMode = () => {
    setLanguage(language === 'en' ? 'bn' : 'en');
  };

  const t = (key: keyof typeof TRANSLATIONS.en): string => {
    return getTranslation(key, language);
  };

  useEffect(() => {
    localStorage.setItem('mednex_language', language);
    localStorage.setItem('mednex_bilingual', language === 'bn' ? 'true' : 'false');
  }, [language]);

  const addBmiLog = (weightKg: number, heightCm: number, notes?: string) => {
    const heightM = heightCm / 100;
    const bmiVal = parseFloat((weightKg / (heightM * heightM)).toFixed(1));

    let category: 'Underweight' | 'Normal weight' | 'Overweight' | 'Obesity' = 'Normal weight';
    if (bmiVal < 18.5) category = 'Underweight';
    else if (bmiVal < 25) category = 'Normal weight';
    else if (bmiVal < 30) category = 'Overweight';
    else category = 'Obesity';

    const newLog: BMILogEntry = {
      id: `bmi-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      weightKg,
      heightCm,
      bmi: bmiVal,
      category,
      notes
    };

    setBmiLogs((prev) => [newLog, ...prev]);

    const newAct: HealthActivityLog = {
      id: `act-${Date.now()}`,
      type: 'bmi_logged',
      title: `Weight Logged: ${weightKg} kg`,
      timestamp: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
      summary: `BMI calculated at ${bmiVal} (${category}).`,
      tag: 'Fitness Tracker'
    };
    setActivities((prev) => [newAct, ...prev]);
  };

  const addSymptomCheckActivity = (symptomsSummary: string, result: SymptomAnalysisResult) => {
    const newAct: HealthActivityLog = {
      id: `act-${Date.now()}`,
      type: 'symptom_check',
      title: `AI Symptom Check: ${result.specialty}`,
      timestamp: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
      summary: `${symptomsSummary}. Urgency: ${result.urgency.toUpperCase()}. Recommended Specialty: ${result.specialty}.`,
      tag: 'Symptom AI',
      severity: result.urgency
    };
    setActivities((prev) => [newAct, ...prev]);
  };

  const addReportActivity = (report: MedicalReportData) => {
    const abnormalCount = report.parameters.filter((p) => p.status !== 'normal').length;
    const newAct: HealthActivityLog = {
      id: `act-${Date.now()}`,
      type: 'report_analyzed',
      title: `${report.title} Analyzed`,
      timestamp: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
      summary: `${abnormalCount} parameter(s) outside reference ranges. ${report.overallSummary.slice(0, 100)}...`,
      tag: 'Report Analysis',
      severity: abnormalCount > 0 ? 'moderate' : 'low'
    };
    setActivities((prev) => [newAct, ...prev]);
  };

  const bookAppointment = (data: {
    doctorId: string;
    doctorName: string;
    specialty: string;
    hospitalOrChamber: string;
    chamberAddress: string;
    date: string;
    timeSlot: string;
    patientName: string;
    patientPhone: string;
    feeBDT: number;
  }): Appointment => {
    const serial = Math.floor(Math.random() * 10) + 12; // Realistic chamber serial e.g. 12-22
    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      ...data,
      serialNumber: serial,
      status: 'Confirmed',
      bookedAt: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })
    };

    setAppointments((prev) => [newApt, ...prev]);

    const newAct: HealthActivityLog = {
      id: `act-${Date.now()}`,
      type: 'doctor_booked',
      title: `Chamber Serial #${serial}: ${data.doctorName}`,
      timestamp: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
      summary: `Consultation booked on ${data.date} at ${data.timeSlot}. Chamber: ${data.hospitalOrChamber}.`,
      tag: 'Chamber Serial',
      severity: 'low'
    };
    setActivities((prev) => [newAct, ...prev]);

    return newApt;
  };

  const cancelAppointment = (id: string) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: 'Cancelled' } : apt))
    );
  };

  const deleteActivity = (id: string) => {
    setActivities((prev) => prev.filter((a) => a.id !== id));
  };

  const clearAllHistory = () => {
    setActivities([]);
    setBmiLogs([]);
    setAppointments([]);
  };

  const latestBmi = bmiLogs.length > 0 ? bmiLogs[0].bmi : 24.7;
  const latestCategory = bmiLogs.length > 0 ? bmiLogs[0].category : 'Normal weight';

  return (
    <HealthContext.Provider
      value={{
        language,
        setLanguage,
        t,
        bmiLogs,
        activities,
        appointments,
        bilingualMode,
        toggleBilingualMode,
        addBmiLog,
        addSymptomCheckActivity,
        addReportActivity,
        bookAppointment,
        cancelAppointment,
        deleteActivity,
        clearAllHistory,
        currentBmi: latestBmi,
        currentBmiCategory: latestCategory
      }}
    >
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => {
  const context = useContext(HealthContext);
  if (!context) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
};
