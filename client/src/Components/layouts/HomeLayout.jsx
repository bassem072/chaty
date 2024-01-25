import React, { useEffect } from "react";
import Sidebar from "../ui/Shared/Sidebar";
import { socket } from "../../socket";
import { useDispatch, useSelector } from "react-redux";
import { getProfileImage } from "../../slices/auth";
import { updateUsers } from "../../slices/onlineUsers";

export default function HomeLayout({ children }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      socket.emit("user_connected", user.id);
      socket.emit("join_user_room", user.id);
      if(user.profileImage !== "default") {
        dispatch(getProfileImage());
      }

      socket.on("online_users", function (onlineUsers) {
        // Update your UI with the new user list
        dispatch(updateUsers(onlineUsers));
        console.log(onlineUsers);
      });
    }
  }, [dispatch, user]);

  return (
    <div className="w-screen h-screen flex flex-col-reverse lg:flex-row justify-start text-paragraph overflow-hidden">
      <Sidebar />
      {children}
    </div>
  );
}
