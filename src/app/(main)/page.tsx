'use client';

import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import CompetitionCard from '@/components/CompetitionCard';
import HowItWorksSection from '@/components/HowItWorksSection';
import WinnersSection from '@/components/WinnersSection';
import { competitions } from '@/lib/mock-data';
import Link from 'next/link';

const featuredCompetitions = competitions.filter((c) => c.featured);
const liveCompetitions = competitions.filter((c) => c.status === 'live').slice(0, 6);

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Featured Competitions */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                Featured Competitions
              </h2>
              <p className="text-muted text-lg">
                Our biggest and best prizes — don&apos;t miss out!
              </p>
            </div>
            <Link
              href="/competitions"
              className="hidden sm:inline-flex items-center gap-1 text-primary-light hover:text-primary font-medium text-sm transition-colors"
            >
              View All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredCompetitions.map((comp, i) => (
              <CompetitionCard key={comp.id} competition={comp} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Ready to Win?
            </h2>
            <p className="text-muted text-lg mb-8 max-w-xl mx-auto">
              Join thousands of winners across Scotland. Sign up today and get access to all our live competitions.
            </p>
            <Link
              href="/auth/register"
              className="inline-flex px-8 py-4 bg-accent hover:bg-accent-light text-background font-bold rounded-xl text-lg transition-all hover:scale-105 glow-accent"
            >
              Create Free Account
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Live Competitions Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Live Competitions
            </h2>
            <p className="text-muted text-lg">
              Browse all our currently live competitions and find your next win.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveCompetitions.map((comp, i) => (
              <CompetitionCard key={comp.id} competition={comp} index={i} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/competitions"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-light text-white font-medium rounded-xl transition-all hover:scale-105"
            >
              See All Competitions
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <HowItWorksSection />
      <WinnersSection />

      {/* Trust / 18+ Banner */}
      <section className="py-12 bg-surface border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { icon: '🔒', title: 'Secure Payments', desc: 'SSL encrypted checkout' },
              { icon: '🎲', title: 'Provably Fair', desc: 'Verified random draws' },
              { icon: '🚚', title: 'Free Delivery', desc: 'All prizes delivered free' },
              { icon: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', title: 'Scottish Company', desc: 'Proudly based in Scotland' },
            ].map((item) => (
              <div key={item.title}>
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="text-xs text-muted mt-0.5">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
