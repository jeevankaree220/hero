"use client";

import { Card } from "@/components/ui/card";

export default function CompletionStatus() {
  return (
    <Card className="p-6 bg-gradient-to-br from-[var(--midnight)] to-[var(--charcoal)] text-white border-none flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-4">
          {/* Background circle */}
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 128 128">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="var(--softorange)"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 56}`}
              strokeDashoffset="0"
              strokeLinecap="round"
            />
          </svg>
          
          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--softorange)]">100%</div>
            </div>
          </div>
        </div>
        
        <div>
          <p className="text-sm opacity-75 mb-1">Plan for 2021</p>
          <p className="text-lg font-semibold">Completed</p>
        </div>
      </div>
    </Card>
  );
}
