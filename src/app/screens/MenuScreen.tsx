import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Play, BookOpen, Info, Sun, Moon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useTheme } from 'next-themes';

export function MenuScreen() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#030213] via-[#0a1628] to-[#030213]">
        {/* Cyber grid effect */}
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(#22d3ee 1px, transparent 1px),
              linear-gradient(90deg, #22d3ee 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#22d3ee] rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: Math.random(),
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [null, Math.random(), 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Theme toggle */}
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="absolute top-6 right-6 p-3 rounded-lg bg-[var(--glass-bg)] backdrop-blur-lg border border-[var(--glass-border)] hover:border-[#22d3ee] transition-all z-10"
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-4xl mx-auto px-6"
      >
        {/* Logo/Title area with Vietnamese cultural elements */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="mb-12"
        >
          {/* Stylized Lotus Icon */}
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-8xl mb-6"
          >
            🏵️
          </motion.div>

          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-[#22d3ee] via-[#dc2626] to-[#f59e0b] bg-clip-text text-transparent">
            CNH-HĐH VIỆT NAM 2045
          </h1>
          
          <p className="text-xl text-[#22d3ee] mb-2" style={{ fontFamily: 'Be Vietnam Pro, sans-serif' }}>
            Digital Disruption: Vietnam 2045
          </p>
          
          <div className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Mô phỏng chính sách kinh tế vĩ mô dựa trên Kinh tế chính trị Mác-Lênin
          </div>
        </motion.div>

        {/* Menu buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-4 max-w-md mx-auto"
        >
          <Button
            onClick={() => navigate('/character-select')}
            className="w-full h-14 text-lg bg-gradient-to-r from-[#06b6d4] to-[#22d3ee] hover:from-[#22d3ee] hover:to-[#06b6d4] text-white shadow-lg shadow-[#22d3ee]/30"
          >
            <Play className="mr-2" size={20} />
            Bắt đầu ván mới
          </Button>

          <Button
            onClick={() => navigate('/game')}
            variant="outline"
            className="w-full h-12 border-[#22d3ee] text-foreground hover:bg-[#22d3ee]/10"
          >
            Tiếp tục
          </Button>

          <Button
            onClick={() => navigate('/guide')}
            variant="outline"
            className="w-full h-12 border-[#10b981] text-foreground hover:bg-[#10b981]/10"
          >
            <BookOpen className="mr-2" size={18} />
            Hướng dẫn chơi
          </Button>

          <Button
            onClick={() => navigate('/theory')}
            variant="outline"
            className="w-full h-12 border-[#dc2626] text-foreground hover:bg-[#dc2626]/10"
          >
            <Info className="mr-2" size={18} />
            Lý luận Mác-Lênin
          </Button>

          {/* Admin access */}
          <button
            onClick={() => navigate('/admin')}
            className="w-full h-9 text-xs rounded-lg transition-all hover:opacity-80 mt-2"
            style={{
              background: 'rgba(220,38,38,0.06)',
              border: '1px solid rgba(220,38,38,0.2)',
              color: 'rgba(220,38,38,0.6)',
              fontFamily: 'Be Vietnam Pro, sans-serif',
            }}
          >
            🛡️ Giáo viên / Admin Dashboard
          </button>
        </motion.div>

        {/* Footer tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-xs text-muted-foreground italic"
        >
          "Phát triển Lực lượng sản xuất phải gắn với điều chỉnh Quan hệ sản xuất"
        </motion.div>
      </motion.div>

      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-[#22d3ee]/30" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-[#22d3ee]/30" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-[#22d3ee]/30" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-[#22d3ee]/30" />
    </div>
  );
}