import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GuestRoutes(props) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkUserToken = () => {
    const token = localStorage.getItem("token");

    if (token && token !== "undefined") {
      setIsLoggedIn(true);
      return navigate("auth");
    }

    setIsLoggedIn(false);
  };

  useEffect(() => {
    checkUserToken();
  });

  return !isLoggedIn ? props.children : null;
}
