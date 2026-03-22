import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Coins, Users, Activity, Sun, Moon } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { CircularGauge } from '../components/CircularGauge';
import { StabilityMeter } from '../components/StabilityMeter';
import { PolicyCard, Policy } from '../components/PolicyCard';
import { VietnamMap } from '../components/VietnamMap';
import { EventModal } from '../components/EventModal';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ScrollArea } from '../components/ui/scroll-area';
import { useTheme } from 'next-themes';
import { GameEvent, getFixedEvent, getRandomEvent } from '../data/events';

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

export function GameScreen() {
  const navigate = useNavigate();
  const {
    gameState,
    updateStats,
    updateResources,
    addEvent,
    nextRound,
    getStability,
    setPersistentPenalty,
    updateRegionTech,
  } = useGame();
  const { theme, setTheme } = useTheme();

  const [usedEventIds, setUsedEventIds] = useState<string[]>([]);
  const [currentEvent, setCurrentEvent] = useState<GameEvent | null>(null);
  const [eventPhase, setEventPhase] = useState<'event' | 'policy' | null>(null);
  const [prevStats, setPrevStats] = useState(gameState.stats);

  const stability = getStability();

  // ── Determine ending at round 15 ──────────────────────────────────────────

  const determineEnding = async () => {
    const { T, P, E, I, Gap } = gameState.stats;
    let endingType: string;

    if (T >= 80 && I >= 60 && E >= 65 && Gap <= 25) {
      endingType = 'success';
    } else if (T >= 70 && (Gap >= 50 || E < 40)) {
      endingType = 'inequality';
    } else if (P >= 70 && I < 30) {
      endingType = 'dependency';
    } else {
      endingType = 'inequality';
    }

    const apiUrl = (import.meta as any).env?.VITE_API_URL;
    if (apiUrl) {
      try {
        await fetch(`${apiUrl}/results`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            playerName: gameState.playerName,
            selectedCharacter: gameState.selectedCharacter,
            endingType,
            stats: gameState.stats,
            round: gameState.round,
            historyLog: gameState.historyLog,
          }),
        });
      } catch {
        // Không block navigation nếu API lỗi
      }
    }

    navigate(`/ending?type=${endingType}`);
  };

  // ── Phase 1: Nhấn "Kết thúc vòng" lần đầu (eventPhase === null) ──────────

  const handleEndRound = () => {
    const snapshot = gameState.stats;
    setPrevStats(snapshot);

    const fixed = getFixedEvent(gameState.round);
    if (fixed) {
      setCurrentEvent(fixed);
      setEventPhase('event');
      return;
    }

    const random = getRandomEvent(gameState.stats, gameState.round, prevStats, usedEventIds);
    if (random) {
      setCurrentEvent(random);
      setEventPhase('event');
      return;
    }

    setEventPhase('policy');
  };

  // ── Phase 2: Xử lý lựa chọn event ────────────────────────────────────────

  const handleEventChoice = (choiceIndex: 0 | 1) => {
    if (!currentEvent) return;

    const choice = currentEvent.choices[choiceIndex];
    const { budget, labor, persistentPenalty: penalty, tUrban, tAgri, ...statsImpact } = choice.impact;

    // Áp dụng delta stats (T, P, E, I, Gap)
    const hasStatsDelta = Object.values(statsImpact).some((v) => v !== undefined);
    if (hasStatsDelta) updateStats(statsImpact);

    // Áp dụng budget/labor
    if (budget) updateResources(budget, 0);
    if (labor) updateResources(0, labor);

    // Xử lý đặc biệt: persistentPenalty
    if (penalty !== undefined) setPersistentPenalty(penalty);

    // Xử lý đặc biệt: tUrban / tAgri
    if (tUrban !== undefined || tAgri !== undefined) {
      updateRegionTech(tUrban ?? 0, tAgri ?? 0);
    }

    addEvent(`📋 ${currentEvent.title}: ${choice.label}`);
    setUsedEventIds((prev: string[]) => [...prev, currentEvent.id]);
    setCurrentEvent(null);
    setEventPhase('policy');
  };

  // ── Phase 3: Nhấn "Kết thúc vòng" ở policy phase ─────────────────────────

  const handleEndRoundPolicy = () => {
    const S = gameState.stats.E * 0.7 - gameState.stats.Gap * 0.3;

    if (S < -20) {
      navigate('/ending?type=collapse');
      return;
    }

    if (gameState.round >= 15) {
      determineEnding();
      return;
    }

    nextRound();
    addEvent(`🔄 Bắt đầu vòng ${gameState.round + 1}`);
    setPrevStats(gameState.stats);
    setEventPhase(null);
  };

  // ── Policy select ─────────────────────────────────────────────────────────

  const handlePolicySelect = (policy: Policy) => {
    if (gameState.budget < policy.budgetCost || gameState.labor < policy.laborCost) {
      addEvent(`❌ Không đủ nguồn lực để áp dụng "${policy.name}"`);
      return;
    }

    updateResources(-policy.budgetCost, -policy.laborCost);
    updateStats(policy.impact);
    addEvent(`✅ Đã áp dụng chính sách: ${policy.name}`);
  };

  // ── Regions for map ───────────────────────────────────────────────────────

  const regions = [
    { id: 'urban', name: 'Đô thị', T: gameState.stats.T + 20, P: gameState.stats.P + 15, color: '#06b6d4' },
    { id: 'industry', name: 'Công nghiệp', T: gameState.stats.T + 10, P: gameState.stats.P + 10, color: '#f97316' },
    { id: 'agriculture', name: 'Nông nghiệp', T: gameState.stats.T - gameState.stats.Gap, P: gameState.stats.P - 10, color: '#10b981' },
    { id: 'rnd', name: 'R&D', T: gameState.stats.T + 15, P: gameState.stats.P, color: '#f59e0b' },
  ];

  // ── Derived UI values ─────────────────────────────────────────────────────

  const stabilityColor = stability > 0 ? 'text-green-400' : 'text-red-400';

  const endRoundButton =
    eventPhase === null ? (
      <Button
        onClick={handleEndRound}
        className="bg-linear-to-r from-[#dc2626] to-[#f59e0b] hover:from-[#f59e0b] hover:to-[#dc2626]"
      >
        Kết thúc vòng
      </Button>
    ) : eventPhase === 'policy' ? (
      <Button
        onClick={handleEndRoundPolicy}
        className="bg-linear-to-r from-[#dc2626] to-[#f59e0b] hover:from-[#f59e0b] hover:to-[#dc2626]"
      >
        Kết thúc vòng
      </Button>
    ) : null;

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
                <span>⚡ Vòng {gameState.round}/15</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-background/50">
                <Coins size={16} className="text-[#f59e0b]" />
                <span>{gameState.budget}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-background/50">
                <Users size={16} className="text-[#06b6d4]" />
                <span>{gameState.labor}</span>
              </div>
              <div className={`px-3 py-1 rounded-lg bg-background/50 font-semibold ${stabilityColor}`}>
                S: {stability}
              </div>
              {gameState.persistentPenalty > 0 && (
                <div className="px-3 py-1 rounded-lg bg-red-900/30 border border-red-500/40 text-red-400 text-xs">
                  💸 Bẫy bản quyền: -{gameState.persistentPenalty}/vòng
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg hover:bg-accent"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            {endRoundButton}
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
                          disabled={
                            eventPhase !== 'policy' ||
                            gameState.budget < policy.budgetCost ||
                            gameState.labor < policy.laborCost
                          }
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
      {currentEvent && eventPhase === 'event' && (
        <EventModal
          event={currentEvent as any}
          onChoice={handleEventChoice}
          onClose={() => {
            setCurrentEvent(null);
            setEventPhase('policy');
          }}
        />
      )}
    </div>
  );
}
