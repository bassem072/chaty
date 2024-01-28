import { faComments, faUser } from "@fortawesome/free-regular-svg-icons";
import React, { useEffect, useRef, useState } from "react";
import PageListItem from "./PageListItem";
import {
  faGear,
  faRightFromBracket,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logout } from "../../../../slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { clearMessagesHistory } from "../../../../slices/chatMessages";
import { clearChats } from "../../../../slices/chat";
import { useTranslation } from "react-i18next";

export default function PagesList() {
  const location = useLocation().pathname;
  const current = location.substring(1, location.length).split("/")[0];
  const { profilePic } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation("sidebar");
  const pages = [
    {
      name: "chats",
      route: "/chats",
      icon: faComments,
    },
    {
      name: "users",
      route: "/users",
      icon: faUsers,
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

  const MenuItem = ({ to, children, icon }) => (
    <Link
      to={to}
      onClick={() => dispatch(clearMessagesHistory())}
      className="w-full flex justify-between items-center text-paragraph/70 my-1 py-1.5 px-2 rounded-md hover:bg-sidebar"
    >
      <div>{children}</div>
      <FontAwesomeIcon icon={icon} size="1x" />
    </Link>
  );

  return (
    <div className="w-full lg:w-auto flex justify-between lg:flex-col gap-2">
      {pages.map((page) => (
        <PageListItem
          key={page.name}
          name={page.name}
          route={page.route}
          icon={page.icon}
          isActive={page.route === "/" + current}
        />
      ))}
      <div
        ref={menuRef}
        className="w-full h-full lg:hidden px-3 rounded-full flex justify-center items-center relative"
        onClick={() => setShow(!show)}
      >
        <img
          src={profilePic}
          alt="Profile Pic"
          width={40}
          height={40}
          className="rounded-full overflow-hidden border-[1.5px] border-paragraph"
        />
        {show && (
          <div className="absolute w-40 ltr:right-5 rtl:!left-5 bottom-[50px] z-10 p-1 bg-[#303841] rounded-md transition-all duration-700 z-30">
            <MenuItem to="/profile" icon={faUser}>
              {t('profile')}
            </MenuItem>
            <MenuItem to="/settings" icon={faGear}>
              {t("settings")}
            </MenuItem>
            <div className="h-0.5 bg-paragraph/30"></div>
            <button
              onClick={() => {
                dispatch(logout())
                  .unwrap()
                  .then((_) => {
                    dispatch(clearMessagesHistory());
                    dispatch(clearChats());
                    navigate("/auth");
                  })
                  .catch((err) => {});
              }}
              className="w-full flex justify-between items-center text-paragraph/70 my-1 py-1.5 px-2 rounded-md hover:bg-sidebar"
            >
              <div>{t("logout")}</div>
              <FontAwesomeIcon icon={faRightFromBracket} size="1x" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
