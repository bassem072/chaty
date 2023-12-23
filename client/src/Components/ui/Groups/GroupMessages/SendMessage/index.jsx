import React from 'react'
import MessageTextArea from '../../../Shared/MessageTextArea';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import send from "../../../../../assets/icons/send.png";

export default function SendMessage() {
  return (
    <div className="w-full px-4 py-3 border-t-[.2px] border-paragraph/5 flex gap-3 items-center outline-none focus:outline-none">
      <MessageTextArea />
      <div className="h-full flex items-end gap-2">
        <div className="h-10 px-3.5 flex justify-center items-center rounded text-paragraph/70">
          <FontAwesomeIcon icon={faFaceSmile} size="sm" />
        </div>
        <div className="h-9 px-3.5 flex justify-center items-center rounded text-paragraph/70">
          <FontAwesomeIcon icon={faPaperclip} size="sm" rotate={-45} />
        </div>
        <div className="h-9 w-12 px-3.5 flex justify-center items-center rounded text-message">
          <img
            src={send}
            alt="send"
            width={40}
            height={40}
            className="rotate-45"
          />
        </div>
      </div>
    </div>
  );
}
