const createHttpError = require("http-errors");
const { UserModel } = require("../models");
const validator = require("validator");
const bcrypt = require("bcrypt");

exports.createUser = async (userData) => {
  const { fullname, username, email, password } = userData;

  //env variables
  const { DEFAULT_PICTURE } = process.env;

  //check if fileds are empty
  if (!fullname || !username || !email || !password) {
    throw createHttpError.BadRequest("Please fill all fields");
  }

  //check fullname length
  if (!validator.isLength(fullname, { min: 6, max: 30 })) {
    throw createHttpError.BadRequest(
      "Please make sure your fullname is between 6 and 30 characters "
    );
  }

  //check username length
  if (!validator.isLength(username, { min: 3, max: 30 })) {
    throw createHttpError.BadRequest(
      "Please make sure your username is between 3 and 30 characters "
    );
  }

  //check if email is valid
  if (!validator.isEmail(email)) {
    throw createHttpError.BadRequest("Please make sure to enter a valid email");
  }

  //check if user already exist
  const checkDb = await UserModel.findOne({ email });
  if (checkDb) {
    throw createHttpError.Conflict(
      "This email already exists please enter another email"
    );
  }

  //check password length
  if (!validator.isLength(password, { min: 6, max: 128 })) {
    throw createHttpError.BadRequest(
      "Please make sure your password is between 6 and 128 characters"
    );
  }

  //encrypting password
  const encryptedPassword = await bcrypt.hash(password, 12);

  //saving data to database
  const newUser = new UserModel({
    fullname,
    username,
    email,
    password: encryptedPassword,
  });

  try {
    await newUser.save();
    // user saved to database successfully
    return newUser;
  } catch (error) {
    throw createHttpError.InternalServerError(
      "Failed to save user to database"
    );
  }
};

exports.findUser = async (userId) => {
  const user = await UserModel.findById({ _id: userId });
  if (!user) {
    throw createHttpError.BadRequest("this account no longer exists");
  }
  return user;
};

exports.signUser = async (email, password) => {
  //By using lean(), the user object returned will not have any Mongoose-specific functionality or features. It will be a lightweight plain JavaScript object containing the user's data from the database.
  const user = await UserModel.findOne({ email: email.toLowerCase() }).lean();
  // check if email exist
  if (!user) {
    throw createHttpError.BadRequest("password or email is incorrect");
  }

  // compare passwords
  const isPasswordTheSame = await bcrypt.compare(password, user.password);
  if (!isPasswordTheSame) {
    throw createHttpError.BadRequest("password or email is incorrect");
  }

  return user;
};
