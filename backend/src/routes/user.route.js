const express = require("express");
const userController = require("../controllers/user.controller");
const auth = require('../middlewares/authorization')

const userRouter = express.Router();

userRouter.get("/", auth(['admin']), userController.getUser);

userRouter.get("/me", auth(['user', 'admin']), userController.getMe);

userRouter.post("/", userController.createUser);

// userRouter.put("/change-password", auth(['user']), userController.changePassword);

userRouter.put("/:id", userController.editUser);

userRouter.delete("/:id", userController.deleteUser);

module.exports = userRouter;
