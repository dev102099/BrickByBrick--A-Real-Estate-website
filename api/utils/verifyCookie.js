const handleError = require("../middleware/error");
const jwt = require("jsonwebtoken");

const verifyCookie = (req, res, next) => {
  console.log("Cookies received:", req.cookies);
  const token = req.cookies.access_token;
  if (!token) {
    return next(handleError(401, "Unauthorized"));
  }
  jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, user) => {
    if (err) {
      next(handleError(403, "Forbidden"));
    }
    req.user = user;
    console.log(user);
    next();
  });
};
module.exports = verifyCookie;
