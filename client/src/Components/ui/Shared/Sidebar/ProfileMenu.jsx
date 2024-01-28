import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faGear, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../../slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { clearMessagesHistory } from "../../../../slices/chatMessages";
import { clearChats } from "../../../../slices/chat";

export default function ProfileMenu() {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const menuRef = useRef();
  const { t } = useTranslation("sidebar");
  const navigate = useNavigate();
  const { profilePic } = useSelector((state) => state.auth);

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
    <div
      ref={menuRef}
      className="hidden lg:block px-3 rounded-full relative"
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
        <div className="absolute w-40 left-5 rtl:right-6 bottom-10 z-10 p-1 bg-[#303841] rounded-md transition-all duration-700">
          <MenuItem to="/profile" icon={faUser}>
            Profile
          </MenuItem>
          <MenuItem to="/settings" icon={faGear}>
            Setting
          </MenuItem>
          <div className="h-0.5 bg-paragraph/30"></div>
          <button
            onClick={() => {
              dispatch(logout())
                .unwrap()
                .then((payload) => {
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
  );
}
