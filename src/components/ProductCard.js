import React from "react";
import { BiListPlus } from "react-icons/bi";

import { useLocation } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch } from 'react-redux'
import { CART_TYPE } from "../reducer/types/TYPES";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const { pathname } = useLocation();
  return (
    <div className='shadow-lg relative rounded-3xl border p-3 flex flex-col text-indigo-900'>
      {pathname.includes("cart") && (
        <button onClick={e => dispatch({ type: CART_TYPE.DELETE_ITEM_FROM_CART, payload: product })} style={{ backgroundSize: '15px' }} className='rounded-full group/close hover: hover:bg-[url("https://cdn-icons-png.flaticon.com/512/1828/1828666.png")] hover:bg-no-repeat hover:bg-center hover:bg-contain grid place-items-center absolute top-2 right-2 bg-indigo-500 text-white h-8 w-8 font-bold '>
          <p className="group-hover/close:hidden  "> {product.cartQuantity} </p>
        </button>
      )}
      <div className='h-52 w-52 mx-auto'>
        <img src={product.Image} className="w-full" alt={product.Title} />
      </div>
      <h1 className='font-bold text-center'>{product.Title}</h1>
      <p className='text-center font-semibold mb-3'>Price: {product.Price}</p>
      <div className=' flex-1'>
        <ul className='space-y-2'>
          {
            product['Key Feature'].length&& product['Key Feature']?.map((item, i) => <li key={i} className='text-sm '>
              {Object.keys(item)[0] + ": " + Object.values(item)[0]}
            </li>)
          }
        </ul>

      </div>
      <div className='flex gap-2 mt-5'>
        {!pathname.includes("cart") && (
          <button
            onClick={e => dispatch({ type: CART_TYPE.ADD_TO_CART, payload: product })}
            className='bg-indigo-500 rounded-full py-1 px-2 flex-1 text-white text-bold'
          >
            Add to cart
          </button>
        )}

        {!pathname.includes("cart") && (
          <button
            title='Add to wishlist'
            className='bg-indigo-500  py-1 px-2 rounded-full'
          >
            <BiListPlus className='text-white' />
          </button>
        )}
        {pathname.includes("cart") && (
          <button
            title='Remove'
            onClick={(e) => dispatch({ type: CART_TYPE.REMOVE_FROM_CART, payload: product })}
            className='flex justify-between px-3 bg-red-500 text-white p-1 rounded-full flex-1'
          >
            <p>Remove</p>
            <MdDeleteForever size='25' />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
