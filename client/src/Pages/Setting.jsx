import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import SettingSidebar from "../Components/ui/Settings/SettingSidebar";
import NoChatSelected from "../Components/ui/Shared/NoChatSelected";
import EditProfile from "../Components/ui/Settings/EditProfile";
import AppSettings from "../Components/ui/Settings/AppSettings";

export default function Setting() {
  const { t } = useTranslation("settings");
  const { page } = useParams();
  const availablePages = ["editProfile", "appSetting"];
  const include = page && availablePages.includes(page);
  console.log(include);
  const pages = {editProfile: <EditProfile />, appSetting: <AppSettings />};

  return (
    <div className="w-full h-full flex justify-start items-center overflow-hidden">
      <Helmet>
        <title>{t("title")}</title>
      </Helmet>
      <SettingSidebar />
      {include ? pages[page] : <NoChatSelected />}
    </div>
  );
}
