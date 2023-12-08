import React from 'react';
import { NavLink } from "react-router-dom";
import logo from "../../../../assets/images/home/logo.svg";

export default function Logo() {
  return (
    <NavLink to="/" className="hidden lg:block px-4">
      <img src={logo} alt="Logo" width={30} height={30} />
    </NavLink>
  );
}
