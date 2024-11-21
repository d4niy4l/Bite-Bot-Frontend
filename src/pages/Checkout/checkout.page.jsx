//context
import {
  useCart,
  useCartActions,
} from '../../context/cart-context/cart-context';

//icons
import {
  FaCheckCircle,
  FaMap,
  FaRegCreditCard,
  FaShoppingCart,
} from 'react-icons/fa';

//react imports
import { useState, useRef } from 'react';

//components
import LocationMarker from '../../components/Location-Marker/LocationMarker';
import Select from '../../components/Input-Select/input-select.component';
import { MapContainer, TileLayer } from 'react-leaflet';

//data
import { islamabadSectors } from '../../data/isb-sectors';

const Checkout = () => {
  const { cart: cartItems } = useCart();
  const { togglePopup, increaseQuantity, decreaseQuantity } = useCartActions();
  
  const currentCords = [33.652439,73.104726]





  const handleIncreaseQuantity = (id) => {
    increaseQuantity(id);
  };

  const handleDecreaseQuantity = (id) => {
    decreaseQuantity(id);
  };

  const inputRefs = useRef([]);

  const handleOTPChange = (e, index) => {
    const value = e.target.value;
    const match = /^[0-9]$/;

    if (/^\d$/.test(value)) {
      const newOTP = [...OTP];
      newOTP[index] = value;
      setOTP(newOTP);
      if (index < OTP.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  //cordinates for islamabad
  const isbBounds = [
    [33.752439, 73.104726], // Northeast coordinates of Islamabad
    [33.598441, 72.96007], // Southwest coordinates of Islamabad
  ];

  const steps = [
    {
      title: 'Review Your Items',
      icon: FaShoppingCart,
    },
    {
      title: 'Enter Delivery Details',
      icon: FaMap,
    },
    {
      title: 'Select Payment Method',
      icon: FaRegCreditCard,
    },
    {
      title: 'Confirm Order',
      icon: FaCheckCircle,
    },
    {
      title: 'Checkout',
      icon: FaRegCreditCard,
    },
  ];
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('Pay By Cash on Delivery');
  const [sector, setSector] = useState('');
  const [coordinates, setCoordinates] = useState(null);

  const onNextStepHandler = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };
  const onPrevStepHandler = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name == 'paymentMethod') {
      setPaymentMethod(value);
    }
  };

  const [OTP, setOTP] = useState([-1, -1, -1, -1, -1, -1]);

  return (
    <div className="font-inter max-w-[1100px] h-[600px] flex flex-col mx-auto mt-[40px] p-4 bg-[#141414] rounded-xl px-[30px] py-[20px] mb-[30px]">
      {Object.values(cartItems).length == 0 && (
        <h2 className="text-2xl text-white text-center">
          Cart is Empty...Explore our Menu
        </h2>
      )}
      {Object.values(cartItems).length > 0 && (
        <>
          <div className="hidden md:flex flex-row relative w-full justify-between ">
            {steps.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center relative flex-1 "
                >
                  <div
                    className={`p-8 rounded-full relative z-[2] w-max ${
                      index + 1 <= currentStep
                        ? 'bg-themegreen'
                        : 'bg-themegrey'
                    }`}
                  >
                    <div className="absolute z-[3] flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <IconComponent className="text-[36px] text-white" />
                    </div>
                  </div>
                  <p
                    className={`text-center mt-[10px] ${
                      index + 1 <= currentStep
                        ? 'text-themegreen'
                        : 'text-themegrey'
                    }`}
                  >
                    {item.title}
                  </p>
                  {index != steps.length - 1 && (
                    <div
                      className={`absolute z-[1] w-full border-b-[4px] ${
                        index + 1 >= currentStep
                          ? 'border-themegrey'
                          : 'border-themegreen'
                      } top-1/3 left-1/2`}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>
          <h2 className="text-2xl font-inter font-semibold text-white mt-6">
            {steps[currentStep - 1].title}
          </h2>
          <div className="flex flex-col flex-1 max-h-[400px] overflow-y-auto">
            {' '}
            {currentStep == 1 &&
              Object.values(cartItems).map((cartItem) => {
                return (
                  <div
                    key={cartItem.id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-4">
                      <div>
                        <img
                          src={cartItem.imageLink}
                          alt={cartItem.name}
                          className="w-[120px] h-[120px] object-cover rounded-lg"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-xl">
                          {cartItem.name}
                        </h3>
                        <p className="text-white">
                          ${cartItem.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleDecreaseQuantity(cartItem.id)}
                        className="text-logoColor hover:text-logoColor-dark transition-all duration-300"
                      >
                        -
                      </button>
                      <span className="text-white text-xl">
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() => handleIncreaseQuantity(cartItem.id)}
                        className="text-logoColor hover:text-logoColor-dark transition-all duration-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
              {currentStep == 2 && (
              <div className='flex flex-row gap-[15px]'>
                <div className="text-white rounded-xl shadow-lg p-6 w-full max-w-lg">
                  <MapContainer 
                  center={[51.505, -0.09]} 
                  zoom={13} 
                  style={{ height: '300px', width: '100%', borderRadius: '12px' }}
                  maxBounds={isbBounds}
                  maxBoundsViscosity={1.0}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                    <LocationMarker setCoordinates={setCoordinates} initialPosition={currentCords} />
                  </MapContainer>
                </div>
                  <div className='flex flex-col w-full pb-[20px]'>
                    <Select
                        lblText={'Select Sector'}
                        name={'sector'}
                        options={
                          islamabadSectors
                        }
                      
                        onChange={(val)=>setSector(val)}
                      />
                    <label className="text-logoColor text-[18px] mb-[5px] mt-[20px]">Full Address</label>
                    <textarea
                      type="text"
                      className="h-full p-[6px] resize-none font-inter font-medium  bg-[#333333]  text-white border-[#1d1d1d] focus:border-themegreen border-[2px] focus:outline-none rounded-xl"
                    />
                  </div>
            </div>
            )}
            {currentStep == 3 && (
              <div className="mt-6 flex gap-[30px] justify-between px-[30px] flex-row">
                <div className="mt-[20px] w-1/2">
                  <Select
                    lblText={'Payment Method'}
                    name={'paymentMethod'}
                    options={['Pay By Cash on Delivery', 'Pay by Credit Card']}
                    defaultSelected={paymentMethod}
                    onChange={(val) => {
                      setPaymentMethod(val);
                    }}
                  />
                </div>
                {paymentMethod == 'Pay by Credit Card' && (
                  <>
                    <div className="w-1/2 flex flex-col items-center justify-center mt-8 max-h-[200px]">
                      <div className="bg-[#1a1a1a] text-white rounded-xl shadow-lg p-6 max-w-lg">
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-col gap-2">
                            <label className="text-green-500 text-xl">
                              Name on Card
                            </label>
                            <input
                              type="text"
                              className="p-[6px] bg-transparent text-green-500 border-transparent focus:border-green-500 border-[2px] focus:outline-none rounded-xl"
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="text-green-500 text-xl">
                              Card Number
                            </label>
                            <div className="group flex flex-row bg-transparent text-green-500 border-transparent focus-within:border-green-500 border-[2px] focus:outline-none rounded-xl pr-3">
                              <input
                                type="text"
                                className="flex-1 p-[6px] bg-transparent text-green-500 border-transparent focus:outline-none rounded-xl"
                              />
                              <img
                                className="ml-auto"
                                src="/icons/icon-mastercard.png"
                                width={36}
                                height={36}
                                alt={'mastercardIcon'}
                              />
                            </div>
                          </div>
                          <div className="flex gap-4">
                            <div className="flex flex-col gap-2 flex-1">
                              <label className="text-green-500 text-xl">
                                Expiration Date
                              </label>
                              <input
                                type="text"
                                className="p-[6px] bg-transparent text-green-500 border-transparent focus:border-green-500 border-[2px] focus:outline-none rounded-xl"
                              />
                            </div>
                            <div className="flex flex-col gap-2 flex-1">
                              <label className="text-green-500 text-xl">
                                CVC
                              </label>
                              <input
                                type="password"
                                className="p-[6px] bg-transparent text-green-500 border-transparent focus:border-green-500 border-[2px] focus:outline-none rounded-xl"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {paymentMethod == 'Pay By Cash on Delivery' && (
                  <div className="w-1/2 flex flex-col gap-[10px] justify-center items-center">
                    <img
                      src="/delivery-robot.svg"
                      width={320}
                      alt={'deliveryRobot'}
                    />
                    <p className="text-[16px] m-auto text-inter text-gray-500">
                      Please pay the required amount on receiving the order.
                    </p>
                  </div>
                )}
              </div>
            )}
            {currentStep == 3 && (
              <div className="flex flex-row gap-[15px]">
                <div className="text-white rounded-xl shadow-lg p-6 w-full max-w-lg">
                  <MapContainer
                    center={[51.505, -0.09]}
                    zoom={13}
                    style={{ height: '300px', width: '100%' }}
                    maxBounds={isbBounds}
                    maxBoundsViscosity={1.0}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <LocationMarker setCoordinates={setCoordinates} />
                  </MapContainer>
                </div>
                <div className="flex flex-col w-full pb-[20px]">
                  <Select
                    lblText={'Select Sector'}
                    name={'sector'}
                    options={islamabadSectors}
                    onChange={(val) => setSector(val)}
                  />
                  <label className="text-logoColor text-[18px] mb-[5px] mt-[20px]">
                    Full Address
                  </label>
                  <textarea
                    type="text"
                    className="h-full p-[6px] resize-none font-inter font-medium  bg-[#333333]  text-white border-[#1d1d1d] focus:border-themegreen border-[2px] focus:outline-none rounded-xl"
                  />
                </div>
              </div>
            )}
             
            {currentStep == 4 && (
              <div className="mt-6 flex gap-3 font-inter flex-col text-white items-center w-full">
                <p className="text-lg font-semibold">
                  We have sent a confirmation email at john.doe@gmail.com
                </p>
                <p className="text-xl font-semibold mt-[20px] text-logoColor">
                  Enter the OTP to confirm your order.
                </p>
                <div className="flex flex-row justify-between max-w-sm w-full">
                  {OTP.map((digit, index) => {
                    return (
                      <div key={index} className="">
                        <input
                          type="text"
                          maxLength={1}
                          className="border-2 border-black focus:border-themegreen text-2xl text-white w-[50px] h-[80px] rounded-xl bg-black focus:outline-none text-center"
                          value={digit === -1 ? '' : digit}
                          onChange={(e) => handleOTPChange(e, index)}
                          ref={(el) => (inputRefs.current[index] = el)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {currentStep == 5 && (
              <div className="mt-6 flex gap-3 flex-col justify-center items-center">
                <h2 className="text-white text-2xl font-inter font-semibold">
                  Your order has been confirmed.
                </h2>
                <img
                  src="/confirming-robot.svg"
                  width={300}
                  height={250}
                  alt="Tickmark"
                />
              </div>
            )}
            <div className="flex gap-5 mt-[auto]">
              <button
                onClick={onPrevStepHandler}
                className="w-[100px] ml-auto border-2 border-themegreen text-xl text-themegreen font-sulphur p-2 rounded-xl hover:text-black hover:bg-themegreen"
              >
                Previous
              </button>
              <button
                onClick={onNextStepHandler}
                className="w-[100px] border-2 border-themegreen text-xl text-themegreen font-sulphur p-2 rounded-xl hover:text-black hover:bg-themegreen"
              >
                Next
              </button>{' '}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
