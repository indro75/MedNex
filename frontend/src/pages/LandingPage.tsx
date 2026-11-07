import React from 'react';
import { Link } from 'react-router-dom';
import {
  Stethoscope,
  MapPin,
  LifeBuoy,
  FileText,
  AlertCircle,
  Activity,
  Pill,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  Clock,
  Sparkles,
  Users,
  Building2,
  Heart
} from 'lucide-react';
import { useHealth } from '../context/HealthContext';

export const LandingPage: React.FC = () => {
  const { bilingualMode, t } = useHealth();

  const features = [
    {
      id: 'symptom-checker',
      title: bilingualMode ? 'এআই লক্ষণ নিরীক্ষক' : 'AI Symptom Checker',
      desc: bilingualMode
        ? 'আপনার স্বাস্থ্য সমস্যা নিজের ভাষায় লিখুন। আমাদের এনএলপি ইঞ্জিন উপযুক্ত বিশেষজ্ঞ বিভাগ সুপারিশ করবে এবং জরুরি লাল সংকেত সতর্ক করবে।'
        : 'Describe what you feel in natural language. Our NLP classification suggests relevant specialties and alerts for emergency red flags.',
      icon: Stethoscope,
      link: '/dashboard/symptom-checker',
      badge: bilingualMode ? 'এনএলপি ট্রায়াজ' : 'NLP Triage',
      color: 'blue'
    },
    {
      id: 'find-doctors',
      title: bilingualMode ? 'খুলনার ডাক্তার খুঁজুন' : 'Find Nearby Specialists',
      desc: bilingualMode
        ? 'খুলনা শহরের বিএমডিসি নিবন্ধিত ডাক্তার, ভিজিটিং আওয়ার, পরামর্শ ফি এবং হাসপাতালের অবস্থান সরাসরি ম্যাপে দেখুন।'
        : 'Discover verified doctors, BMDC registrations, consultation fees, and hospital emergency wings across Khulna with directions.',
      icon: MapPin,
      link: '/dashboard/find-doctors',
      badge: bilingualMode ? 'খুলনা যাচাইকৃত' : 'Khulna Verified',
      color: 'teal'
    },
    {
      id: 'first-aid',
      title: bilingualMode ? 'প্রাথমিক চিকিৎসা সহায়ক' : 'AI First Aid Assistant',
      desc: bilingualMode
        ? 'পোড়া, কাটাছেঁড়া, নাক দিয়ে রক্ত পড়া বা গলায় কিছু আটকে গেলে তাৎক্ষণিক প্রমাণ-ভিত্তিক চিকিৎসা নির্দেশিকা এবং সিপিআর অডিও মেট্রোনোম।'
        : 'Get immediate step-by-step guidance for burns, cuts, nosebleeds, choking, and sprains following recognized medical guidelines.',
      icon: LifeBuoy,
      link: '/dashboard/first-aid',
      badge: bilingualMode ? 'জীবন রক্ষাকারী' : 'Life Saving',
      color: 'emerald'
    },
    {
      id: 'report-analyzer',
      title: bilingualMode ? 'মেডিকেল রিপোর্ট ওসিআর' : 'Medical Report Analyzer',
      desc: bilingualMode
        ? 'সিবিসি, লিপিড প্রোফাইল বা লিভার ফাংশন ল্যাব রিপোর্ট আপলোড করুন। এআই বায়োমার্কার স্ক্যান করে অস্বাভাবিক রিডিং সহজ ভাষায় ব্যাখ্যা করবে।'
        : 'Upload laboratory test reports (CBC, Lipid, LFT). Extracts values via OCR, detects out-of-range biomarkers, and explains them simply.',
      icon: FileText,
      link: '/dashboard/report-analyzer',
      badge: bilingualMode ? 'স্মার্ট ওসিআর' : 'Smart OCR',
      color: 'indigo'
    },
    {
      id: 'emergency',
      title: bilingualMode ? 'জরুরি অ্যাম্বুলেন্স সেবা' : 'Emergency Ambulance Finder',
      desc: bilingualMode
        ? 'জাতীয় হেল্পলাইন ৯৯৯ এ তাৎক্ষণিক সরাসরি কল এবং খুলনার যাচাইকৃত সার্বক্ষণিক আইসিইউ ও নরমাল অ্যাম্বুলেন্স সার্ভিস ডিরেক্টরি।'
        : 'Instant direct dial to 999 Bangladesh emergency dispatch, alongside verified 24/7 ICU ambulance pools and hospital emergency rooms.',
      icon: AlertCircle,
      link: '/dashboard/emergency',
      badge: bilingualMode ? '২৪/৭ হটলাইন' : '24/7 Hotline',
      color: 'red'
    },
    {
      id: 'fitness-tracker',
      title: bilingualMode ? 'দৈনিক ফিটনেস ও বিএমআই' : 'Daily Fitness & BMI Tracker',
      desc: bilingualMode
        ? 'বডি মাস ইনডেক্স (বিএমআই) এবং সময়ের সাথে সাথে ওজন পরিবর্তনের চার্ট দেখুন। সুস্থ জীবনযাত্রার উপযোগী ক্যালোরি চাহিদা জানুন।'
        : 'Track body mass index, weight progress over time with interactive charts, and receive tailored adult wellness recommendations.',
      icon: Activity,
      link: '/dashboard/fitness-tracker',
      badge: bilingualMode ? 'অ্যানালিটিক্স' : 'Analytics',
      color: 'sky'
    },
    {
      id: 'medicine-checker',
      title: bilingualMode ? 'ওষুধ তথ্য নির্দেশিকা' : 'Medicine Information Checker',
      desc: bilingualMode
        ? 'ওষুধের নাম লিখুন বা প্যাকেজের ছবি তুলুন। জেনেরিক নাম, ব্যবহারবিধি, পার্শ্বপ্রতিক্রিয়া এবং একাধিক ওষুধের মধ্যকার প্রতিক্রিয়া জানুন।'
        : 'Search or snap medicine packages. Understand generics, therapeutic classes, safe uses, side effects, and crucial food interactions.',
      icon: Pill,
      link: '/dashboard/medicine-checker',
      badge: bilingualMode ? 'নিরাপত্তা প্রথম' : 'Safety First',
      color: 'amber'
    }
  ];

  return (
    <div className="space-y-24 py-8">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-semibold">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>{bilingualMode ? 'স্মার্ট স্বাস্থ্যসেবা • সঠিক সিদ্ধান্ত' : 'Smarter Healthcare. Better Decisions.'}</span>
              <span className="hidden sm:inline text-slate-400">|</span>
              <span className="hidden sm:inline text-teal-700 font-medium">
                {bilingualMode ? 'খুলনা বিভাগীয় স্বাস্থ্য পোর্টাল' : 'Khulna Division Ready'}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              {bilingualMode ? (
                <>
                  আপনার স্বাস্থ্য, <span className="text-blue-600">স্মার্ট।</span><br />
                  আপনার যত্ন, <span className="text-teal-600">কাছে।</span>
                </>
              ) : (
                <>
                  Your Health, <span className="text-blue-600">Smarter.</span><br />
                  Your Care, <span className="text-teal-600">Closer.</span>
                </>
              )}
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed">
              {bilingualMode
                ? 'একটি এআই চালিত নির্ভরযোগ্য স্বাস্থ্য প্ল্যাটফর্ম যা আপনাকে শারীরিক লক্ষণ বুঝতে, খুলনার যাচাইকৃত বিশেষজ্ঞ ডাক্তার খুঁজে পেতে, ল্যাব রিপোর্ট বুঝতে এবং ২৪/৭ জরুরি সেবা পেতে সহায়তা করে।'
                : 'An AI-powered healthcare companion that helps you understand symptoms, find verified specialists in Khulna, analyze medical reports, and access 24/7 emergency services.'}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-2">
              <Link
                to="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 text-white font-semibold shadow-md shadow-blue-500/25 hover:bg-blue-700 transition"
              >
                {bilingualMode ? 'বিনামূল্যে শুরু করুন' : 'Get Started Free'}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#features"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition shadow-xs"
              >
                {bilingualMode ? 'সেবা সমূহ দেখুন' : 'Explore Features'}
              </a>
              <Link
                to="/dashboard/emergency"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 font-semibold hover:bg-red-100 transition"
              >
                <PhoneCall className="w-4 h-4 text-red-600" />
                {bilingualMode ? 'জরুরি ৯৯৯' : '999 Emergency'}
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-left">
              <div>
                <p className="text-2xl font-bold text-slate-900">১০০%</p>
                <p className="text-xs text-slate-500 font-medium">
                  {bilingualMode ? 'বিএমডিসি নিবন্ধিত ডাক্তার' : 'BMDC Verified Doctors'}
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-teal-600">২৪/৭</p>
                <p className="text-xs text-slate-500 font-medium">
                  {bilingualMode ? 'খুলনা ৯৯৯ ডিসপ্যাচ' : '999 Khulna Dispatch'}
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">শূন্য</p>
                <p className="text-xs text-slate-500 font-medium">
                  {bilingualMode ? 'ভুয়া তথ্য নিশ্চয়তা' : 'Fake Info Guarantee'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Preview Card / Healthcare Illustration */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative background glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-teal-400 rounded-3xl blur-xl opacity-30"></div>

              {/* Main Card */}
              <div className="relative bg-white rounded-2xl shadow-xl border border-slate-200/80 p-5 space-y-4">
                {/* Header of Preview */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    <span className="text-xs font-semibold text-slate-400 ml-2">MedNex Assistant Engine</span>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                    {bilingualMode ? 'ইন্টারেক্টিভ প্রিভিউ' : 'Interactive Preview'}
                  </span>
                </div>

                {/* Simulated Triage Card */}
                <div className="p-3.5 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700">Symptom Input:</span>
                    <span className="text-[10px] text-slate-400">Just now</span>
                  </div>
                  <p className="text-xs text-slate-800 italic bg-white p-2.5 rounded-lg border border-slate-200">
                    "I have tightness on the left side of my chest with slight breathlessness after walking."
                  </p>
                </div>

                {/* AI Output preview */}
                <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-blue-900 font-semibold text-xs">
                      <Stethoscope className="w-4 h-4 text-blue-600" />
                      <span>Recommended Specialty:</span>
                    </div>
                    <span className="text-[11px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md">
                      Urgent Triage
                    </span>
                  </div>
                  <p className="text-xs font-bold text-blue-950">
                    Cardiology & Emergency Evaluation
                  </p>
                  <p className="text-[11px] text-blue-800 leading-snug">
                    Chest symptoms warrant rapid clinical assessment. Emergency signs flagged for potential cardiac origin.
                  </p>
                </div>

                {/* Khulna Doctor Match Preview */}
                <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-semibold text-emerald-900">Nearby Khulna Specialist:</p>
                    <p className="text-xs font-bold text-slate-900">Prof. Dr. Humayun Kabir</p>
                    <p className="text-[10px] text-slate-600">Fortis Escorts Khulna / KMCH</p>
                  </div>
                  <Link
                    to="/dashboard/find-doctors"
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                  >
                    View <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* 999 Direct Call Action */}
                <a
                  href="tel:999"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  Instant Emergency 999 Hotline
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section (7 primary services) */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            {bilingualMode ? 'ইন্টেলিজেন্ট মেডিকেল স্যুট' : 'Intelligent Medical Suite'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {bilingualMode ? '৭টি মূল স্বাস্থ্যসেবা, এক প্ল্যাটফর্মে' : 'Seven Core Healthcare Services, Reimagined'}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            {bilingualMode
              ? 'ক্লিনিক্যাল নিরাপত্তা বিধিমালা, সঠিক স্থানীয় হাসপাতাল ডিরেক্টরি এবং বুদ্ধিমত্তা সম্পন্ন এআই সহায়তায় তৈরি।'
              : 'Built with clinical safety safeguards, accurate local medical directories, and intelligent NLP assistance.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="group bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                      {feature.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition">
                    {idx + 1}. {feature.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100">
                  <Link
                    to={feature.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
                  >
                    {bilingualMode ? 'সেবা ব্যবহার করুন' : 'Open Service'}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works Section (3-step workflow) */}
      <section id="how-it-works" className="bg-slate-100/70 py-20 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              {bilingualMode ? 'সহজ ৩-ধাপের প্রক্রিয়া' : 'Simple 3-Step Process'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {bilingualMode ? 'মেডনেক্স যেভাবে আপনার স্বাস্থ্য সুরক্ষা নিশ্চিত করে' : 'How MedNex Supports Your Health'}
            </h2>
            <p className="text-slate-600 text-base">
              {bilingualMode
                ? 'দ্রুত, স্বচ্ছ এবং সরাসরি নির্ভরযোগ্য স্বাস্থ্যসেবার সাথে যুক্ত করার জন্য তৈরি।'
                : 'Fast, transparent, and designed to connect you to the right care without delay.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-extrabold flex items-center justify-center mb-5 text-sm shadow-sm">
                ১
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {bilingualMode ? 'আপনার স্বাস্থ্য সমস্যা জানান' : 'Tell MedNex what you need'}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {bilingualMode
                  ? 'নিজের ভাষায় লক্ষণ বর্ণনা করুন, ল্যাব টেস্ট রিপোর্টের ছবি আপলোড করুন অথবা জরুরি প্রাথমিক চিকিৎসা অনুসন্ধান করুন।'
                  : 'Describe your symptoms in plain language, upload an image of a lab test report, or search for an acute first-aid emergency situation.'}
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-full bg-teal-600 text-white font-extrabold flex items-center justify-center mb-5 text-sm shadow-sm">
                ২
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {bilingualMode ? 'এআই তথ্য বিশ্লেষণ করে' : 'AI analyzes the information'}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {bilingualMode
                  ? 'আমাদের ক্লিনিক্যাল অ্যালগরিদম লক্ষণ ও বায়োমার্কার স্ক্যান করে, জরুরি লাল সংকেত যাচাই করে এবং ট্রায়াজ লেভেল নির্ধারণ করে।'
                  : 'Our clinical algorithms parse text and lab values, triage urgency, screen for emergency red flags, and extract vital parameters.'}
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-extrabold flex items-center justify-center mb-5 text-sm shadow-sm">
                ৩
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {bilingualMode ? 'সঠিক চিকিৎসা সেবা ও পরামর্শ পান' : 'Get healthcare guidance & care'}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {bilingualMode
                  ? 'সহজ ভাষায় ব্যাখ্যা, প্রস্তাবিত বিশেষজ্ঞ ডাক্তারের বিবরণ, খুলনা চেম্বার বুকিং অথবা এক স্পর্শে ৯৯৯ অ্যাম্বুলেন্স কল করুন।'
                  : 'Receive plain explanations, recommended specialist categories, verified Khulna doctor contacts, or 1-click 999 ambulance dispatch.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us & Regional Deployment Section */}
      <section id="about-us" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
              <Building2 className="w-4 h-4 text-teal-600" />
              <span>Initial Sample Region: Khulna, Bangladesh</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Ground-Truth Medical Data, Never Synthetic Hallucinations
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              MedNex is built with an unwavering commitment to medical ethics: we never invent fake doctors, fictional addresses, or phantom contact numbers.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Our initial deployment features verified records from Khulna Medical College Hospital (KMCH), Gazi Medical College, Fortis Escorts Heart Institute, and the 999 Bangladesh National Emergency Service.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-700 font-semibold">
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>BMDC Doctor Verification</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>999 National Integration</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Patient Data Privacy</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 space-y-4">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              MedNex Medical Safety Principles
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                <span><strong>No fake diagnosis:</strong> AI assists in triage and specialty recommendation without declaring a finalized diagnostic verdict.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                <span><strong>No unauthorized prescriptions:</strong> We never alter doses or recommend stopping medications prescribed by your physician.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                <span><strong>Emergency prioritization:</strong> High-risk symptoms instantly bypass standard chat and display immediate 999 emergency instructions.</span>
              </li>
            </ul>

            <div className="pt-3 border-t border-slate-200">
              <Link
                to="/dashboard"
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition"
              >
                Enter MedNex Platform
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ) Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Transparent Answers About MedNex
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Everything you need to know about our clinical triage engine, BMDC verified directories, and patient safety safeguards.
          </p>
        </div>

        <div className="space-y-3">
          {[
            {
              q: 'Does MedNex replace my doctor or hospital emergency visit?',
              a: 'No. MedNex is an AI-powered healthcare assistant designed for educational guidance and clinical triage. It helps you understand urgency, flags critical warning signs, and directs you to the appropriate specialist. For diagnostic determinations or acute treatment, always see a qualified healthcare professional.'
            },
            {
              q: 'Are the Khulna doctors, addresses, and ambulances real?',
              a: 'Yes, 100%. MedNex enforces a strict zero-hallucination standard. All hospital profiles (KMCH, Gazi, Fortis, Abu Naser), doctor credentials with BMDC registration numbers, consultation fees, and emergency phone numbers are verified against official medical directories.'
            },
            {
              q: 'What happens if I describe life-threatening emergency symptoms?',
              a: 'If your symptom input describes acute cardiac red flags (e.g. crushing chest pain, radiating arm pain), stroke indicators (facial drooping, sudden weakness), or severe trauma, MedNex immediately bypasses standard chat routines to display prominent 999 hotline dialers and emergency instructions.'
            },
            {
              q: 'How does the Medical Report Analyzer interpret lab values?',
              a: 'Our report analyzer extracts laboratory biomarkers via OCR, compares observed values with stated laboratory reference bounds, highlights abnormal flags, and explains the medical significance in simple language alongside recommended questions for your physician.'
            },
            {
              q: 'How is my private medical data secured?',
              a: 'Your health inputs and vitals are stored locally on your device with patient consent. You can view, export in JSON format, or delete your entire health history at any time.'
            }
          ].map((faq, idx) => (
            <details
              key={idx}
              className="group bg-white rounded-2xl p-5 border border-slate-200 shadow-xs cursor-pointer transition open:bg-slate-50/70"
            >
              <summary className="flex items-center justify-between font-bold text-sm text-slate-900 list-none">
                <span>{faq.q}</span>
                <span className="text-blue-600 group-open:rotate-180 transition-transform text-lg ml-2">
                  ▾
                </span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
};

