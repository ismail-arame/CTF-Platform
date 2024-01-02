const createHttpError = require("http-errors");
const { createUser, findUser, signUser } = require("../services/auth.service");
const { generateToken, verifyToken } = require("../services/token.service");
const jwt = require("jsonwebtoken");
const logger = require("../configs/logger.config");

//env variables

//Global variable that stores refresh tokens
let refreshTokens = [];

exports.register = async (req, res, next) => {
  try {
    const { fullname, username, email, password } = req.body;
    console.log("body content : ", fullname, username, email, password);
    const newUser = await createUser({
      fullname,
      username,
      email,
      password,
    });

    //generate access token
    const accessToken = await generateToken(
      { userId: newUser._id, isAdmin: false },
      process.env.ACCESS_TOKEN_SECRET,
      "7d"
    );
    //generate refresh token
    const refreshToken = await generateToken(
      { userId: newUser._id, isAdmin: false },
      process.env.REFRESH_TOKEN_SECRET,
      "7d"
    );

    refreshTokens.push(refreshToken);

    res.json({
      message: "register success",
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        email: newUser.email,
        picture: newUser.picture,
        token: accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    //error will be passed to createHttpError package
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("login creds : ", email, password);

    const user = await signUser(email, password);

    console.log("user login : ", user);

    //generate access token
    const accessToken = await generateToken(
      { userId: user._id, isAdmin: false },
      process.env.ACCESS_TOKEN_SECRET,
      "7d"
    );
    //generate refresh token
    const refreshToken = await generateToken(
      { userId: user._id, isAdmin: false },
      process.env.REFRESH_TOKEN_SECRET,
      "7d"
    );

    refreshTokens.push(refreshToken);
    res.json({
      message: "login success",
      user: {
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        picture: user.picture,
        token: accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.json({
      message: "logged out successfully.",
    });
  } catch (error) {
    next(error);
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    // take the refresh token from the user
    const refreshToken = req.body.token;
    console.log("refreshToken : ", refreshToken);

    // send error if there's no token or it's invalid
    if (!refreshToken) {
      throw createHttpError.Unauthorized("You are not authenticated");
    }
    if (!refreshTokens.includes(refreshToken)) {
      throw createHttpError.Unauthorized("Refresh Token is not valid");
    }

    const decodedToken = await verifyToken(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    if (!decodedToken) {
      throw createHttpError.Unauthorized("you are not authenticated");
    }

    const user = await findUser(decodedToken.userId);
    console.log("user : :: ", user);

    // The purpose of removing the refreshToken from refreshTokens is to ensure that each refresh token can only be used once. Once it's used, it's no longer valid.
    refreshTokens = refreshTokens.filter((token) => refreshToken !== token);

    const newAccessToken = await generateToken(
      { userId: decodedToken.userId, isAdmin: decodedToken.isAdmin },
      process.env.ACCESS_TOKEN_SECRET,
      "7d"
    );
    const newRefreshToken = await generateToken(
      { userId: decodedToken.userId, isAdmin: decodedToken.isAdmin },
      process.env.REFRESH_TOKEN_SECRET,
      "7d"
    );

    refreshTokens.push(newRefreshToken);

    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    next(error);
  }
};
