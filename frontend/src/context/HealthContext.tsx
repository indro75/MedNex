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

const INITIAL_BMI_LOGS: BMILogEntry[] = [];

const INITIAL_APPOINTMENTS: Appointment[] = [];

const INITIAL_ACTIVITIES: HealthActivityLog[] = [];

const HealthContext = createContext<HealthContextType | undefined>(undefined);

export const HealthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bmiLogs, setBmiLogs] = useState<BMILogEntry[]>(() => {
    const saved = localStorage.getItem('mednex_bmi_logs');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Exclude hardcoded demo entries if they exist
        if (Array.isArray(parsed)) {
          return parsed.filter((item: BMILogEntry) => !['bmi-1', 'bmi-2', 'bmi-3', 'bmi-4', 'bmi-5'].includes(item.id));
        }
        return [];
      } catch {
        return [];
      }
    }
    return [];
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

  // Pure English mode - simple, accessible, easy to understand
  const [language, setLanguageState] = useState<Language>('en');

  const bilingualMode = false;

  const setLanguage = (_lang: Language) => {
    setLanguageState('en');
    localStorage.setItem('mednex_language', 'en');
    localStorage.setItem('mednex_bilingual', 'false');
  };

  const toggleBilingualMode = () => {
    // English only
    setLanguageState('en');
  };

  const t = (key: keyof typeof TRANSLATIONS.en): string => {
    return getTranslation(key, 'en');
  };

  useEffect(() => {
    localStorage.setItem('mednex_language', 'en');
    localStorage.setItem('mednex_bilingual', 'false');
  }, []);

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

  const latestBmi = bmiLogs.length > 0 ? bmiLogs[0].bmi : 0;
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
