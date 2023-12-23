import React from 'react';
import group from "../../../../../assets/images/home/group.png";

export default function GroupPic() {
  return (
    <div className="relative">
      <img
        src={group}
        alt="user"
        className="w-12 h-12 object-contain rounded-full"
      />
      <div className="absolute w-2.5 h-2.5 bg-green-500 rounded-full ltr:left-3/4 rtl:left-[12%] bottom-0"></div>
    </div>
  );
}
