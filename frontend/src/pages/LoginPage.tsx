import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useHealth } from '../context/HealthContext';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const { login } = useAuth();
  const { bilingualMode } = useHealth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError(
        bilingualMode
          ? 'অনুগ্রহ করে ইমেইল এবং পাসওয়ার্ড দুটিই পূরণ করুন।'
          : 'Please fill in both email and password.'
      );
      return;
    }

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError(
          bilingualMode
            ? 'ভুল লগইন তথ্য। আবার চেষ্টা করুন।'
            : 'Invalid login credentials. Please try again.'
        );
      }
    } catch {
      setError(
        bilingualMode
          ? 'লগইন করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।'
          : 'Invalid login credentials or server error.'
      );
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
        {/* Brand */}
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
            {bilingualMode ? 'স্বাগতম' : 'Welcome Back'}
          </h2>
          <p className="text-xs text-slate-500">
            {bilingualMode
              ? 'আপনার স্বাস্থ্য প্রোফাইল ও এআই ট্রায়াজ ড্যাশবোর্ডে প্রবেশ করতে লগইন করুন'
              : 'Sign in to access your health records and AI triage dashboard'}
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder={bilingualMode ? 'আপনার ইমেইল লিখুন...' : 'name@example.com'}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700">
                {bilingualMode ? 'পাসওয়ার্ড' : 'Password'}
              </label>
              <button
                type="button"
                onClick={() => setForgotPasswordOpen(true)}
                className="text-[11px] font-medium text-blue-600 hover:underline"
              >
                {bilingualMode ? 'পাসওয়ার্ড ভুলে গেছেন?' : 'Forgot password?'}
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-2"
          >
            <span>{bilingualMode ? 'লগইন করুন' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-500">
          {bilingualMode ? 'কোনো অ্যাকাউন্ট নেই? ' : "Don't have an account? "}
          <Link to="/signup" className="font-semibold text-blue-600 hover:underline">
            {bilingualMode ? 'এখানে নিবন্ধন করুন' : 'Register here'}
          </Link>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2 text-[11px] text-slate-500">
          <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
          <span>
            {bilingualMode
              ? 'রোগীর ব্যক্তিগত স্বাস্থ্য ডাটা সম্পূর্ণ সুরক্ষিত ও গোপনীয় রাখা হয়।'
              : 'Patient data is strictly encrypted and stored with user consent.'}
          </span>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotPasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 border border-slate-200 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900">
              {bilingualMode ? 'পাসওয়ার্ড রিসেট করুন' : 'Reset Your Password'}
            </h3>
            <p className="text-xs text-slate-600">
              {bilingualMode
                ? 'আপনার নিবন্ধিত ইমেইল ঠিকানা লিখুন। আমরা আপনাকে একটি পাসওয়ার্ড রিসেট লিংক পাঠাব।'
                : 'Enter your registered email address and we will send you a password reset verification link.'}
            </p>
            {forgotSent ? (
              <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-xs text-green-800">
                {bilingualMode
                  ? 'পাসওয়ার্ড রিসেট নির্দেশিকা আপনার ইমেইলে পাঠানো হয়েছে। আপনার ইনবক্স চেক করুন!'
                  : 'A password reset instructions email has been sent. Check your inbox!'}
              </div>
            ) : (
              <input
                type="email"
                value={resetEmail || email}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
            )}
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setForgotPasswordOpen(false);
                  setForgotSent(false);
                }}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                {bilingualMode ? 'বন্ধ করুন' : 'Close'}
              </button>
              {!forgotSent && (
                <button
                  type="button"
                  onClick={() => setForgotSent(true)}
                  className="px-3 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {bilingualMode ? 'রিসেট লিংক পাঠান' : 'Send Reset Link'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
