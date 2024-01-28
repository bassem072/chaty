import React, { useEffect, useState } from "react";
import userPic from "../../../../../../assets/images/users/avatar.png";
import { getUserImageService } from "../../../../../../services/user.service";
import { useTranslation } from "react-i18next";

export default function UserListItem({ user, addToSelectedUsers }) {
  const [profilePicture, setProfilePicture] = useState(userPic);
  const { t } = useTranslation();

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
    <div className="w-full py-3 px-2 flex justify-between items-center hover:bg-sidebar rounded-xl">
      <div className="flex items-center gap-3">
        <img
          src={profilePicture}
          alt="user"
          width={38}
          height={38}
          className="rounded-full"
        />
        <div className="font-semibold text-paragraph/90">{user.name}</div>
      </div>
      <button
        onClick={() => addToSelectedUsers(user)}
        className="px-3 py-1 bg-message rounded-md font-normal"
      >
        {t("new_group.add")}
      </button>
    </div>
  );
}
