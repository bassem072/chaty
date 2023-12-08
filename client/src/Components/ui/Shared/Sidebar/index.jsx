import React from "react";
import PagesList from "./PagesList";
import Logo from "./Logo";
import ProfileMenu from "./ProfileMenu";

export default function Sidebar() {
  return (
    <div className="h-20 lg:h-full lg:w-20 bg-sidebar px-5 lg:px-2 py-3 lg:py-5 flex lg:flex-col item-center justify-around lg:justify-between">
      <Logo />
      <PagesList />
      <ProfileMenu />
    </div>
  );
}
