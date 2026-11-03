import { MedicineInfo, DrugInteraction } from '../types';

export const MEDICINE_DATABASE: MedicineInfo[] = [
  {
    id: 'med-napa-extra',
    brandName: 'Napa Extra',
    genericName: 'Paracetamol 500mg + Caffeine 65mg',
    manufacturer: 'Beximco Pharmaceuticals Ltd.',
    therapeuticClass: 'Analgesic & Antipyretic',
    form: 'Tablet',
    strengths: ['500mg + 65mg'],
    commonUses: [
      'Relief of mild to moderate fever',
      'Headache and migraine tension relief',
      'Musculoskeletal pain and backache',
      'Dental pain and dysmenorrhea (period cramps)'
    ],
    sideEffects: [
      'Mild insomnia or restlessness (due to caffeine)',
      'Nausea or mild stomach upset if taken without water',
      'Rare skin rashes or allergic hypersensitivity'
    ],
    precautions: [
      'Do not exceed 8 tablets (4,000mg paracetamol) within 24 hours to prevent severe acute liver damage',
      'Exercise caution in individuals with pre-existing hepatic or severe renal impairment',
      'Avoid consuming excessive coffee, tea, or energy drinks while taking this medicine'
    ],
    contraindications: [
      'Known hypersensitivity to paracetamol or caffeine',
      'Severe acute liver failure or cirrhosis'
    ],
    foodInteractions: 'Can be taken with or after food. Limit high-caffeine beverages.',
    isPregnancySafe: 'Consult physician. Paracetamol alone is preferred during pregnancy; excessive caffeine should be minimized.'
  },
  {
    id: 'med-seclo',
    brandName: 'Seclo 20',
    genericName: 'Omeprazole 20mg',
    manufacturer: 'Square Pharmaceuticals PLC',
    therapeuticClass: 'Proton Pump Inhibitor (PPI)',
    form: 'Capsule',
    strengths: ['20mg', '40mg'],
    commonUses: [
      'Gastroesophageal Reflux Disease (GERD) & heartburn',
      'Gastric and duodenal ulcers',
      'Gastritis and acid-related dyspepsia',
      'Prevention of NSAID-induced stomach ulcers'
    ],
    sideEffects: [
      'Headache',
      'Abdominal pain or flatulence',
      'Mild diarrhea or constipation',
      'Dry mouth'
    ],
    precautions: [
      'Best taken 30 to 60 minutes before meals (preferably in the morning before breakfast)',
      'Long-term continuous use (> 1 year) may reduce calcium and magnesium absorption; periodic review recommended',
      'Do not crush or chew delayed-release capsules'
    ],
    contraindications: [
      'Hypersensitivity to omeprazole or other substituted benzimidazoles',
      'Concomitant administration with nelfinavir'
    ],
    foodInteractions: 'Should be taken on an empty stomach 30-60 minutes before breakfast.',
    isPregnancySafe: 'Category C. Use only if clearly needed and advised by a registered obstetrician.'
  },
  {
    id: 'med-azith',
    brandName: 'Azith 500',
    genericName: 'Azithromycin 500mg',
    manufacturer: 'Square Pharmaceuticals PLC',
    therapeuticClass: 'Macrolide Antibiotic',
    form: 'Tablet',
    strengths: ['250mg', '500mg', 'Suspension 200mg/5ml'],
    commonUses: [
      'Upper and lower respiratory tract infections (bronchitis, bacterial pharyngitis, sinusitis)',
      'Community-acquired bacterial pneumonia',
      'Skin and soft tissue infections',
      'Certain sexually transmitted infections (uncomplicated chlamydial urethritis)'
    ],
    sideEffects: [
      'Nausea and stomach cramps',
      'Loose stools / diarrhea',
      'Dizziness or mild taste disturbance'
    ],
    precautions: [
      'MUST complete the full prescribed antibiotic course even if feeling better; stopping early promotes antibiotic resistance',
      'Caution in patients with cardiac arrhythmia or known prolonged QT interval',
      'Do not take aluminium- or magnesium-containing antacids at the same exact time'
    ],
    contraindications: [
      'Hypersensitivity to azithromycin, erythromycin, or any macrolide antibiotic',
      'History of cholestatic jaundice / hepatic dysfunction associated with prior azithromycin use'
    ],
    foodInteractions: 'Can be taken with or without food. Taking with a light snack may minimize stomach upset.',
    isPregnancySafe: 'Category B. Considered relatively safe when prescribed by a physician, but only when strictly indicated.'
  },
  {
    id: 'med-amodis',
    brandName: 'Amodis 400',
    genericName: 'Metronidazole 400mg',
    manufacturer: 'Square Pharmaceuticals PLC',
    therapeuticClass: 'Antiprotozoal & Nitroimidazole Antibacterial',
    form: 'Tablet',
    strengths: ['200mg', '400mg', 'Suspension 200mg/5ml'],
    commonUses: [
      'Amoebic dysentery and intestinal amoebiasis',
      'Giardiasis and bacterial vaginosis',
      'Anaerobic bacterial infections and dental abscesses',
      'Trichomoniasis'
    ],
    sideEffects: [
      'Distinct metallic taste in mouth',
      'Nausea, vomiting, and dark-colored urine (harmless breakdown product)',
      'Mild headache or abdominal discomfort'
    ],
    precautions: [
      'Strictly avoid all alcohol and alcohol-containing cough syrups during treatment and for at least 48 hours after (causes severe disulfiram-like vomiting and flushing)',
      'Complete the full course as prescribed by the doctor'
    ],
    contraindications: [
      'First trimester of pregnancy',
      'Severe active neurological disorders or severe hepatic encephalopathy'
    ],
    foodInteractions: 'Take with or immediately after meals with a glass of water.',
    isPregnancySafe: 'Contraindicated in first trimester. Caution in later stages; consult doctor.'
  },
  {
    id: 'med-monas',
    brandName: 'Monas 10',
    genericName: 'Montelukast Sodium 10mg',
    manufacturer: 'Incepta Pharmaceuticals Ltd.',
    therapeuticClass: 'Leukotriene Receptor Antagonist (LTRA)',
    form: 'Tablet',
    strengths: ['4mg (chewable)', '5mg (chewable)', '10mg'],
    commonUses: [
      'Prophylaxis and chronic management of bronchial asthma',
      'Relief of daytime and nighttime allergic rhinitis symptoms (sneezing, runny nose)',
      'Prevention of exercise-induced bronchoconstriction'
    ],
    sideEffects: [
      'Mild upper respiratory infection symptoms',
      'Headache or fatigue',
      'Rare neuropsychiatric effects (vivid dreams, mood changes)'
    ],
    precautions: [
      'Not intended for the immediate relief of acute acute asthma attacks (always carry a rescue inhaler)',
      'Take regularly at evening as prescribed for best results',
      'Report any mood changes or agitation to your physician'
    ],
    contraindications: [
      'Hypersensitivity to montelukast'
    ],
    foodInteractions: 'May be taken with or without food, preferably in the evening.',
    isPregnancySafe: 'Category B. Generally used when benefits outweigh risks upon physician advice.'
  },
  {
    id: 'med-osartil',
    brandName: 'Osartil 50',
    genericName: 'Losartan Potassium 50mg',
    manufacturer: 'Square Pharmaceuticals PLC',
    therapeuticClass: 'Angiotensin II Receptor Blocker (ARB) / Antihypertensive',
    form: 'Tablet',
    strengths: ['25mg', '50mg', '100mg'],
    commonUses: [
      'Treatment of essential hypertension (high blood pressure)',
      'Renal protection in type 2 diabetic patients with proteinuria',
      'Reduction of stroke risk in patients with hypertension and left ventricular hypertrophy'
    ],
    sideEffects: [
      'Dizziness or orthostatic lightheadedness when rising rapidly',
      'Fatigue or mild nasal congestion',
      'Hyperkalemia (high blood potassium)'
    ],
    precautions: [
      'Monitor blood pressure and serum electrolytes (potassium) periodically',
      'Do not abruptly discontinue without consulting your cardiologist or physician',
      'Avoid potassium supplements or potassium-based salt substitutes unless prescribed'
    ],
    contraindications: [
      'Pregnancy (can cause serious fetal harm and death; discontinued immediately if pregnant)',
      'Severe hepatic impairment'
    ],
    foodInteractions: 'Can be taken with or without meals at the same time each day.',
    isPregnancySafe: 'STRICTLY CONTRAINDICATED IN PREGNANCY (Black Box Warning).'
  },
  {
    id: 'med-sergel',
    brandName: 'Sergel 20',
    genericName: 'Esomeprazole Magnesium 20mg',
    manufacturer: 'Healthcare Pharmaceuticals Ltd.',
    therapeuticClass: 'Proton Pump Inhibitor (PPI)',
    form: 'Capsule',
    strengths: ['20mg', '40mg'],
    commonUses: [
      'Erosive esophagitis and severe acid reflux',
      'Gastric ulcer healing and maintenance of remission',
      'H. pylori eradication (as part of triple therapy with antibiotics)'
    ],
    sideEffects: [
      'Headache',
      'Flatulence, mild diarrhea or abdominal cramping',
      'Nausea'
    ],
    precautions: [
      'Take 30 minutes before the morning meal',
      'Swallow capsule whole with water; do not crush the pellets inside'
    ],
    contraindications: [
      'Hypersensitivity to esomeprazole or substituted benzimidazoles'
    ],
    foodInteractions: 'Take on empty stomach 30-60 mins before food.',
    isPregnancySafe: 'Category B. Discuss with prescribing doctor.'
  },
  {
    id: 'med-metfo',
    brandName: 'Metfo 500',
    genericName: 'Metformin Hydrochloride 500mg',
    manufacturer: 'Beximco Pharmaceuticals Ltd.',
    therapeuticClass: 'Biguanide / Antidiabetic Agent',
    form: 'Tablet',
    strengths: ['500mg', '850mg', '1000mg ER'],
    commonUses: [
      'First-line treatment of Type 2 Diabetes Mellitus',
      'Improvement of insulin sensitivity in polycystic ovary syndrome (PCOS)',
      'Glycemic control alongside diet and exercise'
    ],
    sideEffects: [
      'Gastrointestinal disturbances (diarrhea, abdominal cramps, nausea) when starting',
      'Metallic taste in mouth',
      'Reduced Vitamin B12 absorption with prolonged usage'
    ],
    precautions: [
      'Take with or immediately after meals to minimize stomach upset',
      'Discontinue temporarily prior to iodinated radiocontrast imaging procedures',
      'Contraindicated in severe renal impairment (eGFR < 30 mL/min)'
    ],
    contraindications: [
      'Severe renal failure or severe metabolic acidosis / diabetic ketoacidosis',
      'Severe heart failure or acute tissue hypoperfusion'
    ],
    foodInteractions: 'Always take with meals to reduce gastrointestinal irritation. Avoid binge drinking of alcohol.',
    isPregnancySafe: 'Category B. Generally safe upon specialist endocrinologist consultation.'
  },
  {
    id: 'med-ciprocin',
    brandName: 'Ciprocin 500',
    genericName: 'Ciprofloxacin 500mg',
    manufacturer: 'Square Pharmaceuticals PLC',
    therapeuticClass: 'Fluoroquinolone Antibacterial',
    form: 'Tablet',
    strengths: ['250mg', '500mg', '750mg'],
    commonUses: [
      'Complicated and uncomplicated urinary tract infections (UTIs)',
      'Infectious diarrhea (shigellosis, salmonella, enteric fever)',
      'Bone and joint infections'
    ],
    sideEffects: [
      'Nausea, mild diarrhea, loss of appetite',
      'Photosensitivity (skin burning in direct sunlight)',
      'Rare tendonitis or tendon rupture risk (Achilles tendon)'
    ],
    precautions: [
      'Drink plenty of fluids to prevent crystalluria (kidney crystal formation)',
      'Do not take within 2 hours of milk, yogurt, calcium, iron, or antacids',
      'Stop immediately if experiencing pain, swelling, or inflammation in tendons'
    ],
    contraindications: [
      'Hypersensitivity to ciprofloxacin or quinolones',
      'Concurrent administration with tizanidine'
    ],
    foodInteractions: 'Avoid taking with dairy products alone (milk, yogurt) or calcium-fortified juices as calcium binds the drug.',
    isPregnancySafe: 'Category C. Avoid during pregnancy and pediatric patients unless specifically directed.'
  }
];

export const KNOWN_DRUG_INTERACTIONS: DrugInteraction[] = [
  {
    drug1: 'Osartil 50',
    drug2: 'Metfo 500',
    severity: 'Minor / Monitor',
    effect: 'Concomitant use may enhance renal monitoring needs in diabetic nephropathy.',
    recommendation: 'Safe to combine under routine physician supervision. Check serum creatinine and electrolytes every 6 months.'
  },
  {
    drug1: 'Osartil 50',
    drug2: 'Napa Extra',
    severity: 'Moderate',
    effect: 'Frequent high doses of analgesics/NSAIDs may diminish the blood pressure-lowering effect of ARBs and increase renal strain.',
    recommendation: 'Use Napa for acute pain only; avoid continuous daily co-administration without doctor consultation.'
  },
  {
    drug1: 'Seclo 20',
    drug2: 'Ciprocin 500',
    severity: 'Moderate',
    effect: 'Altered gastric acidity from PPIs can moderately affect the bioavailability and absorption rate of fluoroquinolones.',
    recommendation: 'Take Ciprocin at least 2 hours before or after acid-reducing medications.'
  },
  {
    drug1: 'Amodis 400',
    drug2: 'Napa Extra',
    severity: 'Moderate',
    effect: 'Concurrent hepatic metabolism burden; excessive intake increases metabolic load on the liver.',
    recommendation: 'Strictly avoid all alcohol-containing medications while on Amodis. Stay within standard recommended doses.'
  },
  {
    drug1: 'Azith 500',
    drug2: 'Ciprocin 500',
    severity: 'Severe / Contraindicated',
    effect: 'Additive risk of cardiac QT prolongation and ventricular arrhythmias.',
    recommendation: 'Co-administration is generally contraindicated unless specifically monitored in hospital settings.'
  }
];
