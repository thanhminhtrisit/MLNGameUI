const API_BASE = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8080';

export const gameApi = {
  saveResult: async (data: {
    playerName: string;
    characterId: string;
    roundCompleted: number;
    endingType: string;
    stats: { T: number; P: number; E: number; I: number; Gap: number };
    budgetRemaining: number;
  }) => {
    try {
      const res = await fetch(`${API_BASE}/api/results`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerName: data.playerName,
          characterId: data.characterId,
          roundCompleted: data.roundCompleted,
          endingType: data.endingType,
          stats: data.stats,
          budgetRemaining: data.budgetRemaining,
        }),
      });
      return await res.json();
    } catch (e) {
      console.warn('API không khả dụng, bỏ qua lưu kết quả');
      return null;
    }
  },

  getAllResults: async () => {
    const res = await fetch(`${API_BASE}/api/results`);
    return res.json();
  },
};
