import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import chatReducer from "./slices/chat";
import chatMessagesReducer from "./slices/chatMessages";
import onlineUsersReducer from "./slices/onlineUsers";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
    chat: chatReducer,
    chatMessages: chatMessagesReducer,
    onlineUsers: onlineUsersReducer,
  },
});
