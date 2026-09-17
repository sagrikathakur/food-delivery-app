import React, { useState } from 'react';
import CheckoutSteps from './CheckoutSteps';
import OrderSummary from './OrderSummary';
import PaymentForm from './PaymentForm';
import AddressCard from '../AddressCard';

const Checkout = ({
  cartItems = [],
  onCompleteOrder,
}) => {
  const [currentStep, setCurrentStep] = useState(2);
  const [selectedAddress, setSelectedAddress] = useState({
    id: '1',
    type: 'Home',
    street: '124 Palm Avenue, Apt 4B',
    city: 'San Francisco, CA 94107',
    phone: '+1 (555) 234-5678',
    isDefault: true,
  });

  const handlePaymentSubmit = (paymentDetails) => {
    if (onCompleteOrder) {
      onCompleteOrder({
        address: selectedAddress,
        payment: paymentDetails,
        items: cartItems,
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Checkout Steps Progress */}
      <CheckoutSteps currentStep={currentStep} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content Area (Delivery + Payment) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 2: Address Selection */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              <span>📍</span> Delivery Address
            </h3>

            <AddressCard
              address={selectedAddress}
              isSelected={true}
              onSelect={(addr) => setSelectedAddress(addr)}
            />
          </div>

          {/* Step 3: Payment Section */}
          <PaymentForm onSubmitPayment={handlePaymentSubmit} />
        </div>

        {/* Sidebar Order Summary */}
        <div className="lg:col-span-5">
          <OrderSummary items={cartItems.length > 0 ? cartItems : undefined} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
