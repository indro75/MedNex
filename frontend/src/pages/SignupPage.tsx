import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, Lock, Mail, User, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useHealth } from '../context/HealthContext';
import { BloodGroup } from '../types';

export const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+880 ');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState<number>(28);
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>('B+');
  const [consent, setConsent] = useState(true);
  const { signup } = useAuth();
  const { bilingualMode } = useHealth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      alert(
        bilingualMode
          ? 'অনুগ্রহ করে এগিয়ে যেতে মেডিকেল সম্মতি ও সুরক্ষা নীতিমালায় টিক দিন।'
          : 'Please agree to medical consent and safety guidelines to proceed.'
      );
      return;
    }

    await signup({
      name,
      email,
      phone,
      age: Number(age),
      gender,
      bloodGroup,
      city: 'Khulna'
    });

    navigate('/dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Activity className="w-6 h-6 stroke-[2.5]" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">
              {bilingualMode ? 'মেড' : 'Med'}<span className="text-blue-600">{bilingualMode ? 'নেক্স' : 'Nex'}</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold text-slate-900">
            {bilingualMode ? 'নতুন রোগী অ্যাকাউন্ট তৈরি করুন' : 'Create Patient Account'}
          </h2>
          <p className="text-xs text-slate-500">
            {bilingualMode
              ? 'ব্যক্তিগত এআই স্বাস্থ্য ট্রায়াজ এবং খুলনার যাচাইকৃত ডাক্তারদের সেবা পেতে মেডনেক্সে যোগ দিন'
              : 'Join MedNex for personalized AI health triage and verified doctor discovery in Khulna'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {bilingualMode ? 'পুরো নাম' : 'Full Name'}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={bilingualMode ? 'যেমন: তানভীর হাসান' : 'e.g. Tanvir Hasan'}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {bilingualMode ? 'মোবাইল নম্বর' : 'Phone Number'}
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+880 1700 000000"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {bilingualMode ? 'ইমেইল অ্যাড্রেস' : 'Email Address'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {bilingualMode ? 'বয়স' : 'Age'}
              </label>
              <input
                type="number"
                min={1}
                max={120}
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {bilingualMode ? 'লিঙ্গ' : 'Gender'}
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as 'male' | 'female' | 'other')}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                <option value="male">{bilingualMode ? 'পুরুষ' : 'Male'}</option>
                <option value="female">{bilingualMode ? 'নারী' : 'Female'}</option>
                <option value="other">{bilingualMode ? 'অন্যান্য' : 'Other'}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {bilingualMode ? 'রক্তের গ্রুপ' : 'Blood Group'}
              </label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
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
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {bilingualMode ? 'পাসওয়ার্ড তৈরি করুন' : 'Create Password'}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={bilingualMode ? 'কমপক্ষে ৬ বা ৮ অক্ষর' : 'At least 8 characters'}
                minLength={6}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Consent Checkbox */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 w-4 h-4 text-blue-600 rounded-sm border-slate-300 focus:ring-blue-500"
              />
              <span className="text-xs text-slate-600 leading-relaxed">
                {bilingualMode
                  ? 'আমি বুঝতে পেরেছি যে মেডনেক্স এআই স্বাস্থ্য ট্রায়াজ পরামর্শ প্রদান করে, চূড়ান্ত মেডিকেল রোগনির্ণয় নয়। জরুরি সংকটাপন্ন অবস্থায় আমি অবিলম্বে ৯৯৯ এ কল করব।'
                  : 'I understand that MedNex provides AI triage assistance and not a definitive medical diagnosis. In life-threatening emergencies, I will dial 999 immediately.'}
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-2"
          >
            <span>{bilingualMode ? 'অ্যাকাউন্ট তৈরি করুন' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-500">
          {bilingualMode ? 'ইতিমধ্যে একটি অ্যাকাউন্ট আছে? ' : 'Already have an account? '}
          <Link to="/login" className="font-semibold text-blue-600 hover:underline">
            {bilingualMode ? 'লগইন করুন' : 'Sign In'}
          </Link>
        </div>
      </div>
    </div>
  );
};
