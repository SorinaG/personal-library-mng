const express = require("express");
const bookController = require("../controllers/book.controller");
const validate = require("../utils/validate.js")
const bookValidation  = require("../validations/book.validation.js");
const auth = require("../middlewares/authorization.js")

const bookRouter = express.Router();

bookRouter.get("/", auth(["user", "admin"]), bookController.getBooks);

bookRouter.get("/unapproved-books", auth(["admin"]), bookController.getBooksForApprove)

bookRouter.post("/", auth(["user", "admin"]), validate(bookValidation.create), bookController.createBook);

bookRouter.put("/", auth(["admin"]), bookController.editBook);

bookRouter.delete("/", auth(["admin"]), bookController.deleteBook);

bookRouter.put("/approve", auth(["admin"]), bookController.approveBook)

bookRouter.get("/:id", auth(["user", "admin"]), bookController.getBookById)

bookRouter.get("/random", auth(["user", "admin"]), bookController.getRandomBooks)

module.exports = bookRouter;