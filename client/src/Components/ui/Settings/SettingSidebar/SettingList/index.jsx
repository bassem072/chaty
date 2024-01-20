import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import SettingListItem from "./SettingListItem";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

export default function SettingList() {
  const settingRef = useRef(null);
  const { page } = useParams();
  const availablePages = { editProfile: faPenToSquare, appSettings: faGear };

  const scrollToChat = () => {
    settingRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToChat();
  }, []);

  return (
    <div className="w-full h-full whitespace-normal overflow-auto scrollbar px-2 flex flex-col">
      {Object.keys(availablePages).map((pageName) => (
        <SettingListItem
          key={pageName}
          isActive={pageName === page}
          page={pageName}
          icon={availablePages[pageName]}
        />
      ))}
    </div>
  );
}
