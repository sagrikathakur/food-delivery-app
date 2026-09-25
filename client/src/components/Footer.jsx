import React from 'react';

const Footer = ({ onNavigate }) => {
  const handleLinkClick = (e, view) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(view);
    }
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4 pr-0 lg:pr-6">
            <a href="/" onClick={(e) => handleLinkClick(e, '/')} className="inline-block">
              <span className="text-xl font-serif tracking-widest text-white uppercase font-bold">
                Ocean <span className="text-amber-300 text-xs font-sans font-normal tracking-widest ml-1">Parfums</span>
              </span>
            </a>
            <p className="text-xs text-stone-400 leading-relaxed font-light max-w-sm">
              Fine botanical fragrances distilled in small batches using pure floral absolutes, cold-pressed oils, and natural resins. Handcrafted for timeless wear.
            </p>
            <div className="text-xs text-stone-400 space-y-1 pt-1 font-light">
              <p>742 Evergreen Terrace, Beverly Hills, CA 90210</p>
              <p className="text-amber-200">contact@oceanparfums.com • +1 (800) 463-3339</p>
            </div>
          </div>

          {/* Col 2: Shop */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-widest">Shop</h4>
            <ul className="space-y-2 text-xs text-stone-400 font-light">
              <li>
                <a href="/fragrances" onClick={(e) => handleLinkClick(e, '/fragrances')} className="hover:text-amber-300 transition-colors">
                  All Fragrances
                </a>
              </li>
              <li>
                <a href="/collections" onClick={(e) => handleLinkClick(e, '/collections')} className="hover:text-amber-300 transition-colors">
                  Fragrance Collections
                </a>
              </li>
              <li>
                <a href="/fragrances" onClick={(e) => handleLinkClick(e, '/fragrances')} className="hover:text-amber-300 transition-colors">
                  Sample Discovery Sets
                </a>
              </li>
              <li>
                <a href="/fragrances" onClick={(e) => handleLinkClick(e, '/fragrances')} className="hover:text-amber-300 transition-colors">
                  Bestsellers
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-widest">Atelier</h4>
            <ul className="space-y-2 text-xs text-stone-400 font-light">
              <li>
                <a href="/about" onClick={(e) => handleLinkClick(e, '/about')} className="hover:text-amber-300 transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="/about" onClick={(e) => handleLinkClick(e, '/about')} className="hover:text-amber-300 transition-colors">
                  Distillation Process
                </a>
              </li>
              <li>
                <a href="/about" onClick={(e) => handleLinkClick(e, '/about')} className="hover:text-amber-300 transition-colors">
                  Sustainable Sourcing
                </a>
              </li>
              <li>
                <a href="/about" onClick={(e) => handleLinkClick(e, '/about')} className="hover:text-amber-300 transition-colors">
                  Beverly Hills Boutique
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-widest">Customer Care</h4>
            <ul className="space-y-2 text-xs text-stone-400 font-light">
              <li>
                <a href="/profile" onClick={(e) => handleLinkClick(e, '/profile')} className="hover:text-amber-300 transition-colors">
                  My Account
                </a>
              </li>
              <li>
                <a href="/tracking" onClick={(e) => handleLinkClick(e, '/tracking')} className="hover:text-amber-300 transition-colors">
                  Order Tracking
                </a>
              </li>
              <li>
                <a href="/about" onClick={(e) => handleLinkClick(e, '/about')} className="hover:text-amber-300 transition-colors">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="/about" onClick={(e) => handleLinkClick(e, '/about')} className="hover:text-amber-300 transition-colors">
                  FAQ & Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Bottom Section */}
        <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between text-xs text-stone-500 font-light gap-4">
          <p>© 2026 Ocean Parfums Inc. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-stone-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-stone-300 transition-colors">
              Terms of Service
            </a>
            <a href="#cookies" onClick={(e) => e.preventDefault()} className="hover:text-stone-300 transition-colors">
              Cookie Preferences
            </a>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-stone-400">
            <span>Visa</span>
            <span>•</span>
            <span>Mastercard</span>
            <span>•</span>
            <span>Amex</span>
            <span>•</span>
            <span>Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
