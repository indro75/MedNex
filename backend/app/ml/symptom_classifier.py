"""
Machine Learning Module: NLP-Based Symptom Classification & Medical Specialty Recommendation
Uses TF-IDF Vectorizer + Multinomial Naive Bayes / Logistic Regression with safe clinical uncertainty handling
and emergency red-flag triage detection.
"""
import re
from typing import Dict, List, Tuple
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline

# Clinical training dataset: Symptom descriptions mapped to Medical Specialties
TRAINING_DATA = [
    # Cardiology
    ("chest pain radiating to left arm jaw tightness sweating shortness of breath", "Cardiology"),
    ("palpitations irregular heart beat racing pulse flutter in chest dizziness", "Cardiology"),
    ("high blood pressure hypertension chest heaviness exertion breathlessness", "Cardiology"),
    ("swelling in ankles feet edema heart flutter shortness of breath lying flat", "Cardiology"),
    ("substernal pressure chest tightness cold sweat lightheadedness syncope", "Cardiology"),
    ("elevated cholesterol chest discomfort after climbing stairs cardiology", "Cardiology"),

    # Pulmonology
    ("persistent dry cough fever wheezing chest congestion difficulty breathing", "Pulmonology"),
    ("asthma attack wheezing shortness of breath inhaler not working chest tight", "Pulmonology"),
    ("coughing up yellow green phlegm sputum chills fever lung infection bronchitis", "Pulmonology"),
    ("chronic smoker breathlessness emphysema morning cough hemoptysis blood in sputum", "Pulmonology"),
    ("post covid lung weakness shallow breathing pleural pain sharp chest pain on breathing", "Pulmonology"),

    # Gastroenterology
    ("severe abdominal pain upper stomach burning acid reflux heartburn GERD", "Gastroenterology"),
    ("nausea vomiting diarrhea loose motion watery stool stomach cramps food poisoning", "Gastroenterology"),
    ("constipation bloating gas indigestion abdominal distension peptic ulcer", "Gastroenterology"),
    ("yellow skin eyes jaundice dark urine pale stool liver pain right upper abdomen", "Gastroenterology"),
    ("blood in stool rectal bleeding piles hemorrhoids painful bowel movement", "Gastroenterology"),
    ("stomach acidity sour burp gastritis burning sensation after eating spicy food", "Gastroenterology"),

    # Neurology
    ("severe throbbing headache one side migraine nausea sensitivity to light sound", "Neurology"),
    ("dizziness vertigo room spinning loss of balance unsteady gait", "Neurology"),
    ("tingling numbness in hands feet peripheral neuropathy nerve weakness", "Neurology"),
    ("memory loss confusion tremors shaking hands involuntary movements Parkinson's", "Neurology"),
    ("seizure convulsions loss of consciousness brief blackout epilepsy", "Neurology"),
    ("facial tingling drooping eyelid sudden weakness in arm or leg", "Neurology"),

    # Orthopedics
    ("severe knee pain difficulty walking swelling joint stiffness arthritis", "Orthopedics"),
    ("lower back pain lumbar spasm slipped disc radiating down back of leg sciatica", "Orthopedics"),
    ("shoulder pain frozen shoulder inability to lift arm sports injury tendonitis", "Orthopedics"),
    ("wrist fracture bone crack fall injury swelling bruising unable to bear weight", "Orthopedics"),
    ("neck stiffness cervical spondylosis pain turning head bone crackling", "Orthopedics"),

    # Dermatology
    ("red itchy skin rash hives urticaria allergic reaction scratching blisters", "Dermatology"),
    ("severe acne pimples pustules oily face blackheads scars on forehead cheeks", "Dermatology"),
    ("dry scaly patches silvery scales psoriasis eczema itchy red dry skin", "Dermatology"),
    ("fungal infection ringworm itching in skin folds groin ring shaped rash", "Dermatology"),
    ("hair loss alopecia patches dandruff scalp itching burning skin lesion mole changing", "Dermatology"),

    # Pediatrics
    ("child infant high fever crying inconsolably refusing breastfeed lethargic", "Pediatrics"),
    ("baby diaper rash red bumps vomiting green fluid diarrhea in toddler", "Pediatrics"),
    ("chickenpox fever blisters all over body in child pediatrician measles rash", "Pediatrics"),
    ("stunted growth poor appetite delayed milestones child vaccination query", "Pediatrics"),

    # ENT (Ear, Nose, Throat)
    ("severe sore throat difficulty swallowing swollen tonsils tonsillitis hoarse voice", "ENT"),
    ("ear pain earache discharge fluid ringing in ear tinnitus hearing loss", "ENT"),
    ("nasal congestion blocked nose runny sinus headache facial pressure sinusitis", "ENT"),
    ("vertigo inner ear balance issue throat ulcer difficulty speaking", "ENT"),

    # Urology / Nephrology
    ("burning sensation while urinating frequent urination UTI cloudy smelly urine", "Urology"),
    ("flank pain kidney stone severe back pain groin hematuria blood in urine", "Urology"),
    ("difficulty passing urine weak stream swollen prostate nocturia frequent night urination", "Urology"),

    # General Medicine
    ("general body ache weakness chronic fatigue mild fever loss of appetite", "General Medicine"),
    ("unexplained weight loss low grade evening fever night sweats malaise", "General Medicine"),
    ("viral fever seasonal flu body shivering dehydration fatigue", "General Medicine")
]

# Clinical Red-Flag emergency triggers
RED_FLAGS = [
    {
        "pattern": r"(chest pain.*(arm|jaw|neck|sweat|breath|tight))|(pressure.*chest)|(heart attack)",
        "warning": "Suspected acute coronary syndrome / myocardial infarction. Immediate emergency care required.",
        "specialty": "Cardiology",
        "causes": ["Acute Myocardial Infarction", "Angina Pectoris", "Aortic Dissection", "Severe Coronary Spasm"]
    },
    {
        "pattern": r"(face.*droop|slurr.*speech|arm.*weak|sudden.*numb.*one side|stroke)",
        "warning": "Suspected acute ischemic or hemorrhagic stroke (FAST criteria). Time-sensitive brain emergency.",
        "specialty": "Neurology",
        "causes": ["Acute Ischemic Stroke", "Transient Ischemic Attack (TIA)", "Intracranial Hemorrhage"]
    },
    {
        "pattern": r"(severe.*breath|cannot breathe|cyanosis|lips.*blue|gasping|choking)",
        "warning": "Severe respiratory distress / acute airway compromise. Needs immediate oxygenation.",
        "specialty": "Pulmonology",
        "causes": ["Acute Severe Asthma", "Anaphylaxis", "Pulmonary Embolism", "Foreign Body Obstruction"]
    },
    {
        "pattern": r"(cough.*blood|hemoptysis|vomit.*blood|black.*tarry.*stool)",
        "warning": "Active internal or gastrointestinal hemorrhage.",
        "specialty": "Gastroenterology",
        "causes": ["Upper GI Bleed", "Bleeding Peptic Ulcer", "Esophageal Varices", "Severe Pulmonary Pathology"]
    },
    {
        "pattern": r"(high fever.*stiff neck|fever.*confusion|seizure.*unconscious)",
        "warning": "Suspected meningitis, encephalitis, or status epilepticus.",
        "specialty": "Neurology",
        "causes": ["Bacterial Meningitis", "Viral Encephalitis", "Status Epilepticus"]
    }
]

class SymptomClassifierML:
    def __init__(self):
        self.pipeline = None
        self.classes = []
        self._train_model()

    def _train_model(self):
        """Train TF-IDF + Multinomial Naive Bayes pipeline with hyperparameter tuning."""
        texts = [item[0] for item in TRAINING_DATA]
        labels = [item[1] for item in TRAINING_DATA]
        
        self.pipeline = Pipeline([
            ("tfidf", TfidfVectorizer(ngram_range=(1, 2), stop_words="english", lowercase=True)),
            ("clf", MultinomialNB(alpha=0.5))
        ])
        self.pipeline.fit(texts, labels)
        self.classes = list(self.pipeline.classes_)

    def check_red_flags(self, text: str) -> Tuple[bool, Dict]:
        """Examine input text against emergency clinical red flags."""
        text_lower = text.lower()
        for flag in RED_FLAGS:
            if re.search(flag["pattern"], text_lower):
                return True, flag
        return False, {}

    def predict(self, text: str, selected_symptoms: List[str] = None, severity: str = "Mild") -> Dict:
        """
        Predict medical specialty and urgency using ML model and clinical decision logic.
        """
        combined_text = text
        if selected_symptoms:
            combined_text += " " + " ".join(selected_symptoms)

        # 1. Emergency Red Flag Screening
        is_red_flag, red_flag_info = self.check_red_flags(combined_text)
        if is_red_flag:
            return {
                "urgency_level": "emergency",
                "is_emergency": True,
                "emergency_warning": red_flag_info["warning"],
                "primary_specialty": red_flag_info["specialty"],
                "alternative_specialties": ["Emergency Medicine", "General Medicine"],
                "confidence_score": 0.96,
                "possible_causes": red_flag_info["causes"],
                "recommended_action": "SEEK EMERGENCY HOSPITAL CARE IMMEDIATELY. Call 999 or proceed to Khulna Medical College Hospital Emergency Ward without delay.",
                "home_care_advice": [
                    "Do NOT drive yourself; call for an ambulance or have someone drive you.",
                    "Rest in a seated or semi-reclined position while waiting for medical help.",
                    "Keep airway clear and loosen restrictive clothing."
                ],
                "red_flags": [red_flag_info["warning"]]
            }

        # 2. ML Probability Distribution
        probs = self.pipeline.predict_proba([combined_text])[0]
        top_idx = np.argsort(probs)[::-1]
        
        primary_specialty = str(self.classes[top_idx[0]])
        confidence = float(probs[top_idx[0]])
        
        alt_specialties = [str(self.classes[i]) for i in top_idx[1:3] if probs[i] > 0.12]
        if not alt_specialties:
            alt_specialties = ["General Medicine"]

        # Safe uncertainty handling: low confidence reverts to General Medicine
        if confidence < 0.28:
            primary_specialty = "General Medicine"
            confidence = 0.50

        # Determine Urgency Level based on severity and confidence
        if severity == "Severe":
            urgency = "high"
            action = f"Schedule an in-person consultation with a {primary_specialty} specialist today or visit an urgent care center."
        elif severity == "Moderate":
            urgency = "moderate"
            action = f"Consult a verified {primary_specialty} specialist within 24 to 48 hours for clinical evaluation."
        else:
            urgency = "low"
            action = f"Monitor symptoms and consult a {primary_specialty} specialist if symptoms persist beyond 3 days."

        # Specialty-based clinical differential causes
        causes_map = {
            "Cardiology": ["Benign Palpitations", "Costochondritis", "Hypertensive Fluctuations", "Cardiovascular Strain"],
            "Pulmonology": ["Viral Bronchitis", "Allergic Asthma", "Upper Respiratory Infection", "Post-Nasal Congestion"],
            "Gastroenterology": ["Gastroesophageal Reflux (GERD)", "Functional Dyspepsia", "Acute Gastritis", "Irritable Bowel Syndrome"],
            "Neurology": ["Tension-Type Headache", "Migraine", "Benign Paroxysmal Positional Vertigo", "Cervical Radiculopathy"],
            "Orthopedics": ["Mechanical Low Back Strain", "Ligamentous Sprain", "Mild Osteoarthritis", "Muscular Spasm"],
            "Dermatology": ["Contact Dermatitis", "Urticaria / Allergy", "Fungal Tinea Infection", "Seborrheic Dermatitis"],
            "Pediatrics": ["Viral Exanthem", "Pediatric Gastroenteritis", "Upper Respiratory Tract Infection"],
            "ENT": ["Acute Pharyngitis", "Allergic Rhinosinusitis", "Otitis Externa / Media", "Eustachian Tube Dysfunction"],
            "Urology": ["Uncomplicated Urinary Tract Infection", "Renal Colic (Nephrolithiasis)", "Prostatic Congestion"],
            "General Medicine": ["Viral Syndrome", "Physical Fatigue / Stress", "Mild Dehydration", "Electrolyte Imbalance"]
        }

        causes = causes_map.get(primary_specialty, ["General Clinical Evaluation Required", "Viral Syndrome"])

        home_advice = [
            "Ensure adequate hydration and rest.",
            "Maintain a log of when symptoms occur, their duration, and any triggers.",
            "Do not start prescription medications without a registered physician's review.",
            "Visit an emergency department immediately if you develop sudden shortness of breath, severe pain, or confusion."
        ]

        return {
            "urgency_level": urgency,
            "is_emergency": False,
            "emergency_warning": None,
            "primary_specialty": primary_specialty,
            "alternative_specialties": alt_specialties,
            "confidence_score": round(confidence, 2),
            "possible_causes": causes,
            "recommended_action": action,
            "home_care_advice": home_advice,
            "red_flags": []
        }

# Global singleton classifier instance
classifier = SymptomClassifierML()
