import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductByFetch, getAllProductByFetch } from "../../rtk/fetures/products/products";
import { Puff } from "react-loader-spinner";
const ProductList = () => {

  const dispatch = useDispatch()
  const {
    products,
    isLoading: productLodinig,
    delete: { isDelete, isError, isLoading }
  } = useSelector(state => state.apiProducts)

  useEffect(() => {
    dispatch(getAllProductByFetch())
  }, [isLoading])

  let content = isDelete ? <div className="flex bg-green-100 rounded-lg p-4 mb-4 text-sm text-green-700" role="alert">
    <svg className="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path filrule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
    <div>
      <span className="font-medium">Success alert! </span> Product delete successfully.
    </div>
  </div> : ''



  return (
    <div className='flex flex-col justify-center items-center h-full w-full '>
      <div className='w-full max-w-7xl mx-auto rounded-lg  bg-white shadow-lg border border-gray-200'>
        <header className='px-5 py-4 border-b border-gray-100'>
          <div className='font-semibold text-gray-800'>Products</div>
        </header> 
        <div className='overflow-x-auto p-3'>
          {isLoading || productLodinig ? <div className="w-max h-max  mx-auto my-auto">
            <Puff height="80"
              width="80"
              radius={1}
              color="#4fa94d"
              ariaLabel="puff-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div> : <table className='table-auto w-full'>
            <thead className='text-xs font-semibold uppercase text-gray-400 bg-gray-50'>
              <tr>
                <th></th>
                <th className='p-2'>
                  <div className='font-semibold text-left'>Product Name</div>
                </th>
                <th className='p-2'>
                  <div className='font-semibold text-left'>Brand</div>
                </th>
                <th className='p-2'>
                  <div className='font-semibold text-left'>In Stock</div>
                </th>
                <th className='p-2'>
                  <div className='font-semibold text-left'>Price</div>
                </th>
                <th className='p-2'>
                  <div className='font-semibold text-center'>Action</div>
                </th>
              </tr>
            </thead>
            <tbody className='text-sm divide-y divide-gray-100'>
              {products.map(({ Title, Brand, Price, stock, _id }) => (
                <tr key={_id}>
                  <td className='p-2'>
                    <input type='checkbox' className='w-5 h-5' value='id-1' />
                  </td>
                  <td className='p-2'>
                    <div className='font-medium text-gray-800'>{Title}</div>
                  </td>
                  <td className='p-2'>
                    <div className='text-left capitalize'>{Brand}</div>
                  </td>
                  <td className='p-2'>
                    <div className='text-left'>
                      {stock > 0 ? (
                        <p className='text-green-500 font-medium'>Available</p>
                      ) : (
                        <p className='text-red-500 font-medium'>Stock out</p>
                      )}
                    </div>
                  </td>
                  <td className='p-2'>
                    <div className='text-left font-medium text-indigo-500'>
                      {Price}
                    </div>
                  </td>
                  <td className='p-2'>
                    <div className='flex justify-center'>
                      <button
                        onClick={() => dispatch(deleteProductByFetch(_id))}
                      >
                        <svg
                          className='w-8 h-8 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                          ></path>
                        </svg>


                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>}
        </div>
      </div>
    </div>
    // </section>
  );
};

export default ProductList;
