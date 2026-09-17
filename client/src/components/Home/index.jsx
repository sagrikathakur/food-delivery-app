import React, { useState } from 'react';
import HeroBanner from './HeroBanner';
import CategoryGrid from './CategoryGrid';
import FeaturedProducts from './FeaturedProducts';
import Banner from '../Banner';

const Home = ({ onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Ocean Parfums Hero Banner */}
      <HeroBanner onExploreClick={() => {}} />

      {/* Fragrance Categories */}
      <CategoryGrid
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
      />

      {/* Promotional Announcement Banner */}
      <Banner
        title="✨ Signature Gift Wrapping Included"
        subtitle="Every fragrance order arrives encased in our embossed linen box with a hand-written note."
        actionText="Learn More"
      />

      {/* Featured Perfume Collection */}
      <FeaturedProducts onAddToCart={onAddToCart} />
    </div>
  );
};

export default Home;
