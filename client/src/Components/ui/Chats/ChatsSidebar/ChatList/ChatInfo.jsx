import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function ChatInfo({ chat }) {
  const { i18n } = useTranslation();
  const { user } = useSelector((state) => state.auth);
  moment.locale(i18n.language);

  const title = chat.isGroupChat
    ? chat.name
    : chat.users[0]._id === user.id
    ? chat.users[1].name
    : chat.users[0].name;

  const content = () => {
    if (chat.isGroupChat) {
      if (chat.latestMessage.messageType === "create_group") {
        return "You are now connected, You can chat now.";
      } else if (chat.latestMessage.messageType === "text") {
        return chat.latestMessage.content;
      }
    } else {
      if (chat.latestMessage.messageType === "create_chat") {
        return "You are now connected, You can chat now.";
      } else if (chat.latestMessage.messageType === "text") {
        return chat.latestMessage.content;
      }
    }
  };
  const time = moment(chat.latestMessage.createdAt).format("hh:mm A");

  return (
    <div className="w-full h-full flex justify-between items-center">
      <div className="h-full flex flex-col items-start justify-between">
        <div>{title}</div>
        <div className="w-[222px] text-paragraph/50 text-sm flex gap-1 whitespace-nowrap overflow-hidden text-ellipsis">
          {content()}
          {/* {chat.chatType === "groups" && (
            <div className="text-paragraph/70">Bassem : </div>
          )}
          <div>{chat.latestMessage.content.substring(0, 24)}</div> */}
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
