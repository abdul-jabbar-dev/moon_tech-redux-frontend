import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard";
import loadData from "../../reducer/middlewares/thunk/loadData";
import { FILTER_TYPE } from "../../reducer/types/TYPES";
import Loader from "../../utils/Loader";

const Home = () => {
  useEffect(() => {
    dispatch(loadData())
  }, []);
  const { products,isFatching } = useSelector(state => state.loaded_Products)
  console.log(isFatching)
  const activeClass = "text-white  bg-indigo-500 border-white";
  const outOfStockClass = "text-purple-600  bg-purple-100  border-purple-300";
  const dispatch = useDispatch();
  const { filters: { brands, stock: stocks }, keywords } = useSelector(state => state.filter_store)


  let filteredProducts = <Loader></Loader>;
  
  if (products.length) {
    filteredProducts = products.map((product) => (
      <ProductCard key={product._id} product={product} />
    ))
  }
  if (products.length && (stocks || brands.length)) {
    filteredProducts = products
      .filter(item => {
        if (brands.length) {
          return brands.includes((item.Brand).toLowerCase())
        }
        return item
      })
      .filter(item => {
        if (stocks) {
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
          onClick={(e) =>
            dispatch({ type: FILTER_TYPE.TOGGLE_STOCK })
          }
          className={`border px-3 py-2 rounded-full font-semibold  ${stocks ? activeClass : outOfStockClass} `}
        >
          {!stocks ? "In Stock" : "All Items"}
        </button>
        <button
          onClick={(e) =>
            dispatch({ type: FILTER_TYPE.TOGGLE_BRAND, payload: "amd" })
          }
          className={`border px-3 py-2 rounded-full font-semibold ${brands.includes('amd') ? activeClass : null}`}
        >
          AMD
        </button>
        <button onClick={(e) =>
          dispatch({ type: FILTER_TYPE.TOGGLE_BRAND, payload: "intel" })
        }
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
