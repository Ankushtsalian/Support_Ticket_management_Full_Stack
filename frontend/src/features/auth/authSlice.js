import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
const { register, logout, login } = authService;

//Get user from localstorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  //if user is registered use it
  user: user ? user : null,
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
      return await register(user);
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
    try {
      return await login(user);
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

//Logout user
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async () => await logout()
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setUserRegister.pending, (state) => {
        state.isLoading = true;
      })
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
      })
      .addCase(setUserLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setUserLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(setUserLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;
