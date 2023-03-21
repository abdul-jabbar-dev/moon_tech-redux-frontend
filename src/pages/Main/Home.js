import React, { useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import Loader from "../../utils/Loader";
import { useDispatch, useSelector } from "react-redux";
import { TOGGOLESTOCK, SETBRANDS } from "../../rtk/fetures/filter/filterslice";
import { getAllProductByFetch } from "../../rtk/fetures/products/products";

const Home = () => {
  const activeClass = "text-white  bg-indigo-500 border-white";
  const outOfStockClass = "text-purple-600  bg-purple-100  border-purple-300";
  const dispatch = useDispatch()
  const { products,isLoading} = useSelector(state => state.apiProducts)
  const { stock, brands } = useSelector(state => state.filters)
  
  useEffect(() => {
    dispatch(getAllProductByFetch())
  }, [])

  let filteredProducts = isLoading&&<Loader></Loader>;

  if (products.length) {
    filteredProducts = products.map((product) => (
      <ProductCard key={product._id} product={product} />
    ))
  }



  if (products.length && (stock || brands.length)) {
    filteredProducts = products
      .filter(item => {
        if (brands.length) {
          return brands.includes((item.Brand).toLowerCase())
        }
        return item
      })
      .filter(item => {
        if (stock) {
          return item.stock !== 0
        }
        return item
      })
      .map((product) => (
        <ProductCard key={product._id} product={product} />
      ))
  }


  return (
    <div className="max-w-7xl gap-14 mx-auto my-10">
      <div className="mb-10 flex justify-end gap-5">
        <button
          onClick={e => dispatch(TOGGOLESTOCK())}

          className={`border px-3 py-2 rounded-full font-semibold  ${stock ? activeClass : outOfStockClass} `}
        >
          {!stock ? "In Stock" : "All Items"}
        </button>
        <button
          onClick={e => dispatch(SETBRANDS("amd"))}
          className={`border px-3 py-2 rounded-full font-semibold ${brands.includes('amd') ? activeClass : null}`}
        >
          AMD
        </button>
        <button
          onClick={e => dispatch(SETBRANDS("intel"))}
          className={`border px-3 py-2 rounded-full font-semibold ${brands.includes('intel') ? activeClass : null}`}>
          Intel
        </button>
      </div>
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
        {filteredProducts}
      </div>
    </div>
  );
};

export default Home;
