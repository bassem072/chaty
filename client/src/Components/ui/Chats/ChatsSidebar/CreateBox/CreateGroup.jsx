import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SearchGroups from "./SearchGroups";
import AddGroup from "./AddGroup";

export default function CreateGroup() {
  const { t } = useTranslation();
  const [isSearch, setIsSearch] = useState(true);

  return (
    <>
      <div>{t("newGroup")}</div>
      <div className="w-full h-16 flex bg-active rounded-xl overflow-hidden text-lg font-normal">
        <button
          className={"w-full" + (isSearch ? " bg-primary" : "")}
          onClick={() => setIsSearch(true)}
        >
          Search Groups
        </button>
        <button
          className={"w-full" + (!isSearch ? " bg-primary" : "")}
          onClick={() => setIsSearch(false)}
        >
          Create Group
        </button>
      </div>
      <div className="w-full h-full">
        {
          isSearch ? <SearchGroups /> : <AddGroup />
        }
      </div>
    </>
  );
}
