const createHttpError = require("http-errors");
const { sign, verify } = require("../utils/token.util");

exports.generateToken = async (payload, secret, expiresIn) => {
  try {
    const token = await sign(payload, secret, expiresIn);
    return token;
  } catch (error) {
    throw createHttpError.InternalServerError(
      "Internal Server Error happend during signing token"
    );
  }
};

exports.verifyToken = async (token, secret) => {
  try {
    const decodedToken = await verify(token, secret);
    return decodedToken;
  } catch (error) {
    throw createHttpError.Unauthorized("Invalid Signature");
  }
};
