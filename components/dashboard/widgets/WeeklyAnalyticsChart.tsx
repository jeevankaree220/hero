"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { weeklyAnalytics } from "@/lib/mockData";

export default function WeeklyAnalyticsChart() {
  const [mounted, setMounted] = useState(false);
  const [dimensions, setDimensions] = useState({
    height: 280,
    fontSize: 14,
    barSize: 50,
    margin: 30
  });

  useEffect(() => {
    setMounted(true);
    
    const updateDimensions = () => {
      const width = window.innerWidth;
      setDimensions({
        height: width < 640 ? 200 : width < 1024 ? 240 : width < 1440 ? 220 : width < 1680 ? 260 : width < 2048 ? 280 : 320,
        fontSize: width < 640 ? 10 : width < 1024 ? 12 : width < 1440 ? 11 : width < 1680 ? 13 : width < 2048 ? 14 : 16,
        barSize: width < 640 ? 30 : width < 1024 ? 40 : width < 1440 ? 35 : width < 1680 ? 45 : width < 2048 ? 50 : 60,
        margin: width < 640 ? 10 : 30
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  if (!mounted) {
    return (
      <Card className="
        p-4 sm:p-5 md:p-6 
        xl:p-4 2xl:p-5 3xl:p-6 4xl:p-8
      ">
        <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6">
          <h3 className="
            text-lg sm:text-xl 
            xl:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl
            font-heading font-semibold text-[var(--midnight)]
          ">
            Analytics
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
        <div className="h-[280px] flex items-center justify-center">
          <div className="animate-pulse bg-[var(--mist)] rounded-lg w-full h-full"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="
      p-4 sm:p-5 md:p-6 
      xl:p-4 2xl:p-5 3xl:p-6 4xl:p-8
    ">
      <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6">
        <h3 className="
          text-lg sm:text-xl 
          xl:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl
          font-heading font-semibold text-[var(--midnight)]
        ">
          Analytics
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

      <ResponsiveContainer 
        width="100%" 
        height={dimensions.height}
      >
        <BarChart 
          data={weeklyAnalytics} 
          margin={{ 
            top: 20, 
            right: dimensions.margin, 
            left: 0, 
            bottom: 5 
          }}
        >
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.8} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#D1D9E6" vertical={false} />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ 
              fill: "#2D2F36", 
              fontSize: dimensions.fontSize
            }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ 
              fill: "#2D2F36", 
              fontSize: dimensions.fontSize
            }}
            ticks={[0, 20, 40, 60, 80, 100]}
          />
          <Bar
            dataKey="value"
            fill="url(#barGradient)"
            radius={[8, 8, 0, 0]}
            maxBarSize={dimensions.barSize}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

