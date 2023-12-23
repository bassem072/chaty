import React from "react";
import ProfilePic from "./ProfilePic";
import ChatInfo from "./ChatInfo";
import { Link, useLocation, useParams } from "react-router-dom";

export default function ChatListItem({ chat, ref }) {
  let { id } = useParams();
  let { state } = useLocation();
  
  return (
    <Link
      to={"/chats/" + chat.id}
      replace={state ? true : false}
      state={id}
      ref={ref}
      className={
        "w-full py-5 hover:bg-sidebar px-3 flex gap-3 items-center rounded-md cursor-pointer" +
        (chat.id === +id ? " bg-sidebar" : "")
      }
    >
      <ProfilePic />
      <ChatInfo />
    </Link>
  );
}
