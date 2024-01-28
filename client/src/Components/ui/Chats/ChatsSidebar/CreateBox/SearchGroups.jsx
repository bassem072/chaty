import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChatsService } from "../../../../../services/chat.service";
import { setMessage } from "../../../../../slices/message";
import { useTranslation } from "react-i18next";

export default function SearchGroups({ setShowBox }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [groups, setGroups] = useState([]);

  const fetchGroups = (keyword) => {
    fetchChatsService({ isGroupChat: true, keyword, limit: 10 })
      .then((data) => {
        setGroups(data.data);
        console.log(groups);
      })
      .catch((err) => {
        dispatch(setMessage("Can't fetch users"));
      });
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full bg-active p-2 text-base font-medium rounded-md">
        <input
          type="text"
          name="search"
          placeholder={t("search.groups")}
          className="w-full bg-transparent outline-none"
          onChange={(event) => fetchGroups(event.target.value)}
        />
      </div>
    </div>
  );
}
