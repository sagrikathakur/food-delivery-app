import React from 'react';
import { categories_list } from '../../assets/frontend_assets/assets';

const CategoryGrid = ({
  selectedCategory = 'All',
  onSelectCategory,
}) => {
  const allCategories = [
    { category_name: 'All', category_label: 'All Scents', icon: '✨' },
    ...categories_list.map(c => ({
      category_name: c.category_name,
      category_label: c.category_name,
      category_image: c.category_image
    }))
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-stone-200/80 pb-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">Olfactory Collections</span>
          <h2 className="text-2xl font-serif text-stone-900 font-bold">Explore Fragrance Families</h2>
        </div>
        <p className="text-xs text-stone-500 font-light">Select a scent profile to filter our master artisan catalog.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {allCategories.map((cat) => {
          const isSelected = selectedCategory === cat.category_name;
          return (
            <button
              key={cat.category_name}
              onClick={() => onSelectCategory && onSelectCategory(cat.category_name)}
              type="button"
              className={`p-3 rounded-2xl border transition-all text-center flex flex-col items-center justify-center gap-2 group cursor-pointer ${
                isSelected
                  ? 'bg-amber-900 text-white border-amber-900 shadow-md scale-105 ring-2 ring-amber-800/30'
                  : 'bg-white border-stone-200/90 hover:border-amber-700/50 hover:shadow-sm text-stone-700'
              }`}
            >
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-stone-100 flex items-center justify-center border border-stone-200/60 p-1 group-hover:scale-110 transition-transform">
                {cat.category_image ? (
                  <img
                    src={cat.category_image}
                    alt={cat.category_label}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-xl">{cat.icon || '🌸'}</span>
                )}
              </div>
              <span className="text-[11px] font-serif font-medium leading-snug line-clamp-1">
                {cat.category_label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryGrid;
