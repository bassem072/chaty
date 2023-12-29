import React from "react";
import ChatList from "./ChatList";
import Search from "./Search";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import FilterMessages from "./FilterMessages";

export default function ChatsSidebar() {
  const { t } = useTranslation("chats");
  let { id } = useParams();

  return (
    <div
      className={
        "h-full bg-active py-6" +
        (id
          ? " hidden lg:flex flex-col gap-5"
          : " w-full lg:w-auto flex flex-col gap-5")
      }
    >
      <div className="w-full lg:w-[380px] text-start text-xl font-semibold px-5">
        {t("header")}
      </div>
      <FilterMessages />
      <Search />
      <ChatList />
    </div>
  );
}
