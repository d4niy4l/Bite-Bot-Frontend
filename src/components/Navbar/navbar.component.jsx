import React, { useState } from 'react';
import { AiOutlineLogout } from "react-icons/ai";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoMdTime } from "react-icons/io";

import { MdRestaurantMenu } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { BsStars } from "react-icons/bs";
import { useCartActions } from '../../context/cart-context/cart-context';



const Right_Links = [
  {
    text: 'Track Order',
    image: <CiLocationOn className='text-yellow-500 text-[25px] group-hover:text-white transition-all duration-300' />,
    text_color: 'text-yellow-500',
    border: 'border-yellow-500',
    hover_background: 'hover:bg-yellow-500'
  },
  {
    text: 'Past Orders',
    image: <IoMdTime className='text-green-500 text-[25px] group-hover:text-white transition-all duration-300' />,
    text_color: 'text-green-500',
    border: 'border-green-500',
    hover_background: 'hover:bg-green-500'
  },
  {
    text: 'Logout',
    image: <AiOutlineLogout className='text-[25px] text-pink-500 group-hover:text-white transition-all duration-300' />,
    text_color: 'text-pink-500',
    border: 'border-pink-500',
    hover_background: 'hover:bg-pink-500'
  },
]

const Navbar = ({ state }) => {
  const {togglePopup} = useCartActions();


  const Left_Links = [
    {
      text: 'Explore Menu',
      image: <MdRestaurantMenu className='text-red-500 text-[25px] group-hover:text-white transition-all duration-300' />,
      text_color: 'text-red-500',
      border: 'border-red-500',
      hover_background: 'hover:bg-red-500',
      onClick : () => {
        alert('Explore Menu');
      }
    },
    {
      text: 'Ask Bite Bot',
      image: <BsStars className='text-blue-500 text-[25px] group-hover:text-white transition-all duration-300' />,
      text_color: 'text-blue-500',
      border: 'border-blue-500',
      hover_background: 'hover:bg-blue-500',
      onClick : () => {
        alert('Ask Bite Bot');
      }
    },
    
    {
      text: 'Cart',
      image:  <AiOutlineShoppingCart className='text-[25px] text-purple-500 group-hover:text-white transition-all duration-300' />,
      text_color: 'text-purple-500',
      border: 'border-purple-500',
      hover_background: 'hover:bg-purple-500',
      onClick : () => {
        togglePopup();
      }
    },
    
  ]
  

  return (
    <>
      <div className='w-full flex justify-between items-center px-[50px] py-[30px] bg-black'>
          <div className='flex flex-row gap-[20px]'>
            {
              Left_Links.map((link, index) => {
                return (
                  <div key={index} 
                  onClick={link.onClick}
                  className={`cursor-pointer group ${link.hover_background} rounded-xl border-2 px-[5px] py-[2.5px] flex flex-row gap-[5px] ${link.border} transition-all duration-300`}>
                    {link.image}
                    <p className={`${link.text_color} font-semibold group-hover:text-white transition-all duration-300`}>{link.text}</p>
                  </div>
                )
              })
            }
          </div>
          <img
            src='/logo.webp'
            alt='logo'
            width={100}
            height={100}
       
          />
     
        <div className='flex flex-row gap-[20px]'>
          {
            Right_Links.map((link, index) => {
              return (
                <div key={index} className={`cursor-pointer group ${link.hover_background}  flex border-2 px-[5px] py-[2.5px] rounded-xl flex-row gap-[5px] ${link.border} transition-all duration-300`}>
                  {link.image}
                  <p className={`${link.text_color} font-semibold group-hover:text-white transition-all duration-300`}>{link.text}</p>
                </div>
              )
            })
          }
          
       
        </div>
      </div>
      <hr className='w-[90%] text-logoColor border-logoColor bg-logoColor mx-auto mb-[20px]' />

     
    </>
  );
};

export default Navbar;
{/* 
   
*/}