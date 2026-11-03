import React, { useState } from 'react';
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileSearch,
  Sparkles,
  HelpCircle,
  Printer,
  BookmarkPlus,
  RefreshCw,
  Info,
  Clock,
  ArrowRight,
  TrendingUp,
  Sliders,
  Eye,
  FileCheck
} from 'lucide-react';
import { SAMPLE_REPORTS } from '../../data/sampleReports';
import { MedicalReportData, ReportParameter } from '../../types';
import { useHealth } from '../../context/HealthContext';

export const ReportAnalyzerPage: React.FC = () => {
  const [activeReport, setActiveReport] = useState<MedicalReportData>(SAMPLE_REPORTS[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [filterMode, setFilterMode] = useState<'all' | 'abnormal'>('all');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showSlipPreview, setShowSlipPreview] = useState(true);

  const { addReportActivity, bilingualMode } = useHealth();

  const handleSelectSample = (report: MedicalReportData) => {
    setIsProcessing(true);
    setUploadedFileName(null);
    setSavedSuccess(false);
    setTimeout(() => {
      setActiveReport(report);
      setIsProcessing(false);
    }, 400);
  };

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      setIsProcessing(true);
      setSavedSuccess(false);

      setTimeout(() => {
        const matching =
          SAMPLE_REPORTS.find((r) =>
            file.name.toLowerCase().includes(r.category.toLowerCase().split(' ')[0])
          ) || SAMPLE_REPORTS[1];
        setActiveReport(matching);
        setIsProcessing(false);
      }, 650);
    }
  };

  const handleSaveToHistory = () => {
    addReportActivity(activeReport);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const abnormalParameters = activeReport.parameters.filter(
    (p) => p.status !== 'normal'
  );

  const displayedParameters =
    filterMode === 'abnormal' ? abnormalParameters : activeReport.parameters;

  const getStatusBadge = (status: ReportParameter['status']) => {
    switch (status) {
      case 'normal':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-green-100 text-green-800">
            NORMAL
          </span>
        );
      case 'high':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-100 text-rose-800">
            ELEVATED ↑
          </span>
        );
      case 'low':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
            LOW ↓
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-red-600 text-white animate-pulse">
            CRITICAL
          </span>
        );
    }
  };

  // Helper for visual reference gauge position (0% to 100%)
  const calculateGaugePercent = (param: ReportParameter): number => {
    const val = typeof param.value === 'number' ? param.value : parseFloat(param.value);
    if (isNaN(val) || param.minNormal === undefined || param.maxNormal === undefined) {
      return param.status === 'high' ? 85 : param.status === 'low' ? 15 : 50;
    }

    const min = param.minNormal;
    const max = param.maxNormal;
    const span = max - min;
    const lowerBound = min - span * 0.5;
    const upperBound = max + span * 0.5;

    const clamped = Math.max(lowerBound, Math.min(upperBound, val));
    const percent = ((clamped - lowerBound) / (upperBound - lowerBound)) * 100;
    return Math.round(percent);
  };

  return (
    <div className="space-y-6">
      {/* Title & Upload banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Optical Character Recognition (OCR) Engine</span>
            {bilingualMode && <span>| মেডিকেল রিপোর্ট বিশ্লেষণ</span>}
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Medical Report Analyzer & Biomarker Gauges
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Upload PDF, JPG, or PNG laboratory documents. MedNex parses reported values, benchmarks laboratory reference ranges, and translates clinical jargon into clear summaries.
          </p>
        </div>

        {/* Quick Sample Selector */}
        <div className="space-y-1 self-start md:self-auto">
          <p className="text-xs font-bold text-slate-500">Sample Lab Panels:</p>
          <div className="flex flex-wrap gap-1.5">
            {SAMPLE_REPORTS.map((rep) => (
              <button
                key={rep.id}
                type="button"
                onClick={() => handleSelectSample(rep)}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium transition ${
                  activeReport.id === rep.id && !uploadedFileName
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {rep.category.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Upload Drop Zone & Active File Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Dropzone & Physical Lab Slip Preview */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Upload Medical Report Document
            </h3>

            <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition bg-slate-50 hover:bg-blue-50/40">
              <Upload className="w-8 h-8 text-blue-600 mb-2" />
              <span className="text-xs font-bold text-slate-800">
                {uploadedFileName ? uploadedFileName : 'Click to Upload Document'}
              </span>
              <span className="text-[11px] text-slate-500 mt-1">
                Supports PDF, JPG, JPEG, PNG (Max 15MB)
              </span>
              <input
                type="file"
                accept=".pdf,image/png,image/jpeg,image/jpg"
                onChange={handleSimulateUpload}
                className="hidden"
              />
            </label>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 text-xs">
              <span className="font-semibold text-slate-600">Sample clinical scenarios:</span>
              <ul className="space-y-1 text-slate-500">
                <li className="cursor-pointer hover:text-blue-600" onClick={() => handleSelectSample(SAMPLE_REPORTS[0])}>
                  • Complete Blood Count (CBC - Anemia)
                </li>
                <li className="cursor-pointer hover:text-blue-600" onClick={() => handleSelectSample(SAMPLE_REPORTS[1])}>
                  • Lipid Profile (Elevated LDL & Chol)
                </li>
                <li className="cursor-pointer hover:text-blue-600" onClick={() => handleSelectSample(SAMPLE_REPORTS[2])}>
                  • Diabetic Panel (HbA1c & Fasting Glucose)
                </li>
                <li className="cursor-pointer hover:text-blue-600" onClick={() => handleSelectSample(SAMPLE_REPORTS[3])}>
                  • Liver Function Test (Transaminitis)
                </li>
                <li className="cursor-pointer hover:text-blue-600" onClick={() => handleSelectSample(SAMPLE_REPORTS[4])}>
                  • Kidney Function (Creatinine & Uric Acid)
                </li>
              </ul>
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={handleSaveToHistory}
                className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs"
              >
                <BookmarkPlus className="w-4 h-4" />
                {savedSuccess ? 'Saved to Patient History!' : 'Save Report to Health History'}
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="w-full py-2 px-4 border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-xl text-xs font-medium transition flex items-center justify-center gap-2"
              >
                <Printer className="w-3.5 h-3.5" />
                Print Clinical Summary
              </button>
            </div>
          </div>

          {/* Simulated Lab Slip Physical Document Preview */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-indigo-600" />
                Original Document OCR View
              </span>
              <button
                type="button"
                onClick={() => setShowSlipPreview(!showSlipPreview)}
                className="text-[11px] text-blue-600 hover:underline"
              >
                {showSlipPreview ? 'Hide' : 'Show'}
              </button>
            </div>

            {showSlipPreview && (
              <div className="p-4 bg-amber-50/20 border border-amber-200/60 rounded-2xl font-mono text-[11px] text-slate-700 space-y-2 shadow-inner">
                <div className="text-center pb-2 border-b border-slate-200">
                  <p className="font-bold text-slate-900 uppercase tracking-wider">{activeReport.labName}</p>
                  <p className="text-[10px] text-slate-500">Clinical Pathology & Diagnostic Centre • Khulna</p>
                </div>
                <div className="grid grid-cols-2 text-[10px] py-1 border-b border-slate-100">
                  <span>Patient: {activeReport.patientName}</span>
                  <span className="text-right">Age/Sex: {activeReport.patientAge}y / M</span>
                  <span>Date: {activeReport.date}</span>
                  <span className="text-right">Status: Verified</span>
                </div>
                <div className="space-y-1 pt-1 text-[10px]">
                  {activeReport.parameters.slice(0, 4).map((p, idx) => (
                    <div key={idx} className="flex justify-between items-center py-0.5 border-b border-slate-100/50">
                      <span className="truncate max-w-[120px]">{p.name}</span>
                      <span className={`font-bold ${p.status !== 'normal' ? 'text-rose-600 bg-rose-50 px-1 rounded' : ''}`}>
                        {p.value} {p.unit}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-[9px] text-center text-slate-400 pt-1 italic">
                  [OCR Box Scanned • High Confidence Match]
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Extracted Analysis Pane & Visual Biomarker Gauges */}
        <div className="lg:col-span-8 space-y-6">
          {isProcessing ? (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-xs text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
              <h4 className="text-sm font-bold text-slate-900">
                Running OCR Extraction & Biomarker Matching...
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Parsing parameter tables, calculating reference ratios, and detecting laboratory anomalies.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Report Header Metadata */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                      {activeReport.category}
                    </span>
                    <h3 className="text-lg font-extrabold text-slate-900 mt-1">
                      {activeReport.title}
                    </h3>
                  </div>
                  <div className="text-left sm:text-right text-xs text-slate-500">
                    <p>Report Date: <strong>{activeReport.date}</strong></p>
                    <p className="truncate max-w-xs">{activeReport.labName}</p>
                  </div>
                </div>

                {/* Overall Plain Language Summary Card */}
                <div className="p-4 bg-blue-50/80 border border-blue-200 rounded-2xl space-y-2">
                  <div className="flex items-center gap-1.5 text-blue-900 font-bold text-xs uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>AI Plain-Language Clinical Summary</span>
                  </div>
                  <p className="text-xs sm:text-sm text-blue-950 leading-relaxed font-medium">
                    {activeReport.overallSummary}
                  </p>
                </div>

                {/* Filter and counts */}
                <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setFilterMode('all')}
                      className={`text-xs px-3 py-1.5 rounded-xl font-bold transition ${
                        filterMode === 'all'
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      All Parameters ({activeReport.parameters.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setFilterMode('abnormal')}
                      className={`text-xs px-3 py-1.5 rounded-xl font-bold transition ${
                        filterMode === 'abnormal'
                          ? 'bg-rose-600 text-white'
                          : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                      }`}
                    >
                      Outside Reference Range ({abnormalParameters.length})
                    </button>
                  </div>

                  <span className="text-xs text-slate-400">
                    Patient: {activeReport.patientName} (38y, Male)
                  </span>
                </div>

                {/* Extracted Parameter Table with Visual Gauges */}
                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700">
                      <tr>
                        <th className="p-3">Biomarker / Test Name</th>
                        <th className="p-3">Result</th>
                        <th className="p-3">Reference Range</th>
                        <th className="p-3">Visual Range Gauge</th>
                        <th className="p-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {displayedParameters.map((param, idx) => {
                        const gaugePct = calculateGaugePercent(param);
                        return (
                          <tr
                            key={idx}
                            className={`hover:bg-slate-50 transition ${
                              param.status !== 'normal' ? 'bg-amber-50/25' : ''
                            }`}
                          >
                            <td className="p-3 font-semibold text-slate-900">
                              <div>
                                <span>{param.name}</span>
                                <p className="text-[10px] text-slate-500 font-normal mt-0.5 line-clamp-1">
                                  {param.clinicalMeaning}
                                </p>
                              </div>
                            </td>
                            <td className="p-3 font-black text-slate-900 whitespace-nowrap">
                              {param.value} <span className="text-[10px] font-normal text-slate-500">{param.unit}</span>
                            </td>
                            <td className="p-3 text-slate-600 whitespace-nowrap">
                              {param.referenceRange}
                            </td>

                            {/* Visual Range Gauge Needle Bar */}
                            <td className="p-3 min-w-[140px]">
                              <div className="space-y-1">
                                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden flex relative">
                                  {/* Left Low zone */}
                                  <div className="w-[25%] bg-amber-300" title="Low" />
                                  {/* Center Normal zone */}
                                  <div className="w-[50%] bg-emerald-400" title="Normal Range" />
                                  {/* Right High zone */}
                                  <div className="w-[25%] bg-rose-400" title="High" />

                                  {/* Current Result Marker */}
                                  <div
                                    style={{ left: `${Math.max(4, Math.min(94, gaugePct))}%` }}
                                    className="absolute -top-1 w-2.5 h-4 bg-slate-900 rounded-full border border-white shadow-xs transform -translate-x-1/2"
                                    title={`Value: ${param.value}`}
                                  />
                                </div>
                                <div className="flex justify-between text-[8px] text-slate-400">
                                  <span>Low</span>
                                  <span className="text-emerald-700 font-semibold">Normal</span>
                                  <span>High</span>
                                </div>
                              </div>
                            </td>

                            <td className="p-3 text-right">
                              {getStatusBadge(param.status)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Questions to Ask Your Doctor */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-blue-600" />
                  Recommended Discussion Questions for Your Doctor
                </h4>
                <div className="space-y-2">
                  {activeReport.questionsForPhysician.map((q, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{q}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
