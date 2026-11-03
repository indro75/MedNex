import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { PhoneCall, HeartPulse, User, Languages, Ticket } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useHealth } from '../../context/HealthContext';

export const Header: React.FC = () => {
  const { user } = useAuth();
  const { bilingualMode, toggleBilingualMode, appointments } = useHealth();
  const location = useLocation();

  const getPageTitle = (path: string) => {
    switch (path) {
      case '/dashboard':
        return bilingualMode ? 'ওভারভিউ ও ভাইটালস (Overview & Vitals)' : 'Overview & Health Vitals';
      case '/dashboard/symptom-checker':
        return bilingualMode ? 'AI লক্ষণ নিরীক্ষণ (AI Symptom Checker)' : 'AI Symptom Checker & Triage';
      case '/dashboard/find-doctors':
        return bilingualMode ? 'খুলনার ডাক্তার খুঁজুন (Find Khulna Specialists)' : 'Find Verified Khulna Specialists';
      case '/dashboard/first-aid':
        return bilingualMode ? 'জরুরি প্রাথমিক চিকিৎসা (AI First Aid)' : 'AI First Aid Assistant';
      case '/dashboard/report-analyzer':
        return bilingualMode ? 'মেডিকেল রিপোর্ট ওসিআর (Report Analyzer)' : 'Medical Report OCR Analyzer';
      case '/dashboard/emergency':
        return bilingualMode ? 'জরুরি অ্যাম্বুলেন্স ও ইআর (Emergency Ambulance)' : 'Emergency Ambulance & ER Directory';
      case '/dashboard/fitness-tracker':
        return bilingualMode ? 'দৈনিক ফিটনেস ও বিএমআই (Fitness & BMI)' : 'Daily Fitness & BMI Tracker';
      case '/dashboard/medicine-checker':
        return bilingualMode ? 'ওষুধ নির্দেশিকা (Medicine Checker)' : 'AI Medicine Information Checker';
      case '/dashboard/health-history':
        return bilingualMode ? 'স্বাস্থ্য ইতিহাস ও রেকর্ডস (Health History)' : 'Patient Health Timeline & Records';
      case '/dashboard/settings':
        return bilingualMode ? 'প্রোফাইল ও সেটিংস (Profile Settings)' : 'Account & Health Profile Settings';
      default:
        return 'MedNex Dashboard';
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            {getPageTitle(location.pathname)}
          </h1>
          <p className="text-xs text-slate-500 hidden sm:block">
            Connected Region: <span className="text-teal-600 font-medium">Khulna Division, Bangladesh</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Bilingual English / বাংলা Toggle */}
        <button
          type="button"
          onClick={toggleBilingualMode}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-bold transition ${
            bilingualMode
              ? 'bg-teal-50 border-teal-300 text-teal-800'
              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
          }`}
          title="Toggle English / বাংলা Medical Terms"
        >
          <Languages className="w-3.5 h-3.5 text-teal-600" />
          <span>{bilingualMode ? 'বাংলা / EN' : 'EN / বাংলা'}</span>
        </button>

        {/* Active Appointments Ticket Pill */}
        {appointments.length > 0 && (
          <Link
            to="/dashboard/find-doctors"
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold hover:bg-indigo-100 transition"
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>Serial #{appointments[0].serialNumber}</span>
          </Link>
        )}

        {/* Emergency quick button */}
        <a
          href="tel:999"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs transition"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Emergency</span> 999
        </a>

        {/* Vital status pill */}
        <Link
          to="/dashboard/fitness-tracker"
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 text-xs font-medium hover:bg-teal-100 transition"
        >
          <HeartPulse className="w-4 h-4 text-teal-600" />
          <span>Vitals: Stable</span>
        </Link>

        {/* User Mini Chip */}
        <Link
          to="/dashboard/settings"
          className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-lg hover:bg-slate-100 transition text-slate-700"
        >
          <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
            {user?.name.charAt(0) || <User className="w-3.5 h-3.5" />}
          </div>
          <span className="hidden sm:inline text-xs font-semibold">{user?.name.split(' ')[0]}</span>
        </Link>
      </div>
    </header>
  );
};
