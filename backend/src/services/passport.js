"use strict";

//set up a JSON Web Token authentication strategy

const config = require("../config");
const User = require("../models/user.model");
const passportJWT = require("passport-jwt");
const mongoose = require('mongoose')

const ExtractJWT = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

//ExtractJWT.fromAuthHeaderAsBearerToken() used to extract the token from the request header
const jwtOptions = {
  secretOrKey: config.secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

//It extracts the 'sub'(subject) field from the JWT payload, which contains the id of the user associated with the token

const jwtStrategy = new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
  try {
    const user = await User.findOne({ _id: jwtPayload.sub });
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
      // or you could create a new account
    }
  } catch (err) {
    return done(err, false);
  }
});

exports.jwtOptions = jwtOptions;
exports.jwt = jwtStrategy;
