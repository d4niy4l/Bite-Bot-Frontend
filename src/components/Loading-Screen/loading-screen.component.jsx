import { motion } from 'framer-motion';
const LoadingScreen = () => {
  return (
    <div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.1 }}
    className="fixed inset-0 flex h-screen items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="relative w-[100px] aspect-square grid rounded-full bg-[conic-gradient(#25b09b_25%,#f03355_0_50%,#514b82_0_75%,#ffa516_0)] animate-[spin_2s_linear_infinite]">
        <div className="absolute inset-[15%] rounded-full bg-inherit animate-[spin_2s_linear_infinite]"></div>
        <div className="absolute inset-[25%] rounded-full bg-inherit animate-[spin_3s_linear_infinite]"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;