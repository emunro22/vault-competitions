'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';

interface TicketEntry {
  competitionId: string;
  competition: string;
  slug: string;
  drawDate: string;
  status: 'active' | 'drawn';
  ticketNumbers: number[];
}

export default function TicketsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [entries, setEntries] = useState<TicketEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
      return;
    }
    if (user) {
      fetch('/api/account/tickets')
        .then((r) => r.json())
        .then((data) => setEntries(data.entries || []))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [user, authLoading, router]);

  if (authLoading || loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 flex justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const activeEntries = entries.filter((t) => t.status === 'active');
  const pastEntries = entries.filter((t) => t.status === 'drawn');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <div className="animate-fade-in-up mb-10">
        <div className="flex items-center gap-2 text-sm text-muted mb-4">
          <Link href="/account" className="hover:text-foreground transition-colors">Account</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-foreground">My Tickets</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">My Tickets</h1>
        <p className="text-muted">View all your competition entries and ticket numbers.</p>
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success pulse-live" />
          Active Entries ({activeEntries.length})
        </h2>
        {activeEntries.length === 0 ? (
          <div className="bg-card border border-border rounded-2xl p-8 text-center">
            <p className="text-muted mb-4">No active entries yet.</p>
            <Link href="/competitions" className="text-primary font-bold hover:text-primary-light transition-colors">
              Browse Competitions
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {activeEntries.map((entry, i) => (
              <div
                key={entry.competitionId}
                className="animate-fade-in-up bg-card border border-border rounded-2xl p-5"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <Link href={`/competitions/${entry.slug}`} className="font-semibold text-foreground hover:text-primary transition-colors">
                    {entry.competition}
                  </Link>
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
              </div>
            ))}
          </div>
        )}
      </section>

      {pastEntries.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Past Entries ({pastEntries.length})
          </h2>
          <div className="space-y-4">
            {pastEntries.map((entry, i) => (
              <div
                key={entry.competitionId}
                className="animate-fade-in-up bg-card border border-border rounded-2xl p-5 opacity-60"
                style={{ animationDelay: `${(i + activeEntries.length) * 100}ms` }}
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
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
