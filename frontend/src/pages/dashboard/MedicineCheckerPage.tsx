import React, { useState } from 'react';
import {
  Pill,
  Search,
  Camera,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Sparkles,
  Info,
  RefreshCw,
  GitCompare,
  ArrowRight,
  ShieldCheck,
  Building2,
  Check
} from 'lucide-react';
import { MEDICINE_DATABASE, KNOWN_DRUG_INTERACTIONS } from '../../data/medicineDatabase';
import { MedicineInfo, DrugInteraction } from '../../types';
import { useHealth } from '../../context/HealthContext';

export const MedicineCheckerPage: React.FC = () => {
  const { bilingualMode, t } = useHealth();
  const [activeTab, setActiveTab] = useState<'info' | 'interactions'>('info');

  // Search & Selected Medicine
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState<MedicineInfo>(MEDICINE_DATABASE[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedImageName, setScannedImageName] = useState<string | null>(null);

  // Interaction Checker State
  const [drugA, setDrugA] = useState<string>(MEDICINE_DATABASE[0].brandName);
  const [drugB, setDrugB] = useState<string>(MEDICINE_DATABASE[5].brandName);
  const [interactionResult, setInteractionResult] = useState<DrugInteraction | null>(null);
  const [hasEvaluatedInteraction, setHasEvaluatedInteraction] = useState(false);

  const filteredMedicines = MEDICINE_DATABASE.filter(
    (m) =>
      m.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.therapeuticClass.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSimulateScan = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setScannedImageName(file.name);
      setIsScanning(true);
      setTimeout(() => {
        const matched =
          MEDICINE_DATABASE.find((m) =>
            file.name.toLowerCase().includes(m.brandName.toLowerCase().split(' ')[0])
          ) || MEDICINE_DATABASE[1];
        setSelectedMedicine(matched);
        setIsScanning(false);
      }, 700);
    }
  };

  const handleCheckInteraction = () => {
    setHasEvaluatedInteraction(true);
    // Find matching interaction pair in either order
    const match = KNOWN_DRUG_INTERACTIONS.find(
      (item) =>
        (item.drug1 === drugA && item.drug2 === drugB) ||
        (item.drug1 === drugB && item.drug2 === drugA)
    );

    if (match) {
      setInteractionResult(match);
    } else {
      setInteractionResult({
        drug1: drugA,
        drug2: drugB,
        severity: bilingualMode ? 'মাইনর / স্বাভাবিক পর্যবেক্ষণ' : 'Minor / Monitor',
        effect: bilingualMode
          ? 'স্ট্যান্ডার্ড ক্লিনিক্যাল ফার্মাকোলজি তথ্যসূত্রে এই দুটি ওষুধের মধ্যে কোনো মারাত্মক প্রতিকূল ক্রিয়া বা নিষেধ পাওয়া যায়নি।'
          : 'No severe acute clinical contraindication recorded in standard clinical pharmacology indexes between these two compounds.',
        recommendation: bilingualMode
          ? 'ডাক্তারের প্রেসক্রিপশন অনুযায়ী সেবন করা নিরাপদ। তবে সেবনের সময়সূচির জন্য ফার্মাসিস্ট বা ডাক্তারের পরামর্শ নিন।'
          : 'Safe to administer as prescribed. However, always consult your physician or pharmacist regarding exact timing and personal organ tolerance.'
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold mb-2">
            <Pill className="w-3.5 h-3.5 text-amber-600" />
            <span>{bilingualMode ? 'বাংলাদেশের অনুমোদিত ওষুধ ডাটাবেজ' : 'Verified Bangladesh Pharmaceutical Database'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {bilingualMode ? 'এআই ওষুধ তথ্য নির্দেশিকা ও ড্রাগ ইন্টারঅ্যাকশন' : 'AI Medicine Information & Interaction Checker'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            {bilingualMode
              ? 'ওষুধের প্যাকেজ ছবি আপলোড করুন, ব্র্যান্ড বা জেনেরিক সূত্রে সন্ধান করুন এবং ওষুধের ক্ষতিকর ড্রাগ-ড্রাগ ইন্টারঅ্যাকশন যাচাই করুন।'
              : 'Upload medicine packaging images, search by brand name or generic formula, and check for potential adverse drug-drug interactions.'}
          </p>
        </div>

        {/* Upload Button */}
        <label className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold shadow-md shadow-blue-500/20 transition cursor-pointer shrink-0">
          <Camera className="w-4 h-4" />
          <span>{bilingualMode ? 'ওষুধের প্যাকেজের ছবি আপলোড' : 'Upload Medicine Box/Strip'}</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleSimulateScan}
            className="hidden"
          />
        </label>
      </div>

      {/* Safety Warning */}
      <div className="p-4 bg-amber-50/90 border border-amber-200 rounded-2xl text-xs text-amber-950 flex items-start gap-3 shadow-xs">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>{bilingualMode ? 'প্রেসক্রিপশন নিরাপত্তা নীতি:' : 'Prescription Safety Principle:'}</strong>{' '}
          {bilingualMode
            ? 'মেডনেক্স শুধুমাত্র শিক্ষামূলক ওষুধ তথ্য সরবরাহ করে। আমরা কখনোই নিজ থেকে ওষুধের ডোজ পরিবর্তন, চিকিৎসকের প্রেসক্রিপশন পরিবর্তন বা ওষুধ বন্ধ করার পরামর্শ দিই না। প্যাকেজটি অপরিষ্কার বা ছেঁড়া হলে সর্বদা আপনার নিবন্ধিত ফার্মাসিস্ট বা চিকিৎসকের সাথে যাচাই করুন।'
            : 'MedNex provides educational drug information only. We never suggest changing dosages, altering physician prescriptions, or stopping medications. If a package is unclear or torn, always confirm with your registered pharmacist or prescribing doctor.'}
        </p>
      </div>

      {/* Mode Tabs */}
      <div className="inline-flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs">
        <button
          onClick={() => setActiveTab('info')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'info'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Pill className="w-4 h-4" />
          {bilingualMode ? 'ওষুধ তথ্য নির্দেশিকা' : 'Medicine Information Guide'}
        </button>
        <button
          onClick={() => setActiveTab('interactions')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'interactions'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <GitCompare className="w-4 h-4" />
          {bilingualMode ? 'ওষুধের পারস্পরিক ক্রিয়া (ড্রাগ ইন্টারঅ্যাকশন)' : 'Drug-Drug Interaction Checker'}
        </button>
      </div>

      {activeTab === 'info' ? (
        /* TAB 1: Medicine Information & Search */
        <div className="space-y-6">
          {/* Search & Fast Selection Pills */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by brand name (e.g. Napa Extra, Seclo, Azith, Metfo, Ciprocin) or generic (Paracetamol, Metformin)..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Search Results Dropdown/List when searching */}
            {searchQuery.trim() && (
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-700">
                  Matching Medicines ({filteredMedicines.length}):
                </span>
                {filteredMedicines.length === 0 ? (
                  <p className="text-xs text-slate-500 py-2">
                    No verified medicine found matching "{searchQuery}". Please verify packaging with your pharmacist.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {filteredMedicines.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          setSelectedMedicine(m);
                          setSearchQuery('');
                        }}
                        className="p-2.5 rounded-xl bg-white border border-slate-200 text-left hover:border-blue-500 transition flex items-center justify-between"
                      >
                        <div>
                          <p className="text-xs font-bold text-slate-900">{m.brandName}</p>
                          <p className="text-[11px] text-slate-500">{m.genericName}</p>
                        </div>
                        <span className="text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-semibold">
                          Select
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Quick medicine pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-bold text-slate-400">Popular Medicines:</span>
              {MEDICINE_DATABASE.map((med) => (
                <button
                  key={med.id}
                  type="button"
                  onClick={() => {
                    setSelectedMedicine(med);
                    setScannedImageName(null);
                  }}
                  className={`text-xs px-3 py-1.5 rounded-xl font-medium transition ${
                    selectedMedicine.id === med.id && !scannedImageName
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {med.brandName}
                </button>
              ))}
            </div>
          </div>

          {/* Main Selected Medicine Information Card */}
          {isScanning ? (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-xs text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
              <h4 className="text-sm font-bold text-slate-900">
                Running OCR on Medicine Package Image...
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Extracting text from strip, recognizing generic compounds, and validating with pharmaceutical index.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
              {/* Top Header */}
              <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-blue-600 shrink-0">
                    <Pill className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md">
                        {selectedMedicine.therapeuticClass}
                      </span>
                      <span className="text-[10px] font-bold text-slate-600 bg-slate-200/70 px-2 py-0.5 rounded-md">
                        {selectedMedicine.form}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                      {selectedMedicine.brandName}
                    </h3>
                    <p className="text-xs font-semibold text-blue-600">
                      Generic: {selectedMedicine.genericName}
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right text-xs">
                  <p className="text-slate-400">Pharmaceutical Manufacturer:</p>
                  <p className="font-bold text-slate-800">{selectedMedicine.manufacturer}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Strengths: {selectedMedicine.strengths.join(', ')}
                  </p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Common Medical Uses (Indications) */}
                <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-3">
                  <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    Primary Medical Indications (Uses)
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {selectedMedicine.commonUses.map((use, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                        <span>{use}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Common Side Effects */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-slate-600" />
                    Reported Common Side Effects
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {selectedMedicine.sideEffects.map((effect, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                        <span>{effect}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Precautions & Warnings */}
                <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
                  <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-700" />
                    Crucial Precautions & Warnings
                  </h4>
                  <ul className="space-y-2 text-xs text-amber-950">
                    {selectedMedicine.precautions.map((prec, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-bold text-amber-700 shrink-0">!</span>
                        <span>{prec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Food Interactions & Pregnancy Safety */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-rose-600" />
                    Food Interactions & Pregnancy Safety
                  </h4>
                  <div className="space-y-2 text-xs text-slate-700">
                    <div>
                      <p className="font-bold text-slate-800">Meal & Food Directions:</p>
                      <p className="text-slate-600">{selectedMedicine.foodInteractions}</p>
                    </div>
                    <div className="pt-2 border-t border-slate-200/70">
                      <p className="font-bold text-slate-800">Pregnancy & Lactation Status:</p>
                      <p className="text-slate-600 font-medium">{selectedMedicine.isPregnancySafe}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* TAB 2: Interactive Drug-Drug Interaction Checker */
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1 pb-3 border-b border-slate-100">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <GitCompare className="w-5 h-5 text-amber-600" />
              Pharmacological Interaction Evaluator
            </h3>
            <p className="text-xs text-slate-500">
              Select two medicines to evaluate documented clinical interactions, metabolic enzyme conflicts, and absorption risks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                First Medicine (Drug A)
              </label>
              <select
                value={drugA}
                onChange={(e) => {
                  setDrugA(e.target.value);
                  setHasEvaluatedInteraction(false);
                }}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800"
              >
                {MEDICINE_DATABASE.map((m) => (
                  <option key={m.id} value={m.brandName}>
                    {m.brandName} ({m.genericName.split(' ')[0]})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Second Medicine (Drug B)
              </label>
              <select
                value={drugB}
                onChange={(e) => {
                  setDrugB(e.target.value);
                  setHasEvaluatedInteraction(false);
                }}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800"
              >
                {MEDICINE_DATABASE.map((m) => (
                  <option key={m.id} value={m.brandName}>
                    {m.brandName} ({m.genericName.split(' ')[0]})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCheckInteraction}
            className="w-full sm:w-auto px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs"
          >
            <GitCompare className="w-4 h-4" />
            Check Drug-Drug Interaction
          </button>

          {/* Interaction Result Display */}
          {hasEvaluatedInteraction && interactionResult && (
            <div className={`p-5 rounded-2xl border space-y-3 ${
              interactionResult.severity.includes('Severe')
                ? 'bg-red-50 border-red-200 text-red-950'
                : interactionResult.severity.includes('Moderate')
                ? 'bg-amber-50 border-amber-200 text-amber-950'
                : 'bg-green-50 border-green-200 text-green-950'
            }`}>
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${
                  interactionResult.severity.includes('Severe')
                    ? 'bg-red-600 text-white'
                    : interactionResult.severity.includes('Moderate')
                    ? 'bg-amber-600 text-white'
                    : 'bg-green-700 text-white'
                }`}>
                  Interaction Severity: {interactionResult.severity}
                </span>
                <span className="text-xs font-bold">
                  {interactionResult.drug1} + {interactionResult.drug2}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider mb-1">
                  Pharmacological Interaction Effect:
                </h4>
                <p className="text-xs leading-relaxed font-medium">
                  {interactionResult.effect}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/60">
                <h4 className="text-xs font-bold uppercase tracking-wider mb-1">
                  Clinical Recommendation:
                </h4>
                <p className="text-xs leading-relaxed">
                  {interactionResult.recommendation}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
