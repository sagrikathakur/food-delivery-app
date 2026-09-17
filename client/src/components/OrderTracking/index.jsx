import React from 'react';
import TrackerStatus from './TrackerStatus';
import DeliveryMap from './DeliveryMap';
import OrderItemsList from './OrderItemsList';

const OrderTracking = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Real-time Order Status Header */}
      <TrackerStatus />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Interactive Delivery Map */}
        <div className="lg:col-span-7">
          <DeliveryMap />
        </div>

        {/* Order Receipt Details */}
        <div className="lg:col-span-5">
          <OrderItemsList />
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
