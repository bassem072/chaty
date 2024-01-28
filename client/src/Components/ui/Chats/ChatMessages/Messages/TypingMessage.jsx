import React, { useEffect, useState } from "react";
import userPic from "../../../../../assets/images/users/avatar.png";
import { getUserImageService } from "../../../../../services/user.service";

export default function TypingMessage({ user }) {
  const [profilePicture, setProfilePicture] = useState(userPic);

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
      <div className="message-bubble-left after:message-bubble-left-after p-3 min-w-0">
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
