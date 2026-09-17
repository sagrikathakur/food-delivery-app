import React from 'react';
import ProductCard from '../ProductCard';

const FeaturedProducts = ({
  products = [
    {
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
    {
      id: '2',
      name: 'Velvet Amber & Vanilla',
      concentration: 'Extrait de Parfum',
      notes: 'Bourbon Vanilla, Warm Amber, Cedar',
      price: 165.00,
      rating: 4.9,
      reviewsCount: 112,
      size: '50 ml / 1.7 fl. oz.',
      image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=500',
      tag: 'Reserve Edition',
    },
    {
      id: '3',
      name: 'Wild Iris & Damask Rose',
      concentration: 'Eau de Parfum',
      notes: 'Damask Rose, Iris Petals, White Musk',
      price: 128.00,
      rating: 4.8,
      reviewsCount: 67,
      size: '100 ml / 3.4 fl. oz.',
      image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=500',
      tag: 'Floral Choice',
    },
    {
      id: '4',
      name: 'Botanical Discovery Set',
      concentration: 'Sample Vault',
      notes: 'Includes 5 x 2ml Hand-Poured Vials',
      price: 45.00,
      rating: 5.0,
      reviewsCount: 240,
      size: '5 x 2 ml Vials',
      image: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?w=500',
      tag: 'Gift Set',
    },
  ],
  onAddToCart,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-serif text-stone-900">Featured Artisanal Fragrances</h2>
          <p className="text-xs text-stone-500 font-light mt-0.5">Distilled in small batches using rare botanical oils.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
