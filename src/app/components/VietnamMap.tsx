import React from 'react';
import { motion } from 'motion/react';

interface Region {
  id: string;
  name: string;
  T: number;
  P: number;
  color: string;
}

interface VietnamMapProps {
  regions: Region[];
  gap: number;
  onRegionClick?: (region: Region) => void;
}

export function VietnamMap({ regions, gap, onRegionClick }: VietnamMapProps) {
  const showGapWarning = gap > 40;

  return (
    <div className="relative w-full h-full flex items-center justify-center p-8">
      {/* Stylized Vietnam Map - Simple representation */}
      <div className="relative w-48 h-96">
        {/* Map regions as clickable areas */}
        <div className="grid grid-rows-4 gap-2 h-full">
          {regions.map((region, index) => (
            <motion.div
              key={region.id}
              whileHover={{ scale: 1.05 }}
              onClick={() => onRegionClick?.(region)}
              className={`relative rounded-lg border-2 backdrop-blur-lg cursor-pointer transition-all p-3
                ${showGapWarning && (region.id === 'urban' || region.id === 'agriculture')
                  ? 'border-red-500 animate-pulse'
                  : 'border-[var(--glass-border)] hover:border-[#22d3ee]'
                }`}
              style={{
                backgroundColor: `${region.color}20`,
              }}
            >
              <div className="text-xs font-semibold mb-1">{region.name}</div>
              <div className="flex gap-2 text-xs">
                <div>
                  <span className="text-[#06b6d4]">T:</span> {Math.round(region.T)}
                </div>
                <div>
                  <span className="text-[#10b981]">P:</span> {Math.round(region.P)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Gap warning lines */}
        {showGapWarning && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg className="w-full h-full" style={{ position: 'absolute' }}>
              <line
                x1="50%"
                y1="15%"
                x2="50%"
                y2="85%"
                stroke="#ef4444"
                strokeWidth="3"
                strokeDasharray="5,5"
              />
            </svg>
          </motion.div>
        )}
      </div>

      {/* Map legend */}
      <div className="absolute bottom-4 right-4 bg-[var(--glass-bg)] backdrop-blur-lg border border-[var(--glass-border)] rounded-lg p-3 text-xs">
        <div className="font-semibold mb-2">Chú thích:</div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#06b6d4] rounded"></div>
            <span>Công nghệ (T)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#10b981] rounded"></div>
            <span>Năng suất (P)</span>
          </div>
          {showGapWarning && (
            <div className="flex items-center gap-2 text-red-500">
              <div className="w-3 h-3 bg-red-500 rounded animate-pulse"></div>
              <span>Đứt gãy!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
