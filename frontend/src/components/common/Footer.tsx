import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, PhoneCall, ShieldAlert, Heart, MapPin, Mail } from 'lucide-react';
import { useHealth } from '../../context/HealthContext';

export const Footer: React.FC = () => {
  const { t } = useHealth();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                <Activity className="w-6 h-6 stroke-[2.5]" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Med<span className="text-blue-400">Nex</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Your Health, Smarter. Your Care, Closer. An easy-to-use healthcare helper making doctor discovery, emergency ambulance services, and health guidance accessible to everyone in Khulna, Bangladesh.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Primary Region: Khulna Division, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>contact@mednex-health.org</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-red-400 shrink-0" />
                <span>National Emergency Call: 999 (24/7 Toll-free)</span>
              </div>
            </div>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Main Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/dashboard/symptom-checker" className="hover:text-blue-400 transition">
                  {t('sideSymptomChecker')}
                </Link>
              </li>
              <li>
                <Link to="/dashboard/find-doctors" className="hover:text-blue-400 transition">
                  {t('sideFindDoctors')}
                </Link>
              </li>
              <li>
                <Link to="/dashboard/first-aid" className="hover:text-blue-400 transition">
                  {t('sideFirstAid')}
                </Link>
              </li>
              <li>
                <Link to="/dashboard/report-analyzer" className="hover:text-blue-400 transition">
                  {t('sideReportAnalyzer')}
                </Link>
              </li>
              <li>
                <Link to="/dashboard/emergency" className="hover:text-red-400 transition font-medium">
                  {t('sideEmergencyAssistance')}
                </Link>
              </li>
              <li>
                <Link to="/dashboard/fitness-tracker" className="hover:text-blue-400 transition">
                  {t('sideFitnessTracker')}
                </Link>
              </li>
              <li>
                <Link to="/dashboard/medicine-checker" className="hover:text-blue-400 transition">
                  {t('sideMedicineChecker')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Helpful Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#how-it-works" className="hover:text-blue-400 transition">
                  {t('navHowItWorks')}
                </a>
              </li>
              <li>
                <a href="#about-us" className="hover:text-blue-400 transition">
                  {t('navAbout')}
                </a>
              </li>
              <li>
                <Link to="/login" className="hover:text-blue-400 transition">
                  Patient Portal
                </Link>
              </li>
              <li>
                <span className="cursor-pointer hover:text-blue-400 transition">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-blue-400 transition">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-blue-400 transition">
                  BMDC Verification
                </span>
              </li>
            </ul>
          </div>

          {/* Emergency Box */}
          <div className="bg-slate-800/80 p-4 rounded-xl border border-red-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-red-400 font-semibold text-sm mb-2">
                <ShieldAlert className="w-5 h-5" />
                <span>Emergency 999 Help</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                If you or a family member has severe chest pain, trouble breathing, or major injury, please call an ambulance right away.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-700">
              <a
                href="tel:999"
                className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 rounded-lg text-xs transition"
              >
                <PhoneCall className="w-4 h-4" />
                Call 999 Right Now
              </a>
            </div>
          </div>
        </div>

        {/* Mandatory Medical Disclaimer Notice */}
        <div className="mt-8 p-4 rounded-xl bg-slate-800/40 border border-slate-800 text-xs text-slate-400 leading-relaxed">
          <p className="font-semibold text-slate-300 mb-1">Health & Medical Notice:</p>
          <p>
            MedNex is an educational healthcare helper tool and does not provide an official medical diagnosis or replace a doctor's examination. Always consult a licensed doctor for medical treatment and prescriptions. In a medical emergency, call 999 immediately. All doctors and hospitals in Khulna are checked against official BMDC and government records.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} MedNex Health. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built for safer, smarter healthcare in Bangladesh{' '}
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
          </p>
        </div>
      </div>
    </footer>
  );
};

