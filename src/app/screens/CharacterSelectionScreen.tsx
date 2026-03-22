import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, User, Check } from 'lucide-react';
import { useGame } from '../context/GameContext';

interface Character {
  id: string;
  initials: string;
  nickname: string;
  fullLabel: string;
  role: string;
  tooltip: string;
  accentColor: string;
  glowColor: string;
  bgGradient: string;
  icon: string;
  iconBg: string;
  culturalSymbol: string;
  symbolColor: string;
}

const characters: Character[] = [
  {
    id: 'ntd',
    initials: 'N.T.D',
    nickname: '"Ba D."',
    fullLabel: 'N.T.D',
    role: 'Biểu tượng của LLSX (Tăng trưởng nóng)',
    tooltip: 'Ưu tiên tuyệt đối cho các "Quả đấm thép" – đẩy nhanh Công nghiệp hóa.',
    accentColor: '#ef4444',
    glowColor: 'rgba(239,68,68,0.5)',
    bgGradient: 'from-[#1a0505] via-[#2d0a0a] to-[#1a0505]',
    icon: '⚙️',
    iconBg: 'rgba(239,68,68,0.15)',
    culturalSymbol: '🏭',
    symbolColor: '#ef4444',
  },
  {
    id: 'tts',
    initials: 'T.T.S',
    nickname: '"Tư S."',
    fullLabel: 'T.T.S',
    role: 'Biểu tượng của QHSX & Kiến trúc thượng tầng',
    tooltip: 'Tập trung "dọn dẹp" bộ máy, chống lợi ích nhóm, đảm bảo ổn định Quan hệ sản xuất.',
    accentColor: '#8b5cf6',
    glowColor: 'rgba(139,92,246,0.5)',
    bgGradient: 'from-[#0d0520] via-[#180a38] to-[#0d0520]',
    icon: '⚖️',
    iconBg: 'rgba(139,92,246,0.15)',
    culturalSymbol: '🏛️',
    symbolColor: '#8b5cf6',
  },
  {
    id: 'vvk',
    initials: 'V.V.K',
    nickname: '"Người thắp lửa"',
    fullLabel: 'Cố Thủ tướng\nVõ Văn Kiệt',
    role: 'Kiến trúc sư Đổi Mới & Hòa hợp',
    tooltip: 'Kiến trúc sư Đổi Mới và hạ tầng lớn – cố vấn về Hòa hợp và phát triển.',
    accentColor: '#f59e0b',
    glowColor: 'rgba(245,158,11,0.5)',
    bgGradient: 'from-[#1a1000] via-[#2d1c00] to-[#1a1000]',
    icon: '🔥',
    iconBg: 'rgba(245,158,11,0.15)',
    culturalSymbol: '🏮',
    symbolColor: '#f59e0b',
  },
  {
    id: 'ldc',
    initials: 'L.Đ.C',
    nickname: '"Nhà khoa học\ncủa nhà nông"',
    fullLabel: 'Giáo sư\nLương Định Của',
    role: 'Chuyên gia nông học – Nông nghiệp & T_a',
    tooltip: 'Chuyên gia nông học vĩ đại – biểu tượng của Nông nghiệp và T_a.',
    accentColor: '#10b981',
    glowColor: 'rgba(16,185,129,0.5)',
    bgGradient: 'from-[#031a0e] via-[#062d1a] to-[#031a0e]',
    icon: '🌾',
    iconBg: 'rgba(16,185,129,0.15)',
    culturalSymbol: '🔬',
    symbolColor: '#10b981',
  },
  {
    id: 'nvl',
    initials: 'N.V.L',
    nickname: '"Người khởi xướng"',
    fullLabel: 'Tổng Bí thư\nNguyễn Văn Linh',
    role: 'Cải cách hành chính & Đổi Mới',
    tooltip: 'Người thúc đẩy Cải cách hành chính và Đổi Mới.',
    accentColor: '#22d3ee',
    glowColor: 'rgba(34,211,238,0.5)',
    bgGradient: 'from-[#031318] via-[#052028] to-[#031318]',
    icon: '🌟',
    iconBg: 'rgba(34,211,238,0.15)',
    culturalSymbol: '📜',
    symbolColor: '#22d3ee',
  },
  {
    id: 'ntb',
    initials: 'N.T.B',
    nickname: '"Nữ sứ giả Hòa bình"',
    fullLabel: 'N.T.B',
    role: 'Trí tuệ, ngoại giao & Giáo dục (I + E)',
    tooltip: 'Đại diện cho trí tuệ, ngoại giao và Giáo dục (I + E).',
    accentColor: '#6366f1',
    glowColor: 'rgba(99,102,241,0.5)',
    bgGradient: 'from-[#080520] via-[#120c38] to-[#080520]',
    icon: '🕊️',
    iconBg: 'rgba(99,102,241,0.15)',
    culturalSymbol: '📚',
    symbolColor: '#6366f1',
  },
  {
    id: 'mkl',
    initials: 'M.K.L',
    nickname: '"Nữ tướng sữa Việt"',
    fullLabel: 'M.K.L',
    role: 'Quản trị & Năng suất (P)',
    tooltip: 'Biểu tượng của Quản trị và Năng suất (P).',
    accentColor: '#34d399',
    glowColor: 'rgba(52,211,153,0.5)',
    bgGradient: 'from-[#031510] via-[#062920] to-[#031510]',
    icon: '🏆',
    iconBg: 'rgba(52,211,153,0.15)',
    culturalSymbol: '🌿',
    symbolColor: '#34d399',
  },
];

function AvatarCard({
  character,
  isSelected,
  onSelect,
}: {
  character: Character;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      className="relative cursor-pointer select-none"
      whileHover={{ scale: 1.04, y: -4 }}
      whileTap={{ scale: 0.97 }}
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card */}
      <div
        className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
          isSelected ? 'ring-2' : 'ring-1'
        }`}
        style={{
          background: isSelected
            ? `radial-gradient(ellipse at 30% 20%, ${character.accentColor}22, #030213 70%)`
            : `radial-gradient(ellipse at 30% 20%, ${character.accentColor}11, #030213 70%)`,
          ringColor: isSelected ? character.accentColor : 'rgba(255,255,255,0.1)',
          boxShadow: isHovered || isSelected
            ? `0 0 25px ${character.glowColor}, 0 0 50px ${character.glowColor.replace('0.5', '0.2')}, inset 0 1px 0 rgba(255,255,255,0.1)`
            : `0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.05)`,
          border: `1px solid ${isSelected ? character.accentColor : isHovered ? character.accentColor + '80' : 'rgba(255,255,255,0.1)'}`,
        }}
      >
        {/* Scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
          }}
        />

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-6 h-6 pointer-events-none z-10" style={{ borderTop: `2px solid ${character.accentColor}`, borderLeft: `2px solid ${character.accentColor}` }} />
        <div className="absolute top-0 right-0 w-6 h-6 pointer-events-none z-10" style={{ borderTop: `2px solid ${character.accentColor}`, borderRight: `2px solid ${character.accentColor}` }} />
        <div className="absolute bottom-0 left-0 w-6 h-6 pointer-events-none z-10" style={{ borderBottom: `2px solid ${character.accentColor}`, borderLeft: `2px solid ${character.accentColor}` }} />
        <div className="absolute bottom-0 right-0 w-6 h-6 pointer-events-none z-10" style={{ borderBottom: `2px solid ${character.accentColor}`, borderRight: `2px solid ${character.accentColor}` }} />

        {/* Selected checkmark */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute top-2 right-2 z-20 w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: character.accentColor, boxShadow: `0 0 10px ${character.glowColor}` }}
            >
              <Check size={12} className="text-black" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Avatar area */}
        <div className="p-4 pb-3">
          {/* Holographic avatar frame */}
          <div
            className="relative mx-auto w-20 h-20 rounded-xl flex items-center justify-center mb-3"
            style={{
              background: `radial-gradient(ellipse at 40% 30%, ${character.accentColor}30, ${character.iconBg})`,
              border: `1px solid ${character.accentColor}40`,
              boxShadow: isSelected || isHovered
                ? `0 0 20px ${character.glowColor}, inset 0 0 15px ${character.accentColor}15`
                : `inset 0 0 15px ${character.accentColor}10`,
            }}
          >
            {/* Hex grid pattern inside avatar */}
            <div
              className="absolute inset-0 rounded-xl opacity-20"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 25% 25%, ${character.accentColor}40 1px, transparent 1px),
                  radial-gradient(circle at 75% 75%, ${character.accentColor}30 1px, transparent 1px)
                `,
                backgroundSize: '12px 12px',
              }}
            />

            {/* Main icon (large) */}
            <span className="text-4xl z-10 relative" style={{ filter: `drop-shadow(0 0 8px ${character.accentColor})` }}>
              {character.icon}
            </span>

            {/* Cultural symbol (small, bottom-right) */}
            <span
              className="absolute bottom-1 right-1 text-xs z-10"
              style={{ filter: `drop-shadow(0 0 4px ${character.symbolColor})` }}
            >
              {character.culturalSymbol}
            </span>

            {/* Pulsing ring when selected */}
            {(isSelected || isHovered) && (
              <motion.div
                className="absolute inset-0 rounded-xl"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ border: `1px solid ${character.accentColor}`, boxShadow: `0 0 15px ${character.glowColor}` }}
              />
            )}
          </div>

          {/* Character ID tag */}
          <div
            className="text-center mb-1 px-2 py-0.5 rounded mx-auto inline-flex"
            style={{ background: `${character.accentColor}20`, border: `1px solid ${character.accentColor}40` }}
          >
            <span className="text-xs tracking-widest" style={{ color: character.accentColor, fontFamily: 'Be Vietnam Pro, sans-serif' }}>
              {character.initials}
            </span>
          </div>

          {/* Nickname */}
          <div className="text-center mt-1">
            <p className="text-xs text-white/90 italic leading-tight" style={{ fontFamily: 'Be Vietnam Pro, sans-serif' }}>
              {character.nickname}
            </p>
          </div>
        </div>

        {/* Role text */}
        <div
          className="px-3 pb-4 text-center"
          style={{ borderTop: `1px solid ${character.accentColor}20` }}
        >
          <p className="text-[10px] text-white/50 mt-2 leading-tight" style={{ fontFamily: 'Be Vietnam Pro, sans-serif' }}>
            {character.role}
          </p>
        </div>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute -bottom-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
            style={{ width: '200px' }}
          >
            <div
              className="rounded-lg px-3 py-2 text-center"
              style={{
                background: 'rgba(3,2,19,0.95)',
                border: `1px solid ${character.accentColor}60`,
                boxShadow: `0 4px 20px rgba(0,0,0,0.8), 0 0 15px ${character.glowColor}`,
                backdropFilter: 'blur(12px)',
              }}
            >
              <p className="text-[10px] text-white/80 leading-relaxed" style={{ fontFamily: 'Be Vietnam Pro, sans-serif' }}>
                {character.tooltip}
              </p>
            </div>
            {/* Arrow */}
            <div
              className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45"
              style={{ background: `${character.accentColor}60`, border: `1px solid ${character.accentColor}60` }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function CharacterSelectionScreen() {
  const navigate = useNavigate();
  const { setPlayerInfo } = useGame();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [playerName, setPlayerName] = useState('');

  const selectedChar = characters.find(c => c.id === selectedId);
  const canProceed = selectedId !== null && playerName.trim().length > 0;

  const handleConfirm = () => {
    if (!canProceed || !selectedChar) return;
    setPlayerInfo(playerName.trim(), selectedId);
    navigate('/game');
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-start pb-8" style={{ background: '#030213' }}>
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Cyber grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(#22d3ee 1px, transparent 1px),
              linear-gradient(90deg, #22d3ee 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Glowing lotus watermark */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[280px] select-none"
          animate={{ opacity: [0.03, 0.07, 0.03], scale: [1, 1.02, 1], rotate: [0, 3, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          style={{ filter: 'blur(2px)' }}
        >
          🏵️
        </motion.div>

        {/* Radial overlay */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(34,211,238,0.07) 0%, transparent 60%)' }} />

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px rounded-full"
            style={{
              background: '#22d3ee',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 4px #22d3ee',
            }}
            animate={{ opacity: [0, 0.8, 0], y: [0, -60], x: [0, (Math.random() - 0.5) * 30] }}
            transition={{ duration: Math.random() * 6 + 4, repeat: Infinity, delay: Math.random() * 6, ease: 'easeOut' }}
          />
        ))}
      </div>

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-[#22d3ee]/30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-[#22d3ee]/30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-[#22d3ee]/30 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-[#22d3ee]/30 pointer-events-none" />

      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white/60 hover:text-[#22d3ee] transition-all duration-200"
        style={{
          background: 'rgba(34,211,238,0.05)',
          border: '1px solid rgba(34,211,238,0.2)',
          fontFamily: 'Be Vietnam Pro, sans-serif',
        }}
      >
        <ChevronRight size={16} className="rotate-180" />
        Quay lại
      </motion.button>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8"
        >
          {/* Step indicator */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#22d3ee]/50" />
            <span
              className="text-[10px] tracking-[0.3em] text-[#22d3ee]/60 uppercase"
              style={{ fontFamily: 'Be Vietnam Pro, sans-serif' }}
            >
              Bước 2 / Chọn Vai Trò
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#22d3ee]/50" />
          </div>

          <h1
            className="text-4xl md:text-5xl mb-3"
            style={{
              fontFamily: 'Be Vietnam Pro, sans-serif',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #22d3ee 0%, #ffffff 50%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Chọn vai trò lãnh đạo của bạn
          </h1>

          <p
            className="text-sm text-white/40 max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Be Vietnam Pro, sans-serif' }}
          >
            Bạn sẽ dẫn dắt Việt Nam 2045 với tư cách nào?{' '}
            <span className="text-[#22d3ee]/50 italic">
              (Chỉ mang tính hình ảnh – không ảnh hưởng chỉ số hoặc gameplay)
            </span>
          </p>
        </motion.div>

        {/* Character Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10"
          style={{ paddingBottom: '60px' }}
        >
          {characters.map((char, i) => (
            <motion.div
              key={char.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
            >
              <AvatarCard
                character={char}
                isSelected={selectedId === char.id}
                onSelect={() => setSelectedId(char.id)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-xl mx-auto"
          style={{ marginTop: '-40px' }}
        >
          {/* Glassmorphism panel */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: 'rgba(3,2,19,0.8)',
              border: '1px solid rgba(34,211,238,0.2)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 0 40px rgba(34,211,238,0.08), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            {/* Selected character preview */}
            <AnimatePresence mode="wait">
              {selectedChar ? (
                <motion.div
                  key={selectedChar.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 overflow-hidden"
                >
                  <div
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{
                      background: `${selectedChar.accentColor}10`,
                      border: `1px solid ${selectedChar.accentColor}30`,
                    }}
                  >
                    <span className="text-2xl">{selectedChar.icon}</span>
                    <div>
                      <p className="text-xs text-white/40 mb-0.5" style={{ fontFamily: 'Be Vietnam Pro, sans-serif' }}>
                        Đã chọn
                      </p>
                      <p className="text-sm" style={{ color: selectedChar.accentColor, fontFamily: 'Be Vietnam Pro, sans-serif', fontWeight: 600 }}>
                        {selectedChar.initials} {selectedChar.nickname}
                      </p>
                      <p className="text-[10px] text-white/50" style={{ fontFamily: 'Be Vietnam Pro, sans-serif' }}>
                        {selectedChar.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mb-4 flex items-center gap-2 justify-center p-3 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)' }}
                >
                  <User size={14} className="text-white/20" />
                  <p className="text-xs text-white/20 italic" style={{ fontFamily: 'Be Vietnam Pro, sans-serif' }}>
                    Chưa chọn vai trò – hãy click vào một thẻ phía trên
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Name input */}
            <div className="mb-5">
              <label
                className="block text-xs text-[#22d3ee] mb-2 tracking-wider"
                style={{ fontFamily: 'Be Vietnam Pro, sans-serif' }}
              >
                TÊN CỦA BẠN
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={playerName}
                  onChange={e => setPlayerName(e.target.value)}
                  placeholder='"N.V.A" hoặc tên viết tắt'
                  maxLength={30}
                  className="w-full px-4 py-3 rounded-xl text-white placeholder-white/20 outline-none transition-all duration-200"
                  style={{
                    background: 'rgba(34,211,238,0.05)',
                    border: `1px solid ${playerName ? 'rgba(34,211,238,0.5)' : 'rgba(255,255,255,0.1)'}`,
                    fontFamily: 'Be Vietnam Pro, sans-serif',
                    boxShadow: playerName ? '0 0 15px rgba(34,211,238,0.1)' : 'none',
                  }}
                  onFocus={e => {
                    e.target.style.border = '1px solid rgba(34,211,238,0.6)';
                    e.target.style.boxShadow = '0 0 20px rgba(34,211,238,0.15)';
                  }}
                  onBlur={e => {
                    e.target.style.border = `1px solid ${playerName ? 'rgba(34,211,238,0.5)' : 'rgba(255,255,255,0.1)'}`;
                    e.target.style.boxShadow = playerName ? '0 0 15px rgba(34,211,238,0.1)' : 'none';
                  }}
                />
                {playerName && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: '#22d3ee', boxShadow: '0 0 10px rgba(34,211,238,0.5)' }}
                  >
                    <Check size={10} className="text-black" />
                  </motion.div>
                )}
              </div>
            </div>

            {/* Confirm button */}
            <motion.button
              onClick={handleConfirm}
              disabled={!canProceed}
              whileHover={canProceed ? { scale: 1.02 } : {}}
              whileTap={canProceed ? { scale: 0.98 } : {}}
              className="w-full py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300"
              style={{
                background: canProceed
                  ? 'linear-gradient(135deg, #06b6d4, #22d3ee, #06b6d4)'
                  : 'rgba(255,255,255,0.05)',
                border: canProceed
                  ? '1px solid rgba(34,211,238,0.6)'
                  : '1px solid rgba(255,255,255,0.08)',
                color: canProceed ? '#000' : 'rgba(255,255,255,0.2)',
                boxShadow: canProceed
                  ? '0 0 30px rgba(34,211,238,0.4), 0 4px 15px rgba(34,211,238,0.3)'
                  : 'none',
                cursor: canProceed ? 'pointer' : 'not-allowed',
                fontFamily: 'Be Vietnam Pro, sans-serif',
                fontWeight: 700,
                letterSpacing: '0.05em',
              }}
            >
              {canProceed && (
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-lg"
                >
                  ⚡
                </motion.span>
              )}
              <span className="text-sm tracking-wider">
                {canProceed
                  ? 'Xác nhận và bắt đầu ván mới'
                  : 'Chọn vai trò và nhập tên để tiếp tục'}
              </span>
              {canProceed && <ChevronRight size={18} className="text-black/70" />}
            </motion.button>

            {/* Hint row */}
            <div className="flex items-center justify-center gap-4 mt-3">
              <div className="flex items-center gap-1.5">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: selectedId ? '#22d3ee' : 'rgba(255,255,255,0.2)',
                    boxShadow: selectedId ? '0 0 6px #22d3ee' : 'none',
                  }}
                />
                <span className="text-[10px] text-white/30" style={{ fontFamily: 'Be Vietnam Pro, sans-serif' }}>
                  Vai trò
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: playerName ? '#22d3ee' : 'rgba(255,255,255,0.2)',
                    boxShadow: playerName ? '0 0 6px #22d3ee' : 'none',
                  }}
                />
                <span className="text-[10px] text-white/30" style={{ fontFamily: 'Be Vietnam Pro, sans-serif' }}>
                  Tên
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}