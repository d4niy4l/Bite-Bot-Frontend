import React, { useState } from 'react';
import { AiOutlineLogout } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoMdTime } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { motion, AnimatePresence } from 'framer-motion';
import { MdRestaurantMenu } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { BsStars } from "react-icons/bs";



const Navbar = ({ state }) => {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const Links = [
    {
      text: 'Explore Menu',
      image: <MdRestaurantMenu className='text-logoColor text-[30px]' />
    },
    {
      text: 'Ask Bite Bot',
      image: <BsStars className='text-logoColor text-[30px]' />
    },
    {
      text: 'Past Orders',
      image: <IoMdTime className='text-logoColor text-[30px]' />
    },
    {
      text: 'Track Order',
      image: <CiLocationOn className='text-logoColor text-[30px]' />
    }
  ]

  return (
    <>
      <div className='flex justify-between items-center px-[50px] py-[30px] bg-black'>
          <img
            src='/navbar-logo.webp'
            alt='logo'
            width={200}
            height={100}
          />
     
        <div className='flex flex-row gap-[20px]'>
          <button>
            <AiOutlineShoppingCart className='text-[40px] text-red-500' />
          </button>
          <button>
            <AiOutlineLogout className='text-[40px] text-blue-500' />
          </button>
          <button onClick={toggleSidebar} className=''>
            <RxHamburgerMenu className='text-[40px] text-purple-500' />
          </button>
        </div>
      </div>
      <hr className='w-[90%] text-logoColor border-logoColor bg-logoColor mx-auto' />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '200%' }}
            animate={{ x: 0 }}
            exit={{ x: '200%' }}
            transition={{ duration: 0.5 }}
            className='px-[30px] py-[40px] border-2 fixed top-0 right-0 w-[250px] h-full bg-black text-white p-5'
          >
            <button onClick={toggleSidebar} className='w-full'>
              <RxCross1  className='text-logoColor text-[40px] ml-auto' />
            </button>
            <div className='space-y-[50px] mt-[60px]'>
                {
                  Links.map((val, index)=>{
                    return(
                        <div key={index} className='flex gap-[10px]'>
                          {val.image}
                          <div className='group relative flex flex-row max-w-fit'>
                            <a href='#' className='text-white group-hover:text-logoColor transition-all duration-300 font-semibold text-[20px]'>{val.text}</a>
                            <span
                              className='absolute bottom-[-5px] w-0 h-[2px] bg-logoColor  transition-all duration-500 group-hover:w-[100%]'
                            />
                          </div>
                        </div>       
                    )
                  })
                }
           </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
{/* 
   
*/}