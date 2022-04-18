import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import authService from "./authService";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//set userData from register form
export const setUserRegister = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//set userData from login form
export const setUserLogin = createAsyncThunk(
  "auth/login",
  async (user, thunkAPI) => {
    console.log(user);
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => (state = { ...initialState }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(setUserRegister.pending, (state) => (state.isLoading = true))
      .addCase(setUserRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(setUserRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;
