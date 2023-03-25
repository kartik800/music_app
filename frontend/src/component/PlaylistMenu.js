import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSongToPlaylist } from "../redux/playListSlice/apiCalls";
import { ClickAwayListener } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const PlaylistMenu = ({ playlist, song, handleRemoveSong, closeMenu }) => {
  const { playlists } = useSelector((state) => state.playlists);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleAddToPlaylist = (playlistId, songId) => {
    const payload = { playlistId, songId };
    console.log(payload);
    addSongToPlaylist(payload, dispatch);
  };

  return (
    <ClickAwayListener onClickAway={closeMenu}>
      <div
        className="z-[100] w-60 bg-[color:var(--black)] shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px] absolute rounded-lg right-0 top-[0%]"
        onClick={closeMenu}
      >
        <div className=" text-[1.4rem] justify-between items-center cursor-pointer p-2 rounded-lg hover:block bg-gray-800">
          <p>Add to Playlist</p>
          <Fragment>
            <ArrowRightIcon />
            <div className="  right-[97%] top-0 bottom-[initial] absolute z-[100] w-60 p-2 rounded-lg bg-gray-700 block">
              {playlists.map((playlist) => (
                <div
                  className="text-[1.4rem] flex justify-between items-center cursor-pointer p-3 rounded-lg bg-gray-700"
                  onClick={() => handleAddToPlaylist(playlist._id, song._id)}
                  key={playlist._id}
                >
                  <p>{playlist.name}</p>
                </div>
              ))}
            </div>
          </Fragment>
        </div>
        {playlist && playlist.user === user._id && (
          <div className="text-[1.4rem] flex justify-between items-center cursor-pointer p-2 rounded-lg">
            <p onClick={() => handleRemoveSong(song._id)}>
              Remove from Playlist
            </p>
          </div>
        )}
        <div className="text-[1.4rem] flex justify-between items-center cursor-pointer p-2 rounded-lg">
          <p>Go to artist</p>
        </div>
        <div className="text-[1.4rem] flex justify-between items-center cursor-pointer p-2 rounded-lg">
          <p>Share</p>
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default PlaylistMenu;
