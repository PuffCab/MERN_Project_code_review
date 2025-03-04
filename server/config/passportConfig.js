import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import UserModel from "../models/usersModel.js";

const jwtOptions = {
  // whenever we send a req we put the token in the header of req and this method will extract the token from the header
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "password",
};

// we pass options - function accesses payload - run usermodel - find user with that ID
const passportStrategy = new JwtStrategy(jwtOptions, async function (
  jwt_payload,
  done
) {
  try {
    const user = await UserModel.findOne({ _id: jwt_payload.sub });
    if (!user) {
      // if token is valid but there's no user -> create account
      console.log("create an account");
      return done(null, false);
    }

    if (user) { // if there's a user we insert the user in the request
      console.log("user found");
      return done(null, user);
    }
  } catch (err) { // if token is invalid -> error
   console.log("invalid token");
    return done(err, false);
  }
});

export default passportStrategy;
