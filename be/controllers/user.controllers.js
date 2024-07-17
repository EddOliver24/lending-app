import { createAccessToken } from "../middlewares/auth.middlewares.js";
import { asyncHandler } from "../middlewares/error.middlewares.js";
import User from "../models/user.models.js";
import bcrypt from "bcrypt";

const signup = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    res.status(400);
    throw new Error("Email already exists.");
  } else {
    const hash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hash
    });
    await newUser.save();

    res.status(201).send({
      message: "User has been created.",
      data: newUser
    });
  }
});

const signin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User doesn't exist.");
  } else {
    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      res.status(400);
      throw new Error("Password didn't match.");
    } else {
      res.status(200).send({
        message: "Login successful",
        data: {
          username: user.username,
          accessToken: createAccessToken(user)
        }
      });
    }
  }
});

export { signup, signin };
