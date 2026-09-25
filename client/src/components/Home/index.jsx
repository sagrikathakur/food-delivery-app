import React, { useState } from 'react';
import CategoryGrid from './CategoryGrid';
import FeaturedProducts from './FeaturedProducts';

const HomeContent = ({ onAddToCart, onSelectProduct, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <div className="space-y-20 pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 1. Fragrance Category Filters */}
        <CategoryGrid
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
        />

        {/* 2. All Products E-Commerce Catalog Grid */}
        <FeaturedProducts
          selectedCategory={selectedCategory}
          onAddToCart={onAddToCart}
          onSelectProduct={onSelectProduct}
        />

        {/* 3. Clean Value Propositions (No Container Boxes) */}
        <div className="py-8 border-y border-stone-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-stone-900 text-sm">Natural Ingredients</h3>
              <p className="text-xs text-stone-500 font-light">Cold-pressed botanical oils & flower extracts.</p>
            </div>
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-stone-900 text-sm">Aged in Small Batches</h3>
              <p className="text-xs text-stone-500 font-light">Matured for 30 days for maximum sillage.</p>
            </div>
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-stone-900 text-sm">Sample Vial Included</h3>
              <p className="text-xs text-stone-500 font-light">Test the 2ml sample before opening your bottle.</p>
            </div>
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-stone-900 text-sm">Free Shipping</h3>
              <p className="text-xs text-stone-500 font-light">Complimentary shipping on orders over $50.</p>
            </div>
          </div>
        </div>

        {/* 4. Verified Customer Reviews Section */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">Reviews</span>
            <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 font-bold">Customer Experiences</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="flex text-amber-600 text-sm">★★★★★</div>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                "Oceanic Breeze has become my daily scent. Crisp, fresh, and lasts throughout the workday."
              </p>
              <div className="pt-2 border-t border-stone-200">
                <p className="text-xs font-semibold text-stone-900">Eleanor Vance</p>
                <p className="text-[10px] text-stone-400 font-light">Verified Buyer • Oceanic Breeze</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex text-amber-600 text-sm">★★★★★</div>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                "Simple, elegant packaging and beautiful fragrance notes. Midnight Rose is wonderfully balanced."
              </p>
              <div className="pt-2 border-t border-stone-200">
                <p className="text-xs font-semibold text-stone-900">Julian Kensington</p>
                <p className="text-[10px] text-stone-400 font-light">Verified Buyer • Midnight Rose & Oud</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex text-amber-600 text-sm">★★★★★</div>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                "Fast shipping and having the small sample vial included gave me peace of mind. Velvet Amber is warm and subtle."
              </p>
              <div className="pt-2 border-t border-stone-200">
                <p className="text-xs font-semibold text-stone-900">Sophia Sterling</p>
                <p className="text-[10px] text-stone-400 font-light">Verified Buyer • Velvet Amber & Vanilla</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Simple Full Width CTA with Background Image */}
      <section className="relative w-full py-24 sm:py-32 overflow-hidden flex items-center justify-center text-white text-center">
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=1600"
          alt="Ocean Parfums Background"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Dark Tint Overlay */}
        <div className="absolute inset-0 bg-stone-950/60" />

        <div className="relative z-10 max-w-2xl mx-auto px-6 space-y-5">
          <span className="text-xs uppercase tracking-widest text-amber-200 font-medium">
            Explore Ocean Parfums
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Find your signature scent
          </h2>
          <p className="text-stone-200 text-xs sm:text-sm font-light leading-relaxed max-w-md mx-auto">
            Subscribe for 10% off your first order and receive updates on new seasonal releases.
          </p>

          {subscribed ? (
            <div className="bg-white text-stone-900 p-3 rounded-lg text-xs font-medium max-w-sm mx-auto shadow-md">
              Thank you for subscribing! Check your email for your 10% discount code.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-4 py-3 bg-white/90 text-stone-900 placeholder:text-stone-500 rounded-lg text-xs focus:outline-none focus:bg-white"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white hover:bg-stone-100 text-stone-900 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomeContent;


