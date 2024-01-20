import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import userPic from "../../../../../assets/images/users/user_2.png";

export default function TextMessage({ message, checkShow, isNewDay, seen = true }) {
  const { user } = useSelector((state) => state.auth);
  const { i18n } = useTranslation();
  moment.locale(i18n.language);
  const isMe = user?.id === message.sender.id;
  const time = moment(message.createdAt).format("hh:mm A");
  const day = moment(message.createdAt).format(
    i18n.language === "ar" ? "yyyy/MM/DD" : "DD/MM/yyyy"
  );

  const checkDir = (char) => {
    if (/[\u0600-\u06FF]/.test(char)) {
      return "rtl";
    } else {
      return "ltr";
    }
  };
  
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
              <img src={userPic} alt="user" className="rounded-full" />
            )}
          </div>
        )}
        <div
          className={
            isMe
              ? "message-bubble-right bg-sidebar" +
                (checkShow
                  ? " after:message-bubble-right-after ltr:after:border-l-sidebar rtl:after:border-r-sidebar"
                  : "")
              : "message-bubble-left" +
                (checkShow ? " after:message-bubble-left-after" : "")
          }
        >
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
    </>
  );
}
