const createHttpError = require("http-errors");
const { CompetitionDateModel } = require("../models");

exports.createNewCompetitionDate = async (competitionDateData) => {
  const newCompetitionDate = await CompetitionDateModel.create(
    competitionDateData
  );
  if (!newCompetitionDate) {
    throw createHttpError.BadRequest("Something went wrong");
  }

  return newCompetitionDate;
};

exports.findCompetitionDate = async () => {
  const competitionDate = await CompetitionDateModel.find({});
  return competitionDate;
};

exports.getCompetitionInterval = async () => {
  const competitionDate = await CompetitionDateModel.find({});
  const isDateWithinCompetitionInterval =
    new Date() >= new Date(competitionDate[0].competitionStartDate) &&
    new Date() <= new Date(competitionDate[0].competitionEndDate);

  console.log(
    "is date within competition interval : ",
    isDateWithinCompetitionInterval
  );
  return isDateWithinCompetitionInterval;
};
