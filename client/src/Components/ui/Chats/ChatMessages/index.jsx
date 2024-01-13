import React, { useEffect } from "react";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import { socket } from "../../../../socket";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../../../slices/chatMessages";

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

    // Add the event listener
    socket.on("receive_message", handleReceiveMessage);

    // Return a cleanup function to remove the event listener
    return () => {
      socket.off("receive_message", handleReceiveMessage);
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
