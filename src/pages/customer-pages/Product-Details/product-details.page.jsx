import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import products from '../../../data/products'; // Adjust the path to where your products data is located
import { AiOutlineDollarCircle } from "react-icons/ai";
import { useCartActions } from '../../../context/cart-context/cart-context';
import {motion} from 'framer-motion';

import { TiPlusOutline, TiMinusOutline } from "react-icons/ti";
import { toast } from 'react-toastify';


const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addManyToCart } = useCartActions();

  const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500','bg-yellow-500', 'bg-pink-500'];


  useEffect(() => {
    const foundProduct = products.find((item) => item.id === id);
    setProduct(foundProduct);
  }, [id]);

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {

    addManyToCart(product, quantity);
    toast('Added to cart!');
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className='max-w-[1450px] mx-auto w-full mt-[20px]'>
      <motion.div 
      initial={{ opacity: 0}}
      animate={{ opacity: 1}}
      transition={{ duration: 0.5 }}
      className='bg-[#141414] text-white rounded-xl shadow-lg py-[25px] '>
        <div className='flex flex-col md:flex-row  justify-center'>
          <div className='md:w-1/2 max-w-[600px] flex items-center'>
            <img src={product.image} alt={product.name} className='w-full h-auto rounded-lg' />
          </div>
          <div className='md:w-1/2 md:mt-0 bg-[#1a1a1a] rounded-xl px-[30px] py-[20px]'>
            <h1 className='text-[42px] font-bold font-mono text-logoColor'>{product.name}</h1>
            <span className='text-[25px] my-3 flex flex-row gap-[7px] items-center font-mono'>
              <AiOutlineDollarCircle className='text-[40px] text-green-500' />
              <p>{product.price.toFixed(2)}</p>
            </span>
            <h1 className='mt-3 mb-2 text-[25px] font-semibold font-mono text-white'>Description:</h1>
            <p className=' font-inter text-[18px] mb-2 '>{product.description}</p>
            <div className='mt-4'>
            <h1 className='text-[25px] font-semibold font-mono text-white mt-3 mb-2'>Ingredients:</h1>
              <div className='flex flex-row gap-[10px] flex-wrap mb-3'>
              {product.ingredients.map((ingredient, index) => {
                    return(
                      <span key={index} className={`inline-block rounded-full px-3 py-1 text-[18px] font-semibold text-white mr-2 mb-2 ${colors[index % colors.length]}`}>
                        {ingredient}
                      </span>
                    )
                })}
              </div>
            </div>
            <h1 className='text-[25px] font-semibold font-mono text-white'>Quantity:</h1>
            <div className='flex w-full justify-between items-center mt-2'>
              <div className=' flex items-center'> 
                <button
                  onClick={handleDecreaseQuantity}
                  className='bg-inherit hover:bg-red-500 border-2 border-red-500 text-white p-2 rounded-full transition-all duration-300'
                  >
                  <TiMinusOutline className='text-red-500 text-[18px]'/>
                </button>
                <span className='mx-4 text-[18px]'>{quantity}</span>
                <button
                  onClick={handleIncreaseQuantity}
                  className='bg-inherit hover:bg-green-500 border-2 border-green-500 text-white p-2 rounded-full transition-all duration-300'
                  >
                  <TiPlusOutline className='text-green-500 text-[18px]' />
                </button>
              </div>
              
              <button
                onClick={handleAddToCart}
                className='bg-inherit  hover:bg-logoColor border-2 border-logoColor text-logoColor hover:text-white py-2 px-4 rounded-xl transition-all duration-300'
                >
                Add to Cart
              </button>
          </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetails;