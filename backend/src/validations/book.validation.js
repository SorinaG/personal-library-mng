"use strict";

const { Joi } = require("express-validation");
const bookStatus = require("../enums/bookLinkStatus.js");

const bookValidation = {
  create: {
    body: Joi.object({
      title: Joi.string().required(),
      author: Joi.string().required(),
      public: Joi.boolean(),
      year: Joi.number().required(),
      genre: Joi.string().required(),
      synopsis: Joi.string().required(),
    }),
  },
  createAndLink: {
    body: Joi.object({
      book: Joi.object({
        title: Joi.string().required(),
        author: Joi.string().required(),
        public: Joi.boolean().required(),
      }),
      bookLink: Joi.object({
        rating: Joi.number().integer().min(1).max(5),
        review: Joi.string().max(5000),
        status: Joi.string()
          .valid(...Object.values(bookStatus))
          .required(),
        quotes: Joi.array().items(Joi.string()),
      }),
    }),
  },
  createBookLink: {
    body: Joi.object({
      rating: Joi.number().integer().min(1).max(5),
      review: Joi.string().max(5000),
      status: Joi.string()
        .valid(...Object.values(bookStatus))
        .required(),
      quotes: Joi.array().items(Joi.string()),
    }),
  },
};

module.exports = bookValidation;
