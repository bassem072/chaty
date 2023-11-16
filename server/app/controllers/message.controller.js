import asyncHandler from "express-async-handler";
import Chat from "../models/chat.model";
import { ApiError } from "../utils/apiError";
import Message from "../models/message.model";
import { ApiFeatures } from "../utils/apiFeatures";

export const index = asyncHandler(async (req, res, next) => {
  const { chatId } = req.params;

  const docsCount = await Message.countDocuments();
  const apiFeatures = new ApiFeatures(
    Message.find({
      $text: {
        $search: req.query.keyword || "",
      },
      chatId,
    }),
    req.query
  )
    .paginate(docsCount)
    .filter()
    .limitFields()
    .sort();

  const { mongooseQuery, paginationResult } = apiFeatures;
  const messages = await mongooseQuery
    .populate("sender", "-password")
    .populate({
      path: "chatId",
      populate: {
        path: "users",
        select: "-password",
      },
    });

  res.status(200).json({
    results: messages.length,
    paginationResult,
    data: messages,
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

  let message = await messageObj.save();
  message = message.populate("sender", "-password").populate({
    path: "chatId",
    populate: {
      path: "users",
      select: "-password",
    },
  });

  res.status(201).json({ data: message });
});

export const show = asyncHandler(async (req, res, next) => {
  const { chatId, id } = req.params;

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
