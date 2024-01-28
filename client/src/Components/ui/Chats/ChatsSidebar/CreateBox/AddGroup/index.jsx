import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUsersService } from "../../../../../../services/user.service";
import { setMessage } from "../../../../../../slices/message";
import userPic from "../../../../../../assets/images/users/avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { createChat } from "../../../../../../slices/chat";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { socket } from "../../../../../../socket";
import UserListItem from "./UserListItem";
import SelectedUserListItem from "./SelectedUserListItem";

export default function AddGroup({ setShowBox }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const getUsers = (keyword = "") => {
    fetchUsersService({ keyword, limit: 10 })
      .then((data) => {
        setUsers(data.data);
      })
      .catch((err) => {
        dispatch(setMessage("Can't fetch users"));
      });
  };

  const addToSelectedUsers = (user) => {
    const index = selectedUsers.findIndex(
      (selectedUser) => selectedUser.id === user.id
    );

    if (index === -1) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const removeFromSelectedUsers = (index) => {
    const arr = [...selectedUsers];
    arr.splice(index, 1);
    setSelectedUsers(arr);
  };

  const createGroup = () => {
    if (name.trim().length < 3) {
      dispatch(setMessage("Group name must be at least 3 characters"));
    } else if (selectedUsers.length < 2) {
      dispatch(setMessage("Must add at least two users with you to group"));
    } else {
      const groupUsers = selectedUsers.map((selectedUser) => selectedUser.id);
      const groupName = name.trim();

      dispatch(
        createChat({ users: groupUsers, name: groupName, isGroupChat: true })
      )
        .unwrap()
        .then((payload) => {
          socket.emit("create_chat", payload.chat);
          navigate("/chats/" + payload.chat.id);
          setShowBox(false);
        })
        .catch((err) => {
          dispatch(setMessage("Can't fetch this Chat"));
        });
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <div className="w-full h-10 bg-active p-2 text-base font-medium rounded-md">
        <input
          type="text"
          name="search"
          placeholder={t("new_group.name")}
          className="w-full bg-transparent outline-none"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div className="w-full h-10 bg-active p-2 text-base font-medium rounded-md">
        <input
          type="text"
          name="search"
          placeholder={t("search.users")}
          className="w-full bg-transparent outline-none"
          onChange={(event) => getUsers(event.target.value)}
        />
      </div>

      {selectedUsers.length > 0 && (
        <div className="h-14 flex gap-3 whitespace-nowrap overflow-auto hidden-scrollbar text-sm">
          {selectedUsers.map((selectedUser, index) => (
            <SelectedUserListItem
              key={index}
              index={index}
              selectedUser={selectedUser}
              removeFromSelectedUsers={removeFromSelectedUsers}
            />
          ))}
        </div>
      )}

      <div className="w-full h-full bg-active p-3 text-base font-medium rounded-md overflow-auto whitespace-nowrap scrollbar">
        {users.map((user, index) => (
          <UserListItem
            key={index}
            user={user}
            addToSelectedUsers={addToSelectedUsers}
          />
        ))}
      </div>
      <div className="flex justify-center items-center">
        <button
          onClick={() => createGroup()}
          className="bg-message py-2 px-3 rounded-md"
        >
          {t("new_group.create")}
        </button>
      </div>
    </div>
  );
}
