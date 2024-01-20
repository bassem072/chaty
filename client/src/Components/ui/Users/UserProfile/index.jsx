import React from "react";
import ProfileImages from "./ProfileImages";
import ProfileInfo from "./ProfileInfo";

export default function UserProfile({ user }) {
  return (
    <div className="w-full h-full flex flex-col gap-72 lg:gap-44 whitespace-nowrap overflow-auto scrollbar">
      <ProfileImages user={user} />
      <ProfileInfo user={user} />
    </div>
  );
}
