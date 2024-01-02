import asyncHandler from "express-async-handler";
import Chat from "../models/chat.model.js";
import { ApiFeatures } from "../utils/apiFeatures.js";
import { ApiError } from "../utils/apiError.js";
import Message from "../models/message.model.js";

export const index = asyncHandler(async (req, res) => {
  const limit = req.query.limit ?? 10;
  const skip = req.query.skip ?? 0;
  const keyword = req.query.keyword;

  const filter = {
    users: req.user.id,
  };

  if (keyword) {
    filter["$text"] = {
      $search: keyword,
    };
  }

  if (req.query.hasOwnProperty("isGroupChat")) {
    filter.isGroupChat = req.query.isGroupChat;
  }

  const chats = await Chat.find(filter)
    .sort("-created")
    .skip(skip)
    .limit(limit)
    .populate("users", "-password")
    .populate("groupAdmins", "-password")
    .populate("latestMessage");

  res.status(200).json({
    data: chats,
  });

  console.log(chats);
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
  })
    .populate("users", "-password")
    .populate("groupAdmins", "-password")
    .populate("latestMessage");

  if (!chat) {
    const chatObj = new Chat({
      users: [req.user.id, req.body.user],
    });

    const addChat = await chatObj.save();

    const createChatMessage = new Message({
      sender: req.user.id,
      messageType: "create_chat",
      chatId: addChat.id,
      content: "",
    });

    const message = await createChatMessage.save();

    chat = await Chat.findByIdAndUpdate(
      addChat.id,
      {
        latestMessage: message.id,
      },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmins", "-password")
      .populate("latestMessage");

    if (!chat) {
      return next(new ApiError("Can't create this chat", 404));
    }
    res.status(200).json({ data: chat });
  } else {
    res.status(200).json({ data: chat });
  }
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
