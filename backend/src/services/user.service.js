const createHttpError = require("http-errors");
const { UserModel } = require("../models");

exports.findUserById = async (userId) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw createHttpError.BadRequest("Something went wrong");
  }

  return user;
};
