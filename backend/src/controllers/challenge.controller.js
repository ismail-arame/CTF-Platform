const createHttpError = require("http-errors");
const logger = require("../configs/logger.config");
const bcrypt = require("bcrypt");
const {
  createChallenge,
  findChallenges,
  findChallengeById,
} = require("../services/challenge.service");
const { ChallengeModel, UserModel } = require("../models");
const { findUserById } = require("../services/user.service");

exports.createChallenge = async (req, res, next) => {
  try {
    const {
      name,
      points,
      category,
      description,
      author,
      hints,
      attachmentZipName,
      attachmentUrl,
      websiteLink,
      difficulty,
      flag,
    } = req.body;

    //encrypting flag
    const encryptedFlag = await bcrypt.hash(flag, 12);

    let challengeData = {
      name,
      points,
      category,
      description,
      author,
      hints,
      attachmentZipName,
      attachmentUrl,
      websiteLink,
      difficulty,
      flag: encryptedFlag,
    };

    const newChallenge = await createChallenge(challengeData);
    res.status(200).json(newChallenge);
  } catch (error) {
    next(error);
  }
};

exports.getChallenges = async (req, res, next) => {
  try {
    const challenges = await findChallenges();
    // Remove the 'flag' property from each challenge object
    const challengesWithoutFlags = challenges.map((challenge) => {
      const challengeWithoutFlag = { ...challenge.toObject() };
      delete challengeWithoutFlag.flag;
      return challengeWithoutFlag;
    });

    res.status(200).json(challengesWithoutFlags);
  } catch (error) {
    next(error);
  }
};

exports.getChallengeById = async (req, res, next) => {
  try {
    const challengeId = req.params.challengeId;
    if (!challengeId) {
      logger.error("Please add the challenge id in the params");
      throw createHttpError.BadRequest("Something went wrong");
    }

    const challenge = await findChallengeById(challengeId);
    const challengeWithoutFlag = { ...challenge.toObject() };
    delete challengeWithoutFlag.flag;
    res.status(200).json(challengeWithoutFlag);
  } catch (error) {
    next(error);
  }
};

exports.checkSubmittedFlag = async (req, res, next) => {
  try {
    const { flag, challengeId, userId } = req.body;

    // *_*_*_*_*_*_*_*_* Compare Submitted Flag and Database Flag *_*_*_*_*_*_*_*_*
    //get the challenge from db by its id
    const challenge = await findChallengeById(challengeId);

    //compare submitted flag with the database flag
    const isSubmittedFlagValid = await bcrypt.compare(flag, challenge.flag);

    if (!isSubmittedFlagValid) {
      throw createHttpError.BadRequest("Flag is incorrect");
    }

    // *_*_*_*_*_*_*_*_* Add user id to solves in ChallengeModel *_*_*_*_*_*_*_*_*

    // check if the userId is already present in the solves array
    // userSolved : true => means user have already solved the challenge
    const userSolved = challenge.solves.some((solve) =>
      solve.user.equals(userId)
    );

    // Check if the challenge has not been solved before (solves array is empty) => firstBlood
    const challengeNotSolvedBefore = challenge.solves.length === 0;

    // update the challenge model to add the userId to the solves array
    if (!userSolved) {
      const updateChallengeSolves = await ChallengeModel.findOneAndUpdate(
        { _id: challengeId },
        {
          // $addToSet => this operation adds new element to the array (solves array in this case)
          $addToSet: {
            solves: {
              user: userId,
              solvedAt: new Date(),
              firstBlood: challengeNotSolvedBefore,
            },
          },
        },
        { new: true } //makes the method return the updated document
      );

      if (!updateChallengeSolves) {
        throw createHttpError.InternalServerError(
          "Failed to update challenge solves"
        );
      }
    } else {
      throw createHttpError.Conflict("You have already solved this challenge");
    }

    // *_*_*_*_*_*_*_*_* Add challenge id to solves in UserModel and Update User Score *_*_*_*_*_*_*_*_*

    const user = await findUserById(userId);

    // check if the challengeId is already present in the solves array
    // challengeSolved : true => means user have already solved the challenge
    const challengeSolved = user.solves.some((solve) =>
      solve.challenge.equals(challengeId)
    );

    if (!challengeSolved) {
      let updateObject = {
        $addToSet: {
          solves: {
            challenge: challengeId,
            solvedAt: new Date(),
          },
        },
        $inc: { score: challenge.points }, // increment user score
      };
      if (challengeNotSolvedBefore) {
        updateObject.$addToSet.firstBlood = {
          challenge: challengeId,
          solvedAt: new Date(),
        };
      }
      const updateUserSolves = await UserModel.findOneAndUpdate(
        { _id: userId },
        updateObject,
        { new: true }
      );

      if (!updateUserSolves) {
        throw createHttpError.InternalServerError(
          "Failed to update user solves"
        );
      }
    } else {
      throw createHttpError.Conflict("You have already solved this challenge");
    }

    res.send("Flag is correct");
  } catch (error) {
    next(error);
  }
};
