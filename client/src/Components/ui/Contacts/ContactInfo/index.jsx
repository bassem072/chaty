import React from "react";
import user from "../../../../assets/images/users/avatar.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

export default function ContactInfo() {
  const { t, i18n } = useTranslation("profile");

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[90%] h-[90%] bg-sidebar rounded-lg whitespace-nowrap overflow-auto scrollbar">
        <Link
          to="/contacts"
          className="flex lg:hidden bg-sidebar px-5 py-5 rounded-full"
        >
          <FontAwesomeIcon
            icon={i18n.language === "ar" ? faAngleRight : faAngleLeft}
          />
        </Link>
        <div className="py-10 lg:pt-20 px-10 flex items-start flex-col gap-5">
          <div className="relative mb-10">
            <img
              src={user}
              alt="user"
              width={150}
              height={150}
              className="rounded-full border-4 border-message/70"
            />
            <div className="absolute w-4 h-4 bg-green-500 rounded-full ltr:left-3/4 rtl:left-[15%] bottom-[5%]"></div>
          </div>
          <div className="text-3xl">Bassem Elsayed</div>
          <div className="flex flex-col gap-0.5 items-start">
            <div className="text-paragraph/70 text-sm">{t("about")}</div>
            <div>Ideas are useless if they remain unused.</div>
          </div>
          <div className="flex flex-col gap-0.5 items-start">
            <div className="text-paragraph/70 text-sm">{t("email")}</div>
            <div>bassemelsayd072@gmail.com</div>
          </div>
          <Link
            to={"/chats/1"}
            className="bg-message px-3 py-2 rounded font-semibold flex items-center gap-3"
          >
            <FontAwesomeIcon icon={faComment} />
            <div>{t("send")}</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
