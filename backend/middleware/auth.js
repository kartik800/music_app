// import
const jwt = require("jsonwebtoken");

// auth middleware
module.exports = (req, res, next) => {
  // extracting token from header
  const token = req.header("x-auth-token");

  // if token is not valid then throw error, otherwise check verification of token
  // and pass the middleware
  if (!token)
    return res
      .status(400)
      .send({ message: "Access denied, no token provided." });
  // if token is provided
  jwt.verify(token, process.env.JWTPRIVATEKEY, (error, validToken) => {
    if (error) {
      return res.status(400).send({ message: "Invalid token" });
    } else {
      req.user = validToken;
      next();
    }
  });
};
