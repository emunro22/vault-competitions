'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const mockTickets = [
  { id: '1', competition: 'BMW M4 Competition or £60,000 Cash', ticketNumbers: [1234, 1235, 1236, 1237, 1238], drawDate: '2026-07-15', status: 'active' as const },
  { id: '2', competition: '£25,000 Cash Prize', ticketNumbers: [456, 457, 458, 459, 460, 461, 462, 463, 464, 465], drawDate: '2026-07-10', status: 'active' as const },
  { id: '3', competition: 'MacBook Pro M4 + iPad Pro Bundle', ticketNumbers: [789, 790, 791], drawDate: '2026-07-08', status: 'active' as const },
  { id: '4', competition: '£10,000 Cash Quickie', ticketNumbers: [123, 124, 125, 126, 127, 128, 129, 130], drawDate: '2026-06-01', status: 'drawn' as const },
  { id: '5', competition: 'PS5 Pro Gaming Setup', ticketNumbers: [55, 56], drawDate: '2026-05-20', status: 'drawn' as const },
];

export default function TicketsPage() {
  const activeTickets = mockTickets.filter((t) => t.status === 'active');
  const pastTickets = mockTickets.filter((t) => t.status === 'drawn');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <div className="flex items-center gap-2 text-sm text-muted mb-4">
          <Link href="/account" className="hover:text-foreground transition-colors">Account</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-foreground">My Tickets</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">My Tickets</h1>
        <p className="text-muted">View all your competition entries and ticket numbers.</p>
      </motion.div>

      {/* Active */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success pulse-live" />
          Active Entries ({activeTickets.length})
        </h2>
        <div className="space-y-4">
          {activeTickets.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl p-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <h3 className="font-semibold text-foreground">{entry.competition}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium bg-success/10 text-success px-2.5 py-1 rounded-lg">
                    Live
                  </span>
                  <span className="text-xs text-muted">
                    Draw: {new Date(entry.drawDate).toLocaleDateString('en-GB')}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {entry.ticketNumbers.map((num) => (
                  <span
                    key={num}
                    className="bg-background border border-border rounded-lg px-3 py-1.5 text-sm font-mono font-medium text-foreground"
                  >
                    #{String(num).padStart(4, '0')}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Past */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Past Entries ({pastTickets.length})
        </h2>
        <div className="space-y-4">
          {pastTickets.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl p-5 opacity-60"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <h3 className="font-semibold text-foreground">{entry.competition}</h3>
                <span className="text-xs font-medium bg-muted/10 text-muted px-2.5 py-1 rounded-lg w-fit">
                  Drawn
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {entry.ticketNumbers.map((num) => (
                  <span
                    key={num}
                    className="bg-background border border-border rounded-lg px-3 py-1.5 text-sm font-mono font-medium text-muted"
                  >
                    #{String(num).padStart(4, '0')}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
