import React from 'react';
import HomeContent from '../components/Home';

const Home = ({ onAddToCart = () => {}, onSelectProduct = () => {}, onNavigate = () => {} }) => {
  return (
    <HomeContent
      onAddToCart={onAddToCart}
      onSelectProduct={onSelectProduct}
      onNavigate={onNavigate}
    />
  );
};

export default Home;
