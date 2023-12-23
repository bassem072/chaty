import React, { useEffect, useRef } from "react";
import Message from "./Message";
import messages from "../../../../../data/messages";
import { checkShow, isNewDay } from "../../../../../helpers/messages";

export default function Messages() {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <div className="h-full flex flex-col gap-2 items-end whitespace-normal overflow-auto scrollbar px-5 pb-4">
      {messages.map((message, index) => {
        return (
          <div
            key={message.id}
            ref={index === messages.length - 1 ? messagesEndRef : null}
            className="w-full"
          >
            <Message
              id={message.id}
              content={message.content}
              show={checkShow(index)}
              seen={true}
              userId={message.userId}
              date={message.date}
              newDay={
                index === 0 || isNewDay(message.date, messages[index - 1].date)
              }
              index={index}
            />
          </div>
        );
      })}
    </div>
  );
}
