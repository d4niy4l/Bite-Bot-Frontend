import orders from '../../../data/orders';
import { newProducts } from '../../../data/products-new';
import { useState } from 'react';

import DeliveryItem from '../../../components/Delivery-Item/delivery-item.component';

import { AnimatePresence, motion } from 'framer-motion';
// import { DeliveryProvider } from '../../../context/delivery/delivery.context';

const DeliverOrderPage = ({ isModalOpen, closeModal }) => {
  return (
    <AnimatePresence>
      {isModalOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="fixed inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl mb-4">Are you sure?</h2>
              <div className="flex justify-end space-x-4">
                <button onClick={closeModal} className="btn bg-black">
                  Cancel
                </button>
                <button
                  onClick={() => {
                    /* handle confirmation */
                  }}
                  className="btn btn-primary"
                >
                  Yes
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const DeliverOrder = () => {
  const [queuedOrders, setQueuedOrders] = useState(orders);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    // <DeliveryProvider>
    <div className="h-dvh w-dvw flex flex-col justify-center items-center">
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
                    />
                  );
                })}
            </div>
          </div>
        </div>
        <DeliverOrderPage isModalOpen={isModalOpen} closeModal={closeModal} />
      </div>
    </div>
    // </DeliveryProvider>
  );
};

export default DeliverOrder;
