import React from 'react'
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import ContactsSidebar from '../Components/ui/Contacts/ContactsSidebar';
import NoChatSelected from '../Components/ui/Shared/NoChatSelected';
import ContactInfo from '../Components/ui/Contacts/ContactInfo';

export default function Contact() {
  const { t } = useTranslation("contacts");
  let { id } = useParams();

  return (
    <div className="w-full h-full flex justify-start items-center overflow-hidden">
      <Helmet>
        <title>{t("title")}</title>
      </Helmet>
      <ContactsSidebar />
      {id ? <ContactInfo /> : <NoChatSelected />}
    </div>
  );
}
