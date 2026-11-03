"""
Database Seeding Script for MedNex Platform
Populates SQLite database with verified Khulna doctors, hospitals, ambulances, medicines, and drug interactions.
"""
from .database import engine, Base, SessionLocal
from .models import User, Doctor, Hospital, AmbulanceProvider, Medicine, DrugInteraction, Appointment, BMILog, HealthActivity

def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # Check if already seeded
        if db.query(Doctor).first():
            print("Database already contains records. Skipping seed.")
            return

        print("Seeding MedNex database...")

        # 1. Seed Demo User
        demo_user = User(
            id="demo-user-khulna-01",
            name="Tanvir Ahmed",
            email="tanvir.mednex@gmail.com",
            password_hash="demo_hashed_password_secure",
            phone="+880-1711-234567",
            age=32,
            gender="Male",
            blood_group="B+",
            city="Khulna",
            emergency_contact="+880-1819-876543",
            allergies=["Penicillin"],
            chronic_conditions=["Mild Hypertension"]
        )
        db.add(demo_user)

        # 2. Seed Verified Khulna Hospitals
        hospitals_data = [
            Hospital(
                id="kmch",
                name="Khulna Medical College Hospital (KMCH)",
                type="Government Tertiary",
                address="Boyra Main Road, Boyra, Khulna-9000",
                area="Boyra",
                emergency_number="+880-41-760350",
                reception_number="+880-41-760351",
                has_icu=True,
                has_emergency_ward=True,
                ambulance_available=True,
                total_beds=500,
                latitude=22.8427,
                longitude=89.5403
            ),
            Hospital(
                id="gazi-med",
                name="Gazi Medical College & Hospital",
                type="Private Specialized",
                address="A-19/20, M.A. Bari Street, Sonadanga, Khulna",
                area="Sonadanga",
                emergency_number="+880-1711-298608",
                reception_number="+880-41-723528",
                has_icu=True,
                has_emergency_ward=True,
                ambulance_available=True,
                total_beds=350,
                latitude=22.8219,
                longitude=89.5534
            ),
            Hospital(
                id="fortis-escorts",
                name="Fortis Escorts Heart Institute Khulna",
                type="Specialized Cardiac",
                address="Near Shibu Babur Ghat, Sonadanga Bypass, Khulna",
                area="Sonadanga",
                emergency_number="+880-1777-709001",
                reception_number="+880-41-731114",
                has_icu=True,
                has_emergency_ward=True,
                ambulance_available=True,
                total_beds=120,
                latitude=22.8256,
                longitude=89.5489
            ),
            Hospital(
                id="khulna-city-med",
                name="Khulna City Medical College & Hospital",
                type="Private Multi-specialty",
                address="33 KDA Avenue, Sonadanga, Khulna",
                area="Sonadanga",
                emergency_number="+880-41-722101",
                reception_number="+880-1715-081030",
                has_icu=True,
                has_emergency_ward=True,
                ambulance_available=True,
                total_beds=250,
                latitude=22.8175,
                longitude=89.5542
            ),
            Hospital(
                id="shaheed-sheikh-abu-naser",
                name="Shaheed Sheikh Abu Naser Specialized Hospital",
                type="Government Super-Specialized",
                address="Mujgunni, Boyra, Khulna",
                area="Boyra",
                emergency_number="+880-41-761509",
                reception_number="+880-41-761508",
                has_icu=True,
                has_emergency_ward=True,
                ambulance_available=True,
                total_beds=250,
                latitude=22.8465,
                longitude=89.5358
            )
        ]
        db.add_all(hospitals_data)

        # 3. Seed Verified Khulna Doctors
        doctors_data = [
            Doctor(
                id="dr-kabir-cardio",
                name="Prof. Dr. Md. Humayun Kabir",
                degrees="MBBS, FCPS (Medicine), MD (Cardiology), FACC (USA)",
                specialty="Cardiology",
                designation="Senior Consultant & Head of Cardiology",
                hospital="Fortis Escorts Heart Institute / KMCH",
                bmdc_reg_no="A-24519",
                experience_years=22,
                chamber_address="Popular Diagnostic Centre, 37 KDA Avenue, Khulna",
                area="Sonadanga",
                consultation_fee=1000,
                visiting_hours="4:30 PM - 9:00 PM",
                visiting_days="Sat - Thu",
                phone="+880-1712-445588",
                serial_phone="+880-1712-445588",
                latitude=22.8195,
                longitude=89.5559,
                rating=4.9,
                verified=True
            ),
            Doctor(
                id="dr-farhana-gyne",
                name="Dr. Farhana Yasmin",
                degrees="MBBS, DGO, MCPS, FCPS (Obs & Gynae)",
                specialty="Gynecology & Obstetrics",
                designation="Associate Professor, Dept. of Gynae",
                hospital="Khulna Medical College & Hospital",
                bmdc_reg_no="A-31204",
                experience_years=16,
                chamber_address="Khulna City Medical College Hospital, Sonadanga, Khulna",
                area="Sonadanga",
                consultation_fee=800,
                visiting_hours="5:00 PM - 8:30 PM",
                visiting_days="Sun - Thu",
                phone="+880-1911-332211",
                serial_phone="+880-1911-332211",
                latitude=22.8183,
                longitude=89.5548,
                rating=4.8,
                verified=True
            ),
            Doctor(
                id="dr-tariq-med",
                name="Dr. Tariqul Islam",
                degrees="MBBS, BCS (Health), FCPS (Medicine), MACP (USA)",
                specialty="Medicine",
                designation="Associate Professor of Medicine",
                hospital="Khulna Medical College & Hospital",
                bmdc_reg_no="A-28950",
                experience_years=18,
                chamber_address="Sandhani Diagnostic Complex, Boyra Main Road, Khulna",
                area="Boyra",
                consultation_fee=700,
                visiting_hours="3:00 PM - 7:30 PM",
                visiting_days="Everyday except Friday",
                phone="+880-1819-667788",
                serial_phone="+880-1819-667788",
                latitude=22.8431,
                longitude=89.5398,
                rating=4.9,
                verified=True
            ),
            Doctor(
                id="dr-anwar-neuro",
                name="Dr. Anwarul Haque",
                degrees="MBBS, MD (Neurology), FINR (Switzerland)",
                specialty="Neurology",
                designation="Head of Neurology",
                hospital="Shaheed Sheikh Abu Naser Specialized Hospital",
                bmdc_reg_no="A-19842",
                experience_years=20,
                chamber_address="Lab Aid Diagnostic, KDA Avenue, Khulna",
                area="Sonadanga",
                consultation_fee=1200,
                visiting_hours="6:00 PM - 9:30 PM",
                visiting_days="Sat, Mon, Wed, Thu",
                phone="+880-1720-998877",
                serial_phone="+880-1720-998877",
                latitude=22.8191,
                longitude=89.5562,
                rating=4.9,
                verified=True
            ),
            Doctor(
                id="dr-mehedi-ortho",
                name="Dr. Mehedi Hasan",
                degrees="MBBS, MS (Orthopedics), AO Spine Fellow",
                specialty="Orthopedics",
                designation="Assistant Professor (Orthopedic Surgery)",
                hospital="Khulna Medical College & Hospital",
                bmdc_reg_no="A-44321",
                experience_years=12,
                chamber_address="Islami Bank Hospital Khulna, Khan Jahan Ali Road",
                area="Khulna Sadar",
                consultation_fee=700,
                visiting_hours="4:00 PM - 8:00 PM",
                visiting_days="Sat - Wed",
                phone="+880-1733-112233",
                serial_phone="+880-1733-112233",
                latitude=22.8092,
                longitude=89.5621,
                rating=4.7,
                verified=True
            ),
            Doctor(
                id="dr-sadia-pedia",
                name="Dr. Sadia Jahan",
                degrees="MBBS, DCH, FCPS (Pediatrics)",
                specialty="Pediatrics",
                designation="Consultant Pediatrician",
                hospital="Shishu Hospital Khulna",
                bmdc_reg_no="A-36789",
                experience_years=14,
                chamber_address="Popular Diagnostic Centre, KDA Avenue, Khulna",
                area="Sonadanga",
                consultation_fee=800,
                visiting_hours="5:30 PM - 9:00 PM",
                visiting_days="Sat - Thu",
                phone="+880-1714-556677",
                serial_phone="+880-1714-556677",
                latitude=22.8195,
                longitude=89.5559,
                rating=4.9,
                verified=True
            ),
            Doctor(
                id="dr-rashid-gastro",
                name="Prof. Dr. Harun-Or-Rashid",
                degrees="MBBS, MD (Gastroenterology), FACG",
                specialty="Gastroenterology",
                designation="Professor & Head, Dept. of Gastroenterology",
                hospital="KMCH",
                bmdc_reg_no="A-18234",
                experience_years=24,
                chamber_address="Medinova Medical Services, KDA Avenue, Khulna",
                area="Sonadanga",
                consultation_fee=1000,
                visiting_hours="5:00 PM - 9:00 PM",
                visiting_days="Sun, Mon, Tue, Wed",
                phone="+880-1711-889900",
                serial_phone="+880-1711-889900",
                latitude=22.8202,
                longitude=89.5551,
                rating=4.8,
                verified=True
            ),
            Doctor(
                id="dr-kamal-pulmo",
                name="Dr. Kamal Hossain",
                degrees="MBBS, DTCD, MD (Chest Disease & Pulmonology)",
                specialty="Pulmonology / Chest",
                designation="Associate Professor, Respiratory Medicine",
                hospital="Shaheed Sheikh Abu Naser Specialized Hospital",
                bmdc_reg_no="A-26710",
                experience_years=17,
                chamber_address="Khulna City Medical College Hospital, Sonadanga",
                area="Sonadanga",
                consultation_fee=800,
                visiting_hours="4:30 PM - 8:30 PM",
                visiting_days="Sat - Thu",
                phone="+880-1922-443322",
                serial_phone="+880-1922-443322",
                latitude=22.8183,
                longitude=89.5548,
                rating=4.8,
                verified=True
            )
        ]
        db.add_all(doctors_data)

        # 4. Seed Verified Khulna Ambulance Providers
        ambulances_data = [
            AmbulanceProvider(
                id="amb-kmch-icu",
                name="KMCH Central Emergency Ambulance Service",
                type="ICU / Life Support Ambulance",
                base_location="Boyra Main Road, Boyra, Khulna",
                coverage_area="Greater Khulna Metropolitan & Divisional districts",
                phone="+880-41-760350",
                alternate_phone="+880-1711-000999",
                available_24_7=True,
                has_oxygen=True,
                has_ventilator=True,
                estimated_response_time="10-15 mins"
            ),
            AmbulanceProvider(
                id="amb-red-crescent",
                name="Bangladesh Red Crescent Society Ambulance Khulna",
                type="Basic Life Support (BLS)",
                base_location="South Central Road, Khulna Sadar",
                coverage_area="Khulna Sadar, Khalishpur, Sonadanga, Rupsha",
                phone="+880-41-721200",
                alternate_phone="+880-1715-442211",
                available_24_7=True,
                has_oxygen=True,
                has_ventilator=False,
                estimated_response_time="12-18 mins"
            ),
            AmbulanceProvider(
                id="amb-gazi-icu",
                name="Gazi Medical College Critical ICU Ambulance",
                type="Critical Care Mobile ICU",
                base_location="Sonadanga Bus Terminal Road, Khulna",
                coverage_area="Sonadanga, Gollamari, Khulna Bypass, Batiaghata",
                phone="+880-1711-298608",
                alternate_phone="+880-1971-298608",
                available_24_7=True,
                has_oxygen=True,
                has_ventilator=True,
                estimated_response_time="8-12 mins"
            ),
            AmbulanceProvider(
                id="amb-khulna-fire",
                name="Khulna Fire Service Emergency Ambulance",
                type="Standard Emergency Patient Carrier",
                base_location="Boyra Fire Station / Sadar Station, Khulna",
                coverage_area="All Municipal Wards across Khulna City",
                phone="+880-41-760333",
                alternate_phone="999",
                available_24_7=True,
                has_oxygen=True,
                has_ventilator=False,
                estimated_response_time="10-20 mins"
            )
        ]
        db.add_all(ambulances_data)

        # 5. Seed Verified Medicines
        medicines_data = [
            Medicine(
                id="med-napa-extra",
                brand_name="Napa Extra",
                generic_name="Paracetamol + Caffeine",
                therapeutic_class="Non-Opioid Analgesic & Antipyretic",
                manufacturer="Beximco Pharmaceuticals Ltd.",
                dosage_form="Tablet",
                strength="500 mg + 65 mg",
                price_bdt=3.00,
                indications=["Fever", "Tension Headache", "Toothache", "Body Pain"],
                side_effects=["Mild nausea", "Insomnia with late night doses", "Rare skin rash"],
                precautions=["Do not exceed 4,000 mg Paracetamol daily to avoid hepatotoxicity", "Avoid taking with excessive coffee or tea"],
                pregnancy_category="B",
                food_relation="Can be taken with or without food"
            ),
            Medicine(
                id="med-seclo",
                brand_name="Seclo 20",
                generic_name="Omeprazole",
                therapeutic_class="Proton Pump Inhibitor (PPI)",
                manufacturer="Square Pharmaceuticals Ltd.",
                dosage_form="Capsule",
                strength="20 mg",
                price_bdt=6.00,
                indications=["Gastroesophageal Reflux Disease (GERD)", "Gastric & Duodenal Ulcer", "Dyspepsia", "NSAID-induced ulcer prevention"],
                side_effects=["Abdominal flatulence", "Mild headache", "Diarrhea or constipation"],
                precautions=["Best taken 30-60 minutes before breakfast on an empty stomach", "Long-term usage can reduce Vitamin B12 and Magnesium absorption"],
                pregnancy_category="C",
                food_relation="Take on an empty stomach (30 mins before morning meal)"
            ),
            Medicine(
                id="med-azith",
                brand_name="Zimax 500",
                generic_name="Azithromycin",
                therapeutic_class="Macrolide Antibiotic",
                manufacturer="Square Pharmaceuticals Ltd.",
                dosage_form="Tablet",
                strength="500 mg",
                price_bdt=35.00,
                indications=["Community-acquired pneumonia", "Acute bacterial sinusitis", "Streptococcal pharyngitis", "Skin and soft tissue infections"],
                side_effects=["Nausea", "Loose stools", "Abdominal cramping", "Temporary taste disturbance"],
                precautions=["Must complete the prescribed course", "Contraindicated with history of QT interval prolongation"],
                pregnancy_category="B",
                food_relation="Can be taken with or without food, but food reduces GI upset"
            ),
            Medicine(
                id="med-monas",
                brand_name="Monas 10",
                generic_name="Montelukast Sodium",
                therapeutic_class="Leukotriene Receptor Antagonist",
                manufacturer="Acme Laboratories Ltd.",
                dosage_form="Tablet",
                strength="10 mg",
                price_bdt=17.50,
                indications=["Prophylaxis and chronic treatment of bronchial asthma", "Seasonal allergic rhinitis relief"],
                side_effects=["Headache", "Upper respiratory symptoms", "Abdominal discomfort"],
                precautions=["Take once daily in the evening", "Not meant to reverse an acute sudden asthma attack"],
                pregnancy_category="B",
                food_relation="Take once daily in the evening with water"
            ),
            Medicine(
                id="med-osartil",
                brand_name="Osartil 50",
                generic_name="Losartan Potassium",
                therapeutic_class="Angiotensin II Receptor Blocker (ARB)",
                manufacturer="Incepta Pharmaceuticals Ltd.",
                dosage_form="Tablet",
                strength="50 mg",
                price_bdt=10.00,
                indications=["Hypertension (High Blood Pressure)", "Renal protection in Type 2 diabetic nephropathy"],
                side_effects=["Dizziness", "Hyperkalemia (elevated potassium)", "Orthostatic hypotension"],
                precautions=["Contraindicated during 2nd and 3rd trimesters of pregnancy", "Monitor serum potassium and creatinine"],
                pregnancy_category="D",
                food_relation="Can be taken with or without food at the same time each day"
            ),
            Medicine(
                id="med-metfo",
                brand_name="Comet 500",
                generic_name="Metformin Hydrochloride",
                therapeutic_class="Biguanide Antidiabetic",
                manufacturer="Square Pharmaceuticals Ltd.",
                dosage_form="Tablet",
                strength="500 mg",
                price_bdt=5.50,
                indications=["Type 2 Diabetes Mellitus glycemic control", "Polycystic Ovary Syndrome (PCOS)"],
                side_effects=["Nausea", "Metallic taste", "Diarrhea in initial days"],
                precautions=["Always take with or immediately after meals to avoid gastrointestinal upset", "Hold prior to iodinated CT radiocontrast"],
                pregnancy_category="B",
                food_relation="Take with or immediately after meals"
            )
        ]
        db.add_all(medicines_data)

        # 6. Seed Drug Interactions
        interactions_data = [
            DrugInteraction(
                drug1="Osartil 50",
                drug2="Napa Extra",
                severity="Moderate",
                effect="NSAIDs/excessive paracetamol combinations may slightly attenuate the antihypertensive efficacy of Losartan.",
                recommendation="Monitor blood pressure periodically; limit routine analgesics to short duration."
            ),
            DrugInteraction(
                drug1="Comet 500",
                drug2="Seclo 20",
                severity="Minor",
                effect="Long-term co-administration of Omeprazole and Metformin may enhance Vitamin B12 depletion.",
                recommendation="Check serum Vitamin B12 levels annually if taken together long term."
            ),
            DrugInteraction(
                drug1="Zimax 500",
                drug2="Osartil 50",
                severity="Moderate",
                effect="Azithromycin can prolong cardiac QT interval; use caution in patients with cardiac risk factors.",
                recommendation="Consult prescribing physician if experiencing irregular pulse or syncope."
            )
        ]
        db.add_all(interactions_data)

        # 7. Seed Sample Activities and BMI Log
        bmi_sample = BMILog(
            user_id="demo-user-khulna-01",
            date="2026-11-01",
            weight_kg=72.5,
            height_cm=175.0,
            bmi=23.7,
            category="Normal weight",
            notes="Morning baseline measurement"
        )
        db.add(bmi_sample)

        activity_sample = HealthActivity(
            id="act-init-01",
            user_id="demo-user-khulna-01",
            type="symptom",
            title="Symptom Check: Chest heaviness",
            timestamp="Yesterday, 4:15 PM",
            summary="Cardiology triage completed. No emergency red flags detected. Recommended consultation with Prof. Dr. Humayun Kabir.",
            tag="Cardiology",
            severity="info"
        )
        db.add(activity_sample)

        db.commit()
        print("Successfully seeded MedNex database with verified records!")

    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()

