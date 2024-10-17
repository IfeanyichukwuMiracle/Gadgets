const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

// create new user
const createUser = async (req, res, next) => {
  try {
    const { password, email, firstname, lastname } = req.body;

    // check for password
    if (!password) return next(AppError("Password is required!", "fail", 400));

    // has password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = await User.create({
      password: hashedPassword,
      firstname,
      lastname,
      email
    });

    // create token
    const token = await jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES
    });

    // send response
    return res.status(201).json({ status: "success", data: newUser, token });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

// get all users
const getUsers = async (req, res, next) => {
  try {
    // get users
    const users = await User.find().select("-isAdmin");

    // send response
    return res
      .status(200)
      .json({ status: "success", results: users.length, data: users });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

// get one user
const getUser = async (req, res, next) => {
  try {
    // get user
    const user = await User.findById(req.params.userId).select("-isAdmin");

    // check for user
    if (!user) return next(AppError("User doesn't exist!", "fail", 404));

    //send response
    return res.status(200).json({ status: "success", data: user });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

// update user details
const updateUserDetails = async (req, res, next) => {
  try {
    // check for password in request body
    if (req.body.password) return next(AppError("Error", "error", 400));

    // find by id and update
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        ...req.body
      },
      { new: true, runValidators: true }
    ).select("-isAdmin");

    // send response
    return res.status(200).json({ status: "success", data: updatedUser });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

// update user password
const updateUserPassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // find user
    const user = await User.findById(req.params.userId).select("+password");

    // check for user
    if (!user) return next(AppError("User doesn't exist", "error", 404));

    // verfiy oldPwd
    const isPwd = await bcrypt.compare(oldPassword, user.password);
    if (!isPwd) return next(AppError("Incorrect password!", "fail", 400));

    // hash new password
    const updatedPassword = await bcrypt.hash(newPassword, 10);

    // update the user
    user.password = updatedPassword;
    await user.save();

    return res
      .status(200)
      .json({ status: "success", message: "password update successful!" });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

// delete user
const deleteUser = async (req, res, next) => {
  try {
    // find user
    const user = await User.findById(req.params.userId).select("+isActive");

    // check for user
    if (!user) return next(AppError("User doesn't exist!", "error", 404));

    // delete user
    user.isActive = false;
    await user.save();

    // send response
    return res
      .status(204)
      .json({ status: "success", message: "account deletion successful!" });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUserDetails,
  updateUserPassword,
  deleteUser
};
