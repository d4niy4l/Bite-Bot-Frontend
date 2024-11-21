import React, { useState } from 'react';

const FeedbackForm = ({ orderId, onClose }) => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle feedback submission logic here
    console.log(`Feedback for order ${orderId}: ${feedback}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] text-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl mb-4">Feedback for Order {orderId}</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full h-32 p-2 bg-[#333333] text-white border-[#1d1d1d] focus:border-themegreen border-[2px] focus:outline-none rounded-xl resize-none"
            placeholder="Enter your feedback here..."
          />
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-logoColor text-white py-2 px-4 rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;