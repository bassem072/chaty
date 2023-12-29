import React from "react";
import SearchBox from "../../Shared/SearchBox";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function Search() {
  const { t } = useTranslation("chats");
  const { filter } = useSelector((state) => state.chat);
  return (
    <SearchBox placeholder={t("search." + filter)} setVal={(val) => {}} />
  );
}
