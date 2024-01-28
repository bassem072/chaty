import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { getUserImageService } from "../../../../../../services/user.service";
import userPic from "../../../../../../assets/images/users/avatar.png";

export default function SelectedUserListItem({
  selectedUser,
  removeFromSelectedUsers,
  index,
}) {
  const [profilePicture, setProfilePicture] = useState(userPic);

  useEffect(() => {
    if (selectedUser.profileImage !== "default") {
      getUserImageService(selectedUser.id)
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          setProfilePicture(url);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  }, [selectedUser]);

  return (
    <div className="px-3 py-1 bg-primary rounded-full flex justify-between items-center gap-6">
      <div className="flex items-center gap-2">
        <img
          src={profilePicture}
          alt="user"
          width={20}
          height={20}
          className="rounded-full"
        />
        <div>{selectedUser.name}</div>
      </div>
      <button
        className="w-2"
        onClick={() => {
          removeFromSelectedUsers(index);
        }}
      >
        <FontAwesomeIcon icon={faClose} />
      </button>
    </div>
  );
}
