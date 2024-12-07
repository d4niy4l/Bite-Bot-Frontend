import React, { useState, useRef, useEffect, useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AiOutlinePlus } from 'react-icons/ai';
import ProductCard from './components/Product-Card/ProductCard'; // Adjust the path as needed
import { useNavigate, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
// import { workers } from '../../../data/workers';
import { TbEdit } from 'react-icons/tb';
import { MdDelete } from 'react-icons/md';
import apiClient from '../../../lib/axios.lib';
import { ENDPOINTS } from '../../../utils/api/endpoints';
import { AdminContext } from '../../../context/admin-context/admin.context';
import { toast } from 'react-toastify';
import Spinner from '../../../components/Spinner/spinner.component';

const ManageWorker = () => {
  const navigate = useNavigate();
  const data = useContext(AdminContext);
  const {
    setWorkers,
    workers,
    loading,
    setLoading,
    currentWorker,
    setCurrentWorker,
  } = data;

  useEffect(() => {
    const fetchWorkers = async () => {
      const response = await apiClient.get(ENDPOINTS.GET_ALL_WORKERS);
      if (response.status === 200) {
        setWorkers(response.data);
      }
    };
    fetchWorkers();
  }, []);

  const onAddHandler = () => {
    navigate('/admin/workers/add');
  };

  const onDeleteHandler = async (workerId) => {
    setLoading(true);
    const response = await apiClient.post(ENDPOINTS.DELETE_WORKER, {
      workerId: workerId,
    });
    if (response.status === 200) {
      if (response.data.data == 'WORKER_DELETED') {
        setLoading(false);
        const updatedWorkers = workers.filter(
          (worker) => worker.workerId !== workerId
        );
        setWorkers(updatedWorkers);
      } else {
        setLoading(false);
        toast.error('An unexpected error occurred. Please try again.');
      }
    } else {
      setLoading(false);
      toast.error('Failed to delete worker');
    }
  };

  const handleModalBounds = () => {
    if (loading) {
      return;
    }
    navigate('/admin/workers');
  };
  const location = useLocation();

  const isOverlayVisible =
    location.pathname === '/admin/workers/add' ||
    location.pathname === '/admin/workers/update';

  return (
    <div className="p-4 relative">
      {loading && (
        <>
          <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[11]">
            <Spinner />
          </div>
        </>
      )}
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
      <div className="text-logoColor grid grid-cols-8 text-center font-sulphur font-bold text-xl mb-4">
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
        <div className="whitespace-nowrap text-ellipsis overflow-hidden">
          Type
        </div>
        <div className="whitespace-nowrap text-ellipsis overflow-hidden">
          Vehicle
        </div>
      </div>
      <hr className="border-logoColor mb-4" />
      {workers.length > 0 &&
        workers.map((worker) => {
          return (
            <div
              key={worker.workerId}
              className="group text-white grid grid-cols-8 text-center text-lg cursor-pointer group border-2 border-[#1a1a1a] hover:border-logoColor rounded-xl p-4 mb-4 transition-all duration-300"
            >
              <div className="whitespace-nowrap text-ellipsis overflow-hidden">
                {worker.workerId}
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
              <div className="whitespace-nowrap text-ellipsis overflow-hidden">
                {worker.role}
              </div>
              <div className="whitespace-nowrap text-ellipsis overflow-hidden">
                {worker.vehicle ? worker.vehicle : ''}
              </div>

              <div className="mx-auto hidden group-hover:flex flex-row gap-3">
                <div
                  onClick={() => {
                    setCurrentWorker(worker.workerId);
                    navigate('/admin/workers/update');
                  }}
                >
                  <TbEdit className="text-2xl hover:text-logoColor" />
                </div>
                <div
                  onClick={() => {
                    onDeleteHandler(worker.workerId);
                  }}
                >
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
              <Outlet
                context={{
                  worker: currentWorker,
                  setWorkers,
                  workers,
                }}
              />
            </motion.div>{' '}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageWorker;
