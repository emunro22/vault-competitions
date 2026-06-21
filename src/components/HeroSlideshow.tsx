'use client';

import { useState, useEffect, useCallback } from 'react';

const slides = [
  { emoji: '🚗', prize: 'Audi RS6 Avant', value: '£85,000', winner: 'Jamie M.', location: 'Glasgow', gradient: 'from-blue-600/20 to-indigo-600/20' },
  { emoji: '💰', prize: '£50,000 Cash', value: '£50,000', winner: 'Sarah K.', location: 'Edinburgh', gradient: 'from-emerald-600/20 to-green-600/20' },
  { emoji: '⌚', prize: 'Rolex Daytona', value: '£28,000', winner: 'Craig D.', location: 'Aberdeen', gradient: 'from-amber-600/20 to-orange-600/20' },
  { emoji: '✈️', prize: 'Holiday to Barbados', value: '£8,000', winner: 'Emma R.', location: 'Dundee', gradient: 'from-cyan-600/20 to-teal-600/20' },
  { emoji: '🎮', prize: 'PS5 Pro Bundle', value: '£3,500', winner: 'Mark T.', location: 'Inverness', gradient: 'from-purple-600/20 to-violet-600/20' },
];

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="w-full max-w-md mx-auto lg:mx-0">
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-card border border-border shadow-2xl shadow-primary/10">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 flex flex-col items-center justify-center p-6 transition-opacity duration-700 bg-gradient-to-br ${slide.gradient} ${
              i === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute top-4 left-4 bg-success/20 text-success text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-success" />
              Verified Win
            </div>
            <span className="text-7xl mb-4">{slide.emoji}</span>
            <h3 className="text-xl font-bold text-foreground text-center">{slide.prize}</h3>
            <p className="text-accent font-semibold mt-1">Worth {slide.value}</p>
            <p className="text-sm text-muted mt-3">
              Won by {slide.winner} &mdash; {slide.location}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? 'bg-primary w-6' : 'bg-border w-2 hover:bg-muted'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
