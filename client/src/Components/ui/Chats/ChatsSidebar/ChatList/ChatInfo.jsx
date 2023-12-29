import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";

export default function ChatInfo({ chat }) {
  const { i18n } = useTranslation();
  moment.locale(i18n.language)
  const time = moment(chat.latestMessage.createdDate).format("hh:mm A");
  return (
    <div className="w-full h-full flex justify-between items-center">
      <div className="h-full flex flex-col items-start justify-between">
        <div>{chat.chatType === "groups" ? chat.name : "Bassem Elsayed"}</div>
        <div className="text-paragraph/50 text-sm flex gap-1 truncate">
          {chat.chatType === "groups" && <div className="text-paragraph/70">Bassem : </div>}
          <div>{chat.latestMessage.content.substring(0, 24)}</div>
        </div>
      </div>
      <div className="h-full flex flex-col items-end justify-between">
        <div className="text-paragraph/50 text-xs">{time}</div>
        <div className="w-full px-0.5 py-px bg-message/10 rounded-xl text-sm text-message font-semibold flex justify-center items-center">
          2
        </div>
      </div>
    </div>
  );
}
