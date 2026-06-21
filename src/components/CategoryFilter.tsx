'use client';

import { motion } from 'framer-motion';
import { categories } from '@/lib/mock-data';

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (slug: string) => void;
}

export default function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.slug)}
          className="relative px-4 py-2 text-sm font-medium rounded-xl transition-colors"
        >
          {activeCategory === category.slug && (
            <motion.div
              layoutId="activeCategory"
              className="absolute inset-0 bg-primary rounded-xl"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span
            className={`relative z-10 flex items-center gap-1.5 ${
              activeCategory === category.slug ? 'text-white' : 'text-muted hover:text-foreground'
            }`}
          >
            <span>{category.icon}</span>
            {category.name}
          </span>
        </button>
      ))}
    </div>
  );
}
