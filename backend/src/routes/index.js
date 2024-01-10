const express = require("express");
// Routes
const authRoutes = require("./auth.route");
const challengeRoutes = require("./challenge.route");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/challenge", challengeRoutes);

module.exports = router;
