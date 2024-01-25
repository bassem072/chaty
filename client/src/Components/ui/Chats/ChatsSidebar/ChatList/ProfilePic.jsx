import React from "react";
import user from '../../../../../assets/images/users/user_5.png';
import { useSelector } from "react-redux";

export default function ProfilePic({ chat }) {
  const { onlineUsers } = useSelector(state => state.onlineUsers);

  const isActive = chat.isGroupChat ? false : onlineUsers.includes(chat.user._id);

  return (
    <div className="relative w-16">
      <img
        src={user}
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
