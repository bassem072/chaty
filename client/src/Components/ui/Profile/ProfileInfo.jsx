import {
  faCakeCandles,
  faMars,
  faVenus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useSelector } from "react-redux";

export default function ProfileInfo() {
  const { user } = useSelector((state) => state.auth);
  const { i18n } = useTranslation();
  moment.locale(i18n.language);
  const day = moment(user.birthdate).format(
    i18n.language === "ar" ? "yyyy MMM DD" : "DD MMM yyyy"
  );
  
  return (
    <div className="w-full flex flex-col lg:flex-row gap-5 px-5 pb-20">
      <div className="lg:w-1/3 p-4 bg-active rounded-lg flex flex-col gap-4">
        <div>{user.bio}</div>
        <div className="w-full h-[1px] bg-paragraph/30 rounded"></div>
        <div className="w-full flex flex-col gap-2">
          <div className="w-full flex gap-3 items-center">
            <FontAwesomeIcon
              icon={faCakeCandles}
              className="text-paragraph/70"
            />
            <div className="flex items-center gap-2">
              <div>Birthday</div>
              <div className="font-bold">{day}</div>
            </div>
          </div>
          <div className="w-full flex gap-3 items-center">
            <FontAwesomeIcon
              icon={user.gender === "male" ? faMars : faVenus}
              className="text-paragraph/70"
            />
            <div className="flex items-center gap-2">
              <div>Gender</div>
              <div className="font-bold">{user.gender}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-2/3">
        <div className="text-2xl font-bold py-3 text-paragraph/70">
          No posts available now
        </div>
      </div>
    </div>
  );
}
