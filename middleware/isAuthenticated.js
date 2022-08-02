const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {
  if (req.headers.authoeization) {
    const Token = req.headers.authorization.replace("Bearer ", "");
    const user = await User.findOne({ token: token }).select("account _id");

    if (user) {
      req.user = user;
      next();
    } else {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
  } else {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};

module.exports = isAuthenticated;