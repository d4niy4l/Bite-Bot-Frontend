import React, { useState } from 'react';

//icon for received order
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";

//icon for preparing order
import { VscServerProcess } from "react-icons/vsc";

//icon for in transit 
import { MdOutlineDeliveryDining } from "react-icons/md";

//icon for delivered order
import { TiHomeOutline } from "react-icons/ti";
import Select from '../../components/Input-Select/input-select.component';

const TrackOrder = () => {
  const [orderState, setOrderState] = useState(1); // 1: Received, 2: Preparing, 3: In Transit, 4: Delivered

  const getProgressClass = (state) => {
    if (state <= orderState) {
      return 'bg-green-500';
    }
    return 'bg-gray-300';
  };

  const orderInfo = {
    orderId: '123456',
    customerName: 'John Doe',
    deliveryAddress: '123 Main St, Springfield, USA',
    items: [
      { name: 'Classic Margherita Pizza', quantity: 1, image: 'https://raw.githubusercontent.com/rohhan36/food-app-assests/main/assets/desert1.png' },
      { name: 'Vegan Burger', quantity: 2, image: 'https://raw.githubusercontent.com/rohhan36/food-app-assests/main/assets/desert1.png' },
    ],
    estimatedDeliveryTime: '30 minutes'
  };

  const calculateProgress = (orderState) => {
    if(orderState === 1){
      return orderState / 8 * 100
    }
    if(orderState < 4){
      return orderState / 5 * 100
    }
    if(orderState === 4){
      return orderState / 4 * 100
    }
  }

  return (
    <div className="max-w-[1000px] mx-auto mt-[40px] p-4 bg-[#141414] rounded-xl px-[30px] py-[20px]">
      <h1 className="text-[32px] text-logoColor font-bold font-sulphur mb-4">Track Your Order</h1>
      
      <Select 
        lblText={'Select Order '}
      />
      <div className="relative flex items-center justify-between mb-4 mt-[20px]">
        <div className="absolute top-1/2 transform -translate-y-5 w-full h-2 bg-gray-300 rounded-lg">
          <div className={`h-2 ${getProgressClass(1)} rounded-tl-xl rounded-bl-xl rounded-tr-xl rounded-br-xl  `} style={{ width: `${calculateProgress(orderState)}%` }}></div>
        </div>
        <div className="relative z-10 flex-1 flex flex-col items-center">
          <div className={`w-[70px] h-[70px] flex items-center justify-center rounded-full ${getProgressClass(1)}`}>
            <span className="text-white">
              <HiOutlineClipboardDocumentCheck className='text-[36px]' />
            </span>
          </div>
          <p className="text-center mt-2 font-inter text-white">Received</p>
        </div>
        <div className="relative z-10 flex-1 flex flex-col items-center">
          <div className={`w-[70px] h-[70px] flex items-center justify-center rounded-full ${getProgressClass(2)}`}>
            <span className="text-white">
              <VscServerProcess className='text-[36px]' />
            </span>
          </div>
          <p className="text-center mt-2 font-inter text-white">Preparing</p>
        </div>
        <div className="relative z-10 flex-1  flex flex-col items-center">
          <div className={`w-[70px] h-[70px] flex items-center justify-center rounded-full ${getProgressClass(3)}`}>
            <span className="text-white">
              <MdOutlineDeliveryDining className='text-[36px]' />
            </span>
          </div>
          <p className="text-center mt-2 font-inter text-white">In Transit</p>
        </div>
        <div className="relative z-10 flex-1 flex flex-col items-center">
          <div className={`w-[70px] h-[70px] flex items-center justify-center rounded-full ${getProgressClass(4)}`}>
            <span className="text-white">
              <TiHomeOutline className='text-[36px]' />
            </span>
          </div>
          <p className="text-center font-inter mt-2 text-white">Delivered</p>
        </div>
      </div>
      
      <div className="mt-2">
        <h2 className="text-[24px] text-logoColor font-bold font-sulphur mb-4">Order Information</h2>
        <p className="text-white font-inter mb-2"><strong>Order ID:</strong> {orderInfo.orderId}</p>
        <p className="text-white font-inter mb-2"><strong>Customer Name:</strong> {orderInfo.customerName}</p>
        <p className="text-white font-inter mb-2"><strong>Delivery Address:</strong> {orderInfo.deliveryAddress}</p>
        <h3 className="text-[20px] text-logoColor font-bold font-sulphur mt-4 mb-2">Items:</h3>
        <ul className="text-white font-inter mb-4 max-h-[200px] overflow-y-auto">
          {orderInfo.items.map((item, index) => (
            <li key={index} className="flex items-center">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg mr-4" />
              <span>{item.quantity} x {item.name}</span>
            </li>
          ))}
        </ul>
        <p className='font-inter text-[20px] text-logoColor mb-[20px]'>
          Estimated Delivery Time: {orderInfo.estimatedDeliveryTime}
        </p>
      </div>
    </div>
  );
};

export default TrackOrder;