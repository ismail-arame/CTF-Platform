const createHttpError = require("http-errors");
const logger = require("../configs/logger.config");

const { UserModel } = require("../models");
const {
  findUsers,
  findUserByIdAndPopulateChallenges,
} = require("../services/user.service");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await findUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      logger.error("Please add the user id in the params");
      throw createHttpError.BadRequest("Something went wrong");
    }

    const user = await findUserByIdAndPopulateChallenges(userId);

    const userWithoutPassword = { ...user.toObject() };
    delete userWithoutPassword.password;

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};
