import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createMessageService,
  deleteMessageService,
  fetchMessagesService,
  getMessageService,
  updateMessageService,
} from "../services/message.service";
import { setMessage } from "./message";
import { getChatService } from "../services/chat.service";

export const getChat = createAsyncThunk(
  "/messages/chat/get",
  async ({ chatId }, thunkAPI) => {
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

export const fetchMessages = createAsyncThunk(
  "/messages/fetch",
  async ({ chatId, filters }, thunkAPI) => {
    try {
      const { data } = await fetchMessagesService(chatId, filters);
      return { messages: data };
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

export const createMessage = createAsyncThunk(
  "/messages/create",
  async ({ chatId, messageData }, thunkAPI) => {
    try {
      const { data } = await createMessageService(chatId, messageData);
      return { message: data };
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

export const getMessage = createAsyncThunk(
  "/messages/get",
  async ({ chatId, messageId }, thunkAPI) => {
    try {
      const { data } = await getMessageService(chatId, messageId);
      return { message: data };
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

export const updateMessage = createAsyncThunk(
  "/messages/update",
  async ({ groupId, messageId, updatedMessageData }, thunkAPI) => {
    try {
      const { data } = await updateMessageService(
        groupId,
        messageId,
        updatedMessageData
      );
      return { message: data };
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

export const deleteMessage = createAsyncThunk(
  "/messages/delete",
  async ({ chatId, messageId }, thunkAPI) => {
    try {
      await deleteMessageService(chatId, messageId);
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

const initialState = {
  chat: null,
  messages: [],
  isLoading: false,
};

const chatMessages = createSlice({
  name: "chatMessages",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      console.log(action.payload, state.messages);
      if (state.messages[state.messages.length - 1].id !== action.payload.id) {
        state.messages.push(action.payload);
        state.chat.latestMessage = action.payload;
      }
    },
    updateChat: (state, action) => {
      state.chat.latestMessage = action.payload;
    },
    clearMessagesHistory: (state, action) => {
      state.chat = null;
      state.messages = [];
      console.log(state.messages);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getChat.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chat = action.payload.chat;
      })
      .addCase(fetchMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload.messages;
      })
      .addCase(getMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMessage.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chat = [action.payload.message, ...state.messages];
      })
      .addCase(createMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMessage.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = [...state.messages, action.payload.message];
        state.chat.latestMessage = action.payload.message;
      });
  },
});

export const { updateChat, addMessage, clearMessagesHistory } = chatMessages.actions;

export default chatMessages.reducer;
