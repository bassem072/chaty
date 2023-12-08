import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

import FormInput from "./FormFields/FormInput";
import FormButton from "./FormFields/FormButton";
import SocialLogin from "./SocialLogin";
import { setMessage } from "../../../slices/message";
import { login } from "../../../slices/auth";
import CheckField from "./FormFields/CheckField";
import validate from "../../../services/validation/login";

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { isLoading, isRegister } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validate,
    onSubmit: (values) => {
      dispatch(setMessage(""));
      const { email, password, remember } = values;
      dispatch(login({ email, password, remember }))
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
    },
  });

  return (
    <div
      className={
        "col-[1/2] row-[1/2] transition-all delay-700 duration-500 px-6 md:px-0 " +
        (isRegister ? "opacity-0 z-[1]" : "z-[2]")
      }
    >
      <form
        className="flex items-center justify-center flex-col mb-2"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="text-4xl text-paragraph mb-2.5">Sign In</h2>
        <FormInput
          icon={faEnvelope}
          type="email"
          name="email"
          placeholder="Email"
          val={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          condition={formik.touched.email && formik.errors.email}
          error={formik.errors.email}
        />
        <FormInput
          icon={faLock}
          type="password"
          name="password"
          placeholder="Password"
          val={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          condition={formik.touched.password && formik.errors.password}
          error={formik.errors.password}
        />
        <CheckField
          name="remember"
          val={formik.values.remember}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          text="Remember me"
        />
        <FormButton name="Login" disabled={isLoading ? true : false} />
      </form>
      <SocialLogin />
    </div>
  );
}
