import React from "react";
import CreateChatMessage from "./CreateChatMessage";
import CreateGroupMessage from "./CreateGroupMessage";
import { useTranslation } from "react-i18next";
import moment from "moment";
import OtherActionsMessage from "./OtherActionsMessage";

export default function ActionMessage({ message, checkShow, isNewDay }) {
  const { i18n } = useTranslation();
  const day = moment(message.createdAt).format(
    i18n.language === "ar" ? "yyyy/MM/DD" : "DD/MM/yyyy"
  );

  const content = () => {
    switch (message.messageType) {
      case "create_chat": {
        return <CreateChatMessage />;
      }
      case "create_group": {
        return <CreateGroupMessage content={message.content} />;
      }
      default: {
        return <OtherActionsMessage
            content={message.content}
            messageType={message.messageType}
            senderId={message.sender.id || message.sender._id}
        />
      }
    }
  };
  return (
    <>
      {isNewDay && (
        <div className="w-full flex items-center my-2">
          <div className="w-full h-[2px] bg-sidebar/50"></div>
          <div className="px-3 py-2 bg-sidebar/50 rounded-2xl text-sm">
            {day}
          </div>
          <div className="w-full h-[2px] bg-sidebar/50"></div>
        </div>
      )}
      <div className="text-sm text-paragraph/70 py-2 flex justify-center items-center gap-1">
        {content()}
      </div>
    </>
  );
}
