import React from 'react'
import { useTranslation } from 'react-i18next';
import SearchBox from '../../Shared/SearchBox';

export default function Search() {
  const { t } = useTranslation("contacts");
  return (
    <SearchBox
      placeholder={t("sidebar.searchPlaceholder")}
      setVal={(val) => {}}
    />
  );
}
