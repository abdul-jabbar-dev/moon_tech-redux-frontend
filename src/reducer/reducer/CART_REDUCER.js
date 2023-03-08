const { CART_TYPE } = require("../types/TYPES");

const initial = []

const cart_reducer = (state = initial, action) => {
    const exist = state.find(item => action.payload._id === item._id)
    switch (action.type) {
        case CART_TYPE.ADD_TO_CART:
            if (exist) {
                exist.cartQuantity++
                return [
                        ...state.filter(item => item._id !== exist._id),
                        exist
                    ]
            } else {
                action.payload.cartQuantity = 1
                return [
                        ...state,
                        action.payload
                    ]
            }
        case CART_TYPE.REMOVE_FROM_CART:
            let newCart = state
            for (let i = 0; i < state.length; i++) {
                const element = state[i];
                if (element._id === action.payload._id) {
                    if (exist.cartQuantity > 1) {
                        newCart.at(i).cartQuantity--
                    }
                    else {
                        newCart.splice(i, 1);
                    }
                }
            }

            return [...newCart]
        case CART_TYPE.DELETE_ITEM_FROM_CART:
            return[...state.filter(item=>item._id!==action.payload._id)]
        default:
            return state;
    }
}
export default cart_reducer