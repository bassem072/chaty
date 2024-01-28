import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import userPic from "../../../../../assets/images/users/avatar.png";
import { getUserImageService } from "../../../../../services/user.service";

export default function TextMessage({
  message,
  checkShow,
  isNewDay,
  seen = true,
}) {
  const [profilePicture, setProfilePicture] = useState(userPic);
  const { user } = useSelector((state) => state.auth);
  const { i18n } = useTranslation();
  moment.locale(i18n.language);
  const isMe = user?.id === message.sender.id;
  const time = moment(message.createdAt).format("hh:mm A");
  const day = moment(message.createdAt).format(
    i18n.language === "ar" ? "yyyy/MM/DD" : "DD/MM/yyyy"
  );
  const name = message.sender.name.split(" ")[0];

  const checkDir = (char) => {
    if (/[\u0600-\u06FF]/.test(char)) {
      return "rtl";
    } else {
      return "ltr";
    }
  };

  useEffect(() => {
    if (
      user?.id !== message.sender.id &&
      message.sender.profileImage !== "default"
    ) {
      getUserImageService(message.sender.id)
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          setProfilePicture(url);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  }, [user, message]);

  return (
    <>
      {isNewDay && (
        <div className="w-full flex items-center my-2">
          <div className="w-full h-[2px] bg-sidebar/50"></div>
          <div className="px-3 py-2 bg-sidebar/50 rounded-2xl text-sm">
            {day}
          </div>
          <div className="w-full h-[2px] bg-sidebar/50"></div>
        </div>
      )}
      <div
        className={
          "w-full flex gap-5 items-end " +
          (isMe ? "justify-end " : "justify-start ") +
          (checkShow ? "mb-3" : " ")
        }
      >
        {!isMe && (
          <div className={"w-7"}>
            {checkShow && (
              <img src={profilePicture} alt="user" className="rounded-full" />
            )}
          </div>
        )}
        <div
          className={
            "relative w-auto max-w-xs min-w-[150px] p-2 text-white after:absolute after:w-0 after:h-0 after:border-t-[8px] after:border-t-transparent " +
            (isMe
              ? "bg-sidebar  " +
                (i18n.dir() === "rtl"
                  ? "rounded-tl-lg rounded-br-lg"
                  : "rounded-tr-lg rounded-bl-lg") +
                (checkShow
                  ? " after:border-r-[8px] after:border-l-[8px] after:bottom-0" +
                    (i18n.dir() === "rtl"
                      ? " after:border-l-transparent after:-left-4 after:border-r-sidebar"
                      : " after:border-r-transparent after:-right-4 after:border-l-sidebar")
                  : "")
              : "bg-message " +
                (i18n.dir() === "rtl"
                  ? "rounded-tr-lg rounded-bl-lg"
                  : "rounded-tl-lg rounded-br-lg") +
                (checkShow
                  ? " after:border-l-[8px] after:border-r-[8px] after:bottom-0" +
                    (i18n.dir() === "rtl"
                      ? " after:border-l-message after:border-r-transparent after:-right-4"
                      : " after:border-l-transparent after:border-r-message after:-left-4")
                  : ""))
          }
        >
          <div className="flex flex-col gap-1">
            {!isMe && (
              <div className="text-start text-[10px] text-paragraph/70">
                {name}
              </div>
            )}
            <div className="flex flex-col gap-1">
              <div
                className="text-start text-[15px]"
                dir={checkDir(message.content[0])}
              >
                {message.content}
              </div>
              <div className="min-w-[100px] flex justify-between items-center text-[11px]">
                <div className="flex gap-0.5 items-center text-paragraph/50">
                  <div>{time}</div>
                </div>
                {isMe && (
                  <div className={seen ? "text-message" : "text-paragraph"}>
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={
                        "relative -rotate-6 ltr:left-[5px] rtl:right-[5px]"
                      }
                    />
                    <FontAwesomeIcon icon={faCheck} className="-rotate-6" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
