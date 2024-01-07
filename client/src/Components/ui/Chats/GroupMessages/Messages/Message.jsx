import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import moment from "moment";
import "moment/locale/ar";
import { useTranslation } from 'react-i18next';
import user from "../../../../../assets/images/users/user_2.png";
import { checkDir } from '../../../../../helpers/messages';

export default function Message({ id, userId, seen, show, content, date, newDay, index }) {
  const { i18n } = useTranslation();
  moment.locale(i18n.language);
  const isMe = userId === 1;
  const time = moment(date).format("hh:mm A");
  const day = moment(date).format(
    i18n.language === "ar" ? "yyyy/MM/DD" : "DD/MM/yyyy"
  );

  return (
    <>
      {newDay && (
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
          (show ? "mb-3" : " ")
        }
      >
        {!isMe && (
          <div className={"w-7"}>
            {show && <img src={user} alt="user" className="rounded-full" />}
          </div>
        )}
        <div
          className={
            isMe
              ? "message-bubble-right bg-sidebar" +
                (show
                  ? " after:message-bubble-right-after ltr:after:border-l-sidebar rtl:after:border-r-sidebar"
                  : "")
              : "message-bubble-left" +
                (show ? " after:message-bubble-left-after" : "")
          }
        >
          <div className="flex flex-col gap-0.5">
            {!isMe && <div className="text-start text-[10px] text-paragraph/70">Bassem Elsayed</div>}
            <div className="flex flex-col gap-1">
              <div
                className="text-start text-[15px]"
                dir={checkDir(content[0])}
              >
                {content}
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
