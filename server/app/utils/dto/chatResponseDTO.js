export const ChatResponse = (chat, id) => {
  return {
    id: chat._id,
    isGroupChat: chat.isGroupChat,
    user: chat.users[0].id === id ? chat.users[1] : chat.users[0],
    latestMessage: chat.latestMessage,
    createdAt: chat.createdAt,
  };
};
export const GroupResponse = (chat) => {
  return {
    id: chat._id,
    isGroupChat: chat.isGroupChat,
    name: chat.name,
    users: chat.users,
    status: "user",
    groupAdmins: chat.groupAdmins,
    chatImage: chat.chatImage,
    latestMessage: chat.latestMessage,
    createdAt: chat.createdAt,
  };
};

export const GroupAdminResponse = (chat) => {
  const groupChat = GroupResponse(chat);
  groupChat.status = "admin";
  groupChat.waitingList = chat.waitingList;

  return groupChat;
};

export const GroupWaitingResponse = (chat) => {
  return {
    id: chat._id,
    isGroupChat: chat.isGroupChat,
    name: chat.name,
    status: "waiting",
    users: chat.users,
    groupAdmins: chat.groupAdmins,
    chatImage: chat.chatImage,
  };
};

export const GroupGuestResponse = (chat) => {
  return {
    id: chat._id,
    isGroupChat: chat.isGroupChat,
    name: chat.name,
    status: "guest",
    users: chat.users,
    groupAdmins: chat.groupAdmins,
    chatImage: chat.chatImage,
  };
};

export const ChatsResponse = (chats, id) => {
  return chats.map((chat) => {
    if (chat.isGroupChat) {
      if (chat.groupAdmins.find((admin) => admin._id === id)) {
        return GroupAdminResponse(chat);
      } else {
        return GroupResponse(chat);
      }
    } else {
      return ChatResponse(chat, id);
    }
  });
};
