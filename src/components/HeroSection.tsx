import Link from 'next/link';
import HeroSlideshow from './HeroSlideshow';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-20 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <div className="animate-fade-in-up inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-1.5 mb-8">
              <div className="w-2 h-2 rounded-full bg-success pulse-live" />
              <span className="text-sm text-muted">
                <span className="text-foreground font-medium">10+ competitions</span> live now
              </span>
            </div>

            <h1 className="animate-fade-in-up text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6" style={{ animationDelay: '100ms' }}>
              Win Big with{' '}
              <span className="gradient-text">Scotland&apos;s</span>
              <br />
              Premier Competitions
            </h1>

            <p className="animate-fade-in-up text-lg sm:text-xl text-muted max-w-2xl mx-auto lg:mx-0 mb-10" style={{ animationDelay: '200ms' }}>
              From dream cars to life-changing cash prizes, luxury holidays to the latest tech.
              Tickets from just £0.49 — your next win could be one ticket away.
            </p>

            <div className="animate-fade-in-up flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4" style={{ animationDelay: '300ms' }}>
              <Link
                href="/competitions"
                className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-light text-white font-semibold rounded-xl text-lg transition-all hover:scale-105 glow-primary text-center"
              >
                Browse Competitions
              </Link>
              <Link
                href="/how-it-works"
                className="w-full sm:w-auto px-8 py-4 bg-card border border-border hover:border-primary/50 text-foreground font-semibold rounded-xl text-lg transition-all hover:scale-105 text-center"
              >
                How It Works
              </Link>
            </div>

            <div className="animate-fade-in mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-10 text-muted" style={{ animationDelay: '500ms' }}>
              {[
                { value: '500+', label: 'Winners' },
                { value: '£2M+', label: 'Prizes Won' },
                { value: '4.8★', label: 'Trust Rating' },
                { value: '100%', label: 'Verified Draws' },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <HeroSlideshow />
          </div>
        </div>
      </div>
    </section>
  );
}
