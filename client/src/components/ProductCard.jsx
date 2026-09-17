import React from 'react';

const ProductCard = ({
  product = {
    id: '1',
    name: 'Oceanic Breeze',
    concentration: 'Eau de Parfum',
    notes: 'Bergamot, Sea Salt, Ambergris',
    price: 135.00,
    rating: 4.9,
    reviewsCount: 84,
    size: '100 ml / 3.4 fl. oz.',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500',
    tag: 'Bestseller',
  },
  onAddToCart,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-md hover:border-stone-300 transition-all duration-300 group flex flex-col justify-between">
      
      {/* Bottle Image Container */}
      <div className="relative h-64 w-full bg-stone-50 overflow-hidden flex items-center justify-center p-4">
        <img
          src={product.image}
          alt={product.name}
          className="h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />

        {/* Tag (e.g. Bestseller, New, Artisan) */}
        {product.tag && (
          <span className="absolute top-3 left-3 bg-stone-900/90 backdrop-blur-xs text-white text-[10px] font-medium tracking-widest uppercase px-2.5 py-1 rounded-sm">
            {product.tag}
          </span>
        )}

        {/* Size Badge */}
        {product.size && (
          <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-stone-600 text-[10px] font-medium px-2 py-0.5 rounded-sm border border-stone-200">
            {product.size}
          </span>
        )}
      </div>

      {/* Product Information */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Concentration Label */}
          <span className="text-[10px] uppercase font-semibold tracking-widest text-amber-800 block">
            {product.concentration}
          </span>

          {/* Name */}
          <h3 className="font-serif text-slate-900 text-lg group-hover:text-amber-900 transition-colors mt-0.5">
            {product.name}
          </h3>

          {/* Key Fragrance Notes */}
          <p className="text-xs text-stone-500 line-clamp-1 mt-1 font-light italic">
            Notes: {product.notes}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <span className="text-xs font-medium text-amber-600">★ {product.rating}</span>
            {product.reviewsCount && (
              <span className="text-xs text-stone-400">({product.reviewsCount} reviews)</span>
            )}
          </div>
        </div>

        {/* Price & Add to Cart Button */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-stone-400 block">Price</span>
            <span className="text-base font-serif font-bold text-stone-900">
              ${product.price ? product.price.toFixed(2) : '0.00'}
            </span>
          </div>

          <button
            onClick={() => onAddToCart && onAddToCart(product)}
            type="button"
            className="px-4 py-2 bg-stone-900 hover:bg-amber-900 text-white font-medium text-xs uppercase tracking-wider rounded-md transition-colors shadow-xs active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
