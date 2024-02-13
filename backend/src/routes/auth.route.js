const express = require("express");
const trimRequest = require("trim-request");
const router = express.Router();
const rateLimit = require("express-rate-limit");

// rate limiting middleware
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    error: {
      status: 429,
      message: "Rate limit exceeded. Please try again after 15 minutes.",
    },
  },
});

const {
  register,
  refreshToken,
  login,
  logout,
} = require("../controllers/auth.controller");

//register endpoint
router.post("/register", authLimiter, trimRequest.all, register);

//refreshToken endpoint
router.post("/refresh", trimRequest.all, refreshToken);

//login endpoint
router.post("/login", authLimiter, trimRequest.all, login);

//logout endpoint
router.post("/logout", trimRequest.all, logout);

module.exports = router;
