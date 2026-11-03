import React, { useState } from 'react';
import {
  PhoneCall,
  AlertCircle,
  MapPin,
  Clock,
  Building2,
  Activity,
  AlertTriangle,
  ExternalLink,
  Send,
  X,
  Check,
  Copy,
  SlidersHorizontal,
  Compass
} from 'lucide-react';
import { KHULNA_AMBULANCES, KHULNA_HOSPITALS, KHULNA_AREAS } from '../../data/khulnaMedicalData';
import { AmbulanceProvider, Hospital } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useHealth } from '../../context/HealthContext';

export const EmergencyAmbulancePage: React.FC = () => {
  const { user } = useAuth();
  const { bilingualMode } = useHealth();

  const [filterType, setFilterType] = useState<'All' | 'ICU / AC' | 'Standard Non-AC'>('All');
  const [userArea, setUserArea] = useState<string>('Sonadanga');

  // Dispatch Request Modal State
  const [selectedAmbulanceForDispatch, setSelectedAmbulanceForDispatch] = useState<AmbulanceProvider | null>(null);
  const [needOxygen, setNeedOxygen] = useState(true);
  const [needICU, setNeedICU] = useState(false);
  const [needStretcher, setNeedStretcher] = useState(true);
  const [patientNote, setPatientNote] = useState('Severe difficulty breathing, conscious elderly patient');
  const [copiedSMS, setCopiedSMS] = useState(false);

  const filteredAmbulances = KHULNA_AMBULANCES.filter(
    (amb) => filterType === 'All' || amb.type === filterType
  );

  const getGoogleMapsDirectionsUrl = (address: string, name: string) => {
    const query = encodeURIComponent(`${name}, ${address}, Khulna, Bangladesh`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  // Distance estimation based on user selected area
  const getEstimatedDistance = (baseLocation: string) => {
    if (baseLocation.toLowerCase().includes(userArea.toLowerCase())) {
      return { dist: '0.8 - 1.5 km', time: '5 - 8 mins' };
    }
    return { dist: '3.0 - 5.5 km', time: '12 - 18 mins' };
  };

  const generateDispatchSMS = (amb: AmbulanceProvider) => {
    return `[EMERGENCY AMBULANCE DISPATCH REQUEST]
Patient: ${user?.name || 'Rahim Ahmed'}
Location: ${userArea}, Khulna
Contact Phone: ${user?.phone || '+880 1712 345678'}
Required Facilities: ${needOxygen ? 'Oxygen [YES], ' : ''}${needICU ? 'ICU Ventilator [YES], ' : ''}${needStretcher ? 'Stretcher [YES]' : ''}
Condition Note: ${patientNote}`;
  };

  const handleCopySMS = (amb: AmbulanceProvider) => {
    navigator.clipboard.writeText(generateDispatchSMS(amb));
    setCopiedSMS(true);
    setTimeout(() => setCopiedSMS(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Prominent Emergency 999 Hero Section */}
      <div className="bg-gradient-to-r from-red-700 via-red-600 to-rose-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold text-red-100">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
              <span>National Emergency Hotline (Bangladesh)</span>
              {bilingualMode && <span>| বাংলাদেশ জাতীয় জরুরি সেবা ৯৯৯</span>}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Emergency Assistance & 24/7 Ambulance
            </h2>
            <p className="text-red-100 text-xs sm:text-sm leading-relaxed">
              In severe medical trauma, cardiac arrest, or obstetric emergencies, dial <strong>999</strong> immediately for government dispatch, or contact verified Khulna ambulance providers below.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="tel:999"
              className="w-full sm:w-auto px-8 py-4 bg-white text-red-600 hover:bg-red-50 rounded-2xl text-base font-black shadow-xl transition flex items-center justify-center gap-3 emergency-pulse"
            >
              <PhoneCall className="w-6 h-6 stroke-[3]" />
              DIAL 999 NOW
            </a>
          </div>
        </div>

        <div className="absolute -right-8 -bottom-8 w-56 h-56 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      </div>

      {/* Mandatory Real-Time Integration Limitation Notice */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-950 flex items-start gap-3 shadow-xs">
        <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-amber-900 mb-0.5">Important Dispatch Notice:</p>
          <p className="leading-relaxed text-amber-800">
            MedNex connects you with verified ambulance contact numbers and hospital ERs. We do not automatically dispatch an ambulance vehicle electronically; you must speak directly with the dispatcher via phone call. Real-time GPS availability is subject to live operator confirmation.
          </p>
        </div>
      </div>

      {/* Filter and Location Selector Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* User Current Neighborhood in Khulna */}
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-teal-600" />
          <span className="text-xs font-bold text-slate-700">Pickup Area in Khulna:</span>
          <select
            value={userArea}
            onChange={(e) => setUserArea(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-blue-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          >
            {KHULNA_AREAS.filter((a) => a !== 'All Areas').map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>

        {/* Filter Ambulances */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700">Vehicle Type:</span>
          <div className="inline-flex bg-slate-100 p-1 rounded-xl">
            {(['All', 'ICU / AC', 'Standard Non-AC'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  filterType === type
                    ? 'bg-white text-red-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ambulance Providers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAmbulances.map((amb) => {
          const est = getEstimatedDistance(amb.baseLocation);
          return (
            <div
              key={amb.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      amb.type === 'ICU / AC'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {amb.type}
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 mt-1">
                      {amb.name}
                    </h3>
                    <p className="text-xs text-slate-500">{amb.provider}</p>
                  </div>

                  <div className="p-2 bg-red-50 text-red-600 rounded-xl shrink-0">
                    <Activity className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-2 my-3 text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>Base: {amb.baseLocation}</span>
                    </div>
                    <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                      ~{est.dist}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Est. Arrival: <strong className="text-slate-900">{est.time}</strong></span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[11px]">
                    <span>Oxygen: {amb.oxygenEquipped ? 'Equipped ✓' : 'Basic'}</span>
                    <span>Fee: {amb.baseChargeBDT === 0 ? 'Free (Govt)' : `From ৳${amb.baseChargeBDT}`}</span>
                  </div>
                </div>
              </div>

              {/* Calling and Dispatch buttons */}
              <div className="space-y-2">
                <a
                  href={`tel:${amb.phone}`}
                  className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2 shadow-xs transition"
                >
                  <PhoneCall className="w-4 h-4" />
                  Call Hotline: {amb.phone}
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedAmbulanceForDispatch(amb)}
                  className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  <Send className="w-3.5 h-3.5 text-blue-600" />
                  Request Dispatch Info (SMS / Slip)
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hospital Emergency Rooms Directory (Khulna) */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-red-600" />
              Khulna 24/7 Hospital Emergency Departments (ER)
            </h3>
            <p className="text-xs text-slate-500">
              Immediate admission, trauma care, and ICU facilities
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {KHULNA_HOSPITALS.map((hosp) => (
            <div
              key={hosp.id}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">{hosp.name}</span>
                  <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded">
                    {hosp.area}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">{hosp.address}</p>
                <p className="text-xs font-bold text-red-600">ER Hotline: {hosp.emergencyPhone}</p>
              </div>

              <div className="flex flex-col gap-2 shrink-0">
                <a
                  href={`tel:${hosp.emergencyPhone}`}
                  className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-center text-xs font-bold"
                  title="Call ER"
                >
                  <PhoneCall className="w-4 h-4" />
                </a>
                <a
                  href={getGoogleMapsDirectionsUrl(hosp.address, hosp.name)}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 text-center"
                  title="Directions"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Dispatch Request Modal */}
      {selectedAmbulanceForDispatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 border border-slate-200 shadow-2xl relative">
            <button
              onClick={() => setSelectedAmbulanceForDispatch(null)}
              className="absolute right-5 top-5 p-1 text-slate-400 hover:text-slate-700 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded">
                Dispatcher Request Preparation
              </span>
              <h3 className="text-base font-extrabold text-slate-900 mt-1">
                {selectedAmbulanceForDispatch.name}
              </h3>
              <p className="text-xs text-slate-500">{selectedAmbulanceForDispatch.provider}</p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Pickup Location in Khulna</label>
                <input
                  type="text"
                  value={`${userArea}, Khulna`}
                  readOnly
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Emergency Life Support Required</label>
                <div className="flex gap-2 flex-wrap">
                  <label className="flex items-center gap-1.5 p-2 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={needOxygen}
                      onChange={(e) => setNeedOxygen(e.target.checked)}
                      className="accent-red-600"
                    />
                    <span>Oxygen Cylinder</span>
                  </label>
                  <label className="flex items-center gap-1.5 p-2 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={needICU}
                      onChange={(e) => setNeedICU(e.target.checked)}
                      className="accent-red-600"
                    />
                    <span>ICU Ventilator</span>
                  </label>
                  <label className="flex items-center gap-1.5 p-2 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={needStretcher}
                      onChange={(e) => setNeedStretcher(e.target.checked)}
                      className="accent-red-600"
                    />
                    <span>Wheelchair / Stretcher</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Brief Patient Condition</label>
                <input
                  type="text"
                  value={patientNote}
                  onChange={(e) => setPatientNote(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                />
              </div>

              {/* Formatted Message Preview */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 font-mono text-[11px] text-slate-700 space-y-1">
                <div className="flex justify-between items-center text-[10px] font-sans font-bold text-slate-400">
                  <span>DISPATCH SMS SUMMARY</span>
                  <button
                    type="button"
                    onClick={() => handleCopySMS(selectedAmbulanceForDispatch)}
                    className="text-blue-600 flex items-center gap-1 font-semibold"
                  >
                    {copiedSMS ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                    {copiedSMS ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <p className="whitespace-pre-line text-slate-800">
                  {generateDispatchSMS(selectedAmbulanceForDispatch)}
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-2">
              <a
                href={`tel:${selectedAmbulanceForDispatch.phone}`}
                className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2 shadow-xs transition"
              >
                <PhoneCall className="w-4 h-4" />
                Call Dispatch Now ({selectedAmbulanceForDispatch.phone})
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
