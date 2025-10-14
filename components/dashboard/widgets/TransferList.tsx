"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

const transfers = [
  {
    id: 1,
    name: "Jenny Wilson",
    time: "Today, 11:24",
    amount: "+$45",
    avatar: "/api/placeholder/32/32",
    initials: "JW",
  },
  {
    id: 2,
    name: "Dianne Russell",
    time: "Today, 10:24",
    amount: "+$30",
    avatar: "/api/placeholder/32/32", 
    initials: "DR",
  },
];

export default function TransferList() {
  return (
    <Card className="p-6 bg-white border-[var(--mist)] hover:shadow-lg transition-shadow">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-[var(--midnight)]">Your Transfer</h3>
      </div>
      
      <div className="space-y-4">
        {transfers.map((transfer) => (
          <div key={transfer.id} className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={transfer.avatar} alt={transfer.name} />
              <AvatarFallback className="bg-[var(--softorange)] text-white text-sm">
                {transfer.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium text-[var(--midnight)]">{transfer.name}</p>
              <p className="text-sm text-[var(--charcoal)]">{transfer.time}</p>
            </div>
            <span className="font-semibold text-green-600">{transfer.amount}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
