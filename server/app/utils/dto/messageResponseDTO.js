import { ChatResponse, GroupResponse } from "./chatResponseDTO.js";
import { userResponse } from "./userResponseDTO.js";

export const MessageResponse = (message, id) => {
  const resMessage = {
    id: message._id,
    content: message.content,
    messageType: message.messageType,
    chatId: message.chatId.isGroupChat ? GroupResponse(message.chatId) : ChatResponse(message.chatId, id),
    sender: userResponse(message.sender),
    createdAt: message.createdAt,
  };

  if (message.fileUrl) {
    resMessage.fileUrl = message.fileUrl;
  }

  if (message.seen) {
    resMessage.seen = message.seen;
  }

  return resMessage;
};

export const MessagesResponse = (messages, id) => {
  return messages.map((message) => MessageResponse(message, id));
};
