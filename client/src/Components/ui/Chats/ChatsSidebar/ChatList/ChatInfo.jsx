import React from 'react'

export default function ChatInfo() {
  return (
    <div className="w-full h-full flex justify-between items-center">
      <div className="h-full flex flex-col items-start justify-between">
        <div>Bassem Elsayed</div>
        <div className="text-paragraph/50 text-sm">How are you doing ?</div>
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
