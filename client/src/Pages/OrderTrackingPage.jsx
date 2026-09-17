import React from 'react';
import OrderTracking from '../components/OrderTracking';

const OrderTrackingPage = ({ onContinueShopping }) => {
  return (
    <div className="pt-28 pb-16 min-h-[80vh] space-y-6">
      <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-serif text-stone-900 font-bold">Live Order Tracking</h1>
        <button
          onClick={onContinueShopping}
          className="px-4 py-2 bg-stone-900 text-white text-xs font-medium uppercase tracking-wider rounded-md hover:bg-amber-900 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
      <OrderTracking />
    </div>
  );
};

export default OrderTrackingPage;
