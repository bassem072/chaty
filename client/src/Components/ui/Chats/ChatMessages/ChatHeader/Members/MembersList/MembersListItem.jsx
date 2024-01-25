import React, { useEffect, useRef, useState } from "react";
import userPic from "../../../../../../../assets/images/users/user_1.png";
import { getUserImageService } from "../../../../../../../services/user.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faShieldHalved,
  faUserXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addAdminToGroup,
  removeAdminFromGroup,
  removeUserFromGroup,
} from "../../../../../../../slices/chat";
import { actionMessage } from "../../../../../../../slices/chatMessages";
import { socket } from "../../../../../../../socket";

export default function MembersListItem({
  user,
  chatId,
  isAdmin = false,
  haveAccess = false,
}) {
  const [profilePicture, setProfilePicture] = useState(userPic);
  const { user: me } = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const menuRef = useRef();
  const { i18n } = useTranslation();
  const isMe = user._id === me?.id;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  useEffect(() => {
    if (user.profileImage !== "default") {
      getUserImageService(user._id)
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          setProfilePicture(url);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  }, [user]);

  const addAdmin = () => {
    dispatch(addAdminToGroup({ groupId: chatId, userId: user._id }))
      .unwrap()
      .then((payload) => {
        dispatch(actionMessage(payload.chat));
        socket.emit("new_admin", payload.chat);
      })
      .catch((err) => {});
  };
  const removeAdmin = () => {
    dispatch(removeAdminFromGroup({ groupId: chatId, userId: user._id }))
      .unwrap()
      .then((payload) => {
        dispatch(actionMessage(payload.chat));
        socket.emit("removed_admin", payload.chat);
      })
      .catch((err) => {});
  };
  const removeUser = () => {
    dispatch(removeUserFromGroup({ groupId: chatId, userId: user._id }))
      .unwrap()
      .then((payload) => {
        dispatch(actionMessage(payload.chat));
        socket.emit("removed_user", payload.chat);
      })
      .catch((err) => {});
  };

  return (
    <div className="w-full flex justify-between items-center py-3 hover:bg-active px-4 rounded-2xl transition-all">
      <div className="flex items-center gap-3">
        <img
          src={profilePicture}
          alt="User"
          className="w-12 h-12 bg-primary rounded-full"
        />
        <div className="flex items-center gap-2">
          <Link to={`/users/${user._id}`}>{user.name}</Link>
          {isAdmin && (
            <FontAwesomeIcon icon={faShieldHalved} className="text-message" />
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        {!isMe && (
          <button className="bg-message py-1 px-2 rounded-lg">message</button>
        )}
        {haveAccess && !isMe && (
          <div
            ref={menuRef}
            className="relative hover:text-paragraph transition-all duration-300 cursor-pointer"
            onClick={() => setShow(!show)}
          >
            <FontAwesomeIcon icon={faEllipsisV} size="sm" />
            {show && (
              <div
                className={
                  "absolute w-60 top-10 z-10 p-1 bg-[#303841] rounded-md transition-all duration-700 " +
                  (i18n.dir() === "rtl" ? "left-0" : "right-0")
                }
              >
                <button
                  onClick={() => {
                    isAdmin ? removeAdmin() : addAdmin();
                  }}
                  className="w-full flex justify-between items-center text-paragraph/70 my-1 py-1.5 px-2 rounded-md hover:bg-sidebar"
                >
                  <div>
                    {!isAdmin ? "Make group admin" : "Dismiss as admin"}
                  </div>
                  <FontAwesomeIcon icon={faShieldHalved} />
                </button>
                <button
                  onClick={() => {
                    //removeUser();
                  }}
                  className="w-full flex justify-between items-center text-paragraph/70 my-1 py-1.5 px-2 rounded-md hover:bg-sidebar"
                >
                  <div>Remove From Group</div>
                  <FontAwesomeIcon icon={faUserXmark} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
