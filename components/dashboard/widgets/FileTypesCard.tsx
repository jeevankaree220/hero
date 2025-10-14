"use client";

import { Card } from "@/components/ui/card";
import { fileTypeBreakdown } from "@/lib/mockData";
import { FileText, Film, Folder, HelpCircle, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "file-text": FileText,
  "film": Film,
  "folder": Folder,
  "help-circle": HelpCircle,
};

export default function FileTypesCard() {
  return (
    <Card className="
      p-4 sm:p-5 md:p-6 
      xl:p-4 2xl:p-5 3xl:p-6 4xl:p-8
      h-full flex flex-col
    ">
      <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6">
        <h3 className="
          text-lg sm:text-xl 
          xl:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl
          font-heading font-semibold text-[var(--midnight)]
        ">
          File Types
        </h3>
      </div>

      <div className="space-y-3 sm:space-y-4 flex-1">
        {fileTypeBreakdown.map((fileType) => {
          const Icon = iconMap[fileType.icon];
          
          return (
            <div
              key={fileType.type}
              className="
                flex items-center justify-between 
                p-3 sm:p-4 
                xl:p-3 2xl:p-4 3xl:p-5 4xl:p-6
                rounded-lg hover:bg-[var(--skymist)] transition-colors cursor-pointer
              "
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div
                  className="
                    p-2 sm:p-2.5 
                    xl:p-2 2xl:p-2.5 3xl:p-3 4xl:p-3.5
                    rounded-lg
                  "
                  style={{ backgroundColor: `${fileType.color}20` }}
                >
                  <Icon
                    className="
                      w-4 h-4 sm:w-5 sm:h-5 
                      xl:w-4 xl:h-4 2xl:w-5 2xl:h-5 3xl:w-6 3xl:h-6 4xl:w-7 4xl:h-7
                    "
                    style={{ color: fileType.color }}
                  />
                </div>
                <div>
                  <p className="
                    font-medium 
                    text-sm sm:text-base 
                    xl:text-sm 2xl:text-base 3xl:text-lg 4xl:text-xl
                    text-[var(--midnight)]
                  ">
                    {fileType.type}
                  </p>
                  <p className="
                    text-xs sm:text-sm 
                    xl:text-xs 2xl:text-sm 3xl:text-base 4xl:text-lg
                    text-[var(--charcoal)]
                  ">
                    {fileType.count.toLocaleString()} Files
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="
                  font-semibold 
                  text-sm sm:text-base 
                  xl:text-sm 2xl:text-base 3xl:text-lg 4xl:text-xl
                  text-[var(--midnight)]
                ">
                  {fileType.size}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
