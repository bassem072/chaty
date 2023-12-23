import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import GroupsSidebar from "../Components/ui/Groups/GroupsSidebar";
import NoChatSelected from "../Components/ui/Shared/NoChatSelected";
import GroupMessages from "../Components/ui/Groups/GroupMessages";

export default function Group() {
  const { t } = useTranslation("groups");
  let { id } = useParams();

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Helmet>
        <title>{t("title")}</title>
      </Helmet>
      <GroupsSidebar />
      {id ? <GroupMessages /> : <NoChatSelected />}
    </div>
  );
}
