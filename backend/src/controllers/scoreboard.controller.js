const {
  findUsersAndPopulateChallenges,
  calculateRanksAndClassement,
} = require("../services/scoreboard.service");

exports.getScoreboardRank = async (req, res, next) => {
  try {
    const users = await findUsersAndPopulateChallenges();
    const newUsers = await calculateRanksAndClassement(users);
    res.status(200).json(newUsers);
  } catch (error) {
    next(error);
  }
};
