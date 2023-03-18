// imports
const router = require("express").Router();
const { Song } = require("../models/song");
const { Playlist } = require("../models/playlist");
const auth = require("../middleware/auth");

// search route
router.get("/", auth, async (req, res) => {
  // ?search=
  const search = req.query.search;
  // if search string is not empty;
  if (search !== "") {
    const songs = await Song.find({
      name: { $regex: search, $options: "i" },
    }).limit(10);
    const playlists = await Playlist.find({
      name: { $regex: search, $options: "i" },
    }).limit(10);
    const result = { songs, playlists };
    res.status(200).send({ data: result });
    // search string is empty
  } else {
    res.status(200).send({});
  }
});

module.exports = router;
