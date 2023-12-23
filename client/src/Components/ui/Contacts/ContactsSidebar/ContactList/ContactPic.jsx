import React from 'react';
import user from "../../../../../assets/images/users/user_5.png";
import { Link, useLocation, useParams } from 'react-router-dom';

export default function ContactPic({ contact }) {
  let { id } = useParams();
  let { state } = useLocation();

  return (
    <Link
      to={"/contacts/" + contact.id}
      replace={state ? true : false}
      state={id}
      className="relative"
    >
      <img
        src={user}
        alt="user"
        width={60}
        height={60}
        className="rounded-full"
      />
      <div className="absolute w-2.5 h-2.5 bg-green-500 rounded-full ltr:left-3/4 rtl:left-[12%] bottom-0"></div>
    </Link>
  );
}
