'use client';

import { use } from 'react';
import Link from 'next/link';
import { competitions } from '@/lib/mock-data';
import { formatPrice, formatPriceShort } from '@/lib/utils';
import CountdownTimer from '@/components/CountdownTimer';
import ProgressBar from '@/components/ProgressBar';
import TicketSelector from '@/components/TicketSelector';

export default function CompetitionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const competition = competitions.find((c) => c.slug === slug);

  if (!competition) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-3xl font-bold text-foreground mb-4">Competition Not Found</h1>
        <p className="text-muted mb-8">This competition may have ended or been removed.</p>
        <Link
          href="/competitions"
          className="inline-flex px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-light transition-colors"
        >
          Browse Competitions
        </Link>
      </div>
    );
  }

  const remaining = competition.totalTickets - competition.ticketsSold;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-14">
      <nav className="animate-fade-in flex items-center gap-2 text-sm text-muted mb-8">
        <Link href="/competitions" className="hover:text-foreground transition-colors">
          Competitions
        </Link>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-foreground truncate">{competition.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        <div className="animate-fade-in-up lg:col-span-3 space-y-6">
          <div className="relative aspect-[16/10] bg-card rounded-2xl overflow-hidden border border-border">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <span className="text-8xl opacity-40">
                {competition.category === 'cars' ? '🚗' :
                 competition.category === 'cash' ? '💰' :
                 competition.category === 'tech' ? '💻' :
                 competition.category === 'holidays' ? '✈️' :
                 competition.category === 'experiences' ? '🎯' :
                 competition.category === 'home' ? '🏠' :
                 competition.category === 'watches-jewellery' ? '⌚' : '🏆'}
              </span>
            </div>
            {competition.featured && (
              <div className="absolute top-4 left-4 bg-accent text-background text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg">
                Featured
              </div>
            )}
            <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm text-foreground text-xs font-medium uppercase tracking-wider px-3 py-1.5 rounded-lg border border-border/50">
              {competition.category}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-xs text-muted uppercase tracking-wider mb-1">Prize Value</p>
              <p className="text-2xl font-bold text-accent">{formatPriceShort(competition.prizeValue)}</p>
            </div>
            {competition.cashAlternative && (
              <div className="bg-card border border-border rounded-xl p-4">
                <p className="text-xs text-muted uppercase tracking-wider mb-1">Cash Alternative</p>
                <p className="text-2xl font-bold text-foreground">{formatPriceShort(competition.cashAlternative)}</p>
              </div>
            )}
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-xs text-muted uppercase tracking-wider mb-1">Max Tickets</p>
              <p className="text-2xl font-bold text-foreground">{competition.totalTickets.toLocaleString()}</p>
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              {competition.title}
            </h1>
            <p className="text-muted leading-relaxed whitespace-pre-line">
              {competition.description}
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Competition Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Ticket Price', value: formatPrice(competition.ticketPrice) },
                { label: 'Total Tickets', value: competition.totalTickets.toLocaleString() },
                { label: 'Tickets Remaining', value: remaining.toLocaleString() },
                { label: 'Max Per Person', value: competition.maxPerPerson.toString() },
                { label: 'Draw Date', value: new Date(competition.drawDate).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) },
                { label: 'Draw Time', value: new Date(competition.drawDate).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <span className="text-sm text-muted">{item.label}</span>
                  <span className="text-sm font-medium text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="animate-fade-in-up lg:col-span-2" style={{ animationDelay: '200ms' }}>
          <div className="lg:sticky lg:top-24 space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-success pulse-live" />
                <span className="text-sm font-medium text-success">Live Now</span>
              </div>
              <p className="text-sm text-muted mb-3">Draw closes in</p>
              <div className="flex justify-center">
                <CountdownTimer endDate={competition.drawDate} />
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <ProgressBar sold={competition.ticketsSold} total={competition.totalTickets} />
            </div>

            <TicketSelector
              ticketPrice={competition.ticketPrice}
              maxPerPerson={competition.maxPerPerson}
              remainingTickets={remaining}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
