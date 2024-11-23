import React, { useState } from 'react';
import { FaEnvelope, FaInfoCircle, FaMapMarkerAlt, FaCreditCard, FaCalendar, FaDollarSign, FaTimes, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const placeholderFeedbacks = [
  {
    order_id: '4d1beb9d-5f76-4033-8f87-36ce8b989b57',
    customer_name: 'John Doe',
    delivery_address: 'House 1543, street martin, Isloo',
    payment_method: 'CASH',
    order_status: 'PREPARING',
    total_price: 37,
    order_date: '2024-11-22T21:28:50.648+00:00',
    emotion: 'joy',
    content: 'The food was amazing and the delivery was quick!',
    customer_email: 'customer1@example.com',
    order_items: [
      { quantity: 2, unitPrice: 11, productName: 'Pepperoni Pizza', imageURL: 'https://raw.githubusercontent.com/rohhan36/food-app-assests/main/assets/desert1.png' },
      { quantity: 3, unitPrice: 5, productName: 'Avocado Toast', imageURL: 'https://raw.githubusercontent.com/rohhan36/food-app-assests/main/assets/desert1.png' }
    ]
  },
  {
    order_id: '5e2beb9d-6f76-4033-8f87-36ce8b989b58',
    customer_name: 'Jane Smith',
    delivery_address: 'House 2000, street martin, Isloo',
    payment_method: 'CARD',
    order_status: 'COMPLETED',
    total_price: 50,
    order_date: '2024-11-23T21:28:50.648+00:00',
    emotion: 'sadness',
    content: 'The food was cold and the delivery was late.',
    customer_email: 'customer2@example.com',
    order_items: [
      { quantity: 1, unitPrice: 20, productName: 'Cheese Burger', imageURL: 'https://raw.githubusercontent.com/rohhan36/food-app-assests/main/assets/desert1.png' },
      { quantity: 2, unitPrice: 15, productName: 'Chicken Wings', imageURL: 'https://raw.githubusercontent.com/rohhan36/food-app-assests/main/assets/desert1.png' }
    ]
  }
];

const ViewFeedback = () => {
  const [feedbacks, setFeedbacks] = useState(placeholderFeedbacks);
  const [sortedFeedbacks, setSortedFeedbacks] = useState(placeholderFeedbacks);
  const [sortEmotion, setSortEmotion] = useState('');
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const handleSortChange = (emotion) => {
    setSortEmotion(emotion);
    if (emotion.toLowerCase() !== 'all') {
      setSortedFeedbacks(feedbacks.filter(feedback => feedback.emotion === emotion));
    } else {
      setSortedFeedbacks(feedbacks);
    }
  };

  const handleSendEmail = (email) => {
    // Handle sending follow-up email logic here
    console.log(`Sending follow-up email to ${email}`);
  };

  const handleViewDetails = (feedback) => {
    setSelectedFeedback(feedback);
  };

  const handleCloseModal = () => {
    setSelectedFeedback(null);
  };

  return (
    <div className="max-w-[1300px] max-h-[700px] h-full font-inter flex flex-col mx-auto px-[30px] py-[20px] rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-logoColor mb-6 text-center">User Feedbacks</h1>
      <p className='text-white text-center mb-[7px] mt-[3px] font-semibold'>Filter by Emotion</p>
      <div className="mb-4 flex justify-center space-x-4">
        {['All', 'Joy', 'Sadness', 'Disgust', 'Fear', 'Neutral', 'Anger'].map(emotion => (
          <button
            key={emotion}
            onClick={() => handleSortChange(emotion.toLowerCase())}
            className={`p-2 rounded-lg ${sortEmotion === emotion.toLowerCase() ? 'text-logoColor underline' : 'text-white'} transition-all duration-300 hover:text-logoColor`}
          >
            {emotion}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-white overflow-y-auto">
        {sortedFeedbacks.map((feedback) => {
          const { order_id, customer_name, order_date, emotion, content, customer_email } = feedback;
          return (
            <motion.div
              key={order_id}
              className="flex flex-col justify-between px-[20px] py-[15px] bg-[#2a2a2a] rounded-xl shadow-lg transition-all duration-300 hover:bg-[#333333]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-4 w-full">
                <h2 className="text-[18px] font-bold mb-2 flex items-center gap-2">
                  <FaInfoCircle className="text-logoColor" />
                  {customer_name}
                </h2>
                <span className="text-[15px] mb-1 flex items-center gap-2">
                  <FaCalendar className="text-logoColor" />
                  <strong>Order Date:</strong> {new Date(order_date).toLocaleDateString()}
                </span>
                <p className="text-[15px] my-3 truncate">{content}</p>
                <button
                  className="mt-2 bg-inherit border-2 border-logoColor hover:bg-logoColor text-white py-1 px-2 rounded-lg flex items-center gap-2 transition-all duration-300"
                  onClick={() => handleSendEmail(customer_email)}
                >
                  <FaEnvelope />
                  Send Follow-up Email
                </button>
                <button
                  className="ml-auto mt-2 bg-inherit my-[10px] hover:underline text-white py-1 px-2 rounded-lg flex items-center gap-2 transition-all duration-300"
                  onClick={() => handleViewDetails(feedback)}
                >
                  View Details
                  <FaChevronRight />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
      <AnimatePresence>
        {selectedFeedback && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-[#1a1a1a] text-white rounded-xl shadow-lg p-6 w-full max-w-lg overflow-y-auto max-h-[90vh]"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl">Order Details</h2>
                <button onClick={handleCloseModal} className="text-gray-400 hover:text-white transition duration-300">
                  <FaTimes size={24} />
                </button>
              </div>
              <div className="mb-4">
                <p className="flex items-center gap-2 mb-[5px]"><FaInfoCircle className="text-logoColor" /><strong>Order ID:</strong> {selectedFeedback.order_id}</p>
                <p className="flex items-center gap-2 mb-[5px]"><FaMapMarkerAlt className="text-logoColor" /><strong>Address:</strong> {selectedFeedback.delivery_address}</p>
                <p className="flex items-center gap-2 mb-[5px]"><FaCreditCard className="text-logoColor" /><strong>Payment Method:</strong> {selectedFeedback.payment_method}</p>
                <p className={`flex items-center gap-2 mb-[5px] ${selectedFeedback.order_status === 'Cancelled' ? 'text-red-500' : selectedFeedback.order_status === 'Completed' ? 'text-green-500' : 'text-yellow-500'}`}>
                  <FaInfoCircle className="text-logoColor" /><strong>Status:</strong> {selectedFeedback.order_status}
                </p>
                <p className="flex items-center gap-2 mb-[5px]"><FaCalendar className="text-logoColor" /><strong>Order Date:</strong> {new Date(selectedFeedback.order_date).toLocaleDateString()}</p>
                <p className="flex items-center gap-2 mb-[5px]"><FaDollarSign className="text-logoColor" /><strong>Total Price:</strong> ${selectedFeedback.total_price.toFixed(2)}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-xl mb-2">Order Items</h3>
                {selectedFeedback.order_items.map((item, index) => (
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
              <h2 className="text-2xl mb-4">Feedback for Order {selectedFeedback.order_id}</h2>
              <p className="text-[15px]">{selectedFeedback.content}</p>
              <button
                className="mt-4 bg-gray-500 text-white py-2 px-4 rounded-lg transition-all duration-300 hover:bg-gray-600"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ViewFeedback;