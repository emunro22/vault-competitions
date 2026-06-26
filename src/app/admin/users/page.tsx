'use client';

import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  phone: string | null;
  createdAt: string;
  totalEntries: number;
  totalSpent: number;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/admin/users')
      .then((r) => r.json())
      .then((data) => setUsers(data.users || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalUsers = users.length;
  const adminCount = users.filter((u) => u.role === 'admin').length;
  const thisWeek = users.filter(
    (u) => Date.now() - new Date(u.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000
  ).length;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="animate-fade-in-up mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-foreground mb-1">Users</h1>
        <p className="text-muted font-medium">Manage registered users and their accounts.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Users', value: totalUsers.toLocaleString() },
          { label: 'New This Week', value: thisWeek.toString() },
          { label: 'Admin Users', value: adminCount.toString() },
          { label: 'Regular Users', value: (totalUsers - adminCount).toString() },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-xl p-4">
            <p className="text-xl font-black text-foreground">{stat.value}</p>
            <p className="text-xs text-muted font-semibold">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full sm:w-80 h-11 bg-card border border-border rounded-xl px-4 text-foreground placeholder-muted focus:outline-none focus:border-primary transition-colors text-sm font-medium"
        />
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-bold text-muted uppercase tracking-wider px-5 py-3">User</th>
                <th className="text-left text-xs font-bold text-muted uppercase tracking-wider px-5 py-3 hidden sm:table-cell">Role</th>
                <th className="text-left text-xs font-bold text-muted uppercase tracking-wider px-5 py-3 hidden md:table-cell">Entries</th>
                <th className="text-left text-xs font-bold text-muted uppercase tracking-wider px-5 py-3 hidden lg:table-cell">Total Spent</th>
                <th className="text-left text-xs font-bold text-muted uppercase tracking-wider px-5 py-3 hidden md:table-cell">Joined</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-sm text-muted">
                    {search ? 'No users match your search' : 'No users yet'}
                  </td>
                </tr>
              ) : (
                filtered.map((user) => (
                  <tr key={user.id} className="border-b border-border/50 last:border-0 hover:bg-white/[0.02]">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-background text-sm font-black shrink-0">
                          {user.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground">{user.name}</p>
                          <p className="text-xs text-muted font-medium">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                        user.role === 'admin' ? 'bg-primary/10 text-primary' : 'bg-background border border-border text-muted'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-muted hidden md:table-cell font-medium">{user.totalEntries}</td>
                    <td className="px-5 py-4 text-sm text-foreground hidden lg:table-cell font-bold">
                      £{(user.totalSpent / 100).toFixed(2)}
                    </td>
                    <td className="px-5 py-4 text-xs text-muted hidden md:table-cell font-medium">
                      {new Date(user.createdAt).toLocaleDateString('en-GB')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
