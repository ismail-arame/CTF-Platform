const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("hello there this a CTF Project");
});

module.exports = app;
