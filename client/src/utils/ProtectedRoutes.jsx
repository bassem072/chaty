import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoutes(props) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkUserToken = () => {
    const token = localStorage.getItem("token");

    if (!token || token === "undefined") {
      setIsLoggedIn(false);
      return navigate("auth");
    }

    setIsLoggedIn(true);
  };

  useEffect(() => {
    checkUserToken();
  });

  return isLoggedIn ? props.children : null;
}
