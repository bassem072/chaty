import React, { useState } from "react";
import userPic from "../../../../../../../assets/images/users/user_1.png";
import { useDispatch } from "react-redux";
import { addUserToGroup } from "../../../../../../../slices/chat";
import { actionMessage } from "../../../../../../../slices/chatMessages";
import { socket } from "../../../../../../../socket";

export default function UserListItem({ user, chatId }) {
  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useDispatch();
  
  const addUser = () => {
    dispatch(addUserToGroup({ groupId: chatId, userId: user.id }))
      .unwrap()
      .then((payload) => {
        dispatch(actionMessage(payload.chat));
        socket.emit("new_user", payload.chat);
      })
      .catch((err) => {});
  };
  return (
    <div className="w-full py-5 px-3 flex justify-between items-center hover:bg-sidebar rounded-xl">
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
          if (!isAdded) {
            addUser();
          }
        }}
        className={
          "px-3 py-1 rounded-md font-normal " +
          (isAdded ? "bg-primary" : "bg-message")
        }
      >
        {isAdded ? "Added" : "Add"}
      </button>
    </div>
  );
}
