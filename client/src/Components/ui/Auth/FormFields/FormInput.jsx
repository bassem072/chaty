import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export default function FormInput({
  name,
  type,
  placeholder,
  icon,
  val,
  onChange,
  onBlur,
  condition,
  error,
}) {
  const [show, setShow] = useState(false);

  return (
    <>
      <div
        className={
          "relative max-w-sm w-full h-14 bg-active my-2.5 rounded-xl grid grid-cols-[15%_85%] px-1.5 text-paragraph border-[1px] overflow-hidden " +
          (condition
            ? "border-red-600"
            : "border-active")
        }
      >
        <i className="text-center leading-[55px] text-lg">
          <FontAwesomeIcon icon={icon} />
        </i>
        <input
          type={type === "password" && !show ? "password" : "text"}
          name={name}
          placeholder={placeholder}
          value={val}
          onChange={onChange}
          onBlur={onBlur}
          className="bg-active autofill:!bg-active selection:bg-active outline-none border-none leading-none text-lg placeholder:text-[#aaa]"
        />
        {type === "password" ? (
          <button
            type="button"
            className="absolute top-1/2 -translate-y-1/2 right-2"
            onClick={() => setShow(!show)}
          >
            <FontAwesomeIcon
              icon={show ? faEyeSlash : faEye}
              className="mr-2 text-message"
            />
          </button>
        ) : null}
      </div>
      <div className="max-w-sm w-full h-3 text-sm text-red-600">
        {condition ? "* " + error : null}
      </div>
    </>
  );
}
