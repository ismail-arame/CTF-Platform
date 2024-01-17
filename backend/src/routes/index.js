const express = require("express");
// Routes
const authRoutes = require("./auth.route");
const challengeRoutes = require("./challenge.route");
const userRoute = require("./user.route");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/challenge", challengeRoutes);
router.use("/user", userRoute);

module.exports = router;
