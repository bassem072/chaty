import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import GroupPic from './GroupPic';
import GroupInfo from './GroupInfo';

export default function GroupListItem({ group, ref }) {
  let { id } = useParams();
  let { state } = useLocation();
  console.log(state);

  return (
    <Link
      to={"/groups/" + group.id}
      replace={state ? true : false}
      state={id}
      ref={ref}
      className={
        "w-full py-5 hover:bg-sidebar px-3 flex gap-3 items-center rounded-md cursor-pointer" +
        (group.id === +id ? " bg-sidebar" : "")
      }
    >
      <GroupPic />
      <GroupInfo />
    </Link>
  );
}
