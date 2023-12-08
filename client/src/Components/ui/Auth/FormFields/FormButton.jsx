import React from "react";

export default function FormButton({ name, disabled }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="w-36 h-12 bg-message rounded-3xl border-none outline-none capitalize font-medium my-2.5 cursor-pointer transition-all duration-500 hover:shadow-message/70 hover:shadow-my-shadow"
    >
      {name}
    </button>
  );
}
