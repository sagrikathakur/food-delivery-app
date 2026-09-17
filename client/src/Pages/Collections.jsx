import React from 'react';
import ProductCard from '../components/ProductCard';

const collectionsList = [
  {
    id: 'ocean',
    title: 'The Ocean & Aquatic Collection',
    subtitle: 'Crisp coastal sea salt, marine minerals, and sun-warmed driftwood.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    products: [
      {
        id: 'c1',
        name: 'Oceanic Breeze',
        concentration: 'Eau de Parfum',
        notes: 'Bergamot, Sea Salt, Ambergris',
        price: 135.00,
        rating: 4.9,
        reviewsCount: 84,
        size: '100 ml',
        image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400',
        tag: 'Bestseller',
      },
      {
        id: 'c2',
        name: 'Solar Citrus & Bergamot',
        concentration: 'Eau de Toilette',
        notes: 'Calabrian Bergamot, Lemon Zest',
        price: 110.00,
        rating: 4.7,
        reviewsCount: 29,
        size: '100 ml',
        image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400',
        tag: 'Fresh',
      },
    ],
  },
  {
    id: 'amber',
    title: 'The Private Amber & Spice Reserve',
    subtitle: 'Deep bourbon vanilla, smoked oud, and spicy saffron extract.',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800',
    products: [
      {
        id: 'c3',
        name: 'Velvet Amber & Vanilla',
        concentration: 'Eau de Parfum',
        notes: 'Bourbon Vanilla, Amber Resin',
        price: 145.00,
        rating: 4.8,
        reviewsCount: 62,
        size: '100 ml',
        image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=400',
        tag: 'Signature',
      },
      {
        id: 'c4',
        name: 'Midnight Rose & Oud',
        concentration: 'Extrait de Parfum',
        notes: 'Damask Rose, Smoked Oud',
        price: 195.00,
        rating: 5.0,
        reviewsCount: 41,
        size: '50 ml',
        image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400',
        tag: 'Intense',
      },
    ],
  },
];

const Collections = ({ onAddToCart }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
          Curated Perfume Collections
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif text-stone-900 font-bold">
          Bespoke Olfactory Chapters
        </h1>
        <p className="text-stone-600 text-sm font-light leading-relaxed">
          Each collection is hand-poured in our coastal atelier, telling a distinct story through rare botanical extracts.
        </p>
      </div>

      {/* Collections Sections */}
      {collectionsList.map((col) => (
        <div key={col.id} className="space-y-8 border-b border-stone-200/80 pb-12 last:border-none">
          {/* Collection Hero Banner */}
          <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80 shadow-md">
            <img
              src={col.image}
              alt={col.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-stone-950/50 to-transparent flex items-center p-8 sm:p-12">
              <div className="max-w-md text-white space-y-2">
                <span className="text-[11px] uppercase tracking-widest text-amber-300 font-semibold">Boutique Collection</span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold">{col.title}</h2>
                <p className="text-xs sm:text-sm text-stone-200 font-light">{col.subtitle}</p>
              </div>
            </div>
          </div>

          {/* Collection Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {col.products.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Collections;
