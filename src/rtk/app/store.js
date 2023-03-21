import { configureStore } from '@reduxjs/toolkit'
import cartSlice from '../fetures/cart/cartSlice'
import filterslice from '../fetures/filter/filterslice'
import get_prodicts_slice from '../fetures/products/products'
let custom = state => next => action => {
    if (action.type === "getproducts/postproduct/fulfilled") {
        setTimeout(() => {
            next({ ...action, payload: '' })
        }, 5000)
        next(action)
    }
    next(action)
}
const store = configureStore({
    reducer: {
        cartList: cartSlice,
        filters: filterslice,
        apiProducts: get_prodicts_slice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(custom)

})


export default store