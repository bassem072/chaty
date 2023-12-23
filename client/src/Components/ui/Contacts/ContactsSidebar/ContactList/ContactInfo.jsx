import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";

export default function ContactInfo({ contact }) {
  let { id } = useParams();
  let { state } = useLocation();

  return (
    <div className="w-full h-full flex justify-between items-center">
      <Link
        to={"/contacts/" + contact.id}
        replace={state ? true : false}
        state={id}
        className="h-full flex items-center justify-between"
      >
        Bassem Elsayed
      </Link>
      <div className="h-full flex items-center justify-between text-paragraph/70">
        <FontAwesomeIcon icon={faEllipsisV} />
      </div>
    </div>
  );
}
