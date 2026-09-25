import React, { useState, useEffect } from 'react';
import FilterPanel from '../components/FilterPanel';
import ProductCard from '../components/ProductCard';
import { getStoredProducts } from '../utils/catalogStorage';

const Fragrances = ({ onAddToCart, onSelectProduct }) => {
  const [products, setProducts] = useState(getStoredProducts());
  const [filters, setFilters] = useState({
    family: 'All',
    concentration: 'All',
    maxPrice: 500,
    notes: [],
    sortBy: 'popular',
  });

  useEffect(() => {
    const handleUpdate = () => setProducts(getStoredProducts());
    window.addEventListener('ocean_catalog_updated', handleUpdate);
    return () => window.removeEventListener('ocean_catalog_updated', handleUpdate);
  }, []);

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      family: 'All',
      concentration: 'All',
      maxPrice: 500,
      notes: [],
      sortBy: 'popular',
    });
  };

  const filteredProducts = products
    .filter((product) => {
      if (filters.family !== 'All' && product.family !== filters.family) return false;
      if (filters.concentration !== 'All' && product.concentration !== filters.concentration) return false;
      if (product.price > filters.maxPrice) return false;
      if (filters.notes.length > 0) {
        const hasNote = filters.notes.some((note) =>
          product.notes.toLowerCase().includes(note.toLowerCase())
        );
        if (!hasNote) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (filters.sortBy === 'priceLow') return a.price - b.price;
      if (filters.sortBy === 'priceHigh') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      return 0; // Default popular/newest order
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 space-y-10">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
          Catalog
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif text-stone-900 font-bold">
          All Fragrances
        </h1>
        <p className="text-stone-600 text-sm font-light leading-relaxed">
          Hand-blended perfumes crafted with botanical oils and organic flower extracts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar: Filter Panel */}
        <div className="lg:col-span-1">
          <FilterPanel
            onApplyFilters={handleApplyFilters}
            onResetFilters={handleResetFilters}
          />
        </div>

        {/* Right Main Content: Products Grid */}
        <div className="lg:col-span-3 space-y-8">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-xl border border-stone-200 p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </div>
              <h3 className="font-serif text-base text-stone-800 font-semibold">No fragrances match your filters</h3>
              <p className="text-xs text-stone-500 font-light">Try expanding your price range or resetting scent filters.</p>
              <button
                onClick={handleResetFilters}
                className="mt-2 px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
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
      </div>
    </div>
  );
};

export default Fragrances;

