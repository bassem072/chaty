import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createMessageService,
  deleteMessageService,
  fetchMessagesService,
  getMessageService,
  updateMessageService,
} from "../services/message.service";
import { setMessage } from "./message";

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
  async ({chatId, messageId}, thunkAPI) => {
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
  messages: [],
  isLoading: false,
};

const chatMessages = createSlice({
  name: "chatMessages",
  initialState,
  reducers: {},
});

export const {} = chatMessages.actions;

export default chatMessages.reducer;
