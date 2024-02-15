const createHttpError = require("http-errors");
const { UserModel, ChallengeModel } = require("../models");

exports.findUserById = async (userId) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw createHttpError.BadRequest("Something went wrong");
  }

  return user;
};

exports.findUserByIdAndPopulateChallenges = async (userId) => {
  const user = await UserModel.findById(userId).populate({
    path: "solves.challenge",
    select: "name points category",
    model: "ChallengeModel",
  });
  if (!user) {
    throw createHttpError.BadRequest("Something went wrong");
  }

  return user;
};

exports.findUsers = async () => {
  const users = await UserModel.find({}, "username fullname picture");
  if (!users) {
    throw createHttpError.BadRequest("Something went wrong");
  }

  return users;
};
