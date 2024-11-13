import React from 'react';
import {motion} from 'framer-motion';
import { AiOutlineDollarCircle } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";

const ProductCard = ({ product }) => {
  const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500','bg-yellow-500', 'bg-pink-500'];

  return (
    <motion.div 
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.05 }}
    className="max-w-sm rounded-xl overflow-hidden shadow-lg p-4 bg-black text-white font-sans">
      <div className='flex justify-center'>
        <img className="max-w-[200px]" src={product.image} alt={product.name} />
      </div>
      <div className="px-6 py-4 border-t-2 border-logoColor">
        <div className="font-bold text-xl mb-2">{product.name}</div>
        <div className='flex flex-row justify-between'>

        <span className="text-base flex flex-row items-center gap-[5px]">
            <AiOutlineDollarCircle className='text-[30px] text-green-500' />
            
            <p className='text-[20px]'>{product.price}</p>
        </span>
        <span className="group hover:bg-blue-500 text-base flex flex-row items-center gap-[5px] bg-white rounded-full p-[5px] transition-all duration-300 cursor-pointer">
            <BsCartPlus className='group-hover:text-white text-[20px] text-black transition-all duration-300' />
            
        </span>
        </div>
          </div>
      <div className="px-6 pt-4 pb-2">
        {product.ingredients.map((ingredient, index) => (
          <span key={index} className={`inline-block rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 ${colors[index % colors.length]}`}>
            {ingredient}
          </span>
        ))}
      </div>
      
    </motion.div>
  );
};

export default ProductCard;