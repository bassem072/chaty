import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../../../slices/chat";

export default function FilterMessages() {
  const { t } = useTranslation("chats");
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chat);

  const filters = [
    { name: "all", numberOfMessages: 50 },
    { name: "chats", numberOfMessages: 30 },
    { name: "groups", numberOfMessages: 20 },
  ];

  return (
    <div className="w-full px-5">
      <div className="w-full h-12 bg-sidebar rounded-xl flex justify-between overflow-hidden">
        {filters.map((filter, index) => (
          <button
            key={index}
            className={
              "group w-full flex justify-center items-center gap-2 hover:bg-primary hover:text-message" +
              (chats.filter === filter.name ? " bg-primary text-message" : "")
            }
            onClick={() => dispatch(changeFilter(filter.name))}
          >
            <div>{t(filter.name)}</div>
            <div
              className={
                "w-8 px-0.5 py-px bg-message/20 rounded-xl text-sm text-paragraph/80 font-medium flex justify-center items-center group-hover:bg-sidebar/50" + (chats.filter === filter.name ? " !text-message" : "")
              } 
            >
              {filter.numberOfMessages}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
