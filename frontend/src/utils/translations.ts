/**
 * MedNex Complete Bilingual Translation Engine (English & বাংলা)
 * Provides comprehensive translation dictionary and reactive helper hook.
 */

export type Language = 'en' | 'bn';

export const TRANSLATIONS = {
  en: {
    // Existing keys...
    // ... (preserve existing) 
    // New Footer keys
    footerDescription: 'Your Health, Smarter. Your Care, Closer. An AI-powered healthcare companion making medical triage, verified doctor discovery, and emergency services accessible.',
    footerPrimaryDeployment: 'Primary Sample Deployment: Khulna, Bangladesh',
    footerEmergencyCall: 'National Emergency Call: 999 (24/7 Toll-free)',
    coreServicesHeading: 'Core Services',
    emergencySupportTitle: 'Emergency Support',
    emergencySupportMessage: 'If you or someone around you suffers from severe chest pain, breathing difficulty, or deep trauma, do not delay.',
    call999Button: 'Call 999 Hotline',
    medicalDisclaimerHeading: 'Medical Safety & Regulatory Disclaimer:',
    medicalDisclaimerText: 'MedNex is a healthcare assistance platform, not a replacement for professional medical diagnosis or treatment. AI-generated information may be inaccurate. Always consult a qualified healthcare professional for medical decisions. In an emergency, contact emergency services immediately. All doctor and facility information for Khulna is verified against official directories.',
    copyrightNotice: 'All rights reserved.',
    // Bengali translations (bn)
    bn: {
      brandName: 'মেডনেক্স',
      brandTagline: 'এআই স্বাস্থ্য সহায়ক',
      // Add Bengali equivalents for new keys
      footerDescription: 'আপনার স্বাস্থ্য, আরও বুদ্ধিমত্তায়। আপনার যত্ন, আরও কাছাকাছি। একটি এআই-চালিত স্বাস্থ্য সহায়ক যা চিকিৎসা ট্রায়াজ, যাচাইকৃত ডাক্তার অনুসন্ধান এবং জরুরি সেবা সহজ করে।',
      footerPrimaryDeployment: 'প্রাথমিক নমুনা মোতায়েন: খুলনা, বাংলাদেশ',
      footerEmergencyCall: 'জাতীয় জরুরি কল: ৯৯৯ (২৪/৭ টোল-ফ্রি)',
      coreServicesHeading: 'প্রধান সেবা',
      emergencySupportTitle: 'জরুরি সহায়তা',
      emergencySupportMessage: 'যদি আপনি বা আপনার চারপাশের কেউ তীব্র বুকে ব্যথা, শ্বাসকষ্ট বা গুরুতর আঘাত পান, দেরি করবেন না।',
      call999Button: '৯৯৯ হটলাইন কল করুন',
      medicalDisclaimerHeading: 'মেডিকেল সেফটি ও নিয়ন্ত্রক ডিসক্লেইমার:',
      medicalDisclaimerText: 'মেডনেক্স একটি স্বাস্থ্য সহায়ক প্ল্যাটফর্ম, পেশাদার মেডিকেল ডায়াগনোসিস বা চিকিৎসার বিকল্প নয়। এআই-উৎপন্ন তথ্য ভুল হতে পারে। চিকিৎসার সিদ্ধান্তের জন্য সর্বদা একজন যোগ্য স্বাস্থ্য পেশাদারের সঙ্গে পরামর্শ করুন। জরুরি অবস্থায়, সঙ্গে সঙ্গে জরুরি সেবা কল করুন। খুলনায় থাকা সকল ডাক্তার ও সুবিধার তথ্য অফিসিয়াল ডিরেক্টরি থেকে যাচাই করা আছে।',
      copyrightNotice: 'সর্বস্বত্ব সংরক্ষিত।',
    }
  }
}
  en: {
    // Brand
    brandName: 'MedNex',
    brandTagline: 'AI Healthcare Companion',
    connectedRegion: 'Connected Region: Khulna Division, Bangladesh',

    // Global Nav
    navHome: 'Home',
    navFeatures: 'Features',
    navHowItWorks: 'How It Works',
    navAbout: 'About Us',
    navLogin: 'Login',
    navSignup: 'Sign Up',
    navGetStarted: 'Get Started',
    navEmergencyCall: 'Call 999 Emergency',
    emergencyDisclaimerBanner: 'Emergency Notice: For crushing chest pain, stroke signs, or severe trauma, immediately call 999.',

    // Sidebar
    sideOverview: 'Overview',
    sideSymptomChecker: 'Symptom Checker',
    sideFindDoctors: 'Find Doctors',
    sideFirstAid: 'First Aid',
    sideReportAnalyzer: 'Report Analysis',
    sideEmergency: 'Emergency Services',
    sideFitnessTracker: 'Fitness Tracker',
    sideMedicineChecker: 'Medicine Checker',
    sideHealthHistory: 'Health History',
    sideSettings: 'Settings',
    sideLogout: 'Logout',
    sideEmergencyAssistance: 'Emergency 999',
    sideEmergencySubtext: 'Direct Ambulance & ER',

    // Page Titles
    titleOverview: 'Overview & Health Vitals',
    titleSymptomChecker: 'AI Symptom Checker & Triage',
    titleFindDoctors: 'Find Verified Khulna Specialists',
    titleFirstAid: 'AI First Aid Assistant',
    titleReportAnalyzer: 'Medical Report OCR Analyzer',
    titleEmergency: 'Emergency Ambulance & ER Directory',
    titleFitnessTracker: 'Daily Fitness & BMI Tracker',
    titleMedicineChecker: 'AI Medicine Information Checker',
    titleHealthHistory: 'Patient Health Timeline & Records',
    titleSettings: 'Account & Health Profile Settings',

    // Overview Page
    welcomeGreeting: 'Welcome back',
    overviewSubtitle: 'Your personalized AI healthcare companion & Khulna clinical triage system.',
    emergencyShortcut: 'Emergency 999 Help',
    statsCurrentBmi: 'Current BMI',
    statsBookedSerials: 'Active Serials',
    statsAnalyzedReports: 'Analyzed Reports',
    statsTrackers: 'Health Logs',
    quickServices: 'Core Healthcare Services',
    recentActivities: 'Recent Health Activities',
    viewAllHistory: 'View Full Timeline',
    noActivitiesYet: 'No activities recorded yet. Complete a symptom check or log your BMI to see history.',

    // Doctor Discovery
    searchDoctorsPlaceholder: 'Search by doctor name, hospital, or designation...',
    allAreas: 'All Areas',
    allSpecialties: 'All Specialties',
    bmdcReg: 'BMDC Reg. No',
    chamber: 'Chamber Address',
    visitingHours: 'Visiting Hours',
    consultationFee: 'Consultation Fee',
    experienceYears: 'years clinical experience',
    bookSerialBtn: 'Book Chamber Serial',
    viewOnMap: 'Chamber Location',
    modalBookTitle: 'Book Doctor Chamber Serial',
    modalPatientName: 'Patient Full Name',
    modalPatientPhone: 'Contact Number',
    modalPatientAge: 'Patient Age',
    modalAppointmentDate: 'Select Date',
    modalSymptoms: 'Primary Symptoms / Reason for visit (Optional)',
    modalConfirmBtn: 'Confirm Chamber Serial',
    modalCancelBtn: 'Cancel',
    ticketTitle: 'Chamber Serial Confirmation',
    ticketSerialNo: 'Serial Number',
    ticketEstimatedTime: 'Estimated Time',
    ticketDoctor: 'Attending Specialist',
    ticketReporting: 'Please arrive 15 minutes before your estimated time.',
    myBookedSerials: 'My Booked Serials',
    availableDoctors: 'Verified Doctors in Khulna',

    // First Aid
    firstAidHeroTitle: 'Clinical First Aid Assistant',
    firstAidHeroSub: 'Evidence-based emergency procedures, clinical countdown timers, and American Heart Association CPR metronome.',
    firstAidCategories: 'Select Emergency Protocol',
    stepByStepInstructions: 'Step-by-Step Instructions',
    dosTitle: 'Recommended Actions (DOs)',
    dontsTitle: 'Critical Warnings (DON\'Ts)',
    clinicalTimer: 'Clinical Timer',
    timerStart: 'Start Timer',
    timerPause: 'Pause',
    timerReset: 'Reset',
    cprMetronomeTitle: 'Audio CPR Metronome (110 BPM)',
    cprInstruction: 'Push hard and fast in the center of the chest to the beat. 100-120 compressions per minute.',
    cprStart: 'Start CPR Metronome',
    cprStop: 'Stop Metronome',
    whenToCall999: 'When to Immediately Call 999',

    // Symptom Checker
    symptomStep1: 'Step 1: Point to Pain / Body Region',
    symptomStep2: 'Step 2: Describe Symptoms in Natural Language',
    symptomStep3: 'Step 3: Clinical AI Triage & Doctor Recommendation',
    frontView: 'Front View',
    backView: 'Back View',
    symptomInputPlaceholder: 'e.g., I have been feeling burning stomach pain after meals and nausea for 2 days...',
    symptomDuration: 'Symptom Duration',
    symptomSeverity: 'Severity Level',
    severityMild: 'Mild (Manageable)',
    severityModerate: 'Moderate (Interfering with daily routine)',
    severitySevere: 'Severe (Intense pain / distressing)',
    medicalHistoryNotes: 'Existing Conditions / History (Optional)',
    analyzeBtn: 'Analyze Symptoms with AI',
    analyzingText: 'Processing clinical symptoms & NLP specialty classification...',
    triageResultTitle: 'Clinical Triage Evaluation',
    recommendedSpecialty: 'Recommended Specialist Category',
    urgencyLevel: 'Clinical Urgency Level',
    possibleCauses: 'Possible Differential Causes',
    recommendedAction: 'Recommended Clinical Action',
    homeCareAdvice: 'Home Care & Monitoring Instructions',
    redFlagAlert: 'EMERGENCY RED FLAG DETECTED',
    matchedDoctorHeadline: 'Verified Khulna Specialists for this Condition',

    // Report Analyzer
    reportUploadTitle: 'Upload Medical Diagnostic Report',
    reportUploadSub: 'Upload your lab report in PDF, JPG, or PNG format or test with verified clinical presets.',
    dropzoneText: 'Drag and drop your medical report here, or browse files',
    loadPresets: 'Load Verified Lab Presets',
    biomarkersTitle: 'Extracted Biomarkers & Reference Gauge',
    normalRange: 'Standard Normal Reference',
    readingStatus: 'Status',
    statusNormal: 'Normal',
    statusLow: 'Low',
    statusHigh: 'High',
    statusCritical: 'Critical',
    clinicalSummaryTitle: 'Plain-Language AI Interpretation',
    physicianQuestionsTitle: 'Questions to Ask Your Doctor',
    reportDisclaimer: 'Disclaimer: MedNex report analysis is an educational aid and does not constitute a diagnostic laboratory interpretation. Always consult a licensed physician.',

    // Emergency Ambulance
    emergencyTitle: 'Khulna Emergency Ambulance & Hospital Directory',
    emergencySub: 'One-touch national 999 hotline dispatch and verified 24/7 ICU ambulance fleet across Khulna.',
    call999Direct: 'Call 999 National Emergency',
    call999Sub: 'Police • Ambulance • Fire Service (24/7 Toll-Free)',
    ambulanceFleetTitle: 'Verified 24/7 Ambulance Fleet',
    callNow: 'Call Dispatcher',
    icuAvailable: 'ICU Mobile Unit',
    oxygenAvailable: 'Oxygen Onboard',
    responseTime: 'Est. Arrival',
    hospitalsErTitle: 'Khulna Emergency Trauma Departments',
    erOpen247: '24/7 Emergency Ward Active',
    generateSmsBtn: 'Generate Dispatch Location SMS',
    smsCopied: 'Location SMS copied to clipboard!',

    // Fitness Tracker
    fitnessTitle: 'Daily Fitness & Anthropometric Analytics',
    fitnessSub: 'Adult BMI categorization, basal metabolic rate calculation, and longitudinal progress tracking.',
    metricUnits: 'Metric (cm, kg)',
    imperialUnits: 'Imperial (ft, in, lbs)',
    ageLabel: 'Age (Years)',
    genderLabel: 'Biological Gender',
    male: 'Male',
    female: 'Female',
    heightLabel: 'Height',
    weightLabel: 'Current Weight',
    calculateBmiBtn: 'Calculate BMI & Log Progress',
    bmiCategoryTitle: 'Your Calculated Health Metrics',
    idealWeightRange: 'Ideal Weight Range',
    bmrLabel: 'Basal Metabolic Rate (BMR)',
    tdeeLabel: 'Total Daily Energy Expenditure (TDEE)',
    bmiChartTitle: 'Longitudinal Weight & BMI Trend',
    wellnessAdviceTitle: 'Personalized Lifestyle & Hydration Guidelines',

    // Medicine Checker
    medicineTitle: 'AI Medicine Information & Interaction Checker',
    medicineSub: 'Search verified Bangladeshi pharmaceuticals, inspect dosages and side effects, and verify multi-drug compatibility.',
    tabMedicineInfo: 'Medicine Directory & Safety',
    tabDrugInteractions: 'Drug-Drug Interaction Checker',
    searchMedicinePlaceholder: 'Search brand name (e.g. Napa Extra, Seclo, Monas) or generic molecule...',
    brandName: 'Brand Name',
    genericName: 'Generic Molecule',
    therapeuticClass: 'Therapeutic Class',
    manufacturer: 'Pharmaceutical Manufacturer',
    priceBdt: 'Unit Price',
    dosageForm: 'Dosage Form & Strength',
    indications: 'Approved Clinical Indications',
    sideEffects: 'Common Side Effects',
    precautions: 'Important Precautions & Warnings',
    pregnancyCategory: 'Pregnancy Category',
    foodRelation: 'Food Relation',
    interactionSelectPlaceholder: 'Select two or more medications to screen for adverse interactions...',
    interactionResultTitle: 'Drug-Drug Interaction Screening',
    noInteractionFound: 'No severe clinical interactions recorded between the selected medications.',

    // Health History
    historyTitle: 'Patient Health Timeline & Records',
    historySub: 'Chronological archive of symptom triage assessments, chamber serial bookings, report scans, and BMI logs.',
    filterAll: 'All Records',
    exportJson: 'Export Health Data (JSON)',
    clearHistory: 'Clear History',

    // Settings
    settingsTitle: 'Account & Clinical Profile Settings',
    settingsSub: 'Manage your personal demographics, emergency contacts, drug allergies, and chronic conditions.',
    fullName: 'Full Legal Name',
    emailAddress: 'Email Address',
    phoneNumber: 'Primary Phone Number',
    bloodGroup: 'Blood Group',
    cityResidence: 'City of Residence',
    emergencyContactName: 'Emergency Contact Person',
    emergencyContactPhone: 'Emergency Contact Phone',
    allergiesLabel: 'Known Allergies (e.g. Penicillin, Sulfa)',
    chronicConditionsLabel: 'Diagnosed Chronic Conditions (e.g. Hypertension, Diabetes)',
    saveSettingsBtn: 'Save Profile Changes',
    settingsSavedNotice: 'Your clinical profile has been updated successfully.',

    // Common Buttons & Badges
    save: 'Save',
    cancel: 'Cancel',
    close: 'Close',
    verifiedBadge: 'BMDC Verified',
    details: 'View Details',
    loading: 'Loading...'
  },

  bn: {
    // Brand
    brandName: 'মেডনেক্স',
    brandTagline: 'এআই স্বাস্থ্য সঙ্গী',
    connectedRegion: 'সংযুক্ত অঞ্চল: খুলনা বিভাগ, বাংলাদেশ',

    // Global Nav
    navHome: 'হোম',
    navFeatures: 'সেবা সমূহ',
    navHowItWorks: 'কীভাবে কাজ করে',
    navAbout: 'আমাদের সম্পর্কে',
    navLogin: 'লগইন',
    navSignup: 'নিবন্ধন',
    navGetStarted: 'শুরু করুন',
    navEmergencyCall: 'জরুরি কল ৯৯৯',
    emergencyDisclaimerBanner: 'জরুরি সতর্কতা: তীব্র বুকে ব্যথা, স্ট্রোকের লক্ষণ বা মারাত্মক দুর্ঘটনায় অনতিবিলম্বে ৯৯৯ নম্বরে কল করুন।',

    // Sidebar
    sideOverview: 'ওভারভিউ',
    sideSymptomChecker: 'লক্ষণ নিরীক্ষক',
    sideFindDoctors: 'ডাক্তার খুঁজুন',
    sideFirstAid: 'প্রাথমিক চিকিৎসা',
    sideReportAnalyzer: 'রিপোর্ট বিশ্লেষণ',
    sideEmergency: 'জরুরি অ্যাম্বুলেন্স',
    sideFitnessTracker: 'ফিটনেস ও বিএমআই',
    sideMedicineChecker: 'ওষুধ নির্দেশিকা',
    sideHealthHistory: 'স্বাস্থ্য ইতিহাস',
    sideSettings: 'সেটিংস',
    sideLogout: 'লগআউট',
    sideEmergencyAssistance: 'জরুরি ৯৯৯',
    sideEmergencySubtext: 'অ্যাম্বুলেন্স ও ইআর',

    // Page Titles
    titleOverview: 'ওভারভিউ ও গুরুত্বপূর্ণ স্বাস্থ্য তথ্য',
    titleSymptomChecker: 'এআই লক্ষণ নিরীক্ষণ ও ট্রায়াজ',
    titleFindDoctors: 'খুলনার যাচাইকৃত বিশেষজ্ঞ ডাক্তার',
    titleFirstAid: 'এআই প্রাথমিক চিকিৎসা সহায়ক',
    titleReportAnalyzer: 'মেডিকেল রিপোর্ট ওসিআর অ্যানালাইজার',
    titleEmergency: 'জরুরি অ্যাম্বুলেন্স ও ইআর ডিরেক্টরি',
    titleFitnessTracker: 'দৈনিক ফিটনেস ও বিএমআই ট্র্যাকার',
    titleMedicineChecker: 'এআই ওষুধ তথ্য ও সেফটি চেকার',
    titleHealthHistory: 'রোগীর স্বাস্থ্য ইতিহাস ও রেকর্ডস',
    titleSettings: 'অ্যাকাউন্ট ও স্বাস্থ্য প্রোফাইল সেটিংস',

    // Overview Page
    welcomeGreeting: 'স্বাগতম',
    overviewSubtitle: 'আপনার ব্যক্তিগত এআই স্বাস্থ্য সহকারী এবং খুলনা চিকিৎসা ট্রায়াজ প্ল্যাটফর্ম।',
    emergencyShortcut: 'জরুরি ৯৯৯ সেবা',
    statsCurrentBmi: 'বর্তমান বিএমআই',
    statsBookedSerials: 'বুক করা সিরিয়াল',
    statsAnalyzedReports: 'বিশ্লেষিত রিপোর্ট',
    statsTrackers: 'স্বাস্থ্য লগ',
    quickServices: 'প্রধান স্বাস্থ্য সেবা সমূহ',
    recentActivities: 'সাম্প্রতিক স্বাস্থ্য কার্যক্রম',
    viewAllHistory: 'সম্পূর্ণ ইতিহাস দেখুন',
    noActivitiesYet: 'এখনও কোনো স্বাস্থ্য কার্যক্রম রেকর্ড করা হয়নি। লক্ষণ পরীক্ষা করুন বা বিএমআই লগ করুন।',

    // Doctor Discovery
    searchDoctorsPlaceholder: 'ডাক্তারের নাম, হাসপাতাল বা বিভাগ লিখে খুঁজুন...',
    allAreas: 'সকল এলাকা',
    allSpecialties: 'সকল বিভাগ',
    bmdcReg: 'বিএমডিসি রেজি. নং',
    chamber: 'চেম্বার ঠিকানা',
    visitingHours: 'রোগী দেখার সময়',
    consultationFee: 'পরামর্শ ফি',
    experienceYears: 'বছরের ক্লিনিক্যাল অভিজ্ঞতা',
    bookSerialBtn: 'চেম্বার সিরিয়াল বুক করুন',
    viewOnMap: 'চেম্বারের অবস্থান',
    modalBookTitle: 'ডাক্তারের চেম্বার সিরিয়াল বুকিং',
    modalPatientName: 'রোগীর পূর্ণ নাম',
    modalPatientPhone: 'মোবাইল নম্বর',
    modalPatientAge: 'রোগীর বয়স',
    modalAppointmentDate: 'তারিখ নির্বাচন করুন',
    modalSymptoms: 'রোগের প্রধান লক্ষণ / পরিদর্শনের কারণ (ঐচ্ছিক)',
    modalConfirmBtn: 'সিরিয়াল নিশ্চিত করুন',
    modalCancelBtn: 'বাতিল',
    ticketTitle: 'চেম্বার সিরিয়াল নিশ্চিতকরণ স্লিপ',
    ticketSerialNo: 'সিরিয়াল নম্বর',
    ticketEstimatedTime: 'উপস্থিতির সম্ভাব্য সময়',
    ticketDoctor: 'বিশেষজ্ঞ চিকিৎসক',
    ticketReporting: 'অনুগ্রহ করে আনুমানিক সময়ের ১৫ মিনিট পূর্বে চেম্বারে উপস্থিত থাকুন।',
    myBookedSerials: 'আমার বুক করা সিরিয়াল সমূহ',
    availableDoctors: 'খুলনার যাচাইকৃত ডাক্তার তালিকা',

    // First Aid
    firstAidHeroTitle: 'ক্লিনিক্যাল প্রাথমিক চিকিৎসা নির্দেশিকা',
    firstAidHeroSub: 'প্রমাণ-ভিত্তিক জরুরি পদ্ধতি, ক্লিনিক্যাল টাইমার এবং আমেরিকান হার্ট অ্যাসোসিয়েশন মানসম্মত সিপিআর মেট্রোনোম।',
    firstAidCategories: 'জরুরি প্রটোকল নির্বাচন করুন',
    stepByStepInstructions: 'ধাপে ধাপে করণীয় নির্দেশনা',
    dosTitle: 'করণীয় পদক্ষেপ (DOs)',
    dontsTitle: 'মারাত্মক ভুল ও বর্জনীয় (DON\'Ts)',
    clinicalTimer: 'ক্লিনিক্যাল টাইমার',
    timerStart: 'টাইমার চালু করুন',
    timerPause: 'বিরতি',
    timerReset: 'রিসেট',
    cprMetronomeTitle: 'অডিও সিপিআর মেট্রোনোম (১১০ বিপিএম)',
    cprInstruction: 'বুকের ঠিক মাঝখানে তালে তালে শক্ত ও দ্রুত চাপ দিন। প্রতি মিনিটে ১০০-১২০ বার চাপ প্রয়োগ করুন।',
    cprStart: 'মেট্রোনোম চালু করুন',
    cprStop: 'মেট্রোনোম বন্ধ করুন',
    whenToCall999: 'কখন তাৎক্ষণিক ৯৯৯ নম্বরে কল করবেন',

    // Symptom Checker
    symptomStep1: 'ধাপ ১: ব্যথার স্থান / শারীরিক অঞ্চল নির্বাচন',
    symptomStep2: 'ধাপ ২: নিজের ভাষায় লক্ষণ বিস্তারিত লিখুন',
    symptomStep3: 'ধাপ ৩: ক্লিনিক্যাল এআই মূল্যায়ন ও ডাক্তার পরামর্শ',
    frontView: 'সামনের দিক',
    backView: 'পেছনের দিক',
    symptomInputPlaceholder: 'যেমন: গত দুই দিন ধরে খাওয়ার পর পেটের উপরিভাগে জ্বালাপোড়া এবং বমি বমি ভাব হচ্ছে...',
    symptomDuration: 'লক্ষণ কত দিন ধরে?',
    symptomSeverity: 'তীব্রতার মাত্রা',
    severityMild: 'হালকা (সহনীয়)',
    severityModerate: 'মাঝারি (স্বাভাবিক কাজে ব্যাঘাত ঘটছে)',
    severitySevere: 'তীব্র (অসহ্য যন্ত্রণা / সংকটজনক)',
    medicalHistoryNotes: 'পূর্বের রোগ বা চিকিৎসার ইতিহাস (ঐচ্ছিক)',
    analyzeBtn: 'এআই দিয়ে লক্ষণ বিশ্লেষণ করুন',
    analyzingText: 'ক্লিনিক্যাল লক্ষণ ও এনএলপি বিশেষজ্ঞ বিভাগ বিশ্লেষণ করা হচ্ছে...',
    triageResultTitle: 'ক্লিনিক্যাল ট্রায়াজ ফলাফল',
    recommendedSpecialty: 'প্রস্তাবিত বিশেষজ্ঞ বিভাগ',
    urgencyLevel: 'জরুরি মাত্রা',
    possibleCauses: 'সম্ভাব্য কারণ সমূহ',
    recommendedAction: 'প্রস্তাবিত চিকিৎসা পদক্ষেপ',
    homeCareAdvice: 'ঘরোয়া যত্ন ও পর্যবেক্ষণ পরামর্শ',
    redFlagAlert: 'জরুরি সতর্কতা সংকেত সনাক্ত হয়েছে',
    matchedDoctorHeadline: 'এই লক্ষণের জন্য খুলনার যাচাইকৃত বিশেষজ্ঞ ডাক্তার',

    // Report Analyzer
    reportUploadTitle: 'মেডিকেল ডায়াগনস্টিক রিপোর্ট আপলোড',
    reportUploadSub: 'আপনার ল্যাব রিপোর্ট PDF, JPG বা PNG ফরম্যাটে আপলোড করুন অথবা যাচাইকৃত নমুনা রিপোর্ট দিয়ে পরীক্ষা করুন।',
    dropzoneText: 'মেডিকেল রিপোর্ট ফাইল এখানে এনে ছেড়ে দিন অথবা ফাইল সিলেক্ট করুন',
    loadPresets: 'যাচাইকৃত নমুনা ল্যাব রিপোর্ট লোড করুন',
    biomarkersTitle: 'শনাক্তকৃত বায়োমার্কার ও স্ট্যান্ডার্ড স্কেল',
    normalRange: 'স্বাভাবিক স্বাস্থ্যকর মাত্রা',
    readingStatus: 'অবস্থা',
    statusNormal: 'স্বাভাবিক',
    statusLow: 'কম',
    statusHigh: 'বেশি',
    statusCritical: 'সংকটজনক',
    clinicalSummaryTitle: 'সহজ ভাষায় এআই ল্যাব বিশ্লেষণ',
    physicianQuestionsTitle: 'ডাক্তারকে জিজ্ঞেস করার মতো প্রশ্নাবলী',
    reportDisclaimer: 'সতর্কবার্তা: মেডনেক্স রিপোর্ট বিশ্লেষণ একটি শিক্ষামূলক সহায়ক ব্যবস্থা এবং সরাসরি ল্যাবরেটরি রোগ নির্ণয় নয়। সর্বদা একজন নিবন্ধিত চিকিৎসকের পরামর্শ নিন।',

    // Emergency Ambulance
    emergencyTitle: 'খুলনা জরুরি অ্যাম্বুলেন্স ও হাসপাতাল ডিরেক্টরি',
    emergencySub: 'এক স্পর্শে জাতীয় জরুরি হটলাইন ৯৯৯ এবং খুলনার সার্বক্ষণিক ২৪/৭ আইসিইউ অ্যাম্বুলেন্স বহর।',
    call999Direct: 'জাতীয় জরুরি হটলাইন ৯৯৯ এ কল করুন',
    call999Sub: 'পুলিশ • অ্যাম্বুলেন্স • ফায়ার সার্ভিস (২৪ ঘণ্টা টোল-ফ্রি)',
    ambulanceFleetTitle: 'যাচাইকৃত ২৪/৭ অ্যাম্বুলেন্স সার্ভিস',
    callNow: 'কল করুন',
    icuAvailable: 'আইসিইউ সুবিধা রয়েছে',
    oxygenAvailable: 'অক্সিজেন সরবরাহ রয়েছে',
    responseTime: 'পৌঁছানোর সম্ভাব্য সময়',
    hospitalsErTitle: 'খুলনার জরুরি ট্রমা ও ইমার্জেন্সি বিভাগ',
    erOpen247: '২৪/৭ জরুরি বিভাগ সক্রিয়',
    generateSmsBtn: 'লোকেশন সহ জরুরি ডিসপ্যাচ এসএমএস তৈরি করুন',
    smsCopied: 'জরুরি এসএমএস টেক্সট ক্লিপবোর্ডে কপি হয়েছে!',

    // Fitness Tracker
    fitnessTitle: 'দৈনিক ফিটনেস ও শরীরবৃত্তীয় বিশ্লেষণ',
    fitnessSub: 'প্রাপ্তবয়স্কদের বিএমআই শ্রেণিবিভাগ, বেসাল মেটাবলিক রেট ও ওজন পরিবর্তনের ধারাবাহিক ট্র্যাকিং।',
    metricUnits: 'মেট্রিক (সেমি, কেজি)',
    imperialUnits: 'ইম্পেরিয়াল (ফুট, ইঞ্চি, পাউন্ড)',
    ageLabel: 'বয়স (বছর)',
    genderLabel: 'লিঙ্গ',
    male: 'পুরুষ',
    female: 'নারী',
    heightLabel: 'উচ্চতা',
    weightLabel: 'বর্তমান ওজন',
    calculateBmiBtn: 'বিএমআই হিসাব ও ডাটা সংরক্ষণ করুন',
    bmiCategoryTitle: 'আপনার স্বাস্থ্য সূচক ও ফলাফল',
    idealWeightRange: 'আদর্শ ওজন সীমা',
    bmrLabel: 'মৌলিক ক্যালোরির চাহিদা (BMR)',
    tdeeLabel: 'দৈনিক মোট শক্তির খরচ (TDEE)',
    bmiChartTitle: 'সময়ের সাথে ওজন ও বিএমআই পরিবর্তনের চার্ট',
    wellnessAdviceTitle: 'ব্যক্তিগত জীবনধারা ও স্বাস্থ্য সুরক্ষা পরামর্শ',

    // Medicine Checker
    medicineTitle: 'এআই ওষুধ নির্দেশিকা ও ইন্টারঅ্যাকশন চেকার',
    medicineSub: 'বাংলাদেশের অনুমোদিত ওষুধ অনুসন্ধান, ডোজ ও পার্শ্বপ্রতিক্রিয়া যাচাই এবং একাধিক ওষুধের পার্শ্বক্রিয়া পরীক্ষা করুন।',
    tabMedicineInfo: 'ওষুধ তথ্য ও নিরাপত্তা নির্দেশিকা',
    tabDrugInteractions: 'ওষুধের পারস্পরিক ক্রিয়া (Drug Interaction)',
    searchMedicinePlaceholder: 'ওষুধের ব্র্যান্ড নাম (যেমন: Napa Extra, Seclo, Monas) বা জেনেরিক নাম লিখুন...',
    brandName: 'ব্র্যান্ডের নাম',
    genericName: 'জেনেরিক নাম',
    therapeuticClass: 'থেরাপিউটিক ক্লাস',
    manufacturer: 'প্রস্তুতকারক প্রতিষ্ঠান',
    priceBdt: 'প্রতি ইউনিটের দাম',
    dosageForm: 'ডোজ ফরম ও শক্তি',
    indications: 'যেসব রোগে ব্যবহার করা হয়',
    sideEffects: 'সাধারণ পার্শ্বপ্রতিক্রিয়া',
    precautions: 'গুরুত্বপূর্ণ সতর্কতা ও নিষেধাজ্ঞা',
    pregnancyCategory: 'গর্ভকালীন ব্যবহারের ক্যাটাগরি',
    foodRelation: 'খাবারের সাথে সেবনবিধি',
    interactionSelectPlaceholder: 'পারস্পরিক ক্ষতিকর প্রতিক্রিয়া দেখতে দুই বা ততোধিক ওষুধ নির্বাচন করুন...',
    interactionResultTitle: 'ড্রাগ-ড্রাগ ইন্টারঅ্যাকশন ফলাফল',
    noInteractionFound: 'নির্বাচিত ওষুধগুলোর মধ্যে কোনো মারাত্মক ক্ষতিকর প্রতিক্রিয়া পাওয়া যায়নি।',

    // Health History
    historyTitle: 'রোগীর স্বাস্থ্য ইতিহাস ও রেকর্ডস',
    historySub: 'লক্ষণ নিরীক্ষণ, চেম্বার সিরিয়াল বুকিং, ল্যাব রিপোর্ট এবং বিএমআই রেকর্ডের ধারাবাহিক তথ্য ভাণ্ডার।',
    filterAll: 'সকল রেকর্ড',
    exportJson: 'ডাটা এক্সপোর্ট (JSON)',
    clearHistory: 'ইতিহাস মুছুন',

    // Settings
    settingsTitle: 'অ্যাকাউন্ট ও ক্লিনিক্যাল প্রোফাইল সেটিংস',
    settingsSub: 'আপনার ব্যক্তিগত তথ্য, জরুরি যোগাযোগ, ওষুধের অ্যালার্জি এবং দীর্ঘস্থায়ী রোগ সংক্রান্ত তথ্য পরিচালনা করুন।',
    fullName: 'পূর্ণ নাম',
    emailAddress: 'ইমেইল ঠিকানা',
    phoneNumber: 'প্রাথমিক মোবাইল নম্বর',
    bloodGroup: 'রক্তের গ্রুপ',
    cityResidence: 'বসবাসের শহর',
    emergencyContactName: 'জরুরি যোগাযোগের ব্যক্তি',
    emergencyContactPhone: 'জরুরি ব্যক্তির ফোন নম্বর',
    allergiesLabel: 'অ্যালার্জি সমূহ (যেমন: পেনিসিলিন, ডাস্ট মাইট)',
    chronicConditionsLabel: 'দীর্ঘস্থায়ী রোগ সমূহ (যেমন: উচ্চ রক্তচাপ, ডায়াবেটিস)',
    saveSettingsBtn: 'প্রোফাইল পরিবর্তন সংরক্ষণ করুন',
    settingsSavedNotice: 'আপনার স্বাস্থ্য প্রোফাইল সফলভাবে আপডেট করা হয়েছে।',

    // Common Buttons & Badges
    save: 'সংরক্ষণ',
    cancel: 'বাতিল',
    close: 'বন্ধ করুন',
    verifiedBadge: 'বিএমডিসি যাচাইকৃত',
    details: 'বিস্তারিত দেখুন',
    loading: 'লোড হচ্ছে...'
  }
,
  bn: {
    brandName: 'মেডনেক্স',
    brandTagline: 'এআই স্বাস্থ্য সহায়ক',
    footerDescription: 'আপনার স্বাস্থ্য, আরও বুদ্ধিমত্তায়। আপনার যত্ন, আরও কাছাকাছি। একটি এআই-চালিত স্বাস্থ্য সহায়ক যা চিকিৎসা ট্রায়াজ, যাচাইকৃত ডাক্তার অনুসন্ধান এবং জরুরি সেবা সহজ করে।',
    footerPrimaryDeployment: 'প্রাথমিক নমুনা মোতায়েন: খুলনা, বাংলাদেশ',
    footerEmergencyCall: 'জাতীয় জরুরি কল: ৯৯৯ (২৪/৭ টোল-ফ্রি)',
    coreServicesHeading: 'প্রধান সেবা',
    emergencySupportTitle: 'জরুরি সহায়তা',
    emergencySupportMessage: 'যদি আপনি বা আপনার চারপাশের কেউ তীব্র বুকে ব্যথা, শ্বাসকষ্ট বা গুরুতর আঘাত পান, দেরি করবেন না।',
    call999Button: '৯৯৯ হটলাইন কল করুন',
    medicalDisclaimerHeading: 'মেডিকেল সেফটি ও নিয়ন্ত্রক ডিসক্লেইমার:',
    medicalDisclaimerText: 'মেডনেক্স একটি স্বাস্থ্য সহায়ক প্ল্যাটফর্ম, পেশাদার মেডিকেল ডায়াগনোসিস বা চিকিৎসার বিকল্প নয়। এআই-উৎপন্ন তথ্য ভুল হতে পারে। চিকিৎসার সিদ্ধান্তের জন্য সর্বদা একজন যোগ্য স্বাস্থ্য পেশাদারের সঙ্গে পরামর্শ করুন। জরুরি অবস্থায়, সঙ্গে সঙ্গে জরুরি সেবা কল করুন। খুলনায় থাকা সকল ডাক্তার ও সুবিধার তথ্য অফিসিয়াল ডিরেক্টরি থেকে যাচাই করা আছে।',
    copyrightNotice: 'সর্বস্বত্ব সংরক্ষিত।'
  }
};

export const AREA_TRANSLATIONS: Record<string, string> = {
  'All Areas': 'সকল এলাকা',
  'Khulna Sadar': 'খুলনা সদর',
  'Sonadanga': 'সোনাডাঙ্গা',
  'Khalishpur': 'খালিশপুর',
  'Daulatpur': 'দৌলতপুর',
  'Boyra': 'বয়রা',
  'Khan Jahan Ali': 'খান জাহান আলী',
  'Rupsha': 'রূপসা',
  'Gollamari': 'গল্লামারি'
,
  bn: {
    brandName: 'মেডনেক্স',
    brandTagline: 'এআই স্বাস্থ্য সহায়ক',
    footerDescription: 'আপনার স্বাস্থ্য, আরও বুদ্ধিমত্তায়। আপনার যত্ন, আরও কাছাকাছি। একটি এআই-চালিত স্বাস্থ্য সহায়ক যা চিকিৎসা ট্রায়াজ, যাচাইকৃত ডাক্তার অনুসন্ধান এবং জরুরি সেবা সহজ করে।',
    footerPrimaryDeployment: 'প্রাথমিক নমুনা মোতায়েন: খুলনা, বাংলাদেশ',
    footerEmergencyCall: 'জাতীয় জরুরি কল: ৯৯৯ (২৪/৭ টোল-ফ্রি)',
    coreServicesHeading: 'প্রধান সেবা',
    emergencySupportTitle: 'জরুরি সহায়তা',
    emergencySupportMessage: 'যদি আপনি বা আপনার চারপাশের কেউ তীব্র বুকে ব্যথা, শ্বাসকষ্ট বা গুরুতর আঘাত পান, দেরি করবেন না।',
    call999Button: '৯৯৯ হটলাইন কল করুন',
    medicalDisclaimerHeading: 'মেডিকেল সেফটি ও নিয়ন্ত্রক ডিসক্লেইমার:',
    medicalDisclaimerText: 'মেডনেক্স একটি স্বাস্থ্য সহায়ক প্ল্যাটফর্ম, পেশাদার মেডিকেল ডায়াগনোসিস বা চিকিৎসার বিকল্প নয়। এআই-উৎপন্ন তথ্য ভুল হতে পারে। চিকিৎসার সিদ্ধান্তের জন্য সর্বদা একজন যোগ্য স্বাস্থ্য পেশাদারের সঙ্গে পরামর্শ করুন। জরুরি অবস্থায়, সঙ্গে সঙ্গে জরুরি সেবা কল করুন। খুলনায় থাকা সকল ডাক্তার ও সুবিধার তথ্য অফিসিয়াল ডিরেক্টরি থেকে যাচাই করা আছে।',
    copyrightNotice: 'সর্বস্বত্ব সংরক্ষিত।'
  }
};

export const SPECIALTY_TRANSLATIONS: Record<string, string> = {
  'All Specialties': 'সকল বিভাগ',
  'Cardiology': 'কার্ডিওলজি (হৃদরোগ)',
  'Medicine': 'মেডিসিন (সাধারণ রোগ)',
  'Neurology': 'নিউরোলজি (মস্তিষ্ক ও স্নায়ু)',
  'Pediatrics': 'শিশু রোগ',
  'Orthopedics': 'অর্থোপেডিকস (হাড় ও জোড়া)',
  'Gynecology & Obstetrics': 'স্ত্রীরোগ ও প্রসূতিবিদ্যা',
  'Gastroenterology': 'গ্যাস্ট্রোএন্টারোলজি (পরিপাকতন্ত্র)',
  'Pulmonology / Chest': 'পালমোনোলজি (বক্ষব্যাধি ও ফুসফুস)',
  'Nephrology': 'নেফ্রোলজি (কিডনি রোগ)',
  'Dermatology': 'ডার্মাটোলজি (চর্ম ও যৌন)',
  'General Surgery': 'জেনারেল সার্জারি'
,
  bn: {
    brandName: 'মেডনেক্স',
    brandTagline: 'এআই স্বাস্থ্য সহায়ক',
    footerDescription: 'আপনার স্বাস্থ্য, আরও বুদ্ধিমত্তায়। আপনার যত্ন, আরও কাছাকাছি। একটি এআই-চালিত স্বাস্থ্য সহায়ক যা চিকিৎসা ট্রায়াজ, যাচাইকৃত ডাক্তার অনুসন্ধান এবং জরুরি সেবা সহজ করে।',
    footerPrimaryDeployment: 'প্রাথমিক নমুনা মোতায়েন: খুলনা, বাংলাদেশ',
    footerEmergencyCall: 'জাতীয় জরুরি কল: ৯৯৯ (২৪/৭ টোল-ফ্রি)',
    coreServicesHeading: 'প্রধান সেবা',
    emergencySupportTitle: 'জরুরি সহায়তা',
    emergencySupportMessage: 'যদি আপনি বা আপনার চারপাশের কেউ তীব্র বুকে ব্যথা, শ্বাসকষ্ট বা গুরুতর আঘাত পান, দেরি করবেন না।',
    call999Button: '৯৯৯ হটলাইন কল করুন',
    medicalDisclaimerHeading: 'মেডিকেল সেফটি ও নিয়ন্ত্রক ডিসক্লেইমার:',
    medicalDisclaimerText: 'মেডনেক্স একটি স্বাস্থ্য সহায়ক প্ল্যাটফর্ম, পেশাদার মেডিকেল ডায়াগনোসিস বা চিকিৎসার বিকল্প নয়। এআই-উৎপন্ন তথ্য ভুল হতে পারে। চিকিৎসার সিদ্ধান্তের জন্য সর্বদা একজন যোগ্য স্বাস্থ্য পেশাদারের সঙ্গে পরামর্শ করুন। জরুরি অবস্থায়, সঙ্গে সঙ্গে জরুরি সেবা কল করুন। খুলনায় থাকা সকল ডাক্তার ও সুবিধার তথ্য অফিসিয়াল ডিরেক্টরি থেকে যাচাই করা আছে।',
    copyrightNotice: 'সর্বস্বত্ব সংরক্ষিত।'
  }
};

export const BMI_CATEGORY_TRANSLATIONS: Record<string, string> = {
  'Underweight': 'স্বাভাবিকের চেয়ে কম ওজন',
  'Normal weight': 'স্বাভাবিক ও স্বাস্থ্যকর ওজন',
  'Overweight': 'অতিরিক্ত ওজন',
  'Obesity': 'স্থূলতা'
,
  bn: {
    brandName: 'মেডনেক্স',
    brandTagline: 'এআই স্বাস্থ্য সহায়ক',
    footerDescription: 'আপনার স্বাস্থ্য, আরও বুদ্ধিমত্তায়। আপনার যত্ন, আরও কাছাকাছি। একটি এআই-চালিত স্বাস্থ্য সহায়ক যা চিকিৎসা ট্রায়াজ, যাচাইকৃত ডাক্তার অনুসন্ধান এবং জরুরি সেবা সহজ করে।',
    footerPrimaryDeployment: 'প্রাথমিক নমুনা মোতায়েন: খুলনা, বাংলাদেশ',
    footerEmergencyCall: 'জাতীয় জরুরি কল: ৯৯৯ (২৪/৭ টোল-ফ্রি)',
    coreServicesHeading: 'প্রধান সেবা',
    emergencySupportTitle: 'জরুরি সহায়তা',
    emergencySupportMessage: 'যদি আপনি বা আপনার চারপাশের কেউ তীব্র বুকে ব্যথা, শ্বাসকষ্ট বা গুরুতর আঘাত পান, দেরি করবেন না।',
    call999Button: '৯৯৯ হটলাইন কল করুন',
    medicalDisclaimerHeading: 'মেডিকেল সেফটি ও নিয়ন্ত্রক ডিসক্লেইমার:',
    medicalDisclaimerText: 'মেডনেক্স একটি স্বাস্থ্য সহায়ক প্ল্যাটফর্ম, পেশাদার মেডিকেল ডায়াগনোসিস বা চিকিৎসার বিকল্প নয়। এআই-উৎপন্ন তথ্য ভুল হতে পারে। চিকিৎসার সিদ্ধান্তের জন্য সর্বদা একজন যোগ্য স্বাস্থ্য পেশাদারের সঙ্গে পরামর্শ করুন। জরুরি অবস্থায়, সঙ্গে সঙ্গে জরুরি সেবা কল করুন। খুলনায় থাকা সকল ডাক্তার ও সুবিধার তথ্য অফিসিয়াল ডিরেক্টরি থেকে যাচাই করা আছে।',
    copyrightNotice: 'সর্বস্বত্ব সংরক্ষিত।'
  }
};

export const FIRST_AID_CATEGORY_TRANSLATIONS: Record<string, string> = {
  'Minor Burns': 'আগুনে পোড়া',
  'Cuts & Bleeding': 'কাটাছেঁড়া ও রক্তপাত',
  'Choking (Heimlich)': 'গলায় কিছু আটকে যাওয়া',
  'Nosebleeds': 'নাক দিয়ে রক্ত পড়া',
  'Sprains & Strains (R.I.C.E.)': 'মচকে যাওয়া ও পেশির টান',
  'Fainting & Syncope': 'অজ্ঞান হয়ে যাওয়া',
  'Heat Stroke & Exhaustion': 'হিট স্ট্রোক ও অতিরিক্ত গরম',
  'Snake & Animal Bites': 'সাপ ও প্রাণীর কামড়'
,
  bn: {
    brandName: 'মেডনেক্স',
    brandTagline: 'এআই স্বাস্থ্য সহায়ক',
    footerDescription: 'আপনার স্বাস্থ্য, আরও বুদ্ধিমত্তায়। আপনার যত্ন, আরও কাছাকাছি। একটি এআই-চালিত স্বাস্থ্য সহায়ক যা চিকিৎসা ট্রায়াজ, যাচাইকৃত ডাক্তার অনুসন্ধান এবং জরুরি সেবা সহজ করে।',
    footerPrimaryDeployment: 'প্রাথমিক নমুনা মোতায়েন: খুলনা, বাংলাদেশ',
    footerEmergencyCall: 'জাতীয় জরুরি কল: ৯৯৯ (২৪/৭ টোল-ফ্রি)',
    coreServicesHeading: 'প্রধান সেবা',
    emergencySupportTitle: 'জরুরি সহায়তা',
    emergencySupportMessage: 'যদি আপনি বা আপনার চারপাশের কেউ তীব্র বুকে ব্যথা, শ্বাসকষ্ট বা গুরুতর আঘাত পান, দেরি করবেন না।',
    call999Button: '৯৯৯ হটলাইন কল করুন',
    medicalDisclaimerHeading: 'মেডিকেল সেফটি ও নিয়ন্ত্রক ডিসক্লেইমার:',
    medicalDisclaimerText: 'মেডনেক্স একটি স্বাস্থ্য সহায়ক প্ল্যাটফর্ম, পেশাদার মেডিকেল ডায়াগনোসিস বা চিকিৎসার বিকল্প নয়। এআই-উৎপন্ন তথ্য ভুল হতে পারে। চিকিৎসার সিদ্ধান্তের জন্য সর্বদা একজন যোগ্য স্বাস্থ্য পেশাদারের সঙ্গে পরামর্শ করুন। জরুরি অবস্থায়, সঙ্গে সঙ্গে জরুরি সেবা কল করুন। খুলনায় থাকা সকল ডাক্তার ও সুবিধার তথ্য অফিসিয়াল ডিরেক্টরি থেকে যাচাই করা আছে।',
    copyrightNotice: 'সর্বস্বত্ব সংরক্ষিত।'
  }
};

export function getTranslation(key: keyof typeof TRANSLATIONS.en, lang: Language): string {
  return TRANSLATIONS[lang]?.[key] || TRANSLATIONS.en[key] || (key as string);
}

export function translateArea(area: string, lang: Language): string {
  if (lang === 'bn') {
    return AREA_TRANSLATIONS[area] || area;
  }
  return area;
}

export function translateSpecialty(specialty: string, lang: Language): string {
  if (lang === 'bn') {
    return SPECIALTY_TRANSLATIONS[specialty] || specialty;
  }
  return specialty;
}

export function translateBmiCategory(category: string, lang: Language): string {
  if (lang === 'bn') {
    return BMI_CATEGORY_TRANSLATIONS[category] || category;
  }
  return category;
}

