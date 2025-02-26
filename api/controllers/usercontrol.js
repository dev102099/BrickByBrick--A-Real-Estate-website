const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const handleError = require("../middleware/error");
const { Listing } = require("../models/listing.model");

const test = (req, res) => {
  res.send("api route is working!");
};

const updateUser = async (req, res, next) => {
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(handleError(401, "Unauthorized"));
  await User.findByIdAndDelete(req.params.id);
  res.clearCookie("access_token");
  res.status(200).json({ message: "User deleted." });
};

const getUserListing = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(handleError(401, "Not authorized to view these listings."));
  } else {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      next(handleError(404, "Info not found"));
    }
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

module.exports = { updateUser, deleteUser, getUserListing, getUser };
