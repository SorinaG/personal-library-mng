"use strict";

const { Joi } = require("express-validation");

const userValidation = {
  create: {
    body: Joi.object({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(100).required()
    }),
  },
};

module.exports = userValidation;
