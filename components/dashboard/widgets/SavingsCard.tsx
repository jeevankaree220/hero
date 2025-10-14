"use client";

import { Card } from "@/components/ui/card";

interface SavingsCardProps {
  amount: string;
}

export default function SavingsCard({ amount }: SavingsCardProps) {
  return (
    <Card className="p-6 bg-white border-[var(--mist)] hover:shadow-lg transition-shadow">
      <div className="text-center">
        <p className="text-sm text-[var(--charcoal)] mb-2">Saved This Month</p>
        <h2 className="text-4xl font-bold text-[var(--midnight)] mb-4">{amount}</h2>
        
        <div className="flex justify-center gap-6 text-sm">
          <div className="text-center">
            <p className="text-[var(--charcoal)]">July</p>
          </div>
          <div className="text-center">
            <p className="text-[var(--charcoal)]">Week</p>
          </div>
          <div className="text-center">
            <p className="font-medium text-[var(--midnight)]">Month</p>
          </div>
          <div className="text-center">
            <p className="text-[var(--charcoal)]">Year</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
