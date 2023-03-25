import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSong } from "../redux/audioPlayer";
import { IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { millisToMinutesAndSeconds } from "../lib/time";
import Like from "./Like";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PlaylistMenu from "./PlaylistMenu";

const Song = ({ song, playlist, handleRemoveSong }) => {
  const [menu, setMenu] = useState(false);
  const { currentSong } = useSelector((state) => state.audioPlayer);
  const dispatch = useDispatch();

  const handleChange = () => {
    if (currentSong && currentSong.action === "play") {
      const payload = {
        song: song,
        action: "pause",
      };
      dispatch(setCurrentSong(payload));
    } else {
      const payload = {
        song: song,
        action: "play",
      };
      dispatch(setCurrentSong(payload));
    }
  };
  return (
    <>
      <div className="w-full h-24 flex justify-evenly rounded-lg hover:bg-[color:var(--light-black)]">
        <div className="flex flex-[1] justify-evenly">
          <IconButton
            onClick={handleChange}
            className="flex mx-2 my-0 w-8 h-8 text-[color:var(--white)]"
          >
            {currentSong &&
            currentSong.action === "play" &&
            currentSong.song._id === song._id ? (
              <PauseIcon />
            ) : (
              <PlayArrowIcon />
            )}
          </IconButton>
          <img src={song.img} alt="song_img" />
          <p>{song.name}</p>
        </div>
        <div className="flex-[1]">
          <p className="text-center text-[1.2rem] overflow-hidden text-ellipsis m-0">
            {song.artist}
          </p>
        </div>
        <div className="flex justify-end relative flex-[1]">
          <Like songId={song._id} />
          <p className="text-[1.2rem] ml-4 mr-2 my-0">
            {millisToMinutesAndSeconds(song.duration)}
          </p>
          <IconButton
            className=" w-8 h-8 text-[color:var(--white)]"
            onClick={() => setMenu(true)}
          >
            <MoreHorizIcon />
          </IconButton>
          {menu && (
            <PlaylistMenu
              playlist={playlist}
              song={song}
              handleRemoveSong={handleRemoveSong}
              closeMenu={() => setMenu(false)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Song;
