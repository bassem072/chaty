import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import SettingSidebar from "../ui/Settings/SettingSidebar";

export default function SettingLayout({ children }) {
  const { t } = useTranslation("settings");

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full h-full flex justify-center items-center">
        <Helmet>
          <title>{t("title")}</title>
        </Helmet>
        <SettingSidebar />
        {children}
      </div>
    </div>
  );
}
