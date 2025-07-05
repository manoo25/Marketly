import { configureStore } from "@reduxjs/toolkit";
import UsersSlice from "./Slices/Users";
import categoriesSlice from "./Slices/Categories";

export const Store=configureStore({
    reducer: {
       Users:UsersSlice.reducer,
       Categories:categoriesSlice.reducer,
    }
});