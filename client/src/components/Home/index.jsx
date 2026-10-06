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

        {/* 2. Featured Bestseller Fragrances (Top 4 only instead of full catalog) */}
        <FeaturedProducts
          selectedCategory={selectedCategory}
          onAddToCart={onAddToCart}
          onSelectProduct={onSelectProduct}
          onNavigate={onNavigate}
          limit={4}
        />

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
