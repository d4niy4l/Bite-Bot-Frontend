import { motion } from 'framer-motion';
import './spinner.styles.css';

const Spinner = () => {
  return (
    // <motion.div
    //   initial={{ opacity: 0, scale: 0.2 }}
    //   animate={{ opacity: 1, scale: 1 }}
    //   transition={{ duration: 0.2 }}
    //   className="spinner"
    // ></motion.div>
    <div className="relative w-12 aspect-square grid rounded-full bg-[conic-gradient(#25b09b_25%,#f03355_0_50%,#514b82_0_75%,#ffa516_0)] animate-[spin_2s_linear_infinite]">
      <div className="absolute inset-[15%] rounded-full bg-inherit animate-[spin_2s_linear_infinite]"></div>
      <div className="absolute inset-[25%] rounded-full bg-inherit animate-[spin_3s_linear_infinite]"></div>
    </div>
  );
};
export default Spinner;
