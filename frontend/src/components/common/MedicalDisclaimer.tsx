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
          <strong>Medical Notice:</strong> MedNex is an AI helper tool, not a doctor. In a medical emergency, call 999 right away.
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
          Important Health & Safety Notice
        </h4>
        <p className="text-amber-800 leading-relaxed">
          MedNex is designed to help you understand your health and find local medical services. It does not replace a doctor or medical diagnosis. Please always talk with a licensed doctor for medical treatment. In a life-threatening emergency, call 999 or visit your nearest hospital emergency room immediately.
        </p>
      </div>
    </div>
  );
};

