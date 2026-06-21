import { winners } from '@/lib/mock-data';
import { formatPriceShort } from '@/lib/utils';

export default function WinnersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <div className="animate-fade-in-up text-center mb-14">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Our Winners
        </h1>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          Real people winning real prizes. Meet some of our lucky winners from across Scotland and the UK.
        </p>
      </div>

      <div className="animate-fade-in-up grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14" style={{ animationDelay: '100ms' }}>
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
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {winners.map((winner, i) => (
          <div
            key={winner.id}
            className="animate-fade-in-up bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/30 transition-colors"
            style={{ animationDelay: `${(i + 2) * 100}ms` }}
          >
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
          </div>
        ))}
      </div>
    </div>
  );
}
