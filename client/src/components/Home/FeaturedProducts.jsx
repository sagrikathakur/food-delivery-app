import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCard';
import { getStoredProducts } from '../../utils/catalogStorage';

const FeaturedProducts = ({
  selectedCategory = 'All',
  onAddToCart,
  onSelectProduct,
  onNavigate,
  limit = 4,
}) => {
  const [allProducts, setAllProducts] = useState(getStoredProducts());

  useEffect(() => {
    const handleUpdate = () => setAllProducts(getStoredProducts());
    window.addEventListener('ocean_catalog_updated', handleUpdate);
    return () => window.removeEventListener('ocean_catalog_updated', handleUpdate);
  }, []);

  const filteredProducts = allProducts.filter((p) => {
    if (!selectedCategory || selectedCategory === 'All') return true;
    return (
      p.category === selectedCategory ||
      p.family?.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      p.category?.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  });

  const displayedProducts = limit ? filteredProducts.slice(0, limit) : filteredProducts;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 border-b border-stone-200 pb-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
            Featured Selection
          </span>
          <h2 className="text-2xl font-serif text-stone-900 font-bold">
            Signature Bestsellers
          </h2>
          <p className="text-xs text-stone-500 font-light mt-0.5">
            Discover our most coveted botanical fragrance creations.
          </p>
        </div>
        {onNavigate && (
          <button
            onClick={() => onNavigate('/fragrances')}
            className="text-xs font-semibold uppercase tracking-wider text-amber-900 hover:text-stone-900 transition-colors flex items-center gap-1 cursor-pointer"
          >
            Explore All Fragrances ({allProducts.length}) &rarr;
          </button>
        )}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {onNavigate && (
        <div className="text-center pt-4">
          <button
            onClick={() => onNavigate('/fragrances')}
            className="px-8 py-3 bg-stone-900 hover:bg-black text-white text-xs font-semibold uppercase tracking-widest rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            View Entire Fragrance Catalog
          </button>
        </div>
      )}
    </div>
  );
};

export default FeaturedProducts;
