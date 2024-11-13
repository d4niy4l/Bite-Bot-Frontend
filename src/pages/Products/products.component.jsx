import React from 'react'

//these icons are very self explanatory
import { MdDinnerDining } from "react-icons/md";
import { MdOutlineBreakfastDining } from "react-icons/md";
import { MdOutlineLunchDining } from "react-icons/md";

//icon for all products
import { MdOutlineBorderAll } from "react-icons/md";

//temporary import for products
import products from '../../data/products';
import ProductCard from '../../components/Product-Card/product-card.component';

const Products = () => {

  const categories = [
    {
      text: 'All',
      image: <MdOutlineBorderAll className='text-[30px] text-red-500'  />
    },
    {
      text: 'Breakfast',
      image: <MdOutlineBreakfastDining className='text-[30px] text-blue-500' />
    },
    { 
      text: 'Lunch',
      image: <MdOutlineLunchDining className='text-[30px] text-green-500' />
    },
    {
      text: 'Dinner',
      image: <MdDinnerDining className='text-[30px] text-purple-500' />
    }
  ]

  return (
    <div className='w-full'>
          <h1 className='text-logoColor text-center text-[32px] mt-[20px]'>The Menu</h1>
          <div className='flex flex-row gap-[50px] justify-center p-[30px] items-center'>
              {
                categories.map((val, index)=>{
                  return(
                    <div key = {index} className = 'flex items-center flex-col justify-center'>
                      {val.image}
                      <p className='text-logoColor text-[20px]'>{val.text}</p>
                    </div>
                  )
                })
              }
          </div>
          <div className='grid grid-cols-3 gap-[20px] justify-items-center'>

              {
                products.map((product, index) => {
                  return(
                    <ProductCard product={product} key={index} />
                  )
                })
              }

          </div>
    </div>
  )
}

export default Products;