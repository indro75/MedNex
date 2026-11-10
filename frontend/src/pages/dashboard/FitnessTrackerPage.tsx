import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  UserCheck
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
  const { bmiLogs, addBmiLog } = useHealth();

  // Unit System: 'metric' (cm, kg) vs 'regional' (feet/inches, kg)
  const [unitMode, setUnitMode] = useState<'metric' | 'regional'>('metric');

  // Input states (blank/neutral or initialized from user's last log if exists)
  const lastLog = bmiLogs.length > 0 ? bmiLogs[0] : null;
  const [weightKg, setWeightKg] = useState<number>(lastLog?.weightKg || 65);
  const [heightCm, setHeightCm] = useState<number>(lastLog?.heightCm || 168);

  // Regional Feet / Inches State
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(6);

  const [age, setAge] = useState<number>(user?.age || 28);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activityLevel, setActivityLevel] = useState<string>('moderate');
  const [notes, setNotes] = useState<string>('');
  const [logModalOpen, setLogModalOpen] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(bmiLogs.length > 0);

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
      category: 'Underweight',
      color: 'text-blue-600',
      bg: 'bg-blue-100',
      tip: 'Your weight is lower than normal. Eating regular healthy meals with protein and healthy fats can help you gain strength.'
    };
    if (bmi < 25) return {
      category: 'Normal healthy weight',
      color: 'text-green-700',
      bg: 'bg-green-100',
      tip: 'Great job! Your weight is in the healthy range for your height. Keep up your healthy eating and daily walking habits.'
    };
    if (bmi < 30) return {
      category: 'Overweight',
      color: 'text-amber-700',
      bg: 'bg-amber-100',
      tip: 'Your weight is slightly above the ideal range. Brisk walking for 30 minutes a day and cutting down on sugar and oily food will help.'
    };
    return {
      category: 'Obesity',
      color: 'text-red-700',
      bg: 'bg-red-100',
      tip: 'Your weight puts extra stress on your heart, joints, and blood sugar. We recommend talking to a doctor or nutritionist for a gentle weight loss plan.'
    };
  };

  const handleSaveLog = (e: React.FormEvent) => {
    e.preventDefault();
    addBmiLog(weightKg, heightCm, notes || 'Regular weigh-in');
    setHasCalculated(true);
    setLogModalOpen(false);
    setNotes('');
  };

  const chartData = [...bmiLogs].reverse().map((item) => ({
    date: item.date,
    weight: item.weightKg,
    bmi: item.bmi
  }));

  const currentCategoryInfo = getBmiCategory(calculatedBmi);

  return (
    <div className="space-y-6">
      {/* Guest Notice if Not Logged In */}
      {!user && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm text-blue-900 shadow-xs">
          <div className="flex items-center gap-2.5">
            <UserCheck className="w-5 h-5 text-blue-600 shrink-0" />
            <span>
              You are using the calculator as a guest. You can calculate your BMI below. To save your records and track progress over time, please{' '}
              <Link to="/login" className="font-bold underline text-blue-700 hover:text-blue-800">
                Log In
              </Link>{' '}
              or{' '}
              <Link to="/signup" className="font-bold underline text-blue-700 hover:text-blue-800">
                Sign Up
              </Link>.
            </span>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-2">
            <Activity className="w-3.5 h-3.5" />
            <span>Healthy Weight & Daily Calorie Helper</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Check Your Healthy Weight & BMI
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Body Mass Index (BMI) compares your weight with your height to see if you are in a healthy range. Enter your numbers below to see your results.
          </p>
        </div>

        <button
          onClick={() => setLogModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold shadow-md shadow-blue-500/20 transition shrink-0"
        >
          <Plus className="w-4 h-4" />
          Save Weight Record
        </button>
      </div>

      {/* Adult Note */}
      <div className="p-4 bg-slate-100/80 border border-slate-200 rounded-2xl text-xs text-slate-700 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Note for Parents:</strong> This calculator is designed for adults (age 18 and older). For children and teenagers under 18, doctors use growth charts to check weight based on exact age and gender.
        </p>
      </div>

      {/* Grid: Calculator & Results vs Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Calculator */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-blue-600" />
              BMI Calculator
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
                feet / kg
              </button>
            </div>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Your Weight (kg)
              </label>
              <input
                type="number"
                step="0.5"
                min="20"
                max="250"
                value={weightKg}
                onChange={(e) => {
                  setWeightKg(Number(e.target.value));
                  setHasCalculated(true);
                }}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {unitMode === 'metric' ? (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Height (cm)
                </label>
                <input
                  type="number"
                  min="80"
                  max="250"
                  value={heightCm}
                  onChange={(e) => {
                    setHeightCm(Number(e.target.value));
                    setHasCalculated(true);
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Feet
                  </label>
                  <input
                    type="number"
                    min={3}
                    max={7}
                    value={heightFeet}
                    onChange={(e) => {
                      handleFeetInchesChange(Number(e.target.value), heightInches);
                      setHasCalculated(true);
                    }}
                    className="w-full px-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Inches
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={11}
                    value={heightInches}
                    onChange={(e) => {
                      handleFeetInchesChange(heightFeet, Number(e.target.value));
                      setHasCalculated(true);
                    }}
                    className="w-full px-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Age
              </label>
              <input
                type="number"
                min="18"
                max="120"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Activity
              </label>
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
                className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
              >
                <option value="sedentary">Sitting</option>
                <option value="light">Light</option>
                <option value="moderate">Moderate</option>
                <option value="very">Active</option>
              </select>
            </div>
          </div>

          {/* Calculated Result Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Calculated BMI</span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${currentCategoryInfo.bg} ${currentCategoryInfo.color}`}>
                {currentCategoryInfo.category}
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">{calculatedBmi}</span>
              <span className="text-xs text-slate-500">kg/m²</span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {currentCategoryInfo.tip}
            </p>

            {/* Target Weight Range */}
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-500">Healthy weight for your height:</span>
              <span className="font-bold text-slate-900">
                {minHealthyWeight} kg to {maxHealthyWeight} kg
              </span>
            </div>

            {/* Daily Calories */}
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-slate-500">Estimated daily calories needed:</span>
              <span className="font-bold text-teal-700">
                ~{tdee} kcal / day
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setLogModalOpen(true)}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition"
          >
            Save This Weigh-in to Records
          </button>
        </div>

        {/* Right Column: History & Tips */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-green-600" />
                  Weight History & Progress
                </h3>
                <p className="text-xs text-slate-500">
                  Track how your weight changes over days and months
                </p>
              </div>
            </div>

            {/* Chart or Clean Empty State */}
            {chartData.length > 0 ? (
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
            ) : (
              <div className="py-12 px-4 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                  <Scale className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">
                  No Saved Weight Records Yet
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  When you save your weigh-ins, a clear progress chart showing your weight changes over time will automatically appear here.
                </p>
                <button
                  type="button"
                  onClick={() => setLogModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Save First Weigh-In
                </button>
              </div>
            )}
          </div>

          {/* Simple Everyday Health Tips */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-teal-600" />
              Easy Daily Habits for Better Health
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 bg-blue-50/60 border border-blue-100 rounded-2xl space-y-1">
                <div className="flex items-center gap-1.5 text-blue-900 font-bold">
                  <Droplet className="w-4 h-4 text-blue-600" />
                  <span>Drink Water</span>
                </div>
                <p className="text-slate-600 leading-snug">
                  Aim for 7 to 8 glasses of clean water every day to keep your kidneys clean and your body fresh.
                </p>
              </div>

              <div className="p-3.5 bg-emerald-50/60 border border-emerald-100 rounded-2xl space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-900 font-bold">
                  <Heart className="w-4 h-4 text-emerald-600" />
                  <span>Daily Walk</span>
                </div>
                <p className="text-slate-600 leading-snug">
                  Walking for 30 minutes every day helps control blood pressure, lowers sugar, and strengthens your heart.
                </p>
              </div>

              <div className="p-3.5 bg-indigo-50/60 border border-indigo-100 rounded-2xl space-y-1">
                <div className="flex items-center gap-1.5 text-indigo-900 font-bold">
                  <Moon className="w-4 h-4 text-indigo-600" />
                  <span>Restful Sleep</span>
                </div>
                <p className="text-slate-600 leading-snug">
                  7 to 8 hours of quiet sleep at night lets your body recharge and helps keep hunger cravings under control.
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
            <h3 className="text-base font-bold text-slate-900">
              Save Your Weight Record
            </h3>
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
                  Note (e.g. morning before breakfast, after evening walk)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Optional note"
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
