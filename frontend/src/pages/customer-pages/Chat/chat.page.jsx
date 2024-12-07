import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import ProductCard from '../../../components/Product-Card/product-card.component';
import product_data from '../../../data/products';
import { getAccessToken } from '../../../utils/cookies/cookie';
import { toast } from 'react-toastify';
import apiClient from '../../../lib/axios.lib';
import { ENDPOINTS } from '../../../utils/api/endpoints';

const Chat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [type, setType] = useState('emotional');

  const ToggleTypeChange = () => {
    if(type === 'emotional'){
      setType('nutritional');
    }
    else{
      setType('emotional');
    }
  }

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = async (e) => {
    const access_token = getAccessToken();

    if(!access_token) {
      toast.error('Please login to continue');
      return;
    }

    if (e.key === 'Enter' && !loading) {
      setMessages([...messages, input]);
      setInput('');
      setLoading(true);
      
      try{
        const res = await apiClient.post(ENDPOINTS.EMOTION_API,
          {
          text: input,
          type: type
          }
        );
        setProducts(res.data.data);
        setLoading(false);
      } 
      catch(err){
        setLoading(false);
        console.log(err);
        
        toast.error('Error in processing the request');
      }
    
      
    }
  };

  return (
    <>
    <div className='max-w-[1340px] mt-[40px] mx-auto w-full bg-[#141414] flex flex-row text-white md:flex-row items-center md:items-start p-4 rounded-xl shadow-lg'>
      <div className='rounded-xl px-[30px] py-[20px] w-full'>
        <h1 className='text-[32px] text-logoColor font-bold font-inter mb-2'>Can't Decide what to eat?</h1>
        <h2 className='text-[20px] font-inter font-medium mt-[10px] mb-[20px]'>Let BiteBot decide so that You can Focus on Eating!</h2>
        <button 
        onClick={ToggleTypeChange} 
        className='bg-logoColor my-[10px] text-white font-inter font-bold py-2 px-4 rounded-lg'>
          Change Recommendation type to {type === 'emotional' ? 'Nutritional' : 'Emotional'}
        </button>
        <div className="w-full bg-black rounded-xl shadow-xl p-4 border-2 border-logoColor items-center">
          <div className="h-64 overflow-y-auto p-2">
            {messages.map((msg, index) => (
              <div key={index} className="flex">
                <span className="text-green-500 font-mono font-semibold">user@bitebot:~$</span>
                <span className="ml-2 font-mono font-medium">{msg}</span>
              </div>
            ))}
              <AnimatePresence>
            {
              loading && (
                <motion.div 
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
              exit={{ opacity: 0}}
              transition={{ duration: 0.3}}
              className="flex items-center mt-4">
                <div className="ml-2 flex-1 bg-gray-700 h-4 rounded-lg overflow-hidden">
                  <div className="bg-green-500 h-full animate-pulse"></div>
                </div>
              </motion.div>
            )}
            </AnimatePresence>
          </div>
          <div className="flex items-center mt-4">
            <span className="text-green-500 font-mono font-semibold">user@bitebot:~$</span>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyUp={handleKeyPress}
              className="bg-black text-white ml-2 flex-1 outline-none font-mono font-medium"
              autoFocus
              disabled={loading}
              />
          </div>
        </div>
        <p className='text-sm font-inter font-bold mt-[20px] text-gray-500 text-center'>BiteBot can make mistakes, consider checking sensitive information</p>
      </div>
      <div className='w-full md:w-1/2 mt-8 p-4 rounded-lg shadow-lg hidden lg:flex items-center'>
        <img
          src='/thinking-robot.svg'
          alt='robot'
          className='w-full h-full mt-4'
          />
      </div>
    </div>
    {
    products && products.length > 0 && 
    <div className='max-w-[1340px] mx-auto my-[30px]'>
      {<motion.h1 
      initial={{ opacity: 0, y: 20}}
      animate={{ opacity: 1, y: 0}}
      transition={{ duration: 0.3}}
      className='text-[24px] text-logoColor font-bold font-inter mb-3'>Recommended Items:</motion.h1>}
      <div className='w-full grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[20px] justify-items-center justify-center'>
      {
          products.map((product, index) => {
            return(
              <ProductCard product={product} key={index} />
            )
          })
        
      }
      </div>
    </div>
  }
    </>
  );
};

export default Chat;