import React from 'react'
import perfumeHeroImg from '../assets/Perfume and Wildflowers.png'

const Hero = ({ onOpenAuthModal, onNavigate }) => {
  return (
    <section className="relative w-full h-screen min-h-screen overflow-hidden flex items-center justify-center text-white">
      {/* Background Image */}
      <img
        src={perfumeHeroImg}
        alt="Natural Perfume"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Subtle overlay tint to ensure text legibility */}
      <div className="absolute inset-0 bg-stone-950/40" />

      {/* Text Content Overlay */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center space-y-5 pt-12">
        <p className="text-xs font-medium uppercase tracking-widest text-amber-200">
          Hand-Blended Botanical Fragrances
        </p>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-white tracking-tight leading-tight">
          Crafted by hand. Distilled for elegance.
        </h1>

        <p className="text-stone-200 text-sm sm:text-lg font-light leading-relaxed max-w-xl mx-auto">
          Natural perfumes made in small batches with organic floral extracts, warm amber notes, and botanical oils.
        </p>

        <div className="pt-4 flex justify-center items-center gap-4">
          <button
            onClick={() => onNavigate && onNavigate('fragrances')}
            className="px-8 py-3.5 bg-white hover:bg-stone-100 text-stone-900 text-xs font-semibold uppercase tracking-wider transition-colors rounded-lg shadow-sm cursor-pointer"
          >
            Shop Collection
          </button>
          <button
            onClick={() => onNavigate && onNavigate('collections')}
            className="px-8 py-3.5 bg-white/20 hover:bg-white/30 text-white border border-white/40 backdrop-blur-xs text-xs font-semibold uppercase tracking-wider transition-colors rounded-lg cursor-pointer"
          >
            Explore Fragrances
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero


