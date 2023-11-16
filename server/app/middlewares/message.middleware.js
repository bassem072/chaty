import asyncHandler from "express-async-handler";
import Chat from "../models/chat.model.js";
import { ApiError } from "../utils/apiError.js";

export const verifyChat = asyncHandler(async (req, res, next) => {
  const { chatId } = req.params;

  const chat = await Chat.findById(chatId);

  if (!chat) {
    return next(new ApiError("Chat not found for id " + chatId, 404));
  }

  if (!chat.users.includes(req.user.id)) {
    return next(new ApiError("You are not a member of this chat", 403));
  }

  next();
});