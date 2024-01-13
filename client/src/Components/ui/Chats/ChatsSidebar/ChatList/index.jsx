import React, { useEffect, useRef } from "react";
import ChatListItem from "./ChatListItem";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../../../../socket";
import { newChat, updateMessage } from "../../../../../slices/chat";

export default function ChatList() {
  const dispatch = useDispatch();
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
    // Define a helper function to handle adding and removing event listeners
    const handleSocketEvent = (event, handler) => {
      // Add the event listener
      socket.on(event, handler);

      // Return a cleanup function to remove the event listener
      return () => socket.off(event, handler);
    };

    // Define the event handlers
    const handleNewChat = (data) => {
      console.log(data);
      dispatch(newChat(data));
    };

    const handleReceiveMessage = (data) => {
      console.log(data);
      dispatch(updateMessage(data));
    };

    // Use the helper function to handle the events
    const cleanupNewChat = handleSocketEvent("new_chat", handleNewChat);

    const cleanupReceiveMessage = handleSocketEvent(
      "receive_message",
      handleReceiveMessage
    );

    // Return a cleanup function to remove all event listeners
    return () => {
      cleanupNewChat();
      cleanupReceiveMessage();
    };
  }, [dispatch]);

  useEffect(() => {
    scrollToChat();
  }, []);

  return (
    <div className="w-full h-full whitespace-normal overflow-auto scrollbar px-2 flex flex-col gap-2">
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
