import React, { useEffect, useRef } from "react";
import CreateChat from "./CreateChat";
import CreateGroup from "./CreateGroup";

export default function CreateBox({ showBox, setShowBox }) {
  const boxRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setShowBox(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowBox]);
  return (
    <div className="fixed w-screen h-screen top-0 right-0 flex justify-center items-center z-20 bg-black/20">
      <div
        ref={boxRef}
        className="w-[500px] h-[70%] bg-sidebar rounded-3xl flex flex-col items-center py-10 px-5 overflow-hidden"
      >
        <div className="w-full h-full flex flex-col gap-7 justify-center items-center overflow-auto scrollbar">
          {showBox === "chat" && <CreateChat setShowBox={setShowBox} />}
          {showBox === "group" && <CreateGroup />}
        </div>
      </div>
    </div>
  );
}
