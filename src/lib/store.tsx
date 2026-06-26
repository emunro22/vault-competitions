'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { Competition } from './mock-data';
import { formatPrice } from './utils';

export interface CartItem {
  competitionId: string;
  competitionTitle: string;
  imageUrl: string;
  ticketPrice: number;
  quantity: number;
}

interface StoreContextType {
  competitions: Competition[];
  competitionsLoading: boolean;
  cart: CartItem[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (competitionId: string) => void;
  updateCartQuantity: (competitionId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [competitionsLoading, setCompetitionsLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    fetch('/api/competitions')
      .then((r) => r.json())
      .then((data) => {
        if (data.competitions) {
          setCompetitions(data.competitions);
        }
      })
      .catch(console.error)
      .finally(() => setCompetitionsLoading(false));
  }, []);

  const addToCart = useCallback((item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.competitionId === item.competitionId);
      if (existing) {
        return prev.map((i) =>
          i.competitionId === item.competitionId
            ? { ...i, quantity: item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((competitionId: string) => {
    setCart((prev) => prev.filter((i) => i.competitionId !== competitionId));
  }, []);

  const updateCartQuantity = useCallback((competitionId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((i) => i.competitionId !== competitionId));
      return;
    }
    setCart((prev) =>
      prev.map((i) =>
        i.competitionId === competitionId ? { ...i, quantity } : i
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartTotal = cart.reduce((sum, item) => sum + item.ticketPrice * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        competitions,
        competitionsLoading,
        cart,
        cartOpen,
        setCartOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}

export function useCompetitions() {
  return useStore().competitions;
}

export function useCompetition(idOrSlug: string) {
  const { competitions } = useStore();
  return competitions.find((c) => c.id === idOrSlug || c.slug === idOrSlug);
}

export { formatPrice };
