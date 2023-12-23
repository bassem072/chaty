import React from "react";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import SendMessage from "./SendMessage";

export default function ChatMessages() {
  return (
    <div className={"w-full h-full flex flex-col justify-start"}>
      <ChatHeader />
      <Messages />
      <SendMessage />
    </div>
  );
}
