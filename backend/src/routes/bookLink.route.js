const express = require("express");
const bookLinkController = require("../controllers/bookLink.controller");
const validate = require("../utils/validate.js")
const bookValidation = require("../validations/book.validation.js");
const auth = require("../middlewares/authorization.js")

const bookLinkRouter = express.Router();

bookLinkRouter.get("/", auth(["user", "admin"]), bookLinkController.getBookLinks);

bookLinkRouter.post("/", auth(["user", "admin"], validate(bookValidation.createBookLink)), bookLinkController.createBookLink);

bookLinkRouter.put("/", auth(["user", "admin"]), bookLinkController.editBookLink);

bookLinkRouter.delete("/", auth(["user", "admin"]), bookLinkController.deleteBookLink);

bookLinkRouter.get("/quotes", auth(["user", "admin"]), bookLinkController.getQuotes);

module.exports = bookLinkRouter;
