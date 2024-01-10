const createHttpError = require("http-errors");
const { ChallengeModel } = require("../models");

exports.createChallenge = async (challengeData) => {
  const newChallenge = await ChallengeModel.create(challengeData);
  if (!newChallenge) {
    throw createHttpError.BadRequest("Something went wrong");
  }

  return newChallenge;
};

exports.findChallenges = async () => {
  const challenges = await ChallengeModel.find({}).sort({ points: 1 });

  return challenges;
};

exports.findChallengeById = async (challenge_id) => {
  const challenge = await ChallengeModel.findById(challenge_id);
  if (!challenge) {
    throw createHttpError.BadRequest("Something went wrong");
  }

  return challenge;
};
