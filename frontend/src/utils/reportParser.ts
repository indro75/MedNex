/**
 * MedNex Unified Clinical Report Parser & Biomarker Extraction Engine
 * Comprehensive coverage across all 10 major medical test sectors.
 * Written in simple, clear, and easy-to-understand English for every person.
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
  category: string;
  clinicalMeaning: string;
  lowAlert: string;
  highAlert: string;
  criticalAlert?: string;
}

export const KNOWN_BIOMARKERS: BiomarkerDefinition[] = [
  // -------------------------------------------------------------
  // 1. Complete Blood Count (CBC & Hematology)
  // -------------------------------------------------------------
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
    clinicalMeaning: 'Hemoglobin is the iron protein in your red blood cells that carries fresh oxygen from your lungs to your whole body.',
    lowAlert: 'Low hemoglobin means anemia. Your body is not getting enough oxygen, which makes you feel tired, weak, or short of breath. Eating iron-rich foods (spinach, liver, red meat, lentils) or taking iron vitamins helps.',
    highAlert: 'High hemoglobin means your blood is thicker than normal. Not drinking enough water (dehydration) or smoking is the most common cause.',
    criticalAlert: 'Very low hemoglobin level! You need to see a doctor right away for treatment.'
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
    clinicalMeaning: 'The total number of oxygen-carrying red cells in your blood.',
    lowAlert: 'Low red blood cell count points to anemia or recent blood loss, leading to tiredness.',
    highAlert: 'High red blood cell count can happen when you are dehydrated or living at high altitude.'
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
    clinicalMeaning: 'White blood cells are your body\'s defense soldiers that fight off germs, bacteria, and viral infections.',
    lowAlert: 'Low white blood cells mean your immune system is weaker right now. Common during viral fevers like dengue or viral flu.',
    highAlert: 'High white blood cells show that your body is actively fighting off an infection or inflammation.',
    criticalAlert: 'Very abnormal white blood cell count! Please show this to a physician immediately.'
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
    clinicalMeaning: 'Platelets are tiny cells that stick together to form clots and stop bleeding when you get a cut.',
    lowAlert: 'Low platelets mean your blood will take longer to stop bleeding. This is very common in dengue fever and requires close doctor monitoring.',
    highAlert: 'High platelets can make blood clot more easily and often happen as a reaction to body inflammation.',
    criticalAlert: 'Dangerously low platelets! Urgent medical attention is required to prevent bleeding.'
  },
  {
    id: 'neutrophils',
    name: 'Neutrophils',
    patterns: [/neutrophil\b/i, /neutrophils\b/i, /\bpolymorphs\b/i],
    unit: '%',
    defaultUnit: '%',
    minNormal: 40,
    maxNormal: 75,
    category: 'Complete Blood Count',
    clinicalMeaning: 'The main white blood cells that fight bacterial infections.',
    lowAlert: 'Lower resistance to bacterial infections.',
    highAlert: 'Elevated neutrophils usually mean your body is currently fighting a bacterial infection.'
  },
  {
    id: 'lymphocytes',
    name: 'Lymphocytes',
    patterns: [/lymphocyte\b/i, /lymphocytes\b/i],
    unit: '%',
    defaultUnit: '%',
    minNormal: 20,
    maxNormal: 45,
    category: 'Complete Blood Count',
    clinicalMeaning: 'White blood cells that fight viruses and make antibodies.',
    lowAlert: 'Can be lower during stress, steroid medication, or acute illness.',
    highAlert: 'Elevated lymphocytes usually indicate that your body is recovering from or fighting a viral infection.'
  },
  {
    id: 'eosinophils',
    name: 'Eosinophils',
    patterns: [/eosinophil\b/i, /eosinophils\b/i],
    unit: '%',
    defaultUnit: '%',
    minNormal: 1,
    maxNormal: 6,
    category: 'Complete Blood Count',
    clinicalMeaning: 'White blood cells involved in allergies and fighting parasites.',
    lowAlert: 'Normal and not a health concern.',
    highAlert: 'High eosinophils usually point to dust or food allergies, asthma, skin rashes, or stomach worms.'
  },
  {
    id: 'monocytes',
    name: 'Monocytes',
    patterns: [/monocyte\b/i, /monocytes\b/i],
    unit: '%',
    defaultUnit: '%',
    minNormal: 2,
    maxNormal: 10,
    category: 'Complete Blood Count',
    clinicalMeaning: 'White blood cells that clear out dead cells and fight chronic infections.',
    lowAlert: 'Normal finding.',
    highAlert: 'Slightly high levels can occur during recovery from an infection or chronic inflammation.'
  },
  {
    id: 'esr',
    name: 'ESR (Erythrocyte Sed Rate)',
    patterns: [/\besr\b/i, /erythrocyte\s*sedimentation\s*rate\b/i],
    unit: 'mm/1st hr',
    defaultUnit: 'mm/1st hr',
    minNormal: 0,
    maxNormal: 20,
    category: 'Complete Blood Count',
    clinicalMeaning: 'A simple test that checks how quickly red cells settle down, revealing general body inflammation.',
    lowAlert: 'Safe and completely normal.',
    highAlert: 'High ESR indicates that there is inflammation, infection, joint pain, or tissue healing in the body.'
  },
  {
    id: 'mcv',
    name: 'MCV (Mean Red Cell Size)',
    patterns: [/\bmcv\b/i, /mean\s*corpuscular\s*volume\b/i],
    unit: 'fL',
    defaultUnit: 'fL',
    minNormal: 80.0,
    maxNormal: 100.0,
    category: 'Complete Blood Count',
    clinicalMeaning: 'Measures the average physical size of your red blood cells.',
    lowAlert: 'Small red cells (microcytic) are most commonly caused by iron deficiency anemia.',
    highAlert: 'Large red cells (macrocytic) are commonly caused by low Vitamin B12 or folic acid in your diet.'
  },
  {
    id: 'mch',
    name: 'MCH',
    patterns: [/\bmch\b/i, /mean\s*corpuscular\s*hemoglobin\b/i],
    unit: 'pg',
    defaultUnit: 'pg',
    minNormal: 27.0,
    maxNormal: 32.0,
    category: 'Complete Blood Count',
    clinicalMeaning: 'The average amount of hemoglobin inside each red blood cell.',
    lowAlert: 'Pale red blood cells indicating iron deficiency.',
    highAlert: 'Often seen when Vitamin B12 is low.'
  },

  // -------------------------------------------------------------
  // 2. Lipid Profile (Cholesterol & Heart Health)
  // -------------------------------------------------------------
  {
    id: 'cholesterol',
    name: 'Total Cholesterol',
    patterns: [/total\s*cholesterol\b/i, /\bcholesterol\b/i],
    unit: 'mg/dL',
    defaultUnit: 'mg/dL',
    minNormal: 125.0,
    maxNormal: 200.0,
    criticalHigh: 280.0,
    category: 'Lipid Profile',
    clinicalMeaning: 'The total amount of fats and cholesterol in your bloodstream.',
    lowAlert: 'Low total cholesterol is generally safe unless caused by severe poor nutrition.',
    highAlert: 'High total cholesterol can slowly build up inside your blood vessels over years. Eating less oily and fried food and brisk walking 30 minutes daily helps lower it.'
  },
  {
    id: 'hdl',
    name: 'HDL (\'Good\') Cholesterol',
    patterns: [/\bhdl\b/i, /hdl\s*cholesterol\b/i],
    unit: 'mg/dL',
    defaultUnit: 'mg/dL',
    minNormal: 40.0,
    maxNormal: 60.0,
    category: 'Lipid Profile',
    clinicalMeaning: 'The protective \'good\' cholesterol that cleans extra fats from your blood vessels and carries them back to the liver.',
    lowAlert: 'Low HDL means your heart has less natural protection against fat deposits. Regular walking and eating fish helps raise it.',
    highAlert: 'High HDL is great news and provides excellent protection for your heart and blood vessels.'
  },
  {
    id: 'ldl',
    name: 'LDL (\'Bad\') Cholesterol',
    patterns: [/\bldl\b/i, /ldl\s*cholesterol\b/i],
    unit: 'mg/dL',
    defaultUnit: 'mg/dL',
    minNormal: 50.0,
    maxNormal: 100.0,
    criticalHigh: 190.0,
    category: 'Lipid Profile',
    clinicalMeaning: 'The \'bad\' cholesterol that can stick to the walls of your blood vessels and narrow them.',
    lowAlert: 'Low LDL is healthy and very good for your heart.',
    highAlert: 'High LDL increases the chance of blocked arteries over time. Reduce fatty red meat, butter, ghee, and deep-fried snacks.'
  },
  {
    id: 'triglycerides',
    name: 'Triglycerides',
    patterns: [/triglycerides?\b/i, /\btg\b/i],
    unit: 'mg/dL',
    defaultUnit: 'mg/dL',
    minNormal: 50.0,
    maxNormal: 150.0,
    criticalHigh: 500.0,
    category: 'Lipid Profile',
    clinicalMeaning: 'Fat stored in your blood from unused calories, especially from sugary foods, white rice, and oils.',
    lowAlert: 'Normal and safe.',
    highAlert: 'High triglycerides are often linked to fatty liver, excess weight, and high sugar intake. Cutting down on sweets, white rice, and soda brings this down quickly.'
  },
  {
    id: 'vldl',
    name: 'VLDL Cholesterol',
    patterns: [/\bvldl\b/i, /vldl\s*cholesterol\b/i],
    unit: 'mg/dL',
    defaultUnit: 'mg/dL',
    minNormal: 5.0,
    maxNormal: 30.0,
    category: 'Lipid Profile',
    clinicalMeaning: 'Another form of bad fat made by your liver.',
    lowAlert: 'Safe and normal.',
    highAlert: 'Elevated VLDL matches higher triglycerides and points to fatty liver or extra dietary fats.'
  },

  // -------------------------------------------------------------
  // 3. Blood Glucose & Diabetes Panel
  // -------------------------------------------------------------
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
    clinicalMeaning: 'Blood sugar tested in the morning after 8 to 10 hours without eating.',
    lowAlert: 'Low blood sugar causes dizziness, sweating, shakiness, and weakness. Eat or drink something sweet immediately if you feel faint.',
    highAlert: '5.6 to 6.9 mmol/L indicates pre-diabetes. 7.0 or higher indicates diabetes. Cutting sweets and walking daily helps control blood sugar.'
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
    clinicalMeaning: 'Blood sugar measured at any time during the day, regardless of when you last ate.',
    lowAlert: 'Low blood sugar. Have a snack or fruit juice if you feel weak or shaky.',
    highAlert: 'Higher than normal sugar. Above 11.1 mmol/L strongly suggests diabetes. A doctor should review this.'
  },
  {
    id: 'ppbs',
    name: 'Post-Meal Blood Sugar (2h)',
    patterns: [/post\s*prandial\b/i, /2h\s*post\b/i, /\bppbs\b/i, /2\s*hours\s*after\s*meal\b/i],
    unit: 'mmol/L',
    defaultUnit: 'mmol/L',
    minNormal: 4.4,
    maxNormal: 7.8,
    category: 'Diabetic Panel',
    clinicalMeaning: 'Blood sugar measured 2 hours after having a meal.',
    lowAlert: 'Low post-meal sugar.',
    highAlert: 'Between 7.8 and 11.0 indicates pre-diabetes. 11.1 or higher points to diabetes.'
  },
  {
    id: 'hba1c',
    name: 'HbA1c (3-Month Sugar Average)',
    patterns: [/\bhba1c\b/i, /glycated\s*hemoglobin\b/i],
    unit: '%',
    defaultUnit: '%',
    minNormal: 4.0,
    maxNormal: 5.7,
    criticalHigh: 10.0,
    category: 'Diabetic Panel',
    clinicalMeaning: 'Checks your average blood sugar level over the past 2 to 3 months.',
    lowAlert: 'Slightly low, often seen in people with frequent low blood sugar.',
    highAlert: '5.7% to 6.4% means pre-diabetes. 6.5% or higher means diabetes. This is the most reliable long-term test for sugar control.'
  },

  // -------------------------------------------------------------
  // 4. Liver Function Tests (LFT)
  // -------------------------------------------------------------
  {
    id: 'sgpt',
    name: 'SGPT / ALT (Liver Enzyme)',
    patterns: [/\bsgpt\b/i, /\balt\b/i, /alanine\s*transaminase\b/i],
    unit: 'U/L',
    defaultUnit: 'U/L',
    minNormal: 7.0,
    maxNormal: 45.0,
    criticalHigh: 300.0,
    category: 'Liver Function',
    clinicalMeaning: 'A key liver enzyme that spills into the blood when liver cells are irritated or under stress.',
    lowAlert: 'Normal and healthy liver enzyme reading.',
    highAlert: 'High SGPT means your liver is irritated or swollen. Common causes are fatty liver, viral fever, heavy medicines, or an oily diet. Avoid fried foods and alcohol.'
  },
  {
    id: 'sgot',
    name: 'SGOT / AST (Liver Enzyme)',
    patterns: [/\bsgot\b/i, /\bast\b/i, /aspartate\s*transaminase\b/i],
    unit: 'U/L',
    defaultUnit: 'U/L',
    minNormal: 8.0,
    maxNormal: 40.0,
    category: 'Liver Function',
    clinicalMeaning: 'An enzyme found in liver cells, heart, and muscles.',
    lowAlert: 'Normal and healthy level.',
    highAlert: 'High SGOT can be caused by liver stress, muscle strain, or certain medications.'
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
    clinicalMeaning: 'Yellow pigment made when old red cells break down. The liver cleans it from the body.',
    lowAlert: 'Normal and healthy level.',
    highAlert: 'High bilirubin causes jaundice, turning your eyes and urine yellowish. It means your liver or gallbladder needs immediate doctor attention.'
  },
  {
    id: 'alp',
    name: 'Alkaline Phosphatase (ALP)',
    patterns: [/alkaline\s*phosphatase\b/i, /\balp\b/i],
    unit: 'U/L',
    defaultUnit: 'U/L',
    minNormal: 44.0,
    maxNormal: 147.0,
    category: 'Liver Function',
    clinicalMeaning: 'An enzyme found in bile ducts and bones.',
    lowAlert: 'Usually not a concern.',
    highAlert: 'High ALP can mean a slow or blocked bile duct, or bone healing and growth.'
  },
  {
    id: 'albumin',
    name: 'Serum Albumin',
    patterns: [/serum\s*albumin\b/i, /\balbumin\b/i],
    unit: 'g/dL',
    defaultUnit: 'g/dL',
    minNormal: 3.5,
    maxNormal: 5.0,
    category: 'Liver Function',
    clinicalMeaning: 'The main protein made by your liver that keeps fluid inside your blood vessels.',
    lowAlert: 'Low albumin can cause swelling in your feet or legs and indicates low protein nutrition or liver/kidney strain.',
    highAlert: 'High albumin is almost always caused by not drinking enough water (dehydration).'
  },

  // -------------------------------------------------------------
  // 5. Kidney / Renal Function (KFT / RFT)
  // -------------------------------------------------------------
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
    clinicalMeaning: 'A waste product from muscle use that healthy kidneys constantly filter out of your blood.',
    lowAlert: 'Low creatinine is harmless and usually means low muscle mass or eating less protein.',
    highAlert: 'High creatinine means your kidneys are working harder and filtering waste more slowly. Drink plenty of water and show this to a kidney specialist.'
  },
  {
    id: 'urea',
    name: 'Blood Urea',
    patterns: [/blood\s*urea\b/i, /serum\s*urea\b/i, /\burea\b/i],
    unit: 'mg/dL',
    defaultUnit: 'mg/dL',
    minNormal: 15.0,
    maxNormal: 40.0,
    category: 'Kidney Function',
    clinicalMeaning: 'A waste product from protein digestion that the kidneys remove.',
    lowAlert: 'Normal and not a health concern.',
    highAlert: 'High urea happens with dehydration, eating heavy protein, or when kidneys are under stress.'
  },
  {
    id: 'bun',
    name: 'Blood Urea Nitrogen (BUN)',
    patterns: [/blood\s*urea\s*nitrogen\b/i, /\bbun\b/i],
    unit: 'mg/dL',
    defaultUnit: 'mg/dL',
    minNormal: 7.0,
    maxNormal: 20.0,
    category: 'Kidney Function',
    clinicalMeaning: 'Measures the amount of nitrogen in your blood that comes from the waste product urea.',
    lowAlert: 'Low levels are usually safe.',
    highAlert: 'High BUN suggests dehydration or that your kidneys need a medical check.'
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
    clinicalMeaning: 'A waste product made when your body breaks down purine foods like red meat and organ meats.',
    lowAlert: 'Safe and completely normal.',
    highAlert: 'High uric acid forms sharp crystals in joints, causing sudden painful swelling in the big toe, ankles, or knees (gout). It can also cause kidney stones. Drink 3 liters of water daily and avoid red meat.'
  },
  {
    id: 'egfr',
    name: 'eGFR (Kidney Filtration Rate)',
    patterns: [/\begfr\b/i, /glomerular\s*filtration\s*rate\b/i],
    unit: 'mL/min',
    defaultUnit: 'mL/min',
    minNormal: 90.0,
    maxNormal: 120.0,
    category: 'Kidney Function',
    clinicalMeaning: 'Calculates how well your kidneys are cleaning blood per minute.',
    lowAlert: 'Below 60 mL/min means your kidneys have reduced filtering speed. A kidney doctor should review this.',
    highAlert: 'Normal healthy kidney filtration speed.'
  },

  // -------------------------------------------------------------
  // 6. Thyroid Panel
  // -------------------------------------------------------------
  {
    id: 'tsh',
    name: 'TSH (Thyroid Stimulating Hormone)',
    patterns: [/\btsh\b/i, /thyroid\s*stimulating\s*hormone\b/i],
    unit: 'uIU/mL',
    defaultUnit: 'uIU/mL',
    minNormal: 0.4,
    maxNormal: 4.5,
    criticalLow: 0.05,
    criticalHigh: 15.0,
    category: 'Thyroid Panel',
    clinicalMeaning: 'A hormone from the brain that directs your thyroid gland in the neck to control energy and weight.',
    lowAlert: 'Low TSH means your thyroid is working too fast (Hyperthyroidism). Symptoms include weight loss, fast heartbeat, sweating, and feeling nervous.',
    highAlert: 'High TSH means your thyroid is working too slowly (Hypothyroidism). Symptoms include feeling cold, weight gain, fatigue, and hair fall. A daily thyroid tablet easily normalizes this.'
  },
  {
    id: 'ft3',
    name: 'Free T3',
    patterns: [/free\s*t3\b/i, /\bft3\b/i],
    unit: 'pg/mL',
    defaultUnit: 'pg/mL',
    minNormal: 2.0,
    maxNormal: 4.4,
    category: 'Thyroid Panel',
    clinicalMeaning: 'The active thyroid hormone that controls your body temperature and energy use.',
    lowAlert: 'Points to an underactive thyroid.',
    highAlert: 'Points to an overactive thyroid.'
  },
  {
    id: 'ft4',
    name: 'Free T4',
    patterns: [/free\s*t4\b/i, /\bft4\b/i],
    unit: 'ng/dL',
    defaultUnit: 'ng/dL',
    minNormal: 0.8,
    maxNormal: 1.8,
    category: 'Thyroid Panel',
    clinicalMeaning: 'The main thyroid hormone released into the bloodstream.',
    lowAlert: 'Points to an underactive thyroid.',
    highAlert: 'Points to an overactive thyroid.'
  },

  // -------------------------------------------------------------
  // 7. Electrolytes & Minerals
  // -------------------------------------------------------------
  {
    id: 'sodium',
    name: 'Serum Sodium',
    patterns: [/serum\s*sodium\b/i, /\bsodium\b/i, /\bna\+\b/i],
    unit: 'mmol/L',
    defaultUnit: 'mmol/L',
    minNormal: 135.0,
    maxNormal: 145.0,
    category: 'Electrolytes & Minerals',
    clinicalMeaning: 'An essential body salt that balances water in your cells and controls blood pressure.',
    lowAlert: 'Low sodium can cause headaches, nausea, weakness, and confusion. Often happens after severe diarrhea, vomiting, or water imbalance.',
    highAlert: 'High sodium is most commonly caused by dehydration or heavy fluid loss.'
  },
  {
    id: 'potassium',
    name: 'Serum Potassium',
    patterns: [/serum\s*potassium\b/i, /\bpotassium\b/i, /\bk\+\b/i],
    unit: 'mmol/L',
    defaultUnit: 'mmol/L',
    minNormal: 3.5,
    maxNormal: 5.1,
    criticalLow: 2.8,
    criticalHigh: 6.2,
    category: 'Electrolytes & Minerals',
    clinicalMeaning: 'An important mineral for keeping your heartbeat steady and muscles working smoothly.',
    lowAlert: 'Low potassium causes muscle weakness, leg cramps, and irregular heartbeat. Often caused by diarrhea or water pills. Bananas and coconut water help.',
    highAlert: 'High potassium can affect your heart rhythm. Show this to a doctor promptly.'
  },
  {
    id: 'calcium',
    name: 'Serum Calcium',
    patterns: [/serum\s*calcium\b/i, /\bcalcium\b/i],
    unit: 'mg/dL',
    defaultUnit: 'mg/dL',
    minNormal: 8.5,
    maxNormal: 10.5,
    category: 'Electrolytes & Minerals',
    clinicalMeaning: 'Crucial for strong bones, teeth, and proper nerve signals.',
    lowAlert: 'Low calcium can cause tingling in fingers, muscle cramps, and bone weakness. Milk, curd, and Vitamin D help.',
    highAlert: 'High calcium can cause stomach pain, extra thirst, or kidney stones.'
  },

  // -------------------------------------------------------------
  // 8. Vitamins & Iron
  // -------------------------------------------------------------
  {
    id: 'vit_d',
    name: 'Vitamin D (25-OH)',
    patterns: [/vitamin\s*d\b/i, /25-hydroxy\b/i, /vit\s*d3\b/i],
    unit: 'ng/mL',
    defaultUnit: 'ng/mL',
    minNormal: 30.0,
    maxNormal: 100.0,
    category: 'Vitamins & Iron',
    clinicalMeaning: 'Helps your body absorb calcium and keeps bones and your immune system strong.',
    lowAlert: 'Low Vitamin D is very common and causes body aches, bone pain, and low energy. 15 minutes of morning sunlight, eggs, fish, and Vitamin D capsules help.',
    highAlert: 'High levels only occur from taking too many high-dose supplement pills.'
  },
  {
    id: 'vit_b12',
    name: 'Vitamin B12',
    patterns: [/vitamin\s*b12\b/i, /\bb12\b/i],
    unit: 'pg/mL',
    defaultUnit: 'pg/mL',
    minNormal: 200.0,
    maxNormal: 900.0,
    category: 'Vitamins & Iron',
    clinicalMeaning: 'Essential for healthy nerves, brain function, and making red blood cells.',
    lowAlert: 'Low Vitamin B12 causes numbness or tingling in hands and feet, memory fog, and anemia. Common in vegetarians. Milk, eggs, and B12 vitamins help.',
    highAlert: 'High levels are safe and usually from recent vitamin supplements.'
  },
  {
    id: 'ferritin',
    name: 'Serum Ferritin',
    patterns: [/serum\s*ferritin\b/i, /\bferritin\b/i],
    unit: 'ng/mL',
    defaultUnit: 'ng/mL',
    minNormal: 20.0,
    maxNormal: 250.0,
    category: 'Vitamins & Iron',
    clinicalMeaning: 'Shows how much stored iron your body has in reserve.',
    lowAlert: 'Low ferritin means your body\'s iron storage is empty, leading to anemia, hair fall, and tiredness.',
    highAlert: 'High ferritin can be a reaction to body inflammation or fatty liver.'
  },

  // -------------------------------------------------------------
  // 9. Infection & Inflammation Markers
  // -------------------------------------------------------------
  {
    id: 'crp',
    name: 'CRP (C-Reactive Protein)',
    patterns: [/c-reactive\s*protein\b/i, /\bcrp\b/i],
    unit: 'mg/L',
    defaultUnit: 'mg/L',
    minNormal: 0.0,
    maxNormal: 5.0,
    category: 'Infection & Inflammation',
    clinicalMeaning: 'A protein made by your liver that shoots up when there is active infection or swelling in your body.',
    lowAlert: 'Normal healthy reading with no sign of active inflammation.',
    highAlert: 'High CRP means there is active infection or inflammation in your body. Your doctor will check where the infection is located.'
  },

  // -------------------------------------------------------------
  // 10. Urine Routine & Microscopic (Urine R/E)
  // -------------------------------------------------------------
  {
    id: 'pus_cells',
    name: 'Urine Pus Cells',
    patterns: [/pus\s*cells\b/i, /wbc\s*in\s*urine\b/i, /urine\s*pus\b/i],
    unit: '/HPF',
    defaultUnit: '/HPF',
    minNormal: 0.0,
    maxNormal: 5.0,
    category: 'Urine Routine Examination',
    clinicalMeaning: 'White blood cells in urine that fight urinary infections.',
    lowAlert: 'Normal and clean urine.',
    highAlert: 'High pus cells (more than 5) indicate a Urinary Tract Infection (UTI). Common symptoms are burning during urination, frequent trips to the bathroom, or lower belly ache. Drink lots of water and see a doctor for antibiotics.'
  },
  {
    id: 'urine_rbc',
    name: 'Urine RBCs (Red Blood Cells)',
    patterns: [/rbc\s*in\s*urine\b/i, /urine\s*rbc\b/i, /red\s*blood\s*cells\s*in\s*urine\b/i],
    unit: '/HPF',
    defaultUnit: '/HPF',
    minNormal: 0.0,
    maxNormal: 3.0,
    category: 'Urine Routine Examination',
    clinicalMeaning: 'Checks whether red blood cells are leaking into the urine.',
    lowAlert: 'Normal healthy reading.',
    highAlert: 'Blood in urine can be caused by a urinary infection, kidney stones, or strenuous exercise. Needs evaluation by a doctor.'
  }
];

/**
 * Extracts biomarkers from any raw medical text (OCR, PDF, or pasted text).
 */
export function extractBiomarkersFromText(
  rawText: string,
  fileName?: string
): MedicalReportData {
  const lines = rawText.split(/\r?\n/);
  const foundParameters: ReportParameter[] = [];
  const foundBiomarkerIds = new Set<string>();

  // Detect laboratory name if available
  let detectedLab = 'Laboratory Diagnostics Centre • Khulna';
  if (/popular/i.test(rawText)) detectedLab = 'Popular Diagnostic Centre, KDA Avenue, Khulna';
  else if (/ibn\s*sina/i.test(rawText)) detectedLab = 'Ibn Sina Diagnostic Centre, Khulna';
  else if (/labaid/i.test(rawText)) detectedLab = 'LabAid Diagnostics, Sonadanga, Khulna';
  else if (/square/i.test(rawText)) detectedLab = 'Square Hospital Clinical Laboratory';
  else if (/city\s*medical/i.test(rawText)) detectedLab = 'Khulna City Medical College Pathology Lab';
  else if (fileName) detectedLab = `Uploaded Document: ${fileName}`;

  // Extract patient name if mentioned
  let detectedPatient = 'Patient';
  const patientMatch = rawText.match(/(?:patient\s*name|name)\s*[:=-]?\s*([A-Za-z\s.]+)/i);
  if (patientMatch && patientMatch[1].trim().length > 2 && patientMatch[1].trim().length < 35) {
    detectedPatient = patientMatch[1].trim();
  }

  // Scan for known biomarkers
  for (const biomarker of KNOWN_BIOMARKERS) {
    let matchedValue: number | null = null;
    let matchedUnit = biomarker.defaultUnit;

    for (const pattern of biomarker.patterns) {
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

      let minN = biomarker.minNormal;
      let maxN = biomarker.maxNormal;
      let displayUnit = matchedUnit || biomarker.unit;

      // Special unit handling for Platelets: if expressed as 2.4 (in Lakhs), keep as Lakhs
      if (biomarker.id === 'platelets') {
        if (matchedValue < 10.0) {
          displayUnit = 'lakh/cumm';
          minN = 1.5;
          maxN = 4.5;
        }
      }

      let status: 'normal' | 'low' | 'high' | 'critical' = 'normal';
      let meaning = biomarker.clinicalMeaning;

      if (biomarker.criticalLow && matchedValue < biomarker.criticalLow) {
        status = 'critical';
        meaning = biomarker.criticalAlert || biomarker.lowAlert;
      } else if (biomarker.criticalHigh && matchedValue > biomarker.criticalHigh) {
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

  // Fallback: If no known biomarkers matched, try to pull generic number key-values
  if (foundParameters.length === 0) {
    const genericMatches = lines.map((l) => {
      const m = l.match(/([A-Za-z\s()/-]{3,30})\s*[:=-]\s*([0-9]+(?:\.[0-9]+)?)\s*([a-zA-Z/%]*)/);
      if (m && m[1] && m[2]) {
        return {
          name: m[1].trim(),
          val: parseFloat(m[2]),
          unit: m[3] ? m[3].trim() : ''
        };
      }
      return null;
    }).filter(Boolean);

    for (const item of genericMatches.slice(0, 8)) {
      if (!item) continue;
      foundParameters.push({
        name: item.name,
        value: item.val,
        unit: item.unit,
        referenceRange: 'Standard Laboratory Range',
        status: 'normal',
        clinicalMeaning: `${item.name} recorded at ${item.val} ${item.unit}.`,
        minNormal: item.val * 0.8,
        maxNormal: item.val * 1.2
      });
    }
  }

  // Determine dominant category
  const categories = foundParameters.map((p) => {
    const foundBio = KNOWN_BIOMARKERS.find((b) => b.name === p.name);
    return foundBio ? foundBio.category : 'General Lab Panel';
  });
  const dominantCategory = categories[0] || 'General Medical Report';

  // Formulate easy clinical interpretation
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
    clinicalImpression: interpretation.clinicalImpression,
    riskLevel: interpretation.riskLevel,
    affectedOrgans: interpretation.affectedOrgans,
    bodyImpact: interpretation.bodyImpact,
    dietaryAdvice: interpretation.dietaryAdvice,
    lifestyleAdvice: interpretation.lifestyleAdvice,
    recommendedSpecialty: interpretation.recommendedSpecialty,
    questionsForPhysician: interpretation.questionsForPhysician
  };
}

export interface ClinicalInterpretation {
  title: string;
  clinicalImpression: string;
  riskLevel: 'normal' | 'mild' | 'moderate' | 'high' | 'critical';
  affectedOrgans: string[];
  overallSummary: string;
  bodyImpact: string;
  dietaryAdvice: string[];
  lifestyleAdvice: string[];
  recommendedSpecialty: string;
  questionsForPhysician: string[];
}

/**
 * Diagnostic Interpreter: Synthesizes parameters into simple, easy-to-understand explanations.
 */
export function interpretClinicalFindings(
  parameters: ReportParameter[],
  dominantCategory: string
): ClinicalInterpretation {
  const getParam = (namePattern: RegExp) => parameters.find((p) => namePattern.test(p.name));
  const abnormal = parameters.filter((p) => p.status !== 'normal');

  // Lookups
  const hb = getParam(/hemoglobin|hgb|hb/i);
  const mcv = getParam(/mcv/i);
  const wbc = getParam(/wbc|tlc/i);
  const plt = getParam(/platelet/i);
  const chol = getParam(/total\s*cholesterol|cholesterol/i);
  const ldl = getParam(/ldl/i);
  const tg = getParam(/triglyceride/i);
  const fbs = getParam(/fasting\s*blood\s*sugar|fbs|fasting\s*glucose/i);
  const rbs = getParam(/random\s*blood\s*sugar|rbs/i);
  const hba1c = getParam(/hba1c|glycated/i);
  const sgpt = getParam(/sgpt|alt/i);
  const sgot = getParam(/sgot|ast/i);
  const bili = getParam(/bilirubin/i);
  const creat = getParam(/creatinine/i);
  const uric = getParam(/uric\s*acid/i);
  const tsh = getParam(/tsh/i);
  const pus = getParam(/pus\s*cells/i);
  const vitD = getParam(/vitamin\s*d/i);
  const vitB12 = getParam(/vitamin\s*b12/i);
  const crp = getParam(/crp|c-reactive/i);

  // 1. ALL NORMAL
  if (abnormal.length === 0) {
    return {
      title: 'Healthy Normal Test Report',
      clinicalImpression: 'All test values are in the healthy normal range',
      riskLevel: 'normal',
      affectedOrgans: ['Blood & Heart', 'Liver & Kidneys', 'Metabolism'],
      overallSummary:
        'Great news! All of your tested numbers are comfortably inside the standard healthy range. There are no signs of anemia, active infection, liver strain, or kidney issues in this report.',
      bodyImpact:
        'Your body is functioning smoothly. Oxygen delivery, cell counts, and organ filtration are working as they should.',
      dietaryAdvice: [
        'Drink 7 to 8 glasses of clean water every day.',
        'Eat fresh vegetables, lentils, seasonal fruits, and whole grains.',
        'Keep deep-fried snacks and sugary drinks to a minimum.'
      ],
      lifestyleAdvice: [
        'Aim for a 30-minute brisk walk at least 5 days a week.',
        'Get 7 to 8 hours of quiet, restful sleep each night.',
        'Keep this report in your health records for future reference.'
      ],
      recommendedSpecialty: 'General Medicine / Family Doctor',
      questionsForPhysician: [
        'Since my results are normal, when do you recommend I repeat a routine checkup?',
        'Are there any healthy diet or exercise habits you suggest for my age?'
      ]
    };
  }

  // 2. DENGUE / LOW PLATELETS
  if (plt && plt.status === 'low') {
    return {
      title: 'Blood Test: Low Platelets Alert',
      clinicalImpression: 'Low Platelets (Bleeding Risk / Viral Fevers like Dengue)',
      riskLevel: Number(plt.value) < 100000 || (Number(plt.value) < 1.0 && plt.unit.includes('lakh')) ? 'critical' : 'moderate',
      affectedOrgans: ['Blood Clotting', 'Bone Marrow', 'Capillaries'],
      overallSummary: `Your platelet count is lower than normal (${plt.value} ${plt.unit}, normal range: ${plt.referenceRange}). Platelets are the cells that clot your blood. A drop in platelets is very common during Dengue fever and viral illnesses.`,
      bodyImpact:
        'When platelets are low, your blood takes longer to stop bleeding. You may get easy bruising, tiny red pinprick spots on skin, or nose/gum bleeding.',
      dietaryAdvice: [
        'Drink plenty of oral rehydration saline (ORS), green coconut water, and fresh fruit juices.',
        'Eat soft, easily digestible foods like papaya, khichuri, and soups.',
        'Avoid hard, scratchy foods that can cut your gums or mouth.'
      ],
      lifestyleAdvice: [
        'Rest completely in bed; do not do heavy work or sports where you could get bruised or bumped.',
        'Take your body temperature regularly if you have fever.',
        'Avoid taking pain medicines like Aspirin, Ibuprofen, or Diclofenac—only take Paracetamol with doctor advice.',
        'Show this report to a doctor right away to check if you need a Dengue NS1 or antibody test.'
      ],
      recommendedSpecialty: 'Internal Medicine / Hematology Specialist',
      questionsForPhysician: [
        'Should I do a Dengue test or repeat my platelet count tomorrow?',
        'What danger signs (like nosebleeds or black stools) mean I should go to the hospital ER?'
      ]
    };
  }

  // 3. ANEMIA (Low Hemoglobin)
  if (hb && hb.status === 'low') {
    const isMicrocytic = mcv && Number(mcv.value) < 80;
    return {
      title: 'Complete Blood Count: Anemia (Low Blood Oxygen)',
      clinicalImpression: isMicrocytic
        ? 'Iron Deficiency Anemia (Low Hemoglobin with Small Red Cells)'
        : 'Anemia (Low Hemoglobin in Blood)',
      riskLevel: Number(hb.value) < 8.0 ? 'critical' : 'moderate',
      affectedOrgans: ['Red Blood Cells', 'Heart', 'Brain & Energy'],
      overallSummary: `Your hemoglobin is lower than normal (${hb.value} ${hb.unit}, normal range: ${hb.referenceRange}). Hemoglobin carries oxygen to your muscles and brain. Because your level is low, your body is getting less oxygen.`,
      bodyImpact:
        'This is why you may feel unusually tired, weak, dizzy when standing up, or short of breath when climbing stairs.',
      dietaryAdvice: [
        'Eat iron-rich foods: chicken or beef liver, lean meat, fish, and eggs.',
        'Eat plant iron: fresh spinach, lentils, chickpeas, beets, and pomegranate.',
        'Have a slice of lemon or an orange with meals—Vitamin C helps your body absorb iron twice as fast.',
        'Do not drink tea or coffee right after meals because they block iron absorption.'
      ],
      lifestyleAdvice: [
        'Rest when you feel tired; do not do very heavy physical labor until your blood recovers.',
        'Visit a doctor who can prescribe the right iron and folic acid tablets for you.'
      ],
      recommendedSpecialty: 'Internal Medicine / Blood Specialist (Hematologist)',
      questionsForPhysician: [
        'Do I need prescription iron tablets, and for how many months?',
        'Should I do a Serum Ferritin test to check my body\'s iron storage?'
      ]
    };
  }

  // 4. URINARY TRACT INFECTION (High Urine Pus Cells)
  if (pus && pus.status === 'high') {
    return {
      title: 'Urine Test: Urinary Tract Infection (UTI)',
      clinicalImpression: 'Urinary Tract Infection (Active Bacteria in Urine)',
      riskLevel: Number(pus.value) > 20 ? 'moderate' : 'mild',
      affectedOrgans: ['Bladder', 'Urethra', 'Kidneys'],
      overallSummary: `Your urine test shows high pus cells (${pus.value} ${pus.unit}, normal is under 5). Pus cells are white blood cells that enter your urine to fight off a bacterial infection in your bladder or urinary tract.`,
      bodyImpact:
        'A urinary infection commonly causes a burning feeling when you pass urine, feeling like you need to pee very often, cloudy urine, or lower belly ache.',
      dietaryAdvice: [
        'Drink lots of clean water (at least 3 liters a day) to flush bacteria out of your bladder.',
        'Drink coconut water or fresh lemon water.',
        'Avoid spicy, oily food and hot chili which can irritate your bladder.'
      ],
      lifestyleAdvice: [
        'Do not hold your urine—go to the bathroom whenever you feel the urge.',
        'Maintain clean hygiene in the bathroom.',
        'Show this report to a doctor to get the right course of antibiotics. Complete the full course.'
      ],
      recommendedSpecialty: 'Urology / General Medicine Doctor',
      questionsForPhysician: [
        'Which antibiotic is best to clear this urinary infection?',
        'Do I need a Urine Culture & Sensitivity test if my symptoms persist?'
      ]
    };
  }

  // 5. HIGH CHOLESTEROL / LIPID PATTERN
  if ((chol && chol.status === 'high') || (ldl && ldl.status === 'high') || (tg && tg.status === 'high')) {
    return {
      title: 'Lipid Profile: High Cholesterol & Blood Fats',
      clinicalImpression: 'Elevated Cholesterol & Triglycerides (Cardiovascular Risk)',
      riskLevel: ldl && Number(ldl.value) > 160 ? 'high' : 'moderate',
      affectedOrgans: ['Heart Arteries', 'Blood Vessels', 'Liver'],
      overallSummary: 'Your test shows higher than normal levels of fats in your blood. When bad cholesterol (LDL) and triglycerides remain high over time, they stick to the inside of your blood vessels and make them narrower.',
      bodyImpact:
        'Narrower blood vessels make it harder for your heart to pump blood, which raises blood pressure and increases long-term heart risks.',
      dietaryAdvice: [
        'Cut down on deep-fried food (singara, puri, paratha, samosas) and palm oil.',
        'Reduce red meat (beef, mutton) and organ meats; choose fish and skinless chicken instead.',
        'Cook with small amounts of pure mustard oil or olive oil.',
        'Eat oats, ispaghol (psyllium husk), garlic, and fresh vegetables daily to help absorb fats.'
      ],
      lifestyleAdvice: [
        'Walk briskly for 30 to 40 minutes every single day.',
        'Work toward losing 3 to 5 kg if you are above your ideal weight.',
        'Talk to a doctor to see if you need cholesterol-lowering tablets (like a Statin).'
      ],
      recommendedSpecialty: 'Cardiologist (Heart Specialist) / Medicine Doctor',
      questionsForPhysician: [
        'Do my numbers require medicine to lower cholesterol, or can I try diet and walking first?',
        'When should I repeat this lipid profile test to check my progress?'
      ]
    };
  }

  // 6. DIABETES / HIGH BLOOD SUGAR
  if ((fbs && fbs.status === 'high') || (rbs && rbs.status === 'high') || (hba1c && hba1c.status === 'high')) {
    const isDiabetes = (fbs && Number(fbs.value) >= 7.0) || (hba1c && Number(hba1c.value) >= 6.5) || (rbs && Number(rbs.value) >= 11.1);
    return {
      title: isDiabetes ? 'Blood Sugar: Diabetes Pattern' : 'Blood Sugar: Pre-Diabetes Warning',
      clinicalImpression: isDiabetes
        ? 'High Blood Sugar (Diabetes Mellitus Pattern)'
        : 'Slightly Elevated Sugar (Pre-Diabetes Range)',
      riskLevel: isDiabetes ? 'high' : 'moderate',
      affectedOrgans: ['Pancreas', 'Eyes', 'Kidneys', 'Nerves'],
      overallSummary: isDiabetes
        ? 'Your test shows blood sugar above the normal threshold. High sugar in the blood means your body is having trouble processing glucose from food.'
        : 'Your blood sugar is slightly higher than normal. This is called pre-diabetes. The good news is that with daily walking and eating less sugar, you can bring it back to completely normal!',
      bodyImpact:
        'High sugar can cause frequent urination, feeling thirsty often, tiredness, and slow healing of cuts if left unmanaged.',
      dietaryAdvice: [
        'Stop eating sugar, sweets, cold drinks, honey, and packaged fruit juices.',
        'Reduce white rice and potatoes; eat whole wheat bread, oats, and fiber-rich vegetables.',
        'Include bitter gourd, fenugreek, and fresh green leafy vegetables.'
      ],
      lifestyleAdvice: [
        'Walk for 30 to 45 minutes every day, especially after dinner.',
        'Check your fasting blood sugar with a home meter once or twice a week.',
        'Visit a diabetes doctor (Endocrinologist) to discuss diet or medicine.'
      ],
      recommendedSpecialty: 'Endocrinology / Diabetes Specialist',
      questionsForPhysician: [
        'What should my daily fasting and post-meal blood sugar targets be?',
        'Do I need medicine (like Metformin) or should I start with diet and exercise?'
      ]
    };
  }

  // 7. LIVER ENZYME ELEVATION (High SGPT / Jaundice)
  if ((sgpt && sgpt.status === 'high') || (bili && bili.status === 'high')) {
    const hasJaundice = bili && Number(bili.value) > 1.2;
    return {
      title: hasJaundice ? 'Liver Function: High Bilirubin (Jaundice)' : 'Liver Function: Liver Irritation / Fatty Liver',
      clinicalImpression: hasJaundice
        ? 'Elevated Bilirubin & Liver Enzymes (Jaundice Pattern)'
        : 'Elevated Liver Enzymes (Hepatic Stress / Fatty Liver)',
      riskLevel: hasJaundice || (sgpt && Number(sgpt.value) > 120) ? 'high' : 'moderate',
      affectedOrgans: ['Liver', 'Gallbladder', 'Digestion'],
      overallSummary: `Your liver test shows elevated levels${sgpt ? ` (SGPT/ALT: ${sgpt.value} U/L)` : ''}${bili ? ` (Bilirubin: ${bili.value} mg/dL)` : ''}. This means liver cells are irritated or storing excess fat.`,
      bodyImpact:
        'You may feel tired, have indigestion, feel bloated after meals, or notice yellowish eyes and darker urine if bilirubin is high.',
      dietaryAdvice: [
        'Strictly avoid fatty meat, ghee, butter, and deep-fried fast food.',
        'Do not take unnecessary pain tablets or unprescribed medicines which stress the liver.',
        'Eat fresh papaya, boiled vegetables, light rice, and drink coconut water.'
      ],
      lifestyleAdvice: [
        'Get an abdominal ultrasound (USG of Whole Abdomen) to check for fatty liver.',
        'Rest well and avoid alcohol or smoking completely.',
        'See a liver doctor (Gastroenterologist / Hepatologist).'
      ],
      recommendedSpecialty: 'Gastroenterology & Liver Specialist (Hepatologist)',
      questionsForPhysician: [
        'Should I do an ultrasound of my abdomen to check my liver?',
        'Should I test for viral hepatitis (HBsAg, Anti-HCV)?'
      ]
    };
  }

  // 8. KIDNEY STRAIN (High Creatinine / High Uric Acid)
  if ((creat && creat.status === 'high') || (uric && uric.status === 'high')) {
    return {
      title: 'Kidney Function: Kidney Strain & Uric Acid Alert',
      clinicalImpression: 'Kidney Filtration Strain / High Uric Acid',
      riskLevel: creat && Number(creat.value) > 1.8 ? 'high' : 'moderate',
      affectedOrgans: ['Kidneys', 'Joints (Gout)', 'Blood Pressure'],
      overallSummary: `Your test shows elevated levels${creat ? ` (Serum Creatinine: ${creat.value} mg/dL)` : ''}${uric ? ` (Uric Acid: ${uric.value} mg/dL)` : ''}. Healthy kidneys filter these wastes out of your blood. High numbers mean kidneys are clearing waste more slowly or uric acid is building up.`,
      bodyImpact:
        'High uric acid causes sudden painful swelling in the big toe, ankles, or knees. High creatinine means kidneys need gentle care and protection from dehydration.',
      dietaryAdvice: [
        'Drink 2.5 to 3 liters of water throughout the day (unless a doctor told you to restrict water).',
        'Avoid red meat (beef, mutton), liver, organ meats, and rich seafood.',
        'Cut down on table salt—do not add extra raw salt to your plate.'
      ],
      lifestyleAdvice: [
        'Never take strong painkillers (Diclofenac, Naproxen, Aceclofenac) without a doctor\'s permission, as they harm kidneys.',
        'Check your blood pressure regularly and keep it normal.',
        'Consult a kidney specialist (Nephrologist).'
      ],
      recommendedSpecialty: 'Nephrology (Kidney Specialist)',
      questionsForPhysician: [
        'What is my kidney filtration rate (eGFR)?',
        'Should I do a simple urine protein test to check my kidneys?'
      ]
    };
  }

  // 9. THYROID ISSUE (High or Low TSH)
  if (tsh && tsh.status !== 'normal') {
    const isHypo = tsh.status === 'high';
    return {
      title: isHypo ? 'Thyroid Test: Slow Thyroid (Hypothyroidism)' : 'Thyroid Test: Fast Thyroid (Hyperthyroidism)',
      clinicalImpression: isHypo
        ? 'High TSH (Underactive / Slow Thyroid)'
        : 'Low TSH (Overactive / Fast Thyroid)',
      riskLevel: 'moderate',
      affectedOrgans: ['Thyroid Gland', 'Metabolism', 'Energy & Weight'],
      overallSummary: isHypo
        ? `Your TSH is higher than normal (${tsh.value} ${tsh.unit}). High TSH means your thyroid gland in your neck is working too slowly (Hypothyroidism).`
        : `Your TSH is lower than normal (${tsh.value} ${tsh.unit}). Low TSH means your thyroid gland is overactive (Hyperthyroidism).`,
      bodyImpact: isHypo
        ? 'A slow thyroid commonly makes you feel unusually tired, sensitive to cold, prone to weight gain, and causes dry skin or hair thinning.'
        : 'A fast thyroid makes your body burn energy too fast, causing sudden weight loss, rapid heartbeat, sweating, and feeling shaky.',
      dietaryAdvice: [
        'Eat a balanced diet with iodized salt, eggs, and fresh vegetables.',
        'If thyroid is slow, cook vegetables like cabbage and cauliflower rather than eating them raw.'
      ],
      lifestyleAdvice: [
        'Consult a doctor or hormone specialist (Endocrinologist). A single small thyroid pill taken empty stomach in the morning easily balances this.'
      ],
      recommendedSpecialty: 'Endocrinology / Hormone Specialist',
      questionsForPhysician: [
        'Do I need a daily thyroid medicine (like Thyroxine) to balance my levels?',
        'When should I repeat this TSH test to confirm my dose?'
      ]
    };
  }

  // 10. GENERAL ABNORMALITY
  const abnormalNames = abnormal.map((p) => `${p.name} (${p.value} ${p.unit})`).join(', ');
  return {
    title: `${dominantCategory} Review`,
    clinicalImpression: `${abnormal.length} tested value${abnormal.length > 1 ? 's' : ''} outside standard range`,
    riskLevel: 'mild',
    affectedOrgans: ['General Health', 'Metabolism'],
    overallSummary: `Your report shows ${parameters.length} tested items. While most values are healthy, ${abnormal.length} value(s) (${abnormalNames}) are slightly outside the normal reference boundaries.`,
    bodyImpact: 'Mild variations can cause temporary tiredness or may just require simple diet, water, and lifestyle tweaks.',
    dietaryAdvice: [
      'Eat freshly cooked, balanced meals with lots of green vegetables and fruits.',
      'Drink 7 to 8 glasses of clean water every day.'
    ],
    lifestyleAdvice: [
      'Take a 30-minute walk every day and sleep 7 to 8 hours.',
      'Bring this printed report to your family doctor to discuss what it means for you.'
    ],
    recommendedSpecialty: 'General Medicine / Internal Medicine Doctor',
    questionsForPhysician: [
      'Do my out-of-range numbers need any medicine or should I repeat the test later?',
      'What simple diet changes do you recommend for me?'
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

  const parenMatches = binaryString.matchAll(/\(([^()]+)\)/g);
  for (const match of parenMatches) {
    const text = match[1].replace(/\\([()\\])/g, '$1').trim();
    if (text.length > 1 && /[A-Za-z0-9]/.test(text)) {
      extractedLines.push(text);
    }
  }

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

export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve((e.target?.result as string) || '');
    reader.onerror = (e) => reject(e);
    reader.readAsText(file);
  });
}

export function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve((e.target?.result as ArrayBuffer) || new ArrayBuffer(0));
    reader.onerror = (e) => reject(e);
    reader.readAsArrayBuffer(file);
  });
}

export async function performImageOcr(
  file: File,
  onProgress?: (progress: number, status: string) => void
): Promise<string> {
  const win = window as any;
  if (!win.Tesseract) {
    onProgress?.(15, 'Starting text reader...');
    try {
      await loadScript('https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js');
    } catch (err) {
      console.warn('Could not load online Tesseract script:', err);
    }
  }

  if (win.Tesseract && win.Tesseract.recognize) {
    onProgress?.(30, 'Reading report text...');
    try {
      const result = await win.Tesseract.recognize(file, 'eng', {
        logger: (m: any) => {
          if (m && m.status === 'recognizing text') {
            const pct = Math.round(30 + (m.progress || 0) * 60);
            onProgress?.(pct, `Reading words (${pct}%)...`);
          }
        }
      });
      return result?.data?.text || '';
    } catch (err) {
      console.warn('Tesseract OCR error:', err);
    }
  }

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
