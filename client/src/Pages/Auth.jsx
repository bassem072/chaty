import React from "react";
import LoginForm from "../Components/ui/Auth/LoginForm";
import RegisterForm from "../Components/ui/Auth/RegisterForm";
import Panel from "../Components/ui/Auth/Panel";
import login from "../assets/images/Login-amico.svg";
import register from "../assets/images/register-amicro.svg";
import { useDispatch, useSelector } from "react-redux";
import { changeRegister } from "../slices/auth";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

export default function Auth() {
  const { isRegister } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation("auth");

  return (
    <div dir="ltr" className="w-screen h-screen text-start">
      <Helmet>
        <title>
          {t(isRegister ? "pageTitle.register" : "pageTitle.login")}
        </title>
      </Helmet>
      <div
        className={
          "relative w-full md:min-h-[800px] h-screen lg:min-h-screen overflow-hidden p-6 md:p-0 c " +
          (isRegister ? "sign-up" : "")
        }
      >
        <div dir={i18n.dir()} className="absolute w-full h-full top-0 right-0">
          <div
            className={
              "absolute w-full lg:w-1/2 top-[95%] lg:top-1/2 left-1/2 lg:left-3/4 -translate-x-1/2 -translate-y-[70%] lg:-translate-y-1/2 grid grid-cols-1 z-[5] transition-all delay-1000 duration-700 ease-in-out " +
              (isRegister
                ? "left-1/2 lg:left-1/4 -translate-x-1/2 lg:-translate-x-[150%] -translate-y-[135%] md:-translate-y-[120%] lg:-translate-y-1/2"
                : "")
            }
          >
            <RegisterForm />
            <LoginForm />
          </div>
        </div>
        <div className="absolute w-full h-full top-0 left-0 grid grid-cols-1 lg:grid-cols-2 grid-rows-[1fr_2fr_1fr] lg:grid-rows-1">
          <Panel
            decoration={
              "lg:pr-[17%] lg:pl-[12%] row-[1/2] lg:row-auto " +
              (isRegister ? "pointer-events-none" : "pointer-events-auto")
            }
            title={t("panel.login.title")}
            description={t("panel.login.description")}
            buttonText={t("panel.login.buttonText")}
            trans={
              isRegister
                ? "-translate-x-[1000px] -translate-y-[400px] lg:translate-y-0"
                : "translate-x-0"
            }
            image={login}
            onClick={() => dispatch(changeRegister(!isRegister))}
          />
          <Panel
            decoration={
              "lg:pr-[12%] lg:pl-[17%] row-[3/4] lg:row-auto " +
              (isRegister ? "pointer-events-auto" : "pointer-events-none")
            }
            title={t("panel.register.title")}
            description={t("panel.register.description")}
            buttonText={t("panel.register.buttonText")}
            image={register}
            trans={
              isRegister
                ? "translate-x-0"
                : "translate-x-[1000px] translate-y-[300px] lg:translate-y-0"
            }
            onClick={() => dispatch(changeRegister(!isRegister))}
          />
        </div>
      </div>
    </div>
  );
}
