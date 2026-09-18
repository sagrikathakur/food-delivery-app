import React, { useState } from 'react';
import CategoryGrid from './CategoryGrid';
import FeaturedProducts from './FeaturedProducts';
import Banner from '../Banner';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
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

      {/* 3. Promotional Gift Wrapping Banner */}
      <Banner
        title="✨ Signature Gift Packaging Included"
        subtitle="Every perfume bottle is wrapped in our embossed linen box with a hand-poured 2ml sample vial and custom wax seal."
        actionText="Explore Collections"
      />

      {/* 4. Atelier Craftsmanship & Value Propositions */}
      <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-stone-800 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] uppercase tracking-widest text-amber-400 font-semibold">
            Pure Botanical Distillation
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-amber-50">
            Why Ocean Parfums Atelier?
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
            We source rare organic blooms directly from coastal estates and distill them in limited small batches.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4">
          <div className="bg-stone-800/80 p-6 rounded-2xl border border-stone-700/60 text-center space-y-2">
            <span className="text-3xl block">🌸</span>
            <h3 className="font-serif font-bold text-sm text-stone-100">100% Organic Flowers</h3>
            <p className="text-xs text-stone-400 font-light">Ethically harvested petals and cold-pressed botanical oils.</p>
          </div>

          <div className="bg-stone-800/80 p-6 rounded-2xl border border-stone-700/60 text-center space-y-2">
            <span className="text-3xl block">🧪</span>
            <h3 className="font-serif font-bold text-sm text-stone-100">Micro-Batch Aging</h3>
            <p className="text-xs text-stone-400 font-light">Matured for 90 days in dark oak casks for maximum sillage.</p>
          </div>

          <div className="bg-stone-800/80 p-6 rounded-2xl border border-stone-700/60 text-center space-y-2">
            <span className="text-3xl block">🎁</span>
            <h3 className="font-serif font-bold text-sm text-stone-100">Complimentary Sample</h3>
            <p className="text-xs text-stone-400 font-light">Test the 2ml sample before opening your main flacon.</p>
          </div>

          <div className="bg-stone-800/80 p-6 rounded-2xl border border-stone-700/60 text-center space-y-2">
            <span className="text-3xl block">✈️</span>
            <h3 className="font-serif font-bold text-sm text-stone-100">Express Delivery</h3>
            <p className="text-xs text-stone-400 font-light">Free 2-day climate-controlled shipping on all orders over $50.</p>
          </div>
        </div>
      </div>

      {/* 5. Verified Customer Reviews Section */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">Client Impressions</span>
          <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 font-bold">What Connoisseurs Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs space-y-3">
            <div className="flex text-amber-500 text-sm">★★★★★</div>
            <p className="text-xs text-stone-600 font-serif italic leading-relaxed">
              "Oceanic Breeze has become my permanent signature scent. The bergamot and sea salt sillage lasts all day long without fading."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-stone-100">
              <div className="w-8 h-8 rounded-full bg-amber-900 text-white font-serif text-xs font-bold flex items-center justify-center">
                E.M.
              </div>
              <div>
                <p className="text-xs font-semibold text-stone-900">Eleanor Vance</p>
                <p className="text-[10px] text-stone-400">Verified Buyer • Oceanic Breeze</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs space-y-3">
            <div className="flex text-amber-500 text-sm">★★★★★</div>
            <p className="text-xs text-stone-600 font-serif italic leading-relaxed">
              "The packaging alone feels like unboxing haute couture. Midnight Rose & Oud has the most captivating smoky floral notes."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-stone-100">
              <div className="w-8 h-8 rounded-full bg-stone-900 text-white font-serif text-xs font-bold flex items-center justify-center">
                J.K.
              </div>
              <div>
                <p className="text-xs font-semibold text-stone-900">Julian Kensington</p>
                <p className="text-[10px] text-stone-400">Verified Buyer • Midnight Rose & Oud</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs space-y-3">
            <div className="flex text-amber-500 text-sm">★★★★★</div>
            <p className="text-xs text-stone-600 font-serif italic leading-relaxed">
              "Fast 2-day delivery and the complimentary 2ml vial meant I could try it first. Velvet Amber & Vanilla is pure luxury!"
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-stone-100">
              <div className="w-8 h-8 rounded-full bg-amber-800 text-white font-serif text-xs font-bold flex items-center justify-center">
                S.D.
              </div>
              <div>
                <p className="text-xs font-semibold text-stone-900">Sophia Sterling</p>
                <p className="text-[10px] text-stone-400">Verified Buyer • Velvet Amber & Vanilla</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. VIP Scent Club Newsletter Box */}
      <div className="bg-stone-100 border border-stone-200 rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-4">
        <span className="text-2xl">💌</span>
        <h3 className="text-xl sm:text-2xl font-serif text-stone-900 font-bold">
          Join the Ocean Parfums Atelier Club
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 font-light max-w-md mx-auto">
          Subscribe for early access to limited micro-batch releases, secret sample drops, and 15% off your first order.
        </p>

        {subscribed ? (
          <div className="bg-emerald-100 text-emerald-800 border border-emerald-300 p-3 rounded-xl text-xs font-medium max-w-sm mx-auto">
            ✓ Welcome to the Atelier Club! Check your inbox for your 15% discount code.
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-4 py-3 bg-white border border-stone-300 rounded-xl text-xs focus:outline-none focus:border-amber-900"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-stone-900 hover:bg-amber-900 text-white text-xs uppercase font-medium tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default HomeContent;
