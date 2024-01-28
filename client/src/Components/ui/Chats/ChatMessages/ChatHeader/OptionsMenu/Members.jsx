import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Members({ setShowMembers, setShow }) {
  return (
    <button
      onClick={() => {
        setShowMembers(true);
        setShow(false);
      }}
      className="w-full flex justify-between items-center gap-1 p-2"
    >
      <div className="text-[17px]">Members</div>
      <FontAwesomeIcon icon={faUsers} size="sm" />
    </button>
  );
}
