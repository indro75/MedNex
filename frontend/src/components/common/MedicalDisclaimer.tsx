import React from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';
import { useHealth } from '../../context/HealthContext';

interface Props {
  compact?: boolean;
}

export const MedicalDisclaimer: React.FC<Props> = ({ compact = false }) => {
  const { bilingualMode } = useHealth();

  if (compact) {
    return (
      <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
        <p>
          <strong>{bilingualMode ? 'চিকিৎসা বিজ্ঞপ্তি:' : 'Medical Notice:'}</strong>{' '}
          {bilingualMode
            ? 'মেডনেক্স একটি এআই সহায়ক ব্যবস্থা, সরাসরি চিকিৎসক নয়। জরুরি মুহূর্তে অবিলম্বে ৯৯৯ ডায়াল করুন।'
            : 'MedNex is an AI assistant, not a doctor. In an emergency, dial 999 immediately.'}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 text-xs sm:text-sm text-amber-950 flex flex-col sm:flex-row items-start sm:items-center gap-3 shadow-xs">
      <div className="p-2 bg-amber-100 rounded-lg shrink-0">
        <ShieldCheck className="w-5 h-5 text-amber-700" />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-amber-900 mb-0.5">
          {bilingualMode ? 'জরুরি স্বাস্থ্য সুরক্ষা ও দায়িত্ব পরিত্যাগ বার্তা' : 'Important Healthcare Safety Disclaimer'}
        </h4>
        <p className="text-amber-800 leading-relaxed">
          {bilingualMode
            ? 'মেডনেক্স একটি এআই চালিত স্বাস্থ্য সহায়তা প্ল্যাটফর্ম, যা কোনোভাবেই নিবন্ধিত বিশেষজ্ঞ চিকিৎসকের সরাসরি রোগ নির্ণয় বা ব্যবস্থাপত্রের বিকল্প নয়। যে কোনো জরুরি অবস্থায় অনতিবিলম্বে জাতীয় জরুরি হেল্পলাইন ৯৯৯ অথবা নিকটস্থ হাসপাতালের জরুরি বিভাগে যোগাযোগ করুন।'
            : 'MedNex is a healthcare assistance platform, not a replacement for professional medical diagnosis or treatment. Always consult a qualified healthcare professional for medical decisions. In an emergency, contact emergency services (999) immediately.'}
        </p>
      </div>
    </div>
  );
};

