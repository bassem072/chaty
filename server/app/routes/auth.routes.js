// Import required modules
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

// Initialize router
const authRouter = Router();

// Function to handle OAuth2 strategies
const handleOAuth2Strategy = (strategy, scope, callbackURL) => {
  authRouter.get(
    `/auth/${strategy}`,
    passport.authenticate(strategy, { scope })
  );
  authRouter.get(
    callbackURL,
    passport.authenticate(strategy, {
      failureRedirect: "/login/failed",
      successRedirect: "http://localhost:3000/login/success",
    })
  );
};

// Use Google and Facebook OAuth2 strategies
passport.use(googleStrategy);
passport.use(facebookStrategy);
handleOAuth2Strategy(
  "google",
  ["profile", "email", "https://www.googleapis.com/auth/user.birthday.read"],
  "/auth/google/callback"
);
handleOAuth2Strategy(
  "facebook",
  ["email", "user_birthday"],
  "/auth/facebook/callback"
);

// Define routes
authRouter.post("/register", signUpValidator, register);
authRouter.post("/login", loginValidator, login);
authRouter.post("/refresh", refresh);
authRouter.get("/verifyEmail", verifyValidator, verifyEmail);
authRouter.post("/forgetPassword", forgetPasswordValidator, forgetPassword);
authRouter.get("/verifyPasswordLink", verifyLinkValidator, verifyLink);
authRouter.post("/resetPassword", resetPasswordValidator, resetPassword);
authRouter.get("/login/failed", failedLogin);

authRouter.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

// Export router
export default authRouter;
