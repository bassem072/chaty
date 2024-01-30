import React from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

export default function ActionMessage({ chat }) {
    const { t } = useTranslation();
    const { user } = useSelector((state) => state.auth);
    const content = chat.latestMessage.content;
    const messageType = chat.latestMessage.messageType;
    const senderId = chat.latestMessage.sender._id;
    console.log(chat);

    const getUser = (id) => {
      console.log(chat.latestMessage);
      const res = chat.users.find((user) => user._id === id) ?? "";
      return res.name.split(" ")[0];
    };

    const isAdded = ["add_admin_to_group", "add_user_to_group"].includes(
      messageType
    );
    const isAdmins = ["add_admin_to_group", "remove_admin_from_group"].includes(
      messageType
    );

    const endMessage = isAdmins
      ? isAdded
        ? "messageType.to_group_admins"
        : "messageType.from_group_admins"
      : isAdded
      ? "messageType.to_group"
      : "messageType.from_group";
  return (
    <div className="flex gap-1 justify-center">
      {user?.id === senderId ? (
        <>
          <div className="whitespace-nowrap">
            {t(isAdded ? "messageType.you_added" : "messageType.you_removed")}
          </div>
          <div className="font-semibold whitespace-nowrap">
            {getUser(content)}
          </div>
          <div className="whitespace-nowrap">{t(endMessage)}</div>
        </>
      ) : user?.id === content ? (
        <>
          <div className="font-semibold whitespace-nowrap">
            {getUser(senderId)}
          </div>
          <div className="whitespace-nowrap">
            {t(isAdded ? "messageType.added_you" : "messageType.removed_you")}
          </div>
          <div className="whitespace-nowrap">{t(endMessage)}</div>
        </>
      ) : (
        <>
          <div className="font-semibold whitespace-nowrap">
            {getUser(senderId)}
          </div>
          <div className="whitespace-nowrap">
            {t(isAdded ? "messageType.added" : "messageType.removed")}
          </div>
          <div className="font-semibold whitespace-nowrap">
            {getUser(content)}
          </div>
          <div className="whitespace-nowrap">{t(endMessage)}</div>
        </>
      )}
    </div>
  );
}
