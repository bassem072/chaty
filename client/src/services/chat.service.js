import apiInstance from "../utils/apiInstance";

export const fetchChatsService = async ({
  skip = 0,
  keyword = "",
  sort = "-latestMessage.createdAt",
  limit = 20,
  isGroupChat,
}) => {
  const query = {
    keyword,
    skip,
    limit,
    sort,
  };

  if (isGroupChat !== null && isGroupChat !== undefined) {
    query.isGroupChat = isGroupChat;
  }
  const response = await apiInstance.get(`chats`, query);

  return response.data;
};

export const createChatService = async ({ userId, isGroupChat = false, name = "" }) => {
  const body = {
    isGroupChat,
    users: [userId],
  };

  if(isGroupChat) {
    body.name = name;
  }

  const response = await apiInstance.post(`chats`, body);

  return response.data;
};

export const getChatService = async (chatId) => {
  const response = await apiInstance.get(`chats/${chatId}`);

  return response.data;
};

export const updateGroupService = async (groupId, { name }) => {
  const body = {
    name,
  };
  const response = await apiInstance.put(`chats/${groupId}`, body);

  return response.data;
};

export const deleteChatService = async (groupId) => {
  const response = await apiInstance.delete(`chats/${groupId}`);

  return response.data;
};

export const clearChatService = async (groupId) => {
  const response = await apiInstance.post(`chats/${groupId}/clear`);

  return response.data;
};

export const addUserToGroupService = async (groupId, { userId }) => {
  const response = await apiInstance.post(`chats/${groupId}/users/add`, {
    user: userId,
  });

  return response.data;
};

export const removeUserFromGroupService = async (groupId, { user }) => {
  const response = await apiInstance.post(`chats/${groupId}/users/remove`, {
    user,
  });

  return response.data;
};

export const addAdminToGroupService = async (groupId, { user }) => {
  const response = await apiInstance.post(`chats/${groupId}/admins/add`, {
    user,
  });

  return response.data;
};

export const removeAdminFromGroupService = async (groupId, { user }) => {
  const response = await apiInstance.post(`chats/${groupId}/admins/remove`, {
    user,
  });

  return response.data;
};