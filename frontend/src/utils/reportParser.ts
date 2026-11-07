/**
 * MedNex Unified Clinical Report Parser & Biomarker Extraction Engine
 * Supports PDF stream parsing, client-side OCR extraction, and comprehensive lab panels.
 * Works both standalone (Vercel client) and integrated with the FastAPI backend.
 */

import { MedicalReportData, ReportParameter } from '../types';

export interface BiomarkerDefinition {
  id: string;
  name: string;
  patterns: RegExp[];
  unit: string;
  defaultUnit: string;
  minNormal: number;
  maxNormal: number;
  criticalLow?: number;
  criticalHigh?: number;
  category: 'Complete Blood Count' | 'Lipid Profile' | 'Liver Function' | 'Diabetic Panel' | 'Kidney Function' | 'Thyroid Panel';
  clinicalMeaning: string;
  clinicalMeaningBn: string;
  lowAlert: string;
  lowAlertBn: string;
  highAlert: string;
  highAlertBn: string;
  criticalAlert?: string;
  criticalAlertBn?: string;
}

export const KNOWN_BIOMARKERS: BiomarkerDefinition[] = [
  // 1. Complete Blood Count (CBC)
  {
    id: 'hb',
    name: 'Hemoglobin (Hb)',
    patterns: [/\bhemoglobin\b/i, /\bhgb\b/i, /\bhb\b/i],
    unit: 'g/dL',
    defaultUnit: 'g/dL',
    minNormal: 13.0,
    maxNormal: 17.0,
    criticalLow: 7.0,
    criticalHigh: 20.0,
    category: 'Complete Blood Count',
    clinicalMeaning: 'Hemoglobin is the iron-rich protein in red blood cells that transports oxygen from your lungs throughout the body.',
    clinicalMeaningBn: 'হিমোগ্লোবিন হলো লোহিত রক্তকণিকার একটি প্রোটিন যা সারা শরীরে অক্সিজেন পরিবহন করে।',
    lowAlert: 'Low Hemoglobin indicates anemia, potential blood loss, or nutritional deficiency (iron/B12).',
    lowAlertBn: 'কম হিমোগ্লোবিন অ্যানিমিয়া বা রক্তস্বল্পতা নির্দেশ করে। আয়রন ও পুষ্টিসমৃদ্ধ খাবার প্রয়োজন।',
    highAlert: 'High Hemoglobin may signify dehydration, erythrocytosis, or chronic hypoxia.',
    highAlertBn: 'অতিরিক্ত হিমোগ্লোবিন পানিশূন্যতা বা রক্ত ঘন হয়ে যাওয়ার ইঙ্গিত দিতে পারে।',
    criticalAlert: 'Critical Hemoglobin level! Severe acute anemia requires immediate clinical evaluation.',
    criticalAlertBn: 'মারাত্মক কম হিমোগ্লোবিন! অবিলম্বে চিকিৎসকের পরামর্শ নিন।'
  },
  {
    id: 'rbc',
    name: 'Total RBC Count',
    patterns: [/total\s*rbc\b/i, /rbc\s*count\b/i, /\brbc\b/i, /red\s*blood\s*cells?\b/i],
    unit: 'million/uL',
    defaultUnit: 'million/uL',
    minNormal: 4.5,
    maxNormal: 5.9,
    category: 'Complete Blood Count',
    clinicalMeaning: 'Total count of oxygen-carrying erythrocytes circulating in peripheral blood.',
    clinicalMeaningBn: 'রক্তে লোহিত রক্তকণিকার মোট পরিমাণ যা অক্সিজেন পরিবহনে ভূমিকা রাখে।',
    lowAlert: 'Reduced red blood cell count, concurring with anemic fatigue.',
    lowAlertBn: 'লোহিত রক্তকণিকার পরিমাণ স্বাভাবিকের চেয়ে কম।',
    highAlert: 'Elevated red cell mass. May be reactive to smoking, sleep apnea, or dehydration.',
    highAlertBn: 'লোহিত রক্তকণিকার পরিমাণ স্বাভাবিকের চেয়ে বেশি।'
  },
  {
    id: 'wbc',
    name: 'Total WBC Count (TLC)',
    patterns: [/total\s*wbc\b/i, /wbc\s*count\b/i, /\bwbc\b/i, /\btlc\b/i, /white\s*blood\s*cells?\b/i],
    unit: '/cumm',
    defaultUnit: '/cumm',
    minNormal: 4000,
    maxNormal: 11000,
    criticalLow: 2000,
    criticalHigh: 25000,
    category: 'Complete Blood Count',
    clinicalMeaning: 'White blood cells are the frontline cellular defense mechanism of the immune system.',
    clinicalMeaningBn: 'শ্বেত রক্তকণিকা শরীরের রোগ প্রতিরোধ ক্ষমতার প্রধান প্রহরী।',
    lowAlert: 'Low WBC (leukopenia) suggests viral infection, bone marrow suppression, or drug effect.',
    lowAlertBn: 'শ্বেত রক্তকণিকা কমে গেছে (লিউ কোপেনিয়া), যা রোগ প্রতিরোধ ক্ষমতা হ্রাসের ইঙ্গিত।',
    highAlert: 'Elevated WBC (leukocytosis) points to acute bacterial infection or active inflammation.',
    highAlertBn: 'শ্বেত রক্তকণিকা বেশি, যা শরীরে কোনো সংক্রমণ বা প্রদাহের লক্ষণ।',
    criticalAlert: 'Extreme WBC deviation indicates acute severe sepsis or hematological disorder.',
    criticalAlertBn: 'মারাত্মক শ্বেত রক্তকণিকার তারতম্য! জরুরি মেডিকেল পর্যবেক্ষণ দরকার।'
  },
  {
    id: 'platelets',
    name: 'Platelet Count',
    patterns: [/platelet\s*counts?\b/i, /platelets?\b/i, /\bplt\b/i],
    unit: '/cumm',
    defaultUnit: '/cumm',
    minNormal: 150000,
    maxNormal: 450000,
    criticalLow: 50000,
    criticalHigh: 800000,
    category: 'Complete Blood Count',
    clinicalMeaning: 'Platelets are essential cellular fragments required for primary blood clotting and hemostasis.',
    clinicalMeaningBn: 'প্লাটিলেট বা অনুচক্রিকা রক্ত জমাট বাঁধতে ও রক্তপাত বন্ধ করতে সাহায্য করে।',
    lowAlert: 'Thrombocytopenia increases spontaneous bruising or bleeding risk. Very crucial in Dengue fever.',
    lowAlertBn: 'প্লাটিলেট কমে গেছে। রক্তক্ষরণ বা ডেঙ্গু সংক্রমণের ঝুঁকি বিবেচনায় পর্যবেক্ষণ জরুরি।',
    highAlert: 'Thrombocytosis can increase vascular thrombosis risk or indicate reactive inflammation.',
    highAlertBn: 'প্লাটিলেট বেশি, যা রক্ত জমাট বাঁধার ঝুঁকি বাড়ায়।',
    criticalAlert: 'Severe Thrombocytopenia (<50k)! High risk of spontaneous bleeding. Urgent doctor review needed.',
    criticalAlertBn: 'প্লাটিলেট ৫০ হাজারের নিচে নেমে গেছে! মারাত্মক রক্তপাতের ঝুঁকি, অবিলম্বে হাসপাতালে যান।'
  },
  {
    id: 'mcv',
    name: 'MCV (Mean Corpuscular Vol)',
    patterns: [/\bmcv\b/i, /mean\s*corpuscular\s*vol/i],
    unit: 'fL',
    defaultUnit: 'fL',
    minNormal: 80.0,
    maxNormal: 96.0,
    category: 'Complete Blood Count',
    clinicalMeaning: 'Measures average volume and physical size of individual red blood cells.',
    clinicalMeaningBn: 'লোহিত রক্তকণিকার গড় আকার পরিমাপ করে।',
    lowAlert: 'Microcytosis: cells are abnormally small, classic for iron deficiency or thalassemia trait.',
    lowAlertBn: 'লোহিত কণিকার আকার ছোট (মাইক্রোসাইটোসিস), আয়রনের ঘাটতি বা থ্যালাসেমিয়া নির্দেশ করতে পারে।',
    highAlert: 'Macrocytosis: enlarged cells, frequently linked to Vitamin B12 or Folate deficiency.',
    highAlertBn: 'লোহিত কণিকা স্বাভাবিকের চেয়ে বড়, ভিটামিন বি১২ বা ফোলেটের ঘাটতির লক্ষণ।'
  },
  {
    id: 'esr',
    name: 'ESR (Erythrocyte Sedimentation)',
    patterns: [/\besr\b/i, /erythrocyte\s*sedimentation\b/i],
    unit: 'mm/hr',
    defaultUnit: 'mm/hr',
    minNormal: 0,
    maxNormal: 20,
    category: 'Complete Blood Count',
    clinicalMeaning: 'Non-specific biomarker of systemic inflammation, infection, or connective tissue disease.',
    clinicalMeaningBn: 'শরীরের প্রদাহ বা সংক্রমণের সাধারণ নির্দেশক।',
    lowAlert: 'Normal low sedimentation.',
    lowAlertBn: 'স্বাভাবিক নিম্ন মাত্রা।',
    highAlert: 'Elevated ESR indicates active inflammation, persistent infection, or autoimmune activity.',
    highAlertBn: 'ইএসআর বেশি, যা শরীরে প্রদাহ বা সংক্রমণের উপস্থিতি নির্দেশ করে।'
  },

  // 2. Lipid Profile
  {
    id: 'cholesterol',
    name: 'Total Cholesterol',
    patterns: [/total\s*cholesterol\b/i, /\bcholesterol\b/i],
    unit: 'mg/dL',
    defaultUnit: 'mg/dL',
    minNormal: 125.0,
    maxNormal: 200.0,
    category: 'Lipid Profile',
    clinicalMeaning: 'Total quantity of all sterol lipids circulating within peripheral blood vessels.',
    clinicalMeaningBn: 'রক্তে মোট কোলেস্টেরলের মাত্রা যা হৃদরোগ ঝুঁকির সাথে সম্পর্কিত।',
    lowAlert: 'Rarely concerning; severe hypocholesterolemia may relate to malabsorption or liver disease.',
    lowAlertBn: 'স্বাভাবিকের চেয়ে কম কোলেস্টেরল।',
    highAlert: 'Hypercholesterolemia increases plaque buildup in coronary and carotid arteries.',
    highAlertBn: 'কোলেস্টেরল বেশি হওয়ায় রক্তনালীতে চর্বি জমার ও হৃদরোগের ঝুঁকি বৃদ্ধি পায়।'
  },
  {
    id: 'hdl',
    name: "HDL ('Good') Cholesterol",
    patterns: [/hdl\s*cholesterol\b/i, /\bhdl\b/i],
    unit: 'mg/dL',
    defaultUnit: 'mg/dL',
    minNormal: 40.0,
    maxNormal: 60.0,
    category: 'Lipid Profile',
    clinicalMeaning: 'High-Density Lipoprotein carries excess cholesterol away from tissues back to the liver.',
    clinicalMeaningBn: 'ভালো কোলেস্টেরল (HDL) যা রক্তনালী থেকে চর্বি সরিয়ে হৃদযন্ত্র রক্ষা করে।',
    lowAlert: 'Low HDL reduces cardiovascular protection against arterial atherosclerosis.',
    lowAlertBn: 'ভালো কোলেস্টেরল কম হওয়ায় হৃদযন্ত্রের প্রাকৃতিক সুরক্ষা হ্রাস পায়।',
    highAlert: 'High HDL is generally considered protective for cardiovascular vessels.',
    highAlertBn: 'এইচডিএল ভালো মাত্রায় রয়েছে, যা হৃদযন্ত্রের জন্য উপকারী।'
  },
  {
    id: 'ldl',
    name: "LDL ('Bad') Cholesterol",
    patterns: [/ldl\s*cholesterol\b/i, /\bldl\b/i],
    unit: 'mg/dL',
    defaultUnit: 'mg/dL',
    minNormal: 50.0,
    maxNormal: 100.0,
    criticalHigh: 190.0,
    category: 'Lipid Profile',
    clinicalMeaning: 'Low-Density Lipoprotein deposits oxidized cholesterol onto arterial endothelial walls.',
    clinicalMeaningBn: 'খারাপ কোলেস্টেরল (LDL) যা ধমনীর দেয়ালে চর্বি জমিয়ে হৃদরোগ সৃষ্টি করে।',
    lowAlert: 'Favorable low profile.',
    lowAlertBn: 'অনুকূল ও নিরাপদ মাত্রা।',
    highAlert: 'Elevated LDL is the primary driver of coronary atherosclerosis and heart attacks.',
    highAlertBn: 'খারাপ কোলেস্টেরল বেশি, যা হার্ট অ্যাটাকের ঝুঁকি বাড়ায়। চর্বিজাতীয় খাবার কমাতে হবে।'
  },
  {
    id: 'triglycerides',
    name: 'Triglycerides (TG)',
    patterns: [/triglycerides?\b/i, /\btg\b/i],
    unit: 'mg/dL',
    defaultUnit: 'mg/dL',
    minNormal: 50.0,
    maxNormal: 150.0,
    criticalHigh: 500.0,
    category: 'Lipid Profile',
    clinicalMeaning: 'Triglycerides store unused metabolic calories and supply energy to peripheral tissues.',
    clinicalMeaningBn: 'ট্রাইগ্লিসারাইড হলো রক্তে জমা হওয়া অব্যবহৃত ক্যালোরি বা চর্বি।',
    lowAlert: 'Low triglycerides are clinically benign.',
    lowAlertBn: 'স্বাভাবিক নিরাপদ মাত্রা।',
    highAlert: 'High triglycerides elevate risks of metabolic syndrome, fatty liver, and pancreatitis.',
    highAlertBn: 'ট্রাইগ্লিসারাইড বেশি থাকায় ফ্যাটি লিভার ও বিপাকীয় জটিলতার ঝুঁকি থাকে।'
  },

  // 3. Diabetic / Glycemic Panel
  {
    id: 'fbs',
    name: 'Fasting Blood Sugar (FBS)',
    patterns: [/fasting\s*blood\s*sugar\b/i, /\bfbs\b/i, /fasting\s*glucose\b/i, /glucose\s*fasting\b/i],
    unit: 'mmol/L',
    defaultUnit: 'mmol/L',
    minNormal: 4.0,
    maxNormal: 5.6,
    criticalLow: 3.0,
    criticalHigh: 15.0,
    category: 'Diabetic Panel',
    clinicalMeaning: 'Fasting plasma glucose after at least an 8-10 hour overnight caloric fast.',
    clinicalMeaningBn: '৮-১০ ঘণ্টা খালি পেটে থাকার পর রক্তের গ্লুকোজের পরিমাণ।',
    lowAlert: 'Hypoglycemia causes lightheadedness, tremors, and diaphoresis. Needs quick carbohydrates.',
    lowAlertBn: 'হাইপোগ্লাইসেমিয়া (রক্তে সুগার কমে যাওয়া)। মাথা ঘোরা ও দুর্বলতা দেখা দিলে মিষ্টি কিছু খান।',
    highAlert: '5.6-6.9 indicates impaired fasting glucose (prediabetes); >= 7.0 mmol/L indicates Diabetes.',
    highAlertBn: 'সুগার স্বাভাবিকের চেয়ে বেশি (প্রি-ডায়াবেটিস বা ডায়াবেটিস)। শর্করা নিয়ন্ত্রণ দরকার।'
  },
  {
    id: 'rbs',
    name: 'Random Blood Sugar (RBS)',
    patterns: [/random\s*blood\s*sugar\b/i, /\brbs\b/i, /random\s*glucose\b/i],
    unit: 'mmol/L',
    defaultUnit: 'mmol/L',
    minNormal: 4.4,
    maxNormal: 7.8,
    criticalHigh: 18.0,
    category: 'Diabetic Panel',
    clinicalMeaning: 'Blood sugar measured at any unscheduled time regardless of meals.',
    clinicalMeaningBn: 'যেকোনো সময় মাপা রক্তের চিনির পরিমাণ।',
    lowAlert: 'Low random blood sugar; may require glucose support if symptomatic.',
    lowAlertBn: 'রক্তের সুগার কম।',
    highAlert: '>= 11.1 mmol/L with symptoms indicates Diabetes Mellitus.',
    highAlertBn: 'র্যান্ডম সুগার স্বাভাবিকের চেয়ে বেশি, ডায়াবেটিসের লক্ষণ হতে পারে।'
  },
  {
    id: 'hba1c',
    name: 'HbA1c (Glycated Hb)',
    patterns: [/\bhba1c\b/i, /glycated\s*hemoglobin\b/i],
    unit: '%',
    defaultUnit: '%',
    minNormal: 4.0,
    maxNormal: 5.7,
    criticalHigh: 10.0,
    category: 'Diabetic Panel',
    clinicalMeaning: 'Reflects average blood glucose concentration over the preceding 2 to 3 months.',
    clinicalMeaningBn: 'গত ২-৩ মাসের রক্তে গ্লুকোজের গড় মাত্রা নির্দেশ করে।',
    lowAlert: 'Below 4.0% may correlate with recurrent hypoglycemia or shortened RBC survival.',
    lowAlertBn: 'স্বাভাবিকের চেয়ে কম মাত্রা।',
    highAlert: '5.7 - 6.4% indicates Prediabetes; 6.5%+ establishes Diabetes Mellitus.',
    highAlertBn: '৫.৭% এর বেশি হলে প্রি-ডায়াবেটিস এবং ৬.৫% বা বেশি হলে ডায়াবেটিস চিহ্নিত হয়।'
  },

  // 4. Liver Function Test (LFT)
  {
    id: 'sgpt',
    name: 'SGPT / ALT (Liver)',
    patterns: [/\bsgpt\b/i, /\balt\b/i, /alanine\s*transaminase\b/i],
    unit: 'U/L',
    defaultUnit: 'U/L',
    minNormal: 7.0,
    maxNormal: 45.0,
    criticalHigh: 300.0,
    category: 'Liver Function',
    clinicalMeaning: 'Alanine Aminotransferase is concentrated in hepatocyte cytoplasm and spills during liver injury.',
    clinicalMeaningBn: 'লিভারের প্রধান এনজাইম, লিভারের কোষে ক্ষতি বা প্রদাহ হলে রক্তে এটি বৃদ্ধি পায়।',
    lowAlert: 'Normal physiological range.',
    lowAlertBn: 'স্বাভাবিক মাত্রা।',
    highAlert: 'Elevated SGPT signals hepatocellular inflammation, fatty liver (NAFLD), or viral hepatitis.',
    highAlertBn: 'এসজিপিটি বৃদ্ধি ফ্যাটি লিভার, ভাইরাল হেপাটাইটিস বা লিভারের প্রদাহের নির্দেশক।'
  },
  {
    id: 'sgot',
    name: 'SGOT / AST (Liver)',
    patterns: [/\bsgot\b/i, /\bast\b/i, /aspartate\s*transaminase\b/i],
    unit: 'U/L',
    defaultUnit: 'U/L',
    minNormal: 8.0,
    maxNormal: 40.0,
    category: 'Liver Function',
    clinicalMeaning: 'Aspartate Aminotransferase is found in liver, heart, skeletal muscle, and kidneys.',
    clinicalMeaningBn: 'লিভার ও হৃদপেশীর একটি এনজাইম যা কোষীয় ক্ষতিতে রক্তে নিঃসৃত হয়।',
    lowAlert: 'Normal physiological range.',
    lowAlertBn: 'স্বাভাবিক মাত্রা।',
    highAlert: 'Elevated AST occurs in alcoholic hepatitis, intense muscle breakdown, or cardiac stress.',
    highAlertBn: 'এসজিওটি বৃদ্ধি লিভার বা পেশির ক্ষতির লক্ষণ হতে পারে।'
  },
  {
    id: 'bilirubin',
    name: 'Serum Bilirubin (Total)',
    patterns: [/serum\s*bilirubin\b/i, /total\s*bilirubin\b/i, /\bbilirubin\b/i],
    unit: 'mg/dL',
    defaultUnit: 'mg/dL',
    minNormal: 0.2,
    maxNormal: 1.2,
    criticalHigh: 3.0,
    category: 'Liver Function',
    clinicalMeaning: 'Bilirubin is a yellow breakdown product of normal heme catabolism cleared by the liver.',
    clinicalMeaningBn: 'বিলিরুবিন হলো রক্তে পিত্তরসের পরিমাণ, যার বৃদ্ধিতে জন্ডিস দেখা দেয়।',
    lowAlert: 'Normal baseline reading.',
    lowAlertBn: 'স্বাভাবিক মাত্রা।',
    highAlert: 'Hyperbilirubinemia causes jaundice (yellow eyes/skin) from hemolysis or biliary obstruction.',
    highAlertBn: 'বিলিরুবিন বেশি থাকায় জন্ডিসের লক্ষণ প্রকাশ পায়। চিকিৎসকের পরামর্শ আবশ্যক।'
  },

  // 5. Kidney / Renal Function (KFT)
  {
    id: 'creatinine',
    name: 'Serum Creatinine',
    patterns: [/serum\s*creatinine\b/i, /\bcreatinine\b/i],
    unit: 'mg/dL',
    defaultUnit: 'mg/dL',
    minNormal: 0.7,
    maxNormal: 1.2,
    criticalHigh: 3.5,
    category: 'Kidney Function',
    clinicalMeaning: 'Breakdown byproduct of muscle creatine phosphate filtered purely by glomeruli of the kidneys.',
    clinicalMeaningBn: 'কিডনির ফিল্ট্রেশন বা রক্ত পরিশোধনের ক্ষমতা মূল্যায়নের প্রধান পরীক্ষা।',
    lowAlert: 'Low creatinine relates to decreased muscle mass or severe malnutrition.',
    lowAlertBn: 'স্বাভাবিকের চেয়ে কম মাত্রা।',
    highAlert: 'Elevated Creatinine signifies impaired renal filtration or acute/chronic kidney dysfunction.',
    highAlertBn: 'সিরাম ক্রিয়েটিনিন বৃদ্ধি কিডনির কার্যক্ষমতা কমে যাওয়ার স্পষ্ট লক্ষণ।'
  },
  {
    id: 'uric_acid',
    name: 'Serum Uric Acid',
    patterns: [/serum\s*uric\s*acid\b/i, /uric\s*acid\b/i],
    unit: 'mg/dL',
    defaultUnit: 'mg/dL',
    minNormal: 3.5,
    maxNormal: 7.2,
    category: 'Kidney Function',
    clinicalMeaning: 'Waste product from end-stage purine nucleotide metabolic degradation.',
    clinicalMeaningBn: 'শরীরের পিউরিন ভাঙার ফলে উৎপন্ন উপাদান যা অতিরিক্ত হলে গেঁটে বাত সৃষ্টি করে।',
    lowAlert: 'Clinically benign low values.',
    lowAlertBn: 'স্বাভাবিক মাত্রা।',
    highAlert: 'Hyperuricemia can precipitate painful gouty arthritis in joints and urate renal calculi (stones).',
    highAlertBn: 'ইউরিক এসিড বেশি থাকায় অস্থিসন্ধিতে তীব্র ব্যথা (বাত) এবং কিডনিতে পাথর হতে পারে।'
  },

  // 6. Thyroid Panel
  {
    id: 'tsh',
    name: 'TSH (Thyroid Stimulating)',
    patterns: [/\btsh\b/i, /thyroid\s*stimulating\s*hormone\b/i],
    unit: 'uIU/mL',
    defaultUnit: 'uIU/mL',
    minNormal: 0.4,
    maxNormal: 4.5,
    criticalLow: 0.05,
    criticalHigh: 15.0,
    category: 'Thyroid Panel',
    clinicalMeaning: 'Pituitary hormone directing the thyroid gland to synthesize and secrete thyroxine.',
    clinicalMeaningBn: 'থাইরয়েড গ্রন্থিকে নিয়ন্ত্রণকারী হরমোন যা বিপাকক্রিয়া পরিচালনা করে।',
    lowAlert: 'Suppressed TSH (< 0.4) indicates Hyperthyroidism (overactive thyroid).',
    lowAlertBn: 'টিএসএইচ কম থাকা থাইরয়েডের অতিরিক্ত সক্রিয়তা (হাইপারথাইরয়েডিজম) নির্দেশ করে।',
    highAlert: 'Elevated TSH (> 4.5) indicates Primary Hypothyroidism (underactive thyroid).',
    highAlertBn: 'টিএসএইচ বেশি থাকা থাইরয়েডের কম কার্যক্ষমতা (হাইপোথাইরয়েডিজম) নির্দেশ করে।'
  }
];

/**
 * Extracts biomarkers from any raw medical text (from OCR, PDF, or text file).
 */
export function extractBiomarkersFromText(
  rawText: string,
  fileName?: string
): MedicalReportData {
  const lines = rawText.split(/\r?\n/);
  const foundParameters: ReportParameter[] = [];
  const foundBiomarkerIds = new Set<string>();

  // Determine lab name if available
  let detectedLab = 'Laboratory Diagnostics Centre • Khulna';
  if (/popular/i.test(rawText)) detectedLab = 'Popular Diagnostic Centre, KDA Avenue, Khulna';
  else if (/ibn\s*sina/i.test(rawText)) detectedLab = 'Ibn Sina Diagnostic Centre, Khulna';
  else if (/labaid/i.test(rawText)) detectedLab = 'LabAid Diagnostics, Sonadanga, Khulna';
  else if (/square/i.test(rawText)) detectedLab = 'Square Hospital Clinical Laboratory';
  else if (/city\s*medical/i.test(rawText)) detectedLab = 'Khulna City Medical College Pathology Lab';
  else if (fileName) detectedLab = `Uploaded Document: ${fileName}`;

  // Extract patient name if mentioned
  let detectedPatient = 'Registered Patient';
  const patientMatch = rawText.match(/(?:patient\s*name|name)\s*[:=-]?\s*([A-Za-z\s.]+)/i);
  if (patientMatch && patientMatch[1].trim().length > 2 && patientMatch[1].trim().length < 35) {
    detectedPatient = patientMatch[1].trim();
  }

  // Scan for each known biomarker
  for (const biomarker of KNOWN_BIOMARKERS) {
    let matchedValue: number | null = null;
    let matchedUnit = biomarker.defaultUnit;

    for (const pattern of biomarker.patterns) {
      // Regex looking for pattern followed by colon/equals/spaces and a numeric value
      const regex = new RegExp(
        `(?:${pattern.source})\\s*[:=~-]?\\s*([0-9]+(?:\\.[0-9]+)?)\\s*([a-zA-Z/%^]+)?`,
        'i'
      );

      // Check line by line
      for (const line of lines) {
        const match = line.match(regex);
        if (match && match[1]) {
          const val = parseFloat(match[1]);
          if (!isNaN(val)) {
            matchedValue = val;
            if (match[2]) matchedUnit = match[2];
            break;
          }
        }
      }

      if (matchedValue !== null) break;

      // Full text search if not found on single line
      const fullMatch = rawText.match(regex);
      if (fullMatch && fullMatch[1]) {
        const val = parseFloat(fullMatch[1]);
        if (!isNaN(val)) {
          matchedValue = val;
          if (fullMatch[2]) matchedUnit = fullMatch[2];
          break;
        }
      }
    }

    if (matchedValue !== null && !foundBiomarkerIds.has(biomarker.id)) {
      foundBiomarkerIds.add(biomarker.id);

      // Unit normalization for platelets: if 1.5 - 4.5, it's Lakh/cumm; if 150000+, it's /cumm
      let minN = biomarker.minNormal;
      let maxN = biomarker.maxNormal;
      let displayUnit = matchedUnit || biomarker.unit;

      if (biomarker.id === 'platelets') {
        if (matchedValue < 10.0) {
          // Expressed in lakhs (e.g. 2.4 Lakh)
          displayUnit = 'lakh/cumm';
          minN = 1.5;
          maxN = 4.5;
        } else {
          displayUnit = '/cumm';
          minN = 150000;
          maxN = 450000;
        }
      }

      // Fasting Blood Sugar: mmol/L vs mg/dL
      if (biomarker.id === 'fbs' || biomarker.id === 'rbs') {
        if (matchedValue > 25.0) {
          // In mg/dL
          displayUnit = 'mg/dL';
          minN = biomarker.id === 'fbs' ? 70.0 : 79.0;
          maxN = biomarker.id === 'fbs' ? 100.0 : 140.0;
        } else {
          displayUnit = 'mmol/L';
          minN = biomarker.id === 'fbs' ? 4.0 : 4.4;
          maxN = biomarker.id === 'fbs' ? 5.6 : 7.8;
        }
      }

      // Determine status
      let status: ReportParameter['status'] = 'normal';
      let meaning = biomarker.clinicalMeaning;

      if (biomarker.criticalLow !== undefined && matchedValue <= biomarker.criticalLow) {
        status = 'critical';
        meaning = biomarker.criticalAlert || biomarker.lowAlert;
      } else if (biomarker.criticalHigh !== undefined && matchedValue >= biomarker.criticalHigh) {
        status = 'critical';
        meaning = biomarker.criticalAlert || biomarker.highAlert;
      } else if (matchedValue < minN) {
        status = 'low';
        meaning = biomarker.lowAlert;
      } else if (matchedValue > maxN) {
        status = 'high';
        meaning = biomarker.highAlert;
      }

      foundParameters.push({
        name: biomarker.name,
        value: matchedValue,
        unit: displayUnit,
        referenceRange: `${minN} - ${maxN} ${displayUnit}`,
        status,
        clinicalMeaning: meaning,
        minNormal: minN,
        maxNormal: maxN
      });
    }
  }

  // Fallback: If no known biomarkers matched but file has text, extract any key-value numbers
  if (foundParameters.length === 0) {
    const genericNumberMatches = lines.map((l) => {
      const m = l.match(/([A-Za-z\s()/-]{3,30})\s*[:=-]\s*([0-9]+(?:\.[0-9]+)?)\s*([a-zA-Z/%]*)/);
      if (m && m[1] && m[2]) {
        return {
          name: m[1].trim(),
          val: parseFloat(m[2]),
          unit: m[3] ? m[3].trim() : 'pts'
        };
      }
      return null;
    }).filter(Boolean);

    for (const item of genericNumberMatches.slice(0, 8)) {
      if (!item) continue;
      foundParameters.push({
        name: item.name,
        value: item.val,
        unit: item.unit,
        referenceRange: 'Standard Clinical Range',
        status: 'normal',
        clinicalMeaning: `${item.name} extracted from document with numerical value ${item.val} ${item.unit}.`,
        minNormal: item.val * 0.8,
        maxNormal: item.val * 1.2
      });
    }
  }

  // If still completely empty (e.g. image with unreadable text or non-text PDF), provide an insightful prompt
  if (foundParameters.length === 0) {
    foundParameters.push({
      name: 'Document Analysis Status',
      value: 'Scanned',
      unit: '',
      referenceRange: 'Clear Text Required',
      status: 'normal',
      clinicalMeaning: 'The document was uploaded and scanned. If parameters were not recognized automatically, you can paste or type the laboratory numbers directly in the text editor below.',
      minNormal: 0,
      maxNormal: 100
    });
  }

  // Determine dominant category
  const categories = foundParameters.map((p) => {
    const foundBio = KNOWN_BIOMARKERS.find((b) => b.name === p.name);
    return foundBio ? foundBio.category : 'Complete Blood Count';
  });
  const dominantCategory = categories[0] || 'Complete Blood Count';

  // Compute counts
  const abnormal = foundParameters.filter((p) => p.status !== 'normal');

  // Formulate rich clinical interpretation
  const interpretation = interpretClinicalFindings(foundParameters, dominantCategory);

  return {
    id: `upload-${Date.now()}`,
    title: interpretation.title || `${dominantCategory} Analysis`,
    date: new Date().toISOString().split('T')[0],
    labName: detectedLab,
    category: dominantCategory,
    patientName: detectedPatient,
    patientAge: 35,
    parameters: foundParameters,
    overallSummary: interpretation.overallSummary,
    overallSummaryBn: interpretation.overallSummaryBn,
    clinicalImpression: interpretation.clinicalImpression,
    clinicalImpressionBn: interpretation.clinicalImpressionBn,
    riskLevel: interpretation.riskLevel,
    affectedOrgans: interpretation.affectedOrgans,
    affectedOrgansBn: interpretation.affectedOrgansBn,
    bodyImpact: interpretation.bodyImpact,
    bodyImpactBn: interpretation.bodyImpactBn,
    dietaryAdvice: interpretation.dietaryAdvice,
    dietaryAdviceBn: interpretation.dietaryAdviceBn,
    lifestyleAdvice: interpretation.lifestyleAdvice,
    lifestyleAdviceBn: interpretation.lifestyleAdviceBn,
    recommendedSpecialty: interpretation.recommendedSpecialty,
    recommendedSpecialtyBn: interpretation.recommendedSpecialtyBn,
    questionsForPhysician: interpretation.questionsForPhysician,
    questionsForPhysicianBn: interpretation.questionsForPhysicianBn
  };
}

export interface ClinicalInterpretation {
  title: string;
  clinicalImpression: string;
  clinicalImpressionBn: string;
  riskLevel: 'normal' | 'mild' | 'moderate' | 'high' | 'critical';
  affectedOrgans: string[];
  affectedOrgansBn: string[];
  overallSummary: string;
  overallSummaryBn: string;
  bodyImpact: string;
  bodyImpactBn: string;
  dietaryAdvice: string[];
  dietaryAdviceBn: string[];
  lifestyleAdvice: string[];
  lifestyleAdviceBn: string[];
  recommendedSpecialty: string;
  recommendedSpecialtyBn: string;
  questionsForPhysician: string[];
  questionsForPhysicianBn: string[];
}

/**
 * Advanced Medical Diagnostic Interpreter
 * Synthesizes individual laboratory parameters into an accurate, cohesive clinical overview.
 */
export function interpretClinicalFindings(
  parameters: ReportParameter[],
  dominantCategory: string
): ClinicalInterpretation {
  const getParam = (namePattern: RegExp) => parameters.find((p) => namePattern.test(p.name));
  const abnormal = parameters.filter((p) => p.status !== 'normal');

  // Biomarker value lookups
  const hb = getParam(/hemoglobin|hgb|hb/i);
  const mcv = getParam(/mcv/i);
  const wbc = getParam(/wbc|tlc/i);
  const plt = getParam(/platelet/i);
  const chol = getParam(/total\s*cholesterol|cholesterol/i);
  const ldl = getParam(/ldl/i);
  const hdl = getParam(/hdl/i);
  const tg = getParam(/triglyceride/i);
  const fbs = getParam(/fasting\s*blood\s*sugar|fbs|fasting\s*glucose/i);
  const hba1c = getParam(/hba1c|glycated/i);
  const sgpt = getParam(/sgpt|alt/i);
  const sgot = getParam(/sgot|ast/i);
  const bili = getParam(/bilirubin/i);
  const creat = getParam(/creatinine/i);
  const uric = getParam(/uric\s*acid/i);
  const tsh = getParam(/tsh/i);

  // Default interpretation for All Normal
  if (abnormal.length === 0) {
    return {
      title: 'Normal Clinical Panel',
      clinicalImpression: 'Healthy Physiological Baseline (All Biomarkers Within Range)',
      clinicalImpressionBn: 'স্বাভাবিক স্বাস্থ্যকর অবস্থা (সকল বায়োমার্কার স্বাভাবিক সীমার মধ্যে রয়েছে)',
      riskLevel: 'normal',
      affectedOrgans: ['Cardiovascular System', 'Liver & Kidneys', 'Metabolic Balance'],
      affectedOrgansBn: ['হৃদযন্ত্র ও রক্ত সংবহন', 'লিভার ও কিডনি', 'বিপাকীয় ভারসাম্য'],
      overallSummary:
        'All tested laboratory parameters are resting comfortably within verified medical reference intervals. There is no evidence of acute systemic inflammation, anemia, organ filtration compromise, or lipid burden.',
      overallSummaryBn:
        'আপনার রিপোর্টের সকল ল্যাব প্যারামিটার স্বাভাবিক সীমার মধ্যে রয়েছে। কোনো রক্তস্বল্পতা, প্রদাহ, কিডনি বা লিভারের জটিলতার লক্ষণ পাওয়া যায়নি। শরীর সুস্থ রাখতে নিয়মিত সুষম খাবার ও ব্যায়াম বজায় রাখুন।',
      bodyImpact:
        'Your body tissues are receiving optimal oxygen delivery, cell renewal is stable, and liver/kidney detoxification is functioning normally.',
      bodyImpactBn:
        'আপনার শরীরের টিস্যুগুলোতে পর্যাপ্ত অক্সিজেন পৌঁছাচ্ছে এবং লিভার ও কিডনির ছাঁকন ক্ষমতা সম্পূর্ণ স্বাভাবিকভাবে কাজ করছে।',
      dietaryAdvice: [
        'Maintain balanced hydration (2.5 - 3 liters of water daily).',
        'Consume diverse vegetables, seasonal fruits, and whole grains.',
        'Avoid excessive processed foods, refined sugars, and trans fats.'
      ],
      dietaryAdviceBn: [
        'প্রতিদিন পর্যাপ্ত বিশুদ্ধ পানি (২.৫ - ৩ লিটার) পান করুন।',
        'নিয়মিত মৌসুমি ফলমূল, শাকসবজি ও আঁশযুক্ত খাবার খান।',
        'অতিরিক্ত ভাজাপোড়া, মিষ্টি ও কোমল পানীয় এড়িয়ে চলুন।'
      ],
      lifestyleAdvice: [
        'Continue at least 30 minutes of moderate aerobic activity 5 days weekly.',
        'Ensure 7-8 hours of regular, restorative sleep.',
        'Plan a routine preventative health screening in 12 months.'
      ],
      lifestyleAdviceBn: [
        'সপ্তাহে অন্তত ৫ দিন ৩০ মিনিট করে হাঁটা বা হালকা ব্যায়াম করুন।',
        'প্রতিদিন ৭-৮ ঘণ্টা পর্যাপ্ত ঘুমানোর অভ্যাস গড়ে তুলুন।',
        'বছরে অন্তত একবার রুটিন স্বাস্থ্য পরীক্ষা করুন।'
      ],
      recommendedSpecialty: 'General Medicine / Preventative Health',
      recommendedSpecialtyBn: 'জেনারেল মেডিসিন / নিয়মিত স্বাস্থ্য পরামর্শ',
      questionsForPhysician: [
        'Based on my healthy profile, when should I schedule my next routine screening?',
        'Are there any specific dietary adjustments recommended for my age group?',
        'Do I need any routine vitamin D or micronutrient supplementation?'
      ],
      questionsForPhysicianBn: [
        'আমার রিপোর্ট স্বাভাবিক থাকায় পরবর্তীতে কখন রুটিন চেকআপ করা উচিত?',
        'আমার বয়স অনুযায়ী খাদ্যাভ্যাসে কোনো বিশেষ পরিবর্তন দরকার আছে কি?',
        'কোনো ভিটামিন সাপ্লিমেন্টের প্রয়োজন আছে কি না?'
      ]
    };
  }

  // 1. ANEMIA PATTERN
  if (hb && hb.status === 'low') {
    const isMicrocytic = mcv && Number(mcv.value) < 80;
    return {
      title: 'Complete Blood Count: Anemia Pattern',
      clinicalImpression: isMicrocytic
        ? 'Microcytic Hypochromic Anemia Pattern (Iron Deficiency Suspected)'
        : 'Anemia Pattern (Reduced Red Blood Cell Oxygen Transport)',
      clinicalImpressionBn: isMicrocytic
        ? 'মাইক্রোসাইটিক হাইপোক্রোমিক অ্যানিমিয়া (আয়রনের ঘাটতিজনিত রক্তস্বল্পতা)'
        : 'রক্তস্বল্পতা বা অ্যানিমিয়া (অক্সিজেন পরিবহন ক্ষমতা হ্রাস)',
      riskLevel: Number(hb.value) < 7.5 ? 'critical' : 'moderate',
      affectedOrgans: ['Blood & Erythrocytes', 'Heart (Compensatory Tachycardia)', 'Brain (Oxygenation)'],
      affectedOrgansBn: ['রক্তকণিকা ও হিমোগ্লোবিন', 'হৃদযন্ত্র (হার্টরেট বৃদ্ধি)', 'মস্তিষ্কে অক্সিজেন সঞ্চালন'],
      overallSummary: `Your report indicates low Hemoglobin (${hb.value} ${hb.unit}, normal: ${hb.referenceRange}). ${
        isMicrocytic ? 'The low MCV confirms microcytosis (abnormally small red cells), typical of iron deficiency or minor hemoglobinopathy.' : ''
      } Your blood is carrying less oxygen than required, which is the primary cause of fatigue and shortness of breath upon exertion.`,
      overallSummaryBn: `আপনার রিপোর্টে হিমোগ্লোবিনের মাত্রা স্বাভাবিকের চেয়ে কম (${hb.value} ${hb.unit})। ${
        isMicrocytic ? 'লোহিত রক্তকণিকার আকার স্বাভাবিকের চেয়ে ছোট, যা সাধারণত খাদ্যে আয়রনের ঘাটতি বা রক্তক্ষরণের কারণে হয়।' : ''
      } রক্তে হিমোগ্লোবিন কম থাকায় শরীরে অক্সিজেন সরবরাহ কমে যায়, যার ফলে ক্লান্তি, দুর্বলতা ও মাথা ঘোরার মতো উপসর্গ দেখা দিতে পারে।`,
      bodyImpact:
        'Reduced hemoglobin forces the heart to pump faster to circulate sufficient oxygen, causing occasional palpitations, cold hands and feet, dizziness, and daytime fatigue.',
      bodyImpactBn:
        'শরীরে অক্সিজেন ঘাটতি পূরণে হৃদযন্ত্রকে দ্রুত রক্ত পাম্প করতে হয়, যার কারণে বুক ধড়ফড়, ক্লান্তি, দুর্বলতা, এবং হাত-পা ঠান্ডা হয়ে আসার মতো সমস্যা হতে পারে।',
      dietaryAdvice: [
        'Increase heme iron foods: liver (কলিজা), lean red meat, fish, and eggs.',
        'Plant-based iron: spinach (পালং শাক), lentils (ডাল), chickpeas, beets, and pomegranate (বেদানা).',
        'Pair iron foods with Vitamin C (lemons, amla, oranges) to double absorption; avoid tea/coffee within 1 hour of meals.'
      ],
      dietaryAdviceBn: [
        'আয়রনসমৃদ্ধ খাবার খান: কলিজা, লাল মাংস, ডিম ও ছোট মাছ।',
        'উদ্ভিজ্জ আয়রন: পালং শাক, কচু শাক, মসুর ডাল, বেদানা ও বিট।',
        'খাবারের সাথে ভিটামিন সি (লেবু বা আমলকী) খেলে আয়রন দ্রুত শোষিত হয়; খাবারের সাথে চা বা কফি খাবেন না।'
      ],
      lifestyleAdvice: [
        'Avoid strenuous heavy lifting until hemoglobin levels normalize.',
        'Schedule a serum ferritin and iron profile test to confirm the root cause.',
        'Consult a physician for prescription oral iron tablets (e.g., Ferrous Fumarate + Folic Acid).'
      ],
      lifestyleAdviceBn: [
        'হিমোগ্লোবিন স্বাভাবিক না হওয়া পর্যন্ত অতিরিক্ত ভারী কাজ থেকে বিরত থাকুন।',
        'আয়রনের প্রকৃত ঘাটতি নিশ্চিত করতে সিরাম ফেরিটিন (Serum Ferritin) টেস্ট করান।',
        'ডাক্তারের পরামর্শ নিয়ে আয়রন ও ফলিক এসিড সাপ্লিমেন্ট গ্রহণ করুন।'
      ],
      recommendedSpecialty: 'Hematology / Internal Medicine Specialist',
      recommendedSpecialtyBn: 'হেমাটোলজি (রক্তরোগ) বা ইন্টারনাল মেডিসিন বিশেষজ্ঞ',
      questionsForPhysician: [
        'Should I undergo a serum ferritin or iron saturation profile?',
        'Do I need prescription iron supplements, and for how many months?',
        'Are there any underlying sources of blood or nutritional loss that need investigation?'
      ],
      questionsForPhysicianBn: [
        'আমার কি সিরাম ফেরিটিন বা আয়রন প্রোফাইল টেস্ট করানো উচিত?',
        'আমার জন্য কি কোনো প্রেসক্রিপশন আয়রন ট্যাবলেটের প্রয়োজন আছে?',
        'রক্তস্বল্পতার পেছনে অভ্যন্তরীণ কোনো কারণ বা রক্তপাতের উৎস আছে কি না?'
      ]
    };
  }

  // 2. DYSLIPIDEMIA / CHOLESTEROL PATTERN
  if ((chol && chol.status === 'high') || (ldl && ldl.status === 'high') || (tg && tg.status === 'high')) {
    const elevated = [
      chol?.status === 'high' ? `Cholesterol (${chol.value} mg/dL)` : null,
      ldl?.status === 'high' ? `LDL (${ldl.value} mg/dL)` : null,
      tg?.status === 'high' ? `Triglycerides (${tg.value} mg/dL)` : null
    ].filter(Boolean).join(', ');

    return {
      title: 'Lipid Profile: Dyslipidemia & Cardiovascular Risk',
      clinicalImpression: 'Atherogenic Dyslipidemia Pattern (Elevated Circulating Blood Lipids)',
      clinicalImpressionBn: 'উচ্চ কোলেস্টেরল ও রক্তনালীতে চর্বি জমার ঝুঁকি (ডিসলিপিডেমিয়া)',
      riskLevel: ldl && Number(ldl.value) > 160 ? 'high' : 'moderate',
      affectedOrgans: ['Coronary Arteries (Heart)', 'Carotid Vessels (Brain)', 'Liver (Fatty Infiltration)'],
      affectedOrgansBn: ['হৃদযন্ত্রের ধমনী (করোনারি আর্টারি)', 'মস্তিষ্কের রক্তনালী', 'লিভার (ফ্যাটি লিভার)'],
      overallSummary: `Your lipid profile shows elevation in ${elevated}. Elevated LDL ('bad') cholesterol and triglycerides directly deposit oxidized plaque onto arterial linings, progressively restricting lumen blood flow.`,
      overallSummaryBn: `আপনার রক্তে চর্বির মাত্রা বেশি (${elevated})। অতিরিক্ত খারাপ কোলেস্টেরল (LDL) ও ট্রাইগ্লিসারাইড রক্তনালীর ভেতরের দেয়ালে চর্বির স্তর তৈরি করে নালী সরু করে দেয়, যা ভবিষ্যতে হৃদরোগ ও স্ট্রোকের ঝুঁকি বহুগুণ বাড়ায়।`,
      bodyImpact:
        'Plaque deposits narrow arterial blood flow to the myocardium (heart) and cerebral cortex, raising the incidence of hypertension, angina, and ischemic events.',
      bodyImpactBn:
        'রক্তনালীতে চর্বি জমার ফলে হার্ট ও মস্তিষ্কে রক্ত সঞ্চালনে বাধা সৃষ্টি হয়, যা উচ্চ রক্তচাপ, বুকে অস্বস্তি এবং দীর্ঘমেয়াদে হার্ট অ্যাটাকের ঝুঁকি বৃদ্ধি করে।',
      dietaryAdvice: [
        'Strictly eliminate deep-fried foods (পরোটা, পুরি, সিঙ্গাড়া) and palm/dalda fats.',
        'Switch to cold-pressed mustard oil, olive oil, or rice bran oil in minimal quantities.',
        'Consume soluble fiber daily: oats, chia seeds, garlic, and fresh apples/pears.'
      ],
      dietaryAdviceBn: [
        'তেলে ভাজা ও চর্বিযুক্ত খাবার (সিঙ্গাড়া, পুরি, পরোটা, খাসির মাংস) পুরোপুরি পরিহার করুন।',
        'রান্নায় তেলের ব্যবহার সর্বনিম্ন করুন; খাঁটি সরিষার তেল বা অলিভ অয়েল ব্যবহার করুন।',
        'প্রতিদিন দ্রবণীয় আঁশযুক্ত খাবার খান: ওটস, ইসুবগুলের ভুসি, রসুন এবং তাজা ফল।'
      ],
      lifestyleAdvice: [
        'Engage in 40 minutes of uninterrupted brisk walking daily.',
        'Target a 5-7% reduction in body weight over the next 3 months.',
        'Consult a cardiologist regarding whether HMG-CoA reductase inhibitor (Statin) therapy is indicated.'
      ],
      lifestyleAdviceBn: [
        'প্রতিদিন অন্তত ৪০ মিনিট টানা দ্রুত হাঁটার অভ্যাস গড়ে তুলুন।',
        'আগামী ৩ মাসে নিজের ওজন ৫-৭% কমানোর লক্ষ্য নির্ধারণ করুন।',
        'কোলেস্টেরল নিয়ন্ত্রণের জন্য স্ট্যাটিন (Statin) জাতীয় ওষুধ প্রয়োজন কি না ডাক্তারের সাথে আলোচনা করুন।'
      ],
      recommendedSpecialty: 'Cardiology / Preventive Heart Specialist',
      recommendedSpecialtyBn: 'কার্ডিওলজি (হৃদরোগ বিশেষজ্ঞ)',
      questionsForPhysician: [
        'Does my LDL level warrant lipid-lowering prescription medication (statin)?',
        'Should I undergo a resting ECG or Echocardiogram to assess coronary status?',
        'What is my 10-year Atherosclerotic Cardiovascular Disease (ASCVD) risk score?'
      ],
      questionsForPhysicianBn: [
        'আমার কোলেস্টেরল কমাতে কি স্ট্যাটিন জাতীয় ওষুধের প্রয়োজন আছে?',
        'আমার হার্টের বর্তমান অবস্থা যাচাইয়ে ইসিজি বা ইকোকার্ডিওগ্রাম করা দরকার কি?',
        'আমার খাদ্যাভ্যাস ও ব্যায়ামের পাশাপাশি কোন কোন দিক নজর রাখতে হবে?'
      ]
    };
  }

  // 3. DIABETES / GLYCEMIC PATTERN
  if ((fbs && fbs.status === 'high') || (hba1c && hba1c.status === 'high')) {
    const isDiabetes = (fbs && Number(fbs.value) >= 7.0) || (hba1c && Number(hba1c.value) >= 6.5);
    return {
      title: isDiabetes ? 'Diabetic Glycemic Profile' : 'Impaired Fasting Glycemia (Prediabetes)',
      clinicalImpression: isDiabetes
        ? 'Diabetes Mellitus Glycemic Pattern (Elevated Systemic Glucose)'
        : 'Prediabetes Pattern (Impaired Fasting Glucose Regulation)',
      clinicalImpressionBn: isDiabetes
        ? 'ডায়াবেটিস মেলিটাস (রক্তে অতিরিক্ত শর্করার উপস্থিতি)'
        : 'প্রি-ডায়াবেটিস (ডায়াবেটিসের পূর্ববর্তী ঝুঁকিপূর্ণ অবস্থা)',
      riskLevel: isDiabetes ? 'high' : 'moderate',
      affectedOrgans: ['Pancreatic Beta Cells', 'Kidney Microvasculature', 'Retinal Capillaries', 'Peripheral Nerves'],
      affectedOrgansBn: ['অগ্ন্যাশয় (প্যানক্রিয়াস)', 'কিডনির রক্তজালিকা', 'চোখের রেটিনা', 'স্নায়ুতন্ত্র (নার্ভ)'],
      overallSummary: `Your test reveals elevated glucose levels${fbs ? ` (Fasting Blood Sugar: ${fbs.value} ${fbs.unit})` : ''}${
        hba1c ? ` and HbA1c of ${hba1c.value}%` : ''
      }. ${isDiabetes ? 'This diagnostic range confirms active Diabetes Mellitus.' : 'This level reflects Prediabetes, requiring immediate dietary intervention before progression.'}`,
      overallSummaryBn: `আপনার রিপোর্টে রক্তে শর্করার মাত্রা বেশি পাওয়া গেছে${fbs ? ` (খালি পেটে সুগার: ${fbs.value} ${fbs.unit})` : ''}${
        hba1c ? ` এবং ৩ মাসের গড় সুগার (HbA1c): ${hba1c.value}%` : ''
      }। ${isDiabetes ? 'এই মাত্রা ডায়াবেটিসের স্পষ্ট লক্ষণ।' : 'এটি প্রি-ডায়াবেটিস নির্দেশ করে, এখনই সতর্ক না হলে পুরোপুরি ডায়াবেটিসে রূপ নিতে পারে।'}` ,
      bodyImpact:
        'Chronic excess glucose binds to vascular tissue proteins (glycation), progressively injuring capillary networks in the eyes, glomeruli in kidneys, and nerve endings in feet.',
      bodyImpactBn:
        'রক্তে দীর্ঘ সময় অতিরিক্ত চিনি থাকলে তা রক্তনালী ও স্নায়ুর ক্ষতি করে, যার ফলে দৃষ্টিশক্তি হ্রাস, কিডনির জটিলতা এবং হাত-পায়ে অবশ ভাব বা জ্বালাপোড়া হতে পারে।',
      dietaryAdvice: [
        'Completely eliminate sugar, soft drinks, honey, condensed milk, and sweets.',
        'Reduce white rice and potato; switch to whole wheat brown flour (লাল আটা) and brown rice.',
        'Incorporate bitter gourd (করলা), fenugreek (মেথি), and fresh green leafy vegetables daily.'
      ],
      dietaryAdviceBn: [
        'চিনি, মিষ্টি, মধু, কোল্ড ড্রিংকস ও প্রক্রিয়াজাত খাবার পুরোপুরি বাদ দিন।',
        'সাদা ভাত ও আলুর পরিমাণ কমিয়ে লাল আটার রুটি ও শাকসবজির পরিমাণ বাড়ান।',
        'খাবারে করলা, মেথি ও প্রচুর সবুজ শাকসবজি অন্তর্ভুক্ত করুন।'
      ],
      lifestyleAdvice: [
        'Perform 30-45 minutes of aerobic exercise daily after meals to stimulate glucose disposal.',
        'Monitor fasting and 2-hour post-prandial blood sugar weekly in a log.',
        'Consult an Endocrinologist / Diabetologist for appropriate oral hypoglycemic therapy.'
      ],
      lifestyleAdviceBn: [
        'প্রতিদিন খাবারের পর অন্তত ৩০-৪০ মিনিট হাঁটাচলা করুন যাতে পেশিগুলো অতিরিক্ত চিনি শোষণ করে নেয়।',
        'নিয়মিত ব্লাড সুগার মেপে ডায়েরিতে লিখে রাখুন।',
        'ডায়াবেটিস বিশেষজ্ঞের সাথে পরামর্শ করে ওষুধ বা ইনসুলিন পরিকল্পনা গ্রহণ করুন।'
      ],
      recommendedSpecialty: 'Endocrinology / Diabetes Specialist',
      recommendedSpecialtyBn: 'এন্ডোক্রাইনোলজি ও ডায়াবেটিস বিশেষজ্ঞ',
      questionsForPhysician: [
        'What should be my target fasting and 2-hour post-meal glucose ranges?',
        'Do I need oral anti-diabetic medications (e.g. Metformin)?',
        'Should I undergo baseline kidney (microalbuminuria) and eye fundoscopy tests?'
      ],
      questionsForPhysicianBn: [
        'আমার খালি পেটে ও ভরা পেটে সুগারের আদর্শ মাত্রা কত থাকা উচিত?',
        'আমার জন্য কি কোনো ওষুধের (যেমন মেটফরমিন) প্রয়োজন আছে?',
        'ডায়াবেটিসের কারণে কিডনি বা চোখের কোনো ক্ষতি হয়েছে কি না তা পরীক্ষার পরামর্শ আছে কি?'
      ]
    };
  }

  // 4. LIVER FUNCTION / HEPATIC PATTERN
  if ((sgpt && sgpt.status === 'high') || (sgot && sgot.status === 'high') || (bili && bili.status === 'high')) {
    return {
      title: 'Liver Function Test: Hepatic Transaminitis',
      clinicalImpression: 'Hepatocellular Stress Pattern (Elevated Transaminase Enzymes)',
      clinicalImpressionBn: 'লিভারের প্রদাহ বা ফ্যাটি লিভারের লক্ষণ (ট্রান্সঅ্যামিনাইটিস)',
      riskLevel: sgpt && Number(sgpt.value) > 150 ? 'high' : 'moderate',
      affectedOrgans: ['Liver Hepatocytes', 'Biliary Ducts', 'Metabolic Filtration'],
      affectedOrgansBn: ['লিভারের কোষসমূহ', 'পিত্তথলি ও পিত্তনালী', 'বিপাকীয় প্রক্রিয়াকরণ'],
      overallSummary: `Your test displays elevated liver transaminases (SGPT/ALT: ${sgpt?.value || 'Elevated'} U/L). This indicates cell wall permeability or inflammation in hepatic tissue, most frequently attributable to non-alcoholic fatty liver disease (NAFLD) or drug toxicity.`,
      overallSummaryBn: `আপনার লিভারের প্রধান এনজাইম (SGPT/ALT: ${sgpt?.value || 'বেশি'} U/L) স্বাভাবিকের চেয়ে বেশি। এর অর্থ লিভারের কোষে প্রদাহ বা চাপ রয়েছে, যা মূলত ফ্যাটি লিভার (চর্বি জমা), অনিয়মিত খাদ্যাভ্যাস বা অতিরিক্ত ওষুধের প্রতিক্রিয়ায় ঘটে।`,
      bodyImpact:
        'Inflamed liver cells experience compromised protein synthesis and metabolic clearance, leading to abdominal fullness, fatigue, and impaired lipid processing.',
      bodyImpactBn:
        'লিভারের কোষে প্রদাহের কারণে শরীরে ক্লান্তি, পেট ফাঁপা, হজমে সমস্যা ও অস্বস্তি বোধ হতে পারে।',
      dietaryAdvice: [
        'Avoid all fatty meat, ghee, butter, and processed fast foods.',
        'Eliminate unnecessary over-the-counter painkillers (Paracetamol, NSAIDs).',
        'Eat fresh papaya, green tea, turmeric, and steamed vegetables.'
      ],
      dietaryAdviceBn: [
        'চর্বিযুক্ত মাংস, ঘি, মাখন ও অতিরিক্ত তৈলাক্ত খাবার সম্পূর্ণরূপে পরিহার করুন।',
        'অপ্রয়োজনে প্যারাসিটামল বা ব্যথানাশক ওষুধ খাওয়া বন্ধ রাখুন।',
        'কাঁচা পেঁপে, গ্রিন টি, হলুদ ও সেদ্ধ শাকসবজি বেশি করে খান।'
      ],
      lifestyleAdvice: [
        'Undergo an Ultrasonography of Whole Abdomen to grade fatty liver severity (Grade 1/2).',
        'Screen for Hepatitis B & C surface viral markers.',
        'Target progressive 10% weight loss through daily aerobic exercise.'
      ],
      lifestyleAdviceBn: [
        'ফ্যাটি লিভারের গ্রেড যাচাই করতে পেটের আল্ট্রাসনোগ্রাম (USG of Whole Abdomen) করান।',
        'হেপাটাইটিস বি ও সি ভাইরাস স্ক্রিনিং টেস্ট করিয়ে নিন।',
        'প্রতিদিন ব্যায়াম করে শরীরের ওজন নিয়ন্ত্রণে রাখুন।'
      ],
      recommendedSpecialty: 'Gastroenterology & Hepatology Specialist',
      recommendedSpecialtyBn: 'গ্যাস্ট্রোএন্টারোলজি ও লিভার বিশেষজ্ঞ',
      questionsForPhysician: [
        'Do I need an abdominal ultrasound to evaluate fatty liver severity?',
        'Should I test for viral hepatitis markers (HBsAg, Anti-HCV)?',
        'Are any of my current medications placing strain on liver enzymes?'
      ],
      questionsForPhysicianBn: [
        'আমার কি পেটের আল্ট্রাসনোগ্রাম করানো প্রয়োজন?',
        'হেপাটাইটিস ভাইরাস পরীক্ষার কোনো দরকার আছে কি?',
        'আমার নিয়মিত কোনো ওষুধের কারণে লিভারে এই চাপ তৈরি হচ্ছে কি না?'
      ]
    };
  }

  // 5. KIDNEY / RENAL PATTERN
  if ((creat && creat.status === 'high') || (uric && uric.status === 'high')) {
    return {
      title: 'Renal Function Test: Filtration Strain',
      clinicalImpression: 'Renal Filtration Stress & Azotemia Pattern',
      clinicalImpressionBn: 'কিডনির ফিল্ট্রেশন ক্ষমতা হ্রাস ও ইউরিক এসিডের আধিক্য',
      riskLevel: creat && Number(creat.value) > 2.0 ? 'high' : 'moderate',
      affectedOrgans: ['Kidney Glomeruli & Nephrons', 'Joint Synovium (Urate Crystals)', 'Fluid Homeostasis'],
      affectedOrgansBn: ['কিডনির ছাঁকন কোষ (নেফ্রন)', 'অস্থিসন্ধি (বাতজনিত ব্যথা)', 'শরীরের তরল ভারসাম্য'],
      overallSummary: `Your test indicates elevated Serum Creatinine (${creat?.value || 'Elevated'} mg/dL) or Uric Acid (${uric?.value || 'Elevated'} mg/dL). This signifies that the glomerular filters of your kidneys are clearing metabolic byproducts at a diminished rate.`,
      overallSummaryBn: `আপনার রিপোর্টে সিরাম ক্রিয়েটিনিন (${creat?.value || 'বেশি'} mg/dL) বা ইউরিক এসিড স্বাভাবিকের চেয়ে বেশি। এটি কিডনির রক্ত পরিশোধনের কার্যক্ষমতা কমে যাওয়ার স্পষ্ট ইঙ্গিত দেয়। এখনই সঠিক পদক্ষেপ না নিলে কিডনির কার্যক্ষমতা আরও কমে যেতে পারে।`,
      bodyImpact:
        'Reduced filtration causes retention of nitrogenous wastes, water retention (swelling around ankles and eyes), elevated blood pressure, and joint crystal deposition (gout).',
      bodyImpactBn:
        'কিডনি ঠিকমতো বর্জ্য পরিষ্কার করতে না পারলে রক্তচাপ বেড়ে যায়, পায়ে বা চোখের নিচে পানি জমতে পারে এবং অস্থিসন্ধিতে তীব্র ব্যথার সৃষ্টি হয়।',
      dietaryAdvice: [
        'Drink adequate water throughout the day (unless fluid restriction is advised).',
        'Strictly reduce high-purine foods (red meat, organ meats, spinach, shrimp/prawn).',
        'Limit salt (sodium) intake to under 1 teaspoon daily; avoid raw salt at meals.'
      ],
      dietaryAdviceBn: [
        'সারাদিনে পর্যাপ্ত বিশুদ্ধ পানি পান করুন।',
        'উচ্চ পিউরিনযুক্ত খাবার (লাল মাংস, কলিজা, পুঁইশাক, চিংড়ি মাছ) কঠোরভাবে বর্জন করুন।',
        'লবণের পরিমাণ কমিয়ে দিন; পাতে কাঁচা লবণ খাওয়া পুরোপুরি বন্ধ করুন।'
      ],
      lifestyleAdvice: [
        'Strictly avoid NSAID painkillers (Diclofenac, Naproxen, Ketorolac) which damage nephrons.',
        'Monitor blood pressure daily; maintain BP below 130/80 mmHg.',
        'Consult a Nephrologist for estimated Glomerular Filtration Rate (eGFR) and urine protein test.'
      ],
      lifestyleAdviceBn: [
        'ব্যথানাশক ওষুধ (NSAIDs যেমন ডাইক্লোফেনাক, নেপ্রোক্সেন) খাওয়া থেকে সম্পূর্ণ বিরত থাকুন, কারণ এগুলো কিডনি নষ্ট করে।',
        'রক্তচাপ নিয়মিত মাপুন এবং ১৩০/৮০ এর নিচে রাখার চেষ্টা করুন।',
        'কিডনি বিশেষজ্ঞের পরামর্শ নিয়ে ইউরিন টেস্ট ও eGFR পরীক্ষা করান।'
      ],
      recommendedSpecialty: 'Nephrology (Kidney Specialist)',
      recommendedSpecialtyBn: 'নেফ্রোলজি (কিডনি বিশেষজ্ঞ)',
      questionsForPhysician: [
        'What is my calculated eGFR (estimated Glomerular Filtration Rate)?',
        'Should I undergo a 24-hour urine protein or spot ACR test?',
        'Do any of my medications need dosage adjustment for renal clearance?'
      ],
      questionsForPhysicianBn: [
        'আমার কিডনির বর্তমান ছাঁকন ক্ষমতা (eGFR) কত শতাংশ কাজ করছে?',
        'প্রস্রাবে প্রোটিন যাচ্ছে কি না তা পরীক্ষার প্রয়োজন আছে কি?',
        'আমার রক্তচাপ ও কিডনি সুরক্ষায় কী কী ওষুধ প্রয়োজন?'
      ]
    };
  }

  // Generic fallback if abnormal parameters are miscellaneous
  const abnormalList = abnormal.map((p) => `${p.name} (${p.value} ${p.unit})`).join(', ');
  return {
    title: `${dominantCategory} Analysis`,
    clinicalImpression: `Clinical Variant Detected (${abnormal.length} Parameter${abnormal.length > 1 ? 's' : ''} Out of Range)`,
    clinicalImpressionBn: `প্যারামিটারের তারতম্য শনাক্ত (${abnormal.length}টি বায়োমার্কার স্বাভাবিক সীমার বাইরে)`,
    riskLevel: 'mild',
    affectedOrgans: ['Metabolic Balance', 'General Physiology'],
    affectedOrgansBn: ['বিপাকীয় ভারসাম্য', 'সাধারণ শারীরিক অবস্থা'],
    overallSummary: `The laboratory scan detected numerical variations outside reference limits in: ${abnormalList}. These readings should be evaluated in context with your clinical symptoms and physical examination.`,
    overallSummaryBn: `আপনার রিপোর্টে নিম্নলিখিত প্যারামিটারগুলোর তারতম্য পাওয়া গেছে: ${abnormalList}। এই ফলাফলগুলো আপনার শারীরিক উপসর্গের সাথে মিলিয়ে দেখতে চিকিৎসকের সাথে পরামর্শ করা বাঞ্ছনীয়।`,
    bodyImpact: 'Mild metabolic fluctuations that may cause occasional fatigue or require dietary recalibration.',
    bodyImpactBn: 'মৃদু শারীরিক তারতম্য যা খাদ্যাভ্যাস পরিবর্তন বা প্রয়োজনীয় জীবনধারা সংশোধনের মাধ্যমে সমাধান সম্ভব।',
    dietaryAdvice: [
      'Focus on whole, unprocessed nutrition with abundant vegetables.',
      'Maintain regular hydration and avoid excessive packaged snacks.'
    ],
    dietaryAdviceBn: [
      'তাজা ও পুষ্টিকর খাবার গ্রহণ করুন এবং প্রচুর পানি পান করুন।',
      'অতিরিক্ত প্রক্রিয়াজাত ও প্যাকেটজাত খাবার এড়িয়ে চলুন।'
    ],
    lifestyleAdvice: [
      'Maintain regular sleep and 30 minutes of daily physical activity.',
      'Bring this laboratory report to your physician for physical correlation.'
    ],
    lifestyleAdviceBn: [
      'প্রতিদিন অন্তত ৩০ মিনিট হাঁটাহাঁটি করুন এবং সঠিক সময়ে ঘুমান।',
      'রিপোর্টটি আপনার ডাক্তারের কাছে নিয়ে শারীরিক পরীক্ষার সাথে মিলিয়ে নিন।'
    ],
    recommendedSpecialty: 'Internal Medicine / General Physician',
    recommendedSpecialtyBn: 'ইন্টারনাল মেডিসিন / জেনারেল ফিজিশিয়ান',
    questionsForPhysician: [
      'Do these specific out-of-range parameters require repeat testing?',
      'Are there any immediate lifestyle modifications recommended?'
    ],
    questionsForPhysicianBn: [
      'এই মানগুলো পুনরায় টেস্ট করার প্রয়োজন আছে কি?',
      'খাদ্যাভ্যাস বা জীবনযাত্রায় তাৎক্ষণিক কোনো পরিবর্তন দরকার কি না?'
    ]
  };
}

/**
 * Extracts raw ASCII & UTF-8 text strings from a PDF ArrayBuffer
 */
export function extractTextFromPdfBuffer(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binaryString = '';
  const chunkSize = 8192;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binaryString += String.fromCharCode.apply(
      null,
      Array.from(bytes.subarray(i, i + chunkSize))
    );
  }

  const extractedLines: string[] = [];

  // Match text within PDF parentheses: (text)
  const parenMatches = binaryString.matchAll(/\(([^()]+)\)/g);
  for (const match of parenMatches) {
    const text = match[1].replace(/\\([()\\])/g, '$1').trim();
    if (text.length > 1 && /[A-Za-z0-9]/.test(text)) {
      extractedLines.push(text);
    }
  }

  // Also match stream text blocks if readable
  const streamMatches = binaryString.matchAll(/stream[\r\n]+([\s\S]*?)[\r\n]+endstream/g);
  for (const sm of streamMatches) {
    const content = sm[1];
    const textTokens = content.match(/[A-Za-z0-9.:/%=-]{2,}/g);
    if (textTokens && textTokens.length > 3) {
      extractedLines.push(textTokens.join(' '));
    }
  }

  return extractedLines.join('\n');
}

/**
 * Reads a text file (.txt, .csv, .log, etc.)
 */
export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve((e.target?.result as string) || '');
    reader.onerror = (e) => reject(e);
    reader.readAsText(file);
  });
}

/**
 * Reads any File as ArrayBuffer (for PDF parsing)
 */
export function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve((e.target?.result as ArrayBuffer) || new ArrayBuffer(0));
    reader.onerror = (e) => reject(e);
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Performs OCR on an image file using Tesseract.js (loaded dynamically via CDN)
 */
export async function performImageOcr(
  file: File,
  onProgress?: (progress: number, status: string) => void
): Promise<string> {
  const win = window as any;
  if (!win.Tesseract) {
    onProgress?.(15, 'Loading Optical Recognition engine...');
    try {
      await loadScript('https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js');
    } catch (err) {
      console.warn('Could not load online Tesseract script:', err);
    }
  }

  if (win.Tesseract && win.Tesseract.recognize) {
    onProgress?.(30, 'Scanning text and biomarkers...');
    try {
      const result = await win.Tesseract.recognize(file, 'eng', {
        logger: (m: any) => {
          if (m && m.status === 'recognizing text') {
            const pct = Math.round(30 + (m.progress || 0) * 60);
            onProgress?.(pct, `Recognizing characters (${pct}%)...`);
          }
        }
      });
      return result?.data?.text || '';
    } catch (err) {
      console.warn('Tesseract OCR error:', err);
    }
  }

  // Fallback
  return `Medical Report Document: ${file.name}\nSize: ${(file.size / 1024).toFixed(1)} KB`;
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = (err) => reject(err);
    document.head.appendChild(script);
  });
}

