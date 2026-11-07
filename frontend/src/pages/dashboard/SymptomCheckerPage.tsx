import React, { useState } from 'react';
import {
  Stethoscope,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Info,
  HelpCircle,
  MapPin,
  RefreshCw,
  Printer,
  Building2,
  Eye,
  Sliders
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PREDEFINED_SYMPTOMS, analyzeSymptoms } from '../../data/symptomRules';
import { KHULNA_DOCTORS } from '../../data/khulnaMedicalData';
import { SymptomAnalysisResult } from '../../types';
import { useHealth } from '../../context/HealthContext';
import { useAuth } from '../../context/AuthContext';
import { VisualBodyMap } from '../../components/symptom/VisualBodyMap';

export const SymptomCheckerPage: React.FC = () => {
  const { user } = useAuth();
  const { addSymptomCheckActivity, bilingualMode } = useHealth();

  // Form State
  const [description, setDescription] = useState('');
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>('all');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [durationDays, setDurationDays] = useState<number>(3);
  const [severity, setSeverity] = useState<number>(5);
  const [medicalHistory] = useState<string[]>(user?.chronicConditions || ['Mild Hypertension']);
  const [showBodyMap, setShowBodyMap] = useState<boolean>(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<SymptomAnalysisResult | null>(null);

  // Quick preset suggestions for fast user testing:
  const loadPreset = (preset: 'chest' | 'headache' | 'acid' | 'knee') => {
    if (preset === 'chest') {
      setDescription(
        bilingualMode
          ? 'সিঁড়ি বেয়ে ওঠার পর বুকের বাম পাশে তীব্র চাপ ও ব্যথা অনুভূত হচ্ছে যা চোয়ালের দিকে ছড়াচ্ছে এবং প্রচুর ঘাম হচ্ছে।'
          : 'I am experiencing severe pressure and pain on the left side of my chest radiating toward my jaw and sweating.'
      );
      setSelectedSymptoms(['chest_pain_severe', 'chest_pain_left', 'shortness_of_breath']);
      setSelectedBodyPart('chest');
      setSeverity(9);
      setDurationDays(1);
    } else if (preset === 'headache') {
      setDescription(
        bilingualMode
          ? 'গত ৩ দিন ধরে মাথার ডান পাশে তীব্র দপদপ করা মাথাব্যথা, মাথা ঘোরা এবং আলোতে তাকাতে কষ্ট হচ্ছে।'
          : 'Throbbing headache on the right temple with dizziness and sensitivity to bright light for past 3 days.'
      );
      setSelectedSymptoms(['headache_throbbing', 'dizziness']);
      setSelectedBodyPart('head');
      setSeverity(6);
      setDurationDays(3);
    } else if (preset === 'acid') {
      setDescription(
        bilingualMode
          ? 'খাবারের পর বুক ও পেটে তীব্র জ্বালাপোড়া এবং মুখে টক ঢেকুর বা অম্লরস উঠে আসা।'
          : 'Severe burning sensation in chest and stomach after meals, with acid taste in mouth.'
      );
      setSelectedSymptoms(['heartburn_acid', 'nausea_vomiting']);
      setSelectedBodyPart('abdomen');
      setSeverity(5);
      setDurationDays(7);
    } else if (preset === 'knee') {
      setDescription(
        bilingualMode
          ? 'ডান হাঁটু ফুলে গেছে এবং সিঁড়ি ওঠার সময় বা হাঁটার সময় তীব্র ব্যথা করে, সকালে পা শক্ত হয়ে থাকে।'
          : 'Right knee joint is swollen and painful when climbing stairs or walking, stiff in morning.'
      );
      setSelectedSymptoms(['joint_swelling', 'leg_cramps']);
      setSelectedBodyPart('limbs');
      setSeverity(5);
      setDurationDays(14);
    }
  };

  const handleToggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const filteredSymptoms = selectedBodyPart === 'all'
    ? PREDEFINED_SYMPTOMS
    : PREDEFINED_SYMPTOMS.filter((s) => s.bodyPart === selectedBodyPart);

  const handleAnalyze = () => {
    if (!description.trim() && selectedSymptoms.length === 0) {
      alert(bilingualMode ? 'অনুগ্রহ করে আপনার সমস্যা লিখুন অথবা তালিকা থেকে লক্ষণ নির্বাচন করুন।' : 'Please either describe your symptoms or select symptoms from the list.');
      return;
    }

    setIsAnalyzing(true);
    setTimeout(() => {
      const analysis = analyzeSymptoms(
        description,
        selectedSymptoms,
        selectedBodyPart,
        durationDays,
        severity,
        medicalHistory
      );
      setResult(analysis);
      setIsAnalyzing(false);

      // Save to Health timeline
      addSymptomCheckActivity(
        description ? description.slice(0, 80) : `Selected ${selectedSymptoms.length} symptoms`,
        analysis
      );
    }, 550);
  };

  const handleReset = () => {
    setDescription('');
    setSelectedSymptoms([]);
    setSeverity(5);
    setDurationDays(3);
    setSelectedBodyPart('all');
    setResult(null);
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'emergency':
        return {
          label: bilingualMode ? 'জরুরি বিপদ সংকেত / ইমার্জেন্সি' : 'CRITICAL / EMERGENCY ALERT',
          classes: 'bg-red-600 text-white animate-pulse',
          border: 'border-red-600 bg-red-50/50'
        };
      case 'high':
        return {
          label: bilingualMode ? 'উচ্চ অগ্রাধিকার - ২৪ ঘণ্টার মধ্যে ডাক্তার দেখান' : 'HIGH URGENCY - SEE DOCTOR WITHIN 24H',
          classes: 'bg-amber-600 text-white',
          border: 'border-amber-400 bg-amber-50/40'
        };
      case 'moderate':
        return {
          label: bilingualMode ? 'মাঝারি - চিকিৎসকের অ্যাপয়েন্টমেন্ট নিন' : 'MODERATE - SCHEDULE AN APPOINTMENT',
          classes: 'bg-blue-600 text-white',
          border: 'border-blue-300 bg-blue-50/30'
        };
      default:
        return {
          label: bilingualMode ? 'স্বাভাবিক - রুটিন মূল্যায়ন ও ঘরোয়া যত্ন' : 'LOW - ROUTINE EVALUATION & HOME CARE',
          classes: 'bg-teal-600 text-white',
          border: 'border-teal-300 bg-teal-50/30'
        };
    }
  };

  // Find matching doctors in Khulna based on recommended specialty
  const matchedDoctors = result
    ? KHULNA_DOCTORS.filter(
        (doc) =>
          doc.specialty.toLowerCase().includes(result.specialty.toLowerCase()) ||
          result.specialty.toLowerCase().includes(doc.specialty.toLowerCase())
      )
    : [];

  return (
    <div className="space-y-6">
      {/* Title & Introduction */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{bilingualMode ? 'এআই প্রাকৃতিক ভাষা ক্লিনিক্যাল ট্রায়াজ ইঞ্জিন' : 'NLP Clinical Classification Engine'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {bilingualMode ? 'এআই লক্ষণ নিরীক্ষণ ও বিশেষজ্ঞ ট্রায়াজ' : 'AI Symptom Checker & Specialist Triage'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            {bilingualMode
              ? 'আপনার শারীরিক সমস্যার বিবরণ দিন। মেডনেক্স আপনার ঝুঁকির মাত্রা মূল্যায়ন করবে, বিপদ সংকেত শনাক্ত করবে এবং খুলনার উপযুক্ত বিশেষজ্ঞ ডাক্তারের সাথে মিলিয়ে দেবে।'
              : 'Provide details of your discomfort. MedNex evaluates urgency, flags emergency warning signs, and directs you to the appropriate medical specialty in Khulna.'}
          </p>
        </div>

        {/* Quick presets */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400">
            {bilingualMode ? 'দ্রুত পরিস্থিতি:' : 'Quick Scenarios:'}
          </span>
          <button
            type="button"
            onClick={() => loadPreset('chest')}
            className="text-xs font-medium px-2.5 py-1 rounded-lg bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition"
          >
            {bilingualMode ? 'বুকে চাপ (জরুরি)' : 'Chest Pressure (Emergency)'}
          </button>
          <button
            type="button"
            onClick={() => loadPreset('headache')}
            className="text-xs font-medium px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition"
          >
            {bilingualMode ? 'মাইগ্রেন / মাথা ঘোরা' : 'Migraine / Dizziness'}
          </button>
          <button
            type="button"
            onClick={() => loadPreset('acid')}
            className="text-xs font-medium px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition"
          >
            {bilingualMode ? 'বুকজ্বালা / এসিডিটি' : 'Heartburn / Gastritis'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Input Form */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          {/* Section 1: Natural Language Description */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              {bilingualMode
                ? '১. আপনার শারীরিক সমস্যা বা অনুভূতি সাধারণ ভাষায় বর্ণনা করুন'
                : '1. Describe what you are experiencing in plain language'}
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={
                bilingualMode
                  ? 'যেমন সিঁড়ি বেয়ে ওঠার পর বুকের বাম পাশে তীব্র চাপ ও ব্যথা অনুভূত হচ্ছে, ঘাম হচ্ছে...'
                  : 'e.g. I am experiencing sharp pain on the left side of my chest radiating toward my jaw and sweating after climbing stairs...'
              }
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
            />
          </div>

          {/* Section 2: Interactive Body Map vs Pills Toggle */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                {bilingualMode
                  ? '২. ব্যথার স্থান বা শারীরিক অংশ নির্বাচন করুন'
                  : '2. Specify Pain Location / Body Area'}
              </label>
              <button
                type="button"
                onClick={() => setShowBodyMap(!showBodyMap)}
                className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
              >
                {showBodyMap ? <Sliders className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                {showBodyMap
                  ? (bilingualMode ? 'টেক্সট তালিকা দেখুন' : 'Show Text Pills')
                  : (bilingualMode ? 'মানবদেহের ম্যাপ দেখুন' : 'Show Visual Body Map')}
              </button>
            </div>

            {showBodyMap ? (
              <VisualBodyMap
                selectedPart={selectedBodyPart}
                onSelectPart={(part) => setSelectedBodyPart(part)}
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: bilingualMode ? 'সকল অংশ' : 'All Areas' },
                  { id: 'head', label: bilingualMode ? 'মাথা ও ঘাড়' : 'Head & Neck' },
                  { id: 'chest', label: bilingualMode ? 'বুক ও হৃদযন্ত্র' : 'Chest & Heart' },
                  { id: 'abdomen', label: bilingualMode ? 'পেট ও পরিপাকতন্ত্র' : 'Abdomen' },
                  { id: 'limbs', label: bilingualMode ? 'হাত ও পা' : 'Arms & Legs' },
                  { id: 'back', label: bilingualMode ? 'পিঠ ও মেরুদণ্ড' : 'Spine & Back' },
                  { id: 'systemic', label: bilingualMode ? 'পুরো শরীর' : 'Systemic / Whole Body' },
                ].map((part) => (
                  <button
                    key={part.id}
                    type="button"
                    onClick={() => setSelectedBodyPart(part.id)}
                    className={`text-xs px-3 py-1.5 rounded-xl font-medium transition ${
                      selectedBodyPart === part.id
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {part.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Section 3: Predefined symptom chips */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                {bilingualMode
                  ? `৩. চিকিৎসাগত লক্ষণ চেকলিস্ট (${selectedSymptoms.length}টি নির্বাচিত)`
                  : `3. Clinical Symptom Checklist (${selectedSymptoms.length} selected)`}
              </label>
              {selectedSymptoms.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedSymptoms([])}
                  className="text-[11px] text-red-600 hover:underline"
                >
                  {bilingualMode ? 'নির্বাচন মুছুন' : 'Clear Selection'}
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-2 border border-slate-200 rounded-2xl bg-slate-50">
              {filteredSymptoms.map((symp) => {
                const isSelected = selectedSymptoms.includes(symp.id);
                const sympLabel = bilingualMode ? symp.labelBn : symp.label;
                return (
                  <button
                    key={symp.id}
                    type="button"
                    onClick={() => handleToggleSymptom(symp.id)}
                    className={`text-xs px-3 py-1.5 rounded-xl font-medium transition flex items-center gap-1.5 ${
                      isSelected
                        ? symp.isRedFlag
                          ? 'bg-red-600 text-white shadow-xs'
                          : 'bg-blue-600 text-white shadow-xs'
                        : symp.isRedFlag
                        ? 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {symp.isRedFlag && <AlertTriangle className="w-3.5 h-3.5 shrink-0" />}
                    <span>{sympLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 4: Duration & Severity Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-slate-100">
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                <span>{bilingualMode ? 'স্থায়িত্বকাল' : 'Duration'}</span>
                <span className="text-blue-600 font-extrabold">
                  {durationDays} {bilingualMode ? 'দিন' : 'day(s)'}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={30}
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>{bilingualMode ? '১ দিন (তাত্ক্ষণিক)' : '1 day (Acute)'}</span>
                <span>{bilingualMode ? '২ সপ্তাহ' : '2 weeks'}</span>
                <span>{bilingualMode ? '৩০+ দিন (ক্রনিক)' : '30+ days (Chronic)'}</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                <span>{bilingualMode ? 'ব্যথার তীব্রতা' : 'Pain Severity'}</span>
                <span className={`font-extrabold ${severity >= 8 ? 'text-red-600' : severity >= 5 ? 'text-amber-600' : 'text-blue-600'}`}>
                  {severity} / 10
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={severity}
                onChange={(e) => setSeverity(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>{bilingualMode ? '১ (সামান্য)' : '1 (Mild)'}</span>
                <span>{bilingualMode ? '৫ (মাঝারি)' : '5 (Moderate)'}</span>
                <span className="text-red-600 font-bold">{bilingualMode ? '১০ (তীব্র অসহ্য ব্যথা)' : '10 (Extreme Pain)'}</span>
              </div>
            </div>
          </div>

          {/* Medical history notice */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-600 shrink-0" />
              <span>
                {bilingualMode ? 'বিবেচিত চিকিৎসা ইতিহাস:' : 'Medical History factored:'}{' '}
                <strong>{user?.chronicConditions?.join(', ') || (bilingualMode ? 'কোনো পূর্ব ইতিহাস নেই' : 'None stated')}</strong>
              </span>
            </div>
            <Link to="/dashboard/settings" className="text-blue-600 hover:underline shrink-0 font-medium">
              {bilingualMode ? 'প্রোফাইল আপডেট' : 'Update Profile'}
            </Link>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  {bilingualMode ? 'লক্ষণ বিশ্লেষণ করা হচ্ছে...' : 'Analyzing Clinical Indicators...'}
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  {bilingualMode ? 'লক্ষণগুলো বিশ্লেষণ করুন' : 'Analyze Symptoms Now'}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-sm font-medium transition"
            >
              {bilingualMode ? 'মুছুন' : 'Clear'}
            </button>
          </div>
        </div>

        {/* Right Column: AI Results & Guidance */}
        <div className="lg:col-span-5 space-y-6">
          {!result ? (
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <Stethoscope className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-800">
                {bilingualMode ? 'ক্লিনিক্যাল ট্রায়াজের জন্য প্রস্তুত' : 'Ready for Clinical Triage'}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                {bilingualMode
                  ? 'বামে আপনার শারীরিক লক্ষণসমূহ লিখুন অথবা মানবদেহের চিত্রে ক্লিক করুন। এআই ইঞ্জিন আপনার সম্ভাব্য বিশেষজ্ঞ বিভাগ নির্ধারণ করবে, বিপদ সংকেত চিহ্নিত করবে এবং খুলনার ডাক্তারদের সাথে যুক্ত করবে।'
                  : 'Enter your symptoms on the left or click on the anatomical figure. The AI engine evaluates specialty recommendations, detects emergency red flags, and matches verified Khulna doctors.'}
              </p>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-left text-xs text-amber-900 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-700" />
                  {bilingualMode ? 'জরুরি সুরক্ষা প্রটোকল:' : 'Safety First Protocol:'}
                </p>
                <p>
                  {bilingualMode
                    ? 'হঠাৎ তীব্র বুকে চাপ, প্যারালাইসিস বা দমবন্ধ হওয়া অনুভূত হলে স্বয়ংক্রিয়ভাবে জরুরি ৯৯৯ নির্দেশাবলী সক্রিয় হবে।'
                    : 'Any case of sudden severe chest tightness, paralysis, or breathing collapse automatically activates our Emergency 999 response instructions.'}
                </p>
              </div>
            </div>
          ) : (
            <div className={`rounded-3xl border p-6 space-y-5 bg-white shadow-md ${getUrgencyBadge(result.urgency).border}`}>
              {/* Urgency Badge */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className={`text-xs font-black px-3 py-1 rounded-full tracking-wider ${getUrgencyBadge(result.urgency).classes}`}>
                  {getUrgencyBadge(result.urgency).label}
                </span>
                <span className="text-[11px] font-semibold text-slate-400">
                  {bilingualMode ? 'নির্ভরযোগ্যতা' : 'Confidence'}: {result.confidence}%
                </span>
              </div>

              {/* Emergency Alert Box if Emergency */}
              {result.isEmergencyAlert && (
                <div className="bg-red-600 text-white p-4 rounded-2xl space-y-3 shadow-md emergency-pulse">
                  <div className="flex items-center gap-2 font-black text-sm uppercase tracking-wide">
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    <span>{bilingualMode ? 'জরুরি তাৎক্ষণিক সতর্কবার্তা' : 'Immediate Medical Warning'}</span>
                  </div>
                  <p className="text-xs text-red-50 leading-relaxed">
                    {bilingualMode
                      ? 'আপনার উল্লেখিত লক্ষণসমূহে স্বীকৃত জরুরি বিপদ সংকেত রয়েছে। দেরি না করে তাৎক্ষণিক জরুরি চিকিৎসা নিন।'
                      : 'The symptoms you described include recognized emergency warning signs. Do NOT delay or wait for a routine clinic appointment.'}
                  </p>
                  {(result.emergencyWarningSignsBn || result.emergencyWarningSigns) && (
                    <ul className="text-xs space-y-1 bg-red-700/60 p-2.5 rounded-xl">
                      {(bilingualMode && result.emergencyWarningSignsBn ? result.emergencyWarningSignsBn : result.emergencyWarningSigns || []).map((w, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span>•</span>
                          <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="pt-1 flex gap-2">
                    <a
                      href="tel:999"
                      className="w-full flex items-center justify-center gap-2 py-2.5 bg-white text-red-600 font-extrabold rounded-xl text-xs hover:bg-red-50 shadow-sm transition"
                    >
                      <PhoneCall className="w-4 h-4" />
                      {bilingualMode ? 'বাংলাদেশ জরুরি ৯৯৯ এ কল দিন' : 'Dial Bangladesh 999 Hotline'}
                    </a>
                  </div>
                </div>
              )}

              {/* Recommended Specialty Card */}
              <div className="p-4 bg-blue-50/80 border border-blue-200 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-blue-900">
                    {bilingualMode ? 'প্রস্তাবিত বিশেষজ্ঞ বিভাগ:' : 'Recommended Medical Specialty:'}
                  </span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-blue-200 text-blue-800">
                    {bilingualMode ? 'লক্ষ্যমাত্রা বিশেষজ্ঞ' : 'Target Specialist'}
                  </span>
                </div>
                <p className="text-xl font-extrabold text-blue-950">
                  {bilingualMode && result.specialtyBn ? result.specialtyBn : result.specialty}
                </p>
                <p className="text-xs text-blue-800 leading-relaxed">
                  {bilingualMode && result.triageAdviceBn ? result.triageAdviceBn : result.triageAdvice}
                </p>
              </div>

              {/* Matched Khulna Doctor Preview Card */}
              {matchedDoctors.length > 0 && (
                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-emerald-700" />
                      {bilingualMode
                        ? `খুলনার উপযুক্ত ${result.specialty} বিশেষজ্ঞ:`
                        : `Matched Khulna ${result.specialty} Specialist:`}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      BMDC Verified
                    </span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-emerald-100 space-y-1">
                    <p className="text-xs font-extrabold text-slate-900">{matchedDoctors[0].name}</p>
                    <p className="text-[11px] text-slate-600">{matchedDoctors[0].degrees}</p>
                    <p className="text-[11px] text-slate-500">{matchedDoctors[0].chamberAddress}</p>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <span className="text-xs font-bold text-slate-800">
                        {bilingualMode ? 'পরামর্শ ফি: ৳' : 'Fee: ৳'}{matchedDoctors[0].consultationFeeBDT}
                      </span>
                      <Link
                        to="/dashboard/find-doctors"
                        className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                      >
                        {bilingualMode ? 'চেম্বার সিরিয়াল বুক করুন' : 'Book Chamber Serial'} <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Possible explanations without claiming diagnosis */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  {bilingualMode
                    ? 'সম্ভাব্য বিবেচনা ও কারণসমূহ (পরামর্শমূলক মূল্যায়ন)'
                    : 'Common Considerations (Non-Diagnostic Evaluation)'}
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  {(bilingualMode && result.possibleCausesBn ? result.possibleCausesBn : result.possibleCauses).map((cause, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                      <span>{cause}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[10px] text-slate-400 mt-1 italic">
                  {bilingualMode
                    ? '*এগুলো ডাক্তারের সাথে আলোচনার জন্য সম্ভাব্য কারণ, চূড়ান্ত রোগ নির্ণয় নয়।'
                    : '*These are potential medical considerations for discussion with your doctor, not a definitive diagnosis.'}
                </p>
              </div>

              {/* Questions for doctor */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-blue-600" />
                  {bilingualMode ? 'ডাক্তারকে জিজ্ঞাসা করার মতো প্রয়োজনীয় প্রশ্নসমূহ' : 'Questions to ask your Physician'}
                </h4>
                <div className="space-y-1.5">
                  {(bilingualMode && result.questionsForDoctorBn ? result.questionsForDoctorBn : result.questionsForDoctor).map((q, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{q}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <Link
                  to="/dashboard/find-doctors"
                  className="flex-1 text-center py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs"
                >
                  <MapPin className="w-4 h-4" />
                  {bilingualMode ? 'খুলনার বিশেষজ্ঞ ডাক্তারদের তালিকা' : 'Find Khulna Specialists'}
                </Link>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="py-2.5 px-4 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  {bilingualMode ? 'ট্রায়াজ স্লিপ প্রিন্ট করুন' : 'Print Triage Slip'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
