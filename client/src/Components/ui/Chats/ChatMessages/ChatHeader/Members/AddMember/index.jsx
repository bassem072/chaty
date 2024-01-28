import React, { useEffect, useState } from "react";
import { setMessage } from "../../../../../../../slices/message";
import { fetchUsersService } from "../../../../../../../services/user.service";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import UserListItem from "./UserListItem";

export default function AddMember({ setIsAddUser }) {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const { chat } = useSelector((state) => state.chatMessages);

  const members = chat.users.map((user) => user._id);

  const getUsers = (keyword) => {
    fetchUsersService({ keyword, limit: 10, users: members })
      .then((data) => {
        setUsers(data.data);
      })
      .catch((err) => {
        dispatch(setMessage("Can't fetch users"));
      });
  };

  useEffect(() => {
    getUsers("");
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center whitespace-nowrap overflow-auto scrollbar">
      <div className="w-full relative py-3">
        <div className="text-2xl font-semibold">{t("members")}</div>
        <button
          onClick={() => setIsAddUser(false)}
          className="absolute w-10 h-10 top-1/2 -translate-y-1/2 left-0"
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
      </div>
      <div className="w-full bg-active p-2 text-base font-medium rounded-md">
        <input
          type="text"
          name="search"
          placeholder={t("search.users")}
          className="w-full bg-transparent outline-none"
          onChange={(event) => getUsers(event.target.value)}
        />
      </div>

      <div className="w-full h-full bg-active p-3 text-base font-medium rounded-md overflow-auto whitespace-nowrap scrollbar flex flex-col">
        {users.map((user, index) => (
          <UserListItem key={index} user={user} chatId={chat.id} />
        ))}
      </div>
    </div>
  );
}
