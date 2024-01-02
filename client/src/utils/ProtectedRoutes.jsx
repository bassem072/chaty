import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { profile } from "../slices/auth";

export default function ProtectedRoutes({ children, isVerified }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token || token === "undefined") {
      return navigate("/auth");
    }

    dispatch(profile())
      .unwrap()
      .then(() => {
        setIsLoggedIn(true);
      })
      .catch((error) => {
        if (
          error ===
          "Email not verified, please check your inbox or spam to verify your email"
        ) {
          if (isVerified) {
            return navigate("/verifyEmail");
          } else {
            setIsLoggedIn(true);
          }
        }
      });
  }, [dispatch, isVerified, navigate, token])

  return isLoggedIn ? children : null;
}
