'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { formatPriceShort } from '@/lib/utils';
import { winners } from '@/lib/mock-data';

export default function WinnersSection() {
  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Recent Winners
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Real people, real prizes. Check out some of our latest winners from across Scotland and the UK.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {winners.slice(0, 6).map((winner, i) => (
            <motion.div
              key={winner.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 hover:border-accent/30 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                  {winner.name[0]}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{winner.name}</h3>
                  <p className="text-sm text-muted">{winner.location}</p>
                </div>
              </div>
              <div className="bg-background rounded-xl p-4">
                <p className="text-sm text-muted mb-1">Won</p>
                <p className="text-lg font-bold text-accent">{winner.prize}</p>
                <p className="text-sm text-muted mt-1">
                  Worth {formatPriceShort(winner.prizeValue)}
                </p>
              </div>
              <p className="text-xs text-muted mt-3">
                {new Date(winner.wonDate).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link
            href="/winners"
            className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border hover:border-primary/50 text-foreground font-medium rounded-xl transition-all hover:scale-105"
          >
            View All Winners
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
