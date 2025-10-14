"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function AddNewButton() {
  return (
    <Button className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white rounded-lg px-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5">
      <Plus className="w-5 h-5 mr-2" />
      Add New
    </Button>
  );
}

