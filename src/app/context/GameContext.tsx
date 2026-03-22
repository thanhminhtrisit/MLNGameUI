import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface GameStats {
  T: number; // Technology Level
  P: number; // Productivity
  E: number; // Equality
  I: number; // Innovation
  Gap: number; // Technology Gap between Urban and Agriculture
}

export interface GameState {
  round: number;
  budget: number;
  labor: number;
  stats: GameStats;
  tUrban: number;
  tAgri: number;
  persistentPenalty: number;
  historyLog: Array<{ round: number; T: number; P: number; E: number; I: number; Gap: number; budget: number }>;
  eventLog: Array<{ round: number; message: string }>;
  isGameOver: boolean;
  endingType: string | null;
  playerName: string;
  selectedCharacter: string | null;
}

interface GameContextType {
  gameState: GameState;
  updateStats: (changes: Partial<GameStats>) => void;
  updateResources: (budget: number, labor: number) => void;
  addEvent: (message: string) => void;
  nextRound: () => void;
  endGame: (endingType: string) => void;
  resetGame: () => void;
  getStability: () => number;
  setPlayerInfo: (name: string, character: string) => void;
  updateRegionTech: (urbanDelta: number, agriDelta: number) => void;
  setPersistentPenalty: (amount: number) => void;
}

const initialGameState: GameState = {
  round: 1,
  budget: 1500,
  labor: 100,
  stats: {
    T: 30,
    P: 20,
    E: 70,
    I: 10,
    Gap: 35,
  },
  tUrban: 50,
  tAgri: 15,
  persistentPenalty: 0,
  historyLog: [],
  eventLog: [],
  isGameOver: false,
  endingType: null,
  playerName: '',
  selectedCharacter: null,
};

const GameContext = createContext<GameContextType | undefined>(undefined);

const getSavedState = (): GameState => {
  try {
    const saved = localStorage.getItem('vnm2045_gameState');
    if (saved) {
      const parsed = JSON.parse(saved) as GameState;
      if (!parsed.isGameOver) return parsed;
    }
  } catch {}
  return initialGameState;
};

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(getSavedState);

  useEffect(() => {
    localStorage.setItem('vnm2045_gameState', JSON.stringify(gameState));
  }, [gameState]);

  const getStability = () => {
    return Math.round(gameState.stats.E * 0.7 - gameState.stats.Gap * 0.3);
  };

  const updateStats = (changes: Partial<GameStats>) => {
    setGameState(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        T: Math.max(0, Math.min(100, prev.stats.T + (changes.T ?? 0))),
        P: Math.max(0, Math.min(100, prev.stats.P + (changes.P ?? 0))),
        E: Math.max(0, Math.min(100, prev.stats.E + (changes.E ?? 0))),
        I: Math.max(0, Math.min(100, prev.stats.I + (changes.I ?? 0))),
        Gap: Math.max(0, Math.min(100, prev.stats.Gap + (changes.Gap ?? 0))),
      },
    }));
  };

  const updateResources = (budget: number, labor: number) => {
    setGameState(prev => ({
      ...prev,
      budget: Math.max(0, prev.budget + budget),
      labor: Math.max(0, prev.labor + labor),
    }));
  };

  const addEvent = (message: string) => {
    setGameState(prev => ({
      ...prev,
      eventLog: [{ round: prev.round, message }, ...prev.eventLog].slice(0, 20),
    }));
  };

  const nextRound = () => {
    setGameState(prev => {
      const newGap = Math.abs(prev.tUrban - prev.tAgri);
      const newE = Math.max(0, Math.min(100, prev.stats.E));
      const budgetIncome = prev.stats.P * 10;
      const snapshot = {
        round: prev.round,
        T: prev.stats.T,
        P: prev.stats.P,
        E: newE,
        I: prev.stats.I,
        Gap: newGap,
        budget: prev.budget,
      };
      const penalty = prev.stats.I > 30 ? 0 : prev.persistentPenalty;
      const newPersistentPenalty = prev.stats.I > 30 ? 0 : prev.persistentPenalty;
      return {
        ...prev,
        round: prev.round + 1,
        budget: Math.max(0, prev.budget + budgetIncome - penalty),
        labor: 100,
        persistentPenalty: newPersistentPenalty,
        stats: {
          ...prev.stats,
          E: newE,
          Gap: newGap,
        },
        historyLog: [...prev.historyLog, snapshot],
      };
    });
  };

  const endGame = (endingType: string) => {
    setGameState(prev => ({
      ...prev,
      isGameOver: true,
      endingType,
    }));
  };

  const resetGame = () => {
    localStorage.removeItem('vnm2045_gameState');
    setGameState(initialGameState);
  };

  const setPlayerInfo = (name: string, character: string) => {
    setGameState(prev => ({
      ...prev,
      playerName: name,
      selectedCharacter: character,
    }));
  };

  const updateRegionTech = (urbanDelta: number, agriDelta: number) => {
    setGameState(prev => {
      const newUrban = prev.tUrban + urbanDelta;
      const newAgri = prev.tAgri + agriDelta;
      return {
        ...prev,
        tUrban: newUrban,
        tAgri: newAgri,
        stats: {
          ...prev.stats,
          Gap: Math.abs(newUrban - newAgri),
        },
      };
    });
  };

  const setPersistentPenalty = (amount: number) => {
    setGameState(prev => ({
      ...prev,
      persistentPenalty: amount,
    }));
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        updateStats,
        updateResources,
        addEvent,
        nextRound,
        endGame,
        resetGame,
        getStability,
        setPlayerInfo,
        updateRegionTech,
        setPersistentPenalty,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
}