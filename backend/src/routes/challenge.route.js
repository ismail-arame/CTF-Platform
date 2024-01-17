const express = require("express");
const trimRequest = require("trim-request");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getChallenges,
  createChallenge,
  getChallengeById,
  checkSubmittedFlag,
} = require("../controllers/challenge.controller");

// add authMiddleware when this functions are finished coding like this :
// router.post("/", trimRequest.all, authMiddleware, createChallenge);
router.post("/", trimRequest.all, authMiddleware, createChallenge);
router.get("/", trimRequest.all, authMiddleware, getChallenges);
router.get("/:challengeId", trimRequest.all, authMiddleware, getChallengeById);
router.post("/checkFlag", trimRequest.all, authMiddleware, checkSubmittedFlag);

module.exports = router;
