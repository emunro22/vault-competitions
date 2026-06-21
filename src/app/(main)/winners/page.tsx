'use client';

import { motion } from 'framer-motion';
import { winners } from '@/lib/mock-data';
import { formatPriceShort } from '@/lib/utils';

export default function WinnersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Our Winners
        </h1>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          Real people winning real prizes. Meet some of our lucky winners from across Scotland and the UK.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14"
      >
        {[
          { value: '500+', label: 'Total Winners' },
          { value: '£2M+', label: 'Prizes Awarded' },
          { value: '48hrs', label: 'Avg Cash Payout' },
          { value: '100%', label: 'Prizes Claimed' },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-xl p-5 text-center">
            <div className="text-2xl font-bold text-accent mb-1">{stat.value}</div>
            <div className="text-xs text-muted">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Winners Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {winners.map((winner, i) => (
          <motion.div
            key={winner.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/30 transition-colors"
          >
            {/* Winner Image Placeholder */}
            <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-3xl font-bold">
                {winner.name[0]}
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-foreground text-lg">{winner.name}</h3>
                  <p className="text-sm text-muted">{winner.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-accent">{formatPriceShort(winner.prizeValue)}</p>
                </div>
              </div>

              <div className="bg-background rounded-xl p-4 mb-3">
                <p className="text-xs text-muted uppercase tracking-wider mb-1">Won</p>
                <p className="font-semibold text-foreground">{winner.prize}</p>
                <p className="text-xs text-muted mt-1">{winner.competitionTitle}</p>
              </div>

              <p className="text-xs text-muted">
                {new Date(winner.wonDate).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
