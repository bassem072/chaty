import apiInstance from "../utils/apiInstance";

export const fetchMessagesService = async (
  chatId,
  { skip = 0, keyword = "", sort = "-latestMessage.createdAt", limit = 20 }
) => {
  const query = {
    keyword,
    skip,
    limit,
    sort,
  };
  const response = await apiInstance.get(`chats/${chatId}/messages/`, query);

  return response.data;
};

export const createMessageService = async (
  chatId,
  { content = "", messageType = "text", fileUrl = "" }
) => {
  const body = {
    content,
    messageType,
    fileUrl,
  };

  const response = await apiInstance.post(
    `chats/${chatId}/messages`,
    body
  );

  return response.data;
};

export const getMessageService = async (chatId, messageId) => {
  const response = await apiInstance.get(
    `chats/${chatId}/messages/${messageId}`
  );

  return response.data;
};

export const updateMessageService = async (
  chatId,
  messageId,
  { content = "" }
) => {
  const response = await apiInstance.put(
    `chats/${chatId}/messages/${messageId}`,
    { content }
  );

  return response.data;
};

export const deleteMessageService = async (chatId, messageId) => {
  const response = await apiInstance.delete(
    `chatMessages/${chatId}/messages/${messageId}`
  );

  return response.data;
};
