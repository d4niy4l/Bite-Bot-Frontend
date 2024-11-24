import { nav } from 'framer-motion/client';
import { CiCirclePlus } from 'react-icons/ci';
import { RxCross1 } from 'react-icons/rx';

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
const AddWorker = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      className="text-white w-[400px] mx-auto"
      initial={{ opacity: 0, rotateY: -90 }}
      animate={{ opacity: 1, rotateY: 0 }}
      exit={{ opacity: 0, rotateY: 90 }}
      transition={{ duration: 0.5 }}
    >
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
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-logoColor text-xl">Password</label>
          <input
            type="text"
            className="p-[6px] bg-transparent border-white text-logoColor border-transparent focus:border-logoColor border-[2px] focus:outline-none rounded-xl"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-logoColor text-xl">Position</label>
          <input
            type="text"
            className="p-[6px] bg-transparent border-white text-logoColor border-transparent focus:border-logoColor border-[2px] focus:outline-none rounded-xl"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-logoColor text-xl">Salary</label>
          <input
            type="text"
            className="p-[6px] bg-transparent border-white text-logoColor border-transparent focus:border-logoColor border-[2px] focus:outline-none rounded-xl"
          />
        </div>
        <button className="group w-full flex flex-row gap-4 p-3 justify-center items-center hover:bg-logoColor bg-inherit text-white py-2 mt-4 rounded-xl border-2 border-logoColor hover:text-black transition-all duration-300">
          <div>
            <CiCirclePlus className="text-white text-[36px] group-hover:text-black" />
          </div>
          <div className="text-xl">Add Worker</div>
        </button>
      </div>
    </motion.div>
  );
};

export default AddWorker;
