import React from 'react';
import { useCart, useCartActions } from "../../context/cart-context/cart-context";
import { AiOutlineClose } from "react-icons/ai";
import { motion, AnimatePresence } from 'framer-motion';

const CartModal = () => {
  const { cart, total, showPopup } = useCart();
  const { togglePopup } = useCartActions();

  if (!showPopup) return null;

  // Group cart items by product ID
  const groupedCart = cart.reduce((acc, item) => {
    const existingItem = acc.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
      existingItem.totalPrice += item.price * item.quantity;
    } else {
      acc.push({ ...item, totalPrice: item.price * item.quantity });
    }
    return acc;
  }, []);

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="text-white bg-black rounded-lg shadow-lg w-full max-w-md p-6 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-logoColor transition-all duration-300"
              onClick={togglePopup}
            >
              <AiOutlineClose size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            {groupedCart.length === 0 ? (
              <p className="text-gray-600">Your cart is empty.</p>
            ) : (
              <div>
                <ul className="space-y-4">
                  {groupedCart.map((item, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="ml-4">
                          <h3 className="text-lg font-semibold">{item.name}</h3>
                          <p className="text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="text-lg font-semibold">${item.totalPrice.toFixed(2)}</p>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 border-t pt-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Total</h3>
                    <p className="text-lg font-semibold">${total.toFixed(2)}</p>
                  </div>
                  <button className="w-full bg-logoColor text-white py-2 mt-4 rounded-lg hover:bg-logoColor-dark transition-all duration-300">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartModal;