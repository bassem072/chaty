import React, { useEffect } from "react";
import Sidebar from "../ui/Shared/Sidebar";
import { socket } from "../../socket";
import { useSelector } from "react-redux";

export default function HomeLayout({ children }) {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    socket.emit("join_user_room", user.id);
  }, [user.id]);

  return (
    <div className="w-screen h-screen flex flex-col-reverse lg:flex-row justify-start text-paragraph overflow-hidden">
      <Sidebar />
      {children}
    </div>
  );
}
