import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, TrendingUp, TrendingDown } from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export interface PlayerRecord {
  id: string;
  name: string;
  avatar: string;
  characterId: string;
  currentRound: number;
  completedRound: number;
  endingType: 'success' | 'inequality' | 'dependency' | 'collapse' | 'playing';
  autoScore: number;
  stability: number;
  playTime: string;
  status: 'playing' | 'completed' | 'gameover';
  stats: {
    T: number;
    P: number;
    E: number;
    I: number;
    Gap: number;
  };
  budget: number;
  marxComment: string;
}

const ENDING_META: Record<string, { label: string; color: string; bg: string; border: string }> = {
  success: {
    label: 'CNH-HĐH Thành công',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.15)',
    border: 'rgba(16,185,129,0.4)',
  },
  inequality: {
    label: 'Phát triển không đồng đều',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.15)',
    border: 'rgba(245,158,11,0.4)',
  },
  dependency: {
    label: 'Bẫy lệ thuộc',
    color: '#f97316',
    bg: 'rgba(249,115,22,0.15)',
    border: 'rgba(249,115,22,0.4)',
  },
  collapse: {
    label: 'Sụp đổ hệ thống',
    color: '#ef4444',
    bg: 'rgba(239,68,68,0.15)',
    border: 'rgba(239,68,68,0.4)',
  },
  playing: {
    label: 'Đang chơi',
    color: '#22d3ee',
    bg: 'rgba(34,211,238,0.15)',
    border: 'rgba(34,211,238,0.4)',
  },
};

const STAT_COLORS = {
  T: '#22d3ee',
  P: '#10b981',
  E: '#f59e0b',
  I: '#f97316',
  Gap: '#ef4444',
};

interface PlayerDetailModalProps {
  player: PlayerRecord | null;
  onClose: () => void;
}

export function PlayerDetailModal({ player, onClose }: PlayerDetailModalProps) {
  if (!player) return null;

  const endingMeta = ENDING_META[player.endingType];

  const radarData = [
    { stat: 'Công nghệ (T)', value: player.stats.T, fullMark: 100 },
    { stat: 'Năng suất (P)', value: player.stats.P, fullMark: 100 },
    { stat: 'Bình đẳng (E)', value: player.stats.E, fullMark: 100 },
    { stat: 'Đổi mới (I)', value: player.stats.I, fullMark: 100 },
    {
      stat: 'Ổn định',
      value: Math.max(0, Math.min(100, player.stability + 50)),
      fullMark: 100,
    },
  ];

  const statRows = [
    { label: 'Công nghệ (T)', value: player.stats.T, color: STAT_COLORS.T, max: 100 },
    { label: 'Năng suất (P)', value: player.stats.P, color: STAT_COLORS.P, max: 100 },
    { label: 'Bình đẳng (E)', value: player.stats.E, color: STAT_COLORS.E, max: 100 },
    { label: 'Đổi mới (I)', value: player.stats.I, color: STAT_COLORS.I, max: 100 },
    { label: 'Khoảng cách CN', value: player.stats.Gap, color: STAT_COLORS.Gap, max: 100 },
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border z-10"
          style={{
            background: 'rgba(3,2,19,0.95)',
            borderColor: endingMeta.border,
            boxShadow: `0 0 40px ${endingMeta.color}30, 0 0 80px ${endingMeta.color}10`,
          }}
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Scan line animation */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
            style={{
              background: `linear-gradient(180deg, transparent 0%, ${endingMeta.color}05 50%, transparent 100%)`,
            }}
          />

          {/* Header */}
          <div
            className="flex items-center justify-between p-6 border-b"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <div className="flex items-center gap-4">
              {/* Avatar circle */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-2xl border-2"
                style={{
                  background: endingMeta.bg,
                  borderColor: endingMeta.color,
                  boxShadow: `0 0 16px ${endingMeta.color}40`,
                }}
              >
                {player.avatar}
              </div>
              <div>
                <h2
                  className="text-xl"
                  style={{ fontFamily: 'Be Vietnam Pro, sans-serif', color: endingMeta.color }}
                >
                  {player.name}
                </h2>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Chi tiết kết quả ván chơi · Vòng {player.completedRound}/15
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Radar Chart */}
            <div
              className="rounded-xl p-5 border"
              style={{
                background: 'rgba(255,255,255,0.03)',
                borderColor: 'rgba(255,255,255,0.08)',
              }}
            >
              <h3
                className="text-sm mb-4 text-center"
                style={{ color: '#22d3ee', fontFamily: 'Be Vietnam Pro, sans-serif' }}
              >
                ◆ PHÂN TÍCH CHỈ SỐ CUỐI CÙNG
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis
                    dataKey="stat"
                    tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.7)' }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{ fontSize: 9, fill: 'rgba(255,255,255,0.4)' }}
                  />
                  <Radar
                    name="Chỉ số"
                    dataKey="value"
                    stroke={endingMeta.color}
                    fill={endingMeta.color}
                    fillOpacity={0.25}
                    strokeWidth={2}
                  />
                  <Legend
                    formatter={() => (
                      <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>
                        Chỉ số người chơi
                      </span>
                    )}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Stats breakdown */}
            <div className="space-y-4">
              {/* Stat bars */}
              <div
                className="rounded-xl p-5 border"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  borderColor: 'rgba(255,255,255,0.08)',
                }}
              >
                <h3
                  className="text-sm mb-4"
                  style={{ color: '#22d3ee', fontFamily: 'Be Vietnam Pro, sans-serif' }}
                >
                  ◆ CHỈ SỐ LLSX & QHSX
                </h3>
                <div className="space-y-3">
                  {statRows.map((row) => (
                    <div key={row.label}>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
                          {row.label}
                        </span>
                        <span className="text-xs" style={{ color: row.color }}>
                          {row.value}
                        </span>
                      </div>
                      <div
                        className="h-2 rounded-full overflow-hidden"
                        style={{ background: 'rgba(255,255,255,0.08)' }}
                      >
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${(row.value / row.max) * 100}%`,
                            background: `linear-gradient(90deg, ${row.color}80, ${row.color})`,
                            boxShadow: `0 0 8px ${row.color}60`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary numbers */}
              <div className="grid grid-cols-2 gap-3">
                <div
                  className="rounded-xl p-4 border text-center"
                  style={{
                    background: 'rgba(34,211,238,0.05)',
                    borderColor: 'rgba(34,211,238,0.2)',
                  }}
                >
                  <div className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Điểm tự động
                  </div>
                  <div
                    className="text-2xl"
                    style={{
                      color: player.autoScore >= 60 ? '#10b981' : '#ef4444',
                      fontFamily: 'Be Vietnam Pro, sans-serif',
                    }}
                  >
                    {player.autoScore}
                  </div>
                </div>
                <div
                  className="rounded-xl p-4 border text-center"
                  style={{
                    background: 'rgba(245,158,11,0.05)',
                    borderColor: 'rgba(245,158,11,0.2)',
                  }}
                >
                  <div className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Ổn định (Stability)
                  </div>
                  <div
                    className="text-2xl"
                    style={{
                      color: player.stability >= 0 ? '#f59e0b' : '#ef4444',
                      fontFamily: 'Be Vietnam Pro, sans-serif',
                    }}
                  >
                    {player.stability}
                  </div>
                </div>
                <div
                  className="rounded-xl p-4 border text-center"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    borderColor: 'rgba(255,255,255,0.08)',
                  }}
                >
                  <div className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Ngân sách còn lại
                  </div>
                  <div className="text-2xl" style={{ color: '#22d3ee' }}>
                    {player.budget}
                  </div>
                </div>
                <div
                  className="rounded-xl p-4 border text-center"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    borderColor: 'rgba(255,255,255,0.08)',
                  }}
                >
                  <div className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Thời gian chơi
                  </div>
                  <div className="text-2xl" style={{ color: '#f97316' }}>
                    {player.playTime}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ending badge */}
          <div className="px-6 pb-2">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm"
              style={{
                background: endingMeta.bg,
                borderColor: endingMeta.border,
                color: endingMeta.color,
              }}
            >
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: endingMeta.color }}
              />
              Kết cục: {endingMeta.label}
            </div>
          </div>

          {/* Marx commentary */}
          <div className="px-6 pb-6 mt-4">
            <div
              className="rounded-xl p-5 border"
              style={{
                background: 'rgba(6,182,212,0.05)',
                borderColor: 'rgba(6,182,212,0.2)',
              }}
            >
              <div
                className="text-xs mb-2 tracking-widest"
                style={{ color: '#06b6d4', fontFamily: 'Be Vietnam Pro, sans-serif' }}
              >
                ◆ LỜI BÌNH HỌC THUẬT MÁC-LÊNIN
              </div>
              <p className="text-sm italic leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
                {player.marxComment}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
