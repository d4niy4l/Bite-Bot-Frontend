const Spinner =()=> {
  return(
  <motion.div
    initial={{ opacity: 0, scale: 0.2 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.2 }}
    className="flex w-full h-full justify-center items-center"
  >
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
  </motion.div>
  )
};
export default Spinner;