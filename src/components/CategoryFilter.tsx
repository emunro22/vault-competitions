'use client';

import { useEffect, useState } from 'react';

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (slug: string) => void;
}

export default function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch('/api/categories')
      .then((r) => r.json())
      .then((data) => setCategories(data.categories || []))
      .catch(console.error);
  }, []);

  const allCategories: Category[] = [{ id: 'all', name: 'All', slug: 'all', icon: '🏆' }, ...categories];

  return (
    <div className="flex flex-wrap gap-2">
      {allCategories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.slug)}
          className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 flex items-center gap-1.5 ${
            activeCategory === category.slug
              ? 'bg-primary text-white'
              : 'text-muted hover:text-foreground hover:bg-card'
          }`}
        >
          <span>{category.icon}</span>
          {category.name}
        </button>
      ))}
    </div>
  );
}
