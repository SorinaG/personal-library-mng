const User = require("../models/user.model.js");

const getUser = async (req, res, next) => {
  try {
    let users = await User.find();
    const transformedUsers = users.map((user) => user.transform());
    res.send(transformedUsers);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const user = req.body;
    let createdUser = await User.create(user);
    res.send(createdUser);
  } catch (error) {
    next(error);
  }
};

const editUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updatedUserBody = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserBody, {
      new: true,
    });
    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const userId = req.user._id;
    let user = await User.findById(userId);
    const transformedUser = user.transform();
    res.send(transformedUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUser,
  createUser,
  editUser,
  deleteUser,
  getMe,
};
