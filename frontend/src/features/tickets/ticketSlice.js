import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ticketService from "./ticketService";
const { createTicket } = ticketService;

const initialState = {
  tickets: [],
  ticket: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//create NEW TICKET
export const createTickets = createAsyncThunk(
  "tickets/create",
  async (ticketData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await createTicket(ticketData, token);
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

export const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        //   state.user = action.payload;
      })
      .addCase(createTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        //   state.user = null;
      });
  },
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;
