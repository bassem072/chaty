import { faAngleLeft, faAngleRight, faEllipsis, faPhone, faSearch, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import group from "../../../../../assets/images/home/group.png";

export default function GroupHeader() {
  const { i18n } = useTranslation();
  return (
    <div className="w-full h-[100px] px-6 border-b-[.2px] border-paragraph/10 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Link
          to="/groups"
          className="flex lg:hidden bg-sidebar px-3 py-2 rounded-full"
        >
          <FontAwesomeIcon
            icon={i18n.language === "ar" ? faAngleRight : faAngleLeft}
          />
        </Link>
        <img
          src={group}
          alt="user"
          width={38}
          height={38}
          className="rounded-full"
        />
        <div className="flex flex-col items-start gap-0.5">
          <div className="font-semibold">Group X</div>
          <div className="max-w-[200px] text-xs text-paragraph/50">Bassem, Doaa, Elsayed, +20 others</div>
        </div>
      </div>
      <div className="flex items-center gap-10 text-paragraph/70">
        <div className="hover:text-paragraph transition-all duration-300 cursor-pointer">
          <FontAwesomeIcon icon={faSearch} size="lg" />
        </div>
        <div className="hover:text-paragraph transition-all duration-300 cursor-pointer">
          <FontAwesomeIcon icon={faPhone} size="lg" />
        </div>
        <div className="hover:text-paragraph transition-all duration-300 cursor-pointer">
          <FontAwesomeIcon icon={faVideo} size="lg" />
        </div>
        <div className="hover:text-paragraph transition-all duration-300 cursor-pointer">
          <FontAwesomeIcon icon={faEllipsis} size="lg" />
        </div>
      </div>
    </div>
  );
}
