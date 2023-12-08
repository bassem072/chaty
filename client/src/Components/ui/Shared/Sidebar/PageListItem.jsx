import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";
import Tooltip from "../Tooltip";

export default function PageListItem({ name, route, icon, isActive }) {
  return (
    <NavLink
      to={route}
      className={`group relative w-14 lg:w-full h-full lg:h-16 hover:bg-message/20 hover:text-message flex justify-center items-center rounded-lg transition-all duration-300 ${
        isActive ? "bg-message/20 text-message" : "text-paragraph/50"
      }`}
    >
      <FontAwesomeIcon icon={icon} size="xl" />
      <Tooltip name={name} customStyle="bottom-[70px]" />
    </NavLink>
  );
}
