import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import ChatsSidebar from "../Components/ui/Chats/ChatsSidebar";
import ChatMessages from "../Components/ui/Chats/ChatMessages";
import NoChatSelected from "../Components/ui/Shared/NoChatSelected";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats, updateMessage } from "../slices/chat";
import { useParams } from "react-router-dom";
import { addMessage, fetchMessages, getChat } from "../slices/chatMessages";
import { socket } from "../socket";

export default function Chat() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { chat } = useSelector((state) => state.chatMessages);
  let { id } = useParams();

  useEffect(() => {
    dispatch(fetchChats({}));
  }, [dispatch]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      if(chat && chat.id === data.chatId.id) {
        dispatch(addMessage(data));
      } else {
        dispatch(updateMessage(data));
      }
    });
  }, [chat, dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(getChat({ chatId: id }))
        .unwrap()
        .then(() => {
          dispatch(fetchMessages({ chatId: id, filters: {} }))
            .unwrap()
            .then(() => {})
            .catch(() => {});
        })
        .catch((err) => {});
    }
  }, [dispatch, id]);

  return (
    <div className="w-full h-full flex justify-start items-center overflow-hidden">
      <Helmet>
        <title>{t("title")}</title>
      </Helmet>
      <ChatsSidebar />
      {chat ? <ChatMessages /> : <NoChatSelected />}
    </div>
  );
}
