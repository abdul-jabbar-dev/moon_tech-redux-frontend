import cart_reducer from './reducer/CART_REDUCER'
import filter_reducer from './reducer/FILTER_REDUCER'
import { combineReducers } from "redux";
import load_fetch_data from './reducer/LOAD_DATA';
const ROOT_REDUCER = combineReducers({
    cart_store: cart_reducer,
    filter_store: filter_reducer,
    loaded_Products: load_fetch_data
})
export default ROOT_REDUCER