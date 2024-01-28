import React, { useEffect, useState } from "react";
import userPic from "../../../../../../../assets/images/users/avatar.png";
import { useDispatch } from "react-redux";
import { addUserToGroup } from "../../../../../../../slices/chat";
import { actionMessage } from "../../../../../../../slices/chatMessages";
import { socket } from "../../../../../../../socket";
import { getUserImageService } from "../../../../../../../services/user.service";
import { useTranslation } from "react-i18next";

export default function UserListItem({ user, chatId }) {
  const [isAdded, setIsAdded] = useState(false);
  const [profilePicture, setProfilePicture] = useState(userPic);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const addUser = () => {
    dispatch(addUserToGroup({ groupId: chatId, userId: user.id }))
      .unwrap()
      .then((payload) => {
        dispatch(actionMessage(payload.chat));
        socket.emit("new_user", payload.chat);
        setIsAdded(true);
      })
      .catch((err) => {});
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
        <div className="font-semibold text-paragraph/90">{user.name}</div>
      </div>
      <button
        onClick={() => {
          if (!isAdded) {
            addUser();
          }
        }}
        className={
          "px-3 py-1 rounded-md font-normal " +
          (isAdded ? "bg-primary" : "bg-message")
        }
      >
        {isAdded ? t("new_group.added") : t("new_group.add")}
      </button>
    </div>
  );
}
