import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { perfumes_list } from '../assets/frontend_assets/assets';

const Product = ({
  product,
  onAddToCart,
  onSelectProduct,
  onNavigate,
}) => {
  // Fallback to first product if none provided
  const currentProduct = product || perfumes_list[0];

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(currentProduct.size || '100 ml / 3.4 fl. oz.');
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('notes');

  const price = Number(currentProduct.price) || 135;
  const totalPrice = (price * quantity).toFixed(2);

  const handleAdd = () => {
    if (onAddToCart) {
      const itemToAdd = {
        ...currentProduct,
        id: currentProduct._id || currentProduct.id,
        size: selectedSize,
      };
      for (let i = 0; i < quantity; i++) {
        onAddToCart(itemToAdd);
      }
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  // Extract notes list if string
  const notesArray = typeof currentProduct.notes === 'string'
    ? currentProduct.notes.split(',').map(n => n.trim())
    : ['Bergamot', 'Damask Rose', 'Warm Ambergris'];

  const topNote = notesArray[0] || 'Calabrian Bergamot';
  const heartNote = notesArray[1] || 'Damask Rose & Wild Iris';
  const baseNote = notesArray[2] || 'Aged Patchouli & Amber';

  // Filter 3 related products excluding current product
  const relatedProducts = perfumes_list
    .filter(p => (p._id || p.id) !== (currentProduct._id || currentProduct.id))
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 space-y-16">
      {/* Breadcrumbs & Navigation */}
      <div className="flex items-center justify-between border-b border-stone-200/80 pb-4">
        <nav className="flex items-center gap-2 text-xs text-stone-500 font-light">
          <button
            onClick={() => onNavigate && onNavigate('home')}
            className="hover:text-amber-900 transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => onNavigate && onNavigate('fragrances')}
            className="hover:text-amber-900 transition-colors cursor-pointer"
          >
            Fragrances
          </button>
          <span>/</span>
          <span className="text-stone-900 font-medium">{currentProduct.name}</span>
        </nav>

        <button
          onClick={() => onNavigate && onNavigate('fragrances')}
          className="text-xs text-amber-900 font-medium hover:underline flex items-center gap-1 cursor-pointer"
        >
          ← Back to Catalog
        </button>
      </div>

      {/* Main Product Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Media Showcase */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative rounded-3xl bg-stone-100 border border-stone-200/90 overflow-hidden shadow-xl p-8 flex items-center justify-center min-h-[420px]">
            <img
              src={currentProduct.image}
              alt={currentProduct.name}
              className="max-h-[380px] w-auto object-contain hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
            />

            {/* Tag Badge */}
            {currentProduct.tag && (
              <span className="absolute top-4 left-4 bg-stone-900 text-white text-[11px] uppercase tracking-widest px-3.5 py-1 rounded-full shadow-md">
                {currentProduct.tag}
              </span>
            )}

            {/* Quality Seal */}
            <span className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md text-stone-800 text-[11px] font-serif font-bold px-3 py-1.5 rounded-xl border border-stone-200 shadow-sm flex items-center gap-1.5">
              <span>✨</span> Pure Extrait
            </span>
          </div>

          {/* Guarantee Pill Badges */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-white border border-stone-200 p-3 rounded-xl shadow-xs">
              <span className="text-lg block">🌿</span>
              <span className="text-[11px] text-stone-700 font-medium block mt-1">100% Organic</span>
            </div>
            <div className="bg-white border border-stone-200 p-3 rounded-xl shadow-xs">
              <span className="text-lg block">🧪</span>
              <span className="text-[11px] text-stone-700 font-medium block mt-1">Small Batch</span>
            </div>
            <div className="bg-white border border-stone-200 p-3 rounded-xl shadow-xs">
              <span className="text-lg block">🐰</span>
              <span className="text-[11px] text-stone-700 font-medium block mt-1">Cruelty Free</span>
            </div>
          </div>
        </div>

        {/* Right Column: Product Information & Purchase */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60 inline-block">
              {currentProduct.concentration || 'Eau de Parfum'} • {currentProduct.category || currentProduct.family || 'Artisanal'}
            </span>

            <h1 className="text-3xl sm:text-4xl font-serif text-stone-900 font-bold tracking-tight">
              {currentProduct.name}
            </h1>

            <div className="flex items-center gap-3 pt-1">
              <div className="flex text-amber-500 text-sm">★★★★★</div>
              <span className="text-xs text-stone-600 font-medium">
                {currentProduct.rating || 4.9} / 5.0
              </span>
              <span className="text-xs text-stone-400">•</span>
              <span className="text-xs text-stone-500 font-light">
                {currentProduct.reviewsCount || 84} verified reviews
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-4 border-y border-stone-200/80 py-4">
            <span className="text-3xl font-serif font-bold text-stone-900">${price.toFixed(2)}</span>
            <span className="text-xs text-stone-500 font-light">Tax included. Free express shipping applied at checkout.</span>
          </div>

          {/* Description */}
          <p className="text-stone-600 text-sm font-light leading-relaxed">
            {currentProduct.description || 'Crafted in small batches with cold-pressed botanical oils, rare flower extracts, and aged amber resin. Designed for long-lasting sillage and timeless elegance.'}
          </p>

          {/* Size Options */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider font-semibold text-stone-800 block">
              Select Bottle Volume:
            </label>
            <div className="flex gap-3">
              {['50 ml / 1.7 fl. oz.', '100 ml / 3.4 fl. oz.'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  type="button"
                  className={`px-4 py-2.5 text-xs font-medium rounded-xl border transition-all cursor-pointer ${
                    selectedSize === size
                      ? 'bg-amber-900 text-white border-amber-900 shadow-sm'
                      : 'bg-white border-stone-300 text-stone-700 hover:border-stone-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Olfactory Pyramid Accordion / Tabs */}
          <div className="bg-stone-50 rounded-2xl border border-stone-200 p-5 space-y-4">
            <div className="flex border-b border-stone-200 text-xs font-medium">
              <button
                onClick={() => setActiveTab('notes')}
                className={`pb-2 pr-4 border-b-2 transition-colors ${
                  activeTab === 'notes' ? 'border-amber-900 text-amber-900 font-semibold' : 'border-transparent text-stone-500'
                }`}
              >
                🌸 Fragrance Notes
              </button>
              <button
                onClick={() => setActiveTab('longevity')}
                className={`pb-2 px-4 border-b-2 transition-colors ${
                  activeTab === 'longevity' ? 'border-amber-900 text-amber-900 font-semibold' : 'border-transparent text-stone-500'
                }`}
              >
                ⏱️ Sillage & Wear
              </button>
            </div>

            {activeTab === 'notes' ? (
              <div className="grid grid-cols-3 gap-3 text-center pt-1">
                <div className="bg-white p-3 rounded-xl border border-stone-200/80">
                  <span className="text-[10px] uppercase font-bold text-amber-800 block">Top Notes</span>
                  <span className="text-xs text-stone-800 font-serif mt-1 block">{topNote}</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-stone-200/80">
                  <span className="text-[10px] uppercase font-bold text-amber-800 block">Heart Notes</span>
                  <span className="text-xs text-stone-800 font-serif mt-1 block">{heartNote}</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-stone-200/80">
                  <span className="text-[10px] uppercase font-bold text-amber-800 block">Base Notes</span>
                  <span className="text-xs text-stone-800 font-serif mt-1 block">{baseNote}</span>
                </div>
              </div>
            ) : (
              <div className="space-y-2 text-xs text-stone-600 font-light pt-1">
                <div className="flex justify-between">
                  <span>Longevity:</span>
                  <span className="font-medium text-stone-900">10 - 12 Hours (Extrait Grade)</span>
                </div>
                <div className="flex justify-between">
                  <span>Projection / Sillage:</span>
                  <span className="font-medium text-stone-900">Moderate to Intimate Radiance</span>
                </div>
                <div className="flex justify-between">
                  <span>Best Season:</span>
                  <span className="font-medium text-stone-900">All Seasons / Versatile Signature</span>
                </div>
              </div>
            )}
          </div>

          {/* Quantity & Add To Cart Form */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-stone-300 rounded-xl bg-white overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2.5 text-stone-600 hover:bg-stone-100 font-bold transition-colors cursor-pointer"
                >
                  -
                </button>
                <span className="px-4 py-2 text-xs font-semibold text-stone-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2.5 text-stone-600 hover:bg-stone-100 font-bold transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>

              <div className="text-xs text-stone-500 font-light">
                Subtotal: <span className="font-serif font-bold text-stone-900 text-sm">${totalPrice}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAdd}
                type="button"
                className={`flex-1 py-4 px-6 text-xs font-medium uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-95 cursor-pointer ${
                  added
                    ? 'bg-emerald-700 text-white'
                    : 'bg-stone-900 hover:bg-amber-900 text-white'
                }`}
              >
                {added ? '✓ Added to Shopping Bag' : 'Add to Shopping Bag'}
              </button>

              <button
                onClick={() => {
                  handleAdd();
                  if (onNavigate) onNavigate('checkout');
                }}
                type="button"
                className="py-4 px-6 bg-amber-800 hover:bg-amber-700 text-white text-xs font-medium uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer"
              >
                Instant Checkout
              </button>
            </div>
          </div>

          {/* Perks */}
          <div className="space-y-2 text-xs text-stone-600 font-light pt-2 border-t border-stone-200">
            <div className="flex items-center gap-2">
              <span className="text-amber-700">✓</span>
              <span><strong>Free Sample Vial:</strong> Each bottle comes with a complimentary 2ml sample to test before opening.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-700">✓</span>
              <span><strong>30-Day Guarantee:</strong> Easy returns within 30 days if not completely delighted.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Recommendation Carousel */}
      <div className="space-y-6 border-t border-stone-200/80 pt-12">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">You May Also Enjoy</span>
            <h2 className="text-2xl font-serif text-stone-900 font-bold mt-1">Recommended Fragrances</h2>
          </div>
          <button
            onClick={() => onNavigate && onNavigate('fragrances')}
            className="text-xs text-amber-900 font-medium hover:underline cursor-pointer"
          >
            View All Fragrances →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.map((relProduct) => (
            <ProductCard
              key={relProduct._id || relProduct.id}
              product={{ ...relProduct, id: relProduct._id || relProduct.id }}
              onAddToCart={onAddToCart}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
