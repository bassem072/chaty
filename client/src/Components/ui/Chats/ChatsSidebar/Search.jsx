import React from "react";
import SearchBox from "../../Shared/SearchBox";
import { useTranslation } from "react-i18next";

export default function Search() {
  const { t } = useTranslation("chats");
  return (
    <SearchBox
      placeholder={t("sidebar.searchPlaceholder")}
      setVal={(val) => {}}
    />
  );
}
