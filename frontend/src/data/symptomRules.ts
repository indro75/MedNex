import { SymptomAnalysisResult, UrgencyLevel } from '../types';

export interface PredefinedSymptom {
  id: string;
  label: string;
  bodyPart: 'head' | 'chest' | 'abdomen' | 'limbs' | 'back' | 'systemic' | 'skin';
  isRedFlag: boolean;
}

export const PREDEFINED_SYMPTOMS: PredefinedSymptom[] = [
  // Head & Neck
  { id: 'headache_severe', label: 'Severe / Sudden Thunderclap Headache', bodyPart: 'head', isRedFlag: true },
  { id: 'facial_droop', label: 'Facial Drooping or Slurred Speech', bodyPart: 'head', isRedFlag: true },
  { id: 'vision_blur', label: 'Sudden Vision Loss / Double Vision', bodyPart: 'head', isRedFlag: true },
  { id: 'dizziness', label: 'Dizziness or Vertigo', bodyPart: 'head', isRedFlag: false },
  { id: 'headache_throbbing', label: 'Throbbing / One-sided Headache', bodyPart: 'head', isRedFlag: false },
  { id: 'sore_throat', label: 'Sore Throat & Difficulty Swallowing', bodyPart: 'head', isRedFlag: false },

  // Chest & Heart
  { id: 'chest_pain_severe', label: 'Crushing Chest Pain / Pressure', bodyPart: 'chest', isRedFlag: true },
  { id: 'chest_pain_left', label: 'Left-sided Chest Pain radiating to Arm/Jaw', bodyPart: 'chest', isRedFlag: true },
  { id: 'shortness_of_breath', label: 'Severe Breathlessness / Air Hunger', bodyPart: 'chest', isRedFlag: true },
  { id: 'palpitations', label: 'Rapid Palpitations or Racing Heartbeat', bodyPart: 'chest', isRedFlag: false },
  { id: 'chronic_cough', label: 'Persistent Dry or Productive Cough', bodyPart: 'chest', isRedFlag: false },
  { id: 'wheezing', label: 'Wheezing or Whistling Breath Sound', bodyPart: 'chest', isRedFlag: false },

  // Abdomen & Digestion
  { id: 'severe_abdo_pain', label: 'Severe Sudden Abdominal Pain (Rigid / Tender)', bodyPart: 'abdomen', isRedFlag: true },
  { id: 'vomiting_blood', label: 'Vomiting Blood or Black Coffee-ground Emesis', bodyPart: 'abdomen', isRedFlag: true },
  { id: 'heartburn_acid', label: 'Burning Sensation in Chest / Acid Reflux', bodyPart: 'abdomen', isRedFlag: false },
  { id: 'nausea_vomiting', label: 'Nausea and Occasional Vomiting', bodyPart: 'abdomen', isRedFlag: false },
  { id: 'diarrhea', label: 'Frequent Loose Watery Stools', bodyPart: 'abdomen', isRedFlag: false },
  { id: 'jaundice_eyes', label: 'Yellowing of Eyes / Skin (Jaundice)', bodyPart: 'abdomen', isRedFlag: false },

  // Limbs & Joints
  { id: 'arm_weakness', label: 'Sudden One-sided Arm or Leg Weakness / Numbness', bodyPart: 'limbs', isRedFlag: true },
  { id: 'joint_swelling', label: 'Swollen, Painful, or Warm Knee / Ankle Joint', bodyPart: 'limbs', isRedFlag: false },
  { id: 'leg_cramps', label: 'Calf Pain or Muscle Cramps', bodyPart: 'limbs', isRedFlag: false },
  { id: 'finger_numbness', label: 'Tingling or Numbness in Hands or Feet', bodyPart: 'limbs', isRedFlag: false },

  // Back & Spine
  { id: 'lower_back_pain', label: 'Lower Back Ache / Stiffness', bodyPart: 'back', isRedFlag: false },
  { id: 'back_radiating_leg', label: 'Shooting Pain from Back Down into Leg (Sciatica)', bodyPart: 'back', isRedFlag: false },
  { id: 'neck_stiffness_fever', label: 'Severe Neck Stiffness with High Fever', bodyPart: 'back', isRedFlag: true },

  // Systemic
  { id: 'high_fever_chills', label: 'High Fever (>102°F) with Chills', bodyPart: 'systemic', isRedFlag: false },
  { id: 'unexplained_weight_loss', label: 'Unexplained Rapid Weight Loss', bodyPart: 'systemic', isRedFlag: false },
  { id: 'extreme_fatigue', label: 'Extreme Chronic Exhaustion / Fatigue', bodyPart: 'systemic', isRedFlag: false },
  { id: 'excessive_thirst', label: 'Excessive Thirst and Frequent Night Urination', bodyPart: 'systemic', isRedFlag: false }
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
    'heart attack', 'sweating profusely', 'cannot breathe', 'severe pressure'
  ];
  const strokeKeywords = [
    'slurred speech', 'facial drooping', 'face droop', 'sudden weakness', 'cannot move arm',
    'thunderclap headache', 'worst headache', 'double vision'
  ];
  const surgicalKeywords = [
    'vomiting blood', 'black stool', 'rigid abdomen', 'cannot stand straight pain'
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

  if (
    hasCardiacEmergency ||
    hasStrokeEmergency ||
    hasSurgicalEmergency ||
    redFlagsDetected.length > 0 ||
    severityRating >= 9
  ) {
    urgency = 'emergency';
    isEmergencyAlert = true;
    if (hasCardiacEmergency || redFlagsDetected.some(r => r.includes('Chest'))) {
      emergencyWarningSigns.push('Acute chest discomfort or pain radiating to the left arm/jaw is a primary sign of acute coronary syndrome (heart attack).');
    }
    if (hasStrokeEmergency || redFlagsDetected.some(r => r.includes('Droop') || r.includes('Weakness'))) {
      emergencyWarningSigns.push('Sudden facial drooping, speech difficulty, or arm weakness is an indicator of acute stroke (FAST protocol). Time is brain tissue.');
    }
    if (severityRating >= 9) {
      emergencyWarningSigns.push(`Self-reported pain severity is critical (${severityRating}/10).`);
    }
  } else if (severityRating >= 7 || durationDays > 14) {
    urgency = 'high';
  } else if (severityRating >= 4 || durationDays > 3) {
    urgency = 'moderate';
  }

  // Specialty mapping
  let specialty = 'General Medicine';
  let confidence = 84;
  let possibleCauses: string[] = [];
  let questionsForDoctor: string[] = [];
  let triageAdvice = '';

  if (hasCardiacEmergency || bodyLocation === 'chest' || textLower.includes('heart') || textLower.includes('palpitation') || textLower.includes('chest')) {
    specialty = 'Cardiology';
    confidence = 94;
    possibleCauses = [
      'Acute Coronary Syndrome (requires immediate ECG / Troponin-I exclusion)',
      'Gastroesophageal Reflux (acid burning radiating to mid-chest)',
      'Costochondritis (chest wall muscular / cartilage inflammation)',
      'Pericarditis or Angina Pectoris'
    ];
    questionsForDoctor = [
      'Does this chest discomfort require an urgent 12-lead ECG and cardiac enzyme panel?',
      'Is my blood pressure within a safe range right now?',
      'Could this pain be gastrointestinal (reflux) or musculoskeletal in origin?'
    ];
    triageAdvice = isEmergencyAlert
      ? 'CRITICAL ALERT: Chest symptoms with high intensity or breathlessness must be treated as a medical emergency. Do NOT drive yourself. Dial 999 or proceed immediately to the nearest hospital emergency room (e.g., KMCH or Fortis Khulna).'
      : 'Cardiology evaluation is recommended to evaluate heart rhythm, blood pressure, and rule out cardiovascular causes.';
  } else if (hasStrokeEmergency || bodyLocation === 'head' || textLower.includes('headache') || textLower.includes('migraine') || textLower.includes('dizzy')) {
    specialty = 'Neurology';
    confidence = 91;
    possibleCauses = [
      'Migraine without aura or Tension-type headache',
      'Benign Paroxysmal Positional Vertigo (BPPV)',
      'Cervical spondylosis causing tension headache',
      'Transient Ischemic Attack (if accompanied by neurological deficits)'
    ];
    questionsForDoctor = [
      'Does this headache pattern suggest migraine, tension, or a secondary cause?',
      'Are brain neuroimaging studies (CT / MRI) indicated?',
      'What acute vs preventative medications are safest for my symptom profile?'
    ];
    triageAdvice = isEmergencyAlert
      ? 'EMERGENCY: Immediate neurological assessment required. Dial 999 or reach an emergency room with CT scan capabilities.'
      : 'Consult a Neurologist or Internal Medicine specialist for a comprehensive neurological examination.';
  } else if (bodyLocation === 'abdomen' || textLower.includes('stomach') || textLower.includes('acidity') || textLower.includes('diarrhea') || textLower.includes('vomit')) {
    specialty = 'Gastroenterology';
    confidence = 88;
    possibleCauses = [
      'Gastritis or Peptic Ulcer Disease',
      'Gastroesophageal Reflux Disease (GERD)',
      'Acute Gastroenteritis / Foodborne infection',
      'Irritable Bowel Syndrome (IBS) or Biliary Colic'
    ];
    questionsForDoctor = [
      'Could an H. Pylori screening or upper endoscopy (OGD) be beneficial?',
      'Is prescription acid suppression (PPI) or antispasmodic indicated?',
      'What foods should I strictly eliminate while my digestive tract recovers?'
    ];
    triageAdvice = 'Consult a Gastroenterologist or Internal Medicine physician. Stay well hydrated with oral electrolytes (ORS). Avoid spicy, oily, and heavy foods.';
  } else if (bodyLocation === 'limbs' || bodyLocation === 'back' || textLower.includes('joint') || textLower.includes('knee') || textLower.includes('back')) {
    specialty = 'Orthopedics';
    confidence = 89;
    possibleCauses = [
      'Lumbar muscle strain or ligament sprain',
      'Osteoarthritis of weight-bearing joints (knees, hips)',
      'Sciatica / Lumbar disc herniation',
      'Postural myofascial pain syndrome'
    ];
    questionsForDoctor = [
      'Would an X-ray or MRI of the joint/spine help clarify structural issues?',
      'Is physical therapy / physiotherapy indicated rather than prolonged painkillers?',
      'What ergonomic corrections should I make at my desk or workplace?'
    ];
    triageAdvice = 'Consult an Orthopedic Surgeon or Physiatrist (Physical Medicine). Avoid heavy lifting and apply temporary cold/warm packs as suitable.';
  } else if (textLower.includes('cough') || textLower.includes('breath') || textLower.includes('asthma') || textLower.includes('wheez')) {
    specialty = 'Pulmonology / Chest';
    confidence = 92;
    possibleCauses = [
      'Acute Bronchitis or Upper Respiratory Viral Illness',
      'Bronchial Asthma or Airway Hyper-responsiveness',
      'Chronic Obstructive Pulmonary Disease (COPD)',
      'Allergic Rhinosinusitis with post-nasal drip'
    ];
    questionsForDoctor = [
      'Do I need a chest X-ray or Spirometry (Pulmonary Function Test)?',
      'Would an inhaler or bronchodilator provide relief?',
      'Are environmental allergens or dust triggers contributing to my symptoms?'
    ];
    triageAdvice = 'Consult a Pulmonologist / Chest Specialist. Avoid dust, smoke, and cold air exposure.';
  } else {
    specialty = 'Medicine';
    confidence = 82;
    possibleCauses = [
      'Systemic viral illness / Flu-like syndrome',
      'Chronic fatigue related to stress, lack of sleep, or mild anemia',
      'Non-specific tension or early inflammatory presentation',
      'Nutritional deficiency (Vitamin D, B12, or Iron)'
    ];
    questionsForDoctor = [
      'Should baseline routine blood work (CBC, ESR, Fasting Glucose) be ordered?',
      'Could my daily stress, hydration, or sleep patterns explain these symptoms?',
      'Are there lifestyle adjustments or dietary supplements appropriate for me?'
    ];
    triageAdvice = 'Consult a General Medicine specialist for clinical examination and baseline laboratory testing.';
  }

  return {
    specialty,
    urgency,
    confidence,
    matchedSymptoms: matchedSymptoms.length > 0 ? matchedSymptoms : ['General discomfort reported'],
    possibleCauses,
    triageAdvice,
    isEmergencyAlert,
    emergencyWarningSigns: emergencyWarningSigns.length > 0 ? emergencyWarningSigns : undefined,
    recommendedDoctorCategory: specialty,
    questionsForDoctor
  };
}

