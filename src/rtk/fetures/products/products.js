import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AXIOS from "../../../api/axios/axios.config";
const initialState = {
    products: [],
    isLoading: false,
    isError: {
        state: false,
        massage: ''
    },
    post: {
        postedId: '',
        isLoading: false,
        isError: ''
    },
    delete: {
        isDelete: false,
        isLoading: false,
        isError: ''
    }
}

export const getAllProductByFetch = createAsyncThunk('getproducts/products', async () => {
    const res = await AXIOS.get('products')
    return res.data
})

export const postProductByFetch = createAsyncThunk('getproducts/postproduct', async (data) => {
    const res = await AXIOS.post('product', data)
    return res.data.insertedId
})

export const deleteProductByFetch = createAsyncThunk('getproducts/deleteproduct', async (id) => {
    const res = await AXIOS.delete('product/' + id)
    return res.data.insertedId
})

const get_prodicts_slice = createSlice({
    name: 'getproducts',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getAllProductByFetch.pending, (state, action) => {
                state.isLoading = true;
                state.products = []
            })
            .addCase(getAllProductByFetch.rejected, (state, action) => {
                state.isError.state = true;
                state.isError.massage = action.error.message;
            })
            .addCase(getAllProductByFetch.fulfilled, (state, action) => {
                state.isError.state = false;
                state.isError.massage = "";
                state.isLoading = false;
                state.products = action.payload
            })
            .addCase(postProductByFetch.pending, (state, action) => {
                state.post.isLoading = true;
                state.post.postedId = '';

            })
            .addCase(postProductByFetch.fulfilled, (state, action) => {
                state.post.isLoading = false;
                state.post.postedId = action.payload;
            })
            .addCase(postProductByFetch.rejected, (state, action) => {
                state.post.isLoading = false;
                state.post.postedId = '';
                state.post.isError = action.error.message
            })
            .addCase(deleteProductByFetch.pending, (state, action) => {
                state.delete.isLoading = true
            })
            .addCase(deleteProductByFetch.fulfilled, (state, action) => {
                state.delete.isLoading = false
                state.delete.isDelete = true
            })
            .addCase(deleteProductByFetch.rejected, (state, action) => {
                state.delete.isLoading = false
                state.delete.isDelete = false
                state.delete.isError = action.error.message
            })
    }
})
export default get_prodicts_slice.reducer