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
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    fetch('/api/admin/users')
      .then((r) => r.json())
      .then((data) => setUsers(data.users || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    setDeleteError('');

    try {
      const res = await fetch(`/api/admin/users/${deleteTarget.id}`, { method: 'DELETE' });
      const data = await res.json();

      if (!res.ok) {
        setDeleteError(data.error);
        setDeleting(false);
        return;
      }

      setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch {
      setDeleteError('Failed to delete user. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

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
                <th className="text-right text-xs font-bold text-muted uppercase tracking-wider px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-sm text-muted">
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
                    <td className="px-5 py-4 text-right">
                      {user.role !== 'admin' && (
                        <button
                          onClick={() => setDeleteTarget(user)}
                          className="text-xs font-bold text-danger/70 hover:text-danger transition-colors px-3 py-1.5 rounded-lg hover:bg-danger/10"
                        >
                          Remove
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setDeleteTarget(null); setDeleteError(''); }} />
          <div className="relative bg-card border border-border rounded-2xl p-6 sm:p-8 w-full max-w-md animate-fade-in-up">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-danger/10 border border-danger/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-danger" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-xl font-black text-foreground mb-2">Remove User</h2>
              <p className="text-sm text-muted font-medium">
                Are you sure you want to permanently remove <span className="text-foreground font-bold">{deleteTarget.name}</span> ({deleteTarget.email})?
              </p>
              <p className="text-xs text-danger/80 font-semibold mt-2">
                This will delete all their orders, tickets, and data. This action cannot be undone.
              </p>
            </div>

            {deleteError && (
              <div className="bg-danger/10 border border-danger/20 text-danger text-sm font-semibold rounded-xl p-3 mb-4">
                {deleteError}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => { setDeleteTarget(null); setDeleteError(''); }}
                className="flex-1 py-3 bg-background border border-border text-foreground font-bold rounded-xl hover:bg-card transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-3 bg-danger hover:bg-danger/90 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleting ? 'Removing...' : 'Remove User'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
