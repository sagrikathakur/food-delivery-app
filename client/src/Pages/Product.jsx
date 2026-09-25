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
  const heartNote = notesArray[1] || 'Damask Rose & Iris';
  const baseNote = notesArray[2] || 'Patchouli & Amber';

  // Filter 3 related products excluding current product
  const relatedProducts = perfumes_list
    .filter(p => (p._id || p.id) !== (currentProduct._id || currentProduct.id))
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 space-y-16">
      {/* Breadcrumbs & Navigation */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-4">
        <nav className="flex items-center gap-2 text-xs text-stone-500 font-light">
          <button
            onClick={() => onNavigate && onNavigate('home')}
            className="hover:text-stone-900 transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => onNavigate && onNavigate('fragrances')}
            className="hover:text-stone-900 transition-colors cursor-pointer"
          >
            Fragrances
          </button>
          <span>/</span>
          <span className="text-stone-900 font-medium">{currentProduct.name}</span>
        </nav>

        <button
          onClick={() => onNavigate && onNavigate('fragrances')}
          className="text-xs text-stone-600 hover:text-stone-900 font-medium flex items-center gap-1 cursor-pointer"
        >
          ← Back to Catalog
        </button>
      </div>

      {/* Main Product Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Media Showcase */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative rounded-2xl bg-stone-50 border border-stone-200 overflow-hidden p-8 flex items-center justify-center min-h-[400px]">
            <img
              src={currentProduct.image}
              alt={currentProduct.name}
              className="max-h-[360px] w-auto object-contain"
            />

            {/* Tag Badge */}
            {currentProduct.tag && (
              <span className="absolute top-4 left-4 bg-stone-900 text-white text-[10px] uppercase tracking-wider px-3 py-1 rounded">
                {currentProduct.tag}
              </span>
            )}
          </div>

          {/* Guarantee Pill Badges */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-white border border-stone-200 p-3 rounded-xl shadow-subtle">
              <span className="text-xs font-semibold text-stone-800 block">Organic</span>
              <span className="text-[10px] text-stone-500 block mt-0.5">Botanical Oils</span>
            </div>
            <div className="bg-white border border-stone-200 p-3 rounded-xl shadow-subtle">
              <span className="text-xs font-semibold text-stone-800 block">Small Batch</span>
              <span className="text-[10px] text-stone-500 block mt-0.5">Hand-Blended</span>
            </div>
            <div className="bg-white border border-stone-200 p-3 rounded-xl shadow-subtle">
              <span className="text-xs font-semibold text-stone-800 block">Cruelty Free</span>
              <span className="text-[10px] text-stone-500 block mt-0.5">100% Vegan</span>
            </div>
          </div>
        </div>

        {/* Right Column: Product Information & Purchase */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-amber-800 bg-stone-100 px-2.5 py-1 rounded inline-block">
              {currentProduct.concentration || 'Eau de Parfum'} • {currentProduct.category || currentProduct.family || 'Fragrance'}
            </span>

            <h1 className="text-3xl sm:text-4xl font-serif text-stone-900 font-bold tracking-tight">
              {currentProduct.name}
            </h1>

            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs text-amber-600 font-medium">★ {currentProduct.rating || 4.9}</span>
              <span className="text-xs text-stone-400">•</span>
              <span className="text-xs text-stone-500 font-light">
                {currentProduct.reviewsCount || 84} verified reviews
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-4 border-y border-stone-200 py-4">
            <span className="text-3xl font-serif font-bold text-stone-900">${price.toFixed(2)}</span>
            <span className="text-xs text-stone-500 font-light">Taxes included. Free shipping on orders over $50.</span>
          </div>

          {/* Description */}
          <p className="text-stone-600 text-sm font-light leading-relaxed">
            {currentProduct.description || 'Crafted in small batches with cold-pressed botanical oils, flower extracts, and amber resin. Formulated for long-lasting wear.'}
          </p>

          {/* Size Options */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider font-semibold text-stone-800 block">
              Bottle Size:
            </label>
            <div className="flex gap-3">
              {['50 ml / 1.7 fl. oz.', '100 ml / 3.4 fl. oz.'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  type="button"
                  className={`px-4 py-2.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                    selectedSize === size
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-white border-stone-300 text-stone-700 hover:border-stone-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Fragrance Notes / Details Tabs */}
          <div className="bg-stone-50 rounded-xl border border-stone-200 p-5 space-y-4">
            <div className="flex border-b border-stone-200 text-xs font-medium">
              <button
                onClick={() => setActiveTab('notes')}
                className={`pb-2 pr-4 border-b-2 transition-colors ${
                  activeTab === 'notes' ? 'border-stone-900 text-stone-900 font-semibold' : 'border-transparent text-stone-500'
                }`}
              >
                Fragrance Notes
              </button>
              <button
                onClick={() => setActiveTab('longevity')}
                className={`pb-2 px-4 border-b-2 transition-colors ${
                  activeTab === 'longevity' ? 'border-stone-900 text-stone-900 font-semibold' : 'border-transparent text-stone-500'
                }`}
              >
                Wear & Sillage
              </button>
            </div>

            {activeTab === 'notes' ? (
              <div className="grid grid-cols-3 gap-3 text-center pt-1">
                <div className="bg-white p-3 rounded-lg border border-stone-200">
                  <span className="text-[10px] uppercase font-bold text-amber-800 block">Top Notes</span>
                  <span className="text-xs text-stone-800 font-medium mt-1 block">{topNote}</span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-stone-200">
                  <span className="text-[10px] uppercase font-bold text-amber-800 block">Heart Notes</span>
                  <span className="text-xs text-stone-800 font-medium mt-1 block">{heartNote}</span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-stone-200">
                  <span className="text-[10px] uppercase font-bold text-amber-800 block">Base Notes</span>
                  <span className="text-xs text-stone-800 font-medium mt-1 block">{baseNote}</span>
                </div>
              </div>
            ) : (
              <div className="space-y-2 text-xs text-stone-600 font-light pt-1">
                <div className="flex justify-between">
                  <span>Longevity:</span>
                  <span className="font-medium text-stone-900">8 - 10 Hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Sillage:</span>
                  <span className="font-medium text-stone-900">Moderate & Balanced</span>
                </div>
                <div className="flex justify-between">
                  <span>Best Season:</span>
                  <span className="font-medium text-stone-900">All Year Round</span>
                </div>
              </div>
            )}
          </div>

          {/* Quantity & Add To Bag */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-stone-600 hover:bg-stone-100 font-bold transition-colors cursor-pointer"
                >
                  -
                </button>
                <span className="px-4 py-2 text-xs font-semibold text-stone-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-stone-600 hover:bg-stone-100 font-bold transition-colors cursor-pointer"
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
                className={`flex-1 py-3.5 px-6 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer ${
                  added
                    ? 'bg-stone-800 text-white'
                    : 'bg-stone-900 hover:bg-stone-800 text-white'
                }`}
              >
                {added ? 'Added to Bag' : 'Add to Bag'}
              </button>

              <button
                onClick={() => {
                  handleAdd();
                  if (onNavigate) onNavigate('checkout');
                }}
                type="button"
                className="py-3.5 px-6 border border-stone-300 hover:bg-stone-50 text-stone-900 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* Perks */}
          <div className="space-y-2 text-xs text-stone-600 font-light pt-2 border-t border-stone-200">
            <div className="flex items-center gap-2">
              <span className="text-stone-900 font-bold">✓</span>
              <span><strong>Sample Vial:</strong> Includes a 2ml sample to test before opening your bottle.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-stone-900 font-bold">✓</span>
              <span><strong>30-Day Returns:</strong> Easy 30-day return policy if unopened.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="space-y-6 border-t border-stone-200 pt-12">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">Recommendations</span>
            <h2 className="text-2xl font-serif text-stone-900 font-bold mt-1">You May Also Like</h2>
          </div>
          <button
            onClick={() => onNavigate && onNavigate('fragrances')}
            className="text-xs text-stone-700 hover:text-stone-900 font-medium hover:underline cursor-pointer"
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

