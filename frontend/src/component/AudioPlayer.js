import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentSong } from "../redux/audioPlayer";
import Like from "./Like";
import { IconButton } from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";

const AudioPlayer = () => {
  const [trackProgress, setTrackProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const { currentSong } = useSelector((state) => state.audioPlayer);
  const dispatch = useDispatch();

  const audioRef = useRef();
  const intervalRef = useRef();

  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef && audioRef.current.ended) {
        dispatch(setCurrentSong({ ...currentSong, action: "pause" }));
      } else if (audioRef) {
        setTrackProgress(audioRef.current.currentTime);
        audioRef.current.duration && setDuration(audioRef.current.duration);
      } else {
        setTrackProgress(0);
      }
    }, [1000]);
  };

  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : "0%";
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
  `;

  useEffect(() => {
    if (currentSong.action === "play") {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [currentSong]);

  useEffect(() => {
    currentSong.action === "play" && startTimer();
  });

  const onScrub = (value) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const handleActions = () => {
    currentSong.action === "play"
      ? dispatch(setCurrentSong({ ...currentSong, action: "pause" }))
      : dispatch(setCurrentSong({ ...currentSong, action: "play" }));
  };

  return (
    <div className="w-[calc(100%_-_0rem)] h-24 fixed bg-[color:var(--light-black)] z-[200] flex items-center justify-between px-16 py-0 left-0 bottom-0 bg-gray-400 bg-gradient-to-r from-gray-600 to-cyan-800">
      <div className="flex flex-[1]">
        <img
          className="w-20 h-20 object-contain"
          src={currentSong.song.img}
          alt="song_img"
        />
        <div className="flex flex-col items-start justify-center ml-8">
          <p className="text-2xl font-medium text-[color:var(--white)]">
            {currentSong.song.name}
          </p>
          <p className="text-[1.2rem] font-normal text-[color:var(--light-white)]">
            {currentSong.song.artist}
          </p>
        </div>
      </div>
      <div className="flex flex-[1] flex-col items-center justify-center">
        <div className="mt-4">
          <IconButton className="text-[color:var(--light-white)]">
            <SkipPreviousIcon className=" w-10 h-10" />
          </IconButton>
          <IconButton
            className="bg-[color:var(--white)] text-[color:var(--black)] w-10 h-10 p-2 rounded-[50%]"
            onClick={handleActions}
          >
            {currentSong.action === "play" ? (
              <PauseIcon className="bg-[color:var(--white)] text-[color:var(--black)] w-10 h-10 p-2 rounded-[50%]" />
            ) : (
              <PlayArrowIcon className="bg-[color:var(--white)] text-[color:var(--black)] w-10 h-10 p-2 rounded-[50%]" />
            )}
          </IconButton>
          <IconButton className="text-[color:var(--light-white)]">
            <SkipNextIcon />
          </IconButton>
        </div>
        <div className="flex items-center mt-4 mb-6 mx-0">
          <p>{Math.floor(trackProgress)}</p>
          <input
            type="range"
            value={trackProgress}
            step="1"
            min="0"
            onChange={(e) => onScrub(e.target.value)}
            max={duration ? duration : 0}
            className=" w-[50rem] h-2"
            style={{ background: trackStyling }}
          />
          <audio src={currentSong.song.song} ref={audioRef}></audio>
          <p>{Math.floor(duration)}</p>
        </div>
      </div>
      <div className="flex-[1] flex justify-end">
        <Like songId={currentSong.song._id} />
      </div>
    </div>
  );
};

export default AudioPlayer;
