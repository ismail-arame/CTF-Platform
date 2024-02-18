const express = require("express");
const trimRequest = require("trim-request");
const {
  createCompetitionDate,
  getCompetitionDate,
} = require("../controllers/competitionDate.controller");
const router = express.Router();

router.get("/", trimRequest.all, getCompetitionDate);
router.post("/", trimRequest.all, createCompetitionDate);

module.exports = router;
