import orders from './../../data/orders.js';

const Orders = () => {
  return (
    <div className="max-w-[1000px] h-[600px] flex flex-col mx-auto mt-[40px] p-4 bg-[#141414] rounded-xl px-[30px] py-[20px]">
      <div className="flex flex-col text-white">
        <div className="flex justify-around text-center font-sulphur font-bold text-2xl">
          <div className="flex-1 whitespace-nowrap text-ellipsis overflow-hidden">
            OrderID
          </div>
          <div className="flex-1 whitespace-nowrap text-ellipsis overflow-hidden">
            Address
          </div>
          <div className="flex-1 whitespace-nowrap text-ellipsis overflow-hidden">
            Payment Method
          </div>
          <div className="flex-1 whitespace-nowrap text-ellipsis overflow-hidden">
            Status
          </div>
          <div className="flex-1 whitespace-nowrap text-ellipsis overflow-hidden">
            Total Price
          </div>
        </div>
        <hr className="text-logoColor mt-3 pb-3 border-logoColor" />
        {orders.map(({ orderId, address, paymentMethod, status, price }) => {
          return (
            <div
              key={orderId}
              className="flex justify-around  text-center text-xl cursor-pointer grou border-2 border-[#141414] hover:border-logoColor rounded-xl p-2"
            >
              <div className="flex-1 whitespace-nowrap text-ellipsis overflow-hidden">
                {orderId}
              </div>
              <div className="flex-1 whitespace-nowrap text-ellipsis overflow-hidden">
                {address}
              </div>
              <div className="flex-1 whitespace-nowrap text-ellipsis overflow-hidden">
                {paymentMethod}
              </div>
              <div
                className={`flex-1 whitespace-nowrap text-ellipsis overflow-hidden ${
                  status == 'Cancelled'
                    ? 'text-themered'
                    : status == 'Completed'
                    ? 'text-themegreen'
                    : 'text-themeorange'
                }`}
              >
                {status}
              </div>
              <div className="flex-1 whitespace-nowrap text-ellipsis overflow-hidden">
                {price}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
