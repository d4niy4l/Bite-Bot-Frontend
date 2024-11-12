import React from 'react'

const Navbar = ({state}) => {
  return (
    <div className='flex justify-between items-center px-[40px] py-[30px] bg-black'>
      <div>
        <img
          src='/navbar-logo.webp'
          alt='logo'
          width={200}
          height={100}
        />
      </div>
      <div>
        <ul className='flex space-x-6 border-2 px-[30px] py-[20px] rounded-2xl border-logoColor'>
          <li>
            <a href='#' className='text-white font-semibold text-[20px]'>Home</a>
          </li>
          <li>
            <a href='#' className='text-white font-semibold text-[20px]'>Ask Bite</a>
          </li>
          <li>
            <a href='#' className='text-white font-semibold text-[20px]'>Track Order</a>
          </li>
          <li>
            <a href='#' className='text-white font-semibold text-[20px]'>Past Orders</a>
          </li>
        </ul>
      </div>
      <div>
        {
          state !== 'signed_in' ?
          <button className='bg-logoColor text-black text-[18px] font-semibold px-4 py-2 rounded-lg hover:bg-white transition-all duration-300'>Login</button> 
          :
          <button className='bg-logoColor text-black text-[18px] font-semibold px-4 py-2 rounded-lg hover:bg-white transition-all duration-300 '>Logout</button>
        }
      </div>
    </div>
  )
}

export default Navbar;