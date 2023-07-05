'use strict'

const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const validate = require("../utils/validate.js")
const userValidation = require('../validations/user.validation')
const auth = require('../middlewares/authorization')

router.post('/register', validate(userValidation.create), authController.register)
router.post('/login', validate(userValidation.login), authController.login)
router.put('/change-password', auth(['user']), authController.changePassword)

module.exports = router