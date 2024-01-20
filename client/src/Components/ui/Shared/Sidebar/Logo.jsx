import React from 'react';
import { Link } from "react-router-dom";
import logo from "../../../../assets/images/home/logo.svg";
import { useDispatch } from 'react-redux';
import { clearMessagesHistory } from '../../../../slices/chatMessages';

export default function Logo() {
  const dispatch = useDispatch();

  return (
    <Link
      onClick={() => dispatch(clearMessagesHistory())}
      to="/chats"
      className="hidden lg:block px-4"
    >
      <img src={logo} alt="Logo" width={30} height={30} />
    </Link>
  );
}
