import React from "react";
import logo from "../../../assets/images/home/logo.svg";
import { useTranslation } from "react-i18next";

export default function UserNotFound() {
  const { t } = useTranslation("users");

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img
        src={logo}
        alt="User Not Found"
        className="w-20 h-20 object-cover mb-8"
      />
      <h1 className="text-3xl font-bold text-paragraph pb-3">{t("user_not_found")}</h1>
      <p className="text-lg text-paragraph/70">
        {t("not_found_message")}
      </p>
    </div>
  );
}
