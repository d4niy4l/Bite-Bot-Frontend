import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdDashboard, MdRestaurantMenu, MdPeople, MdMenu, MdClose } from 'react-icons/md';
import { motion } from 'framer-motion';
import { getAccessToken, removeAccessToken } from '../../utils/cookies/cookie';
import { AiOutlineLogout } from 'react-icons/ai';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    {
      text: 'Dashboard',
      icon: <MdDashboard className="text-blue-500 text-[40px] group-hover:text-white transition-all duration-300" />,
      onClick: () => navigate('/admin/dashboard'),
    },
    {
      text: 'Products',
      icon: <MdRestaurantMenu className="text-red-500 text-[40px] group-hover:text-white transition-all duration-300" />,
      onClick: () => navigate('/admin/products'),
    },
    {
      text: 'Workers',
      icon: <MdPeople className="text-green-500 text-[40px] group-hover:text-white transition-all duration-300" />,
      onClick: () => navigate('/admin/workers'),
    },
    {
      text: getAccessToken() ? 'Logout' : 'Login',
      icon: (
        <AiOutlineLogout className="text-[40px] text-pink-500 group-hover:text-white transition-all duration-300" />
      ),
      text_color: 'text-pink-500',
      border: 'border-pink-500',
      hover_background: 'hover:bg-pink-500',
      onClick: () => {
        const access_token = getAccessToken();
        if (access_token){
          removeAccessToken();
        }
        navigate('/login');
      },
    }
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.div
      initial={{ width: isOpen ? '230px' : '100px' }}
      animate={{ width: isOpen ? '230px' : '100px' }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 h-full bg-black text-white shadow-lg z-50"
    >
      <div className="flex flex-col p-4 h-full gap-[25px]">
        <button onClick={toggleSidebar} className="mb-4 flex justify-center">
          {isOpen ? <MdClose className="text-white text-[40px]" /> : <MdMenu className="text-white text-[40px]" />}
        </button>
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={item.onClick}
            className={`flex items-center gap-4 p-2 mb-2 cursor-pointer hover:bg-gray-700 rounded-lg transition-all duration-300 ${isOpen === false ? 'mx-auto' : ''}`}
          >
            <span className='flex justify-center items-center'>
              {item.icon}
            </span>
            {}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-[20px] font-inter font-semibold"
            >
              {item.text}
            </motion.span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Sidebar;