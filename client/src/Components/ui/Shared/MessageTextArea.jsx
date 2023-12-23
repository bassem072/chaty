import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import useAutoSizeTextArea from "../../../helpers/Hooks/useAutoSizeTextArea";

export default function MessageTextArea({ messageType }) {
  const [value, setValue] = useState("");
  const textAreaRef = useRef();
  const { t, i18n } = useTranslation(messageType);
  const [dir, setDir] = useState(i18n.language === "ar" ? "rtl" : "ltr");

  useAutoSizeTextArea(textAreaRef.current, value);

  const handleChange = (evt) => {
    const val = evt.target?.value;

    if (val) {
      if (/[\u0600-\u06FF]/.test(val[0])) {
        setDir("rtl");
      } else {
        setDir("ltr");
      }
    } else {
      setDir(i18n.language === "ar" ? "rtl" : "ltr");
    }

    setValue(val);
  };

  return (
    <div className="w-full p-2 bg-sidebar rounded flex items-center">
      <textarea
        className="w-full bg-transparent border-0 rounded-none text-sm leading-6 resize-none focus:outline-none scrollbar"
        onChange={handleChange}
        placeholder={t("messagePlaceholder")}
        ref={textAreaRef}
        dir={dir}
        rows={1}
        value={value}
      />
    </div>
  );
}
