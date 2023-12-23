import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import user from "../../../assets/images/users/user_5.png";
import { useTranslation } from "react-i18next";
import { faPen } from "@fortawesome/free-solid-svg-icons";

export default function EditProfile() {
  const { t } = useTranslation("settings");

  return (
    <div className="w-full h-full py-10 lg:pt-20 px-10 flex items-center justify-center flex-col gap-5 pb-48">
      <div className="relative mb-3">
        <img
          src={user}
          alt="user"
          width={120}
          height={120}
          className="rounded-full border-4 border-message/70"
        />
        <button className="absolute w-8 h-8 flex justify-center items-center bg-message rounded-full ltr:left-3/4 rtl:left-[15%] bottom-[5%]">
          <FontAwesomeIcon icon={faPen} />
        </button>
      </div>
      <div className="text-3xl">Bassem Elsayed</div>
      <div className="flex flex-col gap-0.5 items-center">
        <div className="text-paragraph/70 text-sm">{t("about")}</div>
        <div>Ideas are useless if they remain unused.</div>
      </div>
      <div className="flex flex-col gap-0.5 items-center">
        <div className="text-paragraph/70 text-sm">{t("email")}</div>
        <div>bassemelsayd072@gmail.com</div>
      </div>
      <Link
        to={"/settings/editProfile"}
        className="bg-message px-4 py-2 rounded font-medium"
      >
        <div>{t("save")}</div>
      </Link>
    </div>
  );
}
