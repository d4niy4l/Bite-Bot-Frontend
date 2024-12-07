import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaInfoCircle, FaMapMarkerAlt, FaCreditCard, FaCalendar, FaDollarSign, FaTimes, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import apiClient from '../../../lib/axios.lib';
import {ENDPOINTS} from './../../../utils/api/endpoints';
import { toast } from 'react-toastify';

const ViewFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [sortedFeedbacks, setSortedFeedbacks] = useState([]);
  const [sortEmotion, setSortEmotion] = useState('');
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailContent, setEmailContent] = useState('');

  useEffect(() => {
    // Fetch feedbacks from the API
    
    const fetchFeedbacks = async () => {
      try {
        const response = await apiClient.get(ENDPOINTS.GET_ALL_FEEDBACKS);
        if (response.status === 200) {
          setFeedbacks(response.data.data);
          setSortedFeedbacks(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };
    fetchFeedbacks();
  }, []);

  const handleSortChange = (emotion) => {
    setSortEmotion(emotion);
    if (emotion.toLowerCase() !== 'all') {
      setSortedFeedbacks(feedbacks.filter(feedback => feedback.emotion === emotion));
    } else {
      setSortedFeedbacks(feedbacks);
    }
  };

  const handleSendEmail = (feedback) => {
    setSelectedFeedback(feedback);
    setEmailContent(`Dear ${feedback.customer_name},\n\nThank you for your feedback regarding your recent order. We appreciate your input and are always striving to improve our services.\n\nBest regards,\nBiteBot`);
    setEmailModalOpen(true);
  };

  const handleEmailSend = async () => {
      const res = await apiClient.post(ENDPOINTS.FOLLOW_UP_EMAIL , {
        customer_id: selectedFeedback.customer_id,
        body: emailContent,
        feedback_id: selectedFeedback.feedback_id,
        order_id: selectedFeedback.order.order_id,
      });
      if(res.status === 200){
        toast.success('Email sent successfully');
        setEmailModalOpen(false);
      }
      else{
        toast.error('Email not sent');
      }
  };

  const handleCloseModal = () => {
    setSelectedFeedback(null);
    setEmailModalOpen(false);
  };

  return (
    <div className="max-w-[1300px] h-auto font-inter flex flex-col mx-auto px-[30px] py-[20px] rounded-xl shadow-lg">
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
        {sortedFeedbacks && sortedFeedbacks.map((feedback) => {
          const { feedback_id, customer_name, content, emotion, order } = feedback;
          const { order_id, order_date, customer_email } = order;
          return (
            <motion.div
              key={feedback_id}
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
                  onClick={() => handleSendEmail(feedback)}
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
        {selectedFeedback && !emailModalOpen && (
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
                <p className="flex items-center gap-2 mb-[5px]"><FaInfoCircle className="text-logoColor" /><strong>Order ID:</strong> {selectedFeedback.order.order_id}</p>
                <p className="flex items-center gap-2 mb-[5px]"><FaMapMarkerAlt className="text-logoColor" /><strong>Address:</strong> {selectedFeedback.order.delivery_address}</p>
                <p className="flex items-center gap-2 mb-[5px]"><FaCreditCard className="text-logoColor" /><strong>Payment Method:</strong> {selectedFeedback.order.payment_method}</p>
                <p className={`flex items-center gap-2 mb-[5px] ${selectedFeedback.order.order_status === 'Cancelled' ? 'text-red-500' : selectedFeedback.order.order_status === 'Completed' ? 'text-green-500' : 'text-yellow-500'}`}>
                  <FaInfoCircle className="text-logoColor" /><strong>Status:</strong> {selectedFeedback.order.order_status}
                </p>
                <p className="flex items-center gap-2 mb-[5px]"><FaCalendar className="text-logoColor" /><strong>Order Date:</strong> {new Date(selectedFeedback.order.order_date).toLocaleDateString()}</p>
                <p className="flex items-center gap-2 mb-[5px]"><FaDollarSign className="text-logoColor" /><strong>Total Price:</strong> ${selectedFeedback.order.total_price.toFixed(2)}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-xl mb-2">Order Items</h3>
                {selectedFeedback.order.order_items.map((item, index) => (
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
              <h2 className="text-2xl mb-4">Feedback for Order {selectedFeedback.order.order_id}</h2>
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
      <AnimatePresence>
        {emailModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-[#1a1a1a] text-white rounded-xl shadow-lg p-6 w-full max-w-2xl overflow-y-auto max-h-[460px] h-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl">Confirm Follow Up Email</h2>
                <button onClick={handleCloseModal} className="text-gray-400 hover:text-white transition duration-300">
                  <FaTimes size={24} />
                </button>
              </div>
              <textarea
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                className="w-full h-[300px] p-2 bg-[#333333] text-white border-[#1d1d1d] focus:border-logoColor border-[2px] focus:outline-none rounded-xl resize-none"
                placeholder="Enter your email content here..."
              />
              <button
                className="mt-4 bg-logoColor text-white py-2 px-4 rounded-lg transition-all duration-300 hover:bg-gray-600"
                onClick={handleEmailSend}
              >
                Send Email
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ViewFeedback;