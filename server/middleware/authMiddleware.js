const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const User = require("../models/userModel");

const authenticate = async (req, res, next) => {
  // check request headers for jwt
  const token =
    req?.headers?.authorization?.split(" ")?.[1] || req.cookies.token;
  if (!token) return next(AppError("You aren't logged in!", "error", 400));

  // check if jwt is valid
  let result;
  jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
    if (err) return next(AppError("You aren't logged in!", "error", 400));

    result = data;
  });

  // check if user exists
  const user = await User.findById(result.id).select("+isAdmin");
  if (!user) return next(AppError("User doesn't exist!", "error", 404));

  // authenticate
  req.user = user;
  next();
};

const authorize = async (req, res, next) => {
  // check if user is admin
  if (!req.user.isAdmin) return next(AppError("Not authorized!", "error", 402));

  // authorize
  next();
};

module.exports = { authenticate, authorize };
