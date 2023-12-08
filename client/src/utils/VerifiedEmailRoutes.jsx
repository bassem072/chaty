import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiInstance } from "./apiInstance";


export default function VerifiedEmail(props) {
  const navigate = useNavigate();
  const [isVerified, setVerified] = useState(false);

  const checkEmail = async () => {
    try {
      const response = await apiInstance.get("/profile");
      console.log(response);
      throw new Error();
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.message ===
          "Email not verified, please check your inbox or spam to verify your email"
      ) {
        setVerified(false);
        return navigate("/verifyEmail");
      }
    }

    setVerified(true);
  };

  useEffect(() => {
    async function check() {
      await checkEmail();
    }

    check();
  });

  return isVerified ? props.children : null;
}
