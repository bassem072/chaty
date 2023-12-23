import React from 'react'
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import Search from './Search';
import ContactList from './ContactList';

export default function ContactsSidebar() {
  const { t } = useTranslation("contacts");
  let { id } = useParams();

  return (
    <div
      className={
        "h-full bg-active py-6" +
        (id
          ? " hidden lg:flex flex-col gap-5"
          : " w-full lg:w-auto flex flex-col gap-5")
      }
    >
      <div className="w-full lg:w-[380px] text-start text-xl font-semibold px-5">
        {t("contacts")}
      </div>
      <Search />
      <ContactList />
    </div>
  );
}
