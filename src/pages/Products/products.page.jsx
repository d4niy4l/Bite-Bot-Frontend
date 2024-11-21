import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

//these icons are very self explanatory
import { MdDinnerDining } from 'react-icons/md';
import { MdOutlineBreakfastDining } from 'react-icons/md';
import { MdOutlineLunchDining } from 'react-icons/md';

//icon for all products
import { MdOutlineBorderAll } from 'react-icons/md';

//temporary import for products
import ProductCard from '../../components/Product-Card/product-card.component';
import { ENDPOINTS } from '../../utils/api/endpoints';
import apiClient from '../../lib/axios.lib';
import Spinner from '../../components/Spinner/spinner.component';

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await apiClient.get(ENDPOINTS.FETCH_ALL_PRODUCTS);
      setProducts(response);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const categories = [
    {
      text: 'All',
      image: <MdOutlineBorderAll className="text-[30px] text-white" />,
    },
    {
      text: 'Breakfast',
      image: <MdOutlineBreakfastDining className="text-[30px] text-white" />,
    },
    {
      text: 'Lunch',
      image: <MdOutlineLunchDining className="text-[30px] text-white" />,
    },
    {
      text: 'Dinner',
      image: <MdDinnerDining className="text-[30px] text-white" />,
    },
  ];

  return (
    <div className="w-full px-[20px]">
      <div
        className="font-inter relative w-full h-[600px] bg-cover bg-top rounded-xl"
        style={{ backgroundImage: "url('/happy-robot.svg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <h1 className="text-white text-[48px] font-bold font-sulphur">
            Welcome to Bite Bot
          </h1>
          <p className="text-white text-[24px] mt-[10px]">
            Cant Decide? Let Bite Bot Decide for You!
          </p>
          <button
            onClick={() => navigate('/chat')}
            className="bg-logoColor hover:bg-white transition-all duration-300 text-[20px] font-semibold font-sulphur rounded-xl px-[10px] py-[5px] mt-[10px]"
          >
            Try it Out Now
          </button>
        </div>
      </div>
      <h1 className="text-logoColor text-center text-[32px] mt-[20px] font-sulphur">
        The Menu
      </h1>
      <div className="flex flex-row gap-[50px] justify-center mt-[20px]  items-center mb-[40px]">
        {categories.map((val, index) => {
          return (
            <div
              key={index}
              className="group hover:bg-logoColor transition-all cursor-pointer duration-300 flex border-2 border-logoColor rounded-xl px-[7.5px] py-[3px] items-center flex-row justify-center gap-[5px]"
            >
              {val.image}
              <p className={`font-mono text-white font-semibold text-[20px]`}>
                {val.text}
              </p>
            </div>
          );
        })}
      </div>
      {loading && (
        <div className="flex flex-col justify-center items-center py-20">
          <Spinner />
        </div>
      )}
      <div className="flex px-[20px]">
        <div className="w-full grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[20px] justify-items-center justify-center">
          {products.map((product, index) => {
            return <ProductCard product={product} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Products;
