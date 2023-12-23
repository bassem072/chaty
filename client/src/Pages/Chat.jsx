import React from "react";
import {Helmet} from "react-helmet";
import { useTranslation } from "react-i18next";
import ChatsSidebar from "../Components/ui/Chats/ChatsSidebar";
import ChatMessages from "../Components/ui/Chats/ChatMessages";
import { useParams } from "react-router-dom";
import NoChatSelected from "../Components/ui/Shared/NoChatSelected";

export default function Chat() {
  const { t } = useTranslation();
  let { id } = useParams();

  return (
    <div className="w-full h-full flex justify-start items-center overflow-hidden">
      <Helmet>
        <title>{t("title")}</title>
      </Helmet>
      <ChatsSidebar />
      {id ? <ChatMessages /> : <NoChatSelected />}
    </div>
  );
}