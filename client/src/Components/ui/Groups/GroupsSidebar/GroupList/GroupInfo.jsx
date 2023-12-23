import React from "react";
import { checkDir } from "../../../../../helpers/messages";

export default function GroupInfo() {
  const message = "How many groups are available ? ";
  return (
    <div className="w-full h-full flex justify-between items-center">
      <div className="h-full flex flex-col items-start justify-between">
        <div>Group X</div>
        <div className="text-paragraph/50 text-sm flex gap-2 items-center">
          <div>Bassem</div>
          <div>:</div>
          <div dir={checkDir(message[0])}>{message.length < 25 ? message : (message.substring(0, 22) + "...")}</div>
        </div>
      </div>
      <div className="h-full flex flex-col items-end justify-between">
        <div className="text-paragraph/50 text-xs">07:36</div>
        <div className="w-full px-0.5 py-px bg-message/10 rounded-xl text-sm text-message font-semibold flex justify-center items-center">
          2
        </div>
      </div>
    </div>
  );
}
