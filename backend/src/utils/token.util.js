const jwt = require("jsonwebtoken");
const logger = require("../configs/logger.config");

exports.sign = async (payload, secret, expiresIn) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      secret,
      { expiresIn: expiresIn },
      function (error, token) {
        if (error) {
          logger.error(error);
          reject(error);
        } else {
          resolve(token);
        }
      }
    );
  });
};
exports.verify = async (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, function (error, decodedToken) {
      if (error) {
        logger.error(error);
        reject(error);
      } else {
        resolve(decodedToken);
      }
    });
  });
};
