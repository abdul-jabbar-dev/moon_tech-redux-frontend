import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsPlusCircleDotted } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux";
import { postProductByFetch } from "../../rtk/fetures/products/products";
const AddProduct = () => {
  const dispatch = useDispatch()
  const { register, handleSubmit, getValues, setValue } = useForm();
  const [featureCount, setFeatureCount] = useState(1);

  const {  isLoading, postedId } = useSelector(state => state.apiProducts.post)

  const submit = (data) => {
    const FeatureValue = Object.entries(getValues()).filter(([key, value]) => key.startsWith('singleFeaturV'));
    const FeatureKeys = Object.entries(getValues()).filter(([key, value]) => key.startsWith('singleFeaturK'));
    const newObj = {};
    FeatureKeys.forEach(([it, vt]) => newObj[vt] = FeatureValue.find(([k, v]) => k.endsWith(it.charAt(it.length - 1)))[1])

    const product = {
      ...getValues(),
      'Key Feature': newObj
    };
    Object.keys(getValues()).filter(k => k.startsWith('singleFeatur') && delete product[k])
    dispatch(postProductByFetch(product))
  };
  let content = postedId && <div className="flex bg-green-100 rounded-lg p-4 mb-4 text-sm text-green-700" role="alert">
    <svg className="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path filrule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
    <div>
      <span className="font-medium">Success alert! </span> Product successfully added. <br /> Product id: <small>{postedId}</small>
    </div>
  </div>
 
  return (
    <div className='flex justify-center items-center h-full '>
      {
        isLoading ? <h1>Sending...</h1> : <form
          className='shadow-lg p-10 rounded-md flex flex-wrap gap-3 max-w-3xl justify-between bg-white'
          onSubmit={handleSubmit(submit)}
        >
          {content}
          <div className='flex flex-col w-full max-w-xs'>
            <label className='mb-2' htmlFor='Title'>
              Title
            </label>
            <input className="border-gray-200 border" type='text' id='Title' {...register("Title")} />
          </div>
          <div className='flex flex-col w-full max-w-xs'>
            <label className='mb-2' htmlFor='image'>
              Image
            </label>
            <input className="border-gray-200 border" type='text' name='image' id='image' {...register("image")} />
          </div>

          <div className='flex flex-col w-full max-w-xs'>
            <label className='mb-2' htmlFor='graph'>
              Graphics
            </label>
            <input className="border-gray-200 border" type='text' name='Graphics' id='graph' {...register("Graphics")} />
          </div>

          <div className='flex flex-col w-full max-w-xs'>
            <label className='mb-3' htmlFor='Brand'>
              Brand
            </label>
            <input id='Brand' className="border-gray-200 border" name='Brand' type="text"  {...register("Brand")} />
          </div>

          <div className='flex flex-col w-full max-w-xs'>
            <label className='mb-2' htmlFor='Price'>
              Price
            </label>
            <input className="border-gray-200 border" type='text' name='Price' id='Price' {...register("Price")} />
          </div>

          <div className='flex flex-col w-full max-w-xs'>

            <div className='flex gap-3'>
              <div>
                <label className='mb-2 flex  justify-between items-center ' htmlFor='quantity'>
                  Quantity
                </label>
                <input
                  type='text'
                  className="border-gray-200 border w-full pl-2 "
                  id='quantity'
                  {...register("stock")}
                />
              </div>

            </div>
          </div>
          <div className='flex flex-col w-full max-w-xs'></div>

          <div className='flex flex-col w-full max-w-xs'>

            <label className='mb-2 flex  justify-between items-center ' >
              Key Feature <BsPlusCircleDotted onClick={() => setFeatureCount(prev => prev += 1)} className="scale-150 cursor-pointer hover:bg-indigo-300 hover:rounded-full duration-200 transition-all" />
            </label>
            {
              [...Array(featureCount)].map((counters, counter) => <div key={counter} className="flex gap-3 my-1">
                <input
                  type='text'
                  className="border-gray-200 border w-[40%] pl-2 "
                  name={'singleFeaturKey' + counter}
                  placeholder={"Key" + counter}
                  id={'singleFeaturKey' + counter}
                  {...register("singleFeaturKey" + counter)}
                /> <input
                  type='text'
                  className="border-gray-200 border w-[60%] pl-2 "
                  name={'singleFeaturValue' + counter}
                  placeholder={"Value" + counter}
                  id={'singleFeaturValue' + counter}
                  {...register("singleFeaturValue" + counter)}
                />
              </div>)
            }
          </div>

          <div className='flex justify-between items-center w-full'>
            <button
              className=' px-4 py-3 bg-indigo-500 rounded-md font-semibold text-white text-lg disabled:bg-gray-500'
              type='submit'
            >
              Submit
            </button>
          </div>
        </form>
      }
    </div>
  );
};

export default AddProduct;
