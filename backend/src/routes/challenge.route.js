const express = require("express");
const trimRequest = require("trim-request");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getChallenges,
  createChallenge,
  getChallengeById,
  checkSubmittedFlag,
} = require("../controllers/challenge.controller");

// rate limiting middleware
const SubmitFlagLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 2,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    error: {
      status: 429,
      message: "Rate limit exceeded. Submit another flag after a minute.",
    },
  },
});

// add authMiddleware when this functions are finished coding like this :
// router.post("/", trimRequest.all, authMiddleware, createChallenge);
router.post("/", trimRequest.all, authMiddleware, createChallenge);
router.get("/", trimRequest.all, authMiddleware, getChallenges);
router.get("/:challengeId", trimRequest.all, authMiddleware, getChallengeById);
router.post(
  "/checkFlag",
  SubmitFlagLimiter,
  trimRequest.all,
  authMiddleware,
  checkSubmittedFlag
);

module.exports = router;
