const express = require("express");
const trimRequest = require("trim-request");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const { getScoreboardRank } = require("../controllers/scoreboard.controller");

//get users scoreboard endpoint
router.get("/", trimRequest.all, authMiddleware, getScoreboardRank);

module.exports = router;
