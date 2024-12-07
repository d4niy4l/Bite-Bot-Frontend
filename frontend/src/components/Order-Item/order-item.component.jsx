import { FaPlusCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useState } from 'react';

const OrderItem = ({ orderItem }) => {
  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-yellow-500',
    'bg-pink-500',
  ];
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div
      draggable="true"
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', orderItem.orderId);
      }}
      className="cursor-pointer flex flex-col gap-4 scrollbar-thin bg-[#1E1E1E] px-2 py-4 rounded-xl"
    >
      <div className="flex flex-row w-full justify-between items-center">
        <div className="flex flex-row justify-between w-full pr-6">
          <div className="flex flex-row px-4 justify-between  w-full ">
            <h2 className="font-bold text-3xl font-sulphur">
              OrderID: {orderItem.orderId}
            </h2>
            <div
              onClick={() => {
                setIsExpanded(!isExpanded);
              }}
            >
              <FaPlusCircle className="text-[36px] text-logoColor hover:opacity-70 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isExpanded ? 'auto' : 0 }}
        transition={{ duration: 0.5 }}
        className={`flex flex-col gap-4 overflow-hidden`}
      >
        {orderItem.lineItems.map((cartItem) => {
          return (
            <div
              key={cartItem.id}
              className="flex justify-between items-center pr-8 bg-[#333333] p-2 rounded-3xl"
              draggable="true"
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', cartItem.id);
                // console.log('Dragging:', cartItem.id); // Log the id being dragged
              }}
            >
              <div className="flex items-center gap-4">
                <div>
                  <img
                    src={cartItem.imageLink}
                    alt={cartItem.name}
                    className="w-[120px] h-[120px] object-cover rounded-lg"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-white text-xl">
                    {cartItem.name}
                  </h3>
                  <div>
                    {cartItem.ingredients.map((ingredient, index) => {
                      if (index < 6) {
                        return (
                          <span
                            key={ingredient.id}
                            className={`inline-block rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 ${
                              colors[index % colors.length]
                            }`}
                          >
                            {ingredient.name}
                          </span>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 ">
                <span className="text-white text-xl w-max">
                  x {cartItem.quantity}
                </span>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default OrderItem;
