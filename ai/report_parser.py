"""
Machine Learning & NLP Module: Medical Report Analyzer & Biomarker Extraction
Comprehensive laboratory coverage across all 10 major diagnostic sectors:
1. Complete Blood Count (CBC & Hematology)
2. Lipid / Cholesterol Profile
3. Blood Glucose & Diabetes Panel (FBS, RBS, PPBS, HbA1c)
4. Kidney Function / Renal Panel (KFT / RFT)
5. Liver Function Tests (LFT)
6. Thyroid Profile (TSH, FT3, FT4)
7. Electrolytes & Minerals (Sodium, Potassium, Calcium)
8. Vitamins & Iron (Vitamin D, B12, Ferritin)
9. Infection & Inflammation Markers (CRP, ESR)
10. Urine Routine Examination (Urine R/E)

All explanations are written in clear, simple, and easy-to-understand English.
"""
import re
from typing import Dict, List, Any

# Clinical Reference Intervals & Plain-English Diagnostic Explanations
KNOWN_BIOMARKERS = [
    # -------------------------------------------------------------
    # 1. Complete Blood Count (CBC)
    # -------------------------------------------------------------
    {
        "patterns": [r"hemoglobin\b", r"\bhgb\b", r"\bhb\b"],
        "name": "Hemoglobin (Hb)",
        "unit": "g/dL",
        "min_normal": 13.0,
        "max_normal": 17.0,
        "low_alert": "Low hemoglobin means your body has fewer red cells to carry oxygen (anemia). You may feel tired, weak, or dizzy. Eating iron-rich foods like spinach, meat, beans, and lentils usually helps.",
        "high_alert": "High hemoglobin means your blood is thicker than normal. This is often caused by not drinking enough water (dehydration) or smoking."
    },
    {
        "patterns": [r"total rbc\b", r"rbc count\b", r"\brbc\b", r"red blood cells?\b"],
        "name": "Total RBC Count",
        "unit": "million/uL",
        "min_normal": 4.5,
        "max_normal": 5.9,
        "low_alert": "Low red blood cell count points to anemia or recent blood loss. This causes fatigue and weakness.",
        "high_alert": "High red blood cell count may happen when you are dehydrated or living at high altitude."
    },
    {
        "patterns": [r"total wbc\b", r"wbc count\b", r"\bwbc\b", r"\btlc\b", r"white blood cells?\b"],
        "name": "Total WBC Count",
        "unit": "/cumm",
        "min_normal": 4000.0,
        "max_normal": 11000.0,
        "low_alert": "Low white blood cells mean your immune defense is weak right now. It is commonly seen during viral fevers (like dengue or viral flu).",
        "high_alert": "High white blood cells show that your body's immune system is actively fighting an infection or inflammation."
    },
    {
        "patterns": [r"platelet\b", r"platelets\b", r"platelet count\b", r"\bplt\b"],
        "name": "Platelet Count",
        "unit": "/cumm",
        "min_normal": 150000.0,
        "max_normal": 450000.0,
        "low_alert": "Low platelets mean your blood will take longer to stop bleeding if you get a cut. This is very common in dengue fever. Please consult a doctor promptly.",
        "high_alert": "High platelets can cause blood to clot more easily or may be a temporary reaction to inflammation."
    },
    {
        "patterns": [r"neutrophil\b", r"neutrophils\b", r"\bpolymorphs\b"],
        "name": "Neutrophils",
        "unit": "%",
        "min_normal": 40.0,
        "max_normal": 75.0,
        "low_alert": "Low neutrophils mean reduced defense against bacterial germs.",
        "high_alert": "High neutrophils usually mean your body is fighting a bacterial infection."
    },
    {
        "patterns": [r"lymphocyte\b", r"lymphocytes\b"],
        "name": "Lymphocytes",
        "unit": "%",
        "min_normal": 20.0,
        "max_normal": 45.0,
        "low_alert": "Low lymphocytes can occur during stress, illness, or with certain medications.",
        "high_alert": "High lymphocytes often mean your body is fighting off a viral infection."
    },
    {
        "patterns": [r"eosinophil\b", r"eosinophils\b"],
        "name": "Eosinophils",
        "unit": "%",
        "min_normal": 1.0,
        "max_normal": 6.0,
        "low_alert": "Low levels are completely normal and not a concern.",
        "high_alert": "High eosinophils usually point to allergies, asthma, dust sensitivity, or stomach worms/parasites."
    },
    {
        "patterns": [r"monocyte\b", r"monocytes\b"],
        "name": "Monocytes",
        "unit": "%",
        "min_normal": 2.0,
        "max_normal": 10.0,
        "low_alert": "Low levels are rare and generally not a problem.",
        "high_alert": "High monocytes can indicate your body is recovering from an infection or chronic inflammation."
    },
    {
        "patterns": [r"\besr\b", r"erythrocyte sedimentation rate\b"],
        "name": "ESR (Erythrocyte Sed Rate)",
        "unit": "mm/1st hr",
        "min_normal": 0.0,
        "max_normal": 20.0,
        "low_alert": "Low ESR is safe and normal.",
        "high_alert": "High ESR shows there is inflammation, infection, or pain somewhere in the body."
    },
    {
        "patterns": [r"\bmcv\b", r"mean corpuscular volume\b"],
        "name": "MCV (Red Cell Size)",
        "unit": "fL",
        "min_normal": 80.0,
        "max_normal": 100.0,
        "low_alert": "Small red blood cells (microcytic) are most often caused by iron deficiency anemia.",
        "high_alert": "Large red blood cells (macrocytic) are commonly caused by low Vitamin B12 or folic acid."
    },
    {
        "patterns": [r"\bmch\b", r"mean corpuscular hemoglobin\b"],
        "name": "MCH",
        "unit": "pg",
        "min_normal": 27.0,
        "max_normal": 32.0,
        "low_alert": "Pale red blood cells indicating iron deficiency.",
        "high_alert": "Usually seen alongside Vitamin B12 or folic acid deficiency."
    },

    # -------------------------------------------------------------
    # 2. Lipid Profile (Cholesterol & Heart Health)
    # -------------------------------------------------------------
    {
        "patterns": [r"total cholesterol\b", r"\bcholesterol\b"],
        "name": "Total Cholesterol",
        "unit": "mg/dL",
        "min_normal": 125.0,
        "max_normal": 200.0,
        "low_alert": "Low total cholesterol is generally safe unless caused by severe poor nutrition.",
        "high_alert": "High total cholesterol increases the risk of blood vessels getting blocked over time. Eating less oily and fried food and walking 30 minutes a day will help lower it."
    },
    {
        "patterns": [r"hdl\b", r"hdl cholesterol\b"],
        "name": "HDL ('Good') Cholesterol",
        "unit": "mg/dL",
        "min_normal": 40.0,
        "max_normal": 60.0,
        "low_alert": "Low 'Good' cholesterol means your blood vessels have less natural protection against fat buildup. Regular brisk walking helps raise HDL.",
        "high_alert": "High 'Good' cholesterol is excellent and protects your heart health."
    },
    {
        "patterns": [r"ldl\b", r"ldl cholesterol\b"],
        "name": "LDL ('Bad') Cholesterol",
        "unit": "mg/dL",
        "min_normal": 50.0,
        "max_normal": 100.0,
        "low_alert": "Low 'Bad' cholesterol is healthy and good for your heart.",
        "high_alert": "High 'Bad' cholesterol sticks inside your blood vessels and can lead to heart problems. Reduce red meat, butter, and deep-fried foods."
    },
    {
        "patterns": [r"triglyceride\b", r"triglycerides\b", r"\btg\b"],
        "name": "Triglycerides",
        "unit": "mg/dL",
        "min_normal": 50.0,
        "max_normal": 150.0,
        "low_alert": "Low triglycerides are normal and safe.",
        "high_alert": "High triglycerides mean extra fats in the blood, often from eating excess sweets, white rice, sugary drinks, or oily food. Exercise and cutting sugar helps rapidly."
    },
    {
        "patterns": [r"vldl\b", r"vldl cholesterol\b"],
        "name": "VLDL Cholesterol",
        "unit": "mg/dL",
        "min_normal": 5.0,
        "max_normal": 30.0,
        "low_alert": "Normal and safe.",
        "high_alert": "Elevated VLDL is connected with higher triglycerides and liver fat."
    },

    # -------------------------------------------------------------
    # 3. Blood Glucose & Diabetes Panel
    # -------------------------------------------------------------
    {
        "patterns": [r"fasting blood sugar\b", r"\bfbs\b", r"fasting glucose\b", r"glucose fasting\b"],
        "name": "Fasting Blood Sugar",
        "unit": "mmol/L",
        "min_normal": 4.0,
        "max_normal": 5.6,
        "low_alert": "Low blood sugar (below 4.0) causes dizziness, shakiness, sweating, and weakness. Eat or drink something sweet immediately if feeling faint.",
        "high_alert": "Between 5.6 and 6.9 means pre-diabetes. 7.0 or higher suggests diabetes. Daily exercise and cutting down on sugar and carbohydrates helps bring it down."
    },
    {
        "patterns": [r"random blood sugar\b", r"\brbs\b", r"random glucose\b"],
        "name": "Random Blood Sugar",
        "unit": "mmol/L",
        "min_normal": 4.4,
        "max_normal": 7.8,
        "low_alert": "Low blood sugar. If feeling shaky or weak, have a small sweet snack or fruit juice.",
        "high_alert": "Above 7.8 means elevated sugar. Above 11.1 mmol/L strongly suggests diabetes. Please consult a doctor."
    },
    {
        "patterns": [r"post prandial\b", r"2h post\b", r"\bppbs\b", r"2 hours after meal\b"],
        "name": "Post-Meal Blood Sugar (2h)",
        "unit": "mmol/L",
        "min_normal": 4.4,
        "max_normal": 7.8,
        "low_alert": "Low post-meal blood sugar.",
        "high_alert": "Between 7.8 and 11.0 indicates pre-diabetes. Above 11.1 indicates diabetes. A doctor can guide your diet or medication."
    },
    {
        "patterns": [r"hba1c\b", r"glycated hemoglobin\b"],
        "name": "HbA1c (3-Month Sugar Average)",
        "unit": "%",
        "min_normal": 4.0,
        "max_normal": 5.7,
        "low_alert": "Below 4.0% is slightly low, often seen with frequent low sugar episodes.",
        "high_alert": "5.7% to 6.4% indicates pre-diabetes. 6.5% or higher indicates diabetes. This test checks your average sugar control over the past 3 months."
    },

    # -------------------------------------------------------------
    # 4. Kidney Function / Renal Panel (KFT / RFT)
    # -------------------------------------------------------------
    {
        "patterns": [r"serum creatinine\b", r"\bcreatinine\b"],
        "name": "Serum Creatinine",
        "unit": "mg/dL",
        "min_normal": 0.7,
        "max_normal": 1.2,
        "low_alert": "Low creatinine is usually harmless and related to low muscle mass or eating less protein.",
        "high_alert": "High creatinine means your kidneys are not filtering waste from your blood as effectively as they should. Drink plenty of water and show this to a kidney specialist."
    },
    {
        "patterns": [r"blood urea nitrogen\b", r"\bbun\b"],
        "name": "BUN (Blood Urea Nitrogen)",
        "unit": "mg/dL",
        "min_normal": 7.0,
        "max_normal": 20.0,
        "low_alert": "Low BUN is usually caused by low protein diet or high fluid intake.",
        "high_alert": "High BUN suggests dehydration or that kidneys need a checkup."
    },
    {
        "patterns": [r"blood urea\b", r"serum urea\b", r"\burea\b"],
        "name": "Blood Urea",
        "unit": "mg/dL",
        "min_normal": 15.0,
        "max_normal": 40.0,
        "low_alert": "Low urea is safe and not clinically concerning.",
        "high_alert": "High urea can happen when dehydrated, after eating very heavy protein, or when kidneys are under stress."
    },
    {
        "patterns": [r"serum uric acid\b", r"uric acid\b"],
        "name": "Serum Uric Acid",
        "unit": "mg/dL",
        "min_normal": 3.5,
        "max_normal": 7.2,
        "low_alert": "Low uric acid is rare and completely safe.",
        "high_alert": "High uric acid can form sharp crystals in joints, causing sudden severe pain in the big toe, ankles, or knees (gout). It can also cause kidney stones. Drink 3 liters of water daily and avoid red meat and organ meats."
    },
    {
        "patterns": [r"\begfr\b", r"glomerular filtration rate\b"],
        "name": "eGFR (Kidney Filtration Rate)",
        "unit": "mL/min",
        "min_normal": 90.0,
        "max_normal": 120.0,
        "low_alert": "A filtration rate below 60 mL/min means reduced kidney function. Please discuss this with a doctor.",
        "high_alert": "Normal healthy kidney filtration."
    },

    # -------------------------------------------------------------
    # 5. Liver Function Tests (LFT)
    # -------------------------------------------------------------
    {
        "patterns": [r"sgpt\b", r"\balt\b", r"alanine transaminase\b"],
        "name": "SGPT / ALT (Liver Enzyme)",
        "unit": "U/L",
        "min_normal": 7.0,
        "max_normal": 45.0,
        "low_alert": "Normal and healthy liver enzyme reading.",
        "high_alert": "High SGPT means your liver is irritated or swollen. Common causes include fatty liver, viral fever, heavy medications, or oily diet. Avoid fatty foods and alcohol."
    },
    {
        "patterns": [r"sgot\b", r"\bast\b", r"aspartate transaminase\b"],
        "name": "SGOT / AST (Liver Enzyme)",
        "unit": "U/L",
        "min_normal": 8.0,
        "max_normal": 40.0,
        "low_alert": "Normal and healthy reading.",
        "high_alert": "High SGOT can be caused by liver stress, intense muscle exercise, or certain pain medicines."
    },
    {
        "patterns": [r"serum bilirubin\b", r"total bilirubin\b", r"\bbilirubin\b"],
        "name": "Serum Bilirubin (Total)",
        "unit": "mg/dL",
        "min_normal": 0.2,
        "max_normal": 1.2,
        "low_alert": "Normal healthy level.",
        "high_alert": "High bilirubin causes jaundice, turning the white part of your eyes and urine yellow. It means the liver or bile ducts need immediate medical attention."
    },
    {
        "patterns": [r"alkaline phosphatase\b", r"\balp\b"],
        "name": "Alkaline Phosphatase (ALP)",
        "unit": "U/L",
        "min_normal": 44.0,
        "max_normal": 147.0,
        "low_alert": "Usually not a concern.",
        "high_alert": "High ALP can indicate a blocked bile duct or bone healing and growth."
    },
    {
        "patterns": [r"serum albumin\b", r"\balbumin\b"],
        "name": "Serum Albumin",
        "unit": "g/dL",
        "min_normal": 3.5,
        "max_normal": 5.0,
        "low_alert": "Low albumin means low protein in the body, which can cause swelling in feet and legs.",
        "high_alert": "High albumin is usually caused by dehydration (not drinking enough water)."
    },

    # -------------------------------------------------------------
    # 6. Thyroid Function Tests
    # -------------------------------------------------------------
    {
        "patterns": [r"\btsh\b", r"thyroid stimulating hormone\b"],
        "name": "TSH (Thyroid Stimulating Hormone)",
        "unit": "uIU/mL",
        "min_normal": 0.4,
        "max_normal": 4.5,
        "low_alert": "Low TSH means your thyroid is overactive (Hyperthyroidism). This can cause weight loss, rapid heartbeat, sweating, and restlessness.",
        "high_alert": "High TSH means your thyroid gland is working too slowly (Hypothyroidism). This commonly causes feeling cold, weight gain, hair loss, and tiredness. A daily thyroid pill easily normalizes this."
    },
    {
        "patterns": [r"free t3\b", r"\bft3\b"],
        "name": "Free T3 (Active Thyroid Hormone)",
        "unit": "pg/mL",
        "min_normal": 2.0,
        "max_normal": 4.4,
        "low_alert": "Low T3 points to an underactive thyroid.",
        "high_alert": "High T3 indicates an overactive thyroid."
    },
    {
        "patterns": [r"free t4\b", r"\bft4\b"],
        "name": "Free T4 (Thyroid Hormone)",
        "unit": "ng/dL",
        "min_normal": 0.8,
        "max_normal": 1.8,
        "low_alert": "Low T4 confirms an underactive thyroid.",
        "high_alert": "High T4 confirms an overactive thyroid."
    },

    # -------------------------------------------------------------
    # 7. Electrolytes & Minerals
    # -------------------------------------------------------------
    {
        "patterns": [r"serum sodium\b", r"\bsodium\b", r"\bna\+\b"],
        "name": "Serum Sodium",
        "unit": "mmol/L",
        "min_normal": 135.0,
        "max_normal": 145.0,
        "low_alert": "Low sodium (hyponatremia) can cause headache, confusion, nausea, and unsteady walking. Often caused by severe diarrhea, vomiting, or water imbalance.",
        "high_alert": "High sodium is usually caused by dehydration or heavy fluid loss."
    },
    {
        "patterns": [r"serum potassium\b", r"\bpotassium\b", r"\bk\+\b"],
        "name": "Serum Potassium",
        "unit": "mmol/L",
        "min_normal": 3.5,
        "max_normal": 5.1,
        "low_alert": "Low potassium causes muscle weakness, cramps, and abnormal heartbeat. Often seen after diarrhea or with water pills (diuretics). Eating bananas and coconut water helps.",
        "high_alert": "High potassium can affect heart rhythms. Please show this report to a doctor right away."
    },
    {
        "patterns": [r"serum calcium\b", r"\bcalcium\b"],
        "name": "Serum Calcium",
        "unit": "mg/dL",
        "min_normal": 8.5,
        "max_normal": 10.5,
        "low_alert": "Low calcium can cause tingling in fingers, muscle cramps, and brittle bones. Vitamin D and milk help.",
        "high_alert": "High calcium can cause excessive thirst, stomach pain, or kidney stones."
    },

    # -------------------------------------------------------------
    # 8. Vitamins & Iron
    # -------------------------------------------------------------
    {
        "patterns": [r"vitamin d\b", r"25-hydroxy\b", r"vit d3\b"],
        "name": "Vitamin D (25-OH)",
        "unit": "ng/mL",
        "min_normal": 30.0,
        "max_normal": 100.0,
        "low_alert": "Low Vitamin D is very common and causes bone pain, weak immunity, and fatigue. Morning sunlight, eggs, fish, and Vitamin D supplements help restore it.",
        "high_alert": "High Vitamin D usually only occurs from taking too many supplement pills."
    },
    {
        "patterns": [r"vitamin b12\b", r"\bb12\b"],
        "name": "Vitamin B12",
        "unit": "pg/mL",
        "min_normal": 200.0,
        "max_normal": 900.0,
        "low_alert": "Low Vitamin B12 causes numbness or tingling in hands and feet, memory fog, and anemia. Common in vegetarians. Vitamin B12 pills or milk help.",
        "high_alert": "High levels are usually harmless and caused by recent vitamin intake."
    },
    {
        "patterns": [r"serum ferritin\b", r"\bferritin\b"],
        "name": "Serum Ferritin (Iron Storage)",
        "unit": "ng/mL",
        "min_normal": 20.0,
        "max_normal": 250.0,
        "low_alert": "Low ferritin means your body's iron stores are empty, leading to anemia and hair loss.",
        "high_alert": "High ferritin can reflect inflammation, fatty liver, or excess iron."
    },

    # -------------------------------------------------------------
    # 9. Infection & Inflammation Markers
    # -------------------------------------------------------------
    {
        "patterns": [r"c-reactive protein\b", r"\bcrp\b"],
        "name": "CRP (C-Reactive Protein)",
        "unit": "mg/L",
        "min_normal": 0.0,
        "max_normal": 5.0,
        "low_alert": "Normal healthy reading with no sign of active inflammation.",
        "high_alert": "High CRP indicates active infection or inflammation in the body. A doctor will check where the infection is located."
    },

    # -------------------------------------------------------------
    # 10. Urine Routine & Microscopic (Urine R/E)
    # -------------------------------------------------------------
    {
        "patterns": [r"pus cells\b", r"wbc in urine\b", r"urine pus\b"],
        "name": "Urine Pus Cells",
        "unit": "/HPF",
        "min_normal": 0.0,
        "max_normal": 5.0,
        "low_alert": "Normal healthy urine.",
        "high_alert": "High pus cells in urine (more than 5) indicate a Urinary Tract Infection (UTI). Common symptoms are burning during urination and lower belly pain. Drink plenty of water and consult a doctor for antibiotics."
    },
    {
        "patterns": [r"rbc in urine\b", r"urine rbc\b", r"red blood cells in urine\b"],
        "name": "Urine RBCs",
        "unit": "/HPF",
        "min_normal": 0.0,
        "max_normal": 3.0,
        "low_alert": "Normal healthy reading.",
        "high_alert": "Blood cells in urine can be caused by a urinary infection, kidney stones, or heavy exercise. Needs evaluation by a physician."
    }
]

class ReportParserML:
    @staticmethod
    def extract_biomarkers(report_text: str) -> List[Dict[str, Any]]:
        extracted = []
        found_names = set()
        lines = report_text.splitlines()

        for biomarker in KNOWN_BIOMARKERS:
            matched_value = None
            for pattern in biomarker["patterns"]:
                # Match pattern followed by colon, equals, or dash, and a decimal number
                regex = re.compile(rf"{pattern}\s*[:=-]?\s*([0-9]+(?:\.[0-9]+)?)", re.IGNORECASE)
                
                # Check line by line first
                for line in lines:
                    match = regex.search(line)
                    if match:
                        try:
                            matched_value = float(match.group(1))
                            break
                        except ValueError:
                            pass
                if matched_value is not None:
                    break

                # Full text check if not found line by line
                match_full = regex.search(report_text)
                if match_full:
                    try:
                        matched_value = float(match_full.group(1))
                        break
                    except ValueError:
                        pass

            if matched_value is not None and biomarker["name"] not in found_names:
                found_names.add(biomarker["name"])
                min_n = biomarker["min_normal"]
                max_n = biomarker["max_normal"]
                
                # Handle platelet unit: if expressed as 2.4 (lakh/cumm), scale or adjust
                unit = biomarker["unit"]
                if biomarker["name"] == "Platelet Count":
                    if matched_value < 10.0:
                        unit = "lakh/cumm"
                        min_n = 1.5
                        max_n = 4.5

                if matched_value < min_n:
                    status = "Low"
                    explanation = biomarker["low_alert"]
                elif matched_value > max_n:
                    status = "High"
                    explanation = biomarker["high_alert"]
                else:
                    status = "Normal"
                    explanation = f"{biomarker['name']} is in the healthy normal range."

                extracted.append({
                    "name": biomarker["name"],
                    "value": matched_value,
                    "unit": unit,
                    "reference_range": f"{min_n} - {max_n} {unit}",
                    "status": status,
                    "explanation": explanation
                })

        return extracted

    @classmethod
    def analyze(cls, report_text: str, patient_age: int = 35, patient_gender: str = "Male") -> Dict[str, Any]:
        biomarkers = cls.extract_biomarkers(report_text)
        
        # If no values were detected, provide an honest, helpful message rather than fabricating fake test results
        if not biomarkers:
            return {
                "report_type": "Medical Document Analysis",
                "biomarkers": [],
                "normal_count": 0,
                "abnormal_count": 0,
                "clinical_summary": "We could not find recognized lab numbers in the text provided. Please make sure the report text or photo clearly displays test names and numbers (for example: Hemoglobin: 12.5 or Fasting Blood Sugar: 5.4). You can also click one of the sample reports below to see how it works.",
                "questions_for_doctor": [
                    "Can you review my printed lab report directly?",
                    "Are there any specific repeat tests I should perform?"
                ],
                "safety_disclaimer": "MedNex is an educational tool to help you understand your report. It does not replace a doctor. Always show your reports to a licensed physician."
            }

        normal_count = sum(1 for b in biomarkers if b["status"] == "Normal")
        abnormal_count = len(biomarkers) - normal_count

        # Categorize the test report
        names_str = " ".join(b["name"].lower() for b in biomarkers)
        if "tsh" in names_str:
            report_type = "Thyroid Function Panel"
        elif "pus cells" in names_str:
            report_type = "Urine Routine Examination (Urine R/E)"
        elif "creatinine" in names_str or "urea" in names_str or "uric acid" in names_str:
            report_type = "Kidney Function Test (KFT)"
        elif "sgpt" in names_str or "bilirubin" in names_str:
            report_type = "Liver Function Test (LFT)"
        elif "cholesterol" in names_str or "triglyceride" in names_str:
            report_type = "Lipid / Cholesterol Profile"
        elif "glucose" in names_str or "sugar" in names_str or "hba1c" in names_str:
            report_type = "Blood Glucose & Diabetes Panel"
        elif "hemoglobin" in names_str or "platelet" in names_str or "wbc" in names_str:
            report_type = "Complete Blood Count (CBC)"
        else:
            report_type = "Laboratory Test Report"

        if abnormal_count > 0:
            abnormal_items = [b["name"] for b in biomarkers if b["status"] != "Normal"]
            summary = (
                f"Your report shows {len(biomarkers)} tested items. "
                f"{normal_count} items are in the healthy range, and {abnormal_count} items "
                f"({', '.join(abnormal_items)}) need attention. "
                f"Please see the simple explanation for each item below and share this with your doctor."
            )
        else:
            summary = (
                f"Great news! All {normal_count} tested items in this report are in the normal, healthy range."
            )

        questions = [
            "What do my out-of-range test numbers mean for my daily health?",
            "Can I improve these numbers with diet, water, and daily walking, or do I need medicine?",
            "When should I repeat this blood test to check my progress?"
        ]

        return {
            "report_type": report_type,
            "biomarkers": biomarkers,
            "normal_count": normal_count,
            "abnormal_count": abnormal_count,
            "clinical_summary": summary,
            "questions_for_doctor": questions,
            "safety_disclaimer": "MedNex is an educational tool to help you understand your report in simple words. It does not replace a doctor. Always show your reports to a licensed physician."
        }
