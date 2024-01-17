const express = require("express");
const trimRequest = require("trim-request");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const { getUsers } = require("../controllers/user.controller");

// get users endpoint
router.get("/", trimRequest.all, authMiddleware, getUsers);

module.exports = router;
