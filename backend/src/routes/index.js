const express = require("express");
const bookRouter = require("./book.route.js")
const bookLinkRouter = require("./bookLink.route.js")
const userRouter = require("./user.route")
const authRouter = require("./auth.route")

const router = express.Router()

router.use('/book', bookRouter)

router.use('/bookLink', bookLinkRouter)

router.use('/user', userRouter)

router.use('/auth', authRouter)

module.exports = router