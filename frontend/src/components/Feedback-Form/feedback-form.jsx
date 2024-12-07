import React, { useState } from 'react';
import { FaTimes, FaPaperPlane, FaMapMarkerAlt, FaCreditCard, FaInfoCircle, FaCalendar, FaDollarSign } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { ENDPOINTS } from '../../utils/api/endpoints';
import apiClient from '../../lib/axios.lib';

const FeedbackForm = ({ order, onClose }) => {
  const [feedback, setFeedback] = useState('');
  const [uploading, setIsUploading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle feedback submission logic here
    if(!feedback){
      toast.error('Please enter feedback');
      return;
    }
    if(uploading){
      return;
    }

    setIsUploading(true);
    const response = await apiClient.post(ENDPOINTS.CREATE_FEEDBACK, {
      order_id: order.order_id,
      content: feedback,
    });
    if(response.status === 200){
      toast.success('Feedback submitted successfully');
    } else {
      toast.error('Failed to submit feedback');
    }
    setIsUploading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] text-white rounded-xl shadow-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl">Order Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition duration-300">
            <FaTimes size={24} />
          </button>
        </div>
        <div className="mb-4">
          <p className="flex items-center gap-2 mb-[5px]"><FaInfoCircle className="text-logoColor" /><strong>Order ID:</strong> {order.order_id}</p>
          <p className="flex items-center gap-2 mb-[5px]"><FaMapMarkerAlt className="text-logoColor" /><strong>Address:</strong> {order.delivery_address}</p>
          <p className="flex items-center gap-2 mb-[5px]"><FaCreditCard className="text-logoColor" /><strong>Payment Method:</strong> {order.payment_method}</p>
          <p className={`flex items-center gap-2 mb-[5px] ${order.order_status === 'Cancelled' ? 'text-red-500' : order.order_status === 'Completed' ? 'text-green-500' : 'text-yellow-500'}`}>
            <FaInfoCircle className="text-logoColor" /><strong>Status:</strong> {order.order_status}
          </p>
          <p className="flex items-center gap-2 mb-[5px]"><FaCalendar className="text-logoColor" /><strong>Order Date:</strong> {new Date(order.order_date).toLocaleDateString()}</p>
          <p className="flex items-center gap-2 mb-[5px]"><FaDollarSign className="text-logoColor" /><strong>Total Price:</strong> ${order.total_price.toFixed(2)}</p>
        </div>
        <div className="mb-4 overflow-y-auto max-h-[300px]">
          <h3 className="text-xl mb-2">Order Items</h3>
          {order.order_items.map((item, index) => (
            <div key={index} className="flex items-center gap-4 mb-2">
              <img src={item.imageURL} alt={item.productName} className="w-12 h-12 rounded-lg" />
              <div>
                <p className="text-lg"><strong>{item.productName}</strong></p>
                <p className="text-sm">Quantity: {item.quantity}</p>
                <p className="text-sm">Unit Price: ${item.unitPrice.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        <h2 className="text-[16px] mb-4">Feedback for Order</h2>
        <form>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full h-32 p-2 bg-[#333333] text-white border-[#1d1d1d] focus:border-logoColor border-[2px] focus:outline-none rounded-xl resize-none"
            placeholder="Enter your feedback here..."
          />
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg mr-2 flex items-center gap-2"
            >
              <FaTimes />
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-logoColor text-white py-2 px-4 rounded-lg flex items-center gap-2"
            >
              <FaPaperPlane />
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;