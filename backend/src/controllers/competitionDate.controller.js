const {
  createNewCompetitionDate,
  findCompetitionDate,
} = require("../services/competitionDate.service");

exports.createCompetitionDate = async (req, res, next) => {
  try {
    const { competitionStartDate, competitionEndDate } = req.body;
    const competitionDateData = { competitionStartDate, competitionEndDate };
    const newCompetitionDate = await createNewCompetitionDate(
      competitionDateData
    );
    res.status(200).json(newCompetitionDate);
  } catch (error) {
    next(error);
  }
};

exports.getCompetitionDate = async (req, res, next) => {
  try {
    const competitionDate = await findCompetitionDate();
    res.status(200).json(competitionDate);
  } catch (error) {
    next(error);
  }
};
