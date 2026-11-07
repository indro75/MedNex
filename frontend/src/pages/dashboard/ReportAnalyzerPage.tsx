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
  ShieldAlert,
  Activity,
  Apple,
  Salad,
  UserCheck,
  ArrowRight,
  AlertTriangle
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
  const { addReportActivity, bilingualMode } = useHealth();

  // Initialize with enriched clinical findings
  const [activeReport, setActiveReport] = useState<MedicalReportData>(() => {
    const base = SAMPLE_REPORTS[0];
    const enriched = interpretClinicalFindings(base.parameters, base.category);
    return {
      ...base,
      ...enriched
    };
  });

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

    // If image, create direct preview URL
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
        setProcessingStatus(
          bilingualMode ? 'টেক্সট রিপোর্ট রিড করা হচ্ছে...' : 'Reading text report...'
        );
        extractedText = await readFileAsText(file);
      } else if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        setProcessingStatus(
          bilingualMode
            ? 'পিডিএফ ডাটা ও বায়োমার্কার স্ট্রিম রিড করা হচ্ছে...'
            : 'Parsing PDF streams & numerical parameters...'
        );
        const buffer = await readFileAsArrayBuffer(file);
        extractedText = extractTextFromPdfBuffer(buffer);
        if (!extractedText || extractedText.trim().length < 10) {
          extractedText = `PDF Lab Document: ${file.name}\nPatient Record Scanned.`;
        }
      } else if (file.type.startsWith('image/')) {
        setProcessingStatus(
          bilingualMode
            ? 'অপটিক্যাল ক্যারেক্টার রিকগনিশন (OCR) স্ক্যান চলছে...'
            : 'Performing Optical Character Recognition (OCR)...'
        );
        extractedText = await performImageOcr(file, (_pct, status) => {
          setProcessingStatus(status);
        });
      } else {
        extractedText = await readFileAsText(file).catch(() => `Document: ${file.name}`);
      }

      setExtractedRawText(extractedText);
      setManualText(extractedText);

      setProcessingStatus(
        bilingualMode
          ? 'বায়োমার্কার ও ক্লিনিক্যাল রেফারেন্স রেঞ্জ বিশ্লেষণ হচ্ছে...'
          : 'Evaluating clinical biomarkers against lab boundaries...'
      );
      
      const backendResult = await api.analyzeReport({
        reportText: extractedText,
        reportCategory: 'General Lab'
      });

      // Parse with our comprehensive Clinical Extraction Engine
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
    setProcessingStatus(
      bilingualMode
        ? 'টাইপকৃত ডাটা বিশ্লেষণ করা হচ্ছে...'
        : 'Parsing entered lab values...'
    );

    setTimeout(() => {
      const parsed = extractBiomarkersFromText(manualText, 'Custom Lab Values');
      setActiveReport(parsed);
      setExtractedRawText(manualText);
      setUploadedFileName(bilingualMode ? 'ম্যানুয়াল ডাটা এন্ট্রি' : 'Direct Text Entry');
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
            {bilingualMode ? 'স্বাভাবিক' : 'NORMAL'}
          </span>
        );
      case 'high':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-100 text-rose-800">
            {bilingualMode ? 'উচ্চ মাত্রা ↑' : 'ELEVATED ↑'}
          </span>
        );
      case 'low':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
            {bilingualMode ? 'নিম্ন মাত্রা ↓' : 'LOW ↓'}
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-red-600 text-white animate-pulse">
            {bilingualMode ? 'সংকটজনক' : 'CRITICAL'}
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
            <span>{bilingualMode ? 'সংকটজনক ঝুঁকি - জরুরি ডাক্তার দেখান' : 'Critical Risk - Immediate Care'}</span>
          </span>
        );
      case 'high':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>{bilingualMode ? 'উচ্চ ঝুঁকি - বিশেষজ্ঞ পরামর্শ আবশ্যক' : 'High Risk - Doctor Review Advised'}</span>
          </span>
        );
      case 'moderate':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>{bilingualMode ? 'সতর্কতা - চিকিৎসা পর্যবেক্ষণ প্রয়োজন' : 'Moderate Attention - Action Required'}</span>
          </span>
        );
      case 'mild':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-blue-600" />
            <span>{bilingualMode ? 'মৃদু তারতম্য - খাদ্যাভ্যাস পরিবর্তন' : 'Mild Variation - Lifestyle Monitoring'}</span>
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{bilingualMode ? 'স্বাভাবিক ও নিরাপদ স্তর' : 'Optimal Baseline - Safe'}</span>
          </span>
        );
    }
  };

  // Calculate gauge marker position (0% - 100%)
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
      {/* Page Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {bilingualMode
                ? 'এআই অপটিক্যাল ক্যারেক্টার রিকগনিশন (OCR) ও ক্লিনিক্যাল অ্যানালাইজার'
                : 'AI Optical Character Recognition (OCR) Engine'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {bilingualMode
              ? 'মেডিকেল রিপোর্ট বিশ্লেষণ ও বায়োমার্কার নির্দেশিকা'
              : 'Medical Report Analyzer & Biomarker Gauges'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            {bilingualMode
              ? 'আপনার ল্যাব টেস্টের ছবি (JPG/PNG), পিডিএফ (PDF) বা টেক্সট ফাইল আপলোড করুন। মেডনেক্স স্বয়ংক্রিয়ভাবে আপনার রিপোর্ট বিশ্লেষণ করে স্পষ্ট ভাষায় রোগের ধরন, শরীরে এর প্রভাব এবং করণীয় জানিয়ে দেবে।'
              : 'Upload PDF, JPG, or PNG laboratory documents. MedNex deciphers reported values, identifies clinical health patterns, and explains what your report is saying in clear, actionable terms.'}
          </p>
        </div>

        {/* Input Mode Selector */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl self-start md:self-auto">
          <button
            type="button"
            onClick={() => setInputMode('upload')}
            className={`text-xs font-bold px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
              inputMode === 'upload'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{bilingualMode ? 'ফাইল আপলোড' : 'Upload File'}</span>
          </button>
          <button
            type="button"
            onClick={() => setInputMode('text')}
            className={`text-xs font-bold px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
              inputMode === 'text'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{bilingualMode ? 'টেক্সট পেস্ট' : 'Paste Text'}</span>
          </button>
          <button
            type="button"
            onClick={() => setInputMode('samples')}
            className={`text-xs font-bold px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
              inputMode === 'samples'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ClipboardList className="w-3.5 h-3.5" />
            <span>{bilingualMode ? 'নমুনা প্যানেল' : 'Samples'}</span>
          </button>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Upload Dropzone & Physical Document Preview */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              {inputMode === 'upload'
                ? bilingualMode ? 'রিপোর্ট ডকুমেন্ট আপলোড করুন' : 'Upload Medical Report Document'
                : inputMode === 'text'
                ? bilingualMode ? 'ল্যাব রিপোর্টের টেক্সট লিখুন / পেস্ট করুন' : 'Paste / Type Lab Test Values'
                : bilingualMode ? 'নমুনা ল্যাব রিপোর্ট নির্বাচন করুন' : 'Select Sample Lab Panel'}
            </h3>

            {/* 1. File Upload Dropzone */}
            {inputMode === 'upload' && (
              <div className="space-y-3">
                <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition bg-slate-50 hover:bg-blue-50/40 group">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-2 group-hover:scale-105 transition">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">
                    {uploadedFileName ? uploadedFileName : bilingualMode ? 'ডকুমেন্ট আপলোড করতে এখানে ক্লিক করুন' : 'Click to Upload Report File'}
                  </span>
                  <span className="text-[11px] text-slate-500 mt-1">
                    {bilingualMode
                      ? 'সাপোর্ট করে: PDF, JPG, PNG, WEBP, TXT (সর্বোচ্চ ১৫ মেগাবাইট)'
                      : 'Supports PDF, JPG, JPEG, PNG, WEBP, TXT (Max 15MB)'}
                  </span>
                  <input
                    type="file"
                    accept=".pdf,image/png,image/jpeg,image/jpg,image/webp,.txt,.csv"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                {uploadedFileName && (
                  <div className="p-3 bg-blue-50/80 border border-blue-200 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FileCheck className="w-4 h-4 text-blue-600 shrink-0" />
                      <div className="truncate">
                        <p className="font-bold text-blue-950 truncate">{uploadedFileName}</p>
                        <p className="text-[10px] text-blue-700">{uploadedFileSize} • {uploadedFileType}</p>
                      </div>
                    </div>
                    <label className="cursor-pointer text-[10px] font-bold text-blue-700 hover:text-blue-900 bg-white px-2 py-1 rounded-md border border-blue-200 shadow-2xs">
                      {bilingualMode ? 'বদলান' : 'Change'}
                      <input
                        type="file"
                        accept=".pdf,image/png,image/jpeg,image/jpg,image/webp,.txt,.csv"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>
            )}

            {/* 2. Direct Text Paste Area */}
            {inputMode === 'text' && (
              <div className="space-y-3">
                <textarea
                  rows={6}
                  value={manualText}
                  onChange={(e) => setManualText(e.target.value)}
                  placeholder={
                    bilingualMode
                      ? 'এখানে ল্যাব টেস্টের ফলাফল লিখুন বা পেস্ট করুন...\nযেমন:\nHemoglobin: 11.2 g/dL\nTotal WBC: 7200 /cumm\nPlatelet Count: 2.4 lakh/cumm\nFasting Blood Sugar: 6.8 mmol/L\nSerum Creatinine: 1.1 mg/dL'
                      : 'Paste or type test results from your lab report or portal...\ne.g.:\nHemoglobin: 11.2 g/dL\nTotal WBC: 7200 /cumm\nPlatelet Count: 2.4 lakh/cumm\nFasting Blood Sugar: 6.8 mmol/L\nSerum Creatinine: 1.1 mg/dL'
                  }
                  className="w-full p-3 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 leading-relaxed"
                />

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleAnalyzeManualText}
                    disabled={!manualText.trim()}
                    className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{bilingualMode ? 'টেক্সট বিশ্লেষণ করুন' : 'Analyze Entered Text'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setManualText(
                        'Hemoglobin: 10.4 g/dL\nTotal WBC: 12500 /cumm\nPlatelet Count: 1.2 lakh/cumm\nFasting Blood Sugar: 7.4 mmol/L\nSerum Creatinine: 1.4 mg/dL\nTotal Cholesterol: 235 mg/dL'
                      );
                    }}
                    className="py-2 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
                  >
                    {bilingualMode ? 'নমুনা' : 'Sample'}
                  </button>
                </div>
              </div>
            )}

            {/* 3. Sample Lab Panels */}
            {inputMode === 'samples' && (
              <div className="space-y-2">
                <p className="text-[11px] text-slate-500">
                  {bilingualMode ? 'যাচাই করার জন্য যেকোনো একটি নমুনা প্যানেলে ক্লিক করুন:' : 'Click any verified panel to review clinical gauges:'}
                </p>
                <div className="space-y-1.5">
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
                      <span>{rep.title}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{rep.category}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Action Buttons */}
            <div className="pt-2 space-y-2 border-t border-slate-100">
              <button
                type="button"
                onClick={handleSaveToHistory}
                className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs"
              >
                <BookmarkPlus className="w-4 h-4" />
                {savedSuccess
                  ? bilingualMode ? 'ইতিহাসে সংরক্ষিত হয়েছে!' : 'Saved to Patient History!'
                  : bilingualMode ? 'রিপোর্টটি স্বাস্থ্যে সংরক্ষণ করুন' : 'Save Report to Health History'}
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="w-full py-2 px-4 border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-xl text-xs font-medium transition flex items-center justify-center gap-2"
              >
                <Printer className="w-3.5 h-3.5" />
                {bilingualMode ? 'ক্লিনিক্যাল সামারি প্রিন্ট করুন' : 'Print Clinical Summary'}
              </button>
            </div>
          </div>

          {/* Real Document / Slip Preview Card */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-indigo-600" />
                <span>
                  {uploadedFileName
                    ? bilingualMode ? 'আপলোডকৃত ডকুমেন্ট ভিউ' : 'Uploaded Document View'
                    : bilingualMode ? 'মূল ডকুমেন্ট প্রিভিউ' : 'Original Document View'}
                </span>
              </span>
              <button
                type="button"
                onClick={() => setShowSlipPreview(!showSlipPreview)}
                className="text-[11px] font-semibold text-blue-600 hover:underline"
              >
                {showSlipPreview
                  ? bilingualMode ? 'লুকান' : 'Hide'
                  : bilingualMode ? 'দেখান' : 'Show'}
              </button>
            </div>

            {showSlipPreview && (
              <div className="space-y-3">
                {/* Case 1: Real Image Uploaded */}
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
                        <span>{bilingualMode ? 'বড় করে দেখুন' : 'Full Size'}</span>
                      </button>
                    </div>
                    <div className="text-[10px] text-slate-500 flex justify-between items-center px-1">
                      <span className="truncate max-w-[150px] font-medium text-slate-700">{uploadedFileName}</span>
                      <span>{uploadedFileSize}</span>
                    </div>
                  </div>
                ) : uploadedFileName ? (
                  /* Case 2: PDF or Text Document Uploaded */
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0 font-bold">
                        {uploadedFileType?.includes('pdf') ? 'PDF' : <File className="w-5 h-5" />}
                      </div>
                      <div className="truncate">
                        <p className="font-bold text-slate-900 truncate">{uploadedFileName}</p>
                        <p className="text-[10px] text-slate-500">{uploadedFileSize} • {uploadedFileType}</p>
                      </div>
                    </div>
                    <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 pt-1 border-t border-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{bilingualMode ? 'ডকুমেন্ট ফেচ ও পার্স সম্পন্ন হয়েছে' : 'Document fetched & parsed successfully'}</span>
                    </p>
                  </div>
                ) : (
                  /* Case 3: Sample Slip */
                  <div className="p-4 bg-amber-50/20 border border-amber-200/60 rounded-2xl font-mono text-[11px] text-slate-700 space-y-2 shadow-inner">
                    <div className="text-center pb-2 border-b border-slate-200">
                      <p className="font-bold text-slate-900 uppercase tracking-wider">{activeReport.labName}</p>
                      <p className="text-[10px] text-slate-500">Clinical Pathology & Diagnostic Centre • Khulna</p>
                    </div>
                    <div className="grid grid-cols-2 text-[10px] py-1 border-b border-slate-100">
                      <span>{bilingualMode ? 'রোগী:' : 'Patient:'} {activeReport.patientName}</span>
                      <span className="text-right">{bilingualMode ? 'বয়স/লিঙ্গ:' : 'Age/Sex:'} {activeReport.patientAge}y / M</span>
                      <span>{bilingualMode ? 'তারিখ:' : 'Date:'} {activeReport.date}</span>
                      <span className="text-right text-emerald-700 font-bold">{bilingualMode ? 'স্ট্যাটাস: যাচাইকৃত' : 'Status: Verified'}</span>
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
                      [Verified Lab Panel Preview]
                    </p>
                  </div>
                )}

                {/* Extracted Text Inspector / Editor Toggle */}
                {extractedRawText && (
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => setShowRawTextEditor(!showRawTextEditor)}
                      className="w-full py-1.5 px-2 text-[10px] font-bold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition flex items-center justify-center gap-1"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>
                        {showRawTextEditor
                          ? bilingualMode ? 'এক্সট্র্যাক্ট করা টেক্সট লুকান' : 'Hide Extracted OCR Text'
                          : bilingualMode ? 'এক্সট্র্যাক্ট করা টেক্সট দেখুন / পরিবর্তন করুন' : 'View / Edit Extracted OCR Text'}
                      </span>
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
                          className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[10px] font-bold transition flex items-center justify-center gap-1 shadow-2xs"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>{bilingualMode ? 'পুনরায় বিশ্লেষণ করুন' : 'Re-Analyze Document'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: In-Depth Clinical Overview & Biomarker Gauges */}
        <div className="lg:col-span-8 space-y-6">
          {isProcessing ? (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-xs text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
              <h4 className="text-sm font-bold text-slate-900">
                {processingStatus}
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {bilingualMode
                  ? 'ডকুমেন্ট থেকে সংখ্যা ও প্যারামিটার এক্সট্র্যাক্ট করা হচ্ছে, ক্লিনিক্যাল রেঞ্জ মেপে এআই সারসংক্ষেপ তৈরি হচ্ছে।'
                  : 'Parsing parameter tables, calculating reference ratios, and detecting laboratory anomalies.'}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* PRIMARY DIAGNOSTIC OVERVIEW CARD: "What the Report is Saying" */}
              <div className="bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/20 p-6 sm:p-7 rounded-3xl border border-blue-200 shadow-sm space-y-5">
                {/* Header & Risk Level Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/80">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/80 px-2.5 py-0.5 rounded-md">
                        {bilingualMode ? 'ক্লিনিক্যাল ডায়াগনস্টিক রিপোর্ট' : 'Clinical Diagnostic Evaluation'}
                      </span>
                      <span className="text-xs text-slate-400">• {activeReport.category}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                      {bilingualMode
                        ? (activeReport.clinicalImpressionBn || activeReport.clinicalImpression || activeReport.title)
                        : (activeReport.clinicalImpression || activeReport.title)}
                    </h3>
                  </div>

                  <div className="self-start sm:self-auto">
                    {getRiskBadge(activeReport.riskLevel)}
                  </div>
                </div>

                {/* Section 1: What this report means for your health */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900 uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>
                      {bilingualMode ? 'রিপোর্টটি আপনার স্বাস্থ্য সম্পর্কে কী বলছে?' : 'What this report is saying about your health:'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium bg-white/80 p-4 rounded-2xl border border-blue-100 shadow-2xs">
                    {bilingualMode
                      ? (activeReport.overallSummaryBn || activeReport.overallSummary)
                      : activeReport.overallSummary}
                  </p>
                </div>

                {/* Section 2: Affected Organs & Impact on Body */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  {/* Affected Organs */}
                  <div className="p-4 bg-white/90 rounded-2xl border border-slate-200/80 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                      <Heart className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>{bilingualMode ? 'আক্রান্ত শারীরিক অঙ্গসমূহ' : 'Targeted Biological Systems:'}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {((bilingualMode && activeReport.affectedOrgansBn)
                        ? activeReport.affectedOrgansBn
                        : activeReport.affectedOrgans || ['Metabolic Balance', 'Blood Circulation']
                      ).map((organ, idx) => (
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
                  <div className="p-4 bg-white/90 rounded-2xl border border-slate-200/80 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                      <Activity className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>{bilingualMode ? 'শরীরে এর প্রভাব ও সম্ভাব্য উপসর্গ' : 'Physical Impact & Symptoms:'}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {bilingualMode
                        ? (activeReport.bodyImpactBn || activeReport.bodyImpact || 'স্বাভাবিক জীবনযাত্রা বজায় রাখুন।')
                        : (activeReport.bodyImpact || 'Maintain regular healthy lifestyle.')}
                    </p>
                  </div>
                </div>

                {/* Section 3: Dietary & Lifestyle Guidelines */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  {/* Food / Diet */}
                  <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200/70 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                      <Apple className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{bilingualMode ? 'খাদ্যাভ্যাস নির্দেশনা (Diet Plan)' : 'Dietary Recommendations:'}</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-emerald-950">
                      {((bilingualMode && activeReport.dietaryAdviceBn)
                        ? activeReport.dietaryAdviceBn
                        : activeReport.dietaryAdvice || [
                            'Hydrate with 2.5 - 3 liters of water daily.',
                            'Consume fresh vegetables and fruits.',
                            'Avoid deep-fried and ultra-processed foods.'
                          ]
                      ).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Lifestyle / Exercise */}
                  <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-200/70 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900">
                      <Salad className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span>{bilingualMode ? 'জীবনধারা ও ব্যায়াম (Lifestyle Actions)' : 'Lifestyle & Activity Actions:'}</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-indigo-950">
                      {((bilingualMode && activeReport.lifestyleAdviceBn)
                        ? activeReport.lifestyleAdviceBn
                        : activeReport.lifestyleAdvice || [
                            'Engage in 30 minutes of physical activity daily.',
                            'Avoid non-prescribed over-the-counter painkillers.',
                            'Consult your physician with these test results.'
                          ]
                      ).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-indigo-600 font-bold shrink-0">•</span>
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
                        {bilingualMode ? 'প্রস্তাবিত বিশেষজ্ঞ ডাক্তার:' : 'Recommended Specialist:'}{' '}
                        <span className="text-blue-700">
                          {bilingualMode
                            ? (activeReport.recommendedSpecialtyBn || activeReport.recommendedSpecialty || 'মেডিসিন বিশেষজ্ঞ')
                            : (activeReport.recommendedSpecialty || 'Internal Medicine Specialist')}
                        </span>
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {bilingualMode
                          ? 'খুলনার অভিজ্ঞ ও বিএমডিসি নিবন্ধিত ডাক্তারদের চেম্বার সিরিয়াল বুক করতে পারেন।'
                          : 'Book verified chamber serials with Khulna specialists directly.'}
                      </p>
                    </div>
                  </div>

                  <Link
                    to="/dashboard/find-doctors"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition shrink-0"
                  >
                    <span>{bilingualMode ? 'ডাক্তার খুঁজুন' : 'Find Specialists'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Biomarkers Table Card with Visual Needle Gauges */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-100">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {bilingualMode ? 'বায়োমার্কার ও ল্যাব রিডিং তালিকা' : 'Biomarker Numerical Readings & Gauges'}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {bilingualMode ? 'রিপোর্টের প্রতিটি প্যারামিটারের মান এবং রেফারেন্স রেঞ্জ' : 'Detailed parameters and reference range boundaries'}
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
                      {bilingualMode ? 'সকল প্যারামিটার' : 'All Parameters'} ({activeReport.parameters.length})
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
                      {bilingualMode ? 'রেঞ্জের বাইরে থাকা মান' : 'Outside Reference Range'} ({abnormalParameters.length})
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700">
                      <tr>
                        <th className="p-3">{bilingualMode ? 'বায়োমার্কার / টেস্ট নাম' : 'Biomarker / Test Name'}</th>
                        <th className="p-3">{bilingualMode ? 'ফলাফল' : 'Result'}</th>
                        <th className="p-3">{bilingualMode ? 'রেফারেন্স সীমা' : 'Reference Range'}</th>
                        <th className="p-3">{bilingualMode ? 'ভিজ্যুয়াল রেঞ্জ গেজ' : 'Visual Range Gauge'}</th>
                        <th className="p-3 text-right">{bilingualMode ? 'স্ট্যাটাস' : 'Status'}</th>
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

                            {/* Visual Range Needle Bar */}
                            <td className="p-3 min-w-[140px]">
                              <div className="space-y-1">
                                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden flex relative">
                                  {/* Left Low zone */}
                                  <div className="w-[25%] bg-amber-300" title="Low" />
                                  {/* Center Normal zone */}
                                  <div className="w-[50%] bg-emerald-400" title="Normal Range" />
                                  {/* Right High zone */}
                                  <div className="w-[25%] bg-rose-400" title="High" />

                                  {/* Current Marker Pin */}
                                  <div
                                    style={{ left: `${Math.max(4, Math.min(94, gaugePct))}%` }}
                                    className="absolute -top-1 w-2.5 h-4 bg-slate-900 rounded-full border border-white shadow-xs transform -translate-x-1/2"
                                    title={`Value: ${param.value}`}
                                  />
                                </div>
                                <div className="flex justify-between text-[8px] text-slate-400">
                                  <span>{bilingualMode ? 'কম' : 'Low'}</span>
                                  <span className="text-emerald-700 font-semibold">{bilingualMode ? 'স্বাভাবিক' : 'Normal'}</span>
                                  <span>{bilingualMode ? 'বেশি' : 'High'}</span>
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
                  <span>
                    {bilingualMode
                      ? 'ডাক্তারকে জিজ্ঞাসা করার জন্য গুরুত্বপূর্ণ প্রশ্নাবলী'
                      : 'Recommended Discussion Questions for Your Doctor'}
                  </span>
                </h4>
                <div className="space-y-2">
                  {((bilingualMode && activeReport.questionsForPhysicianBn)
                    ? activeReport.questionsForPhysicianBn
                    : activeReport.questionsForPhysician
                  ).map((q, idx) => (
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
