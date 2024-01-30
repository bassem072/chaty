import React, { useEffect, useState } from "react";
import userPic from "../../../../../assets/images/users/avatar.png";
import { getUserImageService } from "../../../../../services/user.service";
import { useTranslation } from "react-i18next";

export default function TypingMessage({ user }) {
  const [profilePicture, setProfilePicture] = useState(userPic);
  const { i18n } = useTranslation();

  useEffect(() => {
    if (user.profileImage !== "default") {
      getUserImageService(user._id)
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          setProfilePicture(url);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  }, [user]);

  return (
    <div className="w-full flex gap-5 items-end justify-start mb-3">
      <div className={"w-7"}>
        <img src={profilePicture} alt="user" className="rounded-full" />
      </div>
      <div
        className={
          "relative w-auto max-w-xs px-3 py-3 text-white after:absolute after:w-0 after:h-0 after:border-t-[8px] after:border-t-transparent bg-message after:border-l-[8px] after:border-r-[8px] after:bottom-0 " +
          (i18n.dir() === "rtl"
            ? "rounded-tr-lg rounded-bl-lg after:border-l-message after:border-r-transparent after:-right-4"
            : "rounded-tl-lg rounded-br-lg after:border-l-transparent after:border-r-message after:-left-4")
        }
      >
        <div className="flex space-x-2 justify-center items-center">
          <span className="sr-only">Loading...</span>
          <div className="h-1.5 w-1.5 bg-paragraph rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-1.5 w-1.5 bg-paragraph rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-1.5 w-1.5 bg-paragraph rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}
