import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    onlineUsers: [],
}

const onlineUsers = createSlice({
  name: "onlineUsers",
  initialState,
  reducers: {
    updateUsers: (state, action) => {
        state.onlineUsers = action.payload;
    },
  }
});

export const { updateUsers } = onlineUsers.actions

export default onlineUsers.reducer