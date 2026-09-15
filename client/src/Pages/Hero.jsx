import React from 'react'
import perfumeHeroImg from '../assets/Perfume and Wildflowers.png'

const Hero = ({ onOpenAuthModal }) => {
  return (
    <section className="relative w-full h-[90vh] min-h-[550px] overflow-hidden flex items-center justify-center text-white">
      {/* Background Image spanning 100% width and height */}
      <img
        src={perfumeHeroImg}
        alt="Luxury Perfume"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Subtle overlay tint to ensure text legibility */}
      <div className="absolute inset-0 bg-stone-950/35" />

      {/* Text Content Overlay Directly ON TOP of Image with padding for absolute header */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-20 text-center space-y-4">
        {/* Subheading */}
        <p className="text-xs font-medium uppercase tracking-widest text-stone-200">
          Handcrafted Fragrances • 2026 Collection
        </p>

        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-tight">
          Natural perfumes, distilled with rare botanical blooms.
        </h1>

        {/* Small Paragraph */}
        <p className="text-stone-200 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto">
          Hand-blended in small batches using organic floral extracts, warm amber, and botanical oils.
        </p>

        {/* Buttons */}
        <div className="pt-3 flex justify-center items-center gap-4">
          <button className="px-8 py-3 bg-white hover:bg-stone-100 text-stone-900 text-xs font-medium uppercase tracking-widest transition-colors rounded-md shadow-sm">
            Shop Collection
          </button>
          <button
            onClick={() => onOpenAuthModal && onOpenAuthModal('login')}
            className="px-8 py-3 bg-stone-900/80 hover:bg-stone-900 text-white border border-stone-400/50 text-xs font-medium uppercase tracking-widest transition-colors rounded-md"
          >
            Sign In
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
