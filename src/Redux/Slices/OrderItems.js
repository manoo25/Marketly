import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../Supabase/supabaseClient";


export const getOrderItems = createAsyncThunk(
  "orderItems/getOrderItems",
  async (order_id, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("order_items")
        .eq("order_id", order_id)
        .select("*");
      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const getAllOrderItems = createAsyncThunk(
  "orderItems/getAllOrderItems",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("order_items")
        .select(`*,
          OrderState:order_id(status),
          ProductName:product_id(name,endprice,image,
         Company:company_id(name),
         Category:category_id(name)
          )

          `);
      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const orderItemsSlice = createSlice({
  name: "orderItems",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(getOrderItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getOrderItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  
      .addCase(getAllOrderItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrderItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getAllOrderItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export default orderItemsSlice;
