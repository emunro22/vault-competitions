'use client';

import { useState } from 'react';
import { formatPrice } from '@/lib/utils';

interface TicketSelectorProps {
  ticketPrice: number;
  maxPerPerson: number;
  remainingTickets: number;
}

const quickPicks = [1, 5, 10, 25, 50];

export default function TicketSelector({ ticketPrice, maxPerPerson, remainingTickets }: TicketSelectorProps) {
  const [quantity, setQuantity] = useState(1);
  const max = Math.min(maxPerPerson, remainingTickets);
  const total = quantity * ticketPrice;

  const handleChange = (val: number) => {
    setQuantity(Math.max(1, Math.min(val, max)));
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-1">Get Your Tickets</h3>
        <p className="text-sm text-muted">
          {formatPrice(ticketPrice)} per ticket &middot; Max {maxPerPerson} per person
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {quickPicks.filter((n) => n <= max).map((n) => (
          <button
            key={n}
            onClick={() => setQuantity(n)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              quantity === n
                ? 'bg-primary text-white glow-primary'
                : 'bg-background border border-border text-muted hover:text-foreground hover:border-primary/50'
            }`}
          >
            {n} {n === 1 ? 'ticket' : 'tickets'}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => handleChange(quantity - 1)}
          disabled={quantity <= 1}
          className="w-12 h-12 rounded-xl bg-background border border-border text-foreground font-bold text-xl flex items-center justify-center hover:border-primary/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          onChange={(e) => handleChange(parseInt(e.target.value) || 1)}
          min={1}
          max={max}
          className="flex-1 h-12 bg-background border border-border rounded-xl text-center text-lg font-bold text-foreground focus:outline-none focus:border-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button
          onClick={() => handleChange(quantity + 1)}
          disabled={quantity >= max}
          className="w-12 h-12 rounded-xl bg-background border border-border text-foreground font-bold text-xl flex items-center justify-center hover:border-primary/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          +
        </button>
      </div>

      <div className="bg-background rounded-xl p-4 flex items-center justify-between">
        <span className="text-muted">Total</span>
        <span className="text-2xl font-bold text-foreground">
          {formatPrice(total)}
        </span>
      </div>

      <button className="w-full py-4 bg-success hover:bg-success-light text-background font-bold text-lg rounded-xl transition-all hover:scale-[1.02] glow-success">
        Add to Cart
      </button>

      <p className="text-xs text-muted text-center">
        Secure checkout powered by Stripe. You must be 18+ to enter.
      </p>
    </div>
  );
}
