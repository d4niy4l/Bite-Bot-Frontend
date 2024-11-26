import { nav } from 'framer-motion/client';
import { CiCirclePlus } from 'react-icons/ci';
import { RxCross1 } from 'react-icons/rx';

import { useNavigate, useOutlet, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'react-toastify';
import apiClient from '../../../lib/axios.lib';
import Spinner from '../../../components/Spinner/spinner.component';
import { ENDPOINTS } from '../../../utils/api/endpoints';

const INIT_STATE = {
  email: '',
  password: '',
  position: '',
  salary: 0,
};

const UpdateWorker = () => {
  const navigate = useNavigate();
  const { worker, setWorkers, workers } = useOutletContext();

  const [newpassword, setPassword] = useState('');

  const [formData, setFormData] = useState(worker);
  const [loading, setLoading] = useState(false);

  if (worker == null || !worker.workerId) {
    navigate('/admin/workers');
    return;
  }

  const { email, password, position, salary } = formData;

  const onUpdateHandler = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const response = await apiClient.post(ENDPOINTS.UPDATE_WORKER, {
      ...formData,
      password: newpassword,
    });
    if (response.status === 200 && response.data.data == 'WORKER_UPDATED') {
      toast.success('Worker Updated Successfully');
      const updatedWorkers = workers.map((w) => {
        if (w.workerId === worker.workerId) {
          return {
            ...w,
            workerId: worker.workerId,
            email: formData.email,
            salary: formData.salary,
            position: formData.position,
          };
        }
        return w;
      });
      setWorkers(updatedWorkers);
      navigate('/admin/workers');
    }
    setLoading(false);
  };

  const onPasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <>
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center z-10"></div>
      )}

      <motion.div
        className="text-white w-[400px] mx-auto"
        initial={{ opacity: 0, rotateY: -90 }}
        animate={{ opacity: 1, rotateY: 0 }}
        exit={{ opacity: 0, rotateY: 90 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[11]">
          {loading && <Spinner />}
        </div>
        <div className=" flex flex-row justify-between items-center">
          <h1 className="text-3xl font-sulphur text-logoColor">
            Enter Worker Details
          </h1>
          <button
            onClick={() => {
              navigate('/admin/workers');
            }}
            className="group w-max flex flex-row gap-3 p-3 justify-center items-center hover:bg-logoColor bg-inherit text-white py-2 rounded-lg  hover:text-black transition-all duration-300"
          >
            <div>
              <RxCross1
                className="text-white text-[20px]
            group-hover:text-black"
              />
            </div>
          </button>
        </div>
        <div className="flex flex-col gap-3 mt-6">
          <div className="flex flex-col gap-2">
            <label className="text-logoColor text-xl">Email</label>
            <input
              type="text"
              className="p-[6px] bg-transparent border-white text-logoColor border-transparent focus:border-logoColor border-[2px] focus:outline-none rounded-xl"
              onChange={onChangeHandler}
              value={email}
              name="email"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-logoColor text-xl">Password</label>
            <input
              type="text"
              className="p-[6px] bg-transparent border-white text-logoColor border-transparent focus:border-logoColor border-[2px] focus:outline-none rounded-xl"
              value={newpassword}
              onChange={onPasswordChange}
              name="password"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-logoColor text-xl">Position</label>
            <input
              type="text"
              className="p-[6px] bg-transparent border-white text-logoColor border-transparent focus:border-logoColor border-[2px] focus:outline-none rounded-xl"
              value={position}
              onChange={onChangeHandler}
              name="position"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-logoColor text-xl">Salary</label>
            <input
              type="text"
              className="p-[6px] bg-transparent border-white text-logoColor border-transparent focus:border-logoColor border-[2px] focus:outline-none rounded-xl"
              value={salary}
              onChange={onChangeHandler}
              name="salary"
            />
          </div>
          <button
            onClick={onUpdateHandler}
            className="group w-full flex flex-row gap-4 p-3 justify-center items-center hover:bg-logoColor bg-inherit text-white py-2 mt-4 rounded-xl border-2 border-logoColor hover:text-black transition-all duration-300"
          >
            <div>
              <CiCirclePlus className="text-white text-[36px] group-hover:text-black" />
            </div>
            <div className="text-xl">Update Worker</div>
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default UpdateWorker;
