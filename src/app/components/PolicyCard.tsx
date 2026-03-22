import React from 'react';
import { Coins, Users, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/button';

export interface Policy {
  id: string;
  name: string;
  description: string;
  budgetCost: number;
  laborCost: number;
  impact: {
    T?: number;
    P?: number;
    E?: number;
    I?: number;
    Gap?: number;
  };
}

interface PolicyCardProps {
  policy: Policy;
  onSelect: (policy: Policy) => void;
  disabled?: boolean;
}

export function PolicyCard({ policy, onSelect, disabled = false }: PolicyCardProps) {
  const renderImpact = (key: string, value: number) => {
    const isPositive = value > 0;
    const Icon = isPositive ? TrendingUp : TrendingDown;
    const colorClass = isPositive ? 'text-[#10b981]' : 'text-red-500';

    return (
      <div key={key} className={`flex items-center gap-1 ${colorClass}`}>
        <Icon size={14} />
        <span className="text-xs">
          {key}: {value > 0 ? '+' : ''}{value}
        </span>
      </div>
    );
  };

  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      className={`p-4 rounded-lg border backdrop-blur-lg transition-all ${
        disabled
          ? 'bg-muted/20 border-muted/20 opacity-50 cursor-not-allowed'
          : 'bg-[var(--glass-bg)] border-[var(--glass-border)] hover:border-[#22d3ee] hover:shadow-lg hover:shadow-[#22d3ee]/20 cursor-pointer'
      }`}
    >
      <h4 className="font-semibold mb-2">{policy.name}</h4>
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
        {policy.description}
      </p>

      <div className="flex gap-3 mb-3 text-sm">
        <div className="flex items-center gap-1 text-[#f59e0b]">
          <Coins size={16} />
          <span>{policy.budgetCost}</span>
        </div>
        <div className="flex items-center gap-1 text-[#06b6d4]">
          <Users size={16} />
          <span>{policy.laborCost}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {Object.entries(policy.impact).map(([key, value]) => 
          value !== 0 ? renderImpact(key, value) : null
        )}
      </div>

      <Button
        onClick={() => onSelect(policy)}
        disabled={disabled}
        className="w-full bg-[#06b6d4] hover:bg-[#22d3ee] text-white"
        size="sm"
      >
        Áp dụng
      </Button>
    </motion.div>
  );
}
