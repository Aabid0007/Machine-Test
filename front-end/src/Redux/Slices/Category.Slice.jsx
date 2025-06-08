import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


// get all category
export const getCategories = createAsyncThunk('getCategory', async () => {
    try {
        const response = await axios.get(`https://deepnetsoft-backend-byf7.onrender.com/api/category`);
        return response.data;
    } catch (error) {
        throw error;
    }
});

// create Category
export const createCategory = createAsyncThunk('createCategory', async (data) => {
    try {
        const response = await axios.post(`https://deepnetsoft-backend-byf7.onrender.com/api/category`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
});

// categoryId fetching
export const getCategoryById = createAsyncThunk("getCategoryById", async (id) => {
    try {
        const response = await axios.get(`https://deepnetsoft-backend-byf7.onrender.com/api/category/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
});

// update Category
export const editCategory = createAsyncThunk("editCategory", async ({ id, data }) => {
    try {
        const response = await axios.put(`https://deepnetsoft-backend-byf7.onrender.com/api/category/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
});

// Delete Category
export const deleteCategory = createAsyncThunk("deleteCategory", async (id) => {
    try {
        const response = await axios.delete(`https://deepnetsoft-backend-byf7.onrender.com/api/category/${id}`);
        console.log(response.data);
        return id;
    } catch (error) {
        throw error
    }
});



const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        error: '',
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload.data;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = "Some error occurred";
            })

            // create Category
            .addCase(createCategory.pending, (state) => {
                state.loading = true;
                 state.error = '';
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories.unshift(action.payload.data);
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = "Some error occurred";
            })

            // get category by ID
            .addCase(getCategoryById.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(getCategoryById.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(getCategoryById.rejected, (state, action) => {
                state.loading = false;
                state.error = "Something went wrong";
            })


            // update category
            .addCase(editCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = state.categories.map(cat =>
                    cat._id === action.payload.data._id ? action.payload.data : cat
                );
            })
            .addCase(editCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = "Some error occurred";
            })

            
            // delete Category
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = state.categories.filter(category => category._id !== action.payload);
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = "Some error occurred";
            })
    },
});

export default categorySlice.reducer;