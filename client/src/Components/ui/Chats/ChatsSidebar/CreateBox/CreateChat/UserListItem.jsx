import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { socket } from "../../../../../../socket";
import { fetchChat } from "../../../../../../slices/chat";
import { setMessage } from "../../../../../../slices/message";
import { getUserImageService } from "../../../../../../services/user.service";
import userPic from "../../../../../../assets/images/users/avatar.png";
import { useTranslation } from "react-i18next";

export default function UserListItem({ user, setShowBox }) {
  const { chats } = useSelector((state) => state.chat);
  const [profilePicture, setProfilePicture] = useState(userPic);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
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

  useEffect(() => {
    if (user.profileImage !== "default") {
      getUserImageService(user.id)
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          setProfilePicture(url);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  }, [user]);

  return (
    <div className="w-full py-5 px-3 flex justify-between items-center hover:bg-sidebar rounded-xl">
      <div className="flex items-center gap-3">
        <img
          src={profilePicture}
          alt="user"
          width={38}
          height={38}
          className="rounded-full"
        />
        <Link
          to={`/users/${user.id}`}
          className="font-semibold text-paragraph/90"
        >
          {user.name}
        </Link>
      </div>
      <button
        onClick={() => {
          fetchThisChat(user.id);
        }}
        className="px-3 py-1 bg-message rounded-md font-normal"
      >
        {t("message")}
      </button>
    </div>
  );
}
