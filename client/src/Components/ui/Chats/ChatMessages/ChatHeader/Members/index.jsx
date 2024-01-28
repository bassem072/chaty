import React, { useEffect, useRef, useState } from "react";
import MembersList from "./MembersList";
import AddMember from "./AddMember";

export default function Members({ setShowMembers }) {
  const membersRef = useRef();
  const [isAddUser, setIsAddUser] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (membersRef.current && !membersRef.current.contains(event.target)) {
        setShowMembers(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowMembers]);
  return (
    <div className="fixed w-screen h-screen bg-black/10 top-0 right-0 flex justify-center items-center z-30">
      <div
        ref={membersRef}
        className="w-[350px] sm:w-[500px] h-full max-h-[80%] py-3 px-1 bg-sidebar rounded-xl"
      >
        {isAddUser ? (
          <AddMember setIsAddUser={setIsAddUser} />
        ) : (
          <MembersList setIsAddUser={setIsAddUser} />
        )}
      </div>
    </div>
  );
}
