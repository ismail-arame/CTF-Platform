const express = require("express");
// Routes
const authRoutes = require("./auth.route");
const challengeRoutes = require("./challenge.route");
const userRoutes = require("./user.route");
const scoreboardRoutes = require("./scoreboard.route");
const competitionDateRoutes = require("./compititionDate.route");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/challenge", challengeRoutes);
router.use("/user", userRoutes);
router.use("/scoreboard", scoreboardRoutes);
router.use("/competitionDate", competitionDateRoutes);

module.exports = router;
