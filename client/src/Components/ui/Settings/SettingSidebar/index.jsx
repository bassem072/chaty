import React from 'react'
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import SettingList from './SettingList';

export default function SettingSidebar() {
  const { t } = useTranslation("settings");
  const { page } = useParams();
  const availablePages = ["editProfile", "appSettings"]
  const include = availablePages.includes(page);

  return (
    <div
      className={
        "h-full bg-active py-6" +
        (include
          ? " hidden lg:flex flex-col gap-5"
          : " w-full lg:w-auto flex flex-col gap-5")
      }
    >
      <div className="w-full lg:w-[380px] text-start text-xl font-semibold px-5">
        {t("settings")}
      </div>
      <SettingList />
    </div>
  );
}
