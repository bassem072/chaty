import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function SettingListItem({ page, icon, isActive }) {
  const { t } = useTranslation("settings");
  
  return (
    <Link
      to={"/settings/" + page}
      className={
        "w-full py-5 hover:bg-sidebar px-3 flex gap-3 items-center rounded-md cursor-pointer" +
        (isActive ? " bg-sidebar" : "")
      }
    >
      <div className="text-paragraph/80"><FontAwesomeIcon icon={icon} size="lg" /></div>
      <div>{t("sidebar." + page)}</div>
    </Link>
  );
}
