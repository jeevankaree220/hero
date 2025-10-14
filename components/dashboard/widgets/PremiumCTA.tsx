"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PremiumCTA() {
  return (
    <Card className="p-6 bg-gradient-to-br from-[var(--midnight)] to-[var(--charcoal)] text-white border-none">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Get a Premium Account</h3>
        <p className="text-sm opacity-90">
          Unlock advanced features and get priority support
        </p>
      </div>
      
      <Button className="w-full bg-[var(--softorange)] hover:bg-[var(--sandyellow)] text-white rounded-lg mb-4">
        Get Now
      </Button>
      
      {/* Progress indicator */}
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-white/20 rounded-full h-2">
          <div className="bg-[var(--softorange)] h-2 rounded-full w-3/4"></div>
        </div>
        <span className="text-sm">75%</span>
      </div>
    </Card>
  );
}
