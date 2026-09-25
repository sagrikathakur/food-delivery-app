import React from 'react';
import { categories_list } from '../../assets/frontend_assets/assets';

const CategoryGrid = ({
  selectedCategory = 'All',
  onSelectCategory,
}) => {
  const allCategories = [
    { category_name: 'All', category_label: 'All Scents' },
    ...categories_list.map(c => ({
      category_name: c.category_name,
      category_label: c.category_name,
    }))
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 border-b border-stone-200 pb-3">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">Fragrance Collections</span>
          <h2 className="text-2xl font-serif text-stone-900 font-bold">Explore Scent Families</h2>
        </div>
      </div>

      {/* Clean borderless tab filter bar */}
      <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-2 border-b border-stone-200 text-xs font-medium">
        {allCategories.map((cat) => {
          const isSelected = selectedCategory === cat.category_name;
          return (
            <button
              key={cat.category_name}
              onClick={() => onSelectCategory && onSelectCategory(cat.category_name)}
              type="button"
              className={`pb-3 text-sm whitespace-nowrap transition-colors relative cursor-pointer outline-none focus:outline-none ${
                isSelected
                  ? 'text-stone-900 font-semibold'
                  : 'text-stone-500 hover:text-stone-800 font-normal'
              }`}
            >
              {cat.category_label}
              {isSelected && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-900 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryGrid;
