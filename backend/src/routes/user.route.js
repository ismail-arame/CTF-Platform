const express = require("express");
const trimRequest = require("trim-request");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const { getUsers, getUserById } = require("../controllers/user.controller");

// get users endpoint
router.get("/", trimRequest.all, authMiddleware, getUsers);
router.get("/:userId", trimRequest.all, authMiddleware, getUserById);

module.exports = router;
