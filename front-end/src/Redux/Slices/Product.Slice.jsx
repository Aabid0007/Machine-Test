import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// get all products
export const getProducts = createAsyncThunk('getProducts', async ({ categoryId }) => {
    try {
        const response = await axios.get(`https://deepnetsoft-backend-byf7.onrender.com/api/products/?categoryId=${categoryId}`);
        return response.data.data;
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
        const response = await axios.delete(`https://deepnetsoft-backend-byf7.onrender.com/api/products/${id}`);
        console.log(response.data);
        return id;
    } catch (error) {
        throw error
    }
});



const productSlice = createSlice({
    name: 'product',
    initialState: {
        product: [],
        error: '',
        loading: false,
        categoryId: '',
        productById: [],
        searchQuery: '',
        categoryName: '',
    },
 
    reducers: {
        updateCategoryId(state, action) {
          state.categoryId = action.payload;
        },
        updateCategoryName(state, action) {
            state.categoryName = action.payload
            console.log(state.categoryName);
            
        },
      },
    extraReducers: (builder) => {
        builder
        .addCase(getProducts.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase(getProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload;
            console.log('Products fetched:',state.product);
        })
        .addCase(getProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Some error occurred";
        })

        // create Category
        .addCase(createProduct.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase(createProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload;
        })
        .addCase(createProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = "Some error occurred";
        })

        // product Id fetching
        .addCase(getProductById.fulfilled, (state, action) => {
            state.loading = false;
            state.productById = action.payload.data;
        })
        .addCase(getProductById.pending, (state, action) => {
           state.loading = true;
        })

        // update product
        .addCase(editProduct.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase(editProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload;
           
            // state.product =  state.product.map((products)=> (
            //     products._id === action.payload.id ? action.payload : products
            // ))
            console.log(state.product, "redux editing");
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
            state.product = state.product.filter(product => product._id !== action.payload);
        })
        .addCase(deleteProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = "Some error occurred";
        })
    },
});
export const { updateCategoryName } = productSlice.actions;
export const { updateCategoryId } = productSlice.actions;
export default productSlice.reducer;