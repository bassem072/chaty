import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function CreateGroupMessage({ content }) {
  const { t } = useTranslation();
  const { chat } = useSelector((state) => state.chatMessages);
  const { user } = useSelector((state) => state.auth);

  const getUser = (users, id) => {
    const res = users.find((user) => user._id === id) ?? "";
    return res._id === user.id ? "You" : res.name;
  };

  return (
    <div>
      {t("messageType.create_group")}
      <Link to={`/users/${content}`} className="text-message">
        {getUser(chat.groupAdmins, content)}
      </Link>
    </div>
  );
}
