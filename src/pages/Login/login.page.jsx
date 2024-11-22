import { nav } from 'framer-motion/client';
import {useContext, useState} from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useNavigate } from 'react-router-dom';
import { EmailVerificationContext } from '../../context/verification-context/verification-context';
import { setAccessToken } from '../../utils/cookies/cookie';
import { toast } from 'react-toastify';
import { ENDPOINTS } from '../../utils/api/endpoints';
import apiClient from '../../lib/axios.lib';

const Login = () => {
  const {emailToVerify, setEmailToVerify} = useContext(EmailVerificationContext);
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');


  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password
    }
    try{
      const response = await apiClient.post(ENDPOINTS.LOGIN, data);
      
      if(response.status === 200){
        setAccessToken(response.data.data);
        
        navigate('/');
      }
      else{
        toast.error(response.data.message);
      }
    }
    catch(error){
      console.log(error)
    }

  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
      name: firstName + ' ' + lastName,
      phone: phoneNumber
    }

    try{
      const response = await apiClient.post(ENDPOINTS.SIGN_UP, data);
     if(response.status === 200){
        setEmailToVerify(email);
        navigate('/verify-otp');
      }
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <div className='w-full flex flex-row max-h-[100dvh]'>
      <div className='w-1/2 flex flex-col justify-center items-center relative'>
        <img
          src = '/logo.webp'
          alt = 'logo'
          className='lg:max-w-[500px] md:max-w-[250] sm:max-w-[200px] max-w-[150px]'
          />
        <h2 className='text-logoColor font-sulphur font-semibold lg:text-[50px] md:text-[40px] sm:text-[30px] text-[20px] relative bottom-[40px] text-center'>Bite Bot™</h2>
        <p className='text-white font-inter text-[25px]'>Think Less, Eat More</p>
       </div>
      / <div className='w-1/2 bg-white flex flex-col justify-center items-center p-4 h-dvh'>
            {
            !isSignUp
            ?
            (
            <>
            <h2 className='text-black font-inter sm:text-[30px] text-[20px] text-center '>Login to your Account</h2>
            <form className='w-full  max-w-sm text-black'>
              <label className="block mb-2 mt-4 font-semibold" htmlFor="password">
                Email
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg placeholder:text-[#878B94] focus:outline-none focus:shadow-outline border-[#dcdcdc] border-2"
                placeholder="something@gmail.com"
              />
              <label className="block mb-2 mt-4 font-semibold" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-lg placeholder:text-[#878B94] focus:outline-none focus:shadow-outline border-[#dcdcdc] border-2"
                placeholder="***************"
              />
              <button
                onClick={handleLogin}
                className="w-full bg-logoColor hover:bg-[#0f0f0f] transition-all duration-300 text-white font-bold py-2 px-4 rounded-lg mt-4"
              >
                Login
              </button>
              <p className="text-center text-sm mt-3 text-[#878B94]">
              Don&apos;t have an account?{' '}
              <span
                className="cursor-pointer hover:text-neonBlue underline"
                onClick={() => {
                  setIsSignUp(true);
                }}
              >
                Sign Up.
              </span>
            </p>
            </form>
            </>
            )
            :
            (
            <>
            <h2 className='text-black font-inter sm:text-[30px] text-[20px] text-center '>Create a New Account</h2>
            <form  className='w-full  max-w-sm text-black'>
                <div className='flex flex-row gap-[10px]'>
                  <div>
                    <label className="block mb-2 mt-4 font-semibold" htmlFor="password">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="email"
                      className="w-full px-3 py-2 rounded-lg placeholder:text-[#878B94] focus:outline-none focus:shadow-outline border-[#dcdcdc] border-2"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 mt-4 font-semibold" htmlFor="password">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="email"
                      className="w-full px-3 py-2 rounded-lg placeholder:text-[#878B94] focus:outline-none focus:shadow-outline border-[#dcdcdc] border-2"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
               <label className="block mb-2 mt-4 font-semibold" htmlFor="password">
                Email
              </label>
              <input
                type="text"
                id="email"
                className="w-full px-3 py-2 rounded-lg placeholder:text-[#878B94] focus:outline-none focus:shadow-outline border-[#dcdcdc] border-2"
                placeholder="something@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="block mb-2 mt-4 font-semibold" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 rounded-lg placeholder:text-[#878B94] focus:outline-none focus:shadow-outline border-[#dcdcdc] border-2"
                placeholder="***************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="block mb-2 mt-4 font-semibold">
                Phone Number
              </label>
              <div className="border-[#dcdcdc] border-2 rounded-xl px-3 py-2 ">
                <PhoneInput
                  value={phoneNumber}
                  onChange={(phone) => setPhoneNumber(phone)}
                  country="pk"
                  inputClass="max-w-[230px] rounded-xl border-none"
                  buttonClass="hover:bg-[#393939] border-none"
                  containerStyle={{
                    border: 'none',
                    borderRadius: '8px',
                  }}
                  inputStyle={{
                    border: 'none',
                    borderRadius: '8px',
                    font: 'inherit',
                    fontSize: '16px',
                  }}
                  buttonStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '8px',
                  }}
                
                />
              </div>
              <button
                className="w-full bg-logoColor hover:bg-[#0f0f0f] transition-all duration-300 text-white font-bold py-2 px-4 rounded-lg mt-4"
                onClick={handleSignUp}
              >
                Sign Up
              </button>
              <p className="text-center text-sm mt-3 text-[#878B94]">
              Already have an account?{' '}
              <span
                className="cursor-pointer hover:text-neonBlue underline"
                onClick={() => {
                  setIsSignUp(false);
                }}
              >
                Login.
              </span>
            </p>
            </form>
            </>
            )
            }
       </div>
    </div>
  )
}
export default Login;