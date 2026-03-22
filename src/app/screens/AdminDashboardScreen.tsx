import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Download,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Eye,
  Trash2,
  Users,
  BarChart3,
  Trophy,
  AlertTriangle,
  ShieldAlert,
} from 'lucide-react';
import { PlayerDetailModal, PlayerRecord } from '../components/PlayerDetailModal';

// ─── Mock Data ───────────────────────────────────────────────────────────────
const MOCK_PLAYERS: PlayerRecord[] = [
  {
    id: '1',
    name: 'Nguyễn Văn An',
    avatar: '👨‍💼',
    characterId: 'ntd',
    currentRound: 15,
    completedRound: 15,
    endingType: 'success',
    autoScore: 88,
    stability: 42,
    playTime: '28:14',
    status: 'completed',
    stats: { T: 78, P: 82, E: 75, I: 70, Gap: 22 },
    budget: 340,
    marxComment:
      'Người chơi đã cân bằng xuất sắc giữa LLSX và QHSX. Việc đầu tư vào công nghệ (T=78) đồng thời duy trì bình đẳng (E=75) thể hiện nhận thức đúng đắn về biện chứng pháp Mác-xít: LLSX và QHSX phải phát triển hài hòa. Khoảng cách công nghệ thấp (Gap=22) cho thấy chính sách phân phối lại đã hiệu quả.',
  },
  {
    id: '2',
    name: 'Trần Thị Bình',
    avatar: '👩‍🔬',
    characterId: 'tts',
    currentRound: 15,
    completedRound: 12,
    endingType: 'inequality',
    autoScore: 61,
    stability: -8,
    playTime: '35:02',
    status: 'completed',
    stats: { T: 91, P: 88, E: 40, I: 85, Gap: 68 },
    budget: 120,
    marxComment:
      'Đây là trường hợp điển hình của "phát triển LLSX không đồng đều" theo lý luận Mác-Lênin. Công nghệ và đổi mới rất cao (T=91, I=85) nhưng Bình đẳng (E=40) và Khoảng cách (Gap=68) ở mức báo động. QHSX chưa được điều chỉnh phù hợp với trình độ LLSX đã dẫn đến mâu thuẫn giai cấp gay gắt.',
  },
  {
    id: '3',
    name: 'Lê Hoàng Dũng',
    avatar: '👨‍🏫',
    characterId: 'nhk',
    currentRound: 8,
    completedRound: 8,
    endingType: 'playing',
    autoScore: 55,
    stability: 12,
    playTime: '19:47',
    status: 'playing',
    stats: { T: 55, P: 60, E: 62, I: 48, Gap: 35 },
    budget: 680,
    marxComment:
      'Người chơi đang trong giai đoạn phát triển cân bằng tương đối. Cần chú ý tăng cường T và I để tránh tụt hậu công nghệ trong các vòng sau, đồng thời giữ vững E và kiểm soát Gap.',
  },
  {
    id: '4',
    name: 'Phạm Ngọc Châu',
    avatar: '👩‍💻',
    characterId: 'ntd',
    currentRound: 15,
    completedRound: 11,
    endingType: 'collapse',
    autoScore: 23,
    stability: -55,
    playTime: '22:18',
    status: 'gameover',
    stats: { T: 30, P: 25, E: 20, I: 18, Gap: 90 },
    budget: 0,
    marxComment:
      'Đây là ví dụ kinh điển về "Sụp đổ hệ thống" theo quy luật mâu thuẫn biện chứng. Khi LLSX suy thoái (T=30, P=25) trong khi QHSX mất cân bằng hoàn toàn (Gap=90, E=20), hệ thống tất yếu sụp đổ. Ngân sách cạn kiệt cho thấy quản lý nguồn lực kém hiệu quả.',
  },
  {
    id: '5',
    name: 'Vũ Minh Hà',
    avatar: '👨‍🎓',
    characterId: 'tts',
    currentRound: 15,
    completedRound: 15,
    endingType: 'dependency',
    autoScore: 47,
    stability: 5,
    playTime: '31:55',
    status: 'completed',
    stats: { T: 65, P: 58, E: 52, I: 28, Gap: 44 },
    budget: 210,
    marxComment:
      'Bẫy lệ thuộc xuất hiện khi Đổi mới (I=28) quá thấp so với Công nghệ nhập khẩu. Thiếu năng lực tự chủ công nghệ nội sinh — đây chính là "lệ thuộc QHSX vào LLSX ngoại lai" mà Lênin đã cảnh báo trong lý thuyết về chủ nghĩa đế quốc.',
  },
  {
    id: '6',
    name: 'Đặng Thu Hương',
    avatar: '👩‍🎨',
    characterId: 'nhk',
    currentRound: 15,
    completedRound: 15,
    endingType: 'success',
    autoScore: 92,
    stability: 51,
    playTime: '41:33',
    status: 'completed',
    stats: { T: 85, P: 79, E: 88, I: 76, Gap: 18 },
    budget: 480,
    marxComment:
      'Thành tích xuất sắc nhất lớp! Người chơi đã chứng minh rằng Bình đẳng cao (E=88) không cản trở mà còn thúc đẩy Công nghệ (T=85). Đây là minh chứng sống động cho luận điểm "QHSX tiến bộ thúc đẩy LLSX phát triển" của Marx.',
  },
  {
    id: '7',
    name: 'Hoàng Tuấn Kiệt',
    avatar: '👨‍🔧',
    characterId: 'ntd',
    currentRound: 5,
    completedRound: 5,
    endingType: 'playing',
    autoScore: 44,
    stability: 8,
    playTime: '11:20',
    status: 'playing',
    stats: { T: 48, P: 52, E: 55, I: 38, Gap: 40 },
    budget: 820,
    marxComment:
      'Còn sớm để đánh giá. Người chơi đang thận trọng trong chi tiêu ngân sách, dẫn đến phát triển chậm. Cần tăng tốc đầu tư vào I và T để tránh tụt hậu.',
  },
  {
    id: '8',
    name: 'Ngô Thanh Lan',
    avatar: '👩‍⚕️',
    characterId: 'tts',
    currentRound: 15,
    completedRound: 14,
    endingType: 'inequality',
    autoScore: 58,
    stability: -15,
    playTime: '27:44',
    status: 'completed',
    stats: { T: 80, P: 75, E: 38, I: 72, Gap: 72 },
    budget: 95,
    marxComment:
      'Mô hình "tăng trưởng nóng không bền vững" cổ điển. LLSX phát triển mạnh (T=80, I=72) nhưng khoảng cách công nghệ đô thị-nông thôn quá lớn (Gap=72) tạo ra mâu thuẫn giai cấp không thể hòa giải bằng QHSX hiện tại.',
  },
  {
    id: '9',
    name: 'Bùi Đình Nam',
    avatar: '👨‍💼',
    characterId: 'nhk',
    currentRound: 15,
    completedRound: 15,
    endingType: 'success',
    autoScore: 79,
    stability: 35,
    playTime: '33:07',
    status: 'completed',
    stats: { T: 72, P: 68, E: 71, I: 65, Gap: 28 },
    budget: 290,
    marxComment:
      'Chiến lược phát triển đồng đều, cân bằng. Không có chỉ số nào quá xuất sắc nhưng cũng không có điểm yếu nghiêm trọng. Đây là ví dụ về "Phát triển Xã hội Chủ nghĩa ổn định" theo lý luận của Lênin về NEP.',
  },
  {
    id: '10',
    name: 'Lý Thị Phương',
    avatar: '👩‍🏫',
    characterId: 'tts',
    currentRound: 15,
    completedRound: 10,
    endingType: 'collapse',
    autoScore: 19,
    stability: -72,
    playTime: '18:55',
    status: 'gameover',
    stats: { T: 20, P: 18, E: 15, I: 22, Gap: 95 },
    budget: 0,
    marxComment:
      'Trường hợp sụp đổ nhanh nhất. Gap=95 là mức khoảng cách công nghệ không thể khắc phục. Khi mâu thuẫn giữa LLSX và QHSX đạt đỉnh điểm mà không có cơ chế điều chỉnh, cách mạng (sụp đổ hệ thống) là tất yếu — đây chính là quy luật lịch sử Marx đã chỉ ra.',
  },
  {
    id: '11',
    name: 'Đinh Quốc Thắng',
    avatar: '👨‍💻',
    characterId: 'nhk',
    currentRound: 13,
    completedRound: 13,
    endingType: 'playing',
    autoScore: 67,
    stability: 21,
    playTime: '29:40',
    status: 'playing',
    stats: { T: 68, P: 71, E: 65, I: 62, Gap: 31 },
    budget: 380,
    marxComment:
      'Đang trên đà phát triển tốt. Nếu duy trì được cân bằng T-E và kiểm soát Gap, khả năng đạt ending thành công rất cao trong 2 vòng còn lại.',
  },
  {
    id: '12',
    name: 'Trương Mỹ Linh',
    avatar: '👩‍🔬',
    characterId: 'ntd',
    currentRound: 15,
    completedRound: 15,
    endingType: 'dependency',
    autoScore: 52,
    stability: 3,
    playTime: '38:22',
    status: 'completed',
    stats: { T: 70, P: 63, E: 58, I: 24, Gap: 48 },
    budget: 175,
    marxComment:
      'Đổi mới thấp (I=24) trong khi công nghệ nhập khẩu cao (T=70) — đây là bẫy lệ thuộc kinh điển. Theo lý thuyết phụ thuộc (Dependency Theory) kết hợp với Mác-Lênin, một nước không thể phát triển bền vững nếu không xây dựng được năng lực nội sinh.',
  },
];

// ─── Types ────────────────────────────────────────────────────────────────────
type SortKey =
  | 'name'
  | 'completedRound'
  | 'endingType'
  | 'autoScore'
  | 'stability'
  | 'playTime'
  | 'status';
type SortDir = 'asc' | 'desc';
type EndingFilter =
  | 'all'
  | 'success'
  | 'inequality'
  | 'dependency'
  | 'collapse'
  | 'playing';

// ─── Sub-components ───────────────────────────────────────────────────────────
const ENDING_META: Record<string, { label: string; color: string; bg: string; border: string }> = {
  success: {
    label: 'CNH-HĐH Thành công',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.15)',
    border: 'rgba(16,185,129,0.35)',
  },
  inequality: {
    label: 'Phát triển không đồng đều',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.15)',
    border: 'rgba(245,158,11,0.35)',
  },
  dependency: {
    label: 'Bẫy lệ thuộc',
    color: '#f97316',
    bg: 'rgba(249,115,22,0.15)',
    border: 'rgba(249,115,22,0.35)',
  },
  collapse: {
    label: 'Sụp đổ hệ thống',
    color: '#ef4444',
    bg: 'rgba(239,68,68,0.15)',
    border: 'rgba(239,68,68,0.35)',
  },
  playing: {
    label: 'Đang chơi',
    color: '#22d3ee',
    bg: 'rgba(34,211,238,0.15)',
    border: 'rgba(34,211,238,0.35)',
  },
};

const STATUS_META: Record<string, { label: string; color: string; dot: string }> = {
  playing: { label: 'Đang chơi', color: '#22d3ee', dot: '#22d3ee' },
  completed: { label: 'Hoàn thành', color: '#10b981', dot: '#10b981' },
  gameover: { label: 'Game Over', color: '#ef4444', dot: '#ef4444' },
};

function EndingBadge({ type }: { type: string }) {
  const meta = ENDING_META[type] || ENDING_META.playing;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs whitespace-nowrap"
      style={{ background: meta.bg, border: `1px solid ${meta.border}`, color: meta.color }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: meta.color }}
      />
      {meta.label}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const meta = STATUS_META[status] || STATUS_META.playing;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs"
      style={{
        background: `${meta.color}15`,
        border: `1px solid ${meta.color}35`,
        color: meta.color,
      }}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${status === 'playing' ? 'animate-pulse' : ''}`}
        style={{ background: meta.dot }}
      />
      {meta.label}
    </span>
  );
}

function ScoreBar({ score, max = 100 }: { score: number; max?: number }) {
  const pct = Math.max(0, Math.min(100, (score / max) * 100));
  const color = pct >= 70 ? '#10b981' : pct >= 45 ? '#f59e0b' : '#ef4444';
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm w-8 text-right" style={{ color }}>
        {score}
      </span>
      <div
        className="flex-1 h-1.5 rounded-full overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.08)', minWidth: 48 }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${color}80, ${color})`,
            boxShadow: `0 0 6px ${color}60`,
          }}
        />
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
  sub?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl p-5 border flex-1 min-w-0"
      style={{
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(12px)',
        borderColor: `${color}30`,
        boxShadow: `0 0 20px ${color}10`,
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background: `${color}20` }}
        >
          <span style={{ color }}>{icon}</span>
        </div>
        {sub && (
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${color}15`, color }}>
            {sub}
          </span>
        )}
      </div>
      <div className="text-2xl mb-1" style={{ color, fontFamily: 'Be Vietnam Pro, sans-serif' }}>
        {value}
      </div>
      <div className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
        {label}
      </div>
    </motion.div>
  );
}

function SortIcon({ col, active, dir }: { col: string; active: boolean; dir: SortDir }) {
  if (!active) return <ChevronsUpDown size={12} className="opacity-30" />;
  return dir === 'asc' ? (
    <ChevronUp size={12} style={{ color: '#22d3ee' }} />
  ) : (
    <ChevronDown size={12} style={{ color: '#22d3ee' }} />
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export function AdminDashboardScreen() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [endingFilter, setEndingFilter] = useState<EndingFilter>('all');
  const [sortKey, setSortKey] = useState<SortKey>('autoScore');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerRecord | null>(null);
  const [players, setPlayers] = useState<PlayerRecord[]>(MOCK_PLAYERS);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [exportFlash, setExportFlash] = useState(false);

  // ─── Derived stats ───
  const totalPlayers = players.length;
  const avgScore =
    players.length > 0
      ? Math.round(players.reduce((s, p) => s + p.autoScore, 0) / players.length)
      : 0;
  const successCount = players.filter((p) => p.endingType === 'success').length;
  const gameoverCount = players.filter((p) => p.status === 'gameover').length;

  // ─── Filtered + sorted data ───
  const filtered = useMemo(() => {
    let data = [...players];
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (endingFilter !== 'all') {
      data = data.filter((p) => p.endingType === endingFilter);
    }
    data.sort((a, b) => {
      let av: string | number = a[sortKey] as string | number;
      let bv: string | number = b[sortKey] as string | number;
      if (typeof av === 'string') av = av.toLowerCase();
      if (typeof bv === 'string') bv = bv.toLowerCase();
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return data;
  }, [players, search, endingFilter, sortKey, sortDir]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const handleDelete = (id: string) => {
    if (deleteConfirm === id) {
      setPlayers((prev) => prev.filter((p) => p.id !== id));
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  const handleExportCSV = () => {
    setExportFlash(true);
    setTimeout(() => setExportFlash(false), 1200);

    const headers = [
      'STT',
      'Tên người chơi',
      'Vòng hoàn thành',
      'Ending',
      'Điểm tự động',
      'Độ ổn định',
      'Thời gian',
      'Trạng thái',
      'T',
      'P',
      'E',
      'I',
      'Gap',
    ];
    const rows = filtered.map((p, i) => [
      i + 1,
      p.name,
      `${p.completedRound}/15`,
      ENDING_META[p.endingType]?.label || p.endingType,
      p.autoScore,
      p.stability,
      p.playTime,
      STATUS_META[p.status]?.label || p.status,
      p.stats.T,
      p.stats.P,
      p.stats.E,
      p.stats.I,
      p.stats.Gap,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ket_qua_game_vnm2045_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const TH = ({
    label,
    sortable,
    sk,
    className = '',
  }: {
    label: string;
    sortable?: boolean;
    sk?: SortKey;
    className?: string;
  }) => (
    <th
      className={`px-4 py-3 text-left text-xs tracking-wider cursor-pointer select-none ${className}`}
      style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Be Vietnam Pro, sans-serif' }}
      onClick={() => sortable && sk && handleSort(sk)}
    >
      <div className="flex items-center gap-1">
        {label}
        {sortable && sk && <SortIcon col={sk} active={sortKey === sk} dir={sortDir} />}
      </div>
    </th>
  );

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #030213 0%, #0a1628 50%, #030213 100%)' }}
    >
      {/* ── Cyber Grid BG ── */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(#22d3ee 1px, transparent 1px),
            linear-gradient(90deg, #22d3ee 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Subtle Lotus Watermark ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[320px] pointer-events-none select-none"
        style={{ opacity: 0.025 }}
      >
        🏵️
      </div>

      {/* ── Glow blobs ── */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(220,38,38,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* ══════════ HEADER ══════════ */}
        <header
          className="border-b sticky top-0 z-30"
          style={{
            background: 'rgba(3,2,19,0.85)',
            backdropFilter: 'blur(16px)',
            borderColor: 'rgba(34,211,238,0.15)',
          }}
        >
          <div className="max-w-screen-2xl mx-auto px-6 py-4 flex items-center justify-between">
            {/* Left: logo + title */}
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="text-3xl leading-none"
              >
                🏵️
              </motion.div>
              <div>
                <div
                  className="text-xs tracking-widest mb-0.5"
                  style={{ color: '#22d3ee', fontFamily: 'Be Vietnam Pro, sans-serif' }}
                >
                  CNH-HĐH VIỆT NAM 2045 · COMMAND CENTER
                </div>
                <h1
                  className="text-xl"
                  style={{
                    fontFamily: 'Be Vietnam Pro, sans-serif',
                    background: 'linear-gradient(90deg, #22d3ee, #dc2626, #f59e0b)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Quản lý Người chơi &amp; Kết quả
                </h1>
              </div>
            </div>

            {/* Right: admin badge + exit */}
            <div className="flex items-center gap-3">
              <div
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border"
                style={{
                  background: 'rgba(220,38,38,0.1)',
                  borderColor: 'rgba(220,38,38,0.3)',
                  color: '#dc2626',
                }}
              >
                <ShieldAlert size={13} />
                CHẾ ĐỘ ADMIN
              </div>
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all hover:scale-105"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.7)',
                }}
              >
                ← Thoát Admin
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-screen-2xl mx-auto w-full px-6 py-6 space-y-6">
          {/* ══════════ STAT CARDS ══════════ */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <StatCard
              icon={<Users size={18} />}
              label="Tổng số người chơi"
              value={totalPlayers}
              color="#22d3ee"
              sub="người"
            />
            <StatCard
              icon={<BarChart3 size={18} />}
              label="Điểm trung bình"
              value={avgScore}
              color="#f59e0b"
              sub="/ 100"
            />
            <StatCard
              icon={<Trophy size={18} />}
              label="Số Ending Thành công"
              value={successCount}
              color="#10b981"
              sub={`${Math.round((successCount / totalPlayers) * 100)}%`}
            />
            <StatCard
              icon={<AlertTriangle size={18} />}
              label="Số Game Over"
              value={gameoverCount}
              color="#ef4444"
              sub={`${Math.round((gameoverCount / totalPlayers) * 100)}%`}
            />
          </motion.div>

          {/* ══════════ SEARCH & FILTER BAR ══��═══════ */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap gap-3 items-center"
          >
            {/* Search */}
            <div className="relative flex-1 min-w-48">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm theo tên sinh viên..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.85)',
                  fontFamily: 'Be Vietnam Pro, sans-serif',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(34,211,238,0.4)';
                  e.currentTarget.style.boxShadow = '0 0 12px rgba(34,211,238,0.15)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Ending filter dropdown */}
            <select
              value={endingFilter}
              onChange={(e) => setEndingFilter(e.target.value as EndingFilter)}
              className="px-4 py-2.5 rounded-xl text-sm outline-none cursor-pointer"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.8)',
                fontFamily: 'Be Vietnam Pro, sans-serif',
              }}
            >
              <option value="all" style={{ background: '#0a1628' }}>Tất cả Ending</option>
              <option value="success" style={{ background: '#0a1628' }}>Ending 1 – CNH-HĐH Thành công</option>
              <option value="inequality" style={{ background: '#0a1628' }}>Ending 2 – Phát triển không đồng đều</option>
              <option value="dependency" style={{ background: '#0a1628' }}>Ending 3 – Bẫy lệ thuộc</option>
              <option value="collapse" style={{ background: '#0a1628' }}>Ending 4 – Sụp đổ hệ thống</option>
              <option value="playing" style={{ background: '#0a1628' }}>Đang chơi</option>
            </select>

            {/* Result count */}
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
              {filtered.length} / {totalPlayers} kết quả
            </span>

            {/* Export CSV */}
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-105 active:scale-95"
              style={{
                background: exportFlash
                  ? 'linear-gradient(90deg, #10b981, #22d3ee)'
                  : 'linear-gradient(90deg, #06b6d4, #22d3ee)',
                color: '#fff',
                boxShadow: exportFlash
                  ? '0 0 20px rgba(16,185,129,0.5)'
                  : '0 0 16px rgba(34,211,238,0.3)',
                fontFamily: 'Be Vietnam Pro, sans-serif',
                transition: 'all 0.3s',
              }}
            >
              <Download size={15} />
              {exportFlash ? 'Đang xuất...' : 'Export CSV'}
            </button>
          </motion.div>

          {/* ══════════ TABLE ══════════ */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl border overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(12px)',
              borderColor: 'rgba(34,211,238,0.12)',
              boxShadow: '0 0 40px rgba(34,211,238,0.05)',
            }}
          >
            {/* Table header */}
            <div
              className="border-b"
              style={{
                background: 'rgba(34,211,238,0.05)',
                borderColor: 'rgba(34,211,238,0.12)',
              }}
            >
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <TH label="STT" className="w-12" />
                    <TH label="Tên người chơi" sortable sk="name" />
                    <TH label="Vòng HT" sortable sk="completedRound" />
                    <TH label="Ending đạt được" sortable sk="endingType" />
                    <TH label="Điểm tự động" sortable sk="autoScore" />
                    <TH label="Điểm Ổn định" sortable sk="stability" />
                    <TH label="Thời gian" sortable sk="playTime" />
                    <TH label="Trạng thái" sortable sk="status" />
                    <TH label="Hành động" />
                  </tr>
                </thead>
              </table>
            </div>

            {/* Table body */}
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <tbody>
                  <AnimatePresence>
                    {filtered.length === 0 ? (
                      <tr>
                        <td
                          colSpan={9}
                          className="text-center py-16 text-sm"
                          style={{ color: 'rgba(255,255,255,0.3)' }}
                        >
                          Không tìm thấy kết quả nào.
                        </td>
                      </tr>
                    ) : (
                      filtered.map((player, idx) => (
                        <motion.tr
                          key={player.id}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 8 }}
                          transition={{ delay: idx * 0.03 }}
                          className="group border-b transition-all duration-200 cursor-default"
                          style={{
                            borderColor: 'rgba(255,255,255,0.05)',
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLTableRowElement).style.background =
                              'rgba(34,211,238,0.04)';
                            (e.currentTarget as HTMLTableRowElement).style.boxShadow =
                              'inset 3px 0 0 #22d3ee';
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLTableRowElement).style.background = 'transparent';
                            (e.currentTarget as HTMLTableRowElement).style.boxShadow = 'none';
                          }}
                        >
                          {/* STT */}
                          <td className="px-4 py-3.5 w-12">
                            <span
                              className="text-xs w-6 h-6 rounded flex items-center justify-center"
                              style={{
                                background: 'rgba(34,211,238,0.1)',
                                color: '#22d3ee',
                                fontFamily: 'Be Vietnam Pro, sans-serif',
                              }}
                            >
                              {idx + 1}
                            </span>
                          </td>

                          {/* Name + avatar */}
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0 border"
                                style={{
                                  background: 'rgba(255,255,255,0.05)',
                                  borderColor: 'rgba(255,255,255,0.1)',
                                }}
                              >
                                {player.avatar}
                              </div>
                              <span
                                className="text-sm"
                                style={{
                                  color: 'rgba(255,255,255,0.9)',
                                  fontFamily: 'Be Vietnam Pro, sans-serif',
                                }}
                              >
                                {player.name}
                              </span>
                            </div>
                          </td>

                          {/* Round */}
                          <td className="px-4 py-3.5">
                            <span
                              className="text-sm"
                              style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Be Vietnam Pro, sans-serif' }}
                            >
                              {player.completedRound}
                              <span style={{ color: 'rgba(255,255,255,0.3)' }}>/15</span>
                            </span>
                          </td>

                          {/* Ending badge */}
                          <td className="px-4 py-3.5">
                            <EndingBadge type={player.endingType} />
                          </td>

                          {/* Auto score */}
                          <td className="px-4 py-3.5 min-w-32">
                            <ScoreBar score={player.autoScore} />
                          </td>

                          {/* Stability */}
                          <td className="px-4 py-3.5">
                            <span
                              className="text-sm flex items-center gap-1"
                              style={{
                                color: player.stability >= 0 ? '#10b981' : '#ef4444',
                                fontFamily: 'Be Vietnam Pro, sans-serif',
                              }}
                            >
                              {player.stability >= 0 ? '+' : ''}{player.stability}
                            </span>
                          </td>

                          {/* Play time */}
                          <td className="px-4 py-3.5">
                            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                              {player.playTime}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="px-4 py-3.5">
                            <StatusBadge status={player.status} />
                          </td>

                          {/* Actions */}
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setSelectedPlayer(player)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all hover:scale-105"
                                style={{
                                  background: 'rgba(34,211,238,0.1)',
                                  border: '1px solid rgba(34,211,238,0.25)',
                                  color: '#22d3ee',
                                  fontFamily: 'Be Vietnam Pro, sans-serif',
                                }}
                              >
                                <Eye size={12} />
                                Xem
                              </button>
                              <button
                                onClick={() => handleDelete(player.id)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all hover:scale-105"
                                style={{
                                  background:
                                    deleteConfirm === player.id
                                      ? 'rgba(239,68,68,0.2)'
                                      : 'rgba(255,255,255,0.05)',
                                  border:
                                    deleteConfirm === player.id
                                      ? '1px solid rgba(239,68,68,0.4)'
                                      : '1px solid rgba(255,255,255,0.1)',
                                  color: deleteConfirm === player.id ? '#ef4444' : 'rgba(255,255,255,0.4)',
                                  fontFamily: 'Be Vietnam Pro, sans-serif',
                                }}
                              >
                                <Trash2 size={12} />
                                {deleteConfirm === player.id ? 'Chắc chắn?' : 'Xóa'}
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Table footer */}
            <div
              className="flex items-center justify-between px-6 py-3 border-t"
              style={{
                borderColor: 'rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Hiển thị {filtered.length} / {totalPlayers} người chơi
              </span>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
                CNH-HĐH Việt Nam 2045 · Admin Panel
              </span>
            </div>
          </motion.div>

          {/* ── Ending distribution mini-legend ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-3 pb-6"
          >
            {Object.entries(ENDING_META).map(([key, meta]) => {
              const count = players.filter((p) => p.endingType === key).length;
              return (
                <button
                  key={key}
                  onClick={() => setEndingFilter(endingFilter === key ? 'all' : (key as EndingFilter))}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-all hover:scale-105"
                  style={{
                    background: endingFilter === key ? meta.bg : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${endingFilter === key ? meta.border : 'rgba(255,255,255,0.08)'}`,
                    color: endingFilter === key ? meta.color : 'rgba(255,255,255,0.45)',
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: meta.color }}
                  />
                  {meta.label}
                  <span
                    className="px-1.5 py-0.5 rounded-full text-xs"
                    style={{
                      background: endingFilter === key ? `${meta.color}25` : 'rgba(255,255,255,0.06)',
                      color: endingFilter === key ? meta.color : 'rgba(255,255,255,0.4)',
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </main>
      </div>

      {/* ══════════ PLAYER DETAIL MODAL ══════════ */}
      {selectedPlayer && (
        <PlayerDetailModal
          player={selectedPlayer}
          onClose={() => setSelectedPlayer(null)}
        />
      )}
    </div>
  );
}
