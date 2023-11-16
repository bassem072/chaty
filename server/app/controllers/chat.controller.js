import asyncHandler from "express-async-handler";
import Chat from "../models/chat.model";
import { ApiFeatures } from "../utils/apiFeatures";
import { ApiError } from "../utils/apiError";
import Message from "../models/message.model";
import User from "../models/user.model";

export const index = asyncHandler(async (req, res) => {
  const docsCount = await Chat.countDocuments();
  const apiFeatures = new ApiFeatures(
    Chat.find({
      $text: {
        $search: req.query.keyword || "",
      },
      users: req.user.id,
    }),
    req.query
  )
    .paginate(docsCount)
    .filter()
    .limitFields()
    .sort();

  const { mongooseQuery, paginationResult } = apiFeatures;
  const chats = await mongooseQuery
    .populate("users", "-password")
    .populate("latestMessage");

  res.status(200).json({
    results: chats.length,
    paginationResult,
    data: chats,
  });
});

export const create = asyncHandler(async (req, res, next) => {
  const newChat = await Chat.create(req.chat);

  const chat = Chat.findById(newChat.id).populate("users", "-password");

  if (!chat) {
    return next(new ApiError("Can't create this chat", 404));
  }

  res.status(201).json({ data: chat });
});

export const show = asyncHandler(async (req, res, next) => {
  const chat = await Chat.findById(req.params.id)
    .populate("users", "-password")
    .populate("groupAdmins", "-password")
    .populate("latestMessage");

  if (!chat) {
    return next(new ApiError("Chat not found for id " + req.params.id, 404));
  }

  if (chat.users.includes(req.user.id)) {
    return next(
      new ApiError("You do not have permission to join this chat", 403)
    );
  }

  res.status(200).json({ data: chat });
});

export const fetch = asyncHandler(async (req, res, next) => {
  let chat = await Chat.findOne({
    users: [req.user.id, req.body.user],
    isGroupChat: false,
  });

  if (!chat) {
    const chatObj = new Chat({
      users: [req.user.id, req.body.user],
    });

    const addChat = await chatObj.save();

    chat = Chat.findById(addChat.id).populate("users", "-password");

    if (!chat) {
      return next(new ApiError("Can't create this chat", 404));
    }
  }

  res.status(200).json({ data: chat });
});

export const update = asyncHandler(async (req, res, next) => {
  const chat = await Chat.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .populate("users", "-password")
    .populate("groupAdmins", "-password")
    .populate("latestMessage");

  if (!chat) {
    return next(new ApiError("Chat not found for id " + req.params.id, 404));
  }

  res.status(200).json({ data: chat });
});

export const destroy = asyncHandler(async (req, res) => {
  await Message.deleteMany({ chatId: req.params.id });
  await Chat.findByIdAndDelete(req.user.id);

  res.status(204).json();
});

export const clear = asyncHandler(async (req, res) => {
  await Message.deleteMany({ chatId: req.params.id });

  res.status(204).json();
});

export const addUserToGroup = asyncHandler(async (req, res, next) => {
  const chat = await Chat.findByIdAndUpdate(
    req.params.id,
    {
      $addToSet: { users: req.body.user },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmins", "-password")
    .populate("latestMessage");

  if (!chat) {
    return next(new ApiError("Chat not found for id " + req.params.id, 404));
  }

  res.status(200).json({ data: chat });
});

export const removeUserFromGroup = asyncHandler(async (req, res, next) => {
  const chat = await Chat.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { groupAdmins: req.body.user, users: req.body.user },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmins", "-password")
    .populate("latestMessage");

  if (!chat) {
    return next(new ApiError("Chat not found for id " + req.params.id, 404));
  }

  res.status(200).json({ data: chat });
});

export const addAdminToGroup = asyncHandler(async (req, res, next) => {
  const chat = await Chat.findByIdAndUpdate(
    req.params.id,
    {
      $addToSet: { groupAdmins: req.body.user },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmins", "-password")
    .populate("latestMessage");

  if (!chat) {
    return next(new ApiError("Chat not found for id " + req.params.id, 404));
  }

  res.status(200).json({ data: chat });
});

export const removeAdminFromGroup = asyncHandler(async (req, res, next) => {
  const chat = await Chat.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { groupAdmins: req.body.user },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmins", "-password")
    .populate("latestMessage");

  if (!chat) {
    return next(new ApiError("Chat not found for id " + req.params.id, 404));
  }

  res.status(200).json({ data: chat });
});