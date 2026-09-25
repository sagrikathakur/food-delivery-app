import React, { useState } from 'react';

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
  onSelectProduct,
}) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleCardClick = () => {
    if (onSelectProduct) {
      onSelectProduct(product);
    }
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    if (onAddToCart) {
      const success = onAddToCart(product);
      if (success !== false) {
        setIsAdded(true);
        setTimeout(() => {
          setIsAdded(false);
        }, 1500);
      }
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group flex flex-col justify-between cursor-pointer space-y-3"
    >
      {/* Bottle Image Container */}
      <div className="relative h-64 w-full bg-stone-100/70 rounded-xl overflow-hidden flex items-center justify-center p-6 transition-all group-hover:bg-stone-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full object-contain group-hover:scale-102 transition-transform duration-300"
        />

        {/* Tag */}
        {product.tag && (
          <span className="absolute top-3 left-3 bg-stone-900 text-white text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-xs">
            {product.tag}
          </span>
        )}

        {/* Size */}
        {product.size && (
          <span className="absolute bottom-3 right-3 text-stone-500 text-[10px] font-medium">
            {product.size}
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="space-y-2 flex-1 flex flex-col justify-between pt-1">
        <div>
          <span className="text-[10px] uppercase font-medium tracking-widest text-amber-800 block">
            {product.concentration || 'Eau de Parfum'}
          </span>

          <h3 className="font-serif text-stone-900 text-base font-semibold group-hover:text-amber-900 transition-colors mt-0.5">
            {product.name}
          </h3>

          {product.notes && (
            <p className="text-xs text-stone-500 line-clamp-1 mt-0.5 font-light italic">
              {product.notes}
            </p>
          )}

          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-stone-500">
            <span className="text-amber-700">★ {product.rating || 4.9}</span>
            {product.reviewsCount && (
              <span className="text-[11px] text-stone-400">({product.reviewsCount})</span>
            )}
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-2 flex items-center justify-between gap-2">
          <span className="text-base font-serif font-bold text-stone-900">
            ${product.price ? Number(product.price).toFixed(2) : '0.00'}
          </span>

          <button
            onClick={handleAdd}
            type="button"
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer ${
              isAdded
                ? 'bg-stone-800 text-white'
                : 'bg-stone-900 hover:bg-stone-800 text-white'
            }`}
          >
            {isAdded ? 'Added' : 'Add to Bag'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;


