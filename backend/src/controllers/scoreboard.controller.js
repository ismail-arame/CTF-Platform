const { UserModel } = require("../models");
const {
  findUsersAndPopulateChallenges,
  calculateRanksAndClassement,
} = require("../services/scoreboard.service");

exports.getScoreboardRank = async (req, res, next) => {
  try {
    const users = await findUsersAndPopulateChallenges();
    const newUsers = await calculateRanksAndClassement(users);
    for (const user of newUsers) {
      await UserModel.findOneAndUpdate(
        { _id: user._id },
        { $set: { rank: user.rank } },
        { new: true } // Return the updated document
      );
    }
    res.status(200).json(newUsers);
  } catch (error) {
    next(error);
  }
};
