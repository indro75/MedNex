import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Stethoscope,
  MapPin,
  AlertCircle,
  Menu,
  X,
  LifeBuoy,
  FileText,
  Activity,
  Pill,
  History,
  Settings,
  PhoneCall
} from 'lucide-react';
import { useHealth } from '../../context/HealthContext';

export const MobileNav: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { t, bilingualMode } = useHealth();

  const drawerItems = [
    { name: t('sideFirstAid'), path: '/dashboard/first-aid', icon: LifeBuoy },
    { name: t('sideReportAnalyzer'), path: '/dashboard/report-analyzer', icon: FileText },
    { name: t('sideFitnessTracker'), path: '/dashboard/fitness-tracker', icon: Activity },
    { name: t('sideMedicineChecker'), path: '/dashboard/medicine-checker', icon: Pill },
    { name: t('sideHealthHistory'), path: '/dashboard/health-history', icon: History },
    { name: t('sideSettings'), path: '/dashboard/settings', icon: Settings },
  ];

  return (
    <>
      {/* Bottom Sticky Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shadow-lg">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[10px] font-medium transition ${
              isActive ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-900'
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>{bilingualMode ? 'হোম' : 'Home'}</span>
        </NavLink>

        <NavLink
          to="/dashboard/symptom-checker"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[10px] font-medium transition ${
              isActive ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-900'
            }`
          }
        >
          <Stethoscope className="w-5 h-5" />
          <span>{bilingualMode ? 'লক্ষণ' : 'Symptom'}</span>
        </NavLink>

        <NavLink
          to="/dashboard/emergency"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[10px] font-bold transition text-red-600 ${
              isActive ? 'bg-red-50' : ''
            }`
          }
        >
          <div className="w-9 h-9 -mt-4 bg-red-600 text-white rounded-full flex items-center justify-center shadow-md border-2 border-white">
            <AlertCircle className="w-5 h-5" />
          </div>
          <span className="text-[10px]">{bilingualMode ? '৯৯৯ জরুরি' : '999 SOS'}</span>
        </NavLink>

        <NavLink
          to="/dashboard/find-doctors"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[10px] font-medium transition ${
              isActive ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-900'
            }`
          }
        >
          <MapPin className="w-5 h-5" />
          <span>{bilingualMode ? 'ডাক্তার' : 'Doctors'}</span>
        </NavLink>

        <button
          onClick={() => setDrawerOpen(true)}
          className="flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[10px] font-medium text-slate-500 hover:text-slate-900 focus:outline-hidden"
        >
          <Menu className="w-5 h-5" />
          <span>{bilingualMode ? 'মেনু' : 'More'}</span>
        </button>
      </nav>

      {/* Slide-over Drawer for Extra Services */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end bg-slate-900/50 backdrop-blur-xs">
          <div className="w-72 bg-white h-full p-5 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="font-bold text-slate-900 text-base">{bilingualMode ? 'মেডনেক্স সেবা সমূহ' : 'MedNex Services'}</span>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 999 Call Card */}
              <div className="my-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-red-700">{bilingualMode ? 'খুলনা জরুরি ডিসপ্যাচ' : 'Khulna Emergency'}</p>
                  <p className="text-[11px] text-red-600">{bilingualMode ? 'অ্যাম্বুলেন্স ও পুলিশ: ৯৯৯' : 'Ambulance & Fire: 999'}</p>
                </div>
                <a
                  href="tel:999"
                  className="p-2 bg-red-600 text-white rounded-lg"
                  aria-label="Call 999"
                >
                  <PhoneCall className="w-4 h-4" />
                </a>
              </div>

              <div className="space-y-1.5 mt-2">
                {drawerItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setDrawerOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                          isActive
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`
                      }
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-400">
              {bilingualMode ? 'মেডনেক্স হেলথ • খুলনা, বাংলাদেশ' : 'MedNex Health v1.0 • Khulna, BD'}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

