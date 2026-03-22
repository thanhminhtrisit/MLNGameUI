import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

interface StabilityMeterProps {
  stability: number;
  gap: number;
}

export function StabilityMeter({ stability, gap }: StabilityMeterProps) {
  const isWarning = stability < 0 || gap > 50;
  const stabilityPercentage = Math.max(0, Math.min(100, (stability + 50) / 100 * 100));

  return (
    <div className={`p-4 rounded-lg border-2 ${
      isWarning 
        ? 'bg-red-500/10 border-red-500 animate-pulse' 
        : 'bg-[var(--glass-bg)] border-[var(--glass-border)] backdrop-blur-lg'
    }`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">Chỉ số Ổn định</h3>
        {isWarning && <AlertTriangle className="text-red-500 animate-pulse" size={20} />}
      </div>
      
      <div className="space-y-3">
        {/* Stability Score */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Điểm Ổn định (S)</span>
            <span className={isWarning ? 'text-red-500 font-bold' : 'text-[#22d3ee]'}>
              {stability.toFixed(1)}
            </span>
          </div>
          <div className="h-2 bg-muted/20 rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${isWarning ? 'bg-red-500' : 'bg-[#22d3ee]'}`}
              initial={{ width: 0 }}
              animate={{ width: `${stabilityPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Technology Gap */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Khoảng cách Công nghệ</span>
            <span className={gap > 50 ? 'text-red-500 font-bold' : 'text-[#f97316]'}>
              {Math.round(gap)}
            </span>
          </div>
          <div className="h-2 bg-muted/20 rounded-full overflow-hidden">
            <motion.div
              className={gap > 50 ? 'bg-red-500' : 'bg-[#f97316]'}
              initial={{ width: 0 }}
              animate={{ width: `${gap}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {isWarning && (
          <p className="text-xs text-red-500 mt-2">
            ⚠️ Cảnh báo: {stability < 0 ? 'Hệ thống mất ổn định!' : 'Đứt gãy công nghệ nghiêm trọng!'}
          </p>
        )}

        <p className="text-xs text-muted-foreground mt-2">
          S = E×0.7 - Gap×0.3
        </p>
      </div>
    </div>
  );
}
