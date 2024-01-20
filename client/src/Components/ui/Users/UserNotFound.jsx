import React from "react";
import logo from "../../../assets/images/home/logo.svg";

export default function UserNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img
        src={logo}
        alt="User Not Found"
        className="w-20 h-20 object-cover mb-8"
      />
      <h1 className="text-3xl font-bold text-paragraph">User Not Found</h1>
      <p className="text-lg text-paragraph/70">
        We're sorry, but we couldn't find the user you were looking for.
      </p>
    </div>
  );
}
