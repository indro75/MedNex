import React, { useState } from 'react';
import { RotateCw, Sparkles, Check } from 'lucide-react';

interface Props {
  selectedPart: string;
  onSelectPart: (part: string) => void;
}

export const VisualBodyMap: React.FC<Props> = ({ selectedPart, onSelectPart }) => {
  const [viewOrientation, setViewOrientation] = useState<'front' | 'back'>('front');

  const getRegionClass = (part: string) => {
    const isSelected = selectedPart === part;
    return `cursor-pointer transition-all duration-200 ${
      isSelected
        ? 'fill-blue-600 stroke-blue-700 filter drop-shadow(0 2px 6px rgba(37,99,235,0.4))'
        : 'fill-slate-200 stroke-slate-400 hover:fill-blue-200 hover:stroke-blue-400'
    }`;
  };

  return (
    <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 flex flex-col items-center select-none">
      <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-slate-200/80">
        <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          Interactive Anatomical Body Map
        </span>
        <button
          type="button"
          onClick={() => setViewOrientation((prev) => (prev === 'front' ? 'back' : 'front'))}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition shadow-xs"
        >
          <RotateCw className="w-3 h-3 text-slate-500" />
          <span>View: {viewOrientation === 'front' ? 'Anterior (Front)' : 'Posterior (Back)'}</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6 w-full justify-center">
        {/* SVG Human Figure */}
        <div className="relative w-44 h-72">
          <svg viewBox="0 0 200 340" className="w-full h-full stroke-1">
            {viewOrientation === 'front' ? (
              /* FRONT VIEW */
              <g>
                {/* Head */}
                <ellipse
                  cx="100"
                  cy="35"
                  rx="24"
                  ry="28"
                  className={getRegionClass('head')}
                  onClick={() => onSelectPart('head')}
                />
                {/* Neck */}
                <rect
                  x="92"
                  y="62"
                  width="16"
                  height="12"
                  className={getRegionClass('head')}
                  onClick={() => onSelectPart('head')}
                />

                {/* Chest & Upper Torso */}
                <path
                  d="M 68 76 Q 100 74 132 76 L 128 128 Q 100 132 72 128 Z"
                  className={getRegionClass('chest')}
                  onClick={() => onSelectPart('chest')}
                />

                {/* Abdomen & Lower Torso */}
                <path
                  d="M 72 130 Q 100 132 128 130 L 124 175 Q 100 185 76 175 Z"
                  className={getRegionClass('abdomen')}
                  onClick={() => onSelectPart('abdomen')}
                />

                {/* Left Arm (Viewer's left) */}
                <path
                  d="M 66 78 Q 48 100 42 140 Q 38 180 36 210 Q 42 215 48 208 Q 54 175 58 138 L 66 95 Z"
                  className={getRegionClass('limbs')}
                  onClick={() => onSelectPart('limbs')}
                />

                {/* Right Arm (Viewer's right) */}
                <path
                  d="M 134 78 Q 152 100 158 140 Q 162 180 164 210 Q 158 215 152 208 Q 146 175 142 138 L 134 95 Z"
                  className={getRegionClass('limbs')}
                  onClick={() => onSelectPart('limbs')}
                />

                {/* Pelvis / Groin */}
                <path
                  d="M 76 176 Q 100 185 124 176 L 122 195 L 78 195 Z"
                  className={getRegionClass('abdomen')}
                  onClick={() => onSelectPart('abdomen')}
                />

                {/* Left Leg (Viewer's left) */}
                <path
                  d="M 78 196 L 96 196 L 92 270 L 96 320 L 78 322 L 76 270 Z"
                  className={getRegionClass('limbs')}
                  onClick={() => onSelectPart('limbs')}
                />

                {/* Right Leg (Viewer's right) */}
                <path
                  d="M 104 196 L 122 196 L 124 270 L 122 322 L 104 320 L 108 270 Z"
                  className={getRegionClass('limbs')}
                  onClick={() => onSelectPart('limbs')}
                />
              </g>
            ) : (
              /* BACK VIEW */
              <g>
                {/* Head / Occipital */}
                <ellipse
                  cx="100"
                  cy="35"
                  rx="24"
                  ry="28"
                  className={getRegionClass('head')}
                  onClick={() => onSelectPart('head')}
                />
                {/* Neck Back */}
                <rect
                  x="92"
                  y="62"
                  width="16"
                  height="12"
                  className={getRegionClass('back')}
                  onClick={() => onSelectPart('back')}
                />

                {/* Upper Back & Thoracic Spine */}
                <path
                  d="M 68 76 Q 100 74 132 76 L 128 128 Q 100 130 72 128 Z"
                  className={getRegionClass('back')}
                  onClick={() => onSelectPart('back')}
                />

                {/* Lower Back & Lumbar Region */}
                <path
                  d="M 72 130 Q 100 130 128 130 L 124 175 Q 100 180 76 175 Z"
                  className={getRegionClass('back')}
                  onClick={() => onSelectPart('back')}
                />

                {/* Arms from back */}
                <path
                  d="M 66 78 Q 48 100 42 140 Q 38 180 36 210 Q 42 215 48 208 Q 54 175 58 138 L 66 95 Z"
                  className={getRegionClass('limbs')}
                  onClick={() => onSelectPart('limbs')}
                />
                <path
                  d="M 134 78 Q 152 100 158 140 Q 162 180 164 210 Q 158 215 152 208 Q 146 175 142 138 L 134 95 Z"
                  className={getRegionClass('limbs')}
                  onClick={() => onSelectPart('limbs')}
                />

                {/* Gluteal Region */}
                <path
                  d="M 76 176 Q 100 180 124 176 L 122 198 L 78 198 Z"
                  className={getRegionClass('back')}
                  onClick={() => onSelectPart('back')}
                />

                {/* Legs Back */}
                <path
                  d="M 78 199 L 96 199 L 92 270 L 96 320 L 78 322 L 76 270 Z"
                  className={getRegionClass('limbs')}
                  onClick={() => onSelectPart('limbs')}
                />
                <path
                  d="M 104 199 L 122 199 L 124 270 L 122 322 L 104 320 L 108 270 Z"
                  className={getRegionClass('limbs')}
                  onClick={() => onSelectPart('limbs')}
                />
              </g>
            )}
          </svg>
        </div>

        {/* Region Selection Guide & Quick Buttons */}
        <div className="space-y-2 text-xs w-full max-w-xs">
          <p className="text-slate-500 text-[11px]">
            Click directly on the anatomical figure or tap a region below:
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { id: 'all', label: 'All Regions' },
              { id: 'head', label: 'Head & Neck' },
              { id: 'chest', label: 'Chest & Heart' },
              { id: 'abdomen', label: 'Abdomen & GI' },
              { id: 'back', label: 'Spine & Back' },
              { id: 'limbs', label: 'Limbs & Joints' },
              { id: 'systemic', label: 'Whole Body / Fever' }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectPart(item.id)}
                className={`p-2 rounded-xl text-left font-medium transition flex items-center justify-between ${
                  selectedPart === item.id
                    ? 'bg-blue-600 text-white font-bold shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{item.label}</span>
                {selectedPart === item.id && <Check className="w-3.5 h-3.5 shrink-0" />}
              </button>
            ))}
          </div>

          <div className="pt-2 text-[11px] text-slate-500">
            Selected Focus:{' '}
            <strong className="text-blue-700 capitalize">
              {selectedPart === 'all' ? 'Entire Body' : selectedPart}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};

