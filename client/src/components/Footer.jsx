import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-stone-50 border-t border-stone-200 text-stone-600 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-14 border-b border-stone-200/80">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <a href="/" className="inline-block">
              <span className="text-xl font-serif tracking-wider text-stone-900 uppercase">
                Ocean
                <span className="text-xs tracking-widest text-amber-800 uppercase font-sans font-light ml-1">
                  Parfums
                </span>
              </span>
            </a>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Hand-blended natural perfumes, distilled with rare botanical extracts, warm ambers, and wild florals. Small batch luxury.
            </p>
          </div>

          {/* Collections */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-widest">Collections</h4>
            <ul className="space-y-2 text-xs text-stone-500 font-light">
              <li><a href="#signature" className="hover:text-amber-800 transition-colors">Signature Parfums</a></li>
              <li><a href="#discovery" className="hover:text-amber-800 transition-colors">Discovery Sets</a></li>
              <li><a href="#home-scents" className="hover:text-amber-800 transition-colors">Botanical Candles</a></li>
              <li><a href="#limited" className="hover:text-amber-800 transition-colors">Limited Reserve</a></li>
            </ul>
          </div>

          {/* Scent Guide & Care */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-widest">Customer Care</h4>
            <ul className="space-y-2 text-xs text-stone-500 font-light">
              <li><a href="#finder" className="hover:text-amber-800 transition-colors">Scent Finder Quiz</a></li>
              <li><a href="#shipping" className="hover:text-amber-800 transition-colors">Shipping & Returns</a></li>
              <li><a href="#gifting" className="hover:text-amber-800 transition-colors">Bespoke Gifting</a></li>
              <li><a href="#contact" className="hover:text-amber-800 transition-colors">Contact Atelier</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-widest">Join the Club</h4>
            <p className="text-xs text-stone-500 font-light">
              Subscribe to receive private invitations to new scent releases and complimentary discovery samples.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 pt-1">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3.5 py-2.5 rounded-md border border-stone-200 text-xs bg-white focus:outline-none focus:border-amber-700"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-stone-900 text-white rounded-md text-xs uppercase font-medium tracking-wider hover:bg-amber-900 transition-colors shrink-0"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-stone-400 font-light gap-4">
          <p>© {new Date().getFullYear()} Ocean Parfums Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-stone-700 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-stone-700 transition-colors">Terms of Service</a>
            <a href="#sustainability" className="hover:text-stone-700 transition-colors">Sustainability</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
