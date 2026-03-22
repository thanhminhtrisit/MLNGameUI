import React from 'react';
import { motion } from 'motion/react';

interface CircularGaugeProps {
  value: number;
  max?: number;
  label: string;
  color: string;
  size?: number;
  showValue?: boolean;
  warning?: boolean;
}

export function CircularGauge({
  value,
  max = 100,
  label,
  color,
  size = 120,
  showValue = true,
  warning = false,
}: CircularGaugeProps) {
  const percentage = (value / max) * 100;
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-muted opacity-20"
          />
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={warning ? '#ef4444' : color}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={warning ? 'animate-pulse' : ''}
          />
        </svg>
        {showValue && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-2xl font-bold ${warning ? 'text-[#ef4444]' : ''}`}>
              {Math.round(value)}
            </span>
          </div>
        )}
      </div>
      <span className="text-sm text-center font-medium">{label}</span>
    </div>
  );
}
