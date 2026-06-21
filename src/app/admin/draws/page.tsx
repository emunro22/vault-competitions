'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { competitions } from '@/lib/mock-data';
import { percentSold } from '@/lib/utils';

export default function AdminDrawsPage() {
  const [selectedComp, setSelectedComp] = useState<string | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [result, setResult] = useState<{ ticket: number; competition: string } | null>(null);

  const eligibleComps = competitions.filter((c) => c.status === 'live');

  const runDraw = async () => {
    if (!selectedComp) return;
    const comp = competitions.find((c) => c.id === selectedComp);
    if (!comp) return;

    setDrawing(true);
    setResult(null);

    await new Promise((r) => setTimeout(r, 3000));

    const winningTicket = Math.floor(Math.random() * comp.ticketsSold) + 1;
    setResult({ ticket: winningTicket, competition: comp.title });
    setDrawing(false);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">Draw Manager</h1>
        <p className="text-muted">Run verified draws for completed competitions.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Draw Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Run a Draw</h2>

            <div className="mb-5">
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Select Competition
              </label>
              <select
                value={selectedComp || ''}
                onChange={(e) => {
                  setSelectedComp(e.target.value || null);
                  setResult(null);
                }}
                className="w-full h-12 bg-background border border-border rounded-xl px-4 text-foreground focus:outline-none focus:border-primary transition-colors cursor-pointer"
              >
                <option value="">Choose a competition...</option>
                {eligibleComps.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} ({percentSold(c.ticketsSold, c.totalTickets)}% sold)
                  </option>
                ))}
              </select>
            </div>

            {selectedComp && (() => {
              const comp = competitions.find((c) => c.id === selectedComp);
              if (!comp) return null;
              return (
                <div className="bg-background rounded-xl p-4 mb-5 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Tickets Sold</span>
                    <span className="text-foreground font-medium">{comp.ticketsSold.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Total Tickets</span>
                    <span className="text-foreground font-medium">{comp.totalTickets.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Draw Date</span>
                    <span className="text-foreground font-medium">
                      {new Date(comp.drawDate).toLocaleDateString('en-GB')}
                    </span>
                  </div>
                </div>
              );
            })()}

            <button
              onClick={runDraw}
              disabled={!selectedComp || drawing}
              className="w-full py-4 bg-accent hover:bg-accent-light text-background font-bold text-lg rounded-xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 glow-accent"
            >
              {drawing ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Drawing winner...
                </span>
              ) : (
                'Run Draw'
              )}
            </button>

            {/* Result */}
            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 bg-success/10 border border-success/30 rounded-xl p-6 text-center"
              >
                <p className="text-sm text-success font-medium mb-2">Winner Selected!</p>
                <p className="text-3xl font-bold text-foreground font-mono mb-1">
                  Ticket #{String(result.ticket).padStart(4, '0')}
                </p>
                <p className="text-sm text-muted">{result.competition}</p>
                <p className="text-xs text-muted mt-3">
                  Demo draw — connect database to match ticket to user
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Upcoming Draws List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">Upcoming Draws</h2>
          <div className="space-y-3">
            {eligibleComps
              .sort((a, b) => new Date(a.drawDate).getTime() - new Date(b.drawDate).getTime())
              .map((comp) => {
                const pct = percentSold(comp.ticketsSold, comp.totalTickets);
                return (
                  <div key={comp.id} className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="text-sm font-medium text-foreground line-clamp-1">{comp.title}</h3>
                        <p className="text-xs text-muted mt-0.5">
                          {new Date(comp.drawDate).toLocaleDateString('en-GB', {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg shrink-0 ${
                        pct >= 80 ? 'bg-danger/10 text-danger' : pct >= 50 ? 'bg-accent/10 text-accent' : 'bg-success/10 text-success'
                      }`}>
                        {pct}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-background rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          pct >= 80 ? 'bg-danger' : pct >= 50 ? 'bg-accent' : 'bg-success'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted mt-2">
                      {comp.ticketsSold.toLocaleString()} / {comp.totalTickets.toLocaleString()} tickets sold
                    </p>
                  </div>
                );
              })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
