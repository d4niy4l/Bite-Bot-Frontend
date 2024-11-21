import React from "react";
import {
  useCart,
  useCartActions,
} from "../../context/cart-context/cart-context";
import { AiOutlineClose } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CartModal = () => {
  const { cart, total, showPopup } = useCart();
  const { togglePopup, increaseQuantity, decreaseQuantity } = useCartActions();
  const navigate = useNavigate();
  if (!showPopup) return null;

  // Convert cart map to an array and group items by product ID

  const handleIncreaseQuantity = (id) => {
    increaseQuantity(id);
  };

  const handleDecreaseQuantity = (id) => {
    decreaseQuantity(id);
  };

  const onCheckoutHandler = () => {
    togglePopup();
    navigate("/checkout");
  };

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
            <h2 className="text-2xl font-semibold font-mono mb-4 text-logoColor">
              Your Cart
            </h2>
            {Object.keys(cart).length === 0 ? (
              <p className="text-white">Your cart is empty.</p>
            ) : (
              <div>
                <ul className="space-y-4 max-h-[300px] overflow-y-auto">
                  {Object.values(cart).map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-gray-600">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleDecreaseQuantity(item.id)}
                          className="text-logoColor hover:text-logoColor-dark transition-all duration-300"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => handleIncreaseQuantity(item.id)}
                          className="text-logoColor hover:text-logoColor-dark transition-all duration-300"
                        >
                          +
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 border-t pt-4">
                  <div className="flex justify-between items-center font-mono">
                    <h3 className="text-[20px] font-semibold">Total</h3>
                    <p className="text-[20px] font-semibold">
                      ${total.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={onCheckoutHandler}
                    className="w-full hover:bg-logoColor bg-inherit text-white py-2 mt-4 rounded-lg border-2 border-logoColor hover:bg-logoColor-dark transition-all duration-300"
                  >
                    Proceed to Checkout
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
