import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

//icon for received order
import { HiOutlineClipboardDocumentCheck } from 'react-icons/hi2';

//icon for preparing order
import { VscServerProcess } from 'react-icons/vsc';

//icon for in transit
import { MdOutlineDeliveryDining } from 'react-icons/md';

//icon for delivered order
import { TiHomeOutline } from 'react-icons/ti';
import Select from '../../../components/Input-Select/input-select.component';
import apiClient from '../../../lib/axios.lib';
import LoadingScreen from '../../../components/Loading-Screen/loading-screen.component';

const ORDER_STATES = {
  PROCESSING: 'PROCESSING',
  PREPARING: 'PREPARING',
  DISPATCHED: 'COMPLETED',
  DELIVERED: 'DELIVERED',
};

const ORDER_STATE_VALUES = {
  PROCESSING: 1,
  PREPARING: 2,
  DISPATCHED: 3,
  DELIVERED: 4,
};

const TrackOrder = () => {
  const [selectedOrder, setSelectedOrder] = useState(null); // 1: Received, 2: Preparing, 3: In Transit, 4: Delivered
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const getProgressClass = (state) => {
    if (state <= ORDER_STATE_VALUES[selectedOrder.order_status]) {
      return 'bg-green-500';
    }
    return 'bg-gray-300';
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await apiClient.get('/orders/track');
      if (response.status === 200) {
        setOrders(response.data.data);
        console.log(response.data.data);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };
    fetchOrders();
  }, []);

  const calculateProgress = (orderState) => {
    if (orderState === ORDER_STATES.PROCESSING) {
      return (1 / 8) * 100;
    }
    if (orderState === ORDER_STATES.DELIVERED) {
      return (4 / 4) * 100;
    } else {
      return (ORDER_STATE_VALUES[selectedOrder.order_status] / 5) * 100;
    }
  };

  const getSelectOptions = () => {
    return orders ? orders.map((order) => order.order_id) : ['No Orders'];
  };

  const onSelectedOrderChange = (val) => {
    const selectedOrder = orders.find((order) => order.order_id === val);
    setSelectedOrder(selectedOrder);
  };

  if (loading) {
    <LoadingScreen />;
  }
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-[1000px] mx-auto mt-[40px] p-4 bg-[#141414] rounded-xl px-[30px] py-[20px]"
    >
      <h1 className="text-[32px] text-logoColor font-bold font-sulphur mb-4">
        Track Your Order
      </h1>

      <Select
        lblText={'Select Order '}
        options={getSelectOptions()}
        onChange={onSelectedOrderChange}
      />
      {selectedOrder && (
        <>
          <div className="relative flex items-center justify-between mb-4 mt-[20px]">
            <div className="absolute top-1/2 transform -translate-y-5 w-full h-2 bg-gray-300 rounded-lg">
              <div
                className={`h-2 ${getProgressClass(
                  1
                )} rounded-tl-xl rounded-bl-xl rounded-tr-xl rounded-br-xl  `}
                style={{
                  width: `${calculateProgress(selectedOrder.order_status)}%`,
                }}
              ></div>
            </div>
            <div className="relative z-10 flex-1 flex flex-col items-center">
              <div
                className={`w-[70px] h-[70px] flex items-center justify-center rounded-full ${getProgressClass(
                  1
                )}`}
              >
                <span className="text-white">
                  <HiOutlineClipboardDocumentCheck className="text-[36px]" />
                </span>
              </div>
              <p className="text-center mt-2 font-inter text-white">Received</p>
            </div>
            <div className="relative z-10 flex-1 flex flex-col items-center">
              <div
                className={`w-[70px] h-[70px] flex items-center justify-center rounded-full ${getProgressClass(
                  2
                )}`}
              >
                <span className="text-white">
                  <VscServerProcess className="text-[36px]" />
                </span>
              </div>
              <p className="text-center mt-2 font-inter text-white">
                Preparing
              </p>
            </div>
            <div className="relative z-10 flex-1  flex flex-col items-center">
              <div
                className={`w-[70px] h-[70px] flex items-center justify-center rounded-full ${getProgressClass(
                  3
                )}`}
              >
                <span className="text-white">
                  <MdOutlineDeliveryDining className="text-[36px]" />
                </span>
              </div>
              <p className="text-center mt-2 font-inter text-white">
                In Transit
              </p>
            </div>
            <div className="relative z-10 flex-1 flex flex-col items-center">
              <div
                className={`w-[70px] h-[70px] flex items-center justify-center rounded-full ${getProgressClass(
                  4
                )}`}
              >
                <span className="text-white">
                  <TiHomeOutline className="text-[36px]" />
                </span>
              </div>
              <p className="text-center font-inter mt-2 text-white">
                Delivered
              </p>
            </div>
          </div>

          <div className="mt-2">
            <h2 className="text-[24px] text-logoColor font-bold font-sulphur mb-4">
              Order Information
            </h2>
            <p className="text-white font-inter mb-2">
              Order ID:{selectedOrder.order_id}
            </p>
            <p className="text-white font-inter mb-2">
              Delivery Address: {selectedOrder.delivery_address}
            </p>
            <p className="text-white font-inter mb-2">
              Total Price: {selectedOrder.total_price}$
            </p>
            <h3 className="text-[20px] text-logoColor font-bold font-sulphur mt-4 mb-2">
              Items:
            </h3>

            <ul className="text-white font-inter mb-4 max-h-[200px] overflow-y-auto">
              {selectedOrder.order_items.map((item, index) => (
                <li key={index} className="flex items-center">
                  <img
                    src={item.imageURL}
                    alt={item.productName}
                    className="w-16 h-16 object-cover rounded-lg mr-4"
                  />
                  <span>
                    {item.quantity} x {item.productName}
                  </span>
                </li>
              ))}
            </ul>

            <p className="font-inter text-[20px] text-logoColor mb-[20px]">
              Estimated Delivery Time: {selectedOrder.estimated_time}
            </p>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default TrackOrder;
