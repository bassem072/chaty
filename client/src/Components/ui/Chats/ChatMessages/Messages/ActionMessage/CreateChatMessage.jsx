import React from "react";
import { useTranslation } from "react-i18next";

export default function CreateChatMessage() {
  const { t } = useTranslation();

  return <div>{t("messageType.create_chat")}</div>;
}
