import { SymptomAnalysisResult, UrgencyLevel } from '../types';

export interface PredefinedSymptom {
  id: string;
  label: string;
  labelBn: string;
  bodyPart: 'head' | 'chest' | 'abdomen' | 'limbs' | 'back' | 'systemic' | 'skin';
  isRedFlag: boolean;
}

export const PREDEFINED_SYMPTOMS: PredefinedSymptom[] = [
  // Head & Neck
  { id: 'headache_severe', label: 'Severe / Sudden Thunderclap Headache', labelBn: 'তীব্র / হঠাৎ অসহ্য মাথাব্যথা (বজ্রপাতের মতো)', bodyPart: 'head', isRedFlag: true },
  { id: 'facial_droop', label: 'Facial Drooping or Slurred Speech', labelBn: 'মুখ বেঁকে যাওয়া বা কথা জড়িয়ে যাওয়া', bodyPart: 'head', isRedFlag: true },
  { id: 'vision_blur', label: 'Sudden Vision Loss / Double Vision', labelBn: 'হঠাৎ দৃষ্টিশক্তি হ্রাস / এক জিনিস দুটি দেখা', bodyPart: 'head', isRedFlag: true },
  { id: 'dizziness', label: 'Dizziness or Vertigo', labelBn: 'মাথা ঘোরানো বা ভারসাম্যহীনতা', bodyPart: 'head', isRedFlag: false },
  { id: 'headache_throbbing', label: 'Throbbing / One-sided Headache', labelBn: 'একপাশে দপদপ করা মাথাব্যথা (মাইগ্রেন)', bodyPart: 'head', isRedFlag: false },
  { id: 'sore_throat', label: 'Sore Throat & Difficulty Swallowing', labelBn: 'গলাব্যথা ও খাবার গিলতে কষ্ট', bodyPart: 'head', isRedFlag: false },

  // Chest & Heart
  { id: 'chest_pain_severe', label: 'Crushing Chest Pain / Pressure', labelBn: 'বুকে তীব্র চাপ ও পিষে ফেলার মতো ব্যথা', bodyPart: 'chest', isRedFlag: true },
  { id: 'chest_pain_left', label: 'Left-sided Chest Pain radiating to Arm/Jaw', labelBn: 'বুকের বাম পাশের ব্যথা যা হাত বা চোয়ালে ছড়ায়', bodyPart: 'chest', isRedFlag: true },
  { id: 'shortness_of_breath', label: 'Severe Breathlessness / Air Hunger', labelBn: 'তীব্র শ্বাসকষ্ট / দম আটকে আসা', bodyPart: 'chest', isRedFlag: true },
  { id: 'palpitations', label: 'Rapid Palpitations or Racing Heartbeat', labelBn: 'দ্রুত বুক ধড়ফড় করা বা অনিয়মিত হৃদস্পন্দন', bodyPart: 'chest', isRedFlag: false },
  { id: 'chronic_cough', label: 'Persistent Dry or Productive Cough', labelBn: 'টানা দীর্ঘদিনের শুকনো বা কফযুক্ত কাশি', bodyPart: 'chest', isRedFlag: false },
  { id: 'wheezing', label: 'Wheezing or Whistling Breath Sound', labelBn: 'শ্বাস নেওয়ার সময় বাঁশির মতো শব্দ (হাঁপানি)', bodyPart: 'chest', isRedFlag: false },

  // Abdomen & Digestion
  { id: 'severe_abdo_pain', label: 'Severe Sudden Abdominal Pain (Rigid / Tender)', labelBn: 'পেটে তীব্র হঠাৎ অসহ্য ব্যথা (পেট শক্ত হয়ে যাওয়া)', bodyPart: 'abdomen', isRedFlag: true },
  { id: 'vomiting_blood', label: 'Vomiting Blood or Black Coffee-ground Emesis', labelBn: 'রক্তবমি বা কালচে কফির দানার মতো বমি', bodyPart: 'abdomen', isRedFlag: true },
  { id: 'heartburn_acid', label: 'Burning Sensation in Chest / Acid Reflux', labelBn: 'বুকজ্বালা / টক ঢেকুর / এসিডিটি', bodyPart: 'abdomen', isRedFlag: false },
  { id: 'nausea_vomiting', label: 'Nausea and Occasional Vomiting', labelBn: 'বমি বমি ভাব ও বমি হওয়া', bodyPart: 'abdomen', isRedFlag: false },
  { id: 'diarrhea', label: 'Frequent Loose Watery Stools', labelBn: 'ঘন ঘন পাতলা পায়খানা বা ডায়রিয়া', bodyPart: 'abdomen', isRedFlag: false },
  { id: 'jaundice_eyes', label: 'Yellowing of Eyes / Skin (Jaundice)', labelBn: 'চোখ বা ত্বক হলুদ হয়ে যাওয়া (জন্ডিস)', bodyPart: 'abdomen', isRedFlag: false },

  // Limbs & Joints
  { id: 'arm_weakness', label: 'Sudden One-sided Arm or Leg Weakness / Numbness', labelBn: 'হঠাৎ শরীরের একপাশের হাত বা পা দুর্বল/অবশ হওয়া', bodyPart: 'limbs', isRedFlag: true },
  { id: 'joint_swelling', label: 'Swollen, Painful, or Warm Knee / Ankle Joint', labelBn: 'হাঁটু বা গোড়ালির জয়েন্ট ফুলে যাওয়া ও তীব্র ব্যথা', bodyPart: 'limbs', isRedFlag: false },
  { id: 'leg_cramps', label: 'Calf Pain or Muscle Cramps', labelBn: 'পায়ের মাংসপেশীতে টান লাগা বা তীব্র খিঁচুনি', bodyPart: 'limbs', isRedFlag: false },
  { id: 'finger_numbness', label: 'Tingling or Numbness in Hands or Feet', labelBn: 'হাত বা পায়ের আঙুলে ঝিমঝিম বা অবশ ভাব', bodyPart: 'limbs', isRedFlag: false },

  // Back & Spine
  { id: 'lower_back_pain', label: 'Lower Back Ache / Stiffness', labelBn: 'কোমরে বা পিঠের নিচের অংশে তীব্র ব্যথা ও শক্ত ভাব', bodyPart: 'back', isRedFlag: false },
  { id: 'back_radiating_leg', label: 'Shooting Pain from Back Down into Leg (Sciatica)', labelBn: 'কোমর থেকে পায়ের দিকে নেমে যাওয়া তীব্র চিনচিনে ব্যথা (সায়াটিকা)', bodyPart: 'back', isRedFlag: false },
  { id: 'neck_stiffness_fever', label: 'Severe Neck Stiffness with High Fever', labelBn: 'তীব্র ঘাড় শক্ত হয়ে যাওয়া ও প্রচণ্ড জ্বর', bodyPart: 'back', isRedFlag: true },

  // Systemic
  { id: 'high_fever_chills', label: 'High Fever (>102°F) with Chills', labelBn: 'প্রচণ্ড জ্বর (১০২°F এর বেশি) ও কাঁপুনী', bodyPart: 'systemic', isRedFlag: false },
  { id: 'unexplained_weight_loss', label: 'Unexplained Rapid Weight Loss', labelBn: 'অকারণে খুব দ্রুত ওজন হ্রাস পাওয়া', bodyPart: 'systemic', isRedFlag: false },
  { id: 'extreme_fatigue', label: 'Extreme Chronic Exhaustion / Fatigue', labelBn: 'অতিরিক্ত দীর্ঘস্থায়ী দুর্বলতা ও ক্লান্তি', bodyPart: 'systemic', isRedFlag: false },
  { id: 'excessive_thirst', label: 'Excessive Thirst and Frequent Night Urination', labelBn: 'অতিরিক্ত পানির পিপাসা ও রাতে ঘন ঘন প্রস্রাব', bodyPart: 'systemic', isRedFlag: false }
];

export function analyzeSymptoms(
  freeText: string,
  selectedSymptomIds: string[],
  bodyLocation: string,
  durationDays: number,
  severityRating: number, // 1 to 10
  medicalHistory: string[]
): SymptomAnalysisResult {
  const textLower = freeText.toLowerCase();

  // Red Flag Emergency Detection keywords
  const redFlagsDetected: string[] = [];
  const matchedSymptoms: string[] = [];

  // Check selected symptoms
  selectedSymptomIds.forEach(id => {
    const s = PREDEFINED_SYMPTOMS.find(item => item.id === id);
    if (s) {
      matchedSymptoms.push(s.label);
      if (s.isRedFlag) redFlagsDetected.push(s.label);
    }
  });

  // NLP Keyword Triggers
  const cardiacEmergencyKeywords = [
    'chest pain', 'crushing pain', 'left arm pain', 'jaw pain', 'radiating to jaw',
    'heart attack', 'sweating profusely', 'cannot breathe', 'severe pressure', 'বুকের ব্যথা', 'হার্ট অ্যাটাক'
  ];
  const strokeKeywords = [
    'slurred speech', 'facial drooping', 'face droop', 'sudden weakness', 'cannot move arm',
    'thunderclap headache', 'worst headache', 'double vision', 'মুখ বাঁকা', 'স্ট্রোক'
  ];
  const surgicalKeywords = [
    'vomiting blood', 'black stool', 'rigid abdomen', 'cannot stand straight pain', 'রক্তবমি'
  ];

  let hasCardiacEmergency = false;
  let hasStrokeEmergency = false;
  let hasSurgicalEmergency = false;

  cardiacEmergencyKeywords.forEach(kw => {
    if (textLower.includes(kw)) {
      hasCardiacEmergency = true;
      if (!matchedSymptoms.includes(`Mentioned: "${kw}"`)) matchedSymptoms.push(`Mentioned: "${kw}"`);
    }
  });

  strokeKeywords.forEach(kw => {
    if (textLower.includes(kw)) {
      hasStrokeEmergency = true;
      if (!matchedSymptoms.includes(`Mentioned: "${kw}"`)) matchedSymptoms.push(`Mentioned: "${kw}"`);
    }
  });

  surgicalKeywords.forEach(kw => {
    if (textLower.includes(kw)) {
      hasSurgicalEmergency = true;
      if (!matchedSymptoms.includes(`Mentioned: "${kw}"`)) matchedSymptoms.push(`Mentioned: "${kw}"`);
    }
  });

  // Urgency logic:
  let urgency: UrgencyLevel = 'low';
  let isEmergencyAlert = false;
  const emergencyWarningSigns: string[] = [];
  const emergencyWarningSignsBn: string[] = [];

  if (
    hasCardiacEmergency ||
    hasStrokeEmergency ||
    hasSurgicalEmergency ||
    redFlagsDetected.length > 0 ||
    severityRating >= 9
  ) {
    urgency = 'emergency';
    isEmergencyAlert = true;
    if (hasCardiacEmergency || redFlagsDetected.some(r => r.includes('Chest') || r.includes('বুক'))) {
      emergencyWarningSigns.push('Acute chest discomfort or pain radiating to the left arm/jaw is a primary sign of acute coronary syndrome (heart attack).');
      emergencyWarningSignsBn.push('বুকে তীব্র চাপ বা বাম হাত/চোয়ালে ব্যথা ছড়ানো হার্ট অ্যাটাক (তীব্র করোনারি সিন্ড্রোম)-এর অন্যতম প্রধান সংকেত।');
    }
    if (hasStrokeEmergency || redFlagsDetected.some(r => r.includes('Droop') || r.includes('Weakness') || r.includes('বাঁকা'))) {
      emergencyWarningSigns.push('Sudden facial drooping, speech difficulty, or arm weakness is an indicator of acute stroke (FAST protocol). Time is brain tissue.');
      emergencyWarningSignsBn.push('হঠাৎ মুখ বেঁকে যাওয়া, কথা জড়িয়ে আসা বা একদিকের হাত দুর্বল হওয়া তীব্র স্ট্রোকের লক্ষণ। তাৎক্ষণিক চিকিৎসা প্রয়োজন।');
    }
    if (severityRating >= 9) {
      emergencyWarningSigns.push(`Self-reported pain severity is critical (${severityRating}/10).`);
      emergencyWarningSignsBn.push(`ব্যথার তীব্রতা অত্যন্ত সংকটজনক (${severityRating}/১০)।`);
    }
  } else if (severityRating >= 7 || durationDays > 14) {
    urgency = 'high';
  } else if (severityRating >= 4 || durationDays > 3) {
    urgency = 'moderate';
  }

  // Specialty mapping
  let specialty = 'General Medicine';
  let specialtyBn = 'জেনারেল মেডিসিন';
  let confidence = 84;
  let possibleCauses: string[] = [];
  let possibleCausesBn: string[] = [];
  let questionsForDoctor: string[] = [];
  let questionsForDoctorBn: string[] = [];
  let triageAdvice = '';
  let triageAdviceBn = '';

  if (hasCardiacEmergency || bodyLocation === 'chest' || textLower.includes('heart') || textLower.includes('palpitation') || textLower.includes('chest') || textLower.includes('বুক')) {
    specialty = 'Cardiology';
    specialtyBn = 'কার্ডিওলজি (হৃদরোগ বিশেষজ্ঞ)';
    confidence = 94;
    possibleCauses = [
      'Acute Coronary Syndrome (requires immediate ECG / Troponin-I exclusion)',
      'Gastroesophageal Reflux (acid burning radiating to mid-chest)',
      'Costochondritis (chest wall muscular / cartilage inflammation)',
      'Pericarditis or Angina Pectoris'
    ];
    possibleCausesBn = [
      'তীব্র করোনারি সিন্ড্রোম / এনজাইনা (তাৎক্ষণিক ইসিজি ও ট্রপোনিন পরীক্ষা জরুরি)',
      'গ্যাস্ট্রিক বা এসিড রিফ্লাক্স (বুকের মাঝামাঝি জ্বালাপোড়া)',
      'কস্টোকনড্রাইটিস (বুকের পেশী বা তরুণাস্থির প্রদাহ)',
      'পেরিকার্ডাইটিস বা হৃদযন্ত্রের আবরণের প্রদাহ'
    ];
    questionsForDoctor = [
      'Does this chest discomfort require an urgent 12-lead ECG and cardiac enzyme panel?',
      'Is my blood pressure within a safe range right now?',
      'Could this pain be gastrointestinal (reflux) or musculoskeletal in origin?'
    ];
    questionsForDoctorBn = [
      'এই বুকে ব্যথার জন্য কি জরুরি ভিত্তিতে ১২-লিড ইসিজি এবং ট্রপোনিন পরীক্ষা দরকার?',
      'আমার রক্তচাপ কি বর্তমানে স্বাভাবিক সীমার মধ্যে রয়েছে?',
      'এই ব্যথা কি গ্যাস্ট্রিকের কারণে নাকি পেশীর প্রদাহের কারণে হতে পারে?'
    ];
    triageAdvice = isEmergencyAlert
      ? 'CRITICAL ALERT: Chest symptoms with high intensity or breathlessness must be treated as a medical emergency. Do NOT drive yourself. Dial 999 or proceed immediately to the nearest hospital emergency room (e.g., KMCH or Fortis Khulna).'
      : 'Cardiology evaluation is recommended to evaluate heart rhythm, blood pressure, and rule out cardiovascular causes.';
    triageAdviceBn = isEmergencyAlert
      ? 'জরুরি বিপদ সংকেত: তীব্র বুকে ব্যথা বা শ্বাসকষ্টকে জরুরি চিকিৎসা অবস্থা হিসেবে বিবেচনা করুন। নিজে গাড়ি চালাবেন না। অবিলম্বে ৯৯৯ এ কল করুন অথবা নিকটস্থ হাসপাতালের জরুরি বিভাগে (যেমন কেএমসিএইচ বা ফোর্টিস খুলনা) যান।'
      : 'হৃদস্পন্দন ও রক্তচাপ মূল্যায়ন এবং হৃদরোগের কারণ পরীক্ষা করতে একজন হৃদরোগ বিশেষজ্ঞের পরামর্শ নেওয়া উচিত।';
  } else if (hasStrokeEmergency || bodyLocation === 'head' || textLower.includes('headache') || textLower.includes('migraine') || textLower.includes('dizzy') || textLower.includes('মাথা')) {
    specialty = 'Neurology';
    specialtyBn = 'নিউরোলজি (স্নায়ুরোগ বিশেষজ্ঞ)';
    confidence = 91;
    possibleCauses = [
      'Migraine without aura or Tension-type headache',
      'Benign Paroxysmal Positional Vertigo (BPPV)',
      'Cervical spondylosis causing tension headache',
      'Transient Ischemic Attack (if accompanied by neurological deficits)'
    ];
    possibleCausesBn = [
      'মাইগ্রেন অথবা টেনশনজনিত মাথাব্যথা',
      'পজিশনাল ভার্টিগো (মাথা ঘোরানোর সাধারণ কারণ)',
      'ঘাড়ের স্পন্ডিলাইটিস থেকে সৃষ্ট মাথাব্যথা',
      'টিটিএ (ক্ষণস্থায়ী স্নায়বিক দুর্বলতা বা মিনি স্ট্রোক)'
    ];
    questionsForDoctor = [
      'Does this headache pattern suggest migraine, tension, or a secondary cause?',
      'Are brain neuroimaging studies (CT / MRI) indicated?',
      'What acute vs preventative medications are safest for my symptom profile?'
    ];
    questionsForDoctorBn = [
      'আমার মাথাব্যথা কি মাইগ্রেন নাকি অন্য কোনো কারণে হচ্ছে?',
      'মাথার সিটি স্ক্যান বা এমআরআই পরীক্ষার প্রয়োজন আছে কি?',
      'ব্যথা দ্রুত কমাতে এবং ভবিষ্যতে প্রতিরোধে কোন ঔষধ সবচেয়ে নিরাপদ?'
    ];
    triageAdvice = isEmergencyAlert
      ? 'EMERGENCY: Immediate neurological assessment required. Dial 999 or reach an emergency room with CT scan capabilities.'
      : 'Consult a Neurologist or Internal Medicine specialist for a comprehensive neurological examination.';
    triageAdviceBn = isEmergencyAlert
      ? 'জরুরি সতর্কতা: দ্রুত স্নায়বিক চিকিৎসা মূল্যায়ন প্রয়োজন। অবিলম্বে ৯৯৯ এ কল করুন বা সিটি স্ক্যান সুবিধা সম্বলিত জরুরি বিভাগে যান।'
      : 'স্নায়বিক পরীক্ষা এবং দীর্ঘমেয়াদী আরামের জন্য একজন নিউরোলজিস্ট বা মেডিসিন বিশেষজ্ঞের পরামর্শ নিন।';
  } else if (bodyLocation === 'abdomen' || textLower.includes('stomach') || textLower.includes('acidity') || textLower.includes('diarrhea') || textLower.includes('vomit') || textLower.includes('পেট')) {
    specialty = 'Gastroenterology';
    specialtyBn = 'গ্যাস্ট্রোএন্টারোলজি (পরিপাকতন্ত্র ও লিভার বিশেষজ্ঞ)';
    confidence = 88;
    possibleCauses = [
      'Gastritis or Peptic Ulcer Disease',
      'Gastroesophageal Reflux Disease (GERD)',
      'Acute Gastroenteritis / Foodborne infection',
      'Irritable Bowel Syndrome (IBS) or Biliary Colic'
    ];
    possibleCausesBn = [
      'গ্যাস্ট্রাইটিস বা পেপটিক আলসার রোগ',
      'গ্যাস্ট্রোইসোফেজিয়াল রিফ্লাক্স ডিজিজ (জিইআরডি / এসিডিটি)',
      'তীব্র গ্যাস্ট্রোএন্টারাইটিস বা খাদ্যে বিষক্রিয়া',
      'ইরিটেবল বাওয়েল সিন্ড্রোম (আইবিএস) বা পিত্তথলির ব্যথা'
    ];
    questionsForDoctor = [
      'Could an H. Pylori screening or upper endoscopy (OGD) be beneficial?',
      'Is prescription acid suppression (PPI) or antispasmodic indicated?',
      'What foods should I strictly eliminate while my digestive tract recovers?'
    ];
    questionsForDoctorBn = [
      'আমার কি এন্ডোস্কোপি (OGD) বা এইচ. পাইলোরি পরীক্ষা করানো দরকার?',
      'কোন ধরণের এসিডিটি নাশক বা অ্যান্টাস্পাজমোডিক ঔষধ সেবন করা উচিত?',
      'পরিপাকতন্ত্র সুস্থ হওয়া পর্যন্ত কোন খাবারগুলো সম্পূর্ণ বর্জন করা উচিত?'
    ];
    triageAdvice = 'Consult a Gastroenterologist or Internal Medicine physician. Stay well hydrated with oral electrolytes (ORS). Avoid spicy, oily, and heavy foods.';
    triageAdviceBn = 'একজন গ্যাস্ট্রোএন্টারোলজিস্ট বা মেডিসিন চিকিৎসকের পরামর্শ নিন। ওরাল রিহাইড্রেশন স্যালাইন (ওরস্যালাইন) পান করে শরীর আর্দ্র রাখুন। ঝাল ও তেলযুক্ত খাবার বর্জন করুন।';
  } else if (bodyLocation === 'limbs' || bodyLocation === 'back' || textLower.includes('joint') || textLower.includes('knee') || textLower.includes('back') || textLower.includes('কোমর') || textLower.includes('হাঁটু')) {
    specialty = 'Orthopedics';
    specialtyBn = 'অর্থোপেডিক্স (হাড় ও জোড়া বিশেষজ্ঞ)';
    confidence = 89;
    possibleCauses = [
      'Lumbar muscle strain or ligament sprain',
      'Osteoarthritis of weight-bearing joints (knees, hips)',
      'Sciatica / Lumbar disc herniation',
      'Postural myofascial pain syndrome'
    ];
    possibleCausesBn = [
      'কোমরের মাংসপেশীর টান বা লিগামেন্টের আঘাত',
      'হাঁটু বা কোমরের অস্টিওআর্থ্রাইটিস (বয়সজনিত ক্ষয়রোগ)',
      'সায়াটিকা বা লাম্বার ডিস্কের সমস্যা',
      'বসার ভুল ভঙ্গির কারণে সৃষ্ট পেশীর ব্যথা'
    ];
    questionsForDoctor = [
      'Would an X-ray or MRI of the joint/spine help clarify structural issues?',
      'Is physical therapy / physiotherapy indicated rather than prolonged painkillers?',
      'What ergonomic corrections should I make at my desk or workplace?'
    ];
    questionsForDoctorBn = [
      'হাড় বা জয়েন্টের গঠন স্পষ্ট দেখতে এক্স-রে বা এমআরআই দরকার কি?',
      'দীর্ঘদিন ব্যথানাশক ঔষধ খাওয়ার চেয়ে ফিজিওথেরাপি কি বেশি উপকারী হবে?',
      'দৈনন্দিন কাজের সময় বসার বা হাঁটার ভঙ্গিতে কী পরিবর্তন আনা উচিত?'
    ];
    triageAdvice = 'Consult an Orthopedic Surgeon or Physiatrist (Physical Medicine). Avoid heavy lifting and apply temporary cold/warm packs as suitable.';
    triageAdviceBn = 'একজন অর্থোপেডিক সার্জন বা ফিজিয়াট্রিস্টের পরামর্শ নিন। ভারী ওজন তোলা এড়িয়ে চলুন এবং প্রয়োজনমতো ঠান্ডা বা গরম সেঁক দিন।';
  } else if (textLower.includes('cough') || textLower.includes('breath') || textLower.includes('asthma') || textLower.includes('wheez') || textLower.includes('কাশি') || textLower.includes('হাঁপানি')) {
    specialty = 'Pulmonology / Chest';
    specialtyBn = 'পালমোনোলজি (বক্ষব্যাধি ও ফুসফুস বিশেষজ্ঞ)';
    confidence = 92;
    possibleCauses = [
      'Acute Bronchitis or Upper Respiratory Viral Illness',
      'Bronchial Asthma or Airway Hyper-responsiveness',
      'Chronic Obstructive Pulmonary Disease (COPD)',
      'Allergic Rhinosinusitis with post-nasal drip'
    ];
    possibleCausesBn = [
      'তীব্র ব্রঙ্কাইটিস বা শ্বাসতন্ত্রের ভাইরাল ইনফেকশন',
      'ব্রঙ্কিয়াল অ্যাজমা (হাঁপানি) বা শ্বাসনালীর অতি-সংবেদনশীলতা',
      'সিওপিডি (ক্রনিক অবস্ট্রাকটিভ পালমোনারি ডিজিজ)',
      'এলার্জিক রাইনাইটিস বা সাইনোসাইটিসের সমস্যা'
    ];
    questionsForDoctor = [
      'Do I need a chest X-ray or Spirometry (Pulmonary Function Test)?',
      'Would an inhaler or bronchodilator provide relief?',
      'Are environmental allergens or dust triggers contributing to my symptoms?'
    ];
    questionsForDoctorBn = [
      'বুকের এক্স-রে বা স্পাইরোমেট্রি (ফুসফুসের কার্যক্ষমতা পরীক্ষা) দরকার কি?',
      'ইনহেলার বা ব্রঙ্কোডাইলেটর ব্যবহার কি উপশম দেবে?',
      'পরিবেশের ধুলাবালি বা অ্যালার্জি কি আমার কাশির জন্য দায়ী?'
    ];
    triageAdvice = 'Consult a Pulmonologist / Chest Specialist. Avoid dust, smoke, and cold air exposure.';
    triageAdviceBn = 'বক্ষব্যাধি ও ফুসফুস বিশেষজ্ঞের পরামর্শ নিন। ধুলাবালি, ধূমপান এবং ঠান্ডা বাতাস থেকে দূরে থাকুন।';
  } else {
    specialty = 'Medicine';
    specialtyBn = 'মেডিসিন বিশেষজ্ঞ';
    confidence = 82;
    possibleCauses = [
      'Systemic viral illness / Flu-like syndrome',
      'Chronic fatigue related to stress, lack of sleep, or mild anemia',
      'Non-specific tension or early inflammatory presentation',
      'Nutritional deficiency (Vitamin D, B12, or Iron)'
    ];
    possibleCausesBn = [
      'সাধারণ ভাইরাল ইনফেকশন বা ফ্লু সিন্ড্রোম',
      'অতিরিক্ত মানসিক চাপ, ঘুমের অভাব বা রক্তস্বল্পতাজনিত ক্লান্তি',
      'প্রাথমিক প্রদাহ বা শারীরিক দুর্বলতা',
      'পুষ্টির ঘাটতি (যেমন ভিটামিন ডি, বি১২ বা আয়রনের ঘাটতি)'
    ];
    questionsForDoctor = [
      'Should baseline routine blood work (CBC, ESR, Fasting Glucose) be ordered?',
      'Could my daily stress, hydration, or sleep patterns explain these symptoms?',
      'Are there lifestyle adjustments or dietary supplements appropriate for me?'
    ];
    questionsForDoctorBn = [
      'রক্তের সাধারণ পরীক্ষা (সিবিসি, ইএসআর, গ্লুকোজ) করানো উচিত কি?',
      'মানসিক চাপ বা পানির অপর্যাপ্ততা কি এই সমস্যার জন্য দায়ী হতে পারে?',
      'আমার খাদ্যতালিকায় কোন পুষ্টিকর পরিবর্তন আনা দরকার কি?'
    ];
    triageAdvice = 'Consult a General Medicine specialist for clinical examination and baseline laboratory testing.';
    triageAdviceBn = 'শারীরিক পরীক্ষা এবং সাধারণ ল্যাব পরীক্ষার জন্য একজন মেডিসিন বিশেষজ্ঞের পরামর্শ নিন।';
  }

  return {
    specialty,
    specialtyBn,
    urgency,
    confidence,
    matchedSymptoms: matchedSymptoms.length > 0 ? matchedSymptoms : ['General discomfort reported'],
    possibleCauses,
    possibleCausesBn,
    triageAdvice,
    triageAdviceBn,
    isEmergencyAlert,
    emergencyWarningSigns: emergencyWarningSigns.length > 0 ? emergencyWarningSigns : undefined,
    emergencyWarningSignsBn: emergencyWarningSignsBn.length > 0 ? emergencyWarningSignsBn : undefined,
    recommendedDoctorCategory: specialty,
    questionsForDoctor,
    questionsForDoctorBn
  };
}
