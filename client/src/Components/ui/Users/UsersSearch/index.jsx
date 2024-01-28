import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchUsersService } from "../../../../services/user.service";
import UserSearchItem from "./UserSearchItem";

export default function UsersSearch({ searchText = "", setSearchText }) {
  const { i18n, t } = useTranslation("users");
  const [users, setUsers] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const getUsers = (keyword) => {
    fetchUsersService({ keyword, limit: 10 })
      .then((data) => {
        setUsers(data.data);
      })
      .catch((err) => {});
  };

  const handleBlur = () => {
    setTimeout(() => setIsActive(false), 200);
  };

  return (
    <div className="w-full h-20 bg-active flex justify-center items-center">
      <div className="w-80 h-12 md:w-[600px] bg-primary rounded-full flex items-center">
        <div className="relative w-full h-full flex items-center">
          <input
            type="text"
            placeholder={t("navbar.searchPlaceholder")}
            value={searchText}
            onChange={(event) => {
              getUsers(event.target.value);
              setSearchText(event.target.value);
            }}
            onFocus={() => {
              getUsers(searchText);
              setIsActive(true);
            }}
            onBlur={handleBlur}
            className="w-full px-4 bg-transparent outline-none"
          />
          {isActive && users.length > 0 && (
            <div className="absolute w-full max-h-[50vh] p-2 bg-sidebar top-14 rounded whitespace-nowrap overflow-auto scrollbar z-10">
              {users.map((user, index) => (
                <UserSearchItem key={index} user={user} />
              ))}
            </div>
          )}
        </div>
        <div
          className={
            "w-16 h-full bg-sidebar flex justify-center items-center " +
            (i18n.dir() === "rtl" ? "rounded-l-full" : "rounded-r-full")
          }
        >
          <FontAwesomeIcon icon={faSearch} size="lg" />
        </div>
      </div>
    </div>
  );
}
