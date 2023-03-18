// import
const jwt = require("jsonwebtoken");

// admin middleware
// take three parameter req, res, next -> next is for sending forward
module.exports = (req, res, next) => {
  // extracting token from header
  const token = req.header("x-auth-token");

  // if token doesn't exist then send error msg, otherwise verify jwt token
  // if jwt token not valid then send Invalid token, if not then check is user
  // an admin if admin then pass the middleware, otherwise send error message
  if (!token)
    return res
      .status(400)
      .send({ message: "Access denied, no token provided." });
  // if token is provided
  jwt.verify(token, process.env.JWTPRIVATEKEY, (error, validToken) => {
    // jwt token not valid
    if (error) {
      return res.status(400).send({ message: "Invalid token" });
      // valid jwt token
    } else {
      // not an admin
      if (!validToken.isAdmin)
        return res
          .status(403)
          .send({ message: "You don't have access to this content" });
      req.user = validToken;
      next();
    }
  });
};
