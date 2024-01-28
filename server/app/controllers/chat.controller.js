import asyncHandler from "express-async-handler";
import Chat from "../models/chat.model.js";
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
import User from "../models/user.model.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

export const index = asyncHandler(async (req, res) => {
  const limit = req.query.limit ?? 100;
  const skip = req.query.skip ?? 0;
  const keyword = req.query.keyword ?? "";
  const isGroupChat = req.query.isGroupChat ?? null;

  const filter = {
    users: req.user.id,
  };

  if (isGroupChat !== null) {
    filter.isGroupChat = isGroupChat;
    filter.name = { $regex: keyword, $options: "i" };
  }

  if (keyword) {
    filter["$text"] = {
      $search: keyword,
    };
  }

  if (req.query.hasOwnProperty("isGroupChat")) {
    filter.isGroupChat = req.query.isGroupChat;
  }

  const chats = await Chat.find(filter)
    .sort("-LatestMessage.createdAt")
    .skip(skip)
    .limit(limit)
    .populate("users", "-password")
    .populate("groupAdmins", "-password")
    .populate({
      path: "latestMessage",
      populate: [
        {
          path: "sender",
          select: "-password",
        },
      ],
    });

  res.status(200).json({
    data: ChatsResponse(chats, req.user.id),
  });
});

export const create = asyncHandler(async (req, res, next) => {
  const chatObj = new Chat(req.chat);

  const addChat = await chatObj.save();

  if (!addChat) {
    return next(new ApiError("Can't create this chat", 404));
  }

  const createChatMessage = new Message({
    sender: req.user.id,
    messageType: addChat.isGroupChat ? "create_group" : "create_chat",
    chatId: addChat.id,
    content: req.user.id,
  });

  const message = await createChatMessage.save();

  const chat = await Chat.findByIdAndUpdate(
    addChat.id,
    {
      latestMessage: message.id,
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmins", "-password")
    .populate({
      path: "latestMessage",
      populate: [
        {
          path: "sender",
          select: "-password",
        },
      ],
    });

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
    .populate({
      path: "latestMessage",
      populate: [
        {
          path: "sender",
          select: "-password",
        },
      ],
    });

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
    .populate({
      path: "latestMessage",
      populate: [
        {
          path: "sender",
          select: "-password",
        },
      ],
    });

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
      .populate({
        path: "latestMessage",
        populate: [
          {
            path: "sender",
            select: "-password",
          },
        ],
      });

    if (!chat) {
      return next(new ApiError("Can't create this chat", 404));
    }
    res.status(200).json({ data: ChatResponse(chat, req.user.id) });
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
    .populate({
      path: "latestMessage",
      populate: [
        {
          path: "sender",
          select: "-password",
        },
      ],
    });

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
  const updatedChat = await Chat.findByIdAndUpdate(
    req.params.id,
    {
      $addToSet: { users: req.body.user },
    },
    {
      new: true,
    }
  );

  if (!updatedChat) {
    return next(new ApiError("Chat not found for id " + req.params.id, 404));
  }

  const createChatMessage = new Message({
    sender: req.user.id,
    messageType: "add_user_to_group",
    chatId: updatedChat.id,
    content: req.body.user,
  });

  const message = await createChatMessage.save();

  const chat = await Chat.findByIdAndUpdate(
    updatedChat.id,
    {
      latestMessage: message.id,
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmins", "-password")
    .populate({
      path: "latestMessage",
      populate: [
        {
          path: "sender",
          select: "-password",
        },
      ],
    });

  if (!chat) {
    return next(new ApiError("Can't create this chat", 404));
  }

  res.status(201).json({ data: GroupAdminResponse(chat) });
});

export const removeUserFromGroup = asyncHandler(async (req, res, next) => {
  const updatedChat = await Chat.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { groupAdmins: req.body.user, users: req.body.user },
    },
    {
      new: true,
    }
  );

  if (!updatedChat) {
    return next(new ApiError("Chat not found for id " + req.params.id, 404));
  }

  const createChatMessage = new Message({
    sender: req.user.id,
    messageType: "remove_user_from_group",
    chatId: updatedChat.id,
    content: req.body.user,
  });

  const message = await createChatMessage.save();

  const chat = await Chat.findByIdAndUpdate(
    updatedChat.id,
    {
      latestMessage: message.id,
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmins", "-password")
    .populate({
      path: "latestMessage",
      populate: [
        {
          path: "sender",
          select: "-password",
        },
      ],
    });

  if (!chat) {
    return next(new ApiError("Can't create this chat", 404));
  }

  res.status(201).json({ data: GroupAdminResponse(chat) });
});

export const addAdminToGroup = asyncHandler(async (req, res, next) => {
  const updatedChat = await Chat.findByIdAndUpdate(
    req.params.id,
    {
      $addToSet: { groupAdmins: req.body.user },
    },
    {
      new: true,
    }
  );

  if (!updatedChat) {
    return next(new ApiError("Chat not found for id " + req.params.id, 404));
  }

  const createChatMessage = new Message({
    sender: req.user.id,
    messageType: "add_admin_to_group",
    chatId: updatedChat.id,
    content: req.body.user,
  });

  const message = await createChatMessage.save();

  const chat = await Chat.findByIdAndUpdate(
    updatedChat.id,
    {
      latestMessage: message.id,
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmins", "-password")
    .populate({
      path: "latestMessage",
      populate: [
        {
          path: "sender",
          select: "-password",
        },
      ],
    });

  if (!chat) {
    return next(new ApiError("Can't create this chat", 404));
  }

  res.status(201).json({ data: GroupAdminResponse(chat) });
});

export const removeAdminFromGroup = asyncHandler(async (req, res, next) => {
  const updatedChat = await Chat.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { groupAdmins: req.body.user },
    },
    {
      new: true,
    }
  );

  if (!updatedChat) {
    return next(new ApiError("Chat not found for id " + req.params.id, 404));
  }

  const createChatMessage = new Message({
    sender: req.user.id,
    messageType: "remove_admin_from_group",
    chatId: updatedChat.id,
    content: req.body.user,
  });

  const message = await createChatMessage.save();

  const chat = await Chat.findByIdAndUpdate(
    updatedChat.id,
    {
      latestMessage: message.id,
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmins", "-password")
    .populate({
      path: "latestMessage",
      populate: [
        {
          path: "sender",
          select: "-password",
        },
      ],
    });

  if (!chat) {
    return next(new ApiError("Can't create this chat", 404));
  }

  res.status(201).json({ data: GroupAdminResponse(chat) });
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

export const approveUserGroup = asyncHandler(async (req, res, next) => {
  const oldChat = await Chat.findById(req.params.id);

  if (!oldChat) {
    return next(new ApiError("Chat not found for id " + req.params.id, 404));
  }

  if (!oldChat.isGroupChat) {
    return next(new ApiError("This is not a group chat", 405));
  }

  if (!oldChat.users.includes(req.user.id)) {
    return next(
      new ApiError("You do not have permission to delete this chat", 403)
    );
  }

  if (!oldChat.groupAdmins.includes(req.user.id)) {
    return next(new ApiError("You are not admin", 403));
  }

  const user = User.findById(req.body.user);

  if (!user) {
    return next(
      new ApiError("User not found for this id: " + req.body.user, 404)
    );
  }

  if (!oldChat.waitingList.includes(user.id)) {
    return next(new ApiError("User not request to join this group", 404));
  }

  const updatedChat = await Chat.findByIdAndUpdate(
    req.params.id,
    {
      $addToSet: { users: req.body.user },
      $pull: { waitingList: req.body.user },
    },
    {
      new: true,
    }
  );

  const createChatMessage = new Message({
    sender: req.user.id,
    messageType: "join",
    chatId: updatedChat.id,
    content: req.body.user,
  });

  const message = await createChatMessage.save();

  const chat = await Chat.findByIdAndUpdate(
    updatedChat.id,
    {
      latestMessage: message.id,
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmins", "-password")
    .populate({
      path: "latestMessage",
      populate: [
        {
          path: "sender",
          select: "-password",
        },
      ],
    });

  if (!chat) {
    return next(new ApiError("Can't create this chat", 404));
  }

  res.status(201).json({ data: GroupAdminResponse(chat) });
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

export const uploadChatImage = async (req, res, next) => {
  console.log(req.file);
  if (req.file) {
    const chat = await Chat.findByIdAndUpdate(
      req.chat.id,
      { chatImage: req.file.filename },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmins", "-password")
      .populate("latestMessage");

    if (!chat) {
      return next(new ApiError("Chat not found"), 404);
    }

    res.status(200).json({ data: GroupResponse(chat) });
  } else {
    return next(new ApiError("chatImage is required"), 400);
  }
};

export const getChatImage = async (req, res, next) => {
  const { id } = req.params;
  let chat = await Chat.findById(id);

  if (!chat) {
    return next(new ApiError("User not found for id: " + id, 404));
  }

  //console.log(chat.chatImage);
  if (chat.chatImage === "default") {
    return next(new ApiError("No profile image here!"), 404);
  }

  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  //console.log(__dirname);
  const filePath = path.join(
    __dirname,
    "..",
    "uploads",
    "chatImages",
    chat.chatImage
  );

  const r = fs.createReadStream(filePath);
  r.pipe(res);
};
