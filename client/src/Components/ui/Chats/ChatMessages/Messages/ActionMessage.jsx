import React from "react";
import { useTranslation } from "react-i18next";

export default function ActionMessage({ message, checkShow, isNewDay }) {
  const { t } = useTranslation();

  const title = () => {
    switch (message.messageType) {
      case "create_chat": {
        return t("messageType.create_chat");
      }
      default: {
      }
    }
  };
  return <div className="text-sm text-paragraph/70 py-2">{title()}</div>;
}
