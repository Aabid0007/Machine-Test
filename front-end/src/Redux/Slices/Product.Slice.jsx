import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// get all products
export const getProducts = createAsyncThunk('getProducts', async (categoryId) => {
    try {
        const response = await axios.get(`https://deepnetsoft-backend-byf7.onrender.com/api/products/?categoryId=${categoryId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
});

// create products
export const createProduct = createAsyncThunk('createProduct', async (data) => {
    try {
        const response = await axios.post(`https://deepnetsoft-backend-byf7.onrender.com/api/products`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
});

// productId fetching
export const getProductById = createAsyncThunk("getProductById", async (id) => {
    try {
        const response = await axios.get(`https://deepnetsoft-backend-byf7.onrender.com/api/products/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
});

// update product
export const editProduct = createAsyncThunk("editProduct", async ({ id, data }) => {
    try {
        const response = await axios.put(`https://deepnetsoft-backend-byf7.onrender.com/api/products/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
});

// Delete product
export const deleteProduct = createAsyncThunk("deleteProduct", async (id) => {
    try {
        await axios.delete(`https://deepnetsoft-backend-byf7.onrender.com/api/products/${id}`);
        return id;
    } catch (error) {
        throw error
    }
});



const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        error: '',
        loading: false,
        loadingList: false,
        categoryName: '',
    },

    reducers: {
        updateCategoryName(state, action) {
            state.categoryName = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.loadingList = true;
                state.error = '';
            })
            .addCase(getProducts.fulfilled, (state, action) => {
               state.loadingList = false;
                state.products = action.payload.data;
                // console.log('Products fetched:',state.product);
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.loadingList = true;
                state.error = action.error.message || "Some error occurred";
            })

            // create Category
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = "Some error occurred";
            })

            // get product by ID
            .addCase(getProductById.pending, (state, action) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = "Something went wrong";
            })

            // update product
            .addCase(editProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.map(product =>
                    product._id === action.payload.data._id ? action.payload.data : product
                )
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = "Some error occurred";
            })

            // delete product
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter(product => product._id !== action.payload);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = "Some error occurred";
            })
    },
});

export const { updateCategoryName } = productSlice.actions;
export default productSlice.reducer;