import orders from '../../../data/orders';
import { newProducts } from '../../../data/products-new';
import { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import OrderItem from '../../../components/Order-Item/order-item.component';
const PrepareOrder = () => {
  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-yellow-500',
    'bg-pink-500',
  ];

  const [queuedOrders, setQueuedOrders] = useState(orders);
  const [preparingOrders, setPreparingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);

  return (
    <div className="h-dvh w-dvw flex flex-col justify-center items-center">
      <div className="relative text-white w-full font-inter max-w-[1400px] flex flex-col mx-auto mt-[40px] p-4 bg-[#141414] rounded-xl px-[30px] py-[20px] mb-[30px]">
        <div className="flex flex-row justify-between gap-4">
          <div className="flex flex-col pb-3  border-[4px] flex-1 rounded-xl border-logoColor gap-4 px-2">
            <h1 className="font-sulphur text-4xl text-logoColor mt-10 ml-4">
              Queue
            </h1>
            <div className="flex flex-col gap-4 h-[600px] overflow-auto scrollbar-thin">
              {queuedOrders.length > 0 &&
                queuedOrders.map((orderItem) => {
                  return (
                    <OrderItem key={orderItem.orderId} orderItem={orderItem} />
                  );
                })}
            </div>
          </div>
          <div
            className="flex flex-col pb-3  border-[4px] flex-1 rounded-xl border-logoColor gap-4 px-2"
            onDrop={(e) => {
              e.preventDefault();
              const id = e.dataTransfer.getData('text/plain');
              const orderItem = queuedOrders.find(
                (item) => item.orderId === id
              );
              if (orderItem) {
                setPreparingOrders((prev) => [...prev, orderItem]);
                setQueuedOrders((prev) =>
                  prev.filter((item) => item.orderId !== id)
                );
              }
            }}
            onDragOver={(e) => e.preventDefault()}
          >
            <h1 className="font-sulphur text-4xl text-logoColor mt-10 ml-4">
              Preparing
            </h1>
            <div className="flex flex-col gap-4 h-[600px] overflow-auto scrollbar-thin">
              {preparingOrders.map((order) => {
                return <OrderItem key={order.orderId} orderItem={order} />;
              })}
            </div>
          </div>
          <div
            className="flex flex-col pb-3  border-[4px] flex-1 rounded-xl border-logoColor gap-4 px-2"
            onDrop={(e) => {
              e.preventDefault();
              const id = e.dataTransfer.getData('text/plain');
              const orderItem = preparingOrders.find(
                (item) => item.orderId === id
              );
              if (orderItem) {
                setCompletedOrders((prev) => [...prev, orderItem]);
                setPreparingOrders((prev) =>
                  prev.filter((item) => item.orderId !== id)
                );
              }
            }}
            onDragOver={(e) => e.preventDefault()}
          >
            <h1 className="font-sulphur text-4xl text-logoColor mt-10 ml-4">
              Completed
            </h1>
            <div className="flex flex-col gap-4 h-[600px] overflow-auto scrollbar-thin scrollbar-thumb-logoColor scrollbar-thumb-">
              {completedOrders.map((orderItem) => {
                return (
                  <OrderItem key={orderItem.orderId} orderItem={orderItem} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrepareOrder;
