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
  History,
  PhoneCall,
  ArrowRight,
  Heart,
  AlertTriangle,
  Clock,
  Ticket,
  Calendar,
  Building2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useHealth } from '../../context/HealthContext';

const QUICK_CARDS = [
  {
    title: 'AI Symptom Checker',
    desc: 'Describe symptoms & get specialty triage guidance',
    icon: Stethoscope,
    link: '/dashboard/symptom-checker',
    color: 'bg-blue-50 text-blue-600 border-blue-200 hover:border-blue-400',
    btnColor: 'text-blue-600'
  },
  {
    title: 'Find Khulna Specialists',
    desc: 'BMDC verified doctors & hospitals in Khulna',
    icon: MapPin,
    link: '/dashboard/find-doctors',
    color: 'bg-teal-50 text-teal-700 border-teal-200 hover:border-teal-400',
    btnColor: 'text-teal-700'
  },
  {
    title: 'First Aid Assistant',
    desc: 'Emergency steps for burns, cuts, choking, syncope',
    icon: LifeBuoy,
    link: '/dashboard/first-aid',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:border-emerald-400',
    btnColor: 'text-emerald-700'
  },
  {
    title: 'Medical Report OCR',
    desc: 'Extract lab values (CBC, Lipid, LFT) & detect risks',
    icon: FileText,
    link: '/dashboard/report-analyzer',
    color: 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:border-indigo-400',
    btnColor: 'text-indigo-700'
  },
  {
    title: 'Emergency Ambulances',
    desc: '24/7 ICU ambulances & Khulna ER direct dial',
    icon: AlertCircle,
    link: '/dashboard/emergency',
    color: 'bg-red-50 text-red-600 border-red-200 hover:border-red-400',
    btnColor: 'text-red-600'
  },
  {
    title: 'Medicine Information',
    desc: 'Verify generics, side effects & drug interactions',
    icon: Pill,
    link: '/dashboard/medicine-checker',
    color: 'bg-amber-50 text-amber-700 border-amber-200 hover:border-amber-400',
    btnColor: 'text-amber-700'
  }
];

export const DashboardOverview: React.FC = () => {
  const { user } = useAuth();
  const { currentBmi, currentBmiCategory, bmiLogs, activities, appointments, bilingualMode } = useHealth();

  const getBmiBadgeColor = (category: string) => {
    switch (category) {
      case 'Normal weight':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Overweight':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Obesity':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const activeApt = appointments.find((a) => a.status === 'Confirmed');

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-teal-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-semibold text-blue-50">
              <Heart className="w-3.5 h-3.5 fill-red-400 text-red-400" />
              <span>Personalized Healthcare Companion</span>
              {bilingualMode && <span>| ব্যক্তিগত স্বাস্থ্য পোর্টাল</span>}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {user?.name || 'Rahim Ahmed'}!
            </h2>
            <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
              Your patient profile is active with Blood Group <strong className="text-white">{user?.bloodGroup || 'B+'}</strong> in <strong className="text-white">Khulna, Bangladesh</strong>. How can MedNex assist your well-being today?
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/dashboard/symptom-checker"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-blue-700 rounded-xl text-xs sm:text-sm font-bold shadow-md hover:bg-blue-50 transition"
            >
              <Stethoscope className="w-4 h-4" />
              Check Symptoms
            </Link>
            <a
              href="tel:999"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition"
            >
              <PhoneCall className="w-4 h-4" />
              Emergency 999
            </a>
          </div>
        </div>

        <div className="absolute -right-10 -bottom-10 w-60 h-60 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      </div>

      {/* Active Chamber Serial Alert if Booked */}
      {activeApt && (
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600 text-white rounded-xl">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-950">
                  Upcoming Chamber Serial #{activeApt.serialNumber}: {activeApt.doctorName}
                </span>
                <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded">
                  Confirmed
                </span>
              </div>
              <p className="text-xs text-indigo-800">
                {activeApt.hospitalOrChamber} • Date: <strong>{activeApt.date}</strong> at <strong>{activeApt.timeSlot}</strong>
              </p>
            </div>
          </div>

          <Link
            to="/dashboard/find-doctors"
            className="text-xs font-bold text-indigo-700 hover:text-indigo-900 bg-white px-3.5 py-2 rounded-xl border border-indigo-200 shadow-xs flex items-center gap-1 self-start sm:self-auto shrink-0"
          >
            View Ticket <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Quick Health Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: BMI */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Current BMI</span>
            <Activity className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">{currentBmi}</span>
            <span className="text-xs text-slate-400">kg/m²</span>
          </div>
          <span className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-md border ${getBmiBadgeColor(currentBmiCategory)}`}>
            {currentBmiCategory}
          </span>
        </div>

        {/* Stat 2: Active Region */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Local Area</span>
            <MapPin className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 truncate">
            {user?.city || 'Khulna'}
          </div>
          <p className="text-[11px] text-teal-700 font-medium">6 Verified Hospitals Nearby</p>
        </div>

        {/* Stat 3: Emergency Dispatch */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Emergency SOS</span>
            <AlertCircle className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-red-600">
            999 Ready
          </div>
          <p className="text-[11px] text-slate-500">Khulna Ambulance Pool Active</p>
        </div>

        {/* Stat 4: Health Activities */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Logged Records</span>
            <History className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {activities.length + bmiLogs.length}
          </div>
          <p className="text-[11px] text-slate-500">Timeline up to date</p>
        </div>
      </div>

      {/* Main 2-Column Section: BMI Overview & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: BMI Health Overview & Quick Emergency banner */}
        <div className="lg:col-span-5 space-y-6">
          {/* BMI Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-sm">BMI & Weight Trajectory</h3>
              </div>
              <Link
                to="/dashboard/fitness-tracker"
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                Track Details →
              </Link>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">Latest Recorded Weight</p>
                <p className="text-lg font-black text-slate-900">
                  {bmiLogs.length > 0 ? `${bmiLogs[0].weightKg} kg` : '73.2 kg'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500">Target Range</p>
                <p className="text-xs font-bold text-green-700">65 - 74 kg (Healthy)</p>
              </div>
            </div>

            {/* Visual Gauge representation */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-semibold text-slate-500">
                <span>Underweight (&lt;18.5)</span>
                <span className="text-green-700">Normal (18.5-24.9)</span>
                <span>Overweight (25-29.9)</span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                <div className="w-[20%] bg-blue-300" title="Underweight" />
                <div className="w-[35%] bg-green-500" title="Normal" />
                <div className="w-[25%] bg-amber-400" title="Overweight" />
                <div className="w-[20%] bg-red-400" title="Obese" />
              </div>
              <p className="text-[11px] text-slate-500 pt-1">
                Your BMI of <strong>{currentBmi}</strong> is safely within the adult normal range.
              </p>
            </div>
          </div>

          {/* Emergency Card Shortcut */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-red-700 font-bold text-sm">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span>Khulna Emergency Quick-Dial</span>
            </div>
            <p className="text-xs text-red-800 leading-relaxed">
              In acute life-threatening situations (sudden chest pain, unresponsiveness, severe bleeding), bypass normal app workflows and dial directly.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href="tel:999"
                className="flex items-center justify-center gap-2 py-2 px-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-xs transition"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                Dial 999 Hotline
              </a>
              <Link
                to="/dashboard/emergency"
                className="flex items-center justify-center gap-1.5 py-2 px-3 bg-white border border-red-300 text-red-700 hover:bg-red-50 rounded-xl text-xs font-bold transition"
              >
                View Ambulances
              </Link>
            </div>
          </div>
        </div>

        {/* Right Col: Recent Health Activities */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-sm">Recent Health Activities</h3>
              </div>
              <Link
                to="/dashboard/health-history"
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                View Full Timeline ({activities.length}) →
              </Link>
            </div>

            <div className="space-y-3">
              {activities.slice(0, 4).map((act) => (
                <div
                  key={act.id}
                  className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100/70 border border-slate-200/60 transition flex items-start justify-between gap-3"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-slate-900 truncate">
                        {act.title}
                      </span>
                      {act.tag && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                          {act.tag}
                        </span>
                      )}
                      {act.severity === 'emergency' && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                          Emergency Alert
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-snug line-clamp-2">
                      {act.summary}
                    </p>
                  </div>
                  <span className="text-[10px] font-medium text-slate-400 shrink-0">
                    {act.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs text-slate-500">
            <span>Patient records stored securely locally</span>
            <Link to="/dashboard/health-history" className="font-semibold text-blue-600 hover:underline">
              Download Health Summary
            </Link>
          </div>
        </div>
      </div>

      {/* Quick-Access Feature Cards (7 primary services) */}
      <div className="space-y-3 pt-2">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
          Explore MedNex Healthcare Services
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {QUICK_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.link}
                to={card.link}
                className={`p-5 rounded-2xl border transition shadow-xs hover:shadow-md flex flex-col justify-between ${card.color}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-xs flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base mb-1">{card.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{card.desc}</p>
                </div>
                <div className={`text-xs font-bold flex items-center gap-1 ${card.btnColor}`}>
                  Launch Feature <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
