const { LOAD_DATA } = require("../types/TYPES");

const initial = {
    products: [],
    isFatching: false
}


const load_fetch_data = (state = initial, action) => {
    switch (action.type) {
        case LOAD_DATA.LOAD_STARTING:
            return {
                products: [],
                isFatching: true
            }
        case LOAD_DATA.LOAD_FINISH:
            return {
                products: action.payload,
                isFatching: false
            }
        default:
           return state;
    }
}
export default load_fetch_data