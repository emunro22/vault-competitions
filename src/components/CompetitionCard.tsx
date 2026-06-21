'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { formatPrice, formatPriceShort } from '@/lib/utils';
import CountdownTimer from './CountdownTimer';
import ProgressBar from './ProgressBar';
import type { Competition } from '@/lib/mock-data';

interface CompetitionCardProps {
  competition: Competition;
  index?: number;
}

export default function CompetitionCard({ competition, index = 0 }: CompetitionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/competitions/${competition.slug}`} className="group block">
        <div className="bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 card-shine">
          {/* Image */}
          <div className="relative aspect-[4/3] bg-background overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <span className="text-6xl opacity-40">
                {competition.category === 'cars' ? '🚗' :
                 competition.category === 'cash' ? '💰' :
                 competition.category === 'tech' ? '💻' :
                 competition.category === 'holidays' ? '✈️' :
                 competition.category === 'experiences' ? '🎯' :
                 competition.category === 'home' ? '🏠' :
                 competition.category === 'watches-jewellery' ? '⌚' : '🏆'}
              </span>
            </div>
            {/* Featured badge */}
            {competition.featured && (
              <div className="absolute top-3 left-3 bg-accent text-background text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg">
                Featured
              </div>
            )}
            {/* Category badge */}
            <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm text-foreground text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-lg border border-border/50">
              {competition.category}
            </div>
            {/* Price overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-card via-card/80 to-transparent pt-8 pb-3 px-4">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] text-muted uppercase tracking-wider">Prize Worth</p>
                  <p className="text-2xl font-bold text-accent">
                    {formatPriceShort(competition.prizeValue)}
                  </p>
                </div>
                {competition.cashAlternative && (
                  <div className="text-right">
                    <p className="text-[10px] text-muted uppercase tracking-wider">Cash Alt.</p>
                    <p className="text-sm font-semibold text-foreground">
                      {formatPriceShort(competition.cashAlternative)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            <h3 className="font-semibold text-foreground group-hover:text-primary-light transition-colors line-clamp-2 leading-snug">
              {competition.title}
            </h3>

            {/* Countdown */}
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-success pulse-live" />
              <CountdownTimer endDate={competition.drawDate} compact />
            </div>

            {/* Progress */}
            <ProgressBar sold={competition.ticketsSold} total={competition.totalTickets} />

            {/* CTA */}
            <div className="flex items-center justify-between pt-1">
              <div>
                <p className="text-[10px] text-muted uppercase tracking-wider">Ticket Price</p>
                <p className="text-lg font-bold text-foreground">
                  {formatPrice(competition.ticketPrice)}
                </p>
              </div>
              <div className="bg-success hover:bg-success-light text-background font-semibold text-sm px-5 py-2.5 rounded-xl transition-all group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-success/20">
                Enter Now
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
