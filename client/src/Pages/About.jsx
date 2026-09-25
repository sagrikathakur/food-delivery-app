import React from 'react';

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
          About Us
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif text-stone-900 font-bold">
          Crafting Fine Fragrance
        </h1>
        <p className="text-stone-600 text-sm font-light leading-relaxed">
          Inspired by coastal breezes and wildflower gardens, Ocean Parfums blends pure floral absolutes and natural resins.
        </p>
      </div>

      {/* Story Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="relative rounded-xl overflow-hidden border border-stone-200 shadow-xs h-80">
          <img
            src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=800"
            alt="Perfume Bottling Process"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-4">
          <span className="text-[11px] uppercase tracking-widest text-amber-800 font-semibold">Our Process</span>
          <h2 className="text-2xl font-serif text-stone-900 font-bold">
            Distilled in Small Batches
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed">
            Every bottle is hand-poured in small batches, allowed to mature for 30 days to harmonize scent notes, and carefully packaged before reaching your home.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-stone-200">
            <div>
              <span className="block text-xl font-serif font-bold text-stone-900">100%</span>
              <span className="text-[11px] text-stone-500">Cruelty Free & Vegan</span>
            </div>
            <div>
              <span className="block text-xl font-serif font-bold text-stone-900">30 Days</span>
              <span className="text-[11px] text-stone-500">Scent Maceration</span>
            </div>
            <div>
              <span className="block text-xl font-serif font-bold text-stone-900">Natural</span>
              <span className="text-[11px] text-stone-500">Botanical Oils</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Location Box */}
      <div className="bg-stone-900 text-white rounded-xl p-8 sm:p-10 text-center space-y-3">
        <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold">Visit Our Store</span>
        <h3 className="text-xl font-serif font-bold text-stone-100">Ocean Parfums Boutique</h3>
        <p className="text-stone-300 text-xs max-w-lg mx-auto font-light leading-relaxed">
          742 Evergreen Terrace, Suite 12, Beverly Hills, CA 90210
          <br />
          Tuesday – Sunday: 10:00 AM – 7:00 PM
        </p>
        <p className="text-stone-400 text-xs pt-1">contact@oceanparfums.com • +1 (800) 463-3339</p>
      </div>
    </div>
  );
};

export default About;

