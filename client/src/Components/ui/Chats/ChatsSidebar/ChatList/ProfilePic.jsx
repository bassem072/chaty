import React, { useEffect, useState } from "react";
import user from '../../../../../assets/images/users/avatar.png';
import { useSelector } from "react-redux";
import { getChatPicService } from "../../../../../services/chat.service";
import { getUserImageService } from "../../../../../services/user.service";
import userPic from "../../../../../assets/images/users/avatar.png";
import groupPic from "../../../../../assets/images/users/chat.png";

export default function ProfilePic({ chat }) {
  const { onlineUsers } = useSelector(state => state.onlineUsers);
  const [chatPicture, setChatPicture] = useState(
    chat.isGroupChat ? groupPic : userPic
  );

  const isActive = chat.isGroupChat ? false : onlineUsers.includes(chat.user._id);

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
    <div className="relative w-16">
      <img
        src={chatPicture}
        alt="user"
        width={60}
        height={60}
        className="rounded-full"
      />
      {isActive && (
        <div className="absolute w-2.5 h-2.5 bg-green-500 rounded-full ltr:left-3/4 rtl:left-[12%] bottom-0"></div>
      )}
    </div>
  );
}
