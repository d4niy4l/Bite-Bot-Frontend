import orders from '../../../data/orders';
import { newProducts } from '../../../data/products-new';
import { useEffect, useState } from 'react';

import DeliveryItem from '../../../components/Delivery-Item/delivery-item.component';

import { AnimatePresence, motion } from 'framer-motion';
import apiClient from '../../../lib/axios.lib';
import { ENDPOINTS } from '../../../utils/api/endpoints';
import { toast } from 'react-toastify';
// import { DeliveryProvider } from '../../../context/delivery/delivery.context';
import Spinner from '../../../components/Spinner/spinner.component';
import DeliveryForm from '../../../components/Delivery-Form/delivery-form';

import { RxCross1 } from 'react-icons/rx';
import { FaPowerOff } from 'react-icons/fa';
import {
  getAccessToken,
  removeAccessToken,
} from '../../../utils/cookies/cookie';

const DeliverOrder = () => {
  const [queuedOrders, setQueuedOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [reason, setReason] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const response = await apiClient.post(ENDPOINTS.GET_DELIVERED_ORDERS);
      const orders = response.data.data;

      setQueuedOrders(orders == undefined ? [] : response.data.data);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const onMarkHandler = async (orderId) => {
    setLoading(true);
    const response = await apiClient.post(ENDPOINTS.MARK_DELIVERED, {
      orderId: orderId,
    });
    if (response.status === 200 && response.data.data == 'ORDER_DELIVERED') {
      setLoading(false);
      setQueuedOrders(
        queuedOrders.filter((order) => order.orderId !== orderId)
      );
      toast('Order marked as delivered');
    } else {
      setLoading(false);
      toast("Couldn't mark order as delivered");
    }
  };
  const handleOrderError = async () => {
    setLoading(true);
    const response = await apiClient.post(ENDPOINTS.DELIVER_FAILED, {
      orderId: selectedOrder.orderId,
      reason: reason,
    });
    if (response.status === 200 && response.data.data == 'ORDER_UPDATED') {
      setLoading(false);
      setQueuedOrders(
        queuedOrders.filter((order) => order.orderId !== selectedOrder.orderId)
      );
      setReason('');
      setSelectedOrder(null);
      toast('Order is being prepared again');
    } else {
      setLoading(false);
      toast("Couldn't mark order ");
    }
  };
  const handleLogout = () => {
    removeAccessToken();
    navigate('/login');
  };
  return (
    // <DeliveryProvider>
    <div className="h-dvh w-dvw flex flex-col justify-center items-center relative">
      <div className="fixed flex flex-row max-w-[1800px] w-full mx-auto mt-10">
        <div className="ml-auto text-logoColor" onClick={handleLogout}>
          <FaPowerOff className="text-4xl hover:text-themered cursor-pointer" />
        </div>
      </div>
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center z-10"></div>
      )}
      {loading && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[11]">
          <Spinner />
        </div>
      )}

      <div className="relative text-white w-full font-inter max-w-[1400px] flex flex-col mx-auto mt-[40px] p-4 bg-[#141414] rounded-xl px-[30px] py-[20px] mb-[30px]">
        <div className="flex flex-row justify-between gap-4">
          <div className="flex flex-col pb-3  border-[4px] flex-1 rounded-xl border-logoColor gap-4 px-2">
            <h1 className="font-sulphur text-4xl text-logoColor mt-10 ml-4">
              Deliver Orders
            </h1>

            <div className="flex flex-col gap-4 h-[600px] overflow-auto scrollbar-thin">
              {queuedOrders.length > 0 &&
                queuedOrders.map((orderItem) => {
                  return (
                    <DeliveryItem
                      key={orderItem.orderId}
                      orderItem={orderItem}
                      onMarkHandler={(e) => {
                        onMarkHandler(orderItem.orderId);
                      }}
                      onDeliverOrder={(e) => {
                        setSelectedOrder(orderItem);
                      }}
                    />
                  );
                })}
            </div>
          </div>
        </div>

        {selectedOrder && (
          <>
            <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center z-5"></div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 justify-center items-center bg-[#333333]  w-full max-w-[700px] mx-auto rounded-xl p-3 z-[6]">
              <div className="flex flex-col gap-2 w-full">
                <div className=" flex flex-row justify-between">
                  <label className="text-green-500 text-xl">Enter Reason</label>
                  <RxCross1
                    className="text-xl hover:text-logoColor cursor-pointer"
                    onClick={() => {
                      setReason('');
                      setSelectedOrder(null);
                    }}
                  />
                </div>
                <input
                  type="text"
                  className="p-[6px] bg-transparent text-green-500 border-[white] focus:border-green-500 border-[2px] focus:outline-none rounded-xl"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
              <button
                onClick={handleOrderError}
                className={` w-full ml-auto border-2 border-themegreen text-xl text-themegreen font-sulphur p-2 rounded-xl hover:text-black hover:bg-themegreen`}
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
    // </DeliveryProvider>
  );
};

export default DeliverOrder;
