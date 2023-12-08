import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GuestRoutes(props) {
  const navigate = useNavigate();
  const [isGuest, setIsGuest] = useState(false);

  const checkUserToken = () => {
    const token = localStorage.getItem("token");

    if (token && token !== "undefined") {
      return navigate("/");
    }

    setIsGuest(true);
  };

  useEffect(() => {
    checkUserToken();
  });

  return isGuest ? props.children : null;
}
