'use client';

import Link from 'next/link';
import { useState } from 'react';

const navLinks = [
  { href: '/competitions', label: 'Competitions' },
  { href: '/winners', label: 'Winners' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white text-lg">
              SC
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-foreground">
                Scot<span className="text-primary-light">Comps</span>
              </span>
              <span className="text-[10px] text-muted -mt-1 hidden sm:block tracking-widest uppercase">
                Scotland&apos;s Premier Competitions
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-muted hover:text-foreground transition-colors rounded-lg hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/auth/login"
              className="px-4 py-2 text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/auth/register"
              className="px-5 py-2.5 text-sm font-semibold bg-primary hover:bg-primary-light text-white rounded-xl transition-all hover:scale-105 glow-primary"
            >
              Sign Up
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-muted hover:text-foreground"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-200 ease-in-out bg-surface border-t border-border ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-sm font-medium text-muted hover:text-foreground hover:bg-white/5 rounded-lg transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-border flex gap-3">
            <Link
              href="/auth/login"
              onClick={() => setMobileOpen(false)}
              className="flex-1 text-center px-4 py-3 text-sm font-medium text-foreground border border-border rounded-xl hover:bg-white/5 transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/auth/register"
              onClick={() => setMobileOpen(false)}
              className="flex-1 text-center px-4 py-3 text-sm font-semibold bg-primary text-white rounded-xl hover:bg-primary-light transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
