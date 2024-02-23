import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    productData: [],
    totalData: 0,
    loading: false,
    error: null
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.productData = action.payload.productData;
                state.totalData = action.payload.total;
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
    }
})

export const fetchProducts = createAsyncThunk(
    "product/fetchProducts",
    async (params, { rejectWithValue }) => {
        try {
            const { page = 1, limit = 9, queryParams } = params;
            const { data } = await axios.get(`http://localhost:3000/products/all?${queryParams?.toString()}&page=${page}&limit=${limit}`);
            return data;
        }
        catch (err) {
            if (err.response) {
                return rejectWithValue(`Server reject with status code ${err.response.status}`);
            }
            else if (err.request) {
                return rejectWithValue('No response from server');
            }
            else
                return rejectWithValue("Error while requesting");
        }
    }
)

export default productSlice.reducer;