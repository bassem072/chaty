import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUsersService } from "../../../../../services/user.service";
import { setMessage } from "../../../../../slices/message";
import userPic from "../../../../../assets/images/users/avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { createChat } from "../../../../../slices/chat";
import { useNavigate } from "react-router-dom";
import { socket } from "../../../../../socket";

export default function AddGroup({ setShowBox }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const navigate = useNavigate();

  const getUsers = (keyword) => {
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

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <div className="w-full h-10 bg-active p-2 text-base font-medium rounded-md">
        <input
          type="text"
          name="search"
          placeholder="Name of group"
          className="w-full bg-transparent outline-none"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div className="w-full h-10 bg-active p-2 text-base font-medium rounded-md">
        <input
          type="text"
          name="search"
          placeholder="Search for users... (At least two users with you)"
          className="w-full bg-transparent outline-none"
          onChange={(event) => getUsers(event.target.value)}
        />
      </div>

      {selectedUsers.length > 0 && (
        <div className="h-14 flex gap-3 whitespace-nowrap overflow-auto hidden-scrollbar text-sm">
          {selectedUsers.map((selectedUser, index) => (
            <div className="px-3 py-1 bg-primary rounded-full flex justify-between items-center gap-6">
              <div className="flex items-center gap-2">
                <img
                  src={userPic}
                  alt="user"
                  width={20}
                  height={20}
                  className="rounded-full"
                />
                <div>{selectedUser.name}</div>
              </div>
              <button
                className="w-2"
                onClick={() => {
                  removeFromSelectedUsers(index);
                }}
              >
                <FontAwesomeIcon icon={faClose} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="w-full h-full bg-active p-3 text-base font-medium rounded-md overflow-auto whitespace-nowrap scrollbar">
        {users.map((user, index) => (
          <div
            key={index}
            className="w-full py-3 px-2 flex justify-between items-center hover:bg-sidebar rounded-xl"
          >
            <div className="flex items-center gap-3">
              <img
                src={userPic}
                alt="user"
                width={38}
                height={38}
                className="rounded-full"
              />
              <div className="font-semibold text-paragraph/90">{user.name}</div>
            </div>
            <button
              onClick={() => addToSelectedUsers(user)}
              className="px-3 py-1 bg-message rounded-md font-normal"
            >
              Add
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center">
        <button
          onClick={() => createGroup()}
          className="bg-message py-2 px-3 rounded-md"
        >
          Create
        </button>
      </div>
    </div>
  );
}
