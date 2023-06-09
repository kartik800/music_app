// imports
const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");

// creating post routes
router.post("/", async (req, res) => {
  // finding user in user models
  const user = await User.findOne({ email: req.body.email });
  // if user doesn't exist then send invalid, otherwise incrypt data and send it
  if (!user) {
    return res.status(400).send({ message: "Invalid email or password" });
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send({ message: "Invalid email or password" });

  // if both email and password are valid then we generate JSONWebToken
  const token = user.generateAuthToken();
  res
    .status(200)
    .send({ data: token, message: "Signing in please wait......" });
});

module.exports = router;
