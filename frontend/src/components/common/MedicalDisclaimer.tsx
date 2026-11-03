import React from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

interface Props {
  compact?: boolean;
}

export const MedicalDisclaimer: React.FC<Props> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
        <p>
          <strong>Medical Notice:</strong> MedNex is an AI assistant, not a doctor. In an emergency, dial <strong>999</strong> immediately.
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
        <h4 className="font-semibold text-amber-900 mb-0.5">Important Healthcare Safety Disclaimer</h4>
        <p className="text-amber-800 leading-relaxed">
          MedNex is a healthcare assistance platform, not a replacement for professional medical diagnosis or treatment. AI-generated information may be inaccurate. Always consult a qualified healthcare professional for medical decisions. In an emergency, contact emergency services (<strong>999</strong>) immediately.
        </p>
      </div>
    </div>
  );
};

