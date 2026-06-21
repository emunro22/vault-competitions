'use client';

import { motion } from 'framer-motion';
import { percentSold } from '@/lib/utils';

interface ProgressBarProps {
  sold: number;
  total: number;
  showLabel?: boolean;
}

export default function ProgressBar({ sold, total, showLabel = true }: ProgressBarProps) {
  const percent = percentSold(sold, total);
  const isHot = percent >= 80;
  const isWarm = percent >= 50;

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-muted">
            {sold.toLocaleString()} / {total.toLocaleString()} sold
          </span>
          <span className={`text-xs font-semibold ${isHot ? 'text-danger' : isWarm ? 'text-accent' : 'text-success'}`}>
            {percent}%
          </span>
        </div>
      )}
      <div className="w-full h-2.5 bg-background rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className={`h-full rounded-full ${
            isHot
              ? 'bg-gradient-to-r from-accent to-danger'
              : isWarm
              ? 'bg-gradient-to-r from-success to-accent'
              : 'bg-gradient-to-r from-primary to-success'
          }`}
        />
      </div>
      {isHot && (
        <p className="text-[10px] text-danger font-medium mt-1 pulse-live">
          Selling fast — only {total - sold} tickets remaining!
        </p>
      )}
    </div>
  );
}
