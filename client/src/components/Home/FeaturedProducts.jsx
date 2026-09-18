import React from 'react';
import ProductCard from '../ProductCard';
import { perfumes_list } from '../../assets/frontend_assets/assets';

const FeaturedProducts = ({
  selectedCategory = 'All',
  onAddToCart,
  onSelectProduct,
}) => {
  const allProducts = perfumes_list.map((p) => ({ ...p, id: p._id || p.id }));

  const displayedProducts = allProducts.filter((p) => {
    if (!selectedCategory || selectedCategory === 'All') return true;
    return (
      p.category === selectedCategory ||
      p.family?.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      p.category?.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 border-b border-stone-200/80 pb-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
            {selectedCategory === 'All' ? 'Complete Atelier Catalog' : `${selectedCategory} Collection`}
          </span>
          <h2 className="text-2xl font-serif text-stone-900 font-bold">
            {selectedCategory === 'All' ? 'All Handcrafted Fragrances' : selectedCategory}
          </h2>
          <p className="text-xs text-stone-500 font-light mt-0.5">
            Showing {displayedProducts.length} artisanal perfume editions distilled in small batches.
          </p>
        </div>
      </div>

      {displayedProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-3">
          <span className="text-4xl">🌸</span>
          <h3 className="font-serif text-lg text-stone-800 font-medium">No fragrances found in this category</h3>
          <p className="text-xs text-stone-500 font-light">Explore our complete collection or select another family filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedProducts;
