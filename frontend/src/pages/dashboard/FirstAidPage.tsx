import React, { useState, useEffect } from 'react';
import {
  LifeBuoy,
  Search,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  PhoneCall,
  Flame,
  Scissors,
  Droplet,
  Activity,
  UserX,
  Sun,
  ShieldCheck,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Clock,
  Heart
} from 'lucide-react';
import { FIRST_AID_GUIDES } from '../../data/firstAidData';
import { FirstAidGuide } from '../../types';
import { useHealth } from '../../context/HealthContext';

export const FirstAidPage: React.FC = () => {
  const { bilingualMode } = useHealth();
  const [selectedGuide, setSelectedGuide] = useState<FirstAidGuide>(FIRST_AID_GUIDES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'steps' | 'dos_donts' | 'emergency'>('steps');

  // Voice Assistant (Speech Synthesis) State
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Clinical Timer State (e.g. 15 mins for burns, 10 mins for nosebleeds, 2 mins CPR)
  const defaultTimerSeconds =
    selectedGuide.id === 'minor-burns' ? 900 : selectedGuide.id === 'nosebleeds' ? 600 : 120;
  const [timerSeconds, setTimerSeconds] = useState(defaultTimerSeconds);
  const [timerRunning, setTimerRunning] = useState(false);

  // CPR Metronome (100-110 BPM)
  const [metronomeActive, setMetronomeActive] = useState(false);
  const [metronomePulse, setMetronomePulse] = useState(false);

  // Reset timer on guide change
  useEffect(() => {
    const sec =
      selectedGuide.id === 'minor-burns' ? 900 : selectedGuide.id === 'nosebleeds' ? 600 : 120;
    setTimerSeconds(sec);
    setTimerRunning(false);
    setMetronomeActive(false);

    // Stop speaking if switching guides
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [selectedGuide]);

  // Countdown timer effect
  useEffect(() => {
    let interval: any = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  // CPR 105 BPM Metronome Effect
  useEffect(() => {
    let metroInterval: any = null;
    if (metronomeActive) {
      // 105 BPM -> ~571ms
      metroInterval = setInterval(() => {
        setMetronomePulse(true);
        setTimeout(() => setMetronomePulse(false), 150);
      }, 571);
    }
    return () => clearInterval(metroInterval);
  }, [metronomeActive]);

  // Speech Synthesis
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert(bilingualMode ? 'এই ব্রাউজারে টেক্সট-টু-স্পিচ সমর্থিত নয়।' : 'Text-to-speech is not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const title = bilingualMode && selectedGuide.titleBn ? selectedGuide.titleBn : selectedGuide.title;
      const safety = bilingualMode && selectedGuide.immediateSafetyBn ? selectedGuide.immediateSafetyBn.join('. ') : selectedGuide.immediateSafety.join('. ');
      const step1 = bilingualMode && selectedGuide.steps[0].instructionBn ? selectedGuide.steps[0].instructionBn : selectedGuide.steps[0].instruction;
      const textToSpeak = `${title}. ${safety}. ${step1}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.95; // Clear emergency pace
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredGuides = FIRST_AID_GUIDES.filter((g) => {
    const query = searchQuery.toLowerCase();
    const titleMatch = g.title.toLowerCase().includes(query) || (g.titleBn && g.titleBn.toLowerCase().includes(query));
    const catMatch = g.category.toLowerCase().includes(query) || (g.categoryBn && g.categoryBn.toLowerCase().includes(query));
    const descMatch = g.shortDesc.toLowerCase().includes(query) || (g.shortDescBn && g.shortDescBn.toLowerCase().includes(query));
    return titleMatch || catMatch || descMatch;
  });

  const getGuideIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame':
        return <Flame className="w-5 h-5 text-amber-500" />;
      case 'Scissors':
        return <Scissors className="w-5 h-5 text-red-500" />;
      case 'Droplet':
        return <Droplet className="w-5 h-5 text-rose-500" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-blue-500" />;
      case 'UserX':
        return <UserX className="w-5 h-5 text-indigo-500" />;
      case 'Sun':
        return <Sun className="w-5 h-5 text-amber-600" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
    }
  };

  const currentImmediateSafety =
    bilingualMode && selectedGuide.immediateSafetyBn ? selectedGuide.immediateSafetyBn : selectedGuide.immediateSafety;
  const currentDos =
    bilingualMode && selectedGuide.dosBn ? selectedGuide.dosBn : selectedGuide.dos;
  const currentDonts =
    bilingualMode && selectedGuide.dontsBn ? selectedGuide.dontsBn : selectedGuide.donts;
  const currentWhenToSeek =
    bilingualMode && selectedGuide.whenToSeekEmergencyBn ? selectedGuide.whenToSeekEmergencyBn : selectedGuide.whenToSeekEmergency;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-2">
            <LifeBuoy className="w-3.5 h-3.5 text-emerald-600" />
            <span>{bilingualMode ? 'আন্তর্জাতিক প্রাথমিক জরুরি চিকিৎসা নির্দেশিকা' : 'Standard Clinical First Aid Protocols'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {bilingualMode ? 'এআই ফার্স্ট এইড সহকারী' : 'AI First Aid Assistant'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            {bilingualMode
              ? 'জরুরি পরিস্থিতিতে জীবন রক্ষাকারী প্রাথমিক চিকিৎসার নির্ভরযোগ্য নির্দেশিকা, ভয়েস গাইডেন্স ও টাইমার।'
              : 'Step-by-step emergency instructions compliant with recognized resuscitation & first-aid guidelines with voice guidance and emergency timers.'}
          </p>
        </div>

        {/* 999 Hotline */}
        <a
          href="tel:999"
          className="flex items-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-xs font-bold shadow-md shadow-red-500/20 transition shrink-0"
        >
          <PhoneCall className="w-4 h-4" />
          <span>{bilingualMode ? 'জীবন সংকট? ৯৯৯ কল দিন' : 'Life-Threatening? Dial 999'}</span>
        </a>
      </div>

      {/* Quick Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={
            bilingualMode
              ? 'প্রাথমিক চিকিৎসার পরিস্থিতি খুঁজুন (যেমন পোড়া, কাটা, নাক দিয়ে রক্ত, বিষাক্ত কামড়, শ্বাসকষ্ট)...'
              : 'Search first aid situations (e.g., burn, cut, nosebleed, choking, heat stroke, snake bite)...'
          }
          className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-xs"
        />
      </div>

      {/* Horizontal Category Pill Carousel */}
      <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
        {filteredGuides.map((guide) => {
          const isSelected = selectedGuide.id === guide.id;
          const guideLabel = bilingualMode && guide.titleBn ? guide.titleBn.split('(')[0] : guide.title.split('(')[0];
          return (
            <button
              key={guide.id}
              onClick={() => setSelectedGuide(guide)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition border ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span className={isSelected ? 'text-white' : ''}>
                {getGuideIcon(guide.iconName)}
              </span>
              <span>{guideLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Clinical Timer / CPR Metronome Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Interactive First Aid Timer */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {selectedGuide.id === 'minor-burns'
                ? (bilingualMode ? 'পানি ঢালার টাইমার (কমপক্ষে ১৫ মিনিট)' : 'Cooling Water Timer (15 Mins Minimum)')
                : selectedGuide.id === 'nosebleeds'
                ? (bilingualMode ? 'নাক চেপে রাখার টাইমার (১০ মিনিট)' : 'Continuous Nasal Pinch Timer (10 Mins)')
                : (bilingualMode ? 'জরুরি চিকিৎসা প্রক্রিয়া স্টপওয়াচ' : 'Emergency Procedure Stopwatch')}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-slate-900 font-mono">
                {formatTimer(timerSeconds)}
              </span>
              <button
                type="button"
                onClick={() => setTimerRunning(!timerRunning)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                  timerRunning
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {timerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                {timerRunning
                  ? (bilingualMode ? 'বিরতি' : 'Pause')
                  : (bilingualMode ? 'টাইমার শুরু' : 'Start Timer')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setTimerRunning(false);
                  setTimerSeconds(defaultTimerSeconds);
                }}
                className="p-1 text-slate-400 hover:text-slate-700"
                title={bilingualMode ? 'টাইমার রিসেট' : 'Reset Timer'}
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* CPR Metronome & Voice Assistant */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          {/* CPR Compression Metronome */}
          <button
            type="button"
            onClick={() => setMetronomeActive(!metronomeActive)}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
              metronomeActive
                ? 'bg-red-50 text-red-700 border-red-300'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Heart
              className={`w-4 h-4 text-red-600 ${
                metronomePulse ? 'scale-125 stroke-[3]' : 'scale-100'
              } transition-transform duration-75`}
            />
            <span>
              {metronomeActive
                ? (bilingualMode ? 'সিপিআর ১০৫ বিপিএম বিট' : 'CPR 105 BPM Beep')
                : (bilingualMode ? 'সিপিআর বিট সহকারী' : 'CPR Metronome')}
            </span>
          </button>

          {/* Hands-Free Voice Assistant */}
          <button
            type="button"
            onClick={handleToggleSpeech}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
              isSpeaking
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>
              {isSpeaking
                ? (bilingualMode ? 'ভয়েস বন্ধ' : 'Mute Voice')
                : (bilingualMode ? '🔊 পড়ে শোনান' : '🔊 Read Aloud')}
            </span>
          </button>
        </div>
      </div>

      {/* Main Selected Guide Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Guide Title Header */}
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-slate-200 flex items-center justify-center shrink-0">
              {getGuideIcon(selectedGuide.iconName)}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                {bilingualMode && selectedGuide.categoryBn ? selectedGuide.categoryBn : selectedGuide.category}
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
                {bilingualMode && selectedGuide.titleBn ? selectedGuide.titleBn : selectedGuide.title}
              </h3>
              <p className="text-xs text-slate-500">
                {bilingualMode && selectedGuide.shortDescBn ? selectedGuide.shortDescBn : selectedGuide.shortDesc}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <a
              href="tel:999"
              className="py-2 px-3.5 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 transition flex items-center gap-1.5 shadow-xs"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              {bilingualMode ? 'সরাসরি ৯৯৯ কল' : 'Direct 999'}
            </a>
          </div>
        </div>

        {/* Severe Warning Alert if present */}
        {selectedGuide.severityWarning && (
          <div className="m-6 mb-2 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 text-xs text-red-900">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-red-950 mb-0.5">
                {bilingualMode ? 'জরুরি সতর্কবার্তা:' : 'Critical Emergency Triage Warning:'}
              </p>
              <p className="leading-relaxed">
                {bilingualMode && selectedGuide.severityWarningBn ? selectedGuide.severityWarningBn : selectedGuide.severityWarning}
              </p>
            </div>
          </div>
        )}

        {/* Immediate Safety Instructions */}
        <div className="p-6 space-y-4">
          <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-2">
            <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              {bilingualMode ? 'অবিলম্বে নিরাপত্তা নিশ্চিতকরণ নির্দেশাবলী' : 'Immediate Scene Safety Instructions'}
            </h4>
            <ul className="space-y-1.5 text-xs text-blue-950">
              {currentImmediateSafety.map((instruction, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <span>{instruction}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section Tabs: Steps vs DOs/DONTs vs Emergency */}
          <div className="border-b border-slate-200">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab('steps')}
                className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition ${
                  activeTab === 'steps'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {bilingualMode
                  ? `ধাপ অনুসারে করণীয় (${selectedGuide.steps.length}টি ধাপ)`
                  : `Step-by-Step Action (${selectedGuide.steps.length} Steps)`}
              </button>
              <button
                onClick={() => setActiveTab('dos_donts')}
                className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition ${
                  activeTab === 'dos_donts'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {bilingualMode ? 'কী করবেন ও কী করবেন না' : "DOs & DON'Ts Protocol"}
              </button>
              <button
                onClick={() => setActiveTab('emergency')}
                className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition ${
                  activeTab === 'emergency'
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {bilingualMode ? 'কখন জরুরি বিভাগে যাবেন' : 'When to Seek Emergency ER'}
              </button>
            </div>
          </div>

          {/* Tab 1: Step-by-Step Action */}
          {activeTab === 'steps' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {selectedGuide.steps.map((step) => {
                const stepTitle = bilingualMode && step.titleBn ? step.titleBn : step.title;
                const stepInstruction = bilingualMode && step.instructionBn ? step.instructionBn : step.instruction;
                return (
                  <div
                    key={step.stepNumber}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2 relative hover:bg-slate-100/60 transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                        {step.stepNumber}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">{stepTitle}</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pl-9.5">
                      {stepInstruction}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab 2: DOs & DONTs side-by-side */}
          {activeTab === 'dos_donts' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Green DOs */}
              <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-3">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>{bilingualMode ? 'অবশ্যই যা করবেন (উপকারী):' : 'DO Follow These Guidelines:'}</span>
                </div>
                <ul className="space-y-2 text-xs text-emerald-950">
                  {currentDos.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-bold text-emerald-600 shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Red DONTs */}
              <div className="p-5 rounded-2xl bg-rose-50/80 border border-rose-200 space-y-3">
                <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
                  <XCircle className="w-5 h-5 text-rose-600" />
                  <span>{bilingualMode ? 'কখনোই যা করবেন না (ক্ষতিকর):' : 'DO NOT Do These Harmful Practices:'}</span>
                </div>
                <ul className="space-y-2 text-xs text-rose-950">
                  {currentDonts.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-bold text-rose-600 shrink-0">✕</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tab 3: When to Seek Emergency */}
          {activeTab === 'emergency' && (
            <div className="p-5 rounded-2xl bg-red-50 border border-red-200 space-y-3 pt-4">
              <div className="flex items-center gap-2 text-red-900 font-bold text-sm">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span>
                  {bilingualMode
                    ? 'অবিলম্বে জরুরি হাসপাতালে যাবেন বা ৯৯৯ কল করবেন যদি:'
                    : 'Seek Immediate Emergency Care / Call 999 If:'}
                </span>
              </div>
              <ul className="space-y-2 text-xs text-red-950">
                {currentWhenToSeek.map((warning, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-600 mt-1 shrink-0" />
                    <span>{warning}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-3">
                <a
                  href="tel:999"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-6 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
                >
                  <PhoneCall className="w-4 h-4" />
                  {bilingualMode ? 'জাতীয় জরুরি সেবা ৯৯৯ এ কল দিন' : 'Dial Bangladesh National Emergency 999'}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
