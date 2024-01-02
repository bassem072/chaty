import { faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import CreateBox from "./CreateBox";

export default function SidebarHeader() {
  const { i18n, t } = useTranslation("chats");
  const [show, setShow] = useState(false);
  const [showBox, setShowBox] = useState(null);
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
    <div className="w-full lg:w-[380px] text-start text-xl font-semibold px-5 flex justify-between items-center">
      <div>{t("header")}</div>
      <div ref={menuRef} className="relative" onClick={() => setShow(!show)}>
        <FontAwesomeIcon icon={faPenToSquare} />
        {show && (
          <div
            className={
              "absolute w-40 top-10 z-10 p-1 bg-primary rounded-md transition-all duration-700 text-paragraph/70 text-sm font-normal " +
              (i18n.dir() === "rtl" ? "left-0" : "right-0")
            }
          >
            <button
              className="w-full flex justify-between items-center my-1 py-1.5 px-2 rounded-md hover:bg-sidebar"
              onClick={() => {
                setShowBox("chat");
                setShow(false);
              }}
            >
              <div>{t("newMessage")}</div>
              <FontAwesomeIcon icon={faUser} />
            </button>
            <button
              className="w-full flex justify-between items-center my-1 py-1.5 px-2 rounded-md hover:bg-sidebar"
              onClick={() => {
                setShowBox("group");
                setShow(false);
              }}
            >
              <div>{t("newGroup")}</div>
              <FontAwesomeIcon icon={faUsers} />
            </button>
          </div>
        )}
      </div>
      {showBox && <CreateBox showBox={showBox} setShowBox={setShowBox} />}
    </div>
  );
}
