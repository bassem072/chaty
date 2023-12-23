import React, { useEffect, useRef } from "react";
import ChatListItem from "./ChatListItem";
import chats from "../../../../../data/chats";
import { useParams } from "react-router-dom";

export default function ChatList() {
  const chatRef = useRef(null);
  let { id } = useParams();

  const scrollToChat = () => {
    chatRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToChat();
  }, []);

  return (
    <div className="w-full h-full whitespace-normal overflow-auto scrollbar px-2 flex flex-col">
      {chats.map((chat) => (
        <ChatListItem key={chat.id} ref={chat.id === +id ? chatRef : null} chat={chat} />
      ))}
    </div>
  );
}
