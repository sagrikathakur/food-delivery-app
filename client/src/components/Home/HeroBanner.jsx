import React from 'react';

const HeroBanner = ({ onExploreClick }) => {
  return (
    <div className="relative rounded-2xl overflow-hidden bg-stone-900 text-white p-8 md:p-12 shadow-sm border border-stone-800">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Text Content */}
        <div className="md:col-span-7 space-y-5">
          <span className="inline-block text-[11px] font-medium tracking-widest uppercase text-amber-300">
            Hand-Blended Botanical Perfumes
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight leading-tight text-stone-50">
            Crafted with care. Distilled for elegance.
          </h1>

          <p className="text-sm text-stone-300 font-light leading-relaxed max-w-lg">
            Explore our collection of natural perfumes, made in small batches with organic floral extracts, warm woods, and botanical oils.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreClick}
              type="button"
              className="px-6 py-3 bg-white hover:bg-stone-100 text-stone-900 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
            >
              Shop Collection
            </button>
            <span className="text-xs text-stone-400 font-light">
              Free shipping on orders over $50
            </span>
          </div>
        </div>

        {/* Product Image */}
        <div className="md:col-span-5 flex justify-center">
          <div className="w-60 h-68 md:w-68 md:h-76 rounded-xl overflow-hidden border border-stone-800 bg-stone-950 p-4 flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600"
              alt="Oceanic Breeze Perfume Bottle"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;

