import { useTranslation } from "react-i18next";
import SocialButton from "./FormFields/SocialButton";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { facebookLogin, googleLogin } from "../../../slices/auth";

export default function SocialLogin() {
  const { t } = useTranslation("auth");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const googleLoginAction = () => {
    dispatch(googleLogin())
      .unwrap()
      .then(() => {
        if (location.state && location.state.prevRoute) {
          navigate(location.state.prevRoute);
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const facebookLoginAction = () => {
    dispatch(facebookLogin())
      .unwrap()
      .then(() => {
        if (location.state && location.state.prevRoute) {
          navigate(location.state.prevRoute);
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <div className="flex flex-col items-center">
      <p className="py-3 text-base">{t("social")}</p>
      <div className="flex gap-4">
        <SocialButton
          icon={faFacebookF}
          onClick={() => {
            //facebookLoginAction();
          }}
        />
        <SocialButton
          icon={faGoogle}
          onClick={() => {
            //googleLoginAction();
          }}
        />
      </div>
    </div>
  );
}
