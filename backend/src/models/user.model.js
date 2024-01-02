const mongoose = require("mongoose");
const validator = require("validator");

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
