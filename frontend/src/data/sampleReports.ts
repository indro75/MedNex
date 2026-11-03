import { MedicalReportData } from '../types';

export const SAMPLE_REPORTS: MedicalReportData[] = [
  {
    id: 'report-cbc-anemia',
    title: 'Complete Blood Count (CBC) with ESR',
    date: '2026-10-18',
    labName: 'Popular Diagnostic Centre, KDA Avenue, Khulna',
    category: 'Complete Blood Count',
    patientName: 'Rahim Ahmed',
    patientAge: 38,
    parameters: [
      {
        name: 'Hemoglobin (Hb)',
        value: 10.2,
        unit: 'g/dL',
        referenceRange: '13.0 - 17.0',
        status: 'low',
        minNormal: 13.0,
        maxNormal: 17.0,
        clinicalMeaning: 'Hemoglobin carries oxygen throughout the body. A level below 13.0 g/dL in adult males indicates mild to moderate anemia.'
      },
      {
        name: 'Total RBC Count',
        value: 3.8,
        unit: 'million/uL',
        referenceRange: '4.5 - 5.9',
        status: 'low',
        minNormal: 4.5,
        maxNormal: 5.9,
        clinicalMeaning: 'Red blood cell count is moderately lower than normal, corresponding with the reduced hemoglobin.'
      },
      {
        name: 'Total WBC Count (TLC)',
        value: 6800,
        unit: '/cu.mm',
        referenceRange: '4,000 - 11,000',
        status: 'normal',
        minNormal: 4000,
        maxNormal: 11000,
        clinicalMeaning: 'White blood cells are within safe reference limits, indicating no acute bacterial infection.'
      },
      {
        name: 'Platelet Count',
        value: 245000,
        unit: '/cu.mm',
        referenceRange: '150,000 - 450,000',
        status: 'normal',
        minNormal: 150000,
        maxNormal: 450000,
        clinicalMeaning: 'Platelet count is healthy, supporting normal blood clotting capacity.'
      },
      {
        name: 'MCV (Mean Corpuscular Vol)',
        value: 72.4,
        unit: 'fL',
        referenceRange: '80.0 - 96.0',
        status: 'low',
        minNormal: 80.0,
        maxNormal: 96.0,
        clinicalMeaning: 'Microcytosis (smaller red blood cells), most commonly associated with iron deficiency or thalassemia trait.'
      },
      {
        name: 'MCH (Mean Corpuscular Hb)',
        value: 23.5,
        unit: 'pg',
        referenceRange: '27.0 - 33.0',
        status: 'low',
        minNormal: 27.0,
        maxNormal: 33.0,
        clinicalMeaning: 'Hypochromia (paler red blood cells), typically concurring with reduced iron stores.'
      },
      {
        name: 'ESR (1st Hour - Westergren)',
        value: 14,
        unit: 'mm in 1st hr',
        referenceRange: '0 - 15',
        status: 'normal',
        minNormal: 0,
        maxNormal: 15,
        clinicalMeaning: 'Erythrocyte sedimentation rate is normal, suggesting no significant systemic inflammation.'
      }
    ],
    overallSummary: 'The test reveals mild microcytic hypochromic anemia (Hemoglobin 10.2 g/dL, low MCV and MCH). WBC and platelet counts are within normal range. This is frequently linked to dietary iron deficiency or minor blood loss and requires medical assessment.',
    questionsForPhysician: [
      'Should I undergo a serum ferritin or iron profile test to confirm iron deficiency?',
      'Could dietary adjustments or oral iron supplements be appropriate for me?',
      'Are there any underlying sources of gastrointestinal or nutritional loss that need checking?'
    ]
  },
  {
    id: 'report-lipid-profile',
    title: 'Comprehensive Lipid / Cholesterol Profile',
    date: '2026-09-24',
    labName: 'Khulna City Medical College Pathology Lab, Sonadanga',
    category: 'Lipid Profile',
    patientName: 'Rahim Ahmed',
    patientAge: 38,
    parameters: [
      {
        name: 'Total Cholesterol',
        value: 238,
        unit: 'mg/dL',
        referenceRange: '< 200',
        status: 'high',
        minNormal: 120,
        maxNormal: 200,
        clinicalMeaning: 'Total blood cholesterol is elevated above the desirable threshold of 200 mg/dL.'
      },
      {
        name: 'LDL Cholesterol ("Bad")',
        value: 156,
        unit: 'mg/dL',
        referenceRange: '< 100',
        status: 'high',
        minNormal: 60,
        maxNormal: 100,
        clinicalMeaning: 'Low-Density Lipoprotein is elevated. Elevated LDL particles can gradually build up in artery walls (atherosclerosis).'
      },
      {
        name: 'HDL Cholesterol ("Good")',
        value: 41,
        unit: 'mg/dL',
        referenceRange: '> 40',
        status: 'normal',
        minNormal: 40,
        maxNormal: 70,
        clinicalMeaning: 'High-Density Lipoprotein is in the borderline acceptable range, helping clear cholesterol from arteries.'
      },
      {
        name: 'Serum Triglycerides',
        value: 215,
        unit: 'mg/dL',
        referenceRange: '< 150',
        status: 'high',
        minNormal: 50,
        maxNormal: 150,
        clinicalMeaning: 'Triglycerides are moderately high, frequently related to high-refined carbohydrate intake, sedentary lifestyle, or metabolic factors.'
      },
      {
        name: 'Total Chol / HDL Ratio',
        value: 5.8,
        unit: 'ratio',
        referenceRange: '< 5.0',
        status: 'high',
        minNormal: 2.0,
        maxNormal: 5.0,
        clinicalMeaning: 'Cardiovascular risk ratio is mildly elevated.'
      }
    ],
    overallSummary: 'Dyslipidemia indicated: elevated Total Cholesterol (238 mg/dL), LDL (156 mg/dL), and Triglycerides (215 mg/dL). Lifestyle modifications (dietary adjustments, increased physical activity) and physician evaluation for cardiovascular risk management are advised.',
    questionsForPhysician: [
      'What specific dietary and exercise changes should I prioritize first?',
      'Given my age and family history, is lipid-lowering medication (such as statins) recommended?',
      'When should I repeat this fasting lipid panel to monitor improvement?'
    ]
  },
  {
    id: 'report-diabetic-panel',
    title: 'Fasting Blood Glucose & Glycated Hemoglobin (HbA1c)',
    date: '2026-10-05',
    labName: 'Labaid Diagnostic, Shantidham More, Khulna',
    category: 'Diabetic Panel',
    patientName: 'Rahim Ahmed',
    patientAge: 38,
    parameters: [
      {
        name: 'Fasting Blood Sugar (FBS)',
        value: 6.8,
        unit: 'mmol/L',
        referenceRange: '3.9 - 5.6',
        status: 'high',
        minNormal: 3.9,
        maxNormal: 5.6,
        clinicalMeaning: 'Fasting plasma glucose is elevated into the Impaired Fasting Glucose (Pre-diabetes) range (5.6 - 6.9 mmol/L).'
      },
      {
        name: 'HbA1c (Glycated Hemoglobin)',
        value: 6.2,
        unit: '%',
        referenceRange: '< 5.7',
        status: 'high',
        minNormal: 4.0,
        maxNormal: 5.7,
        clinicalMeaning: 'Reflects average blood sugar over the preceding 2 to 3 months. 5.7% to 6.4% indicates pre-diabetes.'
      },
      {
        name: 'Estimated Average Glucose (eAG)',
        value: 131,
        unit: 'mg/dL',
        referenceRange: '< 117',
        status: 'high',
        minNormal: 70,
        maxNormal: 117,
        clinicalMeaning: 'Calculated average circulating glucose level over past 90 days.'
      }
    ],
    overallSummary: 'Results correspond to Pre-diabetes (Impaired Fasting Glucose). Fasting sugar is 6.8 mmol/L and HbA1c is 6.2%. With prompt lifestyle interventions (balanced low-glycemic nutrition, weight management, daily brisk walking), progression to type 2 diabetes can frequently be prevented.',
    questionsForPhysician: [
      'What structured meal plan or nutritional guidelines should I follow for pre-diabetes?',
      'Should I check my post-prandial (2 hours after meal) blood glucose as well?',
      'How frequently should I retest my HbA1c?'
    ]
  },
  {
    id: 'report-lft',
    title: 'Liver Function Test (LFT Panel)',
    date: '2026-08-14',
    labName: 'Sandhani Clinic & Diagnostic, Boyra, Khulna',
    category: 'Liver Function',
    patientName: 'Rahim Ahmed',
    patientAge: 38,
    parameters: [
      {
        name: 'Serum Bilirubin (Total)',
        value: 0.9,
        unit: 'mg/dL',
        referenceRange: '0.2 - 1.2',
        status: 'normal',
        minNormal: 0.2,
        maxNormal: 1.2,
        clinicalMeaning: 'Bilirubin is normal, indicating healthy bile breakdown and absence of jaundice.'
      },
      {
        name: 'SGPT / ALT',
        value: 58,
        unit: 'U/L',
        referenceRange: '< 45',
        status: 'high',
        minNormal: 10,
        maxNormal: 45,
        clinicalMeaning: 'Alanine aminotransferase is mildly elevated, which can indicate mild liver inflammation (e.g. non-alcoholic fatty liver, medications, or viral exposure).'
      },
      {
        name: 'SGOT / AST',
        value: 42,
        unit: 'U/L',
        referenceRange: '< 35',
        status: 'high',
        minNormal: 10,
        maxNormal: 35,
        clinicalMeaning: 'Aspartate aminotransferase is slightly elevated alongside ALT.'
      },
      {
        name: 'Serum Alkaline Phosphatase (ALP)',
        value: 88,
        unit: 'U/L',
        referenceRange: '44 - 147',
        status: 'normal',
        minNormal: 44,
        maxNormal: 147,
        clinicalMeaning: 'ALP is healthy, indicating no significant bile duct obstruction or bone disorder.'
      },
      {
        name: 'Total Serum Protein',
        value: 7.4,
        unit: 'g/dL',
        referenceRange: '6.4 - 8.3',
        status: 'normal',
        minNormal: 6.4,
        maxNormal: 8.3,
        clinicalMeaning: 'Protein levels are healthy.'
      },
      {
        name: 'Serum Albumin',
        value: 4.4,
        unit: 'g/dL',
        referenceRange: '3.5 - 5.2',
        status: 'normal',
        minNormal: 3.5,
        maxNormal: 5.2,
        clinicalMeaning: 'Albumin synthesized by the liver is normal, indicating good hepatic synthesis capacity.'
      }
    ],
    overallSummary: 'Mild transaminitis observed with slightly elevated ALT (58 U/L) and AST (42 U/L), while bilirubin and synthetic markers (albumin) remain normal. Frequently associated with fatty liver changes (NAFLD) or certain medications; physician follow-up and ultrasound may be suggested.',
    questionsForPhysician: [
      'Is an abdominal ultrasonography recommended to check for fatty liver?',
      'Are any current medications or supplements placing temporary strain on my liver?',
      'Should viral hepatitis screening (HBsAg, Anti-HCV) be considered?'
    ]
  },
  {
    id: 'report-kft',
    title: 'Kidney Function & Renal Electrolyte Profile',
    date: '2026-10-22',
    labName: 'Islami Bank Hospital Clinical Laboratory, Khulna',
    category: 'Kidney Function',
    patientName: 'Rahim Ahmed',
    patientAge: 38,
    parameters: [
      {
        name: 'Serum Creatinine',
        value: 1.05,
        unit: 'mg/dL',
        referenceRange: '0.70 - 1.30',
        status: 'normal',
        minNormal: 0.70,
        maxNormal: 1.30,
        clinicalMeaning: 'Serum creatinine is normal, reflecting healthy glomerular filtration and renal clearance.'
      },
      {
        name: 'Blood Urea Nitrogen (BUN)',
        value: 16.2,
        unit: 'mg/dL',
        referenceRange: '7.0 - 20.0',
        status: 'normal',
        minNormal: 7.0,
        maxNormal: 20.0,
        clinicalMeaning: 'Normal urea nitrogen levels indicate adequate renal clearance and normal hydration status.'
      },
      {
        name: 'eGFR (Estimated GFR - CKD-EPI)',
        value: 94,
        unit: 'mL/min/1.73m²',
        referenceRange: '> 90',
        status: 'normal',
        minNormal: 90,
        maxNormal: 125,
        clinicalMeaning: 'Normal kidney filtration rate (Stage 1 / Normal function).'
      },
      {
        name: 'Serum Uric Acid',
        value: 7.6,
        unit: 'mg/dL',
        referenceRange: '3.5 - 7.2',
        status: 'high',
        minNormal: 3.5,
        maxNormal: 7.2,
        clinicalMeaning: 'Mild hyperuricemia. Elevated uric acid can increase susceptibility to joint gout flare-ups or kidney stone formation.'
      }
    ],
    overallSummary: 'Renal filtration function is healthy (Serum Creatinine 1.05 mg/dL, eGFR 94 mL/min). Serum uric acid is mildly elevated (7.6 mg/dL). Increasing daily water intake and reducing purine-rich red meats or organ foods is recommended.',
    questionsForPhysician: [
      'Does this uric acid elevation require prescription allopurinol or dietary moderation?',
      'Should I repeat a routine urinalysis to check for microscopic crystals?'
    ]
  }
];
