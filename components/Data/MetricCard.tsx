'use client';

import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  compareText?: string;
  iconBgColor?: string;
  iconTextColor?: string;
}

export function MetricCard({
  title,
  value,
  icon,
  trend,
  compareText,
  iconBgColor = 'bg-blue-100',
  iconTextColor = 'text-blue-600',
}: MetricCardProps) {
  return (
    <div className="bg-card rounded-lg p-6 shadow-card border border-neutral-100 hover:shadow-elevated transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-neutral-600 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-neutral-900">{typeof value === 'number' ? value.toLocaleString() : value}</h3>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ml-4 ${iconBgColor} ${iconTextColor}`}>
          {icon}
        </div>
      </div>

      {trend && (
        <div className="flex items-center gap-2 text-sm">
          <span className={`flex items-center gap-1 font-semibold ${trend.isPositive ? 'text-success-700' : 'text-error-500'}`}>
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
          {compareText && <span className="text-neutral-600">{compareText}</span>}
        </div>
      )}
    </div>
  );
}
