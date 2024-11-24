import React, { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AiOutlinePlus } from 'react-icons/ai';
import ProductCard from './components/Product-Card/ProductCard'; // Adjust the path as needed
import { useNavigate, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { workers } from '../../../data/workers';
import { TbEdit } from 'react-icons/tb';
import { MdDelete } from 'react-icons/md';
const ManageWorker = () => {
  const navigate = useNavigate();

  const onAddHandler = () => {
    navigate('/admin/workers/add');
  };

  const handleModalBounds = () => {
    navigate('/admin/workers');
  };
  const location = useLocation();

  const isOverlayVisible =
    location.pathname === '/admin/workers/add' ||
    location.pathname === '/admin/workers/update';
  return (
    <div className="p-4 relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-logoColor mb-[18px] font-sulphur">
          Manage Workers
        </h1>
        <button
          onClick={onAddHandler}
          className="group w-max flex flex-row gap-3 p-3 justify-center items-center hover:bg-logoColor bg-inherit text-white py-2 mt-4 rounded-lg border-2 border-logoColor hover:text-black transition-all duration-300"
        >
          <div>
            <AiOutlinePlus className="text-white text-[20px] group-hover:text-black" />
          </div>
          <div>Add Worker</div>
        </button>
      </div>
      <div className="text-logoColor grid grid-cols-6 text-center font-sulphur font-bold text-xl mb-4">
        <div className="whitespace-nowrap text-ellipsis overflow-hidden">
          Worker ID
        </div>
        <div className="whitespace-nowrap text-ellipsis overflow-hidden">
          Email
        </div>
        <div className="whitespace-nowrap text-ellipsis overflow-hidden">
          Position
        </div>
        <div className="whitespace-nowrap text-ellipsis overflow-hidden">
          Salary
        </div>
        <div className="whitespace-nowrap text-ellipsis overflow-hidden">
          Join Date
        </div>
      </div>
      <hr className="border-logoColor mb-4" />
      {workers.map((worker) => {
        return (
          <div
            key={worker.id}
            className="group text-white grid grid-cols-6 text-center text-lg cursor-pointer group border-2 border-[#1a1a1a] hover:border-logoColor rounded-xl p-4 mb-4 transition-all duration-300"
          >
            <div className="whitespace-nowrap text-ellipsis overflow-hidden">
              {worker.id}
            </div>
            <div className="whitespace-nowrap text-ellipsis overflow-hidden">
              {worker.email}
            </div>
            <div className="whitespace-nowrap text-ellipsis overflow-hidden">
              {worker.position}
            </div>
            <div className="whitespace-nowrap text-ellipsis overflow-hidden">
              {worker.salary}
            </div>
            <div className="whitespace-nowrap text-ellipsis overflow-hidden">
              {worker.joinDate}
            </div>
            <div className="mx-auto hidden group-hover:flex flex-row gap-3">
              <div>
                <TbEdit className="text-2xl hover:text-logoColor" />
              </div>
              <div>
                <MdDelete className="text-2xl hover:text-logoColor" />
              </div>
            </div>
          </div>
        );
      })}
      <AnimatePresence>
        {isOverlayVisible && (
          <>
            <div
              onClick={handleModalBounds}
              className="fixed inset-0 bg-black bg-opacity-80"
            ></div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed border-2 border-logoColor top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2] bg-[#1e1e1e] p-4 rounded-xl"
            >
              <Outlet />
            </motion.div>{' '}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageWorker;
