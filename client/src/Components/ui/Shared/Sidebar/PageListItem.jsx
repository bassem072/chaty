import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import Tooltip from "../Tooltip";
import { useTranslation } from "react-i18next";

export default function PageListItem({ name, route, icon, isActive }) {
  const { t } = useTranslation("sidebar");

  return (
    <Link
      to={route}
      className={`group relative w-full lg:w-full h-full lg:h-16 hover:bg-message/20 hover:text-message flex justify-center items-center gap-2 rounded-lg transition-all duration-300 ${
        isActive ? "bg-message/20 text-message" : "text-paragraph/50"
      }`}
    >
      <FontAwesomeIcon icon={icon} size="xl" />
      <Tooltip name={t(name)} customStyle="bottom-[70px] bg-black" />
    </Link>
  );
}
