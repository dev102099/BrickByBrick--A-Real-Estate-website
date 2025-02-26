const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const handleError = require("../middleware/error");

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPass = await bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPass });
  try {
    await newUser.save();
    res.status(201).json("User added successfully!");
  } catch (err) {
    next(err);
  }
};

const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_TOKEN);
      const { password, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const genPass =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPass = await bcrypt.hashSync(genPass, 10);
      const genUsername =
        req.body.name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-8);

      const newUser = new User({
        username: genUsername,
        email: req.body.email,
        password: hashedPass,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_ACCESS_TOKEN);
      const { password, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: true, // Only set cookies on HTTPS (Required on Render)
          sameSite: "none",
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(handleError(404, "User not found"));
    }
    const validPass = bcrypt.compareSync(password, validUser.password);
    if (!validPass) {
      return next(handleError(401, "Wrong credentials"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_ACCESS_TOKEN);
    const { password: notNeeded, ...restData } = validUser._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true, // Only set cookies on HTTPS (Required on Render)
        sameSite: "none",
      })
      .status(200)
      .json(restData);
  } catch (error) {
    next(error);
  }
};
const signOut = (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({ message: "User logged out." });
  } catch (error) {
    next(error);
  }
};
module.exports = { signin, signup, google, signOut };
