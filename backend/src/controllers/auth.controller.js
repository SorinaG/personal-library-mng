"use strict";

const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const uuidv = require("uuidv1");
const config = require("../config")

exports.register = async (req, res, next) => {
  try {
    const activationKey = uuidv();
    const body = req.body;

    //email verification
    body.active = true; //bypass email verification
    const user = new User(body);
    const savedUser = await user.save();
    res.status(201);
    res.send(savedUser.transform());
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findAndGenerateToken(req.body);
    const payload = {
      sub: user.id,
      name: user.username,
    };
    const token = jwt.sign(payload, config.secret);
    return res.json({ token: token, user: {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role
    } });
  } catch (error) {
    if (error.message === 'Email must be provided for login') {
        res.status(400).json({ error: 'Email must be provided' });
      } else if (error.message === 'No user associated with this email') {
        res.status(404).json({ error: 'User not found' });
      } else if (error.message === 'Password mismatch') {
        res.status(401).json({ error: 'Incorrect password' });
      } else {
        // Handle unexpected errors
        res.status(500).json({ error: 'Internal server error' });
      }
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(userId);

    if (!user.passwordMatches(oldPassword)) {
      res.status(400).send({message: "Wrong old password!"});
      return;
    }

    user.password = newPassword;
    await user.save();
    res.send({ message: "Password changed successfully" });
  } catch (error) {
    next(error);
  }
};

// /confirm logic
