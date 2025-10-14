"use client";

import { Card } from "@/components/ui/card";

export default function AnalyticsChart() {
  // Sample data points for the chart
  const dataPoints = [
    { month: "Jan", value: 20 },
    { month: "Feb", value: 45 },
    { month: "Mar", value: 30 },
    { month: "Apr", value: 60 },
    { month: "May", value: 80 },
    { month: "Jun", value: 55 },
    { month: "Jul", value: 75 },
  ];

  const maxValue = Math.max(...dataPoints.map(d => d.value));
  
  return (
    <Card className="p-6 bg-white border-[var(--mist)] hover:shadow-lg transition-shadow">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-[var(--midnight)] mb-2">Analytics Overview</h3>
        <p className="text-sm text-[var(--charcoal)]">Monthly financial trends</p>
      </div>
      
      <div className="relative h-40">
        <svg className="w-full h-full" viewBox="0 0 400 160">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="40"
              y1={40 + i * 20}
              x2="380"
              y2={40 + i * 20}
              stroke="#E5E7EB"
              strokeWidth="1"
            />
          ))}
          
          {/* Chart line */}
          <polyline
            fill="none"
            stroke="var(--softorange)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={dataPoints.map((point, index) => {
              const x = 60 + (index * 45);
              const y = 140 - (point.value / maxValue) * 80;
              return `${x},${y}`;
            }).join(' ')}
          />
          
          {/* Data points */}
          {dataPoints.map((point, index) => {
            const x = 60 + (index * 45);
            const y = 140 - (point.value / maxValue) * 80;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill="var(--softorange)"
                stroke="white"
                strokeWidth="2"
              />
            );
          })}
          
          {/* Month labels */}
          {dataPoints.map((point, index) => {
            const x = 60 + (index * 45);
            return (
              <text
                key={index}
                x={x}
                y="155"
                textAnchor="middle"
                className="text-xs fill-[var(--charcoal)]"
              >
                {point.month}
              </text>
            );
          })}
        </svg>
      </div>
    </Card>
  );
}
