import { IError } from "./../interfaces/error.interface";
import passport from "passport";
import { Strategy } from "passport-local";
import { verify } from "argon2";
import { User } from "../entity/User";
export const localStrategy = new Strategy(
  { usernameField: "email" },
  async function (email, password, done) {
    try {
      // Check if user exists
      const user = await User.findOne(
        { email },
        { select: ["password", "email", "id", "username"] }
        // Use select option since password is not selectable by default
      );
      if (!user) {
        return done({ msg: "Invalid email", param: "email" } as IError, false);
      }
      // Check is password valid
      const isValid = await verify(user.password!, password);
      if (!isValid) {
        return done(
          { msg: "Invalid password", param: "password" } as IError,
          false
        );
      }
      // Rerturning user object
      return done(null, user);
    } catch (error) {
      return done({ msg: "Something went wrong" } as IError, false);
    }
  }
);
passport.serializeUser(function (user: any, done) {
  // Serialize user id to session payload )
  return done(null, user.id);
});
passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return done({ msg: "Couldn't find a user" } as IError, false);
    }
    return done(null, user);
  } catch (e) {
    return done({ msg: "Something went wrong" } as IError, null);
  }
});
