const createHttpError = require("http-errors");
const { UserModel } = require("../models");

exports.findUsersAndPopulateChallenges = async () => {
  const users = await UserModel.find(
    {},
    "username fullname picture score firstBlood solves"
  ).populate({
    path: "solves.challenge",
    select: "name points category",
    model: "ChallengeModel",
  });
  // .populate({
  // path: "solves.solvedAt solves._id",
  // });
  if (!users) {
    throw createHttpError.BadRequest("Something went wrong");
  }

  // Conditionally populate firstBlood field for each user
  // const populatedUsers = users.map((user) => {
  //   if (user.firstBlood) {
  //     return user.populate({
  //       path: "firstBlood.challenge",
  //       select: "name points category",
  //       model: "ChallengeModel",
  //     });
  //   }
  //   return user;
  // });

  return users;
};

exports.calculateRanksAndClassement = async (users) => {
  users.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score; // Sort by score
    } else {
      // If scores are equal, sort by LastTimeSolvedChallenge in ascending order
      const timeA = new Date(a.solves[a.solves.length - 1]?.solvedAt);
      const timeB = new Date(b.solves[b.solves.length - 1]?.solvedAt);
      return timeA - timeB;
    }
  });

  if (!users) {
    throw createHttpError.BadRequest("Something went wrong");
  }

  for (let i = 0; i < users.length; i++) {
    users[i].rank = i + 1;
  }
  return users;
};
