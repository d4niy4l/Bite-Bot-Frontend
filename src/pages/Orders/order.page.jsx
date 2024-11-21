import React, { useState } from 'react';
import orders from './../../data/orders.js';
import FeedbackForm from '../../components/Feedback-Form/feedback-form.jsx';
; // Adjust the path as needed

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOrderClick = (orderId) => {
    setSelectedOrder(orderId);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="max-w-[1000px] h-auto flex flex-col mx-auto mt-[40px] p-6 bg-[#1a1a1a] rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-logoColor mb-6 text-center">Past Orders</h1>
      <div className="flex flex-col text-white">
        <div className="grid grid-cols-5 text-center font-sulphur font-bold text-xl mb-4">
          <div className="whitespace-nowrap text-ellipsis overflow-hidden">
            Order ID
          </div>
          <div className="whitespace-nowrap text-ellipsis overflow-hidden">
            Address
          </div>
          <div className="whitespace-nowrap text-ellipsis overflow-hidden">
            Payment Method
          </div>
          <div className="whitespace-nowrap text-ellipsis overflow-hidden">
            Status
          </div>
          <div className="whitespace-nowrap text-ellipsis overflow-hidden">
            Total Price
          </div>
        </div>
        <hr className="border-logoColor mb-4" />
        {orders.map(({ orderId, address, paymentMethod, status, price }) => {
          return (
            <div
              key={orderId}
              className="grid grid-cols-5 text-center text-lg cursor-pointer group border-2 border-[#1a1a1a] hover:border-logoColor rounded-xl p-4 mb-4 transition-all duration-300"
              onClick={() => handleOrderClick(orderId)}
            >
              <div className="whitespace-nowrap text-ellipsis overflow-hidden">
                {orderId}
              </div>
              <div className="whitespace-nowrap text-ellipsis overflow-hidden">
                {address}
              </div>
              <div className="whitespace-nowrap text-ellipsis overflow-hidden">
                {paymentMethod}
              </div>
              <div
                className={`whitespace-nowrap text-ellipsis overflow-hidden ${
                  status === 'Cancelled'
                    ? 'text-red-500'
                    : status === 'Completed'
                    ? 'text-green-500'
                    : 'text-yellow-500'
                }`}
              >
                {status}
              </div>
              <div className="whitespace-nowrap text-ellipsis overflow-hidden">
                ${price.toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>
      {selectedOrder && (
        <FeedbackForm orderId={selectedOrder} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Orders;