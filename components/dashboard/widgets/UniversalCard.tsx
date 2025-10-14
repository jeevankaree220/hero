"use client";

import { Card } from "@/components/ui/card";

export default function UniversalCard() {
  return (
    <Card className="p-6 bg-gradient-to-br from-[var(--softorange)] to-[var(--sandyellow)] text-white border-none">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Universal Card</h3>
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-white/60 rounded-full"></div>
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      </div>
      
      <div className="mb-6">
        <p className="text-2xl font-bold tracking-wider">5214 4371 5678 2345</p>
        <p className="text-sm opacity-90 mt-2">Mehran Gerami</p>
      </div>
      
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs opacity-75">Valid Thru</p>
          <p className="text-sm font-medium">12/24</p>
        </div>
        <div className="text-right">
          <p className="text-xs opacity-75">CVV</p>
          <p className="text-sm font-medium">***</p>
        </div>
      </div>
    </Card>
  );
}
