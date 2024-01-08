import React, { useEffect } from "react";
import userPic from "../../../../../assets/images/users/user_5.png";
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
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearMessagesHistory } from "../../../../../slices/chatMessages";
import { useBackListener } from "../../../../../helpers/Hooks/useBackButton";

export default function ChatHeader() {
  const { i18n } = useTranslation();
  const { chat } = useSelector((state) => state.chatMessages);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.onpopstate = () => {
      dispatch(clearMessagesHistory());
      navigate("/chats", { replace: true });
    };
  }, [dispatch, navigate]);

  const title = chat.isGroupChat ? chat.name : chat.user.name;

  return (
    <div className="w-full h-20 sm:h-[100px] px-3 sm:px-6 border-b-[.2px] border-paragraph/10 flex justify-between items-center">
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          onClick={() => {
            dispatch(clearMessagesHistory());
          }}
          to="/chats"
          className="flex lg:hidden bg-sidebar px-1.5 sm:px-3 py-1.5 sm:py-3 rounded-full"
        >
          <FontAwesomeIcon
            icon={i18n.language === "ar" ? faAngleRight : faAngleLeft}
          />
        </Link>
        <img
          src={userPic}
          alt="user"
          className="rounded-full w-8 sm:w-10 h-8 sm:h-10"
        />
        <div className="flex items-center gap-2">
          <div className="font-medium sm:font-semibold text-sm w-20 min-[350px]:w-auto truncate">
            {title.substring(0, 15)}
          </div>
          <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-green-500 rounded-full"></div>
        </div>
      </div>
      <div className="flex items-center gap-4 sm:gap-10 text-paragraph/70">
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
