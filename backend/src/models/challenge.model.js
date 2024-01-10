const mongoose = require("mongoose");
const validator = require("validator");

const { ObjectId } = mongoose.Schema;

const challengeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Challenge name is required"],
      trim: true,
    },
    points: {
      type: Number,
      required: [true, "Challenge points is required"],
      trim: true,
    },
    category: {
      type: String,
      enum: [
        "Pwn",
        "Forensics",
        "Crypto",
        "Malware Analysis",
        "Web",
        "rev",
        "Misc",
      ], //enum => only those values inside it can be used
      required: [true, "Challenge category is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Challenge description is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Challenge author is required"],
      trim: true,
    },
    hints: {
      type: [String], // an array of strings
      trim: true,
    },
    attachmentZipName: {
      type: String,
      trim: true,
    },
    attachmentUrl: {
      type: String,
      trim: true,
    },
    websiteLink: {
      type: String,
      trim: true,
    },
    // flag is encrypted using bcrypt
    flag: {
      type: String,
      required: [true, "Challenge flag is required"],
      trim: true,
    },
    // id of users who managed to solve this challenge
    solves: [
      {
        user: {
          type: ObjectId,
          ref: "UserModel", // Reference to user by id
        },
        solvedAt: {
          type: Date,
          default: new Date(), // Creates a Date object with the current date and time // Output : Mon Jan 10 2024 12:34:56 GMT+0000 (Coordinated Universal Time)
          // default: Date.now(), // Returns the current timestamp in milliseconds // Output: 1641849296000
        },
      },
    ],
  },
  { collection: "challenges", timestamps: true }
);

// Avoid redefining existsing mongoose models

const ChallengeModel =
  mongoose.models.ChallengeModel ||
  mongoose.model("ChallengeModel", challengeSchema);

module.exports = ChallengeModel;

// Now, when you populate the solves array in a challenge document, Mongoose will use the UserModel to retrieve the associated user data when you query for the challenge. For example:

// const challenge = await ChallengeModel.findById(someChallengeId).populate('solves.user');
