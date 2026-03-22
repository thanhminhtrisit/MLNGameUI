import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { motion } from 'motion/react';
import { Home, RotateCcw } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { Button } from '../components/ui/button';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';

interface EndingType {
  type: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  description: string;
  critique: string;
}

const endings: Record<string, EndingType> = {
  success: {
    type: 'success',
    title: 'CNH-HĐH Thành công',
    subtitle: 'Việt Nam 2045 - Mô hình XHCN số',
    icon: '🎉',
    color: '#10b981',
    description: 'Việt Nam đã thành công cân bằng phát triển Lực lượng sản xuất (công nghệ, năng suất, đổi mới) với điều chỉnh Quan hệ sản xuất (bình đẳng, thu hẹp khoảng cách). Xã hội chủ nghĩa số được xây dựng vững chắc.',
    critique: 'Phát triển LLSX phải gắn với điều chỉnh QHSX. Công nghệ cao không tự động mang lại công bằng xã hội - cần chính sách phân phối lại và đầu tư cho khu vực yếu thế.',
  },
  inequality: {
    type: 'inequality',
    title: 'Phát triển không đồng đều',
    subtitle: 'Đứt gãy công nghệ - Mâu thuẫn giai cấp',
    icon: '⚠️',
    color: '#f97316',
    description: 'Khoảng cách công nghệ giữa đô thị và nông thôn quá lớn. Mâu thuẫn giai cấp gia tăng, dẫn đến bất ổn xã hội và phát triển méo mó.',
    critique: 'Đây là hậu quả của việc chỉ tập trung vào LLSX mà bỏ qua QHSX. Khi công nghệ chỉ tập trung ở một nhóm nhỏ, mâu thuẫn giai cấp trở nên gay gắt và có thể làm tan rã hệ thống.',
  },
  dependency: {
    type: 'dependency',
    title: 'Bẫy lệ thuộc ngoại lực',
    subtitle: 'Thiếu tự chủ công nghệ',
    icon: '📉',
    color: '#dc2626',
    description: 'Việt Nam phụ thuộc quá nhiều vào FDI và công nghệ nước ngoài. Thiếu năng lực đổi mới nội sinh, trở thành nước gia công cho các tập đoàn đa quốc gia.',
    critique: 'Vốn ngoại và công nghệ nhập khẩu là con dao hai lưỡi. Không xây dựng được năng lực tự chủ sẽ dẫn đến quan hệ sản xuất lệ thuộc, mất chủ quyền kinh tế.',
  },
  collapse: {
    type: 'collapse',
    title: 'Sụp đổ hệ thống',
    subtitle: 'Mất ổn định toàn diện',
    icon: '🚨',
    color: '#ef4444',
    description: 'Mâu thuẫn giữa LLSX và QHSX trở nên bùng nổ. Hệ thống chính trị-xã hội sụp đổ do không điều chỉnh kịp thời.',
    critique: 'Khi LLSX phát triển mà QHSX không được điều chỉnh phù hợp, mâu thuẫn sẽ tích tụ và bùng nổ. Đây là quy luật lịch sử mà mọi chế độ kinh tế-xã hội đều phải đối mặt.',
  },
};

export function EndingScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { gameState, resetGame } = useGame();
  const [endingData, setEndingData] = useState<EndingType>(endings.success);

  useEffect(() => {
    const type = searchParams.get('type') || 'success';
    setEndingData(endings[type] || endings.success);
  }, [searchParams]);

  const radarData = [
    { stat: 'Công nghệ (T)', value: gameState.stats.T, fullMark: 100 },
    { stat: 'Năng suất (P)', value: gameState.stats.P, fullMark: 100 },
    { stat: 'Bình đẳng (E)', value: gameState.stats.E, fullMark: 100 },
    { stat: 'Đổi mới (I)', value: gameState.stats.I, fullMark: 100 },
    { stat: 'Ổn định', value: Math.max(0, gameState.stats.E * 0.7 - gameState.stats.Gap * 0.3 + 50), fullMark: 100 },
  ];

  const handlePlayAgain = () => {
    resetGame();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div
            className="text-center mb-12 p-8 rounded-2xl border-2"
            style={{
              backgroundColor: `${endingData.color}10`,
              borderColor: endingData.color,
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="text-8xl mb-4"
            >
              {endingData.icon}
            </motion.div>
            <h1 className="text-4xl font-bold mb-2">{endingData.title}</h1>
            <p className="text-xl text-muted-foreground">{endingData.subtitle}</p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Radar Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <h3 className="font-semibold mb-4 text-center">Phân tích Chỉ số Cuối cùng</h3>
              <div className="flex justify-center">
                <RadarChart width={350} height={350} data={radarData}>
                  <PolarGrid stroke="currentColor" className="text-border" />
                  <PolarAngleAxis dataKey="stat" tick={{ fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                  <Radar
                    name="Chỉ số"
                    dataKey="value"
                    stroke={endingData.color}
                    fill={endingData.color}
                    fillOpacity={0.3}
                  />
                  <Legend />
                </RadarChart>
              </div>
            </motion.div>

            {/* Stats Table */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <h3 className="font-semibold mb-4">Thống kê Chi tiết</h3>
              <div className="space-y-3">
                <div className="flex justify-between p-3 rounded-lg bg-background">
                  <span>Vòng hoàn thành:</span>
                  <span className="font-bold">{gameState.round}/15</span>
                </div>
                <div className="flex justify-between p-3 rounded-lg bg-background">
                  <span>Công nghệ (T):</span>
                  <span className="font-bold text-[#06b6d4]">{gameState.stats.T}</span>
                </div>
                <div className="flex justify-between p-3 rounded-lg bg-background">
                  <span>Năng suất (P):</span>
                  <span className="font-bold text-[#10b981]">{gameState.stats.P}</span>
                </div>
                <div className="flex justify-between p-3 rounded-lg bg-background">
                  <span>Bình đẳng (E):</span>
                  <span className="font-bold text-[#f59e0b]">{gameState.stats.E}</span>
                </div>
                <div className="flex justify-between p-3 rounded-lg bg-background">
                  <span>Đổi mới (I):</span>
                  <span className="font-bold text-[#f97316]">{gameState.stats.I}</span>
                </div>
                <div className="flex justify-between p-3 rounded-lg bg-background">
                  <span>Khoảng cách Công nghệ:</span>
                  <span className="font-bold text-red-500">{gameState.stats.Gap}</span>
                </div>
                <div className="flex justify-between p-3 rounded-lg bg-background">
                  <span>Ngân sách còn lại:</span>
                  <span className="font-bold">{gameState.budget}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-card border border-border rounded-xl p-6 mb-8"
          >
            <h3 className="font-semibold mb-3">Mô tả Kết cục</h3>
            <p className="leading-relaxed mb-6">{endingData.description}</p>

            <div className="bg-[#06b6d4]/10 border border-[#06b6d4]/30 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-[#06b6d4] mb-2">
                PHÂN TÍCH MÁC-LÊNIN
              </h4>
              <p className="text-sm italic leading-relaxed">{endingData.critique}</p>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4 justify-center"
          >
            <Button
              onClick={handlePlayAgain}
              size="lg"
              className="bg-gradient-to-r from-[#06b6d4] to-[#22d3ee] hover:from-[#22d3ee] hover:to-[#06b6d4]"
            >
              <RotateCcw className="mr-2" size={20} />
              Chơi lại
            </Button>
            <Button
              onClick={() => navigate('/')}
              size="lg"
              variant="outline"
            >
              <Home className="mr-2" size={20} />
              Về Menu
            </Button>
          </motion.div>

          {/* Footer quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-12 text-sm text-muted-foreground italic"
          >
            "Lực lượng sản xuất quyết định quan hệ sản xuất, <br />
            nhưng quan hệ sản xuất phải được điều chỉnh để phù hợp với LLSX"
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
