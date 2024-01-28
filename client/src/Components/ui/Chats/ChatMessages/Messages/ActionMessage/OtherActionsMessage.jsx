import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function OtherActionsMessage({
  content,
  messageType,
  senderId,
}) {
  const { t } = useTranslation();
  const { chat } = useSelector((state) => state.chatMessages);
  const { user } = useSelector((state) => state.auth);

  const getUser = (id) => {
    const res = chat.users.find((user) => user._id === id) ?? "";
    return res.name;
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
    <div className="flex gap-1 flex-wrap justify-center">
      {user?.id === senderId ? (
        <>
          <div className="whitespace-nowrap">
            {t(isAdded ? "messageType.you_added" : "messageType.you_removed")}
          </div>
          <Link
            to={`/users/${content}`}
            className="text-message whitespace-nowrap"
          >
            {getUser(content)}
          </Link>
          <div className="whitespace-nowrap">{t(endMessage)}</div>
        </>
      ) : user?.id === content ? (
        <>
          <Link
            to={`/users/${senderId}`}
            className="text-message whitespace-nowrap"
          >
            {getUser(senderId)}
          </Link>
          <div className="whitespace-nowrap">
            {t(isAdded ? "messageType.added_you" : "messageType.removed_you")}
          </div>
          <div className="whitespace-nowrap">{t(endMessage)}</div>
        </>
      ) : (
        <>
          <Link
            to={`/users/${senderId}`}
            className="text-message whitespace-nowrap"
          >
            {getUser(senderId)}
          </Link>
          <div className="whitespace-nowrap">
            {t(isAdded ? "messageType.added" : "messageType.removed")}
          </div>
          <Link
            to={`/users/${content}`}
            className="text-message whitespace-nowrap"
          >
            {getUser(content)}
          </Link>
          <div className="whitespace-nowrap">{t(endMessage)}</div>
        </>
      )}
    </div>
  );
}
