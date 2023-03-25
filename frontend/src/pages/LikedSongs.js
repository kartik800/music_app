import { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import Song from "../component/Song";
import axiosInstance from "../redux/axiosInstance";
import { CircularProgress } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import styles from "./styles.module.scss";
// import likeImg from "../../images/like.jpg";

const LikedSongs = () => {
  const [songs, setSongs] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const { user } = useSelector((state) => state.user);

  const getLikedSongs = async () => {
    try {
      setIsFetching(true);
      const url = process.env.REACT_APP_API_URL + `/songs/like`;
      const { data } = await axiosInstance.get(url);
      setSongs(data.data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getLikedSongs();
  }, []);

  return (
    <div className="flex flex-col bg-gray-600">
      <div className="mx-32 my-16">
        <div className="flex flex-col ">
          <div className="relative flex bg-[color:var(--gradient-gray)] p-20">
            <div className="absolute w-full h-full left-0 top-0"></div>
            <img
              className="w-[25rem] h-[25rem] shadow-[0_4px_60px_rgb(0_0_0_/_50%)]"
              src="https://www.njoyvision.com/content/uploads/2023/02/nJoy-Vision-OKC-LASIK-Love-LASIK-Playlist-Blog-Feature-Image.jpg"
              alt="like songs"
            />
            <div className="self-end ml-8">
              <p className="text-[1.4rem] uppercase m-0 ">Playlist</p>
              <h1 className="text-9xl m-0">Liked Songs</h1>
              <span className="text-[1.4rem]">By {user && user.name}</span>
            </div>
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
            {isFetching ? (
              <div className="flex items-center justify-center mx-0 my-12">
                <CircularProgress style={{ color: "#1ed760" }} size="5rem" />
              </div>
            ) : (
              <Fragment>
                {songs.map((song) => (
                  <Fragment key={song._id}>
                    {user.likedSongs.indexOf(song._id) !== -1 && (
                      <Song song={song} />
                    )}
                  </Fragment>
                ))}
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikedSongs;
