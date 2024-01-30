import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import MembersListItem from "./MembersListItem";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function MembersList({ setIsAddUser  }) {
  const { chat } = useSelector((state) => state.chatMessages);
  const { user } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  const sortMembers = () => {
    return chat.users.filter(
      (chatUser) =>
        chat.groupAdmins.findIndex((admin) => admin._id === chatUser._id) === -1
    );
  };

  const isAdmin = () =>
    chat.groupAdmins.findIndex((admin) => admin._id === user.id) !== -1;

  return (
    <div className="w-full h-full flex flex-col whitespace-nowrap overflow-hidden scrollbar">
      <div className="relative py-3">
        <div className="text-2xl font-semibold">{t("members")}</div>
        {isAdmin() && (
          <button
            onClick={() => setIsAddUser(true)}
            className="absolute w-10 h-10 top-1/2 -translate-y-1/2 right-2"
          >
            <FontAwesomeIcon icon={faUserPlus} />
          </button>
        )}
      </div>
      <div className="w-full p-3 ">
        <div className="w-full h-[1px] bg-paragraph/50"></div>
      </div>
      <div className="w-full flex flex-col gap-3 whitespace-nowrap overflow-auto scrollbar">
        {chat.groupAdmins.map((user, index) => (
          <MembersListItem
            key={index}
            user={user}
            chatId={chat.id}
            isAdmin={true}
            haveAccess={isAdmin()}
          />
        ))}
        {sortMembers().map((user, index) => (
          <MembersListItem
            key={index}
            user={user}
            chatId={chat.id}
            isAdmin={false}
            haveAccess={isAdmin()}
          />
        ))}
      </div>
    </div>
  );
}
