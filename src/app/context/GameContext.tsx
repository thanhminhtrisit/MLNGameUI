import React, { createContext, useContext, useState, ReactNode } from 'react';

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
}

const initialGameState: GameState = {
  round: 1,
  budget: 1000,
  labor: 100,
  stats: {
    T: 50,
    P: 50,
    E: 60,
    I: 40,
    Gap: 30,
  },
  eventLog: [],
  isGameOver: false,
  endingType: null,
  playerName: '',
  selectedCharacter: null,
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const getStability = () => {
    return gameState.stats.E * 0.7 - gameState.stats.Gap * 0.3;
  };

  const updateStats = (changes: Partial<GameStats>) => {
    setGameState(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        ...changes,
        T: Math.max(0, Math.min(100, (changes.T !== undefined ? changes.T : prev.stats.T))),
        P: Math.max(0, Math.min(100, (changes.P !== undefined ? changes.P : prev.stats.P))),
        E: Math.max(0, Math.min(100, (changes.E !== undefined ? changes.E : prev.stats.E))),
        I: Math.max(0, Math.min(100, (changes.I !== undefined ? changes.I : prev.stats.I))),
        Gap: Math.max(0, Math.min(100, (changes.Gap !== undefined ? changes.Gap : prev.stats.Gap))),
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
    setGameState(prev => ({
      ...prev,
      round: prev.round + 1,
      budget: prev.budget + 200,
      labor: prev.labor + 20,
    }));
  };

  const endGame = (endingType: string) => {
    setGameState(prev => ({
      ...prev,
      isGameOver: true,
      endingType,
    }));
  };

  const resetGame = () => {
    setGameState(initialGameState);
  };

  const setPlayerInfo = (name: string, character: string) => {
    setGameState(prev => ({
      ...prev,
      playerName: name,
      selectedCharacter: character,
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