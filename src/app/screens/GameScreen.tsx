import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Coins, Users, Activity, Sun, Moon } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { CircularGauge } from '../components/CircularGauge';
import { StabilityMeter } from '../components/StabilityMeter';
import { PolicyCard, Policy } from '../components/PolicyCard';
import { VietnamMap } from '../components/VietnamMap';
import { EventModal, GameEvent } from '../components/EventModal';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ScrollArea } from '../components/ui/scroll-area';
import { useTheme } from 'next-themes';

// Sample policies
const policies: Policy[] = [
  {
    id: 'tech_investment',
    name: 'Đầu tư Công nghệ cao',
    description: 'Xây dựng khu công nghệ cao và trung tâm R&D',
    budgetCost: 200,
    laborCost: 30,
    impact: { T: 15, I: 10, Gap: 5 },
  },
  {
    id: 'agriculture_modernization',
    name: 'Hiện đại hóa Nông nghiệp',
    description: 'Cơ giới hóa và số hóa ngành nông nghiệp',
    budgetCost: 150,
    laborCost: 25,
    impact: { T: 5, P: 12, Gap: -10 },
  },
  {
    id: 'education_reform',
    name: 'Cải cách Giáo dục',
    description: 'Nâng cao chất lượng đào tạo và kỹ năng số',
    budgetCost: 180,
    laborCost: 20,
    impact: { T: 8, I: 12, E: 5 },
  },
  {
    id: 'social_welfare',
    name: 'Phúc lợi Xã hội',
    description: 'Tăng cường an sinh xã hội và phân phối lại',
    budgetCost: 120,
    laborCost: 15,
    impact: { E: 15, Gap: -5 },
  },
  {
    id: 'innovation_hub',
    name: 'Trung tâm Đổi mới Sáng tạo',
    description: 'Xây dựng hệ sinh thái startup và đổi mới',
    budgetCost: 160,
    laborCost: 20,
    impact: { I: 18, T: 8, Gap: 3 },
  },
  {
    id: 'infrastructure',
    name: 'Hạ tầng Số',
    description: 'Phát triển mạng 5G và hạ tầng công nghệ',
    budgetCost: 220,
    laborCost: 35,
    impact: { T: 12, P: 10, Gap: -3 },
  },
];

// Sample events
const sampleEvents: GameEvent[] = [
  {
    id: 'fdi_wave',
    type: 'fixed',
    title: 'Làn sóng FDI',
    icon: '⚠️',
    narrative: 'Các tập đoàn công nghệ lớn muốn đầu tư vào Việt Nam. Họ mang công nghệ cao nhưng đòi hỏi ưu đãi thuế và lao động giá rẻ.',
    moralJustification: 'Vốn ngoại là lực lượng sản xuất hiện đại nhưng có thể tạo quan hệ sản xuất lệ thuộc.',
    choices: [
      {
        label: 'Chấp nhận với điều kiện',
        description: 'Yêu cầu chuyển giao công nghệ và đào tạo',
        impact: { T: 10, I: 5, E: -5, budget: 100 },
      },
      {
        label: 'Từ chối, tự phát triển',
        description: 'Tập trung nguồn lực cho doanh nghiệp nội địa',
        impact: { I: 8, E: 5, T: -3, budget: -50 },
      },
    ],
  },
  {
    id: 'class_unrest',
    type: 'random',
    title: 'Bạo động giai cấp',
    icon: '🚨',
    narrative: 'Khoảng cách thu nhập giữa thành thị và nông thôn gây bất ổn xã hội. Người nông dân yêu cầu chính sách ưu tiên.',
    moralJustification: 'Mâu thuẫn giai cấp là động lực lịch sử nhưng cần điều hoà để tránh tan rã.',
    choices: [
      {
        label: 'Tăng trợ cấp nông thôn',
        description: 'Chi ngân sách lớn cho phúc lợi nông thôn',
        impact: { E: 20, Gap: -15, budget: -200 },
      },
      {
        label: 'Đẩy nhanh CNH nông nghiệp',
        description: 'Đầu tư công nghệ để nâng năng suất',
        impact: { T: 8, P: 10, Gap: -8, budget: -150, labor: -20 },
      },
    ],
  },
];

export function GameScreen() {
  const navigate = useNavigate();
  const { gameState, updateStats, updateResources, addEvent, nextRound, getStability } = useGame();
  const { theme, setTheme } = useTheme();
  const [currentEvent, setCurrentEvent] = useState<GameEvent | null>(null);

  const stability = getStability();

  // Check for game over conditions
  useEffect(() => {
    if (gameState.round > 15) {
      determineEnding();
    } else if (stability < -30) {
      navigate('/ending?type=collapse');
    }
  }, [gameState.round, stability]);

  const determineEnding = () => {
    const { T, P, E, I, Gap } = gameState.stats;
    
    if (T > 80 && P > 75 && E > 70 && Gap < 20) {
      navigate('/ending?type=success');
    } else if (Gap > 60 || E < 30) {
      navigate('/ending?type=inequality');
    } else if (I < 30 && T < 50) {
      navigate('/ending?type=dependency');
    } else {
      navigate('/ending?type=success');
    }
  };

  const handlePolicySelect = (policy: Policy) => {
    if (gameState.budget < policy.budgetCost || gameState.labor < policy.laborCost) {
      addEvent(`❌ Không đủ nguồn lực để áp dụng "${policy.name}"`);
      return;
    }

    updateResources(-policy.budgetCost, -policy.laborCost);
    updateStats(policy.impact);
    addEvent(`✅ Đã áp dụng chính sách: ${policy.name}`);
  };

  const handleEndRound = () => {
    // Random event chance
    if (Math.random() < 0.4 && sampleEvents.length > 0) {
      const randomEvent = sampleEvents[Math.floor(Math.random() * sampleEvents.length)];
      setCurrentEvent(randomEvent);
    } else {
      nextRound();
      addEvent(`🔄 Bắt đầu vòng ${gameState.round + 1}`);
    }
  };

  const handleEventChoice = (choiceIndex: 0 | 1) => {
    if (!currentEvent) return;

    const choice = currentEvent.choices[choiceIndex];
    updateStats(choice.impact);
    if (choice.impact.budget) updateResources(choice.impact.budget, 0);
    if (choice.impact.labor) updateResources(0, choice.impact.labor);
    
    addEvent(`📋 ${currentEvent.title}: ${choice.label}`);
    setCurrentEvent(null);
    nextRound();
  };

  const regions = [
    { id: 'urban', name: 'Đô thị', T: gameState.stats.T + 20, P: gameState.stats.P + 15, color: '#06b6d4' },
    { id: 'industry', name: 'Công nghiệp', T: gameState.stats.T + 10, P: gameState.stats.P + 10, color: '#f97316' },
    { id: 'agriculture', name: 'Nông nghiệp', T: gameState.stats.T - gameState.stats.Gap, P: gameState.stats.P - 10, color: '#10b981' },
    { id: 'rnd', name: 'R&D', T: gameState.stats.T + 15, P: gameState.stats.P, color: '#f59e0b' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">CNH-HĐH VN 2045</h1>
              {gameState.playerName && (
                <span className="text-sm text-[#22d3ee]/70 hidden sm:inline" style={{ fontFamily: 'Be Vietnam Pro, sans-serif' }}>
                  — {gameState.playerName}
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-background/50">
                <Activity size={16} className="text-[#22d3ee]" />
                <span>Vòng: {gameState.round}/15</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-background/50">
                <Coins size={16} className="text-[#f59e0b]" />
                <span>{gameState.budget}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-background/50">
                <Users size={16} className="text-[#06b6d4]" />
                <span>{gameState.labor}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg hover:bg-accent"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Button
              onClick={handleEndRound}
              className="bg-gradient-to-r from-[#dc2626] to-[#f59e0b] hover:from-[#f59e0b] hover:to-[#dc2626]"
            >
              Kết thúc vòng
            </Button>
          </div>
        </div>
      </div>

      {/* Main content - 3 column layout */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Stats */}
          <div className="col-span-12 lg:col-span-3 space-y-4">
            <div className="bg-card/50 backdrop-blur-lg border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-4">Chỉ số Chính</h3>
              <div className="grid grid-cols-2 gap-3">
                <CircularGauge
                  value={gameState.stats.T}
                  label="Công nghệ (T)"
                  color="#06b6d4"
                  size={100}
                />
                <CircularGauge
                  value={gameState.stats.P}
                  label="Năng suất (P)"
                  color="#10b981"
                  size={100}
                />
                <CircularGauge
                  value={gameState.stats.E}
                  label="Bình đẳng (E)"
                  color="#f59e0b"
                  size={100}
                  warning={gameState.stats.E < 30}
                />
                <CircularGauge
                  value={gameState.stats.I}
                  label="Đổi mới (I)"
                  color="#f97316"
                  size={100}
                />
              </div>
            </div>

            <StabilityMeter stability={stability} gap={gameState.stats.Gap} />
          </div>

          {/* Center - Map */}
          <div className="col-span-12 lg:col-span-6">
            <div className="bg-card/50 backdrop-blur-lg border border-border rounded-lg p-4 h-full">
              <h3 className="font-semibold mb-4">Bản đồ Việt Nam</h3>
              <VietnamMap regions={regions} gap={gameState.stats.Gap} />
            </div>
          </div>

          {/* Right Sidebar - Policies & Events */}
          <div className="col-span-12 lg:col-span-3">
            <div className="bg-card/50 backdrop-blur-lg border border-border rounded-lg p-4">
              <Tabs defaultValue="policies">
                <TabsList className="w-full">
                  <TabsTrigger value="policies" className="flex-1">Chính sách</TabsTrigger>
                  <TabsTrigger value="events" className="flex-1">Nhật ký</TabsTrigger>
                </TabsList>

                <TabsContent value="policies">
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-3">
                      {policies.map(policy => (
                        <PolicyCard
                          key={policy.id}
                          policy={policy}
                          onSelect={handlePolicySelect}
                          disabled={gameState.budget < policy.budgetCost || gameState.labor < policy.laborCost}
                        />
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="events">
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-2">
                      {gameState.eventLog.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          Chưa có sự kiện nào
                        </p>
                      ) : (
                        gameState.eventLog.map((event, index) => (
                          <div
                            key={index}
                            className="p-3 rounded-lg bg-background/50 border border-border text-sm"
                          >
                            <div className="text-xs text-muted-foreground mb-1">
                              Vòng {event.round}
                            </div>
                            <div>{event.message}</div>
                          </div>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      {/* Event Modal */}
      {currentEvent && (
        <EventModal
          event={currentEvent}
          onChoice={handleEventChoice}
          onClose={() => setCurrentEvent(null)}
        />
      )}
    </div>
  );
}