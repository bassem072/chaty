import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SearchGroups from "./SearchGroups";
import AddGroup from "./AddGroup";

export default function CreateGroup({ setShowBox }) {
  const { t } = useTranslation();
  const [isSearch, setIsSearch] = useState(true);

  return (
    <>
      <div className="w-full h-[5%]">{t("newGroup")}</div>
      <div className="w-full h-[9%] flex bg-active rounded-xl overflow-hidden text-lg font-normal">
        <button
          className={"w-full" + (isSearch ? " bg-primary" : "")}
          onClick={() => setIsSearch(true)}
        >
          {t("search_groups")}
        </button>
        <button
          className={"w-full" + (!isSearch ? " bg-primary" : "")}
          onClick={() => setIsSearch(false)}
        >
          {t("create_group")}
        </button>
      </div>
      <div className="w-full h-[86%] whitespace-nowrap overflow-auto scrollbar flex flex-col">
        {isSearch ? (
          <SearchGroups setShowBox={setShowBox} />
        ) : (
          <AddGroup setShowBox={setShowBox} />
        )}
      </div>
    </>
  );
}
