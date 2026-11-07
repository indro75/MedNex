import React, { useState } from 'react';
import {
  Settings,
  User,
  Phone,
  ShieldCheck,
  Check,
  Heart,
  Save
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useHealth } from '../../context/HealthContext';
import { BloodGroup } from '../../types';

export const SettingsPage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { bilingualMode } = useHealth();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [age, setAge] = useState(user?.age || 28);
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>(user?.bloodGroup || 'A+');
  const [city, setCity] = useState(user?.city || 'Khulna');

  const [emergencyName, setEmergencyName] = useState(user?.emergencyContact?.name || '');
  const [emergencyPhone, setEmergencyPhone] = useState(user?.emergencyContact?.phone || '');
  const [emergencyRelation, setEmergencyRelation] = useState(user?.emergencyContact?.relationship || '');

  const [allergiesInput, setAllergiesInput] = useState(user?.allergies?.join(', ') || '');
  const [chronicInput, setChronicInput] = useState(user?.chronicConditions?.join(', ') || '');

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateProfile({
      name,
      email,
      phone,
      age: Number(age),
      bloodGroup,
      city,
      emergencyContact: {
        name: emergencyName,
        phone: emergencyPhone,
        relationship: emergencyRelation
      },
      allergies: allergiesInput.split(',').map((s) => s.trim()).filter(Boolean),
      chronicConditions: chronicInput.split(',').map((s) => s.trim()).filter(Boolean)
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold mb-2">
            <Settings className="w-3.5 h-3.5" />
            <span>{bilingualMode ? 'প্রোফাইল ও ক্লিনিক্যাল তথ্য' : 'Profile & Clinical Preferences'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {bilingualMode ? 'অ্যাকাউন্ট ও স্বাস্থ্য প্রোফাইল সেটিংস' : 'Account & Health Profile Settings'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            {bilingualMode
              ? 'আপনার সাধারণ তথ্য, জরুরি যোগাযোগের নম্বর এবং ঔষধের এলার্জি পরিচালনা করুন।'
              : 'Manage your demographics, emergency contact numbers, and known drug allergies. These parameters fine-tune your personalized triage assessments.'}
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 text-green-800 rounded-xl text-xs font-bold shrink-0">
            <Check className="w-4 h-4 text-green-600" />
            <span>{bilingualMode ? 'প্রোফাইল সফলভাবে সংরক্ষিত হয়েছে!' : 'Profile Saved Successfully!'}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Personal Demographics */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <User className="w-4 h-4 text-blue-600" />
            {bilingualMode ? '১. ব্যক্তিগত পরিচিতি ও তথ্য' : '1. Personal Demographics'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {bilingualMode ? 'পুরো নাম' : 'Full Name'}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {bilingualMode ? 'ইমেইল ঠিকানা' : 'Email Address'}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {bilingualMode ? 'ফোন নম্বর' : 'Phone Number'}
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {bilingualMode ? 'বয়স' : 'Age'}
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {bilingualMode ? 'রক্তের গ্রুপ' : 'Blood'}
                </label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
                  className="w-full px-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {bilingualMode ? 'অঞ্চল/শহর' : 'Region'}
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Emergency Contact */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Phone className="w-4 h-4 text-red-600" />
            {bilingualMode ? '২. জরুরি যোগাযোগের নম্বর (খুলনা এসওএস)' : '2. Primary Emergency Contact (Khulna SOS)'}
          </h3>
          <p className="text-xs text-slate-500">
            {bilingualMode
              ? 'জরুরি প্রয়োজনে বা ৯৯৯ এ ফোন করার সময় এই যোগাযোগের তথ্যটি হাইলাইট করা হবে।'
              : 'This individual will be highlighted in critical emergency situations or when 999 response is initiated.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {bilingualMode ? 'যোগাযোগকারীর নাম' : 'Contact Name'}
              </label>
              <input
                type="text"
                value={emergencyName}
                onChange={(e) => setEmergencyName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {bilingualMode ? 'সম্পর্ক' : 'Relationship'}
              </label>
              <input
                type="text"
                value={emergencyRelation}
                onChange={(e) => setEmergencyRelation(e.target.value)}
                placeholder={bilingualMode ? 'যেমন স্ত্রী/স্বামী, পিতা/মাতা, ভাই/বোন' : 'e.g. Spouse, Parent, Sibling'}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {bilingualMode ? 'জরুরি ফোন নম্বর' : 'Emergency Phone'}
              </label>
              <input
                type="text"
                value={emergencyPhone}
                onChange={(e) => setEmergencyPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
                required
              />
            </div>
          </div>
        </div>

        {/* Section 3: Clinical Background & Allergies */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Heart className="w-4 h-4 text-teal-600" />
            {bilingualMode ? '৩. চিকিৎসার ইতিহাস ও ঔষধের অ্যালার্জি' : '3. Medical History & Known Allergies'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {bilingualMode ? 'ঔষধের অ্যালার্জি (কমা দিয়ে লিখুন)' : 'Known Drug Allergies (comma separated)'}
              </label>
              <input
                type="text"
                value={allergiesInput}
                onChange={(e) => setAllergiesInput(e.target.value)}
                placeholder={bilingualMode ? 'যেমন পেনিসিলিন, সালফা ড্রাগ, অ্যাসপিরিন' : 'e.g. Penicillin, Sulfa drugs, Aspirin'}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                {bilingualMode
                  ? 'মেডিসিন চেক করার সময় ক্ষতিকর ঔষধ থেকে সতর্কবার্তা দেবে।'
                  : 'Warns against contraindicated medicines in the Medicine Checker.'}
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {bilingualMode ? 'দীর্ঘমেয়াদী অসুস্থতা বা ক্রনিক রোগ (কমা দিয়ে লিখুন)' : 'Chronic Health Conditions (comma separated)'}
              </label>
              <input
                type="text"
                value={chronicInput}
                onChange={(e) => setChronicInput(e.target.value)}
                placeholder={bilingualMode ? 'যেমন উচ্চ রক্তচাপ, টাইপ ২ ডায়াবেটিস, হাঁপানি' : 'e.g. Hypertension, Type 2 Diabetes, Asthma'}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                {bilingualMode ? 'লক্ষণ ট্রায়াজের সময় এই তথ্য বিবেচনা করা হবে।' : 'Incorporated during AI Symptom Triage.'}
              </p>
            </div>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
            <span>{bilingualMode ? 'সম্পূর্ণ রোগী সম্মতিতে সুরক্ষিত স্থানীয় সংরক্ষণাগার।' : 'Encrypted local storage with full patient consent.'}</span>
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 transition flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {bilingualMode ? 'প্রোফাইল সেটিংস সংরক্ষণ করুন' : 'Save Profile Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};
