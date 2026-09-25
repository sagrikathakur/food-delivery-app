import React from 'react';
import ProductCard from '../ProductCard';
import { perfumes_list } from '../../assets/frontend_assets/assets';

const FeaturedProducts = ({
  selectedCategory = 'All',
  onAddToCart,
  onSelectProduct,
}) => {
  const allProducts = perfumes_list.map((p) => ({ ...p, id: p._id || p.id }));

  const displayedProducts = allProducts.filter((p) => {
    if (!selectedCategory || selectedCategory === 'All') return true;
    return (
      p.category === selectedCategory ||
      p.family?.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      p.category?.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 border-b border-stone-200 pb-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
            {selectedCategory === 'All' ? 'Catalog' : `${selectedCategory} Collection`}
          </span>
          <h2 className="text-2xl font-serif text-stone-900 font-bold">
            {selectedCategory === 'All' ? 'All Fragrances' : selectedCategory}
          </h2>
          <p className="text-xs text-stone-500 font-light mt-0.5">
            Showing {displayedProducts.length} perfume editions.
          </p>
        </div>
      </div>

      {displayedProducts.length === 0 ? (
        <div className="bg-white rounded-xl border border-stone-200 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
            <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.59 15.12a2 2 0 01-1.022-.547m0 0a2 2 0 010-2.828l6.172-6.172a2 2 0 012.828 0l6.172 6.172a2 2 0 010 2.828z" />
            </svg>
          </div>
          <h3 className="font-serif text-base text-stone-800 font-semibold">No fragrances found in this category</h3>
          <p className="text-xs text-stone-500 font-light">Explore our complete collection or select another family filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedProducts;

