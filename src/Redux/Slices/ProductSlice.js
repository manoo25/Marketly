import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../Supabase/supabaseClient";

// ✅ Fetch all products with related tables
export const fetchProducts = createAsyncThunk(
  "products/fetchproducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          category:category_id (*),
          trader:trader_id (*),
          company:company_id (name, image)
        `);
      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Create a new product
export const createProduct = createAsyncThunk(
  "products/createproduct",
  async (productData, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("products")
        .insert(productData)
        .select(`
          *,
          category:category_id (*),
          trader:trader_id (*),
          company:company_id (name, image)
        `);
      if (error) throw error;
      return data[0]; // return the inserted product
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Update a product
export const updateProduct = createAsyncThunk(
  "products/updateproduct",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("products")
        .update(updatedData)
        .eq("id", id)
        .select(`
          *,
          category:category_id (*),
          trader:trader_id (*),
          company:company_id (name, image)
        `);
      if (error) throw error;
      return data[0];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Delete single product by ID
export const deleteProduct = createAsyncThunk(
  "products/deleteproduct",
  async ({ id, image }, { rejectWithValue }) => {
    try {
      // استخراج اسم الصورة من URL
      let imagePath = null;
      if (image) {
        const parts = image.split("products/");
        if (parts.length > 1) {
          imagePath = `products/${decodeURIComponent(parts[1])}`;
        }
      }

      // حذف الصورة من التخزين إن وجدت
      if (imagePath) {
        const { error: storageError } = await supabase.storage
          .from("products")
          .remove([imagePath]);

        if (storageError) {
          console.error("❌ Storage deletion error:", storageError);
          throw storageError;
        }
      }

      // حذف المنتج من قاعدة البيانات
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (error) throw error;

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const deleteSelectedProduct = createAsyncThunk(
  "products/deleteSelected",
  async (selectedProducts, { rejectWithValue }) => {
    try {
      // استخراج فقط اسم الصورة بدون المسار الكامل
      const imagePaths = selectedProducts
        .map((p) => {
          const url = p.image;
          if (!url) return null;
          const parts = url.split("/");
          return parts.length > 0 ? decodeURIComponent(parts.pop()) : null;
        })
        .filter(Boolean);

      console.log("🧹 حذف الصور التالية من Supabase:", imagePaths);

      // حذف الصور من التخزين
      if (imagePaths.length > 0) {
        const { error: storageError } = await supabase.storage
          .from("products")
          .remove(imagePaths); // <-- فقط أسماء الملفات

        if (storageError) {
          console.error("❌ خطأ أثناء حذف الصور:", storageError);
          throw storageError;
        }
      }

      // حذف المنتجات من جدول Supabase
      const ids = selectedProducts.map((p) => p.id);
      const { error } = await supabase.from("products").delete().in("id", ids);
      if (error) throw error;

      return ids;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// ✅ Product Slice
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Fetch
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

      // Create
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

      // Update
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.products[index] = action.payload;
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Single
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter((p) => p.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Multiple
      .addCase(deleteSelectedProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSelectedProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter((p) => !action.payload.includes(p.id));
        state.error = null;
      })
      .addCase(deleteSelectedProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice;
