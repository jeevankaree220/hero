"use client";

import { Card } from "@/components/ui/card";
import { 
  FileText, 
  Cloud, 
  LucideIcon 
} from "lucide-react";
import { storageProviders } from "@/lib/mockData";

const iconMap: Record<string, LucideIcon> = {
  "file-text": FileText,
  "cloud": Cloud,
};

export default function StorageOverview() {
  return (
    <div className="space-y-3 sm:space-y-4">
      <h2 className="
        text-xl sm:text-2xl 
        xl:text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl
        font-heading font-semibold text-[var(--midnight)]
      ">
        My Files
      </h2>
      
      <div className="
        grid grid-cols-1 sm:grid-cols-2 
        lg:grid-cols-2 xl:grid-cols-4 
        2xl:grid-cols-4 3xl:grid-cols-4 4xl:grid-cols-4
        gap-3 sm:gap-4 md:gap-5 
        xl:gap-4 2xl:gap-5 3xl:gap-6 4xl:gap-8
        storage-cards-mobile-xl storage-cards-mobile-pro storage-cards-mobile-standard storage-cards-mobile-mini
        storage-cards-laptop-13 storage-cards-laptop-14 storage-cards-laptop-19 storage-cards-laptop-21
      ">
        {storageProviders.map((provider, index) => {
          const Icon = iconMap[provider.icon];
          const percentage = (provider.storage / provider.maxStorage) * 100;
          
          return (
            <Card
              key={provider.name}
              className="
                p-3 sm:p-4 md:p-5 
                xl:p-3 2xl:p-4 3xl:p-5 4xl:p-6
                hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-fade-in
              "
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-1 sm:mb-2">
                <div
                  className="
                    p-2.5 sm:p-3 
                    xl:p-2.5 2xl:p-3 3xl:p-3.5 4xl:p-4
                    rounded-lg
                  "
                  style={{ backgroundColor: `${provider.color}20` }}
                >
                  <Icon
                    className="
                      w-5 h-5 sm:w-6 sm:h-6 
                      xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 3xl:w-7 3xl:h-7 4xl:w-8 4xl:h-8
                    "
                    style={{ color: provider.color }}
                  />
                </div>
                <button className="text-[var(--charcoal)] hover:text-[var(--midnight)]">
                  <svg
                    width="4"
                    height="16"
                    viewBox="0 0 4 16"
                    fill="currentColor"
                  >
                    <circle cx="2" cy="2" r="2" />
                    <circle cx="2" cy="8" r="2" />
                    <circle cx="2" cy="14" r="2" />
                  </svg>
                </button>
              </div>
              
              <h3 className="
                font-semibold 
                text-base sm:text-lg 
                xl:text-base 2xl:text-lg 3xl:text-xl 4xl:text-2xl
                text-[var(--midnight)] mb-0
              ">
                {provider.name}
              </h3>
              
              <div className="flex items-baseline gap-2 mb-0">
                <span className="
                  text-xs sm:text-sm 
                  xl:text-xs 2xl:text-sm 3xl:text-base 4xl:text-lg
                  text-[var(--charcoal)]
                ">
                  {provider.files.toLocaleString()} Files
                </span>
                <span className="
                  text-xs sm:text-sm 
                  xl:text-xs 2xl:text-sm 3xl:text-base 4xl:text-lg
                  font-medium text-[var(--midnight)]
                ">
                  {provider.storage}GB
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="relative">
                <div className="
                  h-1.5 sm:h-2 
                  xl:h-1.5 2xl:h-2 3xl:h-2.5 4xl:h-3
                  bg-[var(--mist)] rounded-full overflow-hidden
                ">
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${percentage}%`,
                      background: `linear-gradient(90deg, ${provider.color} 0%, ${provider.color}dd 100%)`,
                    }}
                  />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

