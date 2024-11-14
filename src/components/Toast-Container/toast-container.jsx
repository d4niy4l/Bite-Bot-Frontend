import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnHover
        icon={false}
        theme="dark"
      
        transition={Slide}  /* Applied Slide transition */
        toastStyle={{
          font: 'Inter, sans-serif',
        }}
        progressStyle={{
          backgroundColor: '#00FFCC',
          height: '6px',
        }}
      />
    </>
  );
};

export default Toast;