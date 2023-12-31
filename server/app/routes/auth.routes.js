import { Router } from "express";
import passport from "passport";
import {
  loginValidator,
  signUpValidator,
  verifyValidator,
} from "../utils/validation/auth.validator.js";
import {
  failedLogin,
  login,
  refresh,
  register,
  socialLogin,
  verifyEmail,
} from "../controllers/auth.controller.js";
import {
  forgetPasswordValidator,
  resetPasswordValidator,
  verifyLinkValidator,
} from "../utils/validation/resetPassword.validator.js";
import {
  forgetPassword,
  resetPassword,
  verifyLink,
} from "../controllers/resetPassword.controller.js";
import {
  facebookStrategy,
  googleStrategy,
} from "../middlewares/oauth2.middleware.js";

const authRouter = Router();

passport.use(googleStrategy);
passport.use(facebookStrategy);

authRouter.post("/register", signUpValidator, register);
authRouter.post("/login", loginValidator, login);
authRouter.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "profile",
      "email",
      "https://www.googleapis.com/auth/user.birthday.read",
    ],
  })
);
authRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "api/login/failed" }),
  socialLogin
);
authRouter.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    scope: ["email", "user_birthday"],
  })
);
authRouter.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "api/login/failed" }),
  socialLogin
);
authRouter.get("/refresh", refresh);
authRouter.get("/verifyEmail", verifyValidator, verifyEmail);
authRouter.post("/forgetPassword", forgetPasswordValidator, forgetPassword);
authRouter.get("/verifyPasswordLink", verifyLinkValidator, verifyLink);
authRouter.post("/resetPassword", resetPasswordValidator, resetPassword);
authRouter.get("/login/failed", failedLogin);

export default authRouter;
