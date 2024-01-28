import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchUsersService } from "../../../../../services/user.service";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../../../../slices/message";
import userPic from "../../../../../assets/images/users/avatar.png";
import { fetchChat, selectChat } from "../../../../../slices/chat";
import { useNavigate } from "react-router-dom";
import { socket } from "../../../../../socket";

export default function CreateChat({ setShowBox }) {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const { chats } = useSelector((state) => state.chat);
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

  const fetchThisChat = (userId) => {
    let index = -1;
    for (let i = 0; i < chats.length; i++) {
      if (!chats[i].isGroupChat && chats[i].user._id === userId) {
        index = i;
        break;
      }
    }

    if (index !== -1) {
      navigate(`/chats/${chats[index].id}`);
      setShowBox(false);
    } else {
      dispatch(fetchChat({ userId }))
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
    <>
      <div>{t("newMessage")}</div>
      <div className="w-full bg-active p-2 text-base font-medium rounded-md">
        <input
          type="text"
          name="search"
          placeholder="Search for users..."
          className="w-full bg-transparent outline-none"
          onChange={(event) => getUsers(event.target.value)}
        />
      </div>

      <div className="w-full h-full bg-active p-3 text-base font-medium rounded-md overflow-auto whitespace-nowrap scrollbar flex flex-col">
        {users.map((user, index) => (
          <div
            key={index}
            className="w-full py-5 px-3 flex justify-between items-center hover:bg-sidebar rounded-xl"
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
              onClick={() => {
                fetchThisChat(user.id);
              }}
              className="px-3 py-1 bg-message rounded-md font-normal"
            >
              Message
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
