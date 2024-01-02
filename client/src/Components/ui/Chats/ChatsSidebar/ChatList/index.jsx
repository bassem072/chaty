import React, { useEffect, useRef } from "react";
import ChatListItem from "./ChatListItem";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ChatList() {
  const { chats, filter } = useSelector((state) => state.chat);
  const chatRef = useRef(null);
  let { id } = useParams();
  const types = ["chats", "groups"];

  const filteredChats =
    filter === "all"
      ? chats
      : chats.filter((chat) => {
        const type = types[chat.isGroupChat ? 1 : 0];
        console.log(type);
          return type === filter;
        });

  const scrollToChat = () => {
    chatRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToChat();
  }, []);

  return (
    <div className="w-full h-full whitespace-normal overflow-auto scrollbar px-2 flex flex-col">
      {filteredChats.map((chat, index) => (
        <ChatListItem
          key={index}
          ref={chat.id === +id ? chatRef : null}
          chat={chat}
        />
      ))}
    </div>
  );
}
