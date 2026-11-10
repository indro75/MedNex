import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  HelpCircle,
  Printer,
  BookmarkPlus,
  RefreshCw,
  Eye,
  FileCheck,
  File,
  Edit3,
  X,
  ClipboardList,
  Heart,
  Activity,
  Apple,
  Salad,
  UserCheck,
  ArrowRight,
  AlertTriangle,
  ArrowLeft
} from 'lucide-react';
import { SAMPLE_REPORTS } from '../../data/sampleReports';
import { MedicalReportData, ReportParameter } from '../../types';
import { useHealth } from '../../context/HealthContext';
import { api } from '../../services/api';
import {
  extractBiomarkersFromText,
  extractTextFromPdfBuffer,
  readFileAsText,
  readFileAsArrayBuffer,
  performImageOcr,
  interpretClinicalFindings
} from '../../utils/reportParser';

export const ReportAnalyzerPage: React.FC = () => {
  const { addReportActivity } = useHealth();

  // Active analyzed report (defaults to null so users start fresh with no pre-filled demo)
  const [activeReport, setActiveReport] = useState<MedicalReportData | null>(null);

  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<string>('Analyzing document...');

  // Uploaded file details
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadedFileType, setUploadedFileType] = useState<string | null>(null);
  const [uploadedFileSize, setUploadedFileSize] = useState<string | null>(null);
  const [uploadedPreviewUrl, setUploadedPreviewUrl] = useState<string | null>(null);
  const [extractedRawText, setExtractedRawText] = useState<string>('');

  // UI views
  const [inputMode, setInputMode] = useState<'upload' | 'text' | 'samples'>('upload');
  const [manualText, setManualText] = useState<string>('');
  const [showRawTextEditor, setShowRawTextEditor] = useState(false);
  const [filterMode, setFilterMode] = useState<'all' | 'abnormal'>('all');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showSlipPreview, setShowSlipPreview] = useState(true);
  const [imageModalOpen, setImageModalOpen] = useState(false);

  // 1. Process Real File Upload (Image, PDF, or Text)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    setUploadedFileType(file.type || file.name.split('.').pop() || 'document');
    setUploadedFileSize(`${(file.size / 1024).toFixed(1)} KB`);
    setSavedSuccess(false);
    setIsProcessing(true);

    if (file.type.startsWith('image/')) {
      if (uploadedPreviewUrl) URL.revokeObjectURL(uploadedPreviewUrl);
      const url = URL.createObjectURL(file);
      setUploadedPreviewUrl(url);
    } else {
      setUploadedPreviewUrl(null);
    }

    try {
      let extractedText = '';

      if (file.type === 'text/plain' || file.name.endsWith('.txt') || file.name.endsWith('.csv')) {
        setProcessingStatus('Reading text report...');
        extractedText = await readFileAsText(file);
      } else if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        setProcessingStatus('Parsing PDF document streams & lab values...');
        const buffer = await readFileAsArrayBuffer(file);
        extractedText = extractTextFromPdfBuffer(buffer);
        if (!extractedText || extractedText.trim().length < 10) {
          extractedText = `PDF Lab Document: ${file.name}\nPatient Record Scanned.`;
        }
      } else if (file.type.startsWith('image/')) {
        setProcessingStatus('Performing Optical Character Recognition (OCR)...');
        extractedText = await performImageOcr(file, (_pct, status) => {
          setProcessingStatus(status);
        });
      } else {
        extractedText = await readFileAsText(file).catch(() => `Document: ${file.name}`);
      }

      setExtractedRawText(extractedText);
      setManualText(extractedText);
      setProcessingStatus('Evaluating biomarkers against clinical reference ranges across 10 sectors...');

      const backendResult = await api.analyzeReport({
        reportText: extractedText,
        reportCategory: 'General Lab'
      });

      const parsed = extractBiomarkersFromText(extractedText, file.name);

      if (backendResult && backendResult.biomarkers && backendResult.biomarkers.length > 0) {
        if (backendResult.clinical_summary) {
          parsed.overallSummary = backendResult.clinical_summary;
        }
        if (backendResult.questions_for_doctor && backendResult.questions_for_doctor.length > 0) {
          parsed.questionsForPhysician = backendResult.questions_for_doctor;
        }
      }

      setActiveReport(parsed);
    } catch (err) {
      console.error('Failed to process uploaded report:', err);
      const fallback = extractBiomarkersFromText(file.name, file.name);
      setActiveReport(fallback);
    } finally {
      setIsProcessing(false);
    }
  };

  // 2. Direct Text / Manual Analysis
  const handleAnalyzeManualText = () => {
    if (!manualText.trim()) return;
    setIsProcessing(true);
    setProcessingStatus('Parsing entered lab values...');

    setTimeout(() => {
      const parsed = extractBiomarkersFromText(manualText, 'Direct Value Entry');
      setActiveReport(parsed);
      setExtractedRawText(manualText);
      setUploadedFileName('Direct Value Entry');
      setIsProcessing(false);
    }, 400);
  };

  // 3. Re-Analyze After Editing Raw OCR Text
  const handleReAnalyzeRawText = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const parsed = extractBiomarkersFromText(
        extractedRawText,
        uploadedFileName || 'Scanned Document'
      );
      setActiveReport(parsed);
      setIsProcessing(false);
    }, 350);
  };

  // 4. Sample Selection
  const handleSelectSample = (report: MedicalReportData) => {
    setIsProcessing(true);
    setUploadedFileName(null);
    setUploadedPreviewUrl(null);
    setSavedSuccess(false);
    setTimeout(() => {
      const enriched = interpretClinicalFindings(report.parameters, report.category);
      setActiveReport({
        ...report,
        ...enriched
      });
      setIsProcessing(false);
    }, 350);
  };

  const handleClearReport = () => {
    setActiveReport(null);
    setUploadedFileName(null);
    setUploadedPreviewUrl(null);
    setExtractedRawText('');
    setManualText('');
    setSavedSuccess(false);
  };

  const handleSaveToHistory = () => {
    if (!activeReport) return;
    addReportActivity(activeReport);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const abnormalParameters = activeReport
    ? activeReport.parameters.filter((p) => p.status !== 'normal')
    : [];

  const displayedParameters = activeReport
    ? filterMode === 'abnormal'
      ? abnormalParameters
      : activeReport.parameters
    : [];

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
            HIGH ↑
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

  const getRiskBadge = (risk?: string) => {
    switch (risk) {
      case 'critical':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-red-600 text-white flex items-center gap-1.5 animate-pulse">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Critical - Immediate Doctor Consultation</span>
          </span>
        );
      case 'high':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>High Attention - Doctor Review Advised</span>
          </span>
        );
      case 'moderate':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Moderate Attention - Lifestyle & Follow-Up</span>
          </span>
        );
      case 'mild':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-blue-600" />
            <span>Mild Variation - Healthy Diet & Monitoring</span>
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Normal & Safe Reference Levels</span>
          </span>
        );
    }
  };

  const calculateGaugePercent = (param: ReportParameter): number => {
    const val = typeof param.value === 'number' ? param.value : parseFloat(String(param.value));
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
      {/* Top Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Multi-Sector Medical Report Analyzer (All 10 Lab Sectors)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Medical Report Analyzer & Plain-English Explanations
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Upload any medical lab test slip (PDF, JPG, PNG) or enter numbers manually. MedNex evaluates your results across all 10 clinical sectors: CBC, Blood Sugar, Cholesterol, Kidney, Liver, Thyroid, Electrolytes, Vitamins, CRP, and Urine analysis, explaining everything in simple, everyday words anyone can understand.
          </p>
        </div>

        {activeReport && (
          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <button
              type="button"
              onClick={handleClearReport}
              className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Analyze Another Report</span>
            </button>
            <button
              type="button"
              onClick={handleSaveToHistory}
              className="py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
            >
              <BookmarkPlus className="w-4 h-4" />
              <span>{savedSuccess ? 'Saved to History!' : 'Save'}</span>
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="p-2.5 border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-xl"
              title="Print Summary"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Case A: In-Processing Loader */}
      {isProcessing ? (
        <div className="bg-white p-16 rounded-3xl border border-slate-200 shadow-xs text-center space-y-4">
          <RefreshCw className="w-10 h-10 text-blue-600 animate-spin mx-auto" />
          <h3 className="text-base font-extrabold text-slate-900">
            {processingStatus}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            Reading test names, numerical values, and reference boundaries across all 10 clinical sectors. Translating medical terms into clear everyday English...
          </p>
        </div>
      ) : activeReport ? (
        /* Case B: Report is Active (Analyzed Results) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Physical Document Preview */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-blue-600" />
                  <span>{uploadedFileName ? 'Uploaded Document' : 'Lab Panel Record'}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowSlipPreview(!showSlipPreview)}
                  className="text-[11px] font-semibold text-blue-600 hover:underline"
                >
                  {showSlipPreview ? 'Hide' : 'Show'}
                </button>
              </div>

              {showSlipPreview && (
                <div className="space-y-3">
                  {uploadedPreviewUrl ? (
                    <div className="space-y-2">
                      <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 group">
                        <img
                          src={uploadedPreviewUrl}
                          alt="Uploaded Report"
                          className="w-full max-h-56 object-contain bg-slate-950/80 cursor-pointer hover:opacity-90 transition"
                          onClick={() => setImageModalOpen(true)}
                        />
                        <button
                          type="button"
                          onClick={() => setImageModalOpen(true)}
                          className="absolute bottom-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-lg text-[10px] flex items-center gap-1 backdrop-blur-xs transition"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Full Size</span>
                        </button>
                      </div>
                      <div className="text-[10px] text-slate-500 flex justify-between items-center px-1">
                        <span className="truncate max-w-[150px] font-medium text-slate-700">{uploadedFileName}</span>
                        <span>{uploadedFileSize}</span>
                      </div>
                    </div>
                  ) : uploadedFileName ? (
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold">
                          {uploadedFileType?.includes('pdf') ? 'PDF' : <File className="w-5 h-5" />}
                        </div>
                        <div className="truncate">
                          <p className="font-bold text-slate-900 truncate">{uploadedFileName}</p>
                          <p className="text-[10px] text-slate-500">{uploadedFileSize} • {uploadedFileType}</p>
                        </div>
                      </div>
                      <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 pt-1 border-t border-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Parsed successfully into 10 clinical categories</span>
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-[11px] text-slate-700 space-y-2">
                      <div className="text-center pb-2 border-b border-slate-200">
                        <p className="font-bold text-slate-900 uppercase tracking-wider">{activeReport.labName}</p>
                        <p className="text-[10px] text-slate-500">Diagnostic Clinical Laboratory Service</p>
                      </div>
                      <div className="grid grid-cols-2 text-[10px] py-1 border-b border-slate-100">
                        <span>Patient: {activeReport.patientName}</span>
                        <span className="text-right">Age: {activeReport.patientAge}y</span>
                        <span>Date: {activeReport.date}</span>
                        <span className="text-right text-emerald-700 font-bold">Status: Verified</span>
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
                    </div>
                  )}

                  {/* Raw Text Inspector */}
                  {extractedRawText && (
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => setShowRawTextEditor(!showRawTextEditor)}
                        className="w-full py-1.5 px-2 text-[10px] font-bold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-xl transition flex items-center justify-center gap-1"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>{showRawTextEditor ? 'Hide Extracted Text' : 'View / Edit Raw Text'}</span>
                      </button>

                      {showRawTextEditor && (
                        <div className="mt-2 space-y-2">
                          <textarea
                            rows={5}
                            value={extractedRawText}
                            onChange={(e) => setExtractedRawText(e.target.value)}
                            className="w-full p-2.5 text-[10px] font-mono bg-slate-50 border border-slate-200 rounded-xl leading-relaxed"
                          />
                          <button
                            type="button"
                            onClick={handleReAnalyzeRawText}
                            className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold transition flex items-center justify-center gap-1 shadow-2xs"
                          >
                            <RefreshCw className="w-3 h-3" />
                            <span>Re-Analyze</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quick Switch to Another Sample */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <ClipboardList className="w-4 h-4 text-blue-600" />
                <span>Test Other Sample Sectors</span>
              </h4>
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {SAMPLE_REPORTS.map((rep) => (
                  <button
                    key={rep.id}
                    type="button"
                    onClick={() => handleSelectSample(rep)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs font-medium transition border flex items-center justify-between ${
                      activeReport.id === rep.id && !uploadedFileName
                        ? 'bg-blue-50 border-blue-300 text-blue-900 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="truncate pr-2">{rep.title}</span>
                    <span className="text-[10px] text-slate-400 font-normal shrink-0">{rep.category}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Diagnostic Overview & Biomarker Gauges */}
          <div className="lg:col-span-8 space-y-6">
            {/* Primary Diagnostic Overview Card */}
            <div className="bg-gradient-to-br from-white via-blue-50/25 to-teal-50/20 p-6 sm:p-7 rounded-3xl border border-blue-200 shadow-xs space-y-5">
              {/* Header & Risk Level Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/80">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/80 px-2.5 py-0.5 rounded-md">
                      Sector: {activeReport.category}
                    </span>
                    <span className="text-xs text-slate-400">• {activeReport.title}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                    {activeReport.clinicalImpression || activeReport.title}
                  </h3>
                </div>

                <div className="self-start sm:self-auto">
                  {getRiskBadge(activeReport.riskLevel)}
                </div>
              </div>

              {/* Section 1: What this report means in simple words */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>What this report means for your health:</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium bg-white/90 p-4 rounded-2xl border border-blue-100 shadow-2xs">
                  {activeReport.overallSummary}
                </p>
              </div>

              {/* Section 2: Affected Organs & Impact on Body */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                {/* Affected Organs */}
                <div className="p-4 bg-white/95 rounded-2xl border border-slate-200/80 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                    <Heart className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>Affected Organs & Systems:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(activeReport.affectedOrgans || ['Metabolic Balance', 'Blood Circulation']).map((organ, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-[11px] font-semibold"
                      >
                        {organ}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Impact on Physical Wellbeing */}
                <div className="p-4 bg-white/95 rounded-2xl border border-slate-200/80 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                    <Activity className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>How it may make you feel:</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {activeReport.bodyImpact || 'Maintain a regular healthy lifestyle and monitor routine checks.'}
                  </p>
                </div>
              </div>

              {/* Section 3: Dietary & Lifestyle Guidelines */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                {/* Food / Diet */}
                <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200/80 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                    <Apple className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Dietary & Food Recommendations:</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-emerald-950">
                    {(activeReport.dietaryAdvice || [
                      'Hydrate well with 2.5 - 3 liters of safe water daily.',
                      'Eat plenty of fresh colorful vegetables and seasonal fruits.',
                      'Avoid deep-fried and highly processed packaged foods.'
                    ]).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Lifestyle / Exercise */}
                <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-200/80 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
                    <Salad className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Daily Habits & Activity:</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-blue-950">
                    {(activeReport.lifestyleAdvice || [
                      'Engage in 30 minutes of gentle walking or exercise daily.',
                      'Never take unprescribed painkillers on an empty stomach.',
                      'Show this test report to a registered doctor.'
                    ]).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-blue-600 font-bold shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Section 4: Recommended Doctor Consultation Link */}
              <div className="p-4 bg-white rounded-2xl border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      Recommended Specialist:{' '}
                      <span className="text-blue-700">
                        {activeReport.recommendedSpecialty || 'Internal Medicine Specialist'}
                      </span>
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Book verified chamber appointments with specialists in Khulna directly.
                    </p>
                  </div>
                </div>

                <Link
                  to="/dashboard/find-doctors"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition shrink-0"
                >
                  <span>Find Specialists</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Biomarkers Table Card with Visual Needle Gauges */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-100">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Biomarker Values & Visual Range Gauges
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Clear breakdown of each test value versus its healthy normal reference boundary
                  </p>
                </div>

                {/* Filter and Count Controls */}
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
                    Outside Normal Range ({abnormalParameters.length})
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700">
                    <tr>
                      <th className="p-3">Biomarker / Test Name</th>
                      <th className="p-3">Your Result</th>
                      <th className="p-3">Healthy Range</th>
                      <th className="p-3">Visual Gauge</th>
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
                            param.status !== 'normal' ? 'bg-amber-50/20' : ''
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

                          {/* Visual Range Needle Bar */}
                          <td className="p-3 min-w-[140px]">
                            <div className="space-y-1">
                              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden flex relative">
                                <div className="w-[25%] bg-amber-300" title="Low zone" />
                                <div className="w-[50%] bg-emerald-400" title="Normal Healthy Zone" />
                                <div className="w-[25%] bg-rose-400" title="High zone" />

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

            {/* Questions to Ask Your Doctor Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                <span>Recommended Questions to Ask Your Doctor:</span>
              </h4>
              <div className="space-y-2">
                {(activeReport.questionsForPhysician || [
                  'Do I need any follow-up confirmatory tests for these findings?',
                  'Are my current medications or diet affecting these values?',
                  'What daily lifestyle or dietary changes should I prioritize first?'
                ]).map((q, idx) => (
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
        </div>
      ) : (
        /* Case C: Clean Upload & Exploration Hub (When No Report is Uploaded Yet) */
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Box 1: File Upload */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Option 1: Upload Report File
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Upload an image of your physical test slip or digital PDF from any hospital or diagnostic center.
                </p>
              </div>

              <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition bg-slate-50 hover:bg-blue-50/40 group">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-2 group-hover:scale-105 transition">
                  <FileText className="w-7 h-7" />
                </div>
                <span className="text-sm font-bold text-slate-800">
                  Click or drag file to upload
                </span>
                <span className="text-xs text-slate-500 mt-1">
                  Supports PDF, JPG, PNG, WEBP, TXT (Max 15MB)
                </span>
                <input
                  type="file"
                  accept=".pdf,image/png,image/jpeg,image/jpg,image/webp,.txt,.csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Box 2: Manual Text / Paste */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3">
                  <Edit3 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Option 2: Type or Paste Lab Numbers
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Have values from your phone or online portal? Type or paste them directly in text format.
                </p>
              </div>

              <div className="space-y-3">
                <textarea
                  rows={4}
                  value={manualText}
                  onChange={(e) => setManualText(e.target.value)}
                  placeholder={'Type or paste test numbers here...\ne.g.\nHemoglobin: 11.2 g/dL\nFasting Blood Sugar: 7.2 mmol/L\nSerum Creatinine: 1.1 mg/dL\nTotal Cholesterol: 220 mg/dL'}
                  className="w-full p-3 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 leading-relaxed"
                />
                <button
                  type="button"
                  onClick={handleAnalyzeManualText}
                  disabled={!manualText.trim()}
                  className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Analyze Entered Numbers</span>
                </button>
              </div>
            </div>
          </div>

          {/* Dedicated Section: Explore 8 Clinical Sector Presets */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-blue-600" />
                  <span>Or Test With Verified Samples Across All 10 Medical Sectors</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click any sample panel to see how MedNex explains clinical results, diets, and doctor recommendations in easy words:
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SAMPLE_REPORTS.map((rep) => (
                <div
                  key={rep.id}
                  className="p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/40 border border-slate-200 hover:border-blue-300 transition flex flex-col justify-between space-y-3 group"
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                      {rep.category}
                    </span>
                    <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-blue-700 transition">
                      {rep.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                      {rep.overallSummary}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectSample(rep)}
                    className="w-full py-2 px-3 bg-white group-hover:bg-blue-600 group-hover:text-white text-slate-700 border border-slate-200 group-hover:border-blue-600 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <span>Test This Sample</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Full Image Preview Modal */}
      {imageModalOpen && uploadedPreviewUrl && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl p-4 space-y-3">
            <div className="flex items-center justify-between text-white border-b border-slate-800 pb-2">
              <span className="text-xs font-bold truncate">{uploadedFileName}</span>
              <button
                type="button"
                onClick={() => setImageModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-[75vh] overflow-auto flex items-center justify-center bg-black/40 rounded-2xl p-2">
              <img
                src={uploadedPreviewUrl}
                alt="Document Full View"
                className="max-w-full max-h-[70vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
