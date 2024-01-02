import React, { useEffect } from "react";
import {Helmet} from "react-helmet";
import { useTranslation } from "react-i18next";
import ChatsSidebar from "../Components/ui/Chats/ChatsSidebar";
import ChatMessages from "../Components/ui/Chats/ChatMessages";
import NoChatSelected from "../Components/ui/Shared/NoChatSelected";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats } from "../slices/chat";

export default function Chat() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  let { selectedChat } = useSelector(state => state.chat);

  useEffect(() => {
    dispatch(fetchChats({}));
  }, [dispatch]);

  return (
    <div className="w-full h-full flex justify-start items-center overflow-hidden">
      <Helmet>
        <title>{t("title")}</title>
      </Helmet>
      <ChatsSidebar />
      {selectedChat ? <ChatMessages /> : <NoChatSelected />}
    </div>
  );
}