import React from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SearchBox({ placeholder, val, onChange }) {
  return (
    <div className="w-full px-5">
      <div className="w-full h-12 bg-sidebar flex items-center rounded">
        <div className="w-12 h-full flex justify-center items-center text-paragraph/70">
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <input
          type="text"
          name="search"
          placeholder={placeholder}
          value={val}
          className="w-full bg-transparent outline-none placeholder:text-paragraph/50 placeholder:font-thin placeholder:text-sm"
          onChange={onChange}
        />
      </div>
    </div>
  );
}
