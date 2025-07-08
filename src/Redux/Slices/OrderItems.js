
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../Supabase/supabaseClient";

export const getOrderItems = createAsyncThunk(
  "OrderItems/getOrderItems",
  async (order_id, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from("order_items").eq("order_id", order_id).select("*");
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
        console.log(action.payload);
        
        state.items = action.payload;
      })
      .addCase(getOrderItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderItemsSlice;