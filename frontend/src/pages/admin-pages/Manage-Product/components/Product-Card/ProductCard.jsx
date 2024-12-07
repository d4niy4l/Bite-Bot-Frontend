import React from 'react';
import { motion } from 'framer-motion';
import { AiOutlineDelete, AiOutlineDollarCircle, AiOutlineEdit } from 'react-icons/ai';

const ProductCard = ({ product, onUpdate, onDelete }) => {
  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-yellow-500',
    'bg-pink-500',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className="cursor-pointer max-w-xs rounded-xl shadow-lg p-4 bg-[#1A1A1A] text-white font-mono"
    >
      <div className="flex justify-center">
        <img
          className="max-w-[200px]"
          src={product.imageLink}
          alt={product.name}
        />
      </div>
      <div className="px-6 py-4 border-t-2 border-logoColor">
        <div className="font-bold text-xl mb-2">{product.name}</div>
        <div className="flex flex-row justify-between">
          <span className="text-base flex flex-row items-center gap-[5px]">
            <AiOutlineDollarCircle className="text-[30px] text-green-500" />
            <p className="text-[20px]">{product.price}</p>
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => onUpdate(product)}
              className="bg-blue-500 text-white p-2 rounded-full"
            >
              <AiOutlineEdit className="text-[20px]" />
            </button>
            <button
              onClick={() => onDelete(product.id)}
              className="bg-red-500 text-white p-2 rounded-full"
            >
              <AiOutlineDelete className="text-[20px]" />
            </button>
          </div>
        </div>
      </div>
      <div className="px-6 pt-4">
        {product.ingredients.map((ingredient, index) => {
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
        {product.ingredients.length > 6 ? (
          <span
            className={`inline-block rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 bg-logoColor`}
          >
            +{product.ingredients.length - 6} more
          </span>
        ) : null}
      </div>
    </motion.div>
  );
};

export default ProductCard;