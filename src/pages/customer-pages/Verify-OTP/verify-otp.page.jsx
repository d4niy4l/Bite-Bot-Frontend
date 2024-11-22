import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';

import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { EmailVerificationContext } from '../../../context/verification-context/verification-context';
import apiClient from '../../../lib/axios.lib';
import { ENDPOINTS } from '../../../utils/api/endpoints';


const VerifyOTP = () => {
  const navigate = useNavigate();
  const { emailToVerify } = useContext(EmailVerificationContext);
  const [OTP, setOTP] = useState([-1, -1, -1, -1, -1, -1]);

  useEffect(() => {
    if (!emailToVerify) {
      navigate('/login');
    }
  }, []);

  const goBackHandler = () => {
    navigate('/login');
  };

  const confirmHandler = async (e) => {
    e.preventDefault();
    if (OTP.includes(-1)) {
      toast.error('Please enter a complete OTP.');
      return;
    }

    const otp = OTP.join('');
    const response = await apiClient.post(`${ENDPOINTS.VERIFY_OTP}`,{
      email: emailToVerify,
      otp: otp,
    });
    if(response.status === 200){
      navigate('/login');
    }

  };

  const sendAgainHandler = async (e) => {
    e.preventDefault();

    const res = await apiClient.post({
      email: emailToVerify,
    });
    toast.success('Verification email sent successfully');
  };

  const handlePaste = (e, index) => {
    const pasteData = (e.clipboardData || window.clipboardData).getData('text');
    const nums = pasteData.match(/\d/g);
    const newArr = nums.slice(0, 6);
    while (newArr.length < 6) {
      newArr.push(-1);
    }
    setOTP([...newArr]);
    e.preventDefault();
  };
  const handleOTPChange = (e, idx) => {
    const target = e.target;
    const val = e.target.value;

    if (val == '') {
      const prevSibling = target.previousSibling;
      if (prevSibling) {
        prevSibling.focus();
      }
      const newArr = [...OTP];
      newArr[idx] = -1;
      setOTP(newArr);
    } else {
      const matches = val.match('\\d+');
      if (matches == null) {
        return;
      }
      const value = matches[0];

      const nextSibling = target.nextElementSibling;
      if (nextSibling) {
        nextSibling.focus();
      }

      const newArr = [...OTP];
      newArr[idx] = value;
      setOTP(newArr);
    }
  };

  const handleKeyDown = (e, index) => {
    const { key } = e;

    if (key === 'ArrowRight') {
      const nextSibling = e.target.nextElementSibling;
      if (OTP[index] != -1 && nextSibling) nextSibling.focus();
    } else if (key === 'ArrowLeft') {
      const prevSibling = e.target.previousSibling;
      if (prevSibling) {
        setTimeout(() => {
          prevSibling.focus();
          prevSibling.setSelectionRange(
            prevSibling.value.length,
            prevSibling.value.length
          );
        }, 0);
      }
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="flex flex-col  max-w-[470px] mx-auto">
        <div className="w-full flex flex-row justify-center items-center">
          <img
            src={'/logo.webp'}
            width={195.95}
            height={48}
            alt="Bitebot Logo"
          />
        </div>
        <div className="lg:mt-32 font-inter text-[24px] text-white">
          Enter Verification Code
        </div>

        <div className="mt-12 flex flex-row gap-2 sm:gap-5">
          {OTP.map((item, idx) => {
            return (
              <input
                key={idx}
                onChange={(e) => {
                  handleOTPChange(e, idx);
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                min={0}
                max={9}
                onPaste={handlePaste}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                value={item === -1 ? '' : item}
                className="bg-[#232323] py-1 max-w-[45px]  sm:py-3 sm:max-w-[60px] text-center text-white text-4xl focus:outline-none rounded-xl"
              />
            );
          })}
        </div>

        <div className="mt-12  text-logoColor text-base font-inter ">
          Haven&#39;t received a code yet?{' '}
          <span
            onClick={sendAgainHandler}
            className="hover:opacity-80 cursor-pointer  border-b-[1px] border-logoColor"
          >
            Send Again
          </span>
          .
        </div>
        <div className="mt-11">
          <button
            onClick={confirmHandler}
            className="w-full py-[10px] px-8 bg-[#D9D9D9] relative inline-block rounded-[12px] font-inter text-base text-[#0F0F0F]  hover:opacity-85 "
          >
            Confirm Verification
          </button>
        </div>
        <div className="mt-4">
          <button
            onClick={goBackHandler}
            className="w-full py-[10px] px-8 bg-[#232323] relative inline-block rounded-[12px] font-inter text-base text-white  hover:opacity-85"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;