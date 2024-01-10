const createHttpError = require("http-errors");
const logger = require("../configs/logger.config");
const bcrypt = require("bcrypt");
const {
  createChallenge,
  findChallenges,
  findChallengeById,
} = require("../services/challenge.service");

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
    res.status(200).json(challenges);
  } catch (error) {}
};

exports.getChallengeById = async (req, res, next) => {
  try {
    const challenge_id = req.params.challenge_id;
    if (!challenge_id) {
      logger.error("Please add the challenge id in the params");
      throw createHttpError.BadRequest("Something went wrong");
    }

    const challenge = await findChallengeById(challenge_id);
    res.status(200).json(challenge);
  } catch (error) {}
};
