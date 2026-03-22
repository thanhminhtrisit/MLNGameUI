import React from 'react';
import { X } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/button';

export interface EventChoice {
  label: string;
  description: string;
  impact: {
    T?: number;
    P?: number;
    E?: number;
    I?: number;
    Gap?: number;
    budget?: number;
    labor?: number;
  };
}

export interface GameEvent {
  id: string;
  type: 'fixed' | 'random';
  title: string;
  icon: string;
  narrative: string;
  moralJustification: string;
  choices: [EventChoice, EventChoice];
}

interface EventModalProps {
  event: GameEvent;
  onChoice: (choiceIndex: 0 | 1) => void;
  onClose: () => void;
}

export function EventModal({ event, onChoice, onClose }: EventModalProps) {
  const renderImpactList = (impact: EventChoice['impact']) => {
    const impacts: string[] = [];
    
    if (impact.T) impacts.push(`T ${impact.T > 0 ? '+' : ''}${impact.T}`);
    if (impact.P) impacts.push(`P ${impact.P > 0 ? '+' : ''}${impact.P}`);
    if (impact.E) impacts.push(`E ${impact.E > 0 ? '+' : ''}${impact.E}`);
    if (impact.I) impacts.push(`I ${impact.I > 0 ? '+' : ''}${impact.I}`);
    if (impact.Gap) impacts.push(`Gap ${impact.Gap > 0 ? '+' : ''}${impact.Gap}`);
    if (impact.budget) impacts.push(`Ngân sách ${impact.budget > 0 ? '+' : ''}${impact.budget}`);
    if (impact.labor) impacts.push(`Lao động ${impact.labor > 0 ? '+' : ''}${impact.labor}`);

    return impacts.join(', ');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative max-w-2xl w-full bg-[var(--glass-bg)] backdrop-blur-xl border-2 border-[var(--glass-border)] rounded-2xl shadow-2xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="p-6 border-b border-[var(--glass-border)]">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{event.icon}</span>
            <div>
              <div className="text-xs text-muted-foreground mb-1">
                {event.type === 'fixed' ? 'Sự kiện cố định' : 'Sự kiện ngẫu nhiên'}
              </div>
              <h2 className="text-2xl font-bold">{event.title}</h2>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Narrative */}
          <div className="bg-background/50 rounded-lg p-4">
            <p className="leading-relaxed">{event.narrative}</p>
          </div>

          {/* Moral Justification */}
          <div className="bg-[#06b6d4]/10 border border-[#06b6d4]/30 rounded-lg p-4">
            <div className="text-xs text-[#06b6d4] font-semibold mb-1">
              LÝ LUẬN MÁC-LÊNIN
            </div>
            <p className="text-sm italic">{event.moralJustification}</p>
          </div>

          {/* Choices */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {event.choices.map((choice, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-background/30 rounded-lg p-4 border-2 border-[var(--glass-border)] hover:border-[#22d3ee] transition-all cursor-pointer"
                onClick={() => onChoice(index as 0 | 1)}
              >
                <div className="font-semibold mb-2">{choice.label}</div>
                <p className="text-sm text-muted-foreground mb-3">{choice.description}</p>
                <div className="text-xs">
                  <div className="font-semibold mb-1">Tác động:</div>
                  <div className="text-[#22d3ee]">
                    {renderImpactList(choice.impact)}
                  </div>
                </div>
                <Button
                  className="w-full mt-3 bg-[#06b6d4] hover:bg-[#22d3ee]"
                  size="sm"
                >
                  Chọn
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
