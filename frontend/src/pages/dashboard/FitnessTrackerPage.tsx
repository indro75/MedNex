import React, { useState } from 'react';
import {
  Activity,
  Plus,
  Scale,
  TrendingDown,
  Sparkles,
  Heart,
  Droplet,
  Moon,
  Info,
  Flame,
  ArrowRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { useHealth } from '../../context/HealthContext';
import { useAuth } from '../../context/AuthContext';

export const FitnessTrackerPage: React.FC = () => {
  const { user } = useAuth();
  const { bmiLogs, addBmiLog, bilingualMode, language, t } = useHealth();

  // Unit System: 'metric' (cm, kg) vs 'regional' (feet/inches, kg)
  const [unitMode, setUnitMode] = useState<'metric' | 'regional'>('metric');

  // Metric State
  const [weightKg, setWeightKg] = useState<number>(73.2);
  const [heightCm, setHeightCm] = useState<number>(172);

  // Regional Feet / Inches State
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(8);

  const [age, setAge] = useState<number>(user?.age || 38);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activityLevel, setActivityLevel] = useState<string>('moderate');
  const [notes, setNotes] = useState<string>('');
  const [logModalOpen, setLogModalOpen] = useState(false);

  // Sync feet/inches to cm when switched
  const handleFeetInchesChange = (feet: number, inches: number) => {
    setHeightFeet(feet);
    setHeightInches(inches);
    const totalInches = feet * 12 + inches;
    const cm = Math.round(totalInches * 2.54);
    setHeightCm(cm);
  };

  // Live BMI calculation
  const heightM = heightCm / 100;
  const calculatedBmi = parseFloat((weightKg / (heightM * heightM)).toFixed(1));

  // Minimum & Maximum Healthy Weight Range (BMI 18.5 to 24.9)
  const minHealthyWeight = parseFloat((18.5 * heightM * heightM).toFixed(1));
  const maxHealthyWeight = parseFloat((24.9 * heightM * heightM).toFixed(1));

  // BMR Calculation (Mifflin-St Jeor)
  const bmr = Math.round(
    gender === 'male'
      ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * age - 161
  );

  // TDEE multipliers
  const activityMultipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    very: 1.725
  };
  const tdee = Math.round(bmr * (activityMultipliers[activityLevel] || 1.55));

  const getBmiCategory = (bmi: number) => {
    if (bmi < 18.5) return {
      category: bilingualMode ? 'স্বাভাবিকের চেয়ে কম ওজন' : 'Underweight',
      color: 'text-blue-600',
      bg: 'bg-blue-100',
      barPos: 12
    };
    if (bmi < 25) return {
      category: bilingualMode ? 'আদর্শ ও স্বাস্থ্যকর ওজন' : 'Normal weight',
      color: 'text-green-700',
      bg: 'bg-green-100',
      barPos: 45
    };
    if (bmi < 30) return {
      category: bilingualMode ? 'অতিরিক্ত ওজন' : 'Overweight',
      color: 'text-amber-700',
      bg: 'bg-amber-100',
      barPos: 72
    };
    return {
      category: bilingualMode ? 'স্থূলতা (উচ্চ ঝুঁকি)' : 'Obesity',
      color: 'text-red-700',
      bg: 'bg-red-100',
      barPos: 92
    };
  };

  const handleSaveLog = (e: React.FormEvent) => {
    e.preventDefault();
    addBmiLog(weightKg, heightCm, notes || (bilingualMode ? 'নিয়মিত পরিমাপ' : 'Regular weigh-in'));
    setLogModalOpen(false);
    setNotes('');
  };

  // Recharts data format (chronological order)
  const chartData = [...bmiLogs].reverse().map((item) => ({
    date: item.date,
    weight: item.weightKg,
    bmi: item.bmi
  }));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-2">
            <Activity className="w-3.5 h-3.5" />
            <span>{bilingualMode ? 'হু (WHO) প্রাপ্তবয়স্ক স্বাস্থ্য ও বিএমআই স্কেল' : 'WHO Adult Anthropometric Assessment'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {bilingualMode ? 'দৈনিক ফিটনেস, বিএমআই ও ক্যালোরি ট্র্যাকার' : 'Daily Fitness, BMI & Caloric Metabolic Tracker'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            {bilingualMode
              ? 'আপনার বডি মাস ইনডেক্স (বিএমআই) পর্যবেক্ষণ করুন, সময়ের সাথে ওজন পরিবর্তন ট্র্যাক করুন এবং সুষম জীবনযাত্রার ক্যালোরি চাহিদা জানুন।'
              : 'Monitor your Body Mass Index (BMI), track longitudinal weight progression, calculate resting metabolic rate (BMR/TDEE), and receive tailored lifestyle advice.'}
          </p>
        </div>

        <button
          onClick={() => setLogModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold shadow-md shadow-blue-500/20 transition shrink-0"
        >
          <Plus className="w-4 h-4" />
          {bilingualMode ? 'আজকের ওজন সংরক্ষণ' : "Log Today's Weight"}
        </button>
      </div>

      {/* Adult vs Child Assessment Disclaimer */}
      <div className="p-4 bg-slate-100/80 border border-slate-200 rounded-2xl text-xs text-slate-700 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Important Clinical Distinction:</strong> This module calculates standard <strong>Adult BMI</strong> ($Weight / Height^2$). For children and adolescents aged 2 to 19, BMI must be interpreted using age-and-sex specific percentile growth curves rather than static adult thresholds. Consult a pediatrician for pediatric growth evaluation.
        </p>
      </div>

      {/* Grid: Live Calculator & Gauge vs Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Live Calculator & Metabolic Targets */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-blue-600" />
              Interactive BMI & Metabolic Calculator
            </h3>

            {/* Metric vs Feet/Inches Toggle */}
            <div className="inline-flex bg-slate-100 p-0.5 rounded-xl text-xs">
              <button
                type="button"
                onClick={() => setUnitMode('metric')}
                className={`px-2.5 py-1 rounded-lg font-bold transition ${
                  unitMode === 'metric' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'
                }`}
              >
                cm / kg
              </button>
              <button
                type="button"
                onClick={() => setUnitMode('regional')}
                className={`px-2.5 py-1 rounded-lg font-bold transition ${
                  unitMode === 'regional' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'
                }`}
              >
                ft+in / kg
              </button>
            </div>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {unitMode === 'metric' ? (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Feet</label>
                  <input
                    type="number"
                    min={3}
                    max={7}
                    value={heightFeet}
                    onChange={(e) => handleFeetInchesChange(Number(e.target.value), heightInches)}
                    className="w-full px-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Inches</label>
                  <input
                    type="number"
                    min={0}
                    max={11}
                    value={heightInches}
                    onChange={(e) => handleFeetInchesChange(heightFeet, Number(e.target.value))}
                    className="w-full px-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Activity</label>
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
                className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
              >
                <option value="sedentary">Sedentary</option>
                <option value="light">Light</option>
                <option value="moderate">Moderate</option>
                <option value="very">Very Active</option>
              </select>
            </div>
          </div>

          {/* Result Card with Gauge */}
          <div className="p-5 bg-blue-50/70 border border-blue-200 rounded-2xl text-center space-y-3">
            <span className="text-xs font-semibold text-blue-800">Calculated Body Mass Index</span>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-4xl font-black text-blue-950">{calculatedBmi}</span>
              <span className="text-xs text-blue-700 font-semibold">kg/m²</span>
            </div>
            <span className={`inline-block text-xs font-extrabold px-3 py-1 rounded-full ${getBmiCategory(calculatedBmi).bg} ${getBmiCategory(calculatedBmi).color}`}>
              {getBmiCategory(calculatedBmi).category}
            </span>

            {/* Visual Gauge Bar */}
            <div className="pt-2 space-y-1">
              <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden flex relative">
                <div className="w-[20%] bg-blue-400" title="Underweight" />
                <div className="w-[35%] bg-green-500" title="Normal" />
                <div className="w-[25%] bg-amber-400" title="Overweight" />
                <div className="w-[20%] bg-red-400" title="Obese" />
              </div>
              <div className="flex justify-between text-[9px] text-slate-400 font-medium">
                <span>&lt;18.5</span>
                <span className="text-green-700 font-bold">18.5 - 24.9</span>
                <span>25 - 29.9</span>
                <span>30+</span>
              </div>
            </div>
          </div>

          {/* Target Weight Range & Daily Calories */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Ideal Weight Range</span>
              <p className="text-sm font-black text-slate-900">
                {minHealthyWeight} - {maxHealthyWeight} kg
              </p>
              <p className="text-[10px] text-green-700">For height {heightCm} cm</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <div className="flex items-center gap-1 text-[10px] text-slate-400 uppercase font-bold">
                <Flame className="w-3 h-3 text-amber-500" />
                <span>Daily Calories (TDEE)</span>
              </div>
              <p className="text-sm font-black text-slate-900">
                {tdee} kcal/day
              </p>
              <p className="text-[10px] text-slate-500">BMR: {bmr} kcal</p>
            </div>
          </div>
        </div>

        {/* Right Column: Weight & BMI Progress Chart */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-green-600" />
                  Longitudinal Weight & BMI Progression
                </h3>
                <p className="text-xs text-slate-500">
                  Total change: -5.3 kg since initial baseline weigh-in
                </p>
              </div>
            </div>

            {/* Recharts Line Chart */}
            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis domain={['auto', 'auto']} tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      fontSize: '12px'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="weight"
                    stroke="#2563EB"
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#2563EB' }}
                    activeDot={{ r: 6 }}
                    name="Weight (kg)"
                  />
                  <Line
                    type="monotone"
                    dataKey="bmi"
                    stroke="#0D9488"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    dot={{ r: 3, fill: '#0D9488' }}
                    name="BMI"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Lifestyle and Wellness Recommendations */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-teal-600" />
              Tailored Wellness & Metabolic Suggestions
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 bg-blue-50/60 border border-blue-100 rounded-2xl space-y-1">
                <div className="flex items-center gap-1.5 text-blue-900 font-bold">
                  <Droplet className="w-4 h-4 text-blue-600" />
                  <span>Hydration Target</span>
                </div>
                <p className="text-slate-600 leading-snug">
                  Drink 2.5 to 3.0 Liters of water daily to support renal filtration and healthy metabolic rate.
                </p>
              </div>

              <div className="p-3.5 bg-emerald-50/60 border border-emerald-100 rounded-2xl space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-900 font-bold">
                  <Heart className="w-4 h-4 text-emerald-600" />
                  <span>Cardio Health</span>
                </div>
                <p className="text-slate-600 leading-snug">
                  Aim for 150 minutes of moderate-intensity brisk walking or cycling weekly.
                </p>
              </div>

              <div className="p-3.5 bg-indigo-50/60 border border-indigo-100 rounded-2xl space-y-1">
                <div className="flex items-center gap-1.5 text-indigo-900 font-bold">
                  <Moon className="w-4 h-4 text-indigo-600" />
                  <span>Sleep Recovery</span>
                </div>
                <p className="text-slate-600 leading-snug">
                  7 to 8 hours of restorative sleep regulates cortisol, insulin sensitivity, and appetite hormones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Log Today's Weight Modal */}
      {logModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 border border-slate-200 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900">Log New Body Weight</h3>
            <form onSubmit={handleSaveLog} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Notes (e.g. Morning empty stomach, after run)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Optional log note"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setLogModalOpen(false)}
                  className="px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-xs"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
