import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { PhoneCall, HeartPulse, User, Ticket, Activity } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useHealth } from '../../context/HealthContext';

export const Header: React.FC = () => {
  const { user } = useAuth();
  const { appointments, t } = useHealth();
  const location = useLocation();

  const getPageTitle = (path: string) => {
    switch (path) {
      case '/dashboard':
        return t('titleOverview');
      case '/dashboard/symptom-checker':
        return t('titleSymptomChecker');
      case '/dashboard/find-doctors':
        return t('titleFindDoctors');
      case '/dashboard/first-aid':
        return t('titleFirstAid');
      case '/dashboard/report-analyzer':
        return t('titleReportAnalyzer');
      case '/dashboard/emergency':
        return t('titleEmergency');
      case '/dashboard/fitness-tracker':
        return t('titleFitnessTracker');
      case '/dashboard/medicine-checker':
        return t('titleMedicineChecker');
      case '/dashboard/health-history':
        return t('titleHealthHistory');
      case '/dashboard/settings':
        return t('titleSettings');
      default:
        return t('brandName');
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {/* Mobile Branding on Top Left Corner */}
        <Link to="/dashboard" className="flex md:hidden items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:bg-blue-700 transition shrink-0">
            <Activity className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-slate-900 flex items-center leading-tight">
              Med<span className="text-blue-600">Nex</span>
            </span>
            <span className="block text-[9px] font-semibold uppercase tracking-wider text-teal-600 leading-none">
              Khulna Portal
            </span>
          </div>
        </Link>

        {/* Sub-header / Page Title on tablet screens */}
        <div className="hidden sm:block md:hidden border-l border-slate-200 pl-3">
          <span className="text-xs font-semibold text-slate-600">
            {getPageTitle(location.pathname)}
          </span>
        </div>

        {/* Desktop Page Title & Region */}
        <div className="hidden md:block">
          <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            {getPageTitle(location.pathname)}
          </h1>
          <p className="text-xs text-slate-500">
            {t('connectedRegion')}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5 sm:gap-3">
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
          <span className="hidden sm:inline">Emergency 999</span>
        </a>

        {/* Vital status pill */}
        <Link
          to="/dashboard/fitness-tracker"
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 text-xs font-medium hover:bg-teal-100 transition"
        >
          <HeartPulse className="w-4 h-4 text-teal-600" />
          <span>Vitals: Good</span>
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
