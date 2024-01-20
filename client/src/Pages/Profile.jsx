import React from 'react'
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import ProfileImages from '../Components/ui/Profile/ProfileImages';
import ProfileInfo from '../Components/ui/Profile/ProfileInfo';

export default function Profile() {
  const { t } = useTranslation("profile");

  return (
    <div className="w-full h-full flex justify-start items-center overflow-hidden">
      <Helmet>
        <title>{t("title")}</title>
      </Helmet>
      <div className="w-full h-full flex flex-col gap-72 lg:gap-44 whitespace-nowrap overflow-auto scrollbar">
        <ProfileImages />
        <ProfileInfo />
      </div>
    </div>
  );
}
