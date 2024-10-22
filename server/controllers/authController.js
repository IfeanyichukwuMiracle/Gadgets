const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

// signup
const signup = async (req, res, next) => {
  try {
    const { password, email, firstname, lastname, passwordConfirm } = req.body;

    // check for password
    if (!password) return next(AppError("Password is required!", "fail", 400));

    if (password.length < 8)
      return next(
        AppError("Password cannot be less than 8 characters!", "error", 400)
      );

    if (password !== passwordConfirm)
      return next(AppError("Passwords do not match", "error", 400));

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = await User.create({
      password: hashedPassword,
      firstname,
      lastname,
      email,
    });

    // create token
    const token = await jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    // send response and cookie
    // return res
    //   .cookie("token", token, {
    //     httpOnly: true,
    //     expires: new Date(Date.now() + 10 * 60 * 60 * 24 * 1000),
    //   })
    //   .status(201)
    //   .json({ status: "success", token });

    return res.status(201).json({ status: "success", token });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

// login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check email and password
    if (!email || !password)
      return next(AppError("fields are required!", "fail", 400));

    // find user
    const user = await User.findOne({ email }).select("+password");
    // console.log(user);

    // check if user exists
    if (!user)
      return next(AppError("Email or password incorrect!", "fail", 400));

    // verify password
    const isPwd = await bcrypt.compare(password, user.password);
    // console.log(isPwd);
    if (!isPwd)
      return next(AppError("Email or password incorrect!", "fail", 400));

    // create token
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    // send response and cookie
    // return res
    //   .cookie("token", token, {
    //     httpOnly: true,
    //     expires: new Date(Date.now() + 10 * 60 * 60 * 24 * 1000),
    //   })
    //   .status(200)
    //   .json({ status: "success", token });
    return res.status(200).json({ status: "success", token });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

// login admin user
const loginAdmin = async (req, res, next) => {
  try {
    // check email and password
    if (!req.body.email || !req.body.password)
      return next(AppError("fields are required!", "fail", 400));

    // find user
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );

    // check if user exists
    if (!user)
      return next(AppError("Email or password incorrect!", "fail", 400));

    // verify password
    const isPwd = await bcrypt.compare(req.body.password, user.password);
    if (!isPwd)
      return next(AppError("Email or password incorrect!", "fail", 400));

    // check if user is admin
    if (!user.isAdmin)
      return next(AppError("Email or password incorrect!", `error`, 400));

    // create token
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    // send response and cookie
    // return res
    //   .cookie("token", token, {
    //     httpOnly: true,
    //     expires: new Date(Date.now() + 10 * 60 * 60 * 24 * 1000),
    //   })
    //   .status(200)
    //   .json({ status: "success", token });
    return res.status(200).json({ status: "success", token });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

//
//
const logout = async (req, res, next) => {
  try {
    // return res
    //   .clearCookie("token")
    //   .json({ status: "success", message: "logged out" });
    return res.json({ status: "success", message: "logged out" });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports = { signup, login, logout, loginAdmin };
