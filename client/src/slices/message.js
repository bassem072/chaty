import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    clearMessage: (state, action) => {
      state.message = "";
    },
  },
});

export const { setMessage, clearMessage } = messageSlice.actions;

export default messageSlice.reducer;
