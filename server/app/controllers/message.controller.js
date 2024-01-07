import asyncHandler from "express-async-handler";
import Chat from "../models/chat.model.js";
import { ApiError } from "../utils/apiError.js";
import Message from "../models/message.model.js";
import {
  MessageResponse,
  MessagesResponse,
} from "../utils/dto/messageResponseDTO.js";

export const index = asyncHandler(async (req, res, next) => {
  const { chatId } = req.params;
  const limit = req.query.limit ?? 50;
  const skip = req.query.skip ?? 0;
  const keyword = req.query.keyword;

  const filter = {
    chatId,
  };

  if (keyword) {
    filter["$text"] = {
      $search: keyword,
    };
  }

  const messages = await Message.find(filter)
    .sort("createdAt")
    .skip(skip)
    .populate({
      path: "chatId",
      populate: [
        {
          path: "users",
          select: "-password",
        },
        {
          path: "latestMessage",
        },
      ],
    })
    .populate("sender", "-password");

  res.status(200).json({
    data: MessagesResponse(messages, req.user.id),
  });
});

export const send = asyncHandler(async (req, res, next) => {
  const { chatId } = req.params;

  const messageObj = new Message({
    content: req.body.content,
    sender: req.user.id,
    messageType: req.body.messageType,
    chatId: chatId,
  });

  const newMessage = await messageObj.save();

  await Chat.findByIdAndUpdate(
    chatId,
    { latestMessage: newMessage.id },
    { new: true }
  );

  const message = await Message.findById(newMessage.id)
    .populate("sender", "-password")
    .populate({
      path: "chatId",
      populate: [
        {
          path: "users",
          select: "-password",
        },
        {
          path: "latestMessage",
        },
      ],
    });

    console.log(message);

  res.status(201).json({ data: MessageResponse(message, req.user.id) });
});

export const show = asyncHandler(async (req, res, next) => {
  const { chatId, id } = req.params;

  const message = await Message.findById(id)
    .populate("sender", "-password")
    .populate({
      path: "chatId",
      populate: {
        path: "users",
        select: "-password",
      },
    });

  if (!message) {
    return next(new ApiError("Message not found for id " + id, 404));
  }

  if (message.chatId !== chatId) {
    return next(new ApiError("This message is not in this chat", 405));
  }

  res.status(200).json({ data: message });
});

export const update = asyncHandler(async (req, res, next) => {
  const { chatId, id } = req.params;

  const message = Message.findById(id);

  if (!message) {
    return next(new ApiError("Message not found for id " + id, 404));
  }

  if (message.chatId !== chatId) {
    return next(new ApiError("This message is not in this chat", 405));
  }

  if (message.sender !== req.user.id) {
    return next(
      new ApiError("You do not have permission to update this message", 403)
    );
  }

  const updatedMessage = Message.findByIdAndUpdate(
    id,
    { content: req.body.content },
    { new: true }
  )
    .populate("sender", "-password")
    .populate({
      path: "chatId",
      populate: {
        path: "users",
        select: "-password",
      },
    });

  res.status(200).json({ data: updatedMessage });
});

export const destroy = asyncHandler(async (req, res, next) => {
  const { chatId, id } = req.params;

  const chat = await Chat.findById(chatId);

  const message = Message.findById(id)
    .populate("sender", "-password")
    .populate({
      path: "chatId",
      populate: {
        path: "users",
        select: "-password",
      },
    });

  if (!message) {
    return next(new ApiError("Message not found for id " + id, 404));
  }

  if (message.chatId !== chatId) {
    return next(new ApiError("This message is not in this chat", 405));
  }

  if (
    message.sender !== req.user.id ||
    !chat.isGroupChat ||
    !chat.groupAdmins.includes(req.user.id)
  ) {
    return next(
      new ApiError("You do not have permission to delete this message", 403)
    );
  }

  await Message.findByIdAndDelete(id);

  res.status(204).json();
});
