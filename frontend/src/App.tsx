import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { HealthProvider } from './context/HealthContext';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { DashboardLayout } from './layouts/DashboardLayout';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';

// Dashboard Pages
import { DashboardOverview } from './pages/dashboard/DashboardOverview';
import { SymptomCheckerPage } from './pages/dashboard/SymptomCheckerPage';
import { FindDoctorsPage } from './pages/dashboard/FindDoctorsPage';
import { FirstAidPage } from './pages/dashboard/FirstAidPage';
import { ReportAnalyzerPage } from './pages/dashboard/ReportAnalyzerPage';
import { EmergencyAmbulancePage } from './pages/dashboard/EmergencyAmbulancePage';
import { FitnessTrackerPage } from './pages/dashboard/FitnessTrackerPage';
import { MedicineCheckerPage } from './pages/dashboard/MedicineCheckerPage';
import { HealthHistoryPage } from './pages/dashboard/HealthHistoryPage';
import { SettingsPage } from './pages/dashboard/SettingsPage';

export function App() {
  return (
    <AuthProvider>
      <HealthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Layout Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Route>

            {/* Dashboard Protected Layout Routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardOverview />} />
              <Route path="symptom-checker" element={<SymptomCheckerPage />} />
              <Route path="find-doctors" element={<FindDoctorsPage />} />
              <Route path="first-aid" element={<FirstAidPage />} />
              <Route path="report-analyzer" element={<ReportAnalyzerPage />} />
              <Route path="emergency" element={<EmergencyAmbulancePage />} />
              <Route path="fitness-tracker" element={<FitnessTrackerPage />} />
              <Route path="medicine-checker" element={<MedicineCheckerPage />} />
              <Route path="health-history" element={<HealthHistoryPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </HealthProvider>
    </AuthProvider>
  );
}

export default App;
