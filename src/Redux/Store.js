import { configureStore } from "@reduxjs/toolkit";
import UsersSlice from "./Slices/Users";
import categoriesSlice from "./Slices/Categories";
import productSlice from "./Slices/ProductSlice";

export const Store=configureStore({
    reducer: {
       Users:UsersSlice.reducer,
       Categories:categoriesSlice.reducer,
       Products:productSlice.reducer
    }
});