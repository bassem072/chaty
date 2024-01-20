import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { editProfile } from "../../../../slices/auth";

export default function EditProfileItem({
  title = "",
  EditFunction = () => {},
}) {
  const { t, i18n } = useTranslation("settings");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [val, setVal] = useState(user[title]);

  const getBirthDate = (day) => {
    moment.locale(i18n.language);
    return moment(day).format(
      i18n.language === "ar" ? "YYYY DD MMMM" : "MMMM DD YYYY"
    );
  };

  const getValue = (title) => {
    switch (title) {
      case "name":
        return user.name;
      case "bio":
        return user.bio;
      case "birthdate":
        return getBirthDate(user.birthdate);
      case "gender":
        return t(user.gender);
      default:
        break;
    }
  };

  const getInput = () => {
    switch (title) {
      case "name":
        return (
          <input
            type="text"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="bg-sidebar outline-none py-1 px-3 rounded-md"
          />
        );
      case "bio":
        return (
          <input
            type="text"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="bg-sidebar outline-none py-1 px-3 rounded-md"
          />
        );
      case "birthdate":
        return (
          <DatePicker
            selected={new Date(val)}
            onChange={(date) => setVal(date)}
            className="bg-sidebar outline-none py-1 px-3 rounded-md"
            calendarClassName="bg-sidebar"
          />
        );
      case "gender":
        return (
          <div className="flex justify-between gap-10">
            <div className="flex justify-between gap-2">
              <p>{t("male")}</p>
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={(e) => {
                  setVal(e.target.value);
                }}
                defaultChecked={val === "male"}
              />
            </div>

            <div className="flex justify-between gap-2">
              <p>{t("female")}</p>
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={(e) => {
                  setVal(e.target.value);
                }}
                defaultChecked={val === "female"}
              />
            </div>
          </div>
        );
      default:
        break;
    }
  };

  const save = () => {
    if (user[title] !== val) {
      const userData = {};
      userData[title] = val;
      dispatch(editProfile(userData))
        .unwrap()
        .then(() => {
          setIsEdit(false);
        })
        .catch((err) => {});
    } else {
      setIsEdit(false);
    }
  };

  const value = getValue(title);

  return (
    <div className="w-full py-3 flex justify-between items-center">
      <div>{t(title)}</div>
      {!isEdit ? (
        <div className="w-60 flex gap-5 justify-between">
          <div className="truncate">{value}</div>
          <button onClick={() => setIsEdit(true)}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </div>
      ) : (
        <div className="flex gap-5 items-center">
          {getInput(title)}
          <button
            onClick={() => {
              save();
            }}
            className="bg-message px-4 py-1 rounded-lg"
          >
            {t("save")}
          </button>
        </div>
      )}
    </div>
  );
}
