'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { competitions } from '@/lib/mock-data';

export default function EditCompetitionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const competition = competitions.find((c) => c.id === id);

  if (!competition) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-foreground mb-4">Competition Not Found</h1>
        <Link href="/admin/competitions" className="text-primary-light hover:text-primary transition-colors">
          Back to Competitions
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 text-sm text-muted mb-6">
          <Link href="/admin/competitions" className="hover:text-foreground transition-colors">
            Competitions
          </Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-foreground">Edit</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">
          Edit: {competition.title}
        </h1>

        <form className="space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
            <h2 className="text-lg font-semibold text-foreground">Basic Information</h2>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Title</label>
              <input
                type="text"
                defaultValue={competition.title}
                className="w-full h-12 bg-background border border-border rounded-xl px-4 text-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
              <textarea
                defaultValue={competition.description}
                rows={5}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Category</label>
                <select
                  defaultValue={competition.category}
                  className="w-full h-12 bg-background border border-border rounded-xl px-4 text-foreground focus:outline-none focus:border-primary transition-colors cursor-pointer"
                >
                  <option value="cars">Cars</option>
                  <option value="cash">Cash</option>
                  <option value="tech">Tech</option>
                  <option value="holidays">Holidays</option>
                  <option value="experiences">Experiences</option>
                  <option value="home">Home</option>
                  <option value="watches-jewellery">Watches & Jewellery</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Status</label>
                <select
                  defaultValue={competition.status}
                  className="w-full h-12 bg-background border border-border rounded-xl px-4 text-foreground focus:outline-none focus:border-primary transition-colors cursor-pointer"
                >
                  <option value="draft">Draft</option>
                  <option value="live">Live</option>
                  <option value="coming_soon">Coming Soon</option>
                  <option value="sold_out">Sold Out</option>
                  <option value="drawn">Drawn</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
            <h2 className="text-lg font-semibold text-foreground">Ticket & Prize</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Ticket Price (pence)</label>
                <input
                  type="number"
                  defaultValue={competition.ticketPrice}
                  className="w-full h-12 bg-background border border-border rounded-xl px-4 text-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Total Tickets</label>
                <input
                  type="number"
                  defaultValue={competition.totalTickets}
                  className="w-full h-12 bg-background border border-border rounded-xl px-4 text-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Tickets Sold</label>
                <input
                  type="number"
                  defaultValue={competition.ticketsSold}
                  className="w-full h-12 bg-background border border-border rounded-xl px-4 text-foreground focus:outline-none focus:border-primary transition-colors"
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              className="px-5 py-2.5 text-sm font-medium text-danger hover:bg-danger/10 rounded-xl transition-colors"
            >
              Delete Competition
            </button>
            <div className="flex items-center gap-4">
              <Link href="/admin/competitions" className="px-5 py-2.5 text-sm font-medium text-muted hover:text-foreground transition-colors">
                Cancel
              </Link>
              <button
                type="submit"
                className="px-6 py-2.5 bg-primary hover:bg-primary-light text-white font-medium text-sm rounded-xl transition-all hover:scale-105"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
