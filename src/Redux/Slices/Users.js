import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../Supabase/supabaseClient";


export const fetchUsers = createAsyncThunk("users/fetchUsers", async (_ , { rejectWithValue }) => {
  try {
    const { data, error } = await supabase.from("users").select("*");
    if (error) throw error;
    return data;
  } 
  catch (error) {
    return rejectWithValue(error.message);
  }
});

export const createUser = createAsyncThunk("users/createUser", async (userData, { rejectWithValue }) => {
  try {
    const { data, error } = await supabase.from("users").insert(userData).select();
    if (error) throw error;
    return data[0]; 
  } 
  catch (error) {
    return rejectWithValue(error.message);
  }
});


export const updateUser = createAsyncThunk("users/updateUser", async ({ id, updatedData }, { rejectWithValue }) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .update(updatedData)
      .eq("id", id)
      .select();
    if (error) throw error;
    return data[0];
  } 
  catch (error) {
    return rejectWithValue(error.message);
  }
});



export const deleteUser = createAsyncThunk("users/deleteUser", async (id, { rejectWithValue }) => {
  try {
    const { error } = await supabase.from("users").delete().eq("id", id);
    if (error) {
        console.error("Delete error:", error.message); 
        throw error;
      }
    return id;
  } catch (error) {
    console.error("Error in deleteUser:", error.message); 
    return rejectWithValue(error.message);
    
  }
});


const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.payload;
      })

     
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          console.log(action.payload);
          
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
      })

 
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default usersSlice;
