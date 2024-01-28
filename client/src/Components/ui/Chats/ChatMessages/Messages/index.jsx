import React, { useEffect, useRef } from "react";
import { checkShow, isNewDay } from "../../../../../helpers/messages";
import { useSelector } from "react-redux";
import TextMessage from "./TextMessage";
import ActionMessage from "./ActionMessage";
import TypingMessage from "./TypingMessage";

export default function Messages() {
  const { messages, typing } = useSelector((state) => state.chatMessages);

  const messagesEndRef = useRef(null);
  const divRef = useRef();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing]);

  return (
    <div
      ref={divRef}
      className="h-full flex flex-col gap-2 items-end whitespace-normal overflow-auto scrollbar px-5 pb-4"
    >
      {messages.map((message, index) => (
        <div
          key={index}
          ref={index === messages.length - 1 ? messagesEndRef : null}
          className="w-full"
        >
          {["text", "photo", "video", "file", "record"].includes(
            message.messageType
          ) ? (
            <TextMessage
              message={message}
              isNewDay={
                index === 0 ||
                isNewDay(message.createdAt, messages[index - 1].createdAt)
              }
              checkShow={checkShow(index, messages)}
            />
          ) : (
            <ActionMessage
              message={message}
              isNewDay={
                index === 0 ||
                isNewDay(message.createdAt, messages[index - 1].createdAt)
              }
              checkShow={checkShow(index, messages)}
            />
          )}
        </div>
      ))}
      {Object.values(typing).map((user, index) => <TypingMessage key={index} user={user} />)}
    </div>
  );
}
