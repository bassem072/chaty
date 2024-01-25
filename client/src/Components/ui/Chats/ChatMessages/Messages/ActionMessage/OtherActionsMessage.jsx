import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function OtherActionsMessage({ content, messageType, senderId }) {
  const { t } = useTranslation();
  const { chat } = useSelector((state) => state.chatMessages);
  const { user } = useSelector((state) => state.auth);

  const getUser = (id) => {
    const res = chat.users.find((user) => user._id === id) ?? "";
    return res.name;
  };

  return (
    <div className="flex gap-1">
      {user?.id === senderId ? (
        <div>You</div>
      ) : (
        <Link to={`/users/${senderId}`} className="text-message">
          {getUser(senderId)}
        </Link>
      )}
      {t("messageType.create_group")}
      {user?.id === content ? (
        <div>You</div>
      ) : (
        <Link to={`/users/${content}`} className="text-message">
          {getUser(content)}
        </Link>
      )}
    </div>
  );
}
