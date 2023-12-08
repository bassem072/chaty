import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyEmailService } from "../services/auth.service";
import { setMessage } from "../slices/message";

export default function ConfirmEmail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userToken = localStorage.getItem('token');
  const [queryParameters] = useSearchParams();
  const id = queryParameters.get("id");
  const token = queryParameters.get("token");
  console.log(id, token);
  
  const [showMessage, setShowMessage] = useState(
    !id || !token ? "Failed url parameters" : "Please wait..."
  );

  const checkEmail = async () => {
    if (id && token) {
      try {
        const data = await verifyEmailService({id, token});

        if (data) {
          dispatch(setMessage("Email verified successfully."));
          return userToken ? navigate("/") : navigate("/auth");
        }
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 401) {
          setShowMessage("Invalid token");
        } else {
          setShowMessage("Couldn't confirm your account, please try again.");
        }
      }
    }
  };

  useEffect(() => {
    async function check() {
      await checkEmail();
    }

    check();
  });

  return <div>{showMessage}</div>;
}
