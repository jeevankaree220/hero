"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { storageUsage } from "@/lib/mockData";
import CountUp from "react-countup";

export default function StorageDonutChart() {
  const [mounted, setMounted] = useState(false);
  const [chartDimensions, setChartDimensions] = useState({
    height: 260,
    innerRadius: 90,
    outerRadius: 120
  });

  useEffect(() => {
    setMounted(true);
    
    const updateDimensions = () => {
      const width = window.innerWidth;
      setChartDimensions({
        height: width < 640 ? 180 : width < 1024 ? 200 : width < 1440 ? 200 : width < 1680 ? 220 : width < 2048 ? 240 : 260,
        innerRadius: width < 640 ? 50 : width < 1024 ? 60 : width < 1440 ? 60 : width < 1680 ? 70 : width < 2048 ? 80 : 90,
        outerRadius: width < 640 ? 80 : width < 1024 ? 90 : width < 1440 ? 90 : width < 1680 ? 100 : width < 2048 ? 110 : 120
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const data = storageUsage.breakdown.map((item) => ({
    name: item.type,
    value: item.value,
    color: item.color,
  }));

  return (
    <Card className="
      p-4 sm:p-5 md:p-6 
      xl:p-4 2xl:p-5 3xl:p-6 4xl:p-8
      h-full flex flex-col
    ">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="
          text-lg sm:text-xl 
          xl:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl
          font-heading font-semibold text-[var(--midnight)]
        ">
          Storage Details
        </h3>
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

      <div className="relative flex-1 flex items-center justify-center">
        {!mounted ? (
          <div className="w-full h-[260px] flex items-center justify-center">
            <div className="animate-pulse bg-[var(--mist)] rounded-full w-48 h-48"></div>
          </div>
        ) : (
          <ResponsiveContainer 
            width="100%" 
            height={chartDimensions.height}
          >
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={chartDimensions.innerRadius}
                outerRadius={chartDimensions.outerRadius}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        )}
        
        {/* Center Text */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="
            text-xl sm:text-2xl md:text-3xl 
            xl:text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl
            font-bold text-[var(--midnight)]
          ">
            {mounted ? (
              <CountUp end={storageUsage.used} decimals={1} duration={2} />
            ) : (
              storageUsage.used
            )}
          </div>
          <div className="
            text-xs sm:text-sm 
            xl:text-xs 2xl:text-sm 3xl:text-base 4xl:text-lg
            text-[var(--charcoal)]
          ">
            Of {storageUsage.total}GB
          </div>
        </div>
      </div>
    </Card>
  );
}

