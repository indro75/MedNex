import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Stethoscope,
  MapPin,
  LifeBuoy,
  FileText,
  AlertCircle,
  Activity,
  Pill,
  History,
  Settings,
  LogOut,
  PhoneCall,
  User
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useHealth } from '../../context/HealthContext';

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const { t, bilingualMode } = useHealth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: t('sideOverview'), path: '/dashboard', icon: LayoutDashboard },
    { name: t('sideSymptomChecker'), path: '/dashboard/symptom-checker', icon: Stethoscope, badge: 'AI' },
    { name: t('sideFindDoctors'), path: '/dashboard/find-doctors', icon: MapPin },
    { name: t('sideFirstAid'), path: '/dashboard/first-aid', icon: LifeBuoy },
    { name: t('sideReportAnalyzer'), path: '/dashboard/report-analyzer', icon: FileText, badge: 'OCR' },
    { name: t('sideEmergencyAssistance'), path: '/dashboard/emergency', icon: AlertCircle, isEmergency: true },
    { name: t('sideFitnessTracker'), path: '/dashboard/fitness-tracker', icon: Activity },
    { name: t('sideMedicineChecker'), path: '/dashboard/medicine-checker', icon: Pill },
    { name: t('sideHealthHistory'), path: '/dashboard/health-history', icon: History },
    { name: t('sideSettings'), path: '/dashboard/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0 shrink-0">
      {/* Brand Header */}
      <div className="h-18 px-5 border-b border-slate-100 flex items-center justify-between">
        <NavLink to="/dashboard" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Activity className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              {bilingualMode ? 'মেড' : 'Med'}<span className="text-blue-600">{bilingualMode ? 'নেক্স' : 'Nex'}</span>
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-teal-600 -mt-1">
              {bilingualMode ? 'খুলনা পোর্টাল' : 'Khulna Portal'}
            </span>
          </div>
        </NavLink>
      </div>

      {/* Emergency Quick Bar */}
      <div className="p-3 mx-3 my-2 rounded-xl bg-red-50 border border-red-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
          <span className="text-xs font-bold text-red-700">{bilingualMode ? 'খুলনা ৯৯৯ ডিসপ্যাচ' : 'Khulna 999 Dispatch'}</span>
        </div>
        <a
          href="tel:999"
          className="p-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          title="Direct Dial 999"
        >
          <PhoneCall className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto py-2 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  item.isEmergency
                    ? isActive
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'text-red-600 hover:bg-red-50 font-semibold'
                    : isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/20 font-semibold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-md bg-blue-100 text-blue-700">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* User info & Logout footer */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
              {user?.name.charAt(0) || <User className="w-4 h-4" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-900 truncate">
                {user?.name || 'Rahim Ahmed'}
              </p>
              <p className="text-[11px] text-slate-500 truncate">
                {user?.bloodGroup ? `${user.bloodGroup} | ${bilingualMode ? 'খুলনা' : 'Khulna'}` : bilingualMode ? 'খুলনা' : 'Khulna'}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
            title={t('sideLogout')}
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

