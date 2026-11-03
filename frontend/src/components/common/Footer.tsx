import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, PhoneCall, ShieldAlert, Heart, MapPin, Mail } from 'lucide-react';
import { useHealth } from '../../context/HealthContext';

export const Footer: React.FC = () => {
  const { bilingualMode, t } = useHealth();

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
                {bilingualMode ? 'মেড' : 'Med'}<span className="text-blue-400">{bilingualMode ? 'নেক্স' : 'Nex'}</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              {bilingualMode
                ? 'আপনার স্বাস্থ্য, আরও বুদ্ধিমান। আপনার যত্ন, আরও কাছে। একটি এআই চালিত স্বাস্থ্য সহকারী যা চিকিৎসাগত ট্রায়াজ, ডাক্তার অনুসন্ধান এবং জরুরি সেবা মানুষের দোরগোড়ায় পৌঁছে দেয়।'
                : 'Your Health, Smarter. Your Care, Closer. An AI-powered healthcare companion making medical triage, verified doctor discovery, and emergency services accessible.'}
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{bilingualMode ? 'প্রাথমিক অঞ্চল: খুলনা, বাংলাদেশ' : 'Primary Sample Deployment: Khulna, Bangladesh'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>contact@mednex-health.org</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-red-400 shrink-0" />
                <span>{bilingualMode ? 'জাতীয় জরুরি কল: ৯৯৯ (২৪/৭ ফ্রি)' : 'National Emergency Call: 999 (24/7 Toll-free)'}</span>
              </div>
            </div>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              {bilingualMode ? 'প্রধান সেবা সমূহ' : 'Core Services'}
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
              {bilingualMode ? 'প্ল্যাটফর্ম ও নীতিমালা' : 'Platform & Legal'}
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
                  {bilingualMode ? 'রোগীর পোর্টাল' : 'Patient Portal'}
                </Link>
              </li>
              <li>
                <span className="cursor-pointer hover:text-blue-400 transition">
                  {bilingualMode ? 'গোপনীয়তা নীতি' : 'Privacy Policy'}
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-blue-400 transition">
                  {bilingualMode ? 'ব্যবহারের শর্তাবলী' : 'Terms of Service'}
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-blue-400 transition">
                  {bilingualMode ? 'বিএমডিসি যাচাইকরণ মান' : 'BMDC Verification Standards'}
                </span>
              </li>
            </ul>
          </div>

          {/* Emergency Box */}
          <div className="bg-slate-800/80 p-4 rounded-xl border border-red-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-red-400 font-semibold text-sm mb-2">
                <ShieldAlert className="w-5 h-5" />
                <span>{bilingualMode ? 'জরুরি সহায়তা' : 'Emergency Support'}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {bilingualMode
                  ? 'আপনি বা আপনার চারপাশের কেউ তীব্র বুকে ব্যথা, শ্বাসকষ্ট বা গুরুতর ট্রমার শিকার হলে দেরি না করে অবিলম্বে অ্যাম্বুলেন্স ডাকুন।'
                  : 'If you or someone around you suffers from severe chest pain, breathing difficulty, or deep trauma, do not delay.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-700">
              <a
                href="tel:999"
                className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 rounded-lg text-xs transition"
              >
                <PhoneCall className="w-4 h-4" />
                {bilingualMode ? 'কল করুন ৯৯৯ হটলাইন' : 'Call 999 Hotline'}
              </a>
            </div>
          </div>
        </div>

        {/* Mandatory Medical Disclaimer Notice */}
        <div className="mt-8 p-4 rounded-xl bg-slate-800/40 border border-slate-800 text-xs text-slate-400 leading-relaxed">
          <p className="font-semibold text-slate-300 mb-1">{bilingualMode ? 'ক্লিনিক্যাল নিরাপত্তা ও বিধিবদ্ধ সতর্কতা:' : 'Medical Safety & Regulatory Disclaimer:'}</p>
          <p>
            {bilingualMode
              ? 'মেডনেক্স একটি এআই স্বাস্থ্য তথ্য ও ট্রায়াজ প্ল্যাটফর্ম, যা কোনো নিবন্ধিত বিশেষজ্ঞ চিকিৎসকের সরাসরি রোগ নির্ণয় বা ব্যবস্থাপত্রের বিকল্প নয়। জরুরি মুহূর্তে অবিলম্বে ৯৯৯ নম্বরে যোগাযোগ করুন। খুলনার সকল ডাক্তার ও হাসপাতালের তথ্য সরকারি অফিশিয়াল ডিরেক্টরি থেকে যাচাইকৃত।'
              : 'MedNex is a healthcare assistance platform, not a replacement for professional medical diagnosis or treatment. AI-generated information may be inaccurate. Always consult a qualified healthcare professional for medical decisions. In an emergency, contact emergency services immediately. All doctor and facility information for Khulna is verified against official directories.'}
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} MedNex Health Technologies. {bilingualMode ? 'সর্বস্বত্ব সংরক্ষিত।' : 'All rights reserved.'}</p>
          <p className="flex items-center gap-1">
            {bilingualMode ? 'বাংলাদেশের স্বাস্থ্য সেবায় এআই প্রযুক্তি' : 'Built for safer, smarter healthcare in Bangladesh'}{' '}
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
          </p>
        </div>
      </div>
    </footer>
  );
};

