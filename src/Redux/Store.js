import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./Slices/Users";
import categoriesSlice from "./Slices/Categories";
import productSlice from "./Slices/ProductSlice";
import ordersSlice from "./Slices/OrdersSlice";
import orderItemsSlice from "./Slices/OrderItems";
import returnsSlice from "./Slices/ReturnsSlice";
import UnitsSlice from "./Slices/units";
import CompaniesSlice from "./Slices/CompaniesSlice";
import delegatesSlice from "./Slices/DelegatesSlice";
import TokenSlice from "./Slices/token";
import complaintsSlice from "./Slices/Complaints";
import messagesSlice from "./slices/messagesSlice";

export const Store = configureStore({
  reducer: {
    Users: usersSlice.reducer,
    Categories: categoriesSlice.reducer,
    Units: UnitsSlice.reducer,
    Products: productSlice.reducer,
    Orders: ordersSlice.reducer,
    OrderItems: orderItemsSlice.reducer,
    Returns: returnsSlice.reducer,
    Companies: CompaniesSlice.reducer,
    messages: messagesSlice.reducer,
    Delegates: delegatesSlice.reducer,
    Token: TokenSlice.reducer,
    Complaints: complaintsSlice.reducer,
  },
});
