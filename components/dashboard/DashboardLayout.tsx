"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import StorageOverview from "./widgets/StorageOverview";
import StorageDonutChart from "./widgets/StorageDonutChart";
import RecentFilesTable from "./widgets/RecentFilesTable";
import WeeklyAnalyticsChart from "./widgets/WeeklyAnalyticsChart";
import FileTypesCard from "./widgets/FileTypesCard";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--skymist)]">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main Content */}
      <div className="
        lg:ml-64 
        xl:ml-[240px] 
        2xl:ml-[256px] 
        3xl:ml-[280px] 
        4xl:ml-[320px] 
        transition-all duration-300
      ">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
            {/* Dashboard Content */}
            <main className="
              p-3 sm:p-4 md:p-5 lg:p-6 
              xl:p-5 2xl:p-6 3xl:p-8 4xl:p-10
              space-y-4 sm:space-y-5 md:space-y-6 
              xl:space-y-5 2xl:space-y-6 3xl:space-y-8 4xl:space-y-10
              animate-fade-in
              dashboard-mobile-xl dashboard-mobile-pro dashboard-mobile-standard dashboard-mobile-mini
              dashboard-laptop-13 dashboard-laptop-14 dashboard-laptop-19 dashboard-laptop-21
            ">
              {/* My Files Section */}
              <div>
                {/* <h2 className="text-xl sm:text-2xl font-bold text-[var(--midnight)] mb-4">My Files</h2> */}
                <StorageOverview />
              </div>

              {/* Main Content Grid - Responsive Layout */}
              <div className="space-y-4 sm:space-y-5 md:space-y-6 xl:space-y-5 2xl:space-y-6 3xl:space-y-8 4xl:space-y-10">
                {/* Second Row - Recent Orders and Storage Details */}
                <div className="
                  grid grid-cols-1 md:grid-cols-2
                  lg:grid-cols-2 xl:grid-cols-2 
                  2xl:grid-cols-2 3xl:grid-cols-2 4xl:grid-cols-2
                  gap-4 sm:gap-5 md:gap-6 
                  xl:gap-5 2xl:gap-6 3xl:gap-8 4xl:gap-10
                ">
                  <RecentFilesTable />
                  <StorageDonutChart />
                </div>
                
                {/* Third Row - File Types and Analytics */}
                <div className="
                  grid grid-cols-1 
                  lg:grid-cols-2 xl:grid-cols-2 
                  2xl:grid-cols-2 3xl:grid-cols-2 4xl:grid-cols-2
                  gap-4 sm:gap-5 md:gap-6 
                  xl:gap-5 2xl:gap-6 3xl:gap-8 4xl:gap-10
                ">
                  <FileTypesCard />
                  <WeeklyAnalyticsChart />
                </div>
              </div>
            </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
