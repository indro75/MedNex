import React, { useState } from 'react';
import {
  History,
  Trash2,
  Download,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Stethoscope,
  FileText,
  Activity,
  Pill,
  Calendar,
  Clock,
  Printer
} from 'lucide-react';
import { useHealth } from '../../context/HealthContext';
import { useAuth } from '../../context/AuthContext';

export const HealthHistoryPage: React.FC = () => {
  const { activities, deleteActivity, clearAllHistory, bmiLogs, bilingualMode, t } = useHealth();
  const { user } = useAuth();
  const [filterType, setFilterType] = useState<string>('all');

  const filteredActivities = activities.filter((act) => {
    if (filterType === 'all') return true;
    return act.type === filterType;
  });

  const handleExportJSON = () => {
    const data = {
      patient: user,
      exportDate: new Date().toISOString(),
      activities,
      bmiLogs
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MedNex_Health_History_${user?.name.replace(' ', '_') || 'Patient'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'symptom_check':
        return <Stethoscope className="w-4 h-4 text-blue-600" />;
      case 'report_analyzed':
        return <FileText className="w-4 h-4 text-indigo-600" />;
      case 'bmi_logged':
        return <Activity className="w-4 h-4 text-green-600" />;
      case 'medicine_checked':
        return <Pill className="w-4 h-4 text-amber-600" />;
      default:
        return <History className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-2">
            <History className="w-3.5 h-3.5" />
            <span>{bilingualMode ? 'সুরক্ষিত ব্যক্তিগত স্বাস্থ্য টাইমলাইন' : 'Encrypted Longitudinal Health Records'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {bilingualMode ? 'রোগীর স্বাস্থ্য ইতিহাস ও রেকর্ডস' : 'Patient Health Timeline & Records'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            {bilingualMode
              ? 'আপনার লক্ষণ নিরীক্ষণ, ল্যাব রিপোর্ট এবং ট্র্যাক করা ভাইটালসের ধারাবাহিক তথ্য ভাণ্ডার। আপনি যে কোনো সময় আপনার ডাটা এক্সপোর্ট বা মুছে ফেলতে পারেন।'
              : 'A chronological timeline of your symptom checks, analyzed diagnostic reports, and tracked vitals. You have full ownership and control to export or erase your records.'}
          </p>
        </div>

        {/* Export & Actions */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            type="button"
            onClick={handleExportJSON}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            {bilingualMode ? 'ডাটা এক্সপোর্ট (JSON)' : 'Export JSON'}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="p-2.5 border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-xl"
            title={bilingualMode ? 'প্রিন্ট সামারি' : 'Print Summary'}
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-bold text-slate-700">{bilingualMode ? 'ফিল্টার রেকর্ড:' : 'Filter Activities:'}</span>
          <div className="inline-flex bg-slate-100 p-1 rounded-xl">
            {[
              { id: 'all', label: bilingualMode ? 'সকল রেকর্ড' : 'All Records' },
              { id: 'symptom_check', label: bilingualMode ? 'লক্ষণ ট্রায়াজ' : 'Symptom Triage' },
              { id: 'report_analyzed', label: bilingualMode ? 'ল্যাব রিপোর্ট' : 'Lab Reports' },
              { id: 'bmi_logged', label: bilingualMode ? 'ভাইটালস ও বিএমআই' : 'Vitals & BMI' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setFilterType(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  filterType === item.id
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {activities.length > 0 && (
          <button
            type="button"
            onClick={() => {
              if (confirm(bilingualMode ? 'আপনি কি নিশ্চিতভাবে সমস্ত স্বাস্থ্য ইতিহাস মুছে ফেলতে চান?' : 'Are you sure you want to erase your entire health history?')) {
                clearAllHistory();
              }
            }}
            className="text-xs font-semibold text-red-600 hover:underline flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            {bilingualMode ? 'সকল ইতিহাস মুছুন' : 'Clear All History'}
          </button>
        )}
      </div>

      {/* Timeline List */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        {filteredActivities.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <History className="w-10 h-10 text-slate-300 mx-auto" />
            <h4 className="text-sm font-bold text-slate-800">No records found</h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Your logged symptom checks, medical reports, and BMI entries will appear on this timeline.
            </p>
          </div>
        ) : (
          <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200">
            {filteredActivities.map((act) => (
              <div
                key={act.id}
                className="relative pl-8 group"
              >
                {/* Timeline node */}
                <div className="absolute left-1.5 top-3 w-4 h-4 rounded-full bg-white border-2 border-blue-600 -translate-x-1/2 flex items-center justify-center shadow-xs" />

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100/70 transition space-y-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-white rounded-lg border border-slate-200">
                        {getActivityIcon(act.type)}
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">{act.title}</h4>
                      {act.tag && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">
                          {act.tag}
                        </span>
                      )}
                      {act.severity === 'emergency' && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-red-100 text-red-700">
                          Emergency Alert
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-400 font-medium">{act.timestamp}</span>
                      <button
                        type="button"
                        onClick={() => deleteActivity(act.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-600 transition"
                        title="Delete log"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed pl-8">
                    {act.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

