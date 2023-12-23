import {
  faComment,
  faComments,
  faContactBook,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import React, { useEffect, useRef, useState } from "react";
import PageListItem from "./PageListItem";
import { faGear, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import user from "../../../../assets/images/users/user_1.avif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PagesList() {
  const location = useLocation().pathname;
  const current = location.substring(1, location.length).split("/")[0];
  const pages = [
    {
      name: "chats",
      route: "/chats",
      icon: faComment,
    },
    {
      name: "groups",
      route: "/groups",
      icon: faComments,
    },
    {
      name: "contacts",
      route: "/contacts",
      icon: faContactBook,
    },
    {
      name: "profile",
      route: "/profile",
      icon: faUser,
    },
    {
      name: "settings",
      route: "/settings",
      icon: faGear,
    },
  ];
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
    <div className="flex justify-between lg:flex-col lg:gap-2">
      {pages.map((page) => (
        <PageListItem
          key={page.name}
          name={page.name}
          route={page.route}
          icon={page.icon}
          isActive={page.route === "/" + current}
        />
      ))}
      <button
        ref={menuRef}
        className="h-full lg:hidden px-3 rounded-full flex items-center relative"
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
          <div className="absolute w-40 ltr:right-5 rtl:!left-5 bottom-[50px] z-10 p-1 bg-[#303841] rounded-md transition-all duration-700">
            <div className="w-full flex justify-between items-center text-paragraph/70 my-1 py-1.5 px-2 rounded-md hover:bg-sidebar">
              <div>Profile</div>
              <FontAwesomeIcon icon={faUser} size="1x" />
            </div>
            <div className="w-full flex justify-between items-center text-paragraph/70 my-1 py-1.5 px-2 rounded-md hover:bg-sidebar">
              <div>Setting</div>
              <FontAwesomeIcon icon={faGear} size="1x" />
            </div>
            <div className="h-0.5 bg-paragraph/30"></div>
            <div className="w-full flex justify-between items-center text-paragraph/70 my-1 py-1.5 px-2 rounded-md hover:bg-sidebar">
              <div>Logout</div>
              <FontAwesomeIcon icon={faRightFromBracket} size="1x" />
            </div>
          </div>
        )}
      </button>
    </div>
  );
}
