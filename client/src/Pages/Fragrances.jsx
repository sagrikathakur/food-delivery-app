import React, { useState } from 'react';
import FilterPanel from '../components/FilterPanel';
import ProductCard from '../components/ProductCard';
import Banner from '../components/Banner';

const sampleProducts = [
  {
    id: '1',
    name: 'Oceanic Breeze',
    concentration: 'Eau de Parfum',
    family: 'Aquatic',
    notes: 'Bergamot, Sea Salt, Ambergris',
    price: 135.00,
    rating: 4.9,
    reviewsCount: 84,
    size: '100 ml / 3.4 fl. oz.',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500',
    tag: 'Bestseller',
  },
  {
    id: '2',
    name: 'Velvet Amber & Vanilla',
    concentration: 'Eau de Parfum',
    family: 'Amber & Spice',
    notes: 'Bourbon Vanilla, Amber Resin, Tonka',
    price: 145.00,
    rating: 4.8,
    reviewsCount: 62,
    size: '100 ml / 3.4 fl. oz.',
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=500',
    tag: 'Signature',
  },
  {
    id: '3',
    name: 'Midnight Rose & Oud',
    concentration: 'Extrait de Parfum',
    family: 'Floral',
    notes: 'Damask Rose, Smoked Oud, Patchouli',
    price: 195.00,
    rating: 5.0,
    reviewsCount: 41,
    size: '50 ml / 1.7 fl. oz.',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500',
    tag: 'Intense',
  },
  {
    id: '4',
    name: 'Solar Citrus & Bergamot',
    concentration: 'Eau de Toilette',
    family: 'Fresh & Citrus',
    notes: 'Calabrian Bergamot, Lemon Zest, Cedar',
    price: 110.00,
    rating: 4.7,
    reviewsCount: 29,
    size: '100 ml / 3.4 fl. oz.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500',
    tag: 'New',
  },
  {
    id: '5',
    name: 'Smoked Wood & Saffron',
    concentration: 'Extrait de Parfum',
    family: 'Woody & Earthy',
    notes: 'Sandalwood, Saffron, Vetiver',
    price: 210.00,
    rating: 4.9,
    reviewsCount: 53,
    size: '100 ml / 3.4 fl. oz.',
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=500',
    tag: 'Artisan',
  },
  {
    id: '6',
    name: 'Wild Jasmine & Cypress',
    concentration: 'Eau de Parfum',
    family: 'Floral',
    notes: 'Night Jasmine, White Musk, Cypress',
    price: 150.00,
    rating: 4.8,
    reviewsCount: 38,
    size: '100 ml / 3.4 fl. oz.',
    image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=500',
    tag: 'Limited Edition',
  },
];

const Fragrances = ({ onAddToCart }) => {
  const [filters, setFilters] = useState({
    family: 'All',
    concentration: 'All',
    maxPrice: 500,
    notes: [],
    sortBy: 'popular',
  });

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

  const filteredProducts = sampleProducts
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 space-y-10">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
          Artisanal Fragrance Catalog
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif text-stone-900 font-bold">
          Explore Our Perfume Editions
        </h1>
        <p className="text-stone-600 text-sm font-light leading-relaxed">
          Crafted from rare botanical blooms, pure essential oils, and organic alcohol. Find your unique signature scent.
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
            <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-3">
              <span className="text-4xl">🌸</span>
              <h3 className="font-serif text-lg text-stone-800 font-medium">No fragrances match your filters</h3>
              <p className="text-xs text-stone-500 font-light">Try expanding your price range or resetting scent filters.</p>
              <button
                onClick={handleResetFilters}
                className="mt-2 px-5 py-2 bg-stone-900 text-white text-xs font-medium uppercase tracking-wider rounded-md"
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
                />
              ))}
            </div>
          )}

          {/* Discovery Banner */}
          <Banner
            title="✨ Fragrance Discovery Set"
            subtitle="Order any 3 sample vials (2ml) and receive a $30 credit toward your first full-size bottle."
            actionText="Claim Sample Box"
          />
        </div>
      </div>
    </div>
  );
};

export default Fragrances;
