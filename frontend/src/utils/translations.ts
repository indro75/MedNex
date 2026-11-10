/**
 * MedNex Translation Engine
 * Clear, simple, and easy-to-understand English for all patients and families.
 */

export type Language = 'en';

export const TRANSLATIONS = {
  en: {
    // Brand
    brandName: 'MedNex',
    brandTagline: 'Easy Healthcare Helper',
    connectedRegion: 'Connected Region: Khulna Division, Bangladesh',

    // Global Nav
    navHome: 'Home',
    navFeatures: 'Features',
    navHowItWorks: 'How It Works',
    navAbout: 'About Us',
    navLogin: 'Log In',
    navSignup: 'Sign Up',
    navGetStarted: 'Get Started',
    navEmergencyCall: 'Call 999 Emergency',
    emergencyDisclaimerBanner: 'Emergency Notice: If someone has severe chest pain, trouble breathing, stroke signs, or heavy bleeding, call 999 immediately.',

    // Sidebar
    sideOverview: 'Overview',
    sideSymptomChecker: 'Check Symptoms',
    sideFindDoctors: 'Find Doctors',
    sideFirstAid: 'First Aid Guide',
    sideReportAnalyzer: 'Test Report Helper',
    sideEmergency: 'Emergency Services',
    sideFitnessTracker: 'Healthy Weight & BMI',
    sideMedicineChecker: 'Medicine Checker',
    sideHealthHistory: 'My Health History',
    sideSettings: 'Settings',
    sideLogout: 'Log Out',
    sideEmergencyAssistance: 'Emergency 999',
    sideEmergencySubtext: 'Direct Ambulance & ER',

    // Page Titles
    titleOverview: 'My Health Overview',
    titleSymptomChecker: 'Check Symptoms & Find the Right Doctor',
    titleFindDoctors: 'Find Verified Doctors in Khulna',
    titleFirstAid: 'Step-by-Step First Aid Helper',
    titleReportAnalyzer: 'Medical Test Report Reader',
    titleEmergency: 'Emergency Ambulance & Hospital ERs',
    titleFitnessTracker: 'Healthy Weight & BMI Calculator',
    titleMedicineChecker: 'Check Medicines & Interactions',
    titleHealthHistory: 'My Saved Health Records',
    titleSettings: 'My Account & Profile',

    // Overview Page
    welcomeGreeting: 'Welcome back',
    overviewSubtitle: 'Your friendly healthcare helper for simple medical advice, doctor appointments, and emergency contacts in Khulna.',
    emergencyShortcut: 'Emergency 999 Help',
    statsCurrentBmi: 'Your BMI',
    statsBookedSerials: 'Active Appointments',
    statsAnalyzedReports: 'Checked Reports',
    statsTrackers: 'Saved Records',
    quickServices: 'Main Services',
    recentActivities: 'Recent Activities',
    viewAllHistory: 'View All Records',
    noActivitiesYet: 'No activity recorded yet. Check your symptoms or calculate your BMI to see your records here.',

    // Doctor Discovery
    searchDoctorsPlaceholder: 'Search by doctor name, specialty, or hospital...',
    allAreas: 'All Areas',
    allSpecialties: 'All Specialties',
    bmdcReg: 'BMDC Reg. No',
    chamber: 'Chamber Address',
    visitingHours: 'Visiting Hours',
    consultationFee: 'Doctor Fee',
    experienceYears: 'years experience',
    bookSerialBtn: 'Book Chamber Serial',
    viewOnMap: 'Chamber Location',
    modalBookTitle: 'Book an Appointment Serial',
    modalPatientName: 'Patient Full Name',
    modalPatientPhone: 'Contact Phone Number',
    modalPatientAge: 'Patient Age',
    modalAppointmentDate: 'Choose Date',
    modalSymptoms: 'Main Problem / Symptoms (Optional)',
    modalConfirmBtn: 'Confirm Appointment',
    modalCancelBtn: 'Cancel',
    ticketTitle: 'Appointment Confirmed',
    ticketSerialNo: 'Serial Number',
    ticketEstimatedTime: 'Approximate Time',
    ticketDoctor: 'Doctor',
    ticketReporting: 'Please reach the chamber 15 minutes before your time.',
    myBookedSerials: 'My Booked Appointments',
    availableDoctors: 'Verified Doctors in Khulna',

    // First Aid
    firstAidHeroTitle: 'Simple Emergency First Aid',
    firstAidHeroSub: 'Clear, easy-to-follow emergency steps and guidance to help someone before the doctor or ambulance arrives.',
    firstAidCategories: 'Choose an Emergency Situation',
    stepByStepInstructions: 'Step-by-Step Instructions',
    dosTitle: 'Helpful Things to Do (DOs)',
    dontsTitle: 'Things to Avoid (DON\'Ts)',
    clinicalTimer: 'Timer',
    timerStart: 'Start Timer',
    timerPause: 'Pause',
    timerReset: 'Reset',
    cprMetronomeTitle: 'Chest Compression Rhythm (110 BPM)',
    cprInstruction: 'Push down hard and fast in the center of the chest to the beat. 100 to 120 pushes each minute.',
    cprStart: 'Start Rhythm',
    cprStop: 'Stop Rhythm',
    whenToCall999: 'When to Call 999 Right Away',

    // Symptom Checker
    symptomStep1: 'Step 1: Pick where you feel pain or discomfort',
    symptomStep2: 'Step 2: Tell us in your own words what is happening',
    symptomStep3: 'Step 3: See simple advice and which doctor can help you best',
    frontView: 'Front Body',
    backView: 'Back Body',
    symptomInputPlaceholder: 'For example: I have had a bad headache and fever for 2 days, and my eyes hurt when looking at light...',
    symptomDuration: 'How long have you felt this way?',
    symptomSeverity: 'How bad is the pain or discomfort?',
    severityMild: 'Mild (I can still do my daily work)',
    severityModerate: 'Moderate (Makes it hard to work or sleep)',
    severitySevere: 'Severe (Very bad pain or distress)',
    medicalHistoryNotes: 'Other health conditions you have (Optional)',
    analyzeBtn: 'Check My Symptoms',
    analyzingText: 'Reading your symptoms and finding the best doctor specialty for you...',
    triageResultTitle: 'Symptom Review & Next Steps',
    recommendedSpecialty: 'Recommended Doctor Type',
    urgencyLevel: 'How Urgent Is This?',
    possibleCauses: 'Possible Causes',
    recommendedAction: 'What You Should Do Next',
    homeCareAdvice: 'Helpful Home Care Tips',
    redFlagAlert: 'URGENT WARNING: DANGER SIGNS DETECTED',
    matchedDoctorHeadline: 'Doctors in Khulna who treat this condition',

    // Report Analyzer
    reportUploadTitle: 'Understand Your Medical Test Report',
    reportUploadSub: 'Upload your lab test report (PDF, photo, or text) to get a clear, easy-to-understand explanation of your results.',
    dropzoneText: 'Drag and drop your medical report here, or click to choose a file',
    loadPresets: 'Try a Sample Report',
    biomarkersTitle: 'Your Test Numbers & What They Mean',
    normalRange: 'Normal Healthy Range',
    readingStatus: 'Status',
    statusNormal: 'Normal',
    statusLow: 'Low',
    statusHigh: 'High',
    statusCritical: 'Attention Needed',
    clinicalSummaryTitle: 'Simple Summary in Plain English',
    physicianQuestionsTitle: 'Questions You Can Ask Your Doctor',
    reportDisclaimer: 'Please note: This tool is meant to help you understand your report in simple words. It does not replace your doctor. Always show your reports to a licensed physician.',

    // Emergency Ambulance
    emergencyTitle: 'Khulna Ambulances & Hospital Emergency Rooms',
    emergencySub: 'Call national emergency 999 or reach verified 24/7 ambulances across Khulna with one tap.',
    call999Direct: 'Call 999 National Emergency',
    call999Sub: 'Police • Ambulance • Fire Service (24/7 Free Call)',
    ambulanceFleetTitle: 'Verified 24/7 Ambulances in Khulna',
    callNow: 'Call Now',
    icuAvailable: 'ICU Ambulance',
    oxygenAvailable: 'Oxygen Available',
    responseTime: 'Expected Arrival',
    hospitalsErTitle: '24/7 Hospital Emergency Rooms in Khulna',
    erOpen247: '24/7 Emergency Ward Open',
    generateSmsBtn: 'Copy Location Message to Send',
    smsCopied: 'Location message copied! You can now paste and send it.',

    // Fitness Tracker
    fitnessTitle: 'Healthy Weight & BMI Calculator',
    fitnessSub: 'Find out if your weight is in a healthy range, check how many calories you burn each day, and track your progress.',
    metricUnits: 'Metric (cm, kg)',
    imperialUnits: 'Feet, Inches & kg',
    ageLabel: 'Your Age (Years)',
    genderLabel: 'Gender',
    male: 'Male',
    female: 'Female',
    heightLabel: 'Height',
    weightLabel: 'Weight',
    calculateBmiBtn: 'Calculate My BMI',
    bmiCategoryTitle: 'Your Results',
    idealWeightRange: 'Healthy Weight Range for Your Height',
    bmrLabel: 'Resting Calories (BMR)',
    tdeeLabel: 'Daily Calorie Need (TDEE)',
    bmiChartTitle: 'Weight History Over Time',
    wellnessAdviceTitle: 'Easy Daily Habits for Better Health',

    // Medicine Checker
    medicineTitle: 'Medicine Information & Safety Checker',
    medicineSub: 'Look up common Bangladeshi medicines, see what they are used for, check side effects, and see if two medicines are safe to take together.',
    tabMedicineInfo: 'Search Medicines & Uses',
    tabDrugInteractions: 'Check If Two Medicines Mix Safely',
    searchMedicinePlaceholder: 'Search medicine name (like Napa, Seclo, Monas) or generic name...',
    medicineBrandName: 'Brand Name',
    genericName: 'Generic Name',
    therapeuticClass: 'Medicine Type',
    manufacturer: 'Company / Maker',
    priceBdt: 'Approximate Price',
    dosageForm: 'Type & Strength',
    indications: 'What It Is Used For',
    sideEffects: 'Common Side Effects',
    precautions: 'Important Warnings & Advice',
    pregnancyCategory: 'Pregnancy Safety',
    foodRelation: 'Take With or Without Food',
    interactionSelectPlaceholder: 'Choose two medicines to check if they are safe together...',
    interactionResultTitle: 'Medicine Interaction Check',
    noInteractionFound: 'Good news: No harmful interaction was found between these medicines.',

    // Health History
    historyTitle: 'My Health History',
    historySub: 'A safe record of your symptom checks, appointments, and test reports.',
    filterAll: 'All Records',
    exportJson: 'Download My Records (JSON)',
    clearHistory: 'Clear History',

    // Settings
    settingsTitle: 'My Profile & Account',
    settingsSub: 'Manage your name, phone, emergency contact, known allergies, and health conditions.',
    fullName: 'Full Name',
    emailAddress: 'Email Address',
    phoneNumber: 'Phone Number',
    bloodGroup: 'Blood Group',
    cityResidence: 'City',
    emergencyContactName: 'Emergency Contact Person',
    emergencyContactPhone: 'Emergency Contact Phone Number',
    allergiesLabel: 'Known Allergies (e.g. Penicillin, Dust, Prawn)',
    chronicConditionsLabel: 'Existing Health Conditions (e.g. High Blood Pressure, Diabetes)',
    saveSettingsBtn: 'Save Changes',
    settingsSavedNotice: 'Your profile has been saved successfully.',

    // Common Buttons & Badges
    save: 'Save',
    cancel: 'Cancel',
    close: 'Close',
  }
};

export function getTranslation(key: keyof typeof TRANSLATIONS.en, _lang?: Language): string {
  return TRANSLATIONS.en[key] || (key as string);
}

export function translateArea(area: string, _lang?: Language): string {
  return area;
}

export function translateSpecialty(specialty: string, _lang?: Language): string {
  return specialty;
}

export function translateBmiCategory(category: string, _lang?: Language): string {
  return category;
}
