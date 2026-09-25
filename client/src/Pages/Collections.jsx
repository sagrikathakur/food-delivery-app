import React from 'react';
import ProductCard from '../components/ProductCard';
import { assets, perfumes_list } from '../assets/frontend_assets/assets';

// Normalize perfumes_list with id field
const allPerfumes = perfumes_list.map((p) => ({ ...p, id: p._id || p.id }));

const collectionsList = [
  {
    id: 'aquatic',
    title: 'Ocean & Aquatic',
    subtitle: 'Coastal sea salt, marine minerals, and sun-warmed driftwood notes.',
    image: assets.istock_1008118858,
    products: allPerfumes.filter((p) =>
      ['Aquatic & Fresh', 'Citrus & Solar'].includes(p.category) || p.family === 'Aquatic'
    ),
  },
  {
    id: 'amber',
    title: 'Amber & Warm Spice',
    subtitle: 'Warm vanilla, subtle smoke, and spicy cardamom extracts.',
    image: assets.istock_1253935837,
    products: allPerfumes.filter((p) =>
      ['Amber & Spice', 'Gourmand & Vanilla'].includes(p.category) || p.family === 'Amber & Spice'
    ),
  },
  {
    id: 'floral',
    title: 'Floral & Botanical',
    subtitle: 'Damask rose, night-blooming jasmine, and fresh floral notes.',
    image: assets.elegant_perfume_flowers_still_life,
    products: allPerfumes.filter((p) =>
      ['Floral & Rose', 'Wildflower Atelier', 'Botanical Still Life'].includes(p.category) || p.family === 'Floral'
    ),
  },
  {
    id: 'woody',
    title: 'Woods & Oud',
    subtitle: 'Mysore sandalwood, Kashmiri saffron, and cedarwood resin.',
    image: assets.istock_160052159,
    products: allPerfumes.filter((p) =>
      ['Woody & Oud'].includes(p.category) || p.family?.includes('Woody')
    ),
  },
];

const Collections = ({ onAddToCart, onSelectProduct }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
          Curated Collections
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif text-stone-900 font-bold">
          Fragrance Collections
        </h1>
        <p className="text-stone-600 text-sm font-light leading-relaxed">
          Each collection is organized around distinct scent families, from fresh coastal minerals to warm woods.
        </p>
      </div>

      {/* Collections Sections */}
      {collectionsList.map((col) => (
        <div key={col.id} className="space-y-8 border-b border-stone-200 pb-12 last:border-none">
          {/* Collection Hero Banner */}
          <div className="relative rounded-xl overflow-hidden h-60 sm:h-72 shadow-xs">
            <img
              src={col.image}
              alt={col.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-stone-950/45 flex items-center p-8 sm:p-12">
              <div className="max-w-lg text-white space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-amber-200 font-semibold">Collection</span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">{col.title}</h2>
                <p className="text-xs sm:text-sm text-stone-200 font-light leading-relaxed">{col.subtitle}</p>
              </div>
            </div>
          </div>

          {/* Collection Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {col.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Collections;

