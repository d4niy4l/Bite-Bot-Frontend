import { motion } from "framer-motion";
import './spinner.styles.css';

const Spinner =()=> {
  return(
  <motion.div
    initial={{ opacity: 0, scale: 0.2 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.2 }}
    className="spinner"
  >
  </motion.div>
  )
};
export default Spinner;