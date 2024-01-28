import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { useDispatch, useSelector } from "react-redux";
import { changeChatPic } from "../../../../../slices/chatMessages";

export default function SetChatImage({ chatId, setShowEditChatPic, image, setImage }) {
  const [slideValue, setSlideValue] = useState(10);
  const dispatch = useDispatch();
  const cropRef = useRef(null);

  const getBackgroundSize = () => {
    return { backgroundSize: `${((slideValue - 10) * 100) / 90}% 100%` };
  };

  const handleSave = () => {
    if (cropRef.current) {
      const canvas = cropRef.current.getImageScaledToCanvas();
      canvas.toBlob((blob) => {
        const formData = new FormData();
        formData.append("chatImage", blob, "chatImage.jpg");
        dispatch(changeChatPic({groupId: chatId, chatData: formData}))
          .unwrap()
          .then(() => {})
          .catch((err) => {});
      });
      setShowEditChatPic(false);
      setImage(null);
      setSlideValue(10);
    }
  };

  return (
    <div className="fixed w-screen h-screen bg-black/70 right-0 top-0 flex justify-center items-center whitespace-nowrap overflow-auto scrollbar z-30">
      <div className="w-[500px] h-[500px] flex flex-col gap-10 bg-active">
        <AvatarEditor
          ref={cropRef}
          image={image}
          style={{ width: "100%", height: "100%" }}
          border={50}
          borderRadius={150}
          color={[0, 0, 0, 0.72]}
          scale={slideValue / 10}
          rotate={0}
        />
        <div className="px-10 h-12">
          <input
            type="range"
            min="10"
            max="100"
            onChange={(e) => setSlideValue(e.target.value)}
            style={getBackgroundSize()}
            value={slideValue}
            className="w-full"
          />
        </div>
        <div className="flex gap-5 justify-center">
          <button
            onClick={() => {
              setShowEditChatPic(false);
              setImage(null);
              setSlideValue(10);
            }}
            className="w-20 py-1 bg-message rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="w-20 py-1 bg-message rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
      <button
        onClick={() => {
          setShowEditChatPic(false);
          setImage(null);
          setSlideValue(10);
        }}
        className="absolute top-5 right-5"
      >
        <FontAwesomeIcon icon={faClose} size="lg" />
      </button>
    </div>
  );
}
