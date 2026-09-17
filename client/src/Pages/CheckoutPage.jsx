import React, { useState } from 'react';
import Checkout from '../components/Checkout';
import Delivery from '../components/Delivery';

const CheckoutPage = ({ cartItems, onOrderCompleted }) => {
  const [stage, setStage] = useState('delivery'); // 'delivery' or 'payment'
  const [deliveryInfo, setDeliveryInfo] = useState(null);

  const handleProceedToPayment = (info) => {
    setDeliveryInfo(info);
    setStage('payment');
  };

  const handleCompleteOrder = (orderData) => {
    if (onOrderCompleted) {
      onOrderCompleted({
        ...orderData,
        deliveryInfo,
      });
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-[80vh]">
      {stage === 'delivery' ? (
        <Delivery onProceedToPayment={handleProceedToPayment} />
      ) : (
        <div className="space-y-4">
          <div className="max-w-6xl mx-auto px-4 pt-4">
            <button
              onClick={() => setStage('delivery')}
              className="text-xs text-stone-500 hover:text-stone-900 font-medium flex items-center gap-1"
            >
              &larr; Back to Packaging & Delivery Options
            </button>
          </div>
          <Checkout cartItems={cartItems} onCompleteOrder={handleCompleteOrder} />
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
