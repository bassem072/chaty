import asyncHandler from "express-async-handler";
import Chat from "../models/chat.model.js";
import { ApiFeatures } from "../utils/apiFeatures.js";
import { ApiError } from "../utils/apiError.js";
import Message from "../models/message.model.js";
import {
  ChatResponse,
  ChatsResponse,
  GroupAdminResponse,
  GroupGuestResponse,
  GroupResponse,
  GroupWaitingResponse,
} from "../utils/dto/chatResponseDTO.js";

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
    .sort("-LatestMessage.created")
    .skip(skip)
    .limit(limit)
    .populate("users", "-password")
    .populate("groupAdmins", "-password")
    .populate("latestMessage");

  res.status(200).json({
    data: ChatsResponse(chats, req.user.id),
  });
});

export const create = asyncHandler(async (req, res, next) => {
  const newChat = await Chat.create(req.chat);

  const chat = await Chat.findById(newChat.id).populate("users", "-password");

  if (!chat) {
    return next(new ApiError("Can't create this chat", 404));
  }

  if (chat.isGroupChat) {
    res.status(201).json({ data: GroupAdminResponse(chat) });
  } else {
    res.status(201).json({ data: ChatResponse(chat, req.user.id) });
  }
});

export const show = asyncHandler(async (req, res, next) => {
  const chat = await Chat.findById(req.params.id)
    .populate("users", "-password")
    .populate("groupAdmins", "-password")
    .populate("latestMessage");

  if (!chat) {
    return next(new ApiError("Chat not found for id " + req.params.id, 404));
  }

  if (chat.isGroupChat) {
    if (chat.groupAdmins.find((admin) => admin.id === req.user.id)) {
      res.status(200).json({ data: GroupAdminResponse(chat) });
    } else if (chat.users.find((user) => user.id === req.user.id)) {
      res.status(200).json({ data: GroupResponse(chat) });
    } else if (chat.waitingList.includes(req.user.id)) {
      res.status(200).json({ data: GroupWaitingResponse(chat) });
    } else {
      res.status(200).json({ data: GroupGuestResponse(chat) });
    }
  } else {
    if (
      chat.users.find((user) => {
        return user.id === req.user.id;
      }) === undefined
    ) {
      return next(
        new ApiError("You do not have permission to join this chat", 403)
      );
    } else {
      res.status(200).json({ data: ChatResponse(chat, req.user.id) });
    }
  }
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
    res.status(200).json({ data: ChatResponse(chat) });
  } else {
    res.status(200).json({ data: ChatResponse(chat) });
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

  res.status(200).json({ data: GroupAdminResponse(chat) });
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

  res.status(200).json({ data: GroupAdminResponse(chat) });
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

  res.status(200).json({ data: GroupAdminResponse(chat) });
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

  res.status(200).json({ data: GroupAdminResponse(chat) });
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

  res.status(200).json({ data: GroupAdminResponse(chat) });
});

export const joinGroup = asyncHandler(async (req, res, next) => {
  const chat = await Chat.findById(req.params.id);

  if (!chat) {
    return next(new ApiError("Chat not found for id " + req.params.id, 404));
  }

  if (!chat.isGroupChat) {
    return next(new ApiError("This is not group " + req.params.id, 404));
  }

  if (chat.users.includes(req.user.id)) {
    return next(
      new ApiError("You already user in this group " + req.params.id, 403)
    );
  }

  if (chat.waitingList.includes(req.user.id)) {
    return next(
      new ApiError(
        "You already join this group and waiting admin to accept you " +
          req.params.id,
        403
      )
    );
  }

  const joinedGroup = await Chat.findByIdAndUpdate(
    req.params.id,
    {
      $addToSet: { waitingList: req.body.user },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmins", "-password")
    .populate("latestMessage");

  res.status(200).json({ data: GroupWaitingResponse(joinedGroup) });
});

export const cancelJoinGroup = asyncHandler(async (req, res, next) => {
  const chat = await Chat.findById(req.params.id);

  if (!chat) {
    return next(new ApiError("Chat not found for id " + req.params.id, 404));
  }

  if (!chat.isGroupChat) {
    return next(new ApiError("This is not group " + req.params.id, 404));
  }

  if (!chat.waitingList.includes(req.user.id)) {
    return next(
      new ApiError(
        "You are not in waiting list in this group: " + req.params.id,
        403
      )
    );
  }
  const canceledGroup = await Chat.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { waitingList: req.body.user },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmins", "-password")
    .populate("latestMessage");

  res.status(200).json({ data: GroupWaitingResponse(canceledGroup) });
});

export const leaveGroup = asyncHandler(async (req, res, next) => {
  const chat = await Chat.findById(req.params.id);

  if (!chat) {
    return next(new ApiError("Chat not found for id " + req.params.id, 404));
  }

  if (!chat.isGroupChat) {
    return next(new ApiError("This is not group " + req.params.id, 404));
  }

  if (!chat.users.includes(req.user.id)) {
    return next(
      new ApiError("You are not user in this group " + req.params.id, 403)
    );
  }

  await Chat.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { users: req.body.user, groupAdmins: req.user.id },
    },
    {
      new: true,
    }
  );

  res.status(200).json({ data: "You are leaved this group" });
});

export const leaveAdminGroup = asyncHandler(async (req, res, next) => {
  const chat = await Chat.findById(req.params.id);

  if (!chat) {
    return next(new ApiError("Chat not found for id " + req.params.id, 404));
  }

  if (!chat.isGroupChat) {
    return next(new ApiError("This is not group " + req.params.id, 404));
  }

  if (!chat.users.includes(req.user.id)) {
    return next(
      new ApiError("You are not user in this group " + req.params.id, 403)
    );
  }

  if (!chat.groupAdmins.includes(req.user.id)) {
    return next(
      new ApiError("You are not admin in this group " + req.params.id, 403)
    );
  }

  const userChat = await Chat.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { groupAdmins: req.user.id },
    },
    {
      new: true,
    }
  );

  res.status(200).json({ data: GroupResponse(userChat) });
});
