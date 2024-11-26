import React, { useEffect, useState } from 'react';
import {
  FaCalendar,
  FaChevronCircleRight,
  FaCreditCard,
  FaDollarSign,
  FaInfoCircle,
  FaMapMarker,
} from 'react-icons/fa';
import FeedbackForm from '../../../components/Feedback-Form/feedback-form.jsx'; // Adjust the path as needed
import apiClient from '../../../lib/axios.lib.jsx';
import { ENDPOINTS } from '../../../utils/api/endpoints.js';

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  useEffect(() => {
    // Fetch orders here
    const fetchOrders = async () => {
      const response = await apiClient.get(ENDPOINTS.GET_PAST_ORDERS);
      if (response.status === 200) {
        console.log(response.data.data);
        setOrders(response.data.data);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="max-w-[1300px] h-auto font-inter flex flex-col mx-auto mt-[40px] p-6 bg-[#1a1a1a] rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-logoColor mb-6 text-center">
        Past Orders
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-white overflow-y-auto">
        {orders.map((order) => {
          const {
            order_id,
            payment_method,
            order_status,
            total_price,
            order_date,
          } = order;
          return (
            <div
              key={order_id}
              className="flex flex-col justify-between p-4 bg-[#2a2a2a] rounded-xl shadow-lg cursor-pointer group hover:bg-[#333333] transition-all duration-300"
              onClick={() => handleOrderClick(order)}
            >
              <div className="mb-4">
                <h2 className="text-[18px] font-bold mb-2 flex items-center gap-2">
                  <FaInfoCircle className="text-logoColor" />
                  Order
                </h2>
                <span className="text-[15px] mb-1 flex items-center gap-2">
                  <FaCreditCard className="text-logoColor" />
                  <strong>Payment Method:</strong> {payment_method}
                </span>
                <span
                  className={`text-[15px] mb-1 flex items-center gap-2 ${
                    order_status === 'Cancelled'
                      ? 'text-red-500'
                      : order_status === 'Completed'
                      ? 'text-green-500'
                      : 'text-yellow-500'
                  }`}
                >
                  <FaInfoCircle className="text-logoColor" />
                  <strong>Status:</strong> {order_status}
                </span>
                <span className="text-[15px] mb-1 flex items-center gap-2">
                  <FaCalendar className="text-logoColor" />
                  <strong>Order Date:</strong>{' '}
                  {new Date(order_date).toLocaleDateString()}
                </span>
                <span className="text-[15px] flex items-center gap-2">
                  <FaDollarSign className="text-logoColor" />
                  <strong>Total Price:</strong> ${total_price.toFixed(2)}
                </span>
                <button
                  className="mt-2 text-white py-1 px-2 rounded-lg flex items-center gap-2 underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOrderClick(order);
                  }}
                >
                  <FaChevronCircleRight className="text-logoColor" />
                  <p>More Info</p>
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {selectedOrder && (
        <FeedbackForm order={selectedOrder} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Orders;
