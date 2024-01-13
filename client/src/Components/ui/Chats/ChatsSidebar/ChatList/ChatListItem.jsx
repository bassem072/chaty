import React from "react";
import ProfilePic from "./ProfilePic";
import ChatInfo from "./ChatInfo";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { clearMessagesHistory } from "../../../../../slices/chatMessages";

export default function ChatListItem({ chat, ref }) {
  const { chat: selectedChat } = useSelector((state) => state.chatMessages);
  let { id } = useParams();
  const dispatch = useDispatch();
  
  return (
    <Link
      to={"/chats/" + chat.id}
      onClick={() => dispatch(clearMessagesHistory())}
      replace={id ? true : false}
      ref={ref}
      className={
        "w-full py-5 hover:bg-sidebar px-3 flex gap-3 items-center rounded-md cursor-pointer" +
        (chat.id === selectedChat?.id ? " bg-sidebar" : "")
      }
    >
      <ProfilePic />
      <ChatInfo chat={chat} />
    </Link>
  );
}
