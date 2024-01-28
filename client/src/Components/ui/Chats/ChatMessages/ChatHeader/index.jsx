import React, { useEffect, useState } from "react";
import userPic from "../../../../../assets/images/users/avatar.png";
import groupPic from "../../../../../assets/images/users/chat.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPhone,
  faSearch,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearMessagesHistory } from "../../../../../slices/chatMessages";
import OptionsMenu from "./OptionsMenu";
import Members from "./Members";
import SetChatImage from "./SetChatImage";
import { getChatPicService } from "../../../../../services/chat.service";
import { getUserImageService } from "../../../../../services/user.service";

export default function ChatHeader() {
  const { i18n } = useTranslation();
  const { chat } = useSelector((state) => state.chatMessages);
  const { onlineUsers } = useSelector((state) => state.onlineUsers);
  const [showMembers, setShowMembers] = useState(false);
  const [chatPicture, setChatPicture] = useState(
    chat.isGroupChat ? groupPic : userPic
  );
  const [showEditChatPic, setShowEditChatPic] = useState(false);
  const title = chat.isGroupChat ? chat.name : chat.user.name;
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isActive = chat.isGroupChat
    ? false
    : onlineUsers.includes(chat.user._id);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setShowEditChatPic(true);
    }
  };

  useEffect(() => {
    window.onpopstate = () => {
      dispatch(clearMessagesHistory());
      navigate("/chats", { replace: true });
    };
  }, [dispatch, navigate]);

  useEffect(() => {
    if (chat.isGroupChat) {
      if (chat.chatImage !== "default") {
        getChatPicService(chat.id)
          .then((blob) => {
            const url = URL.createObjectURL(blob);
            setChatPicture(url);
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      }
    } else {
      if (chat.user.profileImage !== "default") {
        getUserImageService(chat.user._id)
          .then((blob) => {
            const url = URL.createObjectURL(blob);
            setChatPicture(url);
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      }
    }
  }, [chat]);

  return (
    <div className="w-full h-20 sm:h-[100px] px-3 sm:px-6 border-b-[.2px] border-paragraph/10 flex justify-between items-center">
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          to="/chats"
          onClick={() => dispatch(clearMessagesHistory())}
          className="flex lg:hidden bg-sidebar px-1.5 sm:px-3 py-1.5 sm:py-3 rounded-full"
        >
          <FontAwesomeIcon
            icon={i18n.language === "ar" ? faAngleRight : faAngleLeft}
          />
        </Link>
        <img
          src={chatPicture}
          alt="user"
          className="rounded-full w-8 sm:w-10 h-8 sm:h-10 bg-sidebar"
        />
        <div className="flex items-center gap-2">
          <div className="font-medium sm:font-semibold text-sm w-20 min-[350px]:w-auto truncate">
            {title.substring(0, 15)}
          </div>
          {isActive && <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-green-500 rounded-full"></div>}
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
        <OptionsMenu
          chat={chat}
          setShowMembers={setShowMembers}
          onImageChange={onImageChange}
        />
      </div>
      {showMembers && <Members setShowMembers={setShowMembers} />}
      {showEditChatPic && (
        <SetChatImage
          chatId={chat.id}
          setShowEditChatPic={setShowEditChatPic}
          image={image}
          setImage={setImage}
        />
      )}
    </div>
  );
}
