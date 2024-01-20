import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import ChatsSidebar from "../Components/ui/Chats/ChatsSidebar";
import ChatMessages from "../Components/ui/Chats/ChatMessages";
import NoChatSelected from "../Components/ui/Shared/NoChatSelected";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats } from "../slices/chat";
import { useParams } from "react-router-dom";
import { fetchMessages, getChat } from "../slices/chatMessages";
import { setMessage } from "../slices/message";

export default function Chat() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { chat } = useSelector((state) => state.chatMessages);
  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all chats
        await dispatch(fetchChats({})).unwrap();

        // If an ID is provided, fetch the specific chat and its messages
        if (id) {
          await dispatch(getChat({ chatId: id })).unwrap();
          await dispatch(fetchMessages({ chatId: id, filters: {} })).unwrap();
        }
      } catch (err) {
        // Log any errors for debugging purposes
        console.error("An error occurred while fetching data:", err);
        dispatch(setMessage("An error occurred while fetching data:", err));
      }
    };

    // Invoke the fetchData function
    fetchData();
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
