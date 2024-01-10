const express = require("express");
const trimRequest = require("trim-request");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getChallenges,
  createChallenge,
  getChallengeById,
} = require("../controllers/challenge.controller");

// add authMiddleware when this functions are finished coding like this :
// router.post("/", trimRequest.all, authMiddleware, createChallenge);
router.post("/", trimRequest.all, authMiddleware, createChallenge);
router.get("/", trimRequest.all, authMiddleware, getChallenges);
router.get("/:challenge_id", trimRequest.all, authMiddleware, getChallengeById);

module.exports = router;
