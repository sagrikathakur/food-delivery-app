import React from 'react';

const CategoryGrid = ({
  selectedCategory = 'All',
  onSelectCategory,
}) => {
  const categories = [
    { id: 'All', name: 'All Scents', icon: '✨' },
    { id: 'Floral', name: 'Wild Florals', icon: '🌸' },
    { id: 'Woody', name: 'Woody & Cedar', icon: '🌲' },
    { id: 'Amber', name: 'Warm Amber', icon: '🔥' },
    { id: 'Fresh', name: 'Fresh Citrus', icon: '🍋' },
    { id: 'Discovery', name: 'Discovery Sets', icon: '🎁' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-serif text-stone-900">Explore Fragrance Families</h2>
        <span className="text-xs font-medium text-amber-800 hover:underline cursor-pointer">
          Scent Finder Guide →
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory && onSelectCategory(cat.id)}
              type="button"
              className={`p-4 rounded-xl border transition-all text-center flex flex-col items-center justify-center gap-2 ${
                isSelected
                  ? 'bg-amber-900 text-white border-amber-900 shadow-sm scale-105'
                  : 'bg-white border-stone-200 hover:border-stone-300 hover:shadow-xs text-stone-700'
              }`}
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-xs font-serif font-medium">{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryGrid;
