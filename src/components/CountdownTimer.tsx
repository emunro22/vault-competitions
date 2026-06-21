'use client';

import { useState, useEffect } from 'react';
import { getTimeRemaining } from '@/lib/utils';

interface CountdownTimerProps {
  endDate: string;
  compact?: boolean;
}

export default function CountdownTimer({ endDate, compact = false }: CountdownTimerProps) {
  const [time, setTime] = useState(getTimeRemaining(endDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeRemaining(endDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [endDate]);

  if (time.total <= 0) {
    return (
      <div className="text-danger font-semibold text-sm">Draw Complete</div>
    );
  }

  const blocks = [
    { value: time.days, label: 'Days' },
    { value: time.hours, label: 'Hrs' },
    { value: time.minutes, label: 'Min' },
    { value: time.seconds, label: 'Sec' },
  ];

  if (compact) {
    return (
      <div className="flex items-center gap-1.5">
        {blocks.map((block, i) => (
          <div key={block.label} className="flex items-center gap-1.5">
            <div className="bg-background/80 rounded-md px-1.5 py-0.5 min-w-[28px] text-center">
              <span className="text-xs font-bold font-mono text-foreground">
                {String(block.value).padStart(2, '0')}
              </span>
            </div>
            {i < blocks.length - 1 && (
              <span className="text-muted text-xs">:</span>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {blocks.map((block, i) => (
        <div key={block.label} className="flex items-center gap-2">
          <div className="bg-card border border-border rounded-xl px-3 py-2 min-w-[60px] text-center">
            <div className="text-xl sm:text-2xl font-bold font-mono text-foreground">
              {String(block.value).padStart(2, '0')}
            </div>
            <div className="text-[10px] text-muted uppercase tracking-wider mt-0.5">
              {block.label}
            </div>
          </div>
          {i < blocks.length - 1 && (
            <span className="text-muted text-lg font-bold">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
