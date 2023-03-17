const router = require("express").Router();

const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

// create user
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  // if an error occurs
  if (error) return res.status(400).send({ message: error.details[0].message });

  const user = await User.findOne({ email: req.body.email });
  if (user)
    return res
      .status(403)
      .send({ message: "User with given email already exist!" });

  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  let newUser = await new User({
    ...req.body,
    password: hashPassword,
  }).save();

  // don't change in backend this will be undefined for this object only so we don't need to send password in client side
  newUser.password = undefined;
  newUser.__v = undefined;

  res
    .status(200)
    .send({ data: newUser, message: "Account created successfully" });
});

module.exports = router;
