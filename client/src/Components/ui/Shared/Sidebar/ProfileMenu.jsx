import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faGear, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import user from "../../../../assets/images/users/user_1.avif";
import { useState } from "react";

export default function ProfileMenu() {
  const [show, setShow] = useState(false);
  const menuRef = useRef();

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

  return (
    <button
      ref={menuRef}
      className="hidden lg:block px-3 rounded-full relative"
      onClick={() => setShow(!show)}
    >
      <img
        src={user}
        alt="Profile Pic"
        width={40}
        height={40}
        className="rounded-full overflow-hidden border-[1.5px] border-paragraph"
      />
      {show && (
        <div className="absolute w-40 left-5 rtl:right-6 bottom-10 z-10 p-1 bg-[#303841] rounded-md transition-all duration-700">
          <div className="w-full flex justify-between items-center text-paragraph/70 my-1 py-1.5 px-2 rounded-md hover:bg-sidebar">
            <div>Profile</div>
            <FontAwesomeIcon icon={faUser} size="x" />
          </div>
          <div className="w-full flex justify-between items-center text-paragraph/70 my-1 py-1.5 px-2 rounded-md hover:bg-sidebar">
            <div>Setting</div>
            <FontAwesomeIcon icon={faGear} size="x" />
          </div>
          <div className="h-0.5 bg-paragraph/30"></div>
          <div className="w-full flex justify-between items-center text-paragraph/70 my-1 py-1.5 px-2 rounded-md hover:bg-sidebar">
            <div>Logout</div>
            <FontAwesomeIcon icon={faRightFromBracket} size="x" />
          </div>
        </div>
      )}
    </button>
  );
}
