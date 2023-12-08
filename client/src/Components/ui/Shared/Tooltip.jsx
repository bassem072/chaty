import React from "react";

export default function Tooltip({
  name,
  customStyle,
}) {
  return (
    <div className={"absolute text-xs top-[] z-10 hidden group-hover:block bg-black text-white p-2 rounded " + customStyle}>
      {name}
      <div className="tooltip-arrow"></div>
    </div>
  );
}
