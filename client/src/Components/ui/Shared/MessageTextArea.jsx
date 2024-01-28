import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import useAutoSizeTextArea from "../../../helpers/Hooks/useAutoSizeTextArea";
import { socket } from "../../../socket";
import { useSelector } from "react-redux";

export default function MessageTextArea({ message, setMessage, send }) {
  const textAreaRef = useRef();
  const { t, i18n } = useTranslation();
  const [dir, setDir] = useState(i18n.language === "ar" ? "rtl" : "ltr");
  const [typing, setTyping] = useState(false);
  const [timeoutVal, setTimeoutVal] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { chat } = useSelector((state) => state.chatMessages);

  useAutoSizeTextArea(textAreaRef.current, message);

  function timeoutFunction() {
    setTyping(false);
    socket.emit("stop_typing", chat, user.id);
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      socket.emit("stop_typing", chat, user.id);
      send();
    } else {
      if (typing === false) {
        setTyping(true);
        socket.emit("start_typing", chat, user.id);
        setTimeoutVal(setTimeout(timeoutFunction, 2000));
      } else {
        clearTimeout(timeoutVal);
        setTimeoutVal(setTimeout(timeoutFunction, 2000));
      }
    }
  };

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

    setMessage(val);
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
        value={message}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
}
