import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../Supabase/supabaseClient";

export const getReturns = createAsyncThunk(
    "returns/getReturns",
    async (_, { rejectWithValue }) => {
        try {
            // const { data, error } = await supabase.from("returns").select(`*,
            //     user : order_id)(*),

            const { data, error } = await supabase.from("returns")
                .select(`
                    *,
    order: order_id (
      *,
      user: user_id (
        *
      )
    )
    `);
            if (error) throw error;
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const addReturn = createAsyncThunk(
    "returns/addReturn",
    async (returnData, { rejectWithValue }) => {
        try {
            const { data, error } = await supabase.from("returns").insert(returnData);
            if (error) throw error;
            return data[0];
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateReturn = createAsyncThunk(
    "returns/updateReturn",
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const { data, error } = await supabase.from("returns").update(updatedData).eq("id", id).select(`
                    *,
                      user: user_id (*)
    `);
            if (error) throw error;
            return data[0];
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteReturn = createAsyncThunk(
    "returns/deleteReturn",
    async (id, { rejectWithValue }) => {
        try {
            const { error } = await supabase.from("returns").delete().eq("id", id);
            if (error) throw error;
            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteSelectedReturns = createAsyncThunk(
    "returns/deleteSelectedReturns",
    async (selectedReturns, { rejectWithValue }) => {
        try {
            const ids = selectedReturns.map(ret => ret.id);
            const { error } = await supabase.from("returns").delete().in("id", ids);
            if (error) throw error;
            return ids; // return the deleted IDs
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const returnsSlice = createSlice({
    name: "returns",
    initialState: {
        returns: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getReturns.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getReturns.fulfilled, (state, action) => {
                state.loading = false;
                state.returns = action.payload;
            })
            .addCase(getReturns.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            .addCase(addReturn.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addReturn.fulfilled, (state, action) => {
                state.loading = false;
                state.returns.push(action.payload);
            })
            .addCase(addReturn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            .addCase(updateReturn.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateReturn.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.returns.findIndex((r) => r.id === action.payload.id);
                if (index !== -1) {
                    state.returns[index] = action.payload;
                }
            })
            .addCase(updateReturn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })



            .addCase(deleteReturn.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteReturn.fulfilled, (state, action) => {
                state.returns = state.returns.filter((r) => r.id !== action.payload);
                state.loading = false;
            })
            .addCase(deleteReturn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});


export default returnsSlice;
