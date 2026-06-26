'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';

interface AccountData {
  user: { id: string; name: string; email: string };
  stats: { totalEntries: number; totalSpent: number; wins: number };
  recentOrders: { id: string; competition: string; tickets: number; date: string; status: string }[];
}

export default function AccountPage() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<AccountData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
      return;
    }
    if (user) {
      fetch('/api/account')
        .then((r) => r.json())
        .then(setData)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [user, authLoading, router]);

  if (authLoading || loading || !user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 flex justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const stats = data?.stats || { totalEntries: 0, totalSpent: 0, wins: 0 };
  const recentOrders = data?.recentOrders || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <div className="animate-fade-in-up mb-10">
        <h1 className="text-3xl font-black text-foreground mb-2">My Account</h1>
        <p className="text-muted font-medium">Welcome back, {user.name}</p>
      </div>

      <div className="animate-fade-in-up grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10" style={{ animationDelay: '100ms' }}>
        {[
          { label: 'Total Entries', value: stats.totalEntries.toString() },
          { label: 'Competitions Won', value: stats.wins.toString() },
          { label: 'Total Spent', value: `£${(stats.totalSpent / 100).toFixed(2)}` },
          { label: 'Account Type', value: user.role === 'admin' ? 'Admin' : 'Member' },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-xl p-5">
            <p className="text-2xl font-black text-foreground">{stat.value}</p>
            <p className="text-xs text-muted mt-1 font-semibold">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="animate-fade-in-up lg:col-span-2" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Recent Entries</h2>
            <Link href="/account/tickets" className="text-sm text-primary hover:text-primary-light font-bold transition-colors">
              View All
            </Link>
          </div>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-xs font-bold text-muted uppercase tracking-wider px-5 py-3">Competition</th>
                    <th className="text-left text-xs font-bold text-muted uppercase tracking-wider px-5 py-3">Tickets</th>
                    <th className="text-left text-xs font-bold text-muted uppercase tracking-wider px-5 py-3">Date</th>
                    <th className="text-left text-xs font-bold text-muted uppercase tracking-wider px-5 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-5 py-8 text-center text-sm text-muted">
                        No entries yet. <Link href="/competitions" className="text-primary font-bold">Browse competitions</Link>
                      </td>
                    </tr>
                  ) : (
                    recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-border/50 last:border-0 hover:bg-white/[0.02]">
                        <td className="px-5 py-4 text-sm text-foreground font-semibold">{order.competition}</td>
                        <td className="px-5 py-4 text-sm text-muted font-medium">{order.tickets}</td>
                        <td className="px-5 py-4 text-sm text-muted font-medium">
                          {new Date(order.date).toLocaleDateString('en-GB')}
                        </td>
                        <td className="px-5 py-4">
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                            order.status === 'active'
                              ? 'bg-success/10 text-success'
                              : 'bg-muted/10 text-muted'
                          }`}>
                            {order.status === 'active' ? 'Live' : 'Drawn'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <h2 className="text-xl font-bold text-foreground mb-4">Profile</h2>
          <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-4 pb-5 border-b border-border">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-background text-xl font-black">
                {user.name[0]}
              </div>
              <div>
                <p className="font-bold text-foreground">{user.name}</p>
                <p className="text-sm text-muted font-medium">{user.email}</p>
              </div>
            </div>
            {user.role === 'admin' && (
              <Link
                href="/admin"
                className="block w-full py-2.5 bg-primary/10 border border-primary/20 text-primary text-sm font-bold rounded-xl text-center hover:bg-primary/20 transition-colors"
              >
                Admin Portal
              </Link>
            )}
            <button
              onClick={async () => {
                await logout();
                router.push('/');
              }}
              className="w-full py-2.5 bg-danger/10 border border-danger/20 text-danger text-sm font-bold rounded-xl hover:bg-danger/20 transition-colors"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
