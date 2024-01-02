import React from "react";
import ChatList from "./ChatList";
import Search from "./Search";
import FilterMessages from "./FilterMessages";
import { useSelector } from "react-redux";
import SidebarHeader from "./SidebarHeader";

export default function ChatsSidebar() {
  let { selectedChat } = useSelector((state) => state.chat);

  return (
    <div
      className={
        "h-full bg-active py-6" +
        (selectedChat
          ? " hidden lg:flex flex-col gap-5"
          : " w-full lg:w-auto flex flex-col gap-5")
      }
    >
      <SidebarHeader />
      <FilterMessages />
      <Search />
      <ChatList />
    </div>
  );
}
