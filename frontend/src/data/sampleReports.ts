import { MedicalReportData } from '../types';

export const SAMPLE_REPORTS: MedicalReportData[] = [
  // 1. CBC & Anemia
  {
    id: 'report-cbc-anemia',
    title: 'Complete Blood Count (CBC) with ESR',
    date: '2026-10-18',
    labName: 'Popular Diagnostic Centre, KDA Avenue, Khulna',
    category: 'Complete Blood Count',
    patientName: 'Sample Patient',
    patientAge: 38,
    parameters: [
      {
        name: 'Hemoglobin (Hb)',
        value: 10.2,
        unit: 'g/dL',
        referenceRange: '13.0 - 17.0 g/dL',
        status: 'low',
        minNormal: 13.0,
        maxNormal: 17.0,
        clinicalMeaning: 'Hemoglobin carries oxygen throughout your body. Your level is lower than normal, which means mild anemia and explains feeling tired or dizzy.'
      },
      {
        name: 'Total RBC Count',
        value: 3.8,
        unit: 'million/uL',
        referenceRange: '4.5 - 5.9 million/uL',
        status: 'low',
        minNormal: 4.5,
        maxNormal: 5.9,
        clinicalMeaning: 'Red blood cell count is slightly lower than normal, matching your lower hemoglobin.'
      },
      {
        name: 'Total WBC Count (TLC)',
        value: 6800,
        unit: '/cumm',
        referenceRange: '4,000 - 11,000 /cumm',
        status: 'normal',
        minNormal: 4000,
        maxNormal: 11000,
        clinicalMeaning: 'White blood cells are in the healthy normal range, showing no active infection.'
      },
      {
        name: 'Platelet Count',
        value: 245000,
        unit: '/cumm',
        referenceRange: '150,000 - 450,000 /cumm',
        status: 'normal',
        minNormal: 150000,
        maxNormal: 450000,
        clinicalMeaning: 'Platelet count is healthy, supporting normal blood clotting.'
      },
      {
        name: 'MCV (Mean Red Cell Size)',
        value: 72.4,
        unit: 'fL',
        referenceRange: '80.0 - 96.0 fL',
        status: 'low',
        minNormal: 80.0,
        maxNormal: 96.0,
        clinicalMeaning: 'Red blood cells are smaller than normal, which is the most classic sign of iron deficiency.'
      },
      {
        name: 'ESR (1st Hour)',
        value: 14,
        unit: 'mm/1st hr',
        referenceRange: '0 - 15 mm/1st hr',
        status: 'normal',
        minNormal: 0,
        maxNormal: 15,
        clinicalMeaning: 'ESR is normal, meaning no major body inflammation.'
      }
    ],
    overallSummary: 'This test shows mild anemia with smaller red blood cells (Hemoglobin 10.2 g/dL). This is most commonly caused by not getting enough iron in food. Eating iron-rich foods (liver, meat, spinach, lentils) and consulting a doctor for iron vitamins will help bring your energy back.',
    questionsForPhysician: [
      'Should I take iron tablets to rebuild my hemoglobin?',
      'Do you recommend testing my Serum Ferritin (iron storage)?'
    ]
  },

  // 2. Lipid Profile
  {
    id: 'report-lipid-profile',
    title: 'Lipid / Cholesterol Profile',
    date: '2026-09-24',
    labName: 'Khulna City Medical College Pathology Lab, Sonadanga',
    category: 'Lipid Profile',
    patientName: 'Sample Patient',
    patientAge: 44,
    parameters: [
      {
        name: 'Total Cholesterol',
        value: 238,
        unit: 'mg/dL',
        referenceRange: '125.0 - 200.0 mg/dL',
        status: 'high',
        minNormal: 125.0,
        maxNormal: 200.0,
        clinicalMeaning: 'Total fats in your blood are elevated. Reducing oily and fried foods and walking 30 minutes daily helps lower it.'
      },
      {
        name: 'HDL (\'Good\') Cholesterol',
        value: 36,
        unit: 'mg/dL',
        referenceRange: '40.0 - 60.0 mg/dL',
        status: 'low',
        minNormal: 40.0,
        maxNormal: 60.0,
        clinicalMeaning: 'Your good cholesterol is slightly low. Good cholesterol protects blood vessels from fat buildup. Daily brisk walking helps raise it.'
      },
      {
        name: 'LDL (\'Bad\') Cholesterol',
        value: 156,
        unit: 'mg/dL',
        referenceRange: '50.0 - 100.0 mg/dL',
        status: 'high',
        minNormal: 50.0,
        maxNormal: 100.0,
        clinicalMeaning: 'Bad cholesterol is higher than normal. Over time, high LDL sticks to blood vessel walls. Cut down on red meat, butter, and deep-fried snacks.'
      },
      {
        name: 'Triglycerides',
        value: 220,
        unit: 'mg/dL',
        referenceRange: '50.0 - 150.0 mg/dL',
        status: 'high',
        minNormal: 50.0,
        maxNormal: 150.0,
        clinicalMeaning: 'Blood fats from sugar and excess food are high. Reducing sweets, white rice, and soft drinks brings this down quickly.'
      }
    ],
    overallSummary: 'Your report shows higher than normal levels of total cholesterol, bad cholesterol (LDL), and triglycerides. These fats can narrow blood vessels over time. Daily walking for 30 to 40 minutes, cutting fried food, and eating oats and vegetables will help protect your heart.',
    questionsForPhysician: [
      'Can I lower my cholesterol with diet and walking, or do I need medicine (like a Statin)?',
      'When should I repeat this test to check my progress?'
    ]
  },

  // 3. Diabetes & Sugar Panel
  {
    id: 'report-diabetic-panel',
    title: 'Blood Glucose & Diabetes Panel',
    date: '2026-10-05',
    labName: 'LabAid Diagnostics, KDA Avenue, Khulna',
    category: 'Diabetic Panel',
    patientName: 'Sample Patient',
    patientAge: 51,
    parameters: [
      {
        name: 'Fasting Blood Sugar (FBS)',
        value: 6.8,
        unit: 'mmol/L',
        referenceRange: '4.0 - 5.6 mmol/L',
        status: 'high',
        minNormal: 4.0,
        maxNormal: 5.6,
        clinicalMeaning: 'Your morning fasting blood sugar is slightly higher than normal (between 5.6 and 6.9 is pre-diabetes).'
      },
      {
        name: 'Post-Meal Blood Sugar (2h)',
        value: 9.4,
        unit: 'mmol/L',
        referenceRange: '4.4 - 7.8 mmol/L',
        status: 'high',
        minNormal: 4.4,
        maxNormal: 7.8,
        clinicalMeaning: 'Blood sugar 2 hours after a meal is elevated, showing your body is taking longer to clear sugar from food.'
      },
      {
        name: 'HbA1c (3-Month Sugar Average)',
        value: 6.2,
        unit: '%',
        referenceRange: '4.0 - 5.7 %',
        status: 'high',
        minNormal: 4.0,
        maxNormal: 5.7,
        clinicalMeaning: 'Your 3-month average sugar is in the pre-diabetes zone (5.7% to 6.4%). With prompt lifestyle changes, this can be reversed to normal.'
      }
    ],
    overallSummary: 'Your results point to Pre-Diabetes (Fasting sugar 6.8 mmol/L and HbA1c 6.2%). This means your body is finding it slightly hard to process sugar, but you have not reached full diabetes yet. Cutting out sweets, white rice, and walking 30 minutes every day can bring your sugar back to completely healthy levels.',
    questionsForPhysician: [
      'What dietary changes should I start today to reverse pre-diabetes?',
      'Do I need oral medication (like Metformin) or can I manage with exercise?'
    ]
  },

  // 4. Liver Function Tests (LFT)
  {
    id: 'report-lft',
    title: 'Liver Function Test (LFT)',
    date: '2026-10-12',
    labName: 'Sandhani Diagnostic Complex, Boyra, Khulna',
    category: 'Liver Function',
    patientName: 'Sample Patient',
    patientAge: 42,
    parameters: [
      {
        name: 'SGPT / ALT (Liver Enzyme)',
        value: 78,
        unit: 'U/L',
        referenceRange: '7.0 - 45.0 U/L',
        status: 'high',
        minNormal: 7.0,
        maxNormal: 45.0,
        clinicalMeaning: 'This liver enzyme is elevated, showing that liver cells are irritated. Very common with fatty liver or after viral fever.'
      },
      {
        name: 'SGOT / AST (Liver Enzyme)',
        value: 52,
        unit: 'U/L',
        referenceRange: '8.0 - 40.0 U/L',
        status: 'high',
        minNormal: 8.0,
        maxNormal: 40.0,
        clinicalMeaning: 'Slightly high liver enzyme, matching the higher SGPT.'
      },
      {
        name: 'Serum Bilirubin (Total)',
        value: 1.0,
        unit: 'mg/dL',
        referenceRange: '0.2 - 1.2 mg/dL',
        status: 'normal',
        minNormal: 0.2,
        maxNormal: 1.2,
        clinicalMeaning: 'Bilirubin is in the safe normal range, showing no signs of jaundice.'
      },
      {
        name: 'Serum Albumin',
        value: 4.2,
        unit: 'g/dL',
        referenceRange: '3.5 - 5.0 g/dL',
        status: 'normal',
        minNormal: 3.5,
        maxNormal: 5.0,
        clinicalMeaning: 'Albumin protein is healthy and shows good liver synthesis capacity.'
      }
    ],
    overallSummary: 'Your liver enzymes (SGPT 78 U/L) are higher than normal, indicating mild liver inflammation or fatty liver, but your bilirubin is normal (no jaundice). Avoiding oily food, ghee, and alcohol, and doing daily walking will help your liver heal quickly.',
    questionsForPhysician: [
      'Should I get an ultrasound of my abdomen to check for fatty liver?',
      'Are any of my current medicines stressing my liver?'
    ]
  },

  // 5. Kidney Function Tests (KFT)
  {
    id: 'report-kft',
    title: 'Kidney Function & Uric Acid Panel',
    date: '2026-09-30',
    labName: 'Popular Diagnostic Centre, Khulna',
    category: 'Kidney Function',
    patientName: 'Sample Patient',
    patientAge: 47,
    parameters: [
      {
        name: 'Serum Creatinine',
        value: 1.1,
        unit: 'mg/dL',
        referenceRange: '0.7 - 1.2 mg/dL',
        status: 'normal',
        minNormal: 0.7,
        maxNormal: 1.2,
        clinicalMeaning: 'Creatinine is in the normal range, showing good overall kidney filtration.'
      },
      {
        name: 'Blood Urea',
        value: 32,
        unit: 'mg/dL',
        referenceRange: '15.0 - 40.0 mg/dL',
        status: 'normal',
        minNormal: 15.0,
        maxNormal: 40.0,
        clinicalMeaning: 'Blood urea is normal.'
      },
      {
        name: 'Serum Uric Acid',
        value: 8.4,
        unit: 'mg/dL',
        referenceRange: '3.5 - 7.2 mg/dL',
        status: 'high',
        minNormal: 3.5,
        maxNormal: 7.2,
        clinicalMeaning: 'Uric acid is elevated. High uric acid can form painful crystals in joint fluid (gout) or cause kidney stones. Drink 3 liters of water daily and avoid red meat.'
      }
    ],
    overallSummary: 'Your kidney creatinine and urea are normal, but your uric acid (8.4 mg/dL) is high. Elevated uric acid can cause sudden painful swelling in toes and joints (gout) or kidney stones. Drinking 3 liters of clean water daily and cutting down on red meat and organ meats will help lower it.',
    questionsForPhysician: [
      'Do I need medicine (like Allopurinol or Febuxostat) to lower my uric acid?',
      'Which foods should I strictly avoid to prevent joint pain?'
    ]
  },

  // 6. Thyroid Function
  {
    id: 'report-thyroid',
    title: 'Thyroid Hormone Profile (TSH, FT3, FT4)',
    date: '2026-10-15',
    labName: 'Square Hospital Clinical Laboratory, Khulna',
    category: 'Thyroid Panel',
    patientName: 'Sample Patient',
    patientAge: 36,
    parameters: [
      {
        name: 'TSH (Thyroid Stimulating Hormone)',
        value: 7.2,
        unit: 'uIU/mL',
        referenceRange: '0.4 - 4.5 uIU/mL',
        status: 'high',
        minNormal: 0.4,
        maxNormal: 4.5,
        clinicalMeaning: 'High TSH means your thyroid gland is working too slowly (Hypothyroidism). This makes you feel sluggish, sensitive to cold, and prone to weight gain.'
      },
      {
        name: 'Free T4',
        value: 0.9,
        unit: 'ng/dL',
        referenceRange: '0.8 - 1.8 ng/dL',
        status: 'normal',
        minNormal: 0.8,
        maxNormal: 1.8,
        clinicalMeaning: 'Free T4 is at the lower boundary of normal.'
      },
      {
        name: 'Free T3',
        value: 2.4,
        unit: 'pg/mL',
        referenceRange: '2.0 - 4.4 pg/mL',
        status: 'normal',
        minNormal: 2.0,
        maxNormal: 4.4,
        clinicalMeaning: 'Free T3 is in the normal range.'
      }
    ],
    overallSummary: 'Your TSH is elevated (7.2 uIU/mL), showing an underactive or slow thyroid (Hypothyroidism). When the thyroid is slow, the body burns calories more slowly, causing tiredness, feeling cold, and dry skin. A small daily thyroid pill easily normalizes this.',
    questionsForPhysician: [
      'Do I need a low-dose daily thyroid hormone tablet (Thyroxine)?',
      'When should I repeat this TSH test to check my dose?'
    ]
  },

  // 7. Urine Routine Examination
  {
    id: 'report-urine-uti',
    title: 'Urine Routine Examination (Urine R/E)',
    date: '2026-10-22',
    labName: 'Ibn Sina Diagnostic Centre, Khulna',
    category: 'Urine Routine Examination',
    patientName: 'Sample Patient',
    patientAge: 29,
    parameters: [
      {
        name: 'Urine Pus Cells',
        value: 18,
        unit: '/HPF',
        referenceRange: '0.0 - 5.0 /HPF',
        status: 'high',
        minNormal: 0.0,
        maxNormal: 5.0,
        clinicalMeaning: 'Pus cells in urine are higher than normal (18 /HPF). This points to a bacterial Urinary Tract Infection (UTI).'
      },
      {
        name: 'Urine RBCs (Red Blood Cells)',
        value: 2,
        unit: '/HPF',
        referenceRange: '0.0 - 3.0 /HPF',
        status: 'normal',
        minNormal: 0.0,
        maxNormal: 3.0,
        clinicalMeaning: 'Red blood cells in urine are in the safe range.'
      }
    ],
    overallSummary: 'Your urine test shows high pus cells (18 /HPF), which indicates a Urinary Tract Infection (UTI). You may feel burning when you pass urine or lower belly discomfort. Drinking 3 liters of water daily and consulting a doctor for an antibiotic will clear this infection.',
    questionsForPhysician: [
      'Which antibiotic is best to clear this urinary infection?',
      'Do I need a Urine Culture test if symptoms continue?'
    ]
  },

  // 8. Electrolytes & Vitamins
  {
    id: 'report-electrolytes-vitamins',
    title: 'Electrolytes & Vitamin Deficiency Panel',
    date: '2026-10-25',
    labName: 'Popular Diagnostic Centre, Khulna',
    category: 'Electrolytes & Minerals',
    patientName: 'Sample Patient',
    patientAge: 40,
    parameters: [
      {
        name: 'Serum Sodium',
        value: 139,
        unit: 'mmol/L',
        referenceRange: '135.0 - 145.0 mmol/L',
        status: 'normal',
        minNormal: 135.0,
        maxNormal: 145.0,
        clinicalMeaning: 'Sodium level is normal and maintains good body water balance.'
      },
      {
        name: 'Serum Potassium',
        value: 4.1,
        unit: 'mmol/L',
        referenceRange: '3.5 - 5.1 mmol/L',
        status: 'normal',
        minNormal: 3.5,
        maxNormal: 5.1,
        clinicalMeaning: 'Potassium is normal and supports steady heartbeat and muscle strength.'
      },
      {
        name: 'Vitamin D (25-OH)',
        value: 18.5,
        unit: 'ng/mL',
        referenceRange: '30.0 - 100.0 ng/mL',
        status: 'low',
        minNormal: 30.0,
        maxNormal: 100.0,
        clinicalMeaning: 'Vitamin D is low (under 30 ng/mL). Low Vitamin D causes body aches, bone pain, and fatigue. Morning sunlight and Vitamin D supplement capsules help.'
      },
      {
        name: 'Vitamin B12',
        value: 165,
        unit: 'pg/mL',
        referenceRange: '200.0 - 900.0 pg/mL',
        status: 'low',
        minNormal: 200.0,
        maxNormal: 900.0,
        clinicalMeaning: 'Vitamin B12 is below normal. This can cause tingling or numbness in fingers and toes, tiredness, and memory fog.'
      }
    ],
    overallSummary: 'Your body salts (Sodium and Potassium) are healthy, but both Vitamin D (18.5 ng/mL) and Vitamin B12 (165 pg/mL) are low. Low vitamins are very common and cause body aches, bone weakness, and nerve tingling in hands and feet. Vitamin supplements and sunlight will help restore your levels.',
    questionsForPhysician: [
      'What dose of Vitamin D and B12 supplements should I take?',
      'How long should I take these vitamins before repeating the test?'
    ]
  }
];
