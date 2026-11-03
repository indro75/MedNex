import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/dashboard/Sidebar';
import { Header } from '../components/dashboard/Header';
import { MobileNav } from '../components/dashboard/MobileNav';
import { MedicalDisclaimer } from '../components/common/MedicalDisclaimer';

export const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-900">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        <Header />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          <Outlet />

          {/* Bottom Persistent Healthcare Safety Disclaimer */}
          <div className="pt-6">
            <MedicalDisclaimer />
          </div>
        </main>

        {/* Mobile Navigation Bar */}
        <MobileNav />
      </div>
    </div>
  );
};

