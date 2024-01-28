import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../../../slices/chat";

export default function FilterMessages({ chats }) {
  const { t } = useTranslation("chats");
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.chat);

  const numberOfGroups = chats.reduce((totalGroups, chat) => {
    if(chat.isGroupChat) {
      return totalGroups + 1;
    }
    return totalGroups;
  }, 0);

  const filters = [
    { name: "all", numberOfMessages: chats.length },
    { name: "chats", numberOfMessages: chats.length - numberOfGroups },
    { name: "groups", numberOfMessages: numberOfGroups },
  ];

  return (
    <div className="w-full px-5">
      <div className="w-full h-12 bg-sidebar rounded-xl flex justify-between overflow-hidden">
        {filters.map((filterType, index) => (
          <button
            key={index}
            className={
              "group w-full flex justify-center items-center gap-2 hover:bg-primary hover:text-message" +
              (filter === filterType.name ? " bg-primary text-message" : "")
            }
            onClick={() => dispatch(changeFilter(filterType.name))}
          >
            <div>{t(filterType.name)}</div>
            <div
              className={
                "w-8 px-0.5 py-px bg-message/20 rounded-xl text-sm text-paragraph/80 font-medium flex justify-center items-center group-hover:bg-sidebar/50" +
                (filter === filterType.name ? " !text-message" : "")
              }
            >
              {filterType.numberOfMessages}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
