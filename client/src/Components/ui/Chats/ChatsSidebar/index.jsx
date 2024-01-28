import React, { useState } from "react";
import ChatList from "./ChatList";
import Search from "./Search";
import FilterMessages from "./FilterMessages";
import { useSelector } from "react-redux";
import SidebarHeader from "./SidebarHeader";

export default function ChatsSidebar() {
  let { chats } = useSelector((state) => state.chat);
  let { chat } = useSelector((state) => state.chatMessages);
  const [search, setSearch] = useState("");

  const searchChat = (chat) => {
    if (chat.isGroupChat) {
      if (chat.name.toLowerCase().indexOf(search) !== -1) {
        return true;
      } else {
        for (let i = 0; i < chat.users.length; i++) {
          const user = chat.users[i];
          if (
            user.name.toLowerCase().indexOf(search) !== -1 ||
            user.email.toLowerCase().indexOf(search) !== -1
          ) {
            return true;
          }
        }
        return false;
      }
    } else {
      if (
        chat.user.name.toLowerCase().indexOf(search) !== -1 ||
        chat.user.email.toLowerCase().indexOf(search) !== -1
      ) {
        return true;
      } else {
        return false;
      }
    }
  };

  const chatList =
    search.length === 0 ? chats : chats.filter((chat) => searchChat(chat));

  return (
    <div
      className={
        "h-full bg-active py-6" +
        (chat
          ? " hidden lg:flex flex-col gap-5"
          : " w-full lg:w-auto flex flex-col gap-5")
      }
    >
      <SidebarHeader />
      <FilterMessages chats={chatList} />
      <Search search={search} setSearch={setSearch} />
      <ChatList search={search.toLowerCase()} chatList={chatList} />
    </div>
  );
}
