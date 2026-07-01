'use client';

import { useState, useEffect } from 'react';

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('🏆');
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const loadCategories = () => {
    fetch('/api/admin/categories')
      .then((r) => r.json())
      .then((data) => setCategories(data.categories || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError('');
    setCreating(true);

    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, icon }),
      });
      const data = await res.json();

      if (!res.ok) {
        setCreateError(data.error || 'Failed to create category');
        return;
      }

      setName('');
      setIcon('🏆');
      loadCategories();
    } catch {
      setCreateError('Something went wrong');
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    setDeleteError('');

    try {
      const res = await fetch(`/api/admin/categories/${deleteTarget.id}`, { method: 'DELETE' });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setDeleteError(data.error || 'Failed to delete category');
        return;
      }

      setCategories((prev) => prev.filter((c) => c.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch {
      setDeleteError('Failed to delete category');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="animate-fade-in-up mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-foreground mb-1">Categories</h1>
        <p className="text-muted font-medium">Manage the categories competitions can be assigned to.</p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 mb-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Add Category</h2>
        {createError && (
          <div className="bg-danger/10 border border-danger/20 text-danger text-sm font-semibold rounded-xl p-3 mb-4">
            {createError}
          </div>
        )}
        <form onSubmit={handleCreate} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            maxLength={4}
            className="w-full sm:w-16 h-12 bg-background border border-border rounded-xl px-3 text-center text-lg text-foreground focus:outline-none focus:border-primary transition-colors"
            placeholder="🏆"
            aria-label="Icon"
          />
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full flex-1 h-12 bg-background border border-border rounded-xl px-4 text-foreground placeholder-muted focus:outline-none focus:border-primary transition-colors"
            placeholder="e.g. Motorbikes"
            aria-label="Category name"
          />
          <button
            type="submit"
            disabled={creating}
            className="px-6 h-12 bg-primary hover:bg-primary-light text-background font-bold text-sm rounded-xl transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shrink-0"
          >
            {creating ? 'Adding...' : 'Add Category'}
          </button>
        </form>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {categories.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-muted">No categories yet</p>
        ) : (
          <ul className="divide-y divide-border/50">
            {categories.map((cat) => (
              <li key={cat.id} className="flex items-center justify-between gap-4 px-5 py-4">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xl shrink-0">{cat.icon}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-foreground truncate">{cat.name}</p>
                    <p className="text-xs text-muted font-medium truncate">{cat.slug}</p>
                  </div>
                </div>
                <button
                  onClick={() => { setDeleteTarget(cat); setDeleteError(''); }}
                  className="text-xs font-bold text-danger/70 hover:text-danger transition-colors px-3 py-1.5 rounded-lg hover:bg-danger/10 shrink-0"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
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
              <h2 className="text-xl font-black text-foreground mb-2">Delete Category</h2>
              <p className="text-sm text-muted font-medium">
                Are you sure you want to delete <span className="text-foreground font-bold">{deleteTarget.name}</span>?
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
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
