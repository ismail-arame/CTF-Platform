const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");

authMiddleware = async (req, res, next) => {
  if (!req.headers["authorization"]) {
    return next(createHttpError.Unauthorized());
  }

  const bearerToken = req.headers["authorization"];
  const token = bearerToken.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded_token) => {
    if (error) {
      return next(createHttpError.Unauthorized());
    } else {
      req.user = decoded_token;
      next();
    }
  });
};

module.exports = authMiddleware;
