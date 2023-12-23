import React from "react";
import user from "../../../../../assets/images/users/user_5.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faEllipsis,
  faPhone,
  faSearch,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function ChatHeader() {
  const { i18n } = useTranslation();
  
  return (
    <div className="w-full h-[100px] px-6 border-b-[.2px] border-paragraph/10 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Link to="/chats" className="flex lg:hidden bg-sidebar px-3 py-2 rounded-full">
          <FontAwesomeIcon icon={i18n.language === "ar" ? faAngleRight : faAngleLeft} />
        </Link>
        <img
          src={user}
          alt="user"
          width={38}
          height={38}
          className="rounded-full"
        />
        <div className="flex items-center gap-2">
          <div className="font-semibold">Bassem Elsayed</div>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
      </div>
      <div className="flex items-center gap-10 text-paragraph/70">
        <div className="hover:text-paragraph transition-all duration-300 cursor-pointer">
          <FontAwesomeIcon icon={faSearch} size="lg" />
        </div>
        <div className="hover:text-paragraph transition-all duration-300 cursor-pointer">
          <FontAwesomeIcon icon={faPhone} size="lg" />
        </div>
        <div className="hover:text-paragraph transition-all duration-300 cursor-pointer">
          <FontAwesomeIcon icon={faVideo} size="lg" />
        </div>
        <div className="hover:text-paragraph transition-all duration-300 cursor-pointer">
          <FontAwesomeIcon icon={faEllipsis} size="lg" />
        </div>
      </div>
    </div>
  );
}
