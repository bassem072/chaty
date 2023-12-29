import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import {
  createChatService,
  fetchChatsService,
  getChatService,
  updateGroupService,
  deleteChatService,
  clearChatService,
  addUserToGroupService,
  removeUserFromGroupService,
  addAdminToGroupService,
  removeAdminFromGroupService,
} from "../services/chat.service";

export const fetchChats = createAsyncThunk(
  "/chats/fetch",
  async (filters, thunkAPI) => {
    try {
      const { data } = await fetchChatsService(filters);
      return { chats: data };
    } catch (error) {
      let message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createChat = createAsyncThunk(
  "/chats/create",
  async (chatData, thunkAPI) => {
    try {
      const { data } = await createChatService(chatData);
      return { chat: data };
    } catch (error) {
      let message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getChat = createAsyncThunk(
  "/chats/get",
  async (chatId, thunkAPI) => {
    try {
      const { data } = await getChatService(chatId);
      return { chat: data };
    } catch (error) {
      let message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateChat = createAsyncThunk(
  "/chats/update",
  async ({ groupId, updatedChatData }, thunkAPI) => {
    try {
      const { data } = await updateGroupService(groupId, updatedChatData);
      return { chat: data };
    } catch (error) {
      let message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteChat = createAsyncThunk(
  "/chats/delete",
  async (chatId, thunkAPI) => {
    try {
      await deleteChatService(chatId);
      return;
    } catch (error) {
      let message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const clearChat = createAsyncThunk(
  "/chats/clear",
  async (chatId, thunkAPI) => {
    try {
      const { data } = await clearChatService(chatId);
      return { chat: data };
    } catch (error) {
      let message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addUserToGroup = createAsyncThunk(
  "/chats/users/add",
  async ({ groupId, userId }, thunkAPI) => {
    try {
      const { data } = await addUserToGroupService(groupId, { userId });
      return { chat: data };
    } catch (error) {
      let message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeUserFromGroup = createAsyncThunk(
  "/chats/users/remove",
  async ({ groupId, userId }, thunkAPI) => {
    try {
      const { data } = await removeUserFromGroupService(groupId, { userId });
      return { chat: data };
    } catch (error) {
      let message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addAdminToGroup = createAsyncThunk(
  "/chats/admins/add",
  async ({ groupId, userId }, thunkAPI) => {
    try {
      const { data } = await addAdminToGroupService(groupId, { userId });
      return { chat: data };
    } catch (error) {
      let message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeAdminFromGroup = createAsyncThunk(
  "/chats/admins/remove",
  async ({ groupId, userId }, thunkAPI) => {
    try {
      const { data } = await removeAdminFromGroupService(groupId, { userId });
      return { chat: data };
    } catch (error) {
      let message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  chats: [],
  isLoading: false,
  filter: "all",
};

const chat = createSlice({
  name: "chat",
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      if (["all", "chats", "groups"].includes(action.payload)) {
        state.filter = action.payload;
      }
    },
    newMessage: (state, action) => {
      const index = state.chats.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.chats.splice(index, 1);
      }
      state.chats.unshift(action.payload);
    },
    updateMessage: (state, action) => {
      const index = state.chats.findIndex(
        (item) =>
          item.id === action.payload.chatId &&
          item.latestMessage.id === action.payload.id
      );
      if (index !== -1) {
        const chat = state.chats[index];
        chat.latestMessage = action.payload;
        state.chats.splice(index, 1);
        state.chats.unshift(chat);
      }
    },
    deleteMessage: (state, action) => {
      const index = state.chats.findIndex(
        (item) =>
          item.id === action.payload.chatId &&
          item.latestMessage.id === action.payload.id
      );
      if (index !== -1) {
        const chat = state.chats[index];
        chat.latestMessage = action.payload;
        state.chats.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchChats.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chats = state.chats.concat(action.payload);
      })
      .addCase(createChat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createChat.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.chats = state.chats.push(action.payload);
        state.isLoading = false;
      })
      .addCase(getChat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getChat.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getChat.fulfilled, (state, action) => {
        state.chats = state.chats.push(action.payload);
        state.isLoading = false;
      })
      .addCase(updateChat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateChat.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateChat.fulfilled, (state, action) => {
        state.chats = state.chats.push(action.payload);
        state.isLoading = false;
      });
  }
});

export const { changeFilter, newMessage } = chat.actions;

export default chat.reducer;
