import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

export default function ChangeChatImage({ onImageChange }) {
  return (
    <div className="w-full">
      <label
        htmlFor="file"
        className="w-full flex justify-between items-center gap-1 p-2 cursor-pointer"
      >
        <div className="text-[17px]">Change Image</div>
        <FontAwesomeIcon icon={faCamera} size="sm" />
      </label>
      <input
        className="hidden"
        id="file"
        type="file"
        onChange={onImageChange}
        onClick={(event) => {
          event.target.value = null;
        }}
      />
    </div>
  );
}
