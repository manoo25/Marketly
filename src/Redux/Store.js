import { configureStore } from "@reduxjs/toolkit";
import UsersSlice from "./Slices/Users";
import categoriesSlice from "./Slices/Categories";
import productSlice from "./Slices/ProductSlice";
import ordersSlice from "./Slices/OrdersSlice";
import orderItemsSlice from "./Slices/OrderItems";

export const Store=configureStore({
    reducer: {
       Users:UsersSlice.reducer,
       Categories:categoriesSlice.reducer,
       Products:productSlice.reducer,
       Orders:ordersSlice.reducer,
       OrderItems:orderItemsSlice.reducer
    }
});