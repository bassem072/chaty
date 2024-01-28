import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userPic from "../../../../assets/images/users/avatar.png";
import { getUserImageService } from "../../../../services/user.service";

export default function UserSearchItem({ user }) {
  const [profilePicture, setProfilePicture] = useState(userPic);

  useEffect(() => {
    if (user.profileImage !== "default") {
      getUserImageService(user.id)
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
    <Link
      to={`/users/${user.id}`}
      className="w-full py-3 flex items-center gap-4 hover:bg-active px-2 rounded-md"
    >
      <img
        src={profilePicture}
        alt="user"
        width={38}
        height={38}
        className="rounded-full"
      />
      <div>{user.name}</div>
    </Link>
  );
}
