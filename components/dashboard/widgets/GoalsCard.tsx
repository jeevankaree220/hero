"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function GoalsCard() {
  return (
    <Card className="p-6 bg-white border-[var(--mist)] hover:shadow-lg transition-shadow">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-[var(--midnight)] mb-2">
          Reach financial goals faster
        </h3>
        <p className="text-sm text-[var(--charcoal)] leading-relaxed">
          Up to 3x faster than the average in the world with no hidden fees, read our policy
        </p>
      </div>
      
      <Button className="w-full bg-[var(--softorange)] hover:bg-[var(--sandyellow)] text-white rounded-lg">
        Learn More
      </Button>
    </Card>
  );
}
