import { GameStats } from '../context/GameContext';

export interface EventChoice {
  label: string;
  description: string;
  impact: {
    T?: number;
    P?: number;
    E?: number;
    I?: number;
    Gap?: number;
    tUrban?: number;
    tAgri?: number;
    budget?: number;
    labor?: number;
    persistentPenalty?: number;
  };
}

export interface GameEvent {
  id: string;
  title: string;
  icon: string;
  type: 'fixed' | 'random' | 'fallback';
  narrative: string;
  moralJustification?: string;
  choices: [EventChoice, EventChoice];
  condition?: (stats: GameStats, round: number, prevStats?: GameStats) => boolean;
}

// ─── FIXED EVENTS ────────────────────────────────────────────────────────────

export const FIXED_EVENTS: Record<number, GameEvent> = {
  1: {
    id: 'fixed_1',
    title: 'Bình minh kỷ nguyên 4.0',
    icon: '🌅',
    type: 'fixed',
    narrative: 'Thế giới bùng nổ CMCN 4.0. Việt Nam đứng trước cơ hội bứt phá nhưng nguồn lực có hạn.',
    moralJustification: 'Đây là lựa chọn giữa ưu tiên Lực lượng sản xuất (đô thị) hay Quan hệ sản xuất (nông thôn)',
    choices: [
      {
        label: 'Hạ tầng số Đô thị',
        description: 'Đầu tư mạnh vào hạ tầng số khu vực đô thị, thúc đẩy năng suất và tăng trưởng.',
        impact: { tUrban: 15, P: 8, Gap: 12, E: -5, budget: -500, labor: -30 },
      },
      {
        label: 'Phổ cập kỹ năng số Nông thôn',
        description: 'Mang công nghệ số tới nông thôn, thu hẹp khoảng cách và nâng cao bình đẳng.',
        impact: { tAgri: 5, E: 8, Gap: -8, P: 3, I: 3, budget: -300, labor: -60 },
      },
    ],
  },

  5: {
    id: 'fixed_5',
    title: 'Làn sóng FDI',
    icon: '🏭',
    type: 'fixed',
    narrative: 'Các tập đoàn điện tử lớn muốn đầu tư. Cơ hội bứt phá hay bẫy lệ thuộc?',
    moralJustification: 'FDI là vốn ngoại - có thể thúc đẩy LLSX nhưng tạo QHSX lệ thuộc nếu không kiểm soát',
    choices: [
      {
        label: 'Trải thảm đỏ',
        description: 'Mở cửa hoàn toàn, ưu đãi tối đa để thu hút FDI nhanh nhất có thể.',
        impact: { T: 20, P: 25, I: -10, Gap: 10, E: -8, budget: -200, labor: -50 },
      },
      {
        label: 'Yêu cầu chuyển giao R&D',
        description: 'Đàm phán điều kiện chuyển giao công nghệ và nghiên cứu phát triển.',
        impact: { T: 10, I: 15, P: 5, Gap: 3, budget: -600, labor: -30 },
      },
    ],
  },

  8: {
    id: 'fixed_8',
    title: 'Số hóa Nông thôn',
    icon: '🌾',
    type: 'fixed',
    narrative: 'Yêu cầu đưa công nghệ vào chuỗi cung ứng nông sản Việt Nam.',
    moralJustification: 'Gắn CNH với HĐH nông nghiệp là yêu cầu khách quan của định hướng XHCN',
    choices: [
      {
        label: 'Tự động hóa nông nghiệp',
        description: 'Đầu tư máy móc và phần mềm quản lý chuỗi cung ứng nông nghiệp.',
        impact: { tAgri: 15, Gap: -10, P: 10, budget: -400, labor: -30 },
      },
      {
        label: 'Bỏ qua, tập trung công nghiệp',
        description: 'Không đầu tư nông thôn, dồn nguồn lực phát triển công nghiệp đô thị.',
        impact: { budget: 300, E: -10, Gap: 10 },
      },
    ],
  },

  12: {
    id: 'fixed_12',
    title: 'Khủng hoảng Chip toàn cầu',
    icon: '⚡',
    type: 'fixed',
    narrative: 'Đứt gãy chuỗi cung ứng chip toàn cầu. Linh kiện công nghệ tăng giá 300%.',
    moralJustification: 'Kiểm tra thực sự năng lực tự chủ công nghệ - nội lực đổi mới sáng tạo',
    choices: [
      {
        label: 'Tự nghiên cứu chip nội địa',
        description: 'Đầu tư lớn vào nghiên cứu sản xuất chip bán dẫn trong nước.',
        impact: { I: 20, T: 5, budget: -800, labor: -50 },
      },
      {
        label: 'Mua linh kiện giá cao',
        description: 'Chấp nhận chi phí cao, tiếp tục nhập khẩu linh kiện từ nước ngoài.',
        impact: { T: 5, budget: -1000 },
      },
    ],
  },
};

// ─── RANDOM EVENTS ────────────────────────────────────────────────────────────

export const RANDOM_EVENTS: GameEvent[] = [
  {
    id: 'random_copyright_trap',
    title: 'Bẫy bản quyền',
    icon: '⚠️',
    type: 'random',
    narrative: 'I thấp, tập đoàn nước ngoài tăng phí bản quyền phần mềm nhà máy.',
    moralJustification: 'Hệ quả của việc không đầu tư đổi mới sáng tạo nội địa',
    choices: [
      {
        label: 'Trả phí',
        description: 'Chấp nhận trả phí bản quyền định kỳ, ổn định sản xuất trước mắt.',
        impact: { persistentPenalty: 100 },
      },
      {
        label: 'Tự viết phần mềm',
        description: 'Đầu tư nhân lực tự phát triển phần mềm nội địa thay thế.',
        impact: { I: 15, P: -8 },
      },
    ],
    condition: (stats) => stats.I < 20,
  },

  {
    id: 'random_strike',
    title: 'Đình công đòi quyền lợi',
    icon: '✊',
    type: 'random',
    narrative: 'E thấp, công nhân biểu tình vì lương thấp và điều kiện sống tệ.',
    moralJustification: 'QHSX mâu thuẫn khi bất bình đẳng gia tăng không được giải quyết',
    choices: [
      {
        label: 'Tăng phúc lợi',
        description: 'Cải thiện lương và điều kiện làm việc, giải quyết mâu thuẫn lao động.',
        impact: { E: 15, budget: -400 },
      },
      {
        label: 'Cưỡng chế',
        description: 'Dùng lực lượng an ninh giải tán biểu tình, duy trì sản xuất.',
        impact: { P: 10, E: -20 },
      },
    ],
    condition: (stats) => stats.E < 30,
  },

  {
    id: 'random_rural_exodus',
    title: 'Ly hương ồ ạt',
    icon: '🚶',
    type: 'random',
    narrative: 'Gap lớn, nông dân bỏ ruộng đổ ra thành phố.',
    moralJustification: 'Hệ quả tất yếu khi chênh lệch phát triển đô thị - nông thôn quá lớn',
    choices: [
      {
        label: 'Hỗ trợ nông nghiệp',
        description: 'Đầu tư khẩn cấp vào nông thôn để giữ chân người dân và thu hẹp Gap.',
        impact: { Gap: -15, budget: -500 },
      },
      {
        label: 'Mặc kệ',
        description: 'Không can thiệp, để dòng người di cư tự điều chỉnh theo thị trường.',
        impact: { E: -15, P: -10 },
      },
    ],
    condition: (stats) => stats.Gap > 50,
  },

  {
    id: 'random_cybercrime',
    title: 'Tội phạm công nghệ cao',
    icon: '💻',
    type: 'random',
    narrative: 'Dân trí không theo kịp công nghệ, lừa đảo mạng tăng cao.',
    moralJustification: 'Mất cân bằng giữa LLSX (công nghệ cao) và trình độ QHSX (dân trí)',
    choices: [
      {
        label: 'Giáo dục số',
        description: 'Triển khai chương trình nâng cao nhận thức và kỹ năng an toàn mạng.',
        impact: { I: 10, budget: -300 },
      },
      {
        label: 'Thắt chặt an ninh',
        description: 'Tăng cường lực lượng an ninh mạng và kiểm soát không gian số.',
        impact: { labor: -40, E: 5 },
      },
    ],
    condition: (stats) => stats.I < 20 && stats.T > 60,
  },

  {
    id: 'random_brain_drain',
    title: 'Chảy máu chất xám',
    icon: '🧠',
    type: 'random',
    narrative: 'Chuyên gia giỏi bỏ ra nước ngoài vì đãi ngộ thấp.',
    moralJustification: 'Khi E thấp, QHSX không đủ sức giữ chân nhân tài LLSX',
    choices: [
      {
        label: 'Trải thảm đỏ giữ người',
        description: 'Chính sách đãi ngộ đặc biệt, lương cao và cơ chế ưu đãi cho chuyên gia.',
        impact: { I: 10, budget: -500, E: -5 },
      },
      {
        label: 'Chấp nhận mất người',
        description: 'Không can thiệp, chấp nhận chảy máu chất xám để tiết kiệm ngân sách.',
        impact: { I: -20, T: -10 },
      },
    ],
    condition: (stats) => stats.E < 40 && stats.I > 40,
  },

  {
    id: 'random_startup',
    title: 'Sáng kiến Startup',
    icon: '🚀',
    type: 'random',
    narrative: 'Một startup Việt chế tạo thành công Drone nông nghiệp.',
    moralJustification: 'Đổi mới sáng tạo nội sinh có thể thu hẹp khoảng cách phát triển',
    choices: [
      {
        label: 'Đầu tư nhân rộng',
        description: 'Hỗ trợ vốn và chính sách để startup mở rộng quy mô toàn quốc.',
        impact: { I: 15, Gap: -10, budget: -300 },
      },
      {
        label: 'Bỏ lỡ',
        description: 'Không hành động, để startup tự phát triển theo thị trường.',
        impact: {},
      },
    ],
    condition: () => Math.random() < 0.2,
  },

  {
    id: 'random_pollution',
    title: 'Ô nhiễm nguồn nước',
    icon: '☣️',
    type: 'random',
    narrative: 'Nhà máy xả thải gây chết cá tại các làng chài.',
    moralJustification: 'Tăng trưởng P cao nhưng bất bình đẳng E thấp là mô hình không bền vững',
    choices: [
      {
        label: 'Xử lý nghiêm',
        description: 'Phạt nặng nhà máy vi phạm, bồi thường người dân và xử lý ô nhiễm.',
        impact: { E: 15, P: -10, budget: -400 },
      },
      {
        label: 'Bao che',
        description: 'Ưu tiên sản xuất, giảm nhẹ mức xử phạt để không ảnh hưởng nhà máy.',
        impact: { P: 10, E: -25 },
      },
    ],
    condition: (stats) => stats.P > 60 && stats.E < 50,
  },

  {
    id: 'random_green_transition',
    title: 'Chuyển đổi xanh',
    icon: '🌱',
    type: 'random',
    narrative: 'Quốc tế yêu cầu hàng xuất khẩu phải có chứng chỉ xanh.',
    moralJustification: 'CNH-HĐH bền vững phải gắn với bảo vệ môi trường',
    choices: [
      {
        label: 'Đầu tư năng lượng tái tạo',
        description: 'Chuyển đổi sang năng lượng sạch để đáp ứng tiêu chuẩn xuất khẩu quốc tế.',
        impact: { T: 10, I: 10, budget: -600 },
      },
      {
        label: 'Tiếp tục dùng than đá',
        description: 'Duy trì mô hình năng lượng hiện tại, ưu tiên sản xuất ngắn hạn.',
        impact: { P: 15, E: -15 },
      },
    ],
    condition: (_stats, round) => round > 8,
  },

  {
    id: 'random_unemployment_4_0',
    title: 'Bóng ma thất nghiệp 4.0',
    icon: '🤖',
    type: 'random',
    narrative: 'Tự động hóa quá nhanh, hàng vạn công nhân mất việc.',
    moralJustification: 'LLSX phát triển quá nhanh tạo mâu thuẫn với QHSX lao động',
    choices: [
      {
        label: 'Trợ cấp thất nghiệp',
        description: 'Hệ thống an sinh xã hội hỗ trợ công nhân mất việc do tự động hóa.',
        impact: { E: 10, budget: -400 },
      },
      {
        label: 'Đào tạo lại nghề',
        description: 'Chương trình đào tạo chuyển đổi nghề nghiệp cho lao động bị thay thế.',
        impact: { I: 10, labor: -50, budget: -200 },
      },
    ],
    condition: (_stats, _round, prevStats) => {
      if (!prevStats) return false;
      return _stats.T - prevStats.T > 15;
    },
  },

  {
    id: 'random_tech_embargo',
    title: 'Cấm vận công nghệ',
    icon: '🚫',
    type: 'random',
    narrative: 'Bị cấm vận chip và phần mềm lõi do thiếu tự chủ công nghệ.',
    moralJustification: 'Hệ quả của phụ thuộc LLSX vào nước ngoài khi thiếu I nội sinh',
    choices: [
      {
        label: 'Tìm đối tác mới',
        description: 'Đa dạng hóa nguồn cung, tìm đối tác thay thế từ các nước khác.',
        impact: { T: -10, budget: -500 },
      },
      {
        label: 'Đẩy mạnh R&D nội địa khẩn cấp',
        description: 'Dốc toàn lực cho nghiên cứu tự chủ công nghệ trong nước.',
        impact: { I: 15, P: -15, budget: -700 },
      },
    ],
    condition: (stats, round) => stats.I < 40 && round > 10,
  },
];

// ─── FALLBACK EVENTS ──────────────────────────────────────────────────────────

export const FALLBACK_EVENTS: GameEvent[] = [
  {
    id: 'fallback_intl_conference',
    title: 'Hội nghị Kinh tế Quốc tế',
    icon: '🌐',
    type: 'fallback',
    narrative: 'Việt Nam được mời tham gia diễn đàn kinh tế thế giới.',
    choices: [
      {
        label: 'Tham gia tích cực',
        description: 'Cử đoàn đại biểu cấp cao, tích cực đề xuất và học hỏi kinh nghiệm.',
        impact: { I: 5, P: 3, budget: -100 },
      },
      {
        label: 'Quan sát thụ động',
        description: 'Tham dự với tư cách quan sát viên, tiết kiệm chi phí.',
        impact: { budget: 50 },
      },
    ],
  },

  {
    id: 'fallback_digital_skills_year',
    title: 'Năm học Kỹ năng số Quốc gia',
    icon: '📱',
    type: 'fallback',
    narrative: 'Chính phủ phát động phong trào nâng cao kỹ năng số toàn dân.',
    choices: [
      {
        label: 'Đầu tư mạnh',
        description: 'Triển khai chương trình đào tạo kỹ năng số quy mô lớn toàn quốc.',
        impact: { I: 8, E: 3, budget: -200 },
      },
      {
        label: 'Hỗ trợ tượng trưng',
        description: 'Chỉ hỗ trợ ở mức tối thiểu, tập trung ngân sách cho ưu tiên khác.',
        impact: { I: 3, budget: -50 },
      },
    ],
  },

  {
    id: 'fallback_sustainability_report',
    title: 'Báo cáo Phát triển Bền vững',
    icon: '📊',
    type: 'fallback',
    narrative: 'Tổ chức quốc tế đánh giá chỉ số phát triển bền vững của Việt Nam.',
    choices: [
      {
        label: 'Cam kết cải thiện',
        description: 'Ký cam kết cải thiện các chỉ số và thực hiện lộ trình cụ thể.',
        impact: { E: 5, I: 3, budget: -150 },
      },
      {
        label: 'Duy trì hiện trạng',
        description: 'Không đưa ra cam kết mới, giữ nguyên chính sách hiện tại.',
        impact: {},
      },
    ],
  },
];

// ─── HELPER FUNCTIONS ─────────────────────────────────────────────────────────

export function getFixedEvent(round: number): GameEvent | null {
  return FIXED_EVENTS[round] ?? null;
}

export function getRandomEvent(
  stats: GameStats,
  round: number,
  prevStats: GameStats,
  usedEventIds: string[]
): GameEvent | null {
  // Filter eligible random events
  const eligible = RANDOM_EVENTS.filter(
    (e) => !usedEventIds.includes(e.id) && (!e.condition || e.condition(stats, round, prevStats))
  );

  if (eligible.length > 0) {
    // Shuffle and pick first
    const shuffled = eligible.sort(() => Math.random() - 0.5);
    return shuffled[0];
  }

  // Fallback: prefer unused fallback events
  const unusedFallbacks = FALLBACK_EVENTS.filter((e) => !usedEventIds.includes(e.id));
  const fallbackPool = unusedFallbacks.length > 0 ? unusedFallbacks : FALLBACK_EVENTS;
  return fallbackPool[Math.floor(Math.random() * fallbackPool.length)];
}
