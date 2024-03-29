import {
  faEllipsis,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Members from "./Members";
import ChangeChatImage from "./ChangeChatImage";
import { useSelector } from "react-redux";

export default function OptionsMenu({ chat, setShowMembers, onImageChange }) {
  const [show, setShow] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const menuRef = useRef();
  const { i18n, t } = useTranslation();

  const isAdmin = () =>
    chat?.groupAdmins.findIndex((admin) => admin._id === user.id) !== -1;

  const handleOnImageChange = (event) => {
    onImageChange(event);
    setShow(false);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div
      ref={menuRef}
      className="relative hover:text-paragraph transition-all duration-300 cursor-pointer"
    >
      <button onClick={() => setShow(!show)}>
        <FontAwesomeIcon icon={faEllipsis} size="lg" />
      </button>
      {show && (
        <div
          className={
            "absolute w-40 top-10 z-10 p-1 bg-[#303841] rounded-md transition-all duration-700 " +
            (i18n.dir() === "rtl" ? "left-0" : "right-0")
          }
        >
          {chat.isGroupChat && (
            <Members
              chat={chat}
              setShowMembers={setShowMembers}
              setShow={setShow}
            />
          )}
          {chat.isGroupChat && isAdmin() && chat.isGroupChat && (
            <ChangeChatImage onImageChange={handleOnImageChange} />
          )}
          <button
            onClick={() => {}}
            className="w-full flex justify-between items-center text-paragraph/70 my-1 py-1.5 px-2 rounded-md hover:bg-sidebar"
          >
            <div>{t("leave")}</div>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </button>
        </div>
      )}
    </div>
  );
}
