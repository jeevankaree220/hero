"use client";

import { Download, LogOut, Table2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TablerNavbarProps {
  onDownload: () => void;
  onLogout: () => void;
}

export default function TablerNavbar({ onDownload, onLogout }: TablerNavbarProps) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-lg">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--softorange)] to-[var(--sandyellow)]">
            <Table2 className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold text-[var(--midnight)] font-[family-name:var(--font-josefin-sans)]">
              Tabler
            </h1>
            <p className="text-xs text-gray-500">Enterprise Data Manager</p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Button
            onClick={onDownload}
            variant="outline"
            size="sm"
            className="gap-2 border-[var(--mist)] hover:bg-[var(--skymist)] transition-colors"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download</span>
          </Button>

          <Button
            onClick={onLogout}
            variant="outline"
            size="sm"
            className="gap-2 border-[var(--mist)] hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
