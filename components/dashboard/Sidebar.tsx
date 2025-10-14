"use client";

import { 
  LayoutDashboard, 
  User, 
  ListChecks, 
  Settings, 
  FileText, 
  Store, 
  Bell,
  ArrowRight,
  LogOut,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Store, label: "Transaction", active: false },
  { icon: ListChecks, label: "Task", active: false },
  { icon: FileText, label: "Documents", active: false },
  { icon: Store, label: "Store", active: false },
  { icon: Bell, label: "Notification", active: false },
  { icon: User, label: "Profile", active: false },
  { icon: Settings, label: "Settings", active: false },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 xl:w-[240px] 2xl:w-[256px] 3xl:w-[280px] 4xl:w-[320px] lg:flex-col sidebar-laptop-13 sidebar-laptop-14 sidebar-laptop-19 sidebar-laptop-21">
        <div className="flex flex-col flex-grow bg-white border-r border-[var(--mist)] pt-4 sm:pt-5 pb-4 overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 px-4 sm:px-5 md:px-6 mb-6 sm:mb-7 md:mb-8">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="
                w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 
                xl:w-8 xl:h-8 2xl:w-9 2xl:h-9 3xl:w-10 3xl:h-10 4xl:w-12 4xl:h-12
                bg-gradient-to-br from-[#0EA5E9] to-[#3B82F6] rounded-lg flex items-center justify-center shadow-md
              ">
                <svg viewBox="0 0 24 24" fill="none" className="
                  w-5 h-5 sm:w-6 sm:h-6 
                  xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 3xl:w-7 3xl:h-7 4xl:w-8 4xl:h-8
                ">
                  <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 22V12H15V22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="
                text-lg sm:text-xl 
                xl:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl
                font-bold text-[var(--midnight)]
              ">
                Shop
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 sm:px-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className={cn(
                    "w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 text-sm font-medium rounded-lg transition-all duration-200",
                    item.active
                      ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-md"
                      : "text-[var(--charcoal)] hover:bg-[var(--skymist)] hover:text-[var(--midnight)]"
                  )}
                >
                  <Icon className="
                    w-4 h-4 sm:w-5 sm:h-5 
                    xl:w-4 xl:h-4 2xl:w-5 2xl:h-5 3xl:w-6 3xl:h-6 4xl:w-7 4xl:h-7
                  " />
                  <span className="
                    text-sm 
                    xl:text-sm 2xl:text-base 3xl:text-lg 4xl:text-xl
                  ">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Upgrade CTA Card */}
          <div className="px-4 pb-4">
            <Card className="p-3 bg-gradient-to-br from-[var(--skymist)] to-white border-[var(--mist)]">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 mb-2">
                  <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 10C50 10 20 30 20 60C20 80 33.4 96 50 96C66.6 96 80 80 80 60C80 30 50 10 50 10Z" fill="#F4A261" opacity="0.3"/>
                    <circle cx="35" cy="50" r="8" fill="#F4A261"/>
                    <circle cx="50" cy="45" r="6" fill="#F6C177"/>
                    <circle cx="65" cy="52" r="7" fill="#F4A261"/>
                    <rect x="20" y="96" width="60" height="8" rx="4" fill="#2D2F36"/>
                    <path d="M40 70L45 85L50 75L55 85L60 70" stroke="#1A2B4C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-[var(--midnight)] mb-1 text-xs">
                  Upgrade to Pro
                </h4>
                <button className="mt-2 w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white py-2 px-3 rounded-lg text-xs font-medium transition-all duration-200 flex items-center justify-center gap-1 group">
                  Upgrade Now
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </Card>

            {/* Logout Button */}
            {/* <button className="w-full flex items-center gap-3 px-4 py-2 mt-2 text-xs font-medium text-[var(--charcoal)] hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200">
              <LogOut className="w-4 h-4" />
              Log Out
            </button> */}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out lg:hidden",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header with close button */}
          <div className="flex items-center justify-between p-4 border-b border-[var(--mist)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#0EA5E9] to-[#3B82F6] rounded-lg flex items-center justify-center shadow-md">
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                  <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 22V12H15V22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-[var(--midnight)]">Shop</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-[var(--skymist)] transition-colors"
            >
              <X className="w-5 h-5 text-[var(--charcoal)]" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                    item.active
                      ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-md"
                      : "text-[var(--charcoal)] hover:bg-[var(--skymist)] hover:text-[var(--midnight)]"
                  )}
                  onClick={onClose}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Upgrade CTA Card */}
          <div className="px-4 pb-4">
            <Card className="p-3 bg-gradient-to-br from-[var(--skymist)] to-white border-[var(--mist)]">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 mb-2">
                  <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 10C50 10 20 30 20 60C20 80 33.4 96 50 96C66.6 96 80 80 80 60C80 30 50 10 50 10Z" fill="#F4A261" opacity="0.3"/>
                    <circle cx="35" cy="50" r="8" fill="#F4A261"/>
                    <circle cx="50" cy="45" r="6" fill="#F6C177"/>
                    <circle cx="65" cy="52" r="7" fill="#F4A261"/>
                    <rect x="20" y="96" width="60" height="8" rx="4" fill="#2D2F36"/>
                    <path d="M40 70L45 85L50 75L55 85L60 70" stroke="#1A2B4C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-[var(--midnight)] mb-1 text-xs">
                  Upgrade to Pro
                </h4>
                <button className="mt-2 w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white py-2 px-3 rounded-lg text-xs font-medium transition-all duration-200 flex items-center justify-center gap-1 group">
                  Upgrade Now
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </Card>

            {/* Logout Button */}
            <button className="w-full flex items-center gap-3 px-4 py-2 mt-2 text-xs font-medium text-[var(--charcoal)] hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200">
              <LogOut className="w-4 h-4" />
              Log Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
