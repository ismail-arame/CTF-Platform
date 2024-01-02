const express = require("express");
const trimRequest = require("trim-request");
const router = express.Router();

const {
  register,
  refreshToken,
  login,
  logout,
} = require("../controllers/auth.controller");

//register endpoint
router.post("/register", trimRequest.all, register);

//refreshToken endpoint
router.post("/refresh", trimRequest.all, refreshToken);

//login endpoint
router.post("/login", trimRequest.all, login);

//logout endpoint
router.post("/logout", trimRequest.all, logout);

module.exports = router;
