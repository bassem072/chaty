import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function AppSettings() {
  const { t, i18n } = useTranslation("settings");
  const languages = { en: "English", ar: "العربية" };
  const [show, setShow] = useState(false);

  return (
    <div className="w-full h-full flex flex-col gap-5 p-6">
      <div className="text-xl font-semibold">{t("sidebar.appSetting")}</div>
      <div className="w-full py-3 flex justify-between items-center">
        <div>{t("language")}</div>
        <div className="relative px-5 h-10 bg-sidebar flex items-center">
          <button
            className="flex gap-2 items-center"
            onClick={() => setShow(!show)}
          >
            <div>{languages[i18n.language]}</div>
            <FontAwesomeIcon icon={faAngleDown} />
          </button>
          {show && (
            <div className="absolute w-full bg-active top-10 right-0 flex flex-col">
              {Object.keys(languages).map((lang) => (
                <button
                  className="h-10"
                  onClick={() => {
                    i18n.changeLanguage(lang);
                    setShow(false);
                  }}
                >
                  {languages[lang]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
