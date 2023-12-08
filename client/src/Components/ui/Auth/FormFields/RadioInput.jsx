import React from 'react'

export default function RadioInput({ onChange, onBlur, name, val, text, condition, currentVal }) {
  return (
    <div
      className={
        "flex justify-between w-full border-2 rounded-md p-2 " +
        (condition
          ? "border-red-600"
          : "border-active")
      }
    >
      <p>{text}</p>
      <input
        type="radio"
        name={name}
        value={val}
        onChange={onChange}
        onBlur={onBlur}
        defaultChecked={currentVal === val}
      />
    </div>
  );
}
