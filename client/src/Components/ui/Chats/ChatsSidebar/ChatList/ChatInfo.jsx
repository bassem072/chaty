import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import ActionMessage from "./ActionMessage";
import { useSelector } from "react-redux";

export default function ChatInfo({ chat }) {
  const { t, i18n } = useTranslation();
  const { user: me } = useSelector(state => state.auth);
  moment.locale(i18n.language);

  const title = chat.isGroupChat ? chat.name : chat.user.name;
  const usersTyping = chat.typing ? Object.values(chat.typing) : [];

  const getSenderName = (id) => {
    // Find the user in the chat users
    const user = chat.latestMessage.sender._id === me?.id ? me : chat.users.find((user) => user._id === id);

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
        latestMessageContent = <ActionMessage chat={chat} />;
    }

    return latestMessageContent;
  };

  const time = moment(chat.latestMessage.createdAt).format("hh:mm A");

  return (
    <div className="w-full h-full flex justify-between items-center">
      <div className="h-full flex flex-col items-start justify-between">
        <div>{title}</div>
        <div className="w-[222px] text-paragraph/80 text-sm flex gap-1 truncate">
          {chat.isGroupChat && usersTyping.length > 0 ? (
            <div className="text-paragraph">
              {usersTyping[0].name.split(" ")[0]}:
            </div>
          ) : (
            chat.isGroupChat &&
            chat.latestMessage.messageType === "text" && (
              <div className="text-paragraph">
                {getSenderName(chat.latestMessage.sender._id)}:
              </div>
            )
          )}
          <div>
            {usersTyping.length > 0 ? t("typing") : getLatestMessageContent()}
          </div>
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
