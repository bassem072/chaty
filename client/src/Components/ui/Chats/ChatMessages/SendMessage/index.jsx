import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import MessageTextArea from "../../../Shared/MessageTextArea";
import EmojiPicker from "emoji-picker-react";
import sendImg from "../../../../../assets/icons/send.png";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMessage, updateChat } from "../../../../../slices/chatMessages";
import { newMessage } from "../../../../../slices/chat";
import { socket } from "../../../../../socket";
import { useTranslation } from "react-i18next";

export default function SendMessage() {
  const { chat } = useSelector((state) => state.chatMessages);
  const { i18n } = useTranslation();
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [messageType, setMessageType] = useState("text");
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const emojiRef = useRef();

  const onEmojiClick = (emojiObject, event) => {
    event.preventDefault();
    setMessage(message + emojiObject.emoji);
  };

  const send = () => {
    if (message.trim().length > 0) {
      const body = {
        content: message.trim(),
      };

      if (file) {
        body.fileUrl = file;
        body.messageType = messageType;
      }

      dispatch(createMessage({ chatId: chat.id, messageData: body }))
        .unwrap()
        .then((payload) => {
          setMessage("");
          setFile("");
          setMessageType("text");
          socket.emit("send_message", payload);
        })
        .catch((err) => {});
    }
  };

  useEffect(() => {
    dispatch(newMessage(chat));
  }, [chat, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setShowEmoji(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef]);

  return (
    <div className="w-full px-4 py-3 border-t-[.2px] border-paragraph/5 flex gap-3 items-center outline-none focus:outline-none">
      <MessageTextArea message={message} setMessage={setMessage} send={send} />
      <div className="h-full flex items-end gap-2">
        <div className="relative h-10 px-3.5 flex justify-center items-center rounded text-paragraph/70">
          <button onClick={() => setShowEmoji(!showEmoji)}>
            <FontAwesomeIcon icon={faFaceSmile} size="sm" />
          </button>
          {showEmoji && (
            <div
              ref={emojiRef}
              className={
                "absolute bottom-14 " +
                (i18n.dir() === "rtl" ? "-left-full" : "-right-full")
              }
            >
              <EmojiPicker
                onEmojiClick={onEmojiClick}
                emojiStyle="native"
                theme="dark"
                lazyLoadEmojis={false}
                className="!w-[250px] md:!w-[300px] !h-[350px] md:!h-[400px]"
              />
            </div>
          )}
        </div>
        <div className="h-9 px-3.5 flex justify-center items-center rounded text-paragraph/70 z-10">
          <FontAwesomeIcon icon={faPaperclip} size="sm" rotate={-45} />
        </div>
        <button
          className="h-9 w-12 px-3.5 flex justify-center items-center rounded text-message"
          onClick={send}
        >
          <img
            src={sendImg}
            alt="send"
            width={40}
            height={40}
            className="ltr:rotate-45 rtl:rotate-[225deg]"
          />
        </button>
      </div>
    </div>
  );
}
