import React from 'react'
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import ProfileContent from '../Components/ui/Profile/ProfileContent';

export default function Profile() {
  const { t } = useTranslation("profile");

  return (
    <div className="w-full h-full flex justify-start items-center overflow-hidden">
      <Helmet>
        <title>{t("title")}</title>
      </Helmet>
      <ProfileContent />
    </div>
  );
}
