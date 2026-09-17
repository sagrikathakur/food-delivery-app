import React from 'react';

const HeroBanner = ({ onExploreClick }) => {
  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 text-white p-8 md:p-12 shadow-xl border border-amber-900/30">
      {/* Subtle ambient light glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 right-1/4 w-72 h-72 bg-amber-800/15 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left Column Text */}
        <div className="md:col-span-7 space-y-4">
          <span className="inline-block px-3.5 py-1 rounded-full bg-amber-900/40 border border-amber-700/40 text-[10px] uppercase font-semibold tracking-widest text-amber-300">
            Handcrafted Fragrances • 2026 Reserve
          </span>

          <h1 className="text-3xl md:text-5xl font-serif tracking-tight leading-tight text-amber-50">
            Natural Perfumes, Distilled with Rare Botanical Blooms.
          </h1>

          <p className="text-xs md:text-sm text-stone-300 font-light leading-relaxed max-w-lg">
            Hand-blended in small batches using organic floral extracts, warm amber, and botanical oils.
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreClick}
              type="button"
              className="px-6 py-3.5 bg-amber-800 hover:bg-amber-700 text-white text-xs font-medium uppercase tracking-widest rounded-md transition-all shadow-md active:scale-95"
            >
              Shop Collection
            </button>
            <div className="flex items-center gap-2 text-xs text-stone-300 font-light">
              <span className="text-amber-400">★★★★★</span>
              <span>4.9 / 5.0 (Artisanal Perfumery)</span>
            </div>
          </div>
        </div>

        {/* Right Column Perfume Showcase */}
        <div className="md:col-span-5 flex justify-center">
          <div className="relative group">
            <div className="w-64 h-72 md:w-72 md:h-80 rounded-2xl overflow-hidden shadow-2xl border border-stone-700/80 bg-stone-900/80 p-4 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600"
                alt="Ocean Parfums Bottle"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Floating Luxury Tag */}
            <div className="absolute -bottom-4 -left-4 bg-white text-stone-900 px-4 py-3 rounded-xl shadow-xl border border-stone-200 flex items-center gap-3">
              <span className="text-xl">✨</span>
              <div>
                <p className="text-xs font-serif font-bold">Oceanic Breeze EDP</p>
                <p className="text-[10px] text-stone-500 font-light">100ml Pure Extrait</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
