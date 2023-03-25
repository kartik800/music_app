import { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../redux/axiosInstance";
import {
  deletePlayList,
  removeSongFromPlaylist,
} from "../redux/playListSlice/apiCalls";
import Song from "../component/Song";
import PlaylistModel from "../component/PlaylistModel";
import { IconButton, CircularProgress } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Playlist = () => {
  const [playlist, setPlaylist] = useState({});
  const [songs, setSongs] = useState([]);
  const [model, setModel] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { id } = useParams();

  const Navigate = useNavigate();

  const getPlaylistSongs = async (id) => {
    try {
      setIsFetching(true);
      const url = process.env.REACT_APP_API_URL + "/playlists/" + id;
      const { data } = await axiosInstance.get(url);
      setPlaylist(data.data.playlist);
      setSongs(data.data.songs);
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      console.log(error);
    }
  };

  const handleDeletePlaylist = async () => {
    const res = await deletePlayList(playlist._id, dispatch);
    console.log(playlist._id);
    if (res) Navigate("/home");
  };

  const handleRemoveSong = async (songId) => {
    const originalSongs = [...songs];
    const payload = { playlistId: playlist._id, songId };
    const filterSongs = originalSongs.filter((song) => song._id !== songId);
    setSongs(filterSongs);
    const res = await removeSongFromPlaylist(payload, dispatch);
    !res && setSongs(originalSongs);
  };

  useEffect(() => {
    getPlaylistSongs(id);
  }, [id]);

  return (
    <div className="flex flex-col bg-gray-700">
      <div className=" mx-32 my-16">
        <div className="relative bg-gray-700">
          {isFetching && (
            <div className="h-[90vh] flex justify-center items-center">
              <CircularProgress style={{ color: "#1ed760" }} size="5rem" />
            </div>
          )}
          {!isFetching && (
            <Fragment>
              <div className="relative flex bg-[color:var(--gradient-gray)] p-20">
                <div className="absolute w-full h-full left-0 top-0 linear-gradient(transparent 0, rgba(0, 0, 0, 0.4) 100%)"></div>
                {playlist.img === "" ? (
                  <img
                    className="w-[25rem] h-[25rem] shadow-[0_4px_60px_rgb(0_0_0_/_50%)]"
                    src="https://static.thenounproject.com/png/17849-200.png"
                    alt={playlist.name}
                    style={{ background: "#919496" }}
                  />
                ) : (
                  <img
                    className="w-[25rem] h-[25rem] shadow-[0_4px_60px_rgb(0_0_0_/_50%)]"
                    src={playlist.img}
                    alt={playlist.name}
                  />
                )}

                <div className="self-end ml-8">
                  <p className="text-[1.4rem] uppercase m-0">Playlist</p>
                  <h1 className="text-9xl m-0">{playlist.name}</h1>
                  <span className="text-[1.4rem]">{playlist.desc}</span>
                </div>

                {playlist.user === user._id && (
                  <div className="absolute p-8 right-0 top-0">
                    <IconButton
                      className="w-[2.4rem] h-[2.4rem] text-[color:var(--white)]"
                      onClick={() => setModel(true)}
                    >
                      <EditIcon className="w-[2.4rem] h-[2.4rem] text-[color:var(--white)]" />
                    </IconButton>
                    <IconButton
                      className="w-[2.4rem] h-[2.4rem] text-[color:var(--white)]"
                      onClick={handleDeletePlaylist}
                    >
                      <DeleteIcon className="w-[2.4rem] h-[2.4rem] text-[color:var(--white)]" />
                    </IconButton>
                  </div>
                )}
              </div>
              <div className="px-12 py-4">
                <div className="flex justify-between text-[color:var(--light-white)] text-[1.4rem] uppercase border-b-[color:var(--light-white)] mb-4 px-0 py-2 border-b border-solid">
                  <div className="flex flex-[1] pl-8">
                    <span className="mr-6">#</span>
                    <p className="m-0">Title</p>
                  </div>
                  <div className="flex-[1] flex justify-center">
                    <p className="m-0">Artist</p>
                  </div>
                  <div className="flex-[1] flex justify-end pr-16">
                    <AccessTimeIcon className="w-8 h-8" />
                  </div>
                </div>
                {songs.map((song) => (
                  <Fragment key={song._id}>
                    <Song
                      song={song}
                      playlist={playlist}
                      handleRemoveSong={handleRemoveSong}
                    />
                  </Fragment>
                ))}
              </div>
              {model && (
                <PlaylistModel
                  closeModel={() => setModel(false)}
                  playlist={playlist}
                />
              )}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default Playlist;
