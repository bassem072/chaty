import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.model.js";

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "api/auth/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({
      email: profile.emails[0].value,
    });

    if (existingUser) {
      if (!existingUser.googleId) {
        existingUser.googleId = profile.id;
        await existingUser.save();
      }
      done(null, existingUser);
    } else {
      const userObj = new User({
        googleId: profile.id,
        name: profile.givenName + " " + profile.familyName,
        email: profile.email[0].value,
        gender: profile.gender,
        birthdate: profile.birthday,
        verified: true,
        role: "user",
      });

      const user = await userObj.save();
      done(null, user);
    }
  }
);

export const facebookStrategy = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "api/auth/facebook/callback",
    profileFields: ["id", "emails", "name", "birthday", "gender"],
  },
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ email: profile.emails[0].value });

    if (existingUser) {
      if (!existingUser.facebookId) {
        existingUser.facebookId = profile.id;
        await existingUser.save();
      }

      done(null, existingUser);
    } else {
      const userObj = new User({
        facebookId: profile.id,
        name: profile.name.givenName + " " + profile.name.familyName,
        email: profile.email[0].value,
        gender: profile.gender,
        birthdate: profile._json.birthday,
        verified: true,
        role: "user",
      });

      const user = await userObj.save();
      done(null, user);
    }
  }
);
