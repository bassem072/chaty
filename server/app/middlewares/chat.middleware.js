import asyncHandler from "express-async-handler";
import Chat from "../models/chat.model.js";
import { ApiError } from "../utils/apiError.js";
import User from "../models/user.model.js";

export const verifyGetChat = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const chat = await Chat.findById(req.params.id);

  if (!chat) {
    return next(new ApiError("Chat not found for id " + chat.id, 404));
  }

  if (!chat.users.includes(req.user.id)) {
    return next(
      new ApiError("You do not have permission to update this chat", 403)
    );
  }

  if (!chat.isGroupChat) {
    return next(new ApiError("This is not a group chat", 405));
  }

  if (!chat.groupAdmins.includes(req.user.id)) {
    return next(new ApiError("You are not admin", 403));
  }

  req.chat = chat;

  next();
});

export const verifyUpdateChat = asyncHandler(async (req, res, next) => {
  const chat = await Chat.findById(req.params.id);

  if (!chat) {
    return next(new ApiError("Chat not found for id " + chat.id, 404));
  }

  if (!chat.users.includes(req.user.id)) {
    return next(
      new ApiError("You do not have permission to update this chat", 403)
    );
  }

  if (!chat.isGroupChat) {
    return next(new ApiError("This is not a group chat", 405));
  }

  if (!chat.groupAdmins.includes(req.user.id)) {
    return next(new ApiError("You are not admin", 403));
  }

  if (!req.body.name) {
    return next(new ApiError("Chat name is required", 401));
  }

  next();
});

export const verifyDeleteChat = asyncHandler(async (req, res, next) => {
  const chat = await Chat.findById(req.params.id);

  if (!chat) {
    return next(new ApiError("Chat not found for id " + chat.id, 404));
  }

  if (!chat.users.includes(req.user.id)) {
    return next(
      new ApiError("You do not have permission to delete this chat", 403)
    );
  }

  if (chat.isGroupChat && chat.groupAdmins.includes(req.user.id)) {
    return next(new ApiError("You are not admin", 403));
  }

  next();
});

export const verifyManegeUsers = asyncHandler(async (req, res, next) => {
  const chat = await Chat.findById(req.params.id);

  if (!chat) {
    return next(new ApiError("Chat not found for id " + req.params.id, 404));
  }

  if (!chat.isGroupChat) {
    return next(new ApiError("This is not a group chat", 405));
  }

  if (!chat.users.includes(req.user.id)) {
    return next(
      new ApiError("You do not have permission to delete this chat", 403)
    );
  }

  if (!chat.groupAdmins.includes(req.user.id)) {
    return next(new ApiError("You are not admin", 403));
  }

  const user = User.findById(req.body.user);

  if (!user) {
    return next(
      new ApiError("User not found for this id: " + req.body.user, 404)
    );
  }

  next();
});

export const verifyManegeAdmins = asyncHandler(async (req, res, next) => {
  const chat = await Chat.findById(req.params.id);

  if (!chat) {
    return next(new ApiError("Chat not found for id " + req.params.id, 404));
  }

  if (!chat.users.includes(req.user.id)) {
    return next(
      new ApiError("You do not have permission to delete this chat", 403)
    );
  }

  if (chat.isGroupChat && !chat.groupAdmins.includes(req.user.id)) {
    return next(new ApiError("You are not admin", 403));
  }

  if (!chat.isGroupChat) {
    return next(new ApiError("This is not a group chat", 405));
  }

  const user = await User.findById(req.body.user);

  if (!user) {
    return next(
      new ApiError("User not found for this id: " + req.body.user, 404)
    );
  }

  if(!chat.users.includes(user.id)) {
    return next(new ApiError("This user does not exist in this chat group"));
  }

  next();
});