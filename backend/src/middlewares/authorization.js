"use strict";

const User = require("../models/user.model");
const passport = require("passport");
const bluebird = require("bluebird");

const handleJWT = (req, res, next, roles) => async (err, user, info) => {
  const error = err || info;
  const logIn = bluebird.promisify(req.logIn);
  const apiError = new Error(error ? error.message : "Unauthorized");
  apiError.status = 401;

  // log user in
  try {
    if (error || !user) throw error;
    await logIn(user, { session: false });
  } catch (err) {
    return next(apiError);
  }

  // see if user is authorized to do the action
  if (!roles.includes(user.role)) {
    return next(new Error("Forbidden"));
  }

  req.user = user;

  return next();
};

const authorize =
  (roles = User.roles) =>
  (req, res, next) => {
    return passport.authenticate(
      "jwt",
      { session: false },
      handleJWT(req, res, next, roles)
    )(req, res, next);
  };

module.exports = authorize;
