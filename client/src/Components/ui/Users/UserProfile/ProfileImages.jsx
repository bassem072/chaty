import { faComment, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import userPic from "../../../../assets/images/users/avatar.png";
import cover from "../../../../assets/images/home/cover.webp";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchChatService } from "../../../../services/chat.service";
import { socket } from "../../../../socket";
import { setMessage } from "../../../../slices/message";
import { getUserImageService } from "../../../../services/user.service";

export default function ProfileImages({ user }) {
  const { chats } = useSelector((state) => state.chat);
  const [profilePicture, setProfilePicture] = useState(userPic);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    } else {
      fetchChatService({ userId: user.id })
        .then((payload) => {
          socket.emit("create_chat", payload.data);
          navigate("/chats/" + payload.data.id);
        })
        .catch((error) => {
          dispatch(setMessage("Can't fetch this chat"));
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
    <div className="relative w-full h-80 bg-active/50 flex justify-center items-center">
      <img src={cover} alt="User" className="h-full w-full object-cover" />
      <div className="absolute w-full flex flex-col lg:flex-row lg:p-10 items-center lg:gap-5 bottom-0 translate-y-2/3 lg:translate-y-1/2">
        <img
          src={profilePicture}
          alt="User"
          className="w-60 h-60 bg-sidebar rounded-full border-[5px] border-paragraph/50"
        />
        <div className="lg:w-full flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between pt-2 lg:pt-24">
          <div className="flex flex-col items-center lg:items-start gap-2">
            <div className="text-3xl text-paragraph font-semibold">
              {user.name}
            </div>
            <div>1.4k followers</div>
          </div>
          <div className="flex justify-center gap-3">
            <button className="px-3 py-2 bg-message rounded-md flex gap-2 items-center">
              <FontAwesomeIcon icon={faUserPlus} />
              <div>Add Friend</div>
            </button>
            <button
              onClick={() => fetchThisChat(user.id)}
              className="px-3 py-2 bg-message rounded-md flex gap-2 items-center"
            >
              <FontAwesomeIcon icon={faComment} />
              <div>Message</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
