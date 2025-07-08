import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../Supabase/supabaseClient";

// Get All Products with related category and trader info
export const fetchProducts = createAsyncThunk("products/fetchproducts", async (_, { rejectWithValue }) => {
    try {
        const { data, error } = await supabase
            .from("products")
            .select(`
                *,
                category:category_id (*),
                trader:trader_id (*),
                company:company_id (name,image)
                          `);
        if (error) throw error;
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Create a new product
export const createProduct = createAsyncThunk("products/createproduct", async (productData, { rejectWithValue }) => {
    try {
        const { data, error } = await supabase
            .from("products")
            .insert(productData)
            .select(`
                *,
                category:category_id (*),
                trader:trader_id (*),
                company:company_id (name,image)
            `);
        if (error) throw error;
        return data[0];
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Update a product
export const updateProduct = createAsyncThunk("products/updateproduct", async ({ id, updatedData }, { rejectWithValue }) => {
    try {
        const { data, error } = await supabase
            .from("products")
            .update(updatedData)
            .eq("id", id)
            .select(`
                *,
                category:category_id (*),
                trader:trader_id (*),
                company:company_id (name,image)
            `);
        if (error) throw error;
        return data[0];
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Delete a product
export const deleteProduct = createAsyncThunk("products/deleteproduct", async (id, { rejectWithValue }) => {
    try {
        const { error } = await supabase.from("products").delete().eq("id", id);
        if (error) throw error;
        return id;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Slice
const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.push(action.payload);
                state.error = null;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.products.findIndex(product => product.id === action.payload.id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
                state.error = null;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter(product => product.id !== action.payload);
                state.error = null;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default productSlice;
