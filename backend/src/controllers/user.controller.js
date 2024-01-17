const createHttpError = require("http-errors");
const logger = require("../configs/logger.config");

const { UserModel } = require("../models");
const { findUsers } = require("../services/user.service");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await findUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
