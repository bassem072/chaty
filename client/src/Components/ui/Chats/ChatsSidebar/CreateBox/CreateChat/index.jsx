import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchUsersService } from "../../../../../../services/user.service";
import { useDispatch } from "react-redux";
import { setMessage } from "../../../../../../slices/message";
import UserListItem from "./UserListItem";

export default function CreateChat({ setShowBox }) {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const getUsers = (keyword = "") => {
    fetchUsersService({ keyword, limit: 10 })
      .then((data) => {
        setUsers(data.data);
      })
      .catch((err) => {
        dispatch(setMessage("Can't fetch users"));
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div>{t("newMessage")}</div>
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
          <UserListItem key={index} user={user} setShowBox={setShowBox} />
        ))}
      </div>
    </>
  );
}
