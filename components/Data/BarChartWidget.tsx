'use client';

import React, { useMemo } from 'react';

interface BarChartDataPoint {
  name: string;
  value: number;
  growth?: number;
}

interface BarChartWidgetProps {
  title: string;
  data: BarChartDataPoint[];
  maxValue?: number;
}

// 1. SCALABLE COLORS
// We use an array. If we have more items than colors, we cycle through them using modulus (%).
const CHART_COLORS = [
  'bg-blue-900',
  'bg-blue-700',
  'bg-blue-600',
  'bg-blue-500',
  'bg-blue-400',
  'bg-indigo-500',
];

export function BarChartWidget({ title, data, maxValue }: BarChartWidgetProps) {
  
  // 2. EDGE CASE: SAFETY CHECK
  // If data is empty, max is 0. We must prevent division by zero later.
  const safeMax = useMemo(() => {
    const calculatedMax = maxValue || Math.max(...data.map((d) => d.value));
    return calculatedMax > 0 ? calculatedMax : 1; // Prevent / 0
  }, [data, maxValue]);

  return (
    <div className="bg-card rounded-lg p-6 shadow-card border border-neutral-100 h-full flex flex-col">
      <h3 className="text-lg font-semibold text-neutral-900 mb-6">{title}</h3>

      {/* Handle Empty State */}
      {data.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-neutral-400 text-sm italic">
          No data available to display
        </div>
      ) : (
        <div className="space-y-5">
          {data.map((item, idx) => {
            // Calculate percentage safely
            const percentage = Math.min(100, Math.max(0, (item.value / safeMax) * 100));
            
            // Cycle colors safely
            const barColor = CHART_COLORS[idx % CHART_COLORS.length];

            return (
              <div key={item.name} className="group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-neutral-700 group-hover:text-neutral-900 transition-colors">
                    {item.name}
                  </span>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-neutral-900">
                      {item.value.toLocaleString()}
                    </span>
                    
                    {/* Only render growth if it exists (check for undefined) */}
                    {item.growth !== undefined && (
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        item.growth >= 0 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {item.growth > 0 ? '+' : ''}{item.growth}%
                      </span>
                    )}
                  </div>
                </div>

                {/* 3. ACCESSIBILITY TAGS (Distinction Level) */}
                {/* role="progressbar" tells screen readers what this is */}
                <div 
                  className="w-full bg-neutral-200 rounded-lg h-3 overflow-hidden"
                  role="progressbar"
                  aria-valuenow={item.value}
                  aria-valuemin={0}
                  aria-valuemax={safeMax}
                  aria-label={`Sales for ${item.name}`}
                >
                  <div
                    className={`h-full rounded-lg transition-all duration-500 ease-out ${barColor}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}