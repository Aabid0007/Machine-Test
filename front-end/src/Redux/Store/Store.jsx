import { configureStore } from "@reduxjs/toolkit";
import CategorySlice from "../Slices/Category.Slice";
import ProductSlice from "../Slices/Product.Slice";

 const store = configureStore({
    reducer: {
        category: CategorySlice,
        product: ProductSlice,
    },
})

export default store;