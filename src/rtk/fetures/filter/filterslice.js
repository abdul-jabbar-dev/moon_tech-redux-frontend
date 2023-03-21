const { createSlice } = require("@reduxjs/toolkit");
const initial = {
    brands: [],
    stock: false,
    keywords: '  '
}
const filterSlice = createSlice({
    name: "filter",
    initialState: initial,
    reducers: {
        TOGGOLESTOCK: (state, action) => {
            state.stock = !state.stock
        },
        SETBRANDS: (state, action) => {
            const allbrands = state.brands
            if (allbrands.includes(action.payload)) {
                state.brands = allbrands.filter(b => b !== action.payload)
            } else {
                allbrands.push(action.payload)
            }

        }
    }
})
export const { TOGGOLESTOCK, SETBRANDS } = filterSlice.actions

export default filterSlice.reducer