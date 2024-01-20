import React from "react";
import { useTranslation } from "react-i18next";
import EditProfileItem from "./EditProfileItem";

export default function EditProfile() {
  const { t } = useTranslation("settings");

  return (
    <div className="w-full h-full flex flex-col gap-5 p-6">
      <div className="text-xl font-semibold">{t("sidebar.editProfile")}</div>
      <EditProfileItem title="name" />
      <div className="w-full h-[1px] bg-paragraph/30"></div>
      <EditProfileItem title="bio" />
      <div className="w-full h-[1px] bg-paragraph/30"></div>
      <EditProfileItem title="birthdate" />
      <div className="w-full h-[1px] bg-paragraph/30"></div>
      <EditProfileItem title="gender" />
    </div>
  );
}
