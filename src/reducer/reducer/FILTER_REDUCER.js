import { FILTER_TYPE } from "../types/TYPES";

const initial = {
    filters: {
        brands: [],
        stock: false
    },
    keywords: ""
}
const filter_reducer = (state = initial, action) => {
    switch (action.type) {
        case FILTER_TYPE.TOGGLE_BRAND:

            if (!state.filters.brands.includes(action.payload)) {
                return {
                    ...state,
                    filters: {
                        ...state.filters,
                        brands: [...state.filters.brands, action.payload]
                    }
                }
            } else {
                return {
                    ...state,
                    filters: {
                        ...state.filters,
                        brands: [...state.filters.brands.filter(item => item !== action.payload)]
                    }
                }
            }

        case FILTER_TYPE.TOGGLE_STOCK:
            return {
                ...state,
                filters: {
                    ...state.filters,
                   stock:!state.filters.stock
                }
            }
        default:
            return state
    }
}
export default filter_reducer