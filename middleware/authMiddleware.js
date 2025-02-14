const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function userMiddleware(req, res, next) {
  const jwtToken = req.headers.authorization;
  try {
    const decodedValue = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

    if (decodedValue.email) {
      const username = decodedValue.email.split("@")[0];
      req.email = decodedValue.email;
      req._id = decodedValue._id;
      req.username = username;
      next();
    } else {
      res.json({
        success: false,
        message: "You are not authenticated",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Invalid Token!",
    });
  }
}

module.exports = userMiddleware;
