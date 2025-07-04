import { configureStore } from "@reduxjs/toolkit";
import UsersSlice from "./Slices/Users";

export const Store=configureStore({
    reducer: {
       Users:UsersSlice.reducer,
    }
});