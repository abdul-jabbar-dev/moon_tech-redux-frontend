import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsPlusCircleDotted } from "react-icons/bs"
const AddProduct = () => {
  const { register, handleSubmit, getValues, setValue } = useForm();
  const [featureCount, setFeatureCount] = useState(1);
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
    console.log(product)
  };

  return (
    <div className='flex justify-center items-center h-full '>
      <form
        className='shadow-lg p-10 rounded-md flex flex-wrap gap-3 max-w-3xl justify-between bg-white'
        onSubmit={handleSubmit(submit)}
      >
        <div className='flex flex-col w-full max-w-xs'>
          <label className='mb-2' htmlFor='Title'>
            Title
          </label>
          <input className="bg-gray-200" type='text' id='Title' {...register("Title")} />
        </div>
        <div className='flex flex-col w-full max-w-xs'>
          <label className='mb-2' htmlFor='image'>
            Image
          </label>
          <input className="bg-gray-200" type='text' name='image' id='image' {...register("image")} />
        </div>

        <div className='flex flex-col w-full max-w-xs'>
          <label className='mb-2' htmlFor='graph'>
          Graphics
          </label>
          <input className="bg-gray-200" type='text' name='Graphics' id='graph' {...register("Graphics")} />
        </div>

        <div className='flex flex-col w-full max-w-xs'>
          <label className='mb-3' htmlFor='Brand'>
            Brand
          </label>
          <select name='Brand' id='Brand' {...register("Brand")}>
            <option value='amd'>AMD</option>
            <option value='intel'>Intel</option>
          </select>
        </div>

        <div className='flex flex-col w-full max-w-xs'>
          <label className='mb-2' htmlFor='Price'>
            Price
          </label>
          <input className="bg-gray-200" type='text' name='Price' id='Price' {...register("Price")} />
        </div>

        <div className='flex flex-col w-full max-w-xs'>
 
          <div className='flex gap-3'>
            <div>
              <label className='mb-2 flex  justify-between items-center ' htmlFor='quantity'>
              Quantity
              </label>
              <input
                type='text'
                className="bg-gray-200 w-full pl-2 "
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
                className="bg-gray-200 w-[40%] pl-2 "
                name={'singleFeaturKey' + counter}
                placeholder={"Key" + counter}
                id={'singleFeaturKey' + counter}
                {...register("singleFeaturKey" + counter)}
              /> <input
                type='text'
                className="bg-gray-200 w-[60%] pl-2 "
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
    </div>
  );
};

export default AddProduct;
