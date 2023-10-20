exports.register = async (req, res, next) => {
  try {
    res.send("register endpoint");
  } catch (error) {
    next(error);
  }
};
exports.login = async (req, res, next) => {
  try {
    res.send("login endpoint");
  } catch (error) {
    next(error);
  }
};
exports.logout = async (req, res, next) => {
  try {
    res.send("logout endpoint");
  } catch (error) {
    next(error);
  }
};
