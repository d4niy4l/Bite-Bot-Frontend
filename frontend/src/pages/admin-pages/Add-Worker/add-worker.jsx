import { nav } from 'framer-motion/client';
import { CiCirclePlus } from 'react-icons/ci';
import { RxCross1 } from 'react-icons/rx';

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCallback, useContext, useState } from 'react';
import Spinner from '../../../components/Spinner/spinner.component';
import apiClient from '../../../lib/axios.lib';
import { ENDPOINTS } from '../../../utils/api/endpoints';
import { toast } from 'react-toastify';
import { AdminContext } from '../../../context/admin-context/admin.context';
import { USER_TYPES } from '../../../data/userTypes';

const INIT_STATE = {
  email: '',
  password: '',
  salary: 0,
  position: '',
  type: 'WORKER',
  vehicle: '',
};

const AddWorker = () => {
  const data = useContext(AdminContext);
  const { addWorker } = data;
  const navigate = useNavigate();

  const onAddHandler = async () => {
    setLoading(true);
    const response = await apiClient.post(ENDPOINTS.CREATE_WORKER, formData);
    if (response.status === 200) {
      addWorker(response.data);
      setLoading(false);
      toast.success('Worker Added Successfully');
      navigate('/admin/workers');
    } else {
      setLoading(false);
      toast.error('Failed to add worker');
    }
  };
  const [formData, setFormData] = useState(INIT_STATE);

  const { email, password, salary, position } = formData;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name == 'type' && value == USER_TYPES.WORKER) {
      setFormData({ ...formData, vehicle: '', [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const [loading, setLoading] = useState(false);

  console.log(formData);
  return (
    <>
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center z-10"></div>
      )}
      <motion.div
        className="relative text-white w-[400px] mx-auto"
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
              type="email"
              className="p-[6px] bg-transparent border-white text-logoColor border-transparent focus:border-logoColor border-[2px] focus:outline-none rounded-xl"
              name="email"
              value={email}
              onChange={onChangeHandler}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-logoColor text-xl">Password</label>
            <input
              type="text"
              className="p-[6px] bg-transparent border-white text-logoColor border-transparent focus:border-logoColor border-[2px] focus:outline-none rounded-xl"
              name="password"
              onChange={onChangeHandler}
              value={password}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-logoColor text-xl">Position</label>
            <input
              type="text"
              className="p-[6px] bg-transparent border-white text-logoColor border-transparent focus:border-logoColor border-[2px] focus:outline-none rounded-xl"
              name="position"
              onChange={onChangeHandler}
              value={position}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-logoColor text-xl">Salary</label>
            <input
              type="text"
              className="p-[6px] bg-transparent border-white text-logoColor border-transparent focus:border-logoColor border-[2px] focus:outline-none rounded-xl"
              name="salary"
              onChange={onChangeHandler}
              value={salary}
            />
          </div>
          <div className="flex flex-row justify-around">
            <div className="flex flex-row items-center gap-2">
              <input
                type="button"
                className={`cursor-pointer ${
                  formData.type == USER_TYPES.WORKER
                    ? 'bg-logoColor text-black '
                    : ''
                } p-[6px]  w-[160px] border-white focus:border-logoColor border-[2px] focus:outline-none rounded-xl`}
                name="type"
                value={USER_TYPES.WORKER}
                onClick={onChangeHandler}
              />
            </div>
            <div className="flex flex-row items-center gap-2">
              <input
                type="button"
                className={`cursor-pointer ${
                  formData.type == USER_TYPES.DELIVERY_PERSON
                    ? 'bg-logoColor text-black '
                    : ''
                } p-[6px] w-[160px] border-white focus:border-logoColor border-[2px] focus:outline-none rounded-xl`}
                name="type"
                value={USER_TYPES.DELIVERY_PERSON}
                onClick={onChangeHandler}
              />
            </div>
          </div>
          {formData.type === USER_TYPES.DELIVERY_PERSON && (
            <div className="flex flex-col gap-2">
              <label className="text-logoColor text-xl">Vehicle</label>
              <input
                type="text"
                className="p-[6px] bg-transparent border-white text-logoColor border-transparent focus:border-logoColor border-[2px] focus:outline-none rounded-xl"
                name="vehicle"
                onChange={onChangeHandler}
                value={formData.vehicle}
              />
            </div>
          )}
          <button
            onClick={onAddHandler}
            className="group w-full flex flex-row gap-4 p-3 justify-center items-center hover:bg-logoColor bg-inherit text-white py-2 mt-4 rounded-xl border-2 border-logoColor hover:text-black transition-all duration-300"
          >
            <div>
              <CiCirclePlus className="text-white text-[36px] group-hover:text-black" />
            </div>
            <div className="text-xl">Add Worker</div>
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default AddWorker;
