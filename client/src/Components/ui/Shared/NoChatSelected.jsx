import React from "react";
import logo from "../../../assets/images/home/logo.svg";
import { useTranslation } from "react-i18next";

export default function NoChatSelected({ showInMobile = false }) {
  const { t } = useTranslation();

  return (
    <div
      className={
        "w-full h-full flex-col justify-center items-center gap-5 " +
        (showInMobile ? "flex" : "hidden lg:flex")
      }
    >
      <div className="flex gap-3 items-center">
        <img src={logo} alt="logo" width={40} height={40} />
        <div className="w-0.5 h-7 bg-paragraph/70"></div>
        <div className="text-paragraph/70 text-xl font-semibold">
          {t("title").split(" ")[0]}
        </div>
      </div>
      <div className="max-w-xs text-paragraph/50">{t("description")}</div>
    </div>
  );
}
