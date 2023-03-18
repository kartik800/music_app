// import
const mongoose = require("mongoose");

// valid object ID middleware
module.exports = (req, res, next) => {
  // checking it is a valid id or not
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send({ message: "Invalid ID" });

  next();
};
