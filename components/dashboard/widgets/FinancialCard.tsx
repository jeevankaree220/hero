"use client";

import { CreditCard, PiggyBank, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FinancialCardProps {
  title: string;
  amount: string;
  icon: "credit-card" | "piggy-bank" | "trending-up";
  color: "blue" | "purple" | "green";
}

const iconMap = {
  "credit-card": CreditCard,
  "piggy-bank": PiggyBank,
  "trending-up": TrendingUp,
};

const colorMap = {
  blue: "bg-blue-500",
  purple: "bg-purple-500", 
  green: "bg-green-500",
};

export default function FinancialCard({ title, amount, icon, color }: FinancialCardProps) {
  const Icon = iconMap[icon];
  
  return (
    <Card className="p-6 bg-white border-[var(--mist)] hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={cn("p-3 rounded-xl", colorMap[color])}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      
      <div>
        <p className="text-sm text-[var(--charcoal)] mb-1">{title}</p>
        <p className="text-2xl font-bold text-[var(--midnight)]">{amount}</p>
      </div>
    </Card>
  );
}
