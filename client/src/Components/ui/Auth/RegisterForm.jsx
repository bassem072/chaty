import FormInput from "./FormFields/FormInput";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import FormButton from "./FormFields/FormButton";
import SocialLogin from "./SocialLogin";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../../slices/message";
import { useFormik } from "formik";
import { register } from "../../../slices/auth";
import {
  current_day,
  current_month,
  current_year,
} from "../../../helpers/dates";
import SelectField from "./FormFields/SelectField";
import RadioField from "./FormFields/RadioField";
import validate from "../../../services/validation/register";
import { useTranslation } from "react-i18next";

export default function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { t } = useTranslation("auth");
  const { isLoading, isRegister } = useSelector(
    (state) => state.auth
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
      day: current_day,
      month: current_month,
      year: current_year,
      gender: 0,
    },
    validate,
    onSubmit: (values) => {
      dispatch(setMessage(""));
      const g = ["male", "female"];
      let date = new Date(
        values.year + "-" + (+values.month + 1) + "-" + values.day
      );
      const { name, email, password, gender } = values;
      const userData = {
        name,
        email,
        password,
        gender: g[gender],
        birthdate: date,
      };
      console.log(userData);
      dispatch(register(userData))
        .unwrap()
        .then(() => {
          if (location.state && location.state.prevRoute) {
            navigate(location.state.prevRoute);
          } else {
            navigate("/");
          }
        })
        .catch((err) => {
          console.log("error", err.message);
        });
    },
  });
  return (
    <div
      className={
        "col-[1/2] row-[1/2] transition-all delay-700 duration-500 " +
        (isRegister ? "opacity-100 z-[2]" : "z-[1] opacity-0")
      }
    >
      <form
        className="flex items-center justify-center flex-col mb-2"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="text-4xl text-paragraph mb-2.5">
          {t("title.register")}
        </h2>
        <FormInput
          icon={faUser}
          type="text"
          name="name"
          placeholder={t("form.register.name")}
          val={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          condition={formik.touched.name && formik.errors.name}
          error={t(formik.errors.name, {length: 3})}
        />
        <FormInput
          icon={faEnvelope}
          type="email"
          name="email"
          placeholder={t("form.common.email")}
          val={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          condition={formik.touched.email && formik.errors.email}
          error={t(formik.errors.email)}
        />
        <FormInput
          icon={faLock}
          type="password"
          name="password"
          placeholder={t("form.common.password")}
          val={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          condition={formik.touched.password && formik.errors.password}
          error={t(formik.errors.password, {length: 8})}
        />
        <FormInput
          icon={faLock}
          type="password"
          name="repeatPassword"
          placeholder={t("form.register.repeatPassword")}
          val={formik.values.repeatPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          condition={
            formik.touched.repeatPassword && formik.errors.repeatPassword
          }
          error={t(formik.errors.repeatPassword)}
        />
        <SelectField
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          dayVal={formik.values.day}
          monthVal={formik.values.month}
          yearVal={formik.values.year}
          error={t(formik.errors.date)}
        />
        <RadioField
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          title={t("form.register.gender.title")}
          currentVal={formik.values.gender}
          condition={formik.touched.gender && formik.errors.gender}
          error={t(formik.errors.gender)}
        />
        <FormButton
          name={t("form.register.button")}
          disabled={isLoading ? true : false}
        />
      </form>
      <SocialLogin />
    </div>
  );
}
