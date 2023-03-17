const mongoose = require("mongoose");
const Joi = require("joi");

//creating object is bacause we are saving id of user
// playlist schema
const ObjectId = mongoose.Schema.Types.ObjectId;

// creating playlist schema
const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: ObjectId, ref: "user", required: true },
  desc: { type: String },
  songs: { type: Array, default: [] },
  img: { type: String },
});

// validate the playlist schema
const validate = (playlist) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    user: Joi.string().required(),
    desc: Joi.string().allow(""),
    songs: Joi.array().items(Joi.string()),
    img: Joi.string().allow(""),
  });
  return schema.validate(song);
};

const Playlist = mongoose.model("playlist", playlistSchema);

module.exports = { Playlist, validate };
