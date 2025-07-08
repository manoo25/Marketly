import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./Slices/Users";
import categoriesSlice from "./Slices/Categories";
import productSlice from "./Slices/ProductSlice";
import ordersSlice from "./Slices/OrdersSlice";
import orderItemsSlice from "./Slices/OrderItems";
import UnitsSlice from "./Slices/units";
import CompaniesSlice from "./Slices/CompaniesSlice";

export const Store=configureStore({
    reducer: {
       Users:usersSlice.reducer,
       Categories:categoriesSlice.reducer,
       Units:UnitsSlice.reducer,
       Products:productSlice.reducer,
       Orders:ordersSlice.reducer,
       OrderItems:orderItemsSlice.reducer,
    Companies: CompaniesSlice.reducer,
    }
});
