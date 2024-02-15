const mongoose = require("mongoose");
const validator = require("validator");

const { ObjectId } = mongoose.Schema;

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Please enter your fullname"],
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      trim: true, //remove if something gone wrong
      unique: [true, "This email already exists"],
      lowercase: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    picture: {
      type: String,
      trim: true,
      default:
        "https://res.cloudinary.com/dkd5jblv5/image/upload/v1675976806/Default_ProfilePicture_gjngnb.png",
    },
    password: {
      type: String,
      required: [true, "Please enter a valid password"],
      validate: {
        validator: (value) => {
          return value.length >= 6 && value.length <= 128;
        },
        message: "Password must be between 6 and 128 characters in length",
      },
    },
    score: {
      // points collected from solving challenges
      type: Number,
      default: 0,
    },
    rank: {
      type: Number,
      default: 1,
    },
    // firstBlood => the very first solver of a challenge
    firstBlood: [
      {
        challenge: {
          type: ObjectId,
          ref: "ChallengeModel",
        },
        solvedAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
    solves: [
      {
        challenge: {
          type: ObjectId,
          ref: "ChallengeModel", // Reference to user by id
        },
        solvedAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  {
    collection: "users",
    timestamps: true,
  }
);

// Avoid redefining existing mongoose models
const UserModel =
  mongoose.models.UserModel || mongoose.model("UserModel", userSchema);

module.exports = UserModel;
