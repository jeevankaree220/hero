"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { recentFiles } from "@/lib/mockData";
import {
  FileText,
  Film,
  Music,
  Table,
  File,
  ArrowUpDown,
  ChevronRight,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "file-text": FileText,
  "film": Film,
  "music": Music,
  "table": Table,
  "file": File,
  "figma": File,
};

type SortField = "name" | "date" | "size";
type SortDirection = "asc" | "desc";

export default function RecentFilesTable() {
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedFiles = [...recentFiles].sort((a, b) => {
    let comparison = 0;
    
    if (sortField === "name") {
      comparison = a.name.localeCompare(b.name);
    } else if (sortField === "date") {
      const dateA = new Date(a.date.split("-").reverse().join("-"));
      const dateB = new Date(b.date.split("-").reverse().join("-"));
      comparison = dateA.getTime() - dateB.getTime();
    } else if (sortField === "size") {
      const sizeA = parseFloat(a.size);
      const sizeB = parseFloat(b.size);
      comparison = sizeA - sizeB;
    }
    
    return sortDirection === "asc" ? comparison : -comparison;
  });

  return (
    <Card className="
      p-4 sm:p-5 md:p-6 
      xl:p-4 2xl:p-5 3xl:p-6 4xl:p-8
      lg:col-span-1 xl:col-span-2 
      2xl:col-span-1 3xl:col-span-2 4xl:col-span-2
    ">
      <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6">
        <h3 className="
          text-lg sm:text-xl 
          xl:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl
          font-heading font-semibold text-[var(--midnight)]
        ">
          Recent Order
        </h3>
        <button className="
          flex items-center gap-1 
          text-xs sm:text-sm 
          xl:text-xs 2xl:text-sm 3xl:text-base 4xl:text-lg
          font-medium text-[var(--softorange)] hover:text-[var(--sandyellow)] transition-colors
        ">
          See more
          <ChevronRight className="
            w-3 h-3 sm:w-4 sm:h-4 
            xl:w-3 xl:h-3 2xl:w-4 2xl:h-4 3xl:w-5 3xl:h-5 4xl:w-6 4xl:h-6
          " />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="border-b border-[var(--mist)]">
              <th className="text-left py-3 sm:py-4 px-2 sm:px-3">
                <button
                  onClick={() => handleSort("name")}
                  className="
                    flex items-center gap-1 sm:gap-2 
                    font-medium 
                    text-xs sm:text-sm 
                    xl:text-xs 2xl:text-sm 3xl:text-base 4xl:text-lg
                    text-[var(--charcoal)] hover:text-[var(--midnight)] transition-colors
                  "
                >
                  File Name
                  <ArrowUpDown className="
                    w-3 h-3 sm:w-4 sm:h-4 
                    xl:w-3 xl:h-3 2xl:w-4 2xl:h-4 3xl:w-5 3xl:h-5 4xl:w-6 4xl:h-6
                  " />
                </button>
              </th>
              <th className="text-left py-3 sm:py-4 px-2 sm:px-3">
                <button
                  onClick={() => handleSort("date")}
                  className="
                    flex items-center gap-1 sm:gap-2 
                    font-medium 
                    text-xs sm:text-sm 
                    xl:text-xs 2xl:text-sm 3xl:text-base 4xl:text-lg
                    text-[var(--charcoal)] hover:text-[var(--midnight)] transition-colors
                  "
                >
                  Date
                  <ArrowUpDown className="
                    w-3 h-3 sm:w-4 sm:h-4 
                    xl:w-3 xl:h-3 2xl:w-4 2xl:h-4 3xl:w-5 3xl:h-5 4xl:w-6 4xl:h-6
                  " />
                </button>
              </th>
              <th className="text-left py-3 sm:py-4 px-2 sm:px-3">
                <button
                  onClick={() => handleSort("size")}
                  className="
                    flex items-center gap-1 sm:gap-2 
                    font-medium 
                    text-xs sm:text-sm 
                    xl:text-xs 2xl:text-sm 3xl:text-base 4xl:text-lg
                    text-[var(--charcoal)] hover:text-[var(--midnight)] transition-colors
                  "
                >
                  Size
                  <ArrowUpDown className="
                    w-3 h-3 sm:w-4 sm:h-4 
                    xl:w-3 xl:h-3 2xl:w-4 2xl:h-4 3xl:w-5 3xl:h-5 4xl:w-6 4xl:h-6
                  " />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedFiles.filter(file => file.type !== 'xd' && file.type !== 'figma').map((file) => {
              const Icon = iconMap[file.icon];
              
              return (
                <tr
                  key={file.id}
                  className="border-b border-[var(--mist)]/50 hover:bg-[var(--skymist)] transition-colors cursor-pointer"
                >
                  <td className="py-3 sm:py-4 px-2 sm:px-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div
                        className="
                          p-2 sm:p-2.5 
                          xl:p-2 2xl:p-2.5 3xl:p-3 4xl:p-3.5
                          rounded-lg
                        "
                        style={{ backgroundColor: `${file.color}20` }}
                      >
                        <Icon
                          className="
                            w-4 h-4 sm:w-5 sm:h-5 
                            xl:w-4 xl:h-4 2xl:w-5 2xl:h-5 3xl:w-6 3xl:h-6 4xl:w-7 4xl:h-7
                          "
                          style={{ color: file.color }}
                        />
                      </div>
                      <span className="
                        font-medium 
                        text-sm sm:text-base 
                        xl:text-sm 2xl:text-base 3xl:text-lg 4xl:text-xl
                        text-[var(--midnight)]
                      ">
                        {file.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 sm:py-4 px-2 sm:px-3">
                    <span className="
                      text-xs sm:text-sm 
                      xl:text-xs 2xl:text-sm 3xl:text-base 4xl:text-lg
                      text-[var(--charcoal)]
                    ">
                      {file.date}
                    </span>
                  </td>
                  <td className="py-3 sm:py-4 px-2 sm:px-3">
                    <span className="
                      text-xs sm:text-sm 
                      xl:text-xs 2xl:text-sm 3xl:text-base 4xl:text-lg
                      font-medium text-[var(--midnight)]
                    ">
                      {file.size}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

