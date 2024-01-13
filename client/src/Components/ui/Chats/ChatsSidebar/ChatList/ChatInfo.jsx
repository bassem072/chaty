import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";

export default function ChatInfo({ chat }) {
  const { t, i18n } = useTranslation();
  moment.locale(i18n.language);

  const title = chat.isGroupChat ? chat.name : chat.user.name;

  const getSenderName = (id) => {
    // Ensure id is a string or object of user
    const userId = typeof id === "string" ? id : id.id;

    // Find the user in the chat users
    const user = chat.users.find((user) => user._id === userId);

    // If the user is found, return the first part of their name
    // If not, return an empty string or a default value
    return user ? user.name.split(" ")[0] : "";
  };

  /**
   * Function to determine the content of the latest message in a chat.
   * @returns {string} The content of the latest message.
   */
  const getLatestMessageContent = () => {
    let latestMessageContent = "";

    // Use a switch statement to handle different message types
    switch (chat.latestMessage.messageType) {
      case "create_group":
        // If the chat is a group chat and the latest message is of type 'create_group'
        latestMessageContent = t("messageType.create_group");
        break;
      case "create_chat":
        // If the chat is a group chat and the latest message is of type 'create_group'
        latestMessageContent = t("messageType.create_chat");
        break;
      case "text":
        // If the latest message is of type 'text'
        latestMessageContent = chat.latestMessage.content;
        break;
      default:
        latestMessageContent = "";
    }

    return latestMessageContent;
  };

  const time = moment(chat.latestMessage.createdAt).format("hh:mm A");

  return (
    <div className="w-full h-full flex justify-between items-center">
      <div className="h-full flex flex-col items-start justify-between">
        <div>{title}</div>
        <div className="w-[222px] text-paragraph/80 text-sm flex gap-1 truncate">
          {chat.isGroupChat && chat.latestMessage.messageType === "text" && (
            <div className="text-paragraph">{getSenderName(chat.latestMessage.sender)}:</div>
          )}
          <div>{getLatestMessageContent()}</div>
        </div>
      </div>
      <div className="h-full flex flex-col items-end justify-between">
        <div className="text-paragraph/50 text-xs">{time}</div>
        <div className="w-10 py-px bg-message/10 rounded-xl text-sm text-message font-semibold flex justify-center items-center">
          2
        </div>
      </div>
    </div>
  );
}
