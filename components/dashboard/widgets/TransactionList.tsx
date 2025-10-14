"use client";

import { ShoppingBag, Film } from "lucide-react";
import { Card } from "@/components/ui/card";

const transactions = [
  {
    id: 1,
    type: "Shopping",
    description: "Today, 9:20",
    amount: "-$29",
    icon: ShoppingBag,
    color: "bg-blue-500",
  },
  {
    id: 2,
    type: "Movie",
    description: "Today, 7:15",
    amount: "-$15",
    icon: Film,
    color: "bg-purple-500",
  },
];

export default function TransactionList() {
  return (
    <Card className="p-6 bg-white border-[var(--mist)] hover:shadow-lg transition-shadow">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-[var(--midnight)]">Your Transaction</h3>
      </div>
      
      <div className="space-y-4">
        {transactions.map((transaction) => {
          const Icon = transaction.icon;
          return (
            <div key={transaction.id} className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${transaction.color}`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-[var(--midnight)]">{transaction.type}</p>
                <p className="text-sm text-[var(--charcoal)]">{transaction.description}</p>
              </div>
              <span className="font-semibold text-[var(--midnight)]">{transaction.amount}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
