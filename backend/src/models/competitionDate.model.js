const mongoose = require("mongoose");
const validator = require("validator");

const competitionDateSchema = mongoose.Schema(
  {
    competitionStartDate: {
      type: String,
      required: [true, "Competition start date is required"],
      trim: true,
    },
    competitionEndDate: {
      type: String,
      required: [true, "Competition end date is required"],
      trim: true,
    },
  },
  { collection: "competitionDate", timestamps: true }
);

// Avoid redefining existing mongoose models
const CompetitionDateModel =
  mongoose.models.CompetitionDateModel ||
  mongoose.model("CompetitionDateModel", competitionDateSchema);

module.exports = CompetitionDateModel;
