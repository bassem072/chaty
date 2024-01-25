import { faCamera, faClose, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import cover from "../../../assets/images/home/cover.webp";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AvatarEditor from "react-avatar-editor";
import { changeProfilePic } from "../../../slices/auth";

export default function ProfileImages() {
  const { user, profilePic } = useSelector((state) => state.auth);
  const [showProfilePic, setShowProfilePic] = useState(false);
  const [showEditProfilePic, setShowEditProfilePic] = useState(false);
  const [image, setImage] = useState(null);
  const [slideValue, setSlideValue] = useState(10);
  const dispatch = useDispatch();
  const cropRef = useRef(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setShowEditProfilePic(true);
    }
  };

  const getBackgroundSize = () => {
    return { backgroundSize: `${(slideValue - 10) * 100 / 90}% 100%` };
  };

  const handleSave = () => {
    if (cropRef.current) {
      const canvas = cropRef.current.getImageScaledToCanvas();
      canvas.toBlob((blob) => {
        const formData = new FormData();
        formData.append("profileImage", blob, "profileImage.jpg");
        dispatch(changeProfilePic(formData))
          .unwrap()
          .then(() => {})
          .catch((err) => {});
      });
      setShowEditProfilePic(false);
      setImage(null);
      setSlideValue(10);
    }
  };

  return (
    <div className="relative w-full h-80 bg-active/50 flex justify-center items-center">
      <img src={cover} alt="User" className="h-full w-full object-cover" />
      <div className="absolute w-full flex flex-col lg:flex-row lg:p-10 items-center lg:gap-5 bottom-0 translate-y-2/3 lg:translate-y-1/2">
        <div className="relative w-48 h-48">
          <button onClick={() => setShowProfilePic(true)}>
            <img
              src={profilePic}
              alt="User"
              className="bg-sidebar rounded-full border-[5px] border-paragraph/50 object-cover"
            />
          </button>
          <button className="absolute w-8 h-8 rounded-full flex justify-center items-center bg-sidebar text-paragraph bottom-[10%] right-[5%] lg:bottom-[15%] lg:right-[10%]">
            <label htmlFor="file">
              <FontAwesomeIcon icon={faCamera} />
            </label>
            <input
              className="hidden"
              id="file"
              type="file"
              onChange={onImageChange}
              onClick={(event) => {
                event.target.value = null;
              }}
            />
          </button>
        </div>
        <div className="lg:w-full flex flex-col gap-3 lg:flex-row items-center lg:justify-between pt-2 lg:pt-24">
          <div className="flex flex-col items-center lg:items-start gap-2">
            <div className="text-3xl text-paragraph font-semibold">
              {user.name}
            </div>
            <div>1.4k followers</div>
          </div>
          <Link
            to="/settings/editProfile"
            className="w-fit px-3 py-2 bg-message rounded-md flex gap-2 items-center"
          >
            <FontAwesomeIcon icon={faEdit} />
            <div>Edit Profile</div>
          </Link>
        </div>
      </div>
      {showProfilePic && (
        <div className="fixed w-screen h-screen bg-black/70 right-0 top-0 flex justify-center items-center">
          <img src={profilePic} alt="User" className="h-[50%]" />
          <button
            onClick={() => setShowProfilePic(false)}
            className="absolute top-5 right-5"
          >
            <FontAwesomeIcon icon={faClose} size="lg" />
          </button>
        </div>
      )}
      {showEditProfilePic && (
        <div className="fixed w-screen h-screen bg-black/70 right-0 top-0 flex justify-center items-center whitespace-nowrap overflow-auto scrollbar">
          <div className="w-[500px] h-[500px] flex flex-col gap-10 bg-active">
            <AvatarEditor
              ref={cropRef}
              image={image}
              style={{ width: "100%", height: "100%" }}
              border={50}
              borderRadius={150}
              color={[0, 0, 0, 0.72]}
              scale={slideValue / 10}
              rotate={0}
            />
            <div className="px-10 h-12">
              <input
                type="range"
                min="10"
                max="100"
                onChange={(e) => setSlideValue(e.target.value)}
                style={getBackgroundSize()}
                value={slideValue}
                className="w-full"
              />
            </div>
            <div className="flex gap-5 justify-center">
              <button
                onClick={() => {
                  setShowEditProfilePic(false);
                  setImage(null);
                  setSlideValue(10);
                }}
                className="w-20 py-1 bg-message rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="w-20 py-1 bg-message rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
          <button
            onClick={() => {
              setShowEditProfilePic(false);
              setImage(null);
              setSlideValue(10);
            }}
            className="absolute top-5 right-5"
          >
            <FontAwesomeIcon icon={faClose} size="lg" />
          </button>
        </div>
      )}
    </div>
  );
}
