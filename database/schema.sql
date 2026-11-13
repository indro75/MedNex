-- MedNex database schema (SQLite DDL)
-- Generated from backend/app/models.py by database/generate_schema.py.
-- Do not edit by hand; regenerate after changing the models.


CREATE TABLE ambulances (
	id VARCHAR(50) NOT NULL, 
	name VARCHAR(150) NOT NULL, 
	type VARCHAR(50) NOT NULL, 
	base_location VARCHAR(150) NOT NULL, 
	coverage_area VARCHAR(150) NOT NULL, 
	phone VARCHAR(30) NOT NULL, 
	alternate_phone VARCHAR(30), 
	available_24_7 BOOLEAN, 
	has_oxygen BOOLEAN, 
	has_ventilator BOOLEAN, 
	estimated_response_time VARCHAR(50) NOT NULL, 
	PRIMARY KEY (id)
);

CREATE INDEX ix_ambulances_id ON ambulances (id);

CREATE TABLE doctors (
	id VARCHAR(50) NOT NULL, 
	name VARCHAR(100) NOT NULL, 
	degrees VARCHAR(200) NOT NULL, 
	specialty VARCHAR(100) NOT NULL, 
	designation VARCHAR(200) NOT NULL, 
	hospital VARCHAR(200) NOT NULL, 
	bmdc_reg_no VARCHAR(50) NOT NULL, 
	experience_years INTEGER NOT NULL, 
	chamber_address TEXT NOT NULL, 
	area VARCHAR(100) NOT NULL, 
	consultation_fee INTEGER NOT NULL, 
	visiting_hours VARCHAR(100) NOT NULL, 
	visiting_days VARCHAR(100) NOT NULL, 
	phone VARCHAR(30) NOT NULL, 
	serial_phone VARCHAR(30) NOT NULL, 
	latitude FLOAT NOT NULL, 
	longitude FLOAT NOT NULL, 
	rating FLOAT, 
	verified BOOLEAN, 
	PRIMARY KEY (id), 
	UNIQUE (bmdc_reg_no)
);

CREATE INDEX ix_doctors_area ON doctors (area);
CREATE INDEX ix_doctors_specialty ON doctors (specialty);
CREATE INDEX ix_doctors_id ON doctors (id);

CREATE TABLE drug_interactions (
	id INTEGER NOT NULL, 
	drug1 VARCHAR(100) NOT NULL, 
	drug2 VARCHAR(100) NOT NULL, 
	severity VARCHAR(20) NOT NULL, 
	effect TEXT NOT NULL, 
	recommendation TEXT NOT NULL, 
	PRIMARY KEY (id)
);

CREATE INDEX ix_drug_interactions_drug1 ON drug_interactions (drug1);
CREATE INDEX ix_drug_interactions_drug2 ON drug_interactions (drug2);

CREATE TABLE hospitals (
	id VARCHAR(50) NOT NULL, 
	name VARCHAR(150) NOT NULL, 
	type VARCHAR(50) NOT NULL, 
	address TEXT NOT NULL, 
	area VARCHAR(100) NOT NULL, 
	emergency_number VARCHAR(30) NOT NULL, 
	reception_number VARCHAR(30) NOT NULL, 
	has_icu BOOLEAN, 
	has_emergency_ward BOOLEAN, 
	ambulance_available BOOLEAN, 
	total_beds INTEGER, 
	latitude FLOAT NOT NULL, 
	longitude FLOAT NOT NULL, 
	PRIMARY KEY (id)
);

CREATE INDEX ix_hospitals_id ON hospitals (id);
CREATE INDEX ix_hospitals_area ON hospitals (area);

CREATE TABLE medicines (
	id VARCHAR(50) NOT NULL, 
	brand_name VARCHAR(100) NOT NULL, 
	generic_name VARCHAR(100) NOT NULL, 
	therapeutic_class VARCHAR(150) NOT NULL, 
	manufacturer VARCHAR(100) NOT NULL, 
	dosage_form VARCHAR(50) NOT NULL, 
	strength VARCHAR(50) NOT NULL, 
	price_bdt FLOAT NOT NULL, 
	indications JSON, 
	side_effects JSON, 
	precautions JSON, 
	pregnancy_category VARCHAR(10), 
	food_relation VARCHAR(100), 
	PRIMARY KEY (id)
);

CREATE INDEX ix_medicines_brand_name ON medicines (brand_name);
CREATE INDEX ix_medicines_generic_name ON medicines (generic_name);
CREATE INDEX ix_medicines_id ON medicines (id);

CREATE TABLE users (
	id VARCHAR(36) NOT NULL, 
	name VARCHAR(100) NOT NULL, 
	email VARCHAR(100) NOT NULL, 
	password_hash VARCHAR(255) NOT NULL, 
	phone VARCHAR(20), 
	age INTEGER, 
	gender VARCHAR(20), 
	blood_group VARCHAR(10), 
	city VARCHAR(100), 
	emergency_contact VARCHAR(20), 
	allergies JSON, 
	chronic_conditions JSON, 
	created_at DATETIME, 
	PRIMARY KEY (id)
);

CREATE UNIQUE INDEX ix_users_email ON users (email);
CREATE INDEX ix_users_id ON users (id);

CREATE TABLE appointments (
	id VARCHAR(50) NOT NULL, 
	user_id VARCHAR(36) NOT NULL, 
	doctor_id VARCHAR(50) NOT NULL, 
	doctor_name VARCHAR(100) NOT NULL, 
	specialty VARCHAR(100) NOT NULL, 
	hospital_or_chamber VARCHAR(200) NOT NULL, 
	appointment_date VARCHAR(30) NOT NULL, 
	serial_number INTEGER NOT NULL, 
	estimated_time VARCHAR(50) NOT NULL, 
	patient_name VARCHAR(100) NOT NULL, 
	patient_phone VARCHAR(30) NOT NULL, 
	patient_age INTEGER NOT NULL, 
	symptom_summary TEXT, 
	status VARCHAR(30), 
	created_at DATETIME, 
	PRIMARY KEY (id), 
	FOREIGN KEY(user_id) REFERENCES users (id), 
	FOREIGN KEY(doctor_id) REFERENCES doctors (id)
);

CREATE INDEX ix_appointments_id ON appointments (id);

CREATE TABLE bmi_logs (
	id INTEGER NOT NULL, 
	user_id VARCHAR(36) NOT NULL, 
	date VARCHAR(30) NOT NULL, 
	weight_kg FLOAT NOT NULL, 
	height_cm FLOAT NOT NULL, 
	bmi FLOAT NOT NULL, 
	category VARCHAR(50) NOT NULL, 
	notes VARCHAR(200), 
	created_at DATETIME, 
	PRIMARY KEY (id), 
	FOREIGN KEY(user_id) REFERENCES users (id)
);


CREATE TABLE health_activities (
	id VARCHAR(50) NOT NULL, 
	user_id VARCHAR(36) NOT NULL, 
	type VARCHAR(50) NOT NULL, 
	title VARCHAR(150) NOT NULL, 
	timestamp VARCHAR(50) NOT NULL, 
	summary TEXT NOT NULL, 
	tag VARCHAR(50) NOT NULL, 
	severity VARCHAR(20) NOT NULL, 
	created_at DATETIME, 
	PRIMARY KEY (id), 
	FOREIGN KEY(user_id) REFERENCES users (id)
);

CREATE INDEX ix_health_activities_id ON health_activities (id);
