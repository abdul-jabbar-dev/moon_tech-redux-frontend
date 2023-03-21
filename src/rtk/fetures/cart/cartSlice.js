import { createSlice } from '@reduxjs/toolkit'
const initial = {
    cart: []
}
const cart_slice = createSlice({
    name: "Cart",
    initialState: initial,
    reducers: {
        ADDTOCART: (state, action) => { 

            Object.isExtensible(state)
            let payload = {...action.payload}
            Object.isExtensible(payload)
            let existing = state.cart.find(extData => extData._id === payload._id)
            if (existing) {
                state.cart.find(val => val._id === payload._id).cartQuantity++
            } else {

                payload.cartQuantity = 1
                state.cart.push(payload)

            }
        },
        REMOVEFROMCART: (state, action) => {
            
            const payload = action.payload
            const exist = state.cart.find(item => payload._id === item._id)
            if (exist.cartQuantity > 1) {
                state.cart.find(item => payload._id === item._id).cartQuantity--
            } else {
                state.cart = state.cart.filter((item) => item._id !== payload._id)
            }
        },
        DELETEFROMCART: (state, action) => {
            const payload = action.payload
            state.cart = state.cart.filter((item) => item._id !== payload._id)
        }

    }

})
export const { ADDTOCART, REMOVEFROMCART , DELETEFROMCART} = cart_slice.actions
export default cart_slice.reducer