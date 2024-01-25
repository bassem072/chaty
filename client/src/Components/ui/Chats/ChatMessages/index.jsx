import React, { useEffect } from "react";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import { socket } from "../../../../socket";
import { useDispatch, useSelector } from "react-redux";
import { actionMessage, addMessage } from "../../../../slices/chatMessages";

export default function ChatMessages() {
  const { chat } = useSelector((state) => state.chatMessages);
  const dispatch = useDispatch();

  useEffect(() => {
    // Define the event handler
    const handleReceiveMessage = (data) => {
      if (chat && chat.id === data.chatId.id) {
        dispatch(addMessage(data));
      }
    };

    const handleNewGroupAction = (data) => {
      console.log(chat);
      if (chat && chat.id === data.id) {
        dispatch(actionMessage(data));
      }
    };

    // Add the event listener
    socket.on("receive_message", handleReceiveMessage);
    socket.on("add_user", handleNewGroupAction);
    socket.on("remove_user", handleNewGroupAction);
    socket.on("add_admin", handleNewGroupAction);
    socket.on("remove_admin", handleNewGroupAction);

    // Return a cleanup function to remove the event listener
    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off("add_user", handleNewGroupAction);
      socket.off("remove_user", handleNewGroupAction);
      socket.off("add_admin", handleNewGroupAction);
      socket.off("remove_admin", handleNewGroupAction);
    };
  }, [chat, dispatch]);
  
  return (
    <div className={"w-full h-full flex flex-col justify-start"}>
      <ChatHeader />
      <Messages />
      <SendMessage />
    </div>
  );
}
