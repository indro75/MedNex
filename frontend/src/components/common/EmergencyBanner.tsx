import React from 'react';
import { PhoneCall, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useHealth } from '../../context/HealthContext';

export const EmergencyBanner: React.FC = () => {
  const { bilingualMode } = useHealth();

  return (
    <div className="bg-red-600 text-white px-4 py-2.5 shadow-md flex items-center justify-between flex-wrap gap-2 text-xs sm:text-sm">
      <div className="flex items-center gap-2 font-medium">
        <span className="flex h-2.5 w-2.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
        </span>
        <AlertCircle className="w-4 h-4 shrink-0" />
        <span>
          {bilingualMode
            ? 'জরুরি চিকিৎসায় অনতিবিলম্বে বাংলাদেশ জাতীয় হেল্পলাইন ৯৯৯ নম্বরে কল করুন'
            : 'Medical Emergency? Dial Bangladesh National Helpline 999 immediately'}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <a
          href="tel:999"
          className="inline-flex items-center gap-1.5 bg-white text-red-600 px-3 py-1 rounded-full font-bold hover:bg-red-50 transition text-xs shadow-xs"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          {bilingualMode ? 'কল ৯৯৯' : 'Call 999'}
        </a>
        <Link
          to="/dashboard/emergency"
          className="underline hover:text-red-100 text-xs font-medium"
        >
          {bilingualMode ? 'খুলনার অ্যাম্বুলেন্স দেখুন →' : 'Find Khulna Ambulances →'}
        </Link>
      </div>
    </div>
  );
};

