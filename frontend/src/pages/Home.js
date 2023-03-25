import { useState, useEffect, Fragment } from "react";
import { CircularProgress } from "@mui/material";
import Playlist from "../component/Playlist";
import axiosInstance from "../redux/axiosInstance";
import { Link } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/outline";
import Search from "./Search";

const Home = () => {
  const [firstPlaylists, setFirstPlaylists] = useState([]);
  const [secondPlaylists, setSecondPlaylists] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const getRandomPlaylists = async () => {
    try {
      setIsFetching(true);
      const url = process.env.REACT_APP_API_URL + "/playlists/random";

      const { data } = await axiosInstance.get(url);
      const array1 = data.data.splice(0, 3);
      const array2 = data.data;
      setFirstPlaylists(array1);
      setSecondPlaylists(array2);
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getRandomPlaylists();
  }, []);

  return (
    <>
      <div className="flex flex-col bg-gray-800">
        {isFetching ? (
          <div className="h-[90vh] flex justify-center items-center">
            <CircularProgress style={{ color: "#1ed760" }} size="5rem" />
          </div>
        ) : (
          <div className="mx-32 my-16">
            <div className="flex flex-wrap">
              <img
                className="w-2/3 rounded-3xl"
                src="https://png.pngtree.com/thumb_back/fh260/back_our/20190621/ourmid/pngtree-campus-freshman-singer-game-psd-material-image_192142.jpg"
                alt=""
              />

              <div className="">
                <div className="text-white mx-10 ">
                  <h1 className="text-2xl">Top Charts </h1>
                </div>
                {/* <Playlist playlists={firstPlaylists} /> */}
                {firstPlaylists.map((playlist) => (
                  <Link key={playlist._id} to={`/playlist/${playlist._id}`}>
                    <div className="cursor-pointer m-2 p-2">
                      {playlist.img === "" ? (
                        <div className="flex flex-wrap bg-cyan-900 mx-10 rounded-2xl p-3">
                          <div>
                            <img
                              className="w-16 h-16 object-cover items-center rounded-md mx-1 my-1"
                              src="https://static.thenounproject.com/png/17849-200.png"
                              alt={playlist.name}
                              style={{ background: "#919496" }}
                            />
                          </div>
                          <div className="flex-col">
                            <p className="text-[1.2rem] text-white mx-2">
                              {playlist.name}
                            </p>
                            <span className="text-[1.0rem] text-white mx-2">
                              {playlist.desc}
                            </span>
                          </div>
                          {/* <div className="">
                            <HeartIcon className="h-5 w-5" />
                          </div> */}
                        </div>
                      ) : (
                        <div className="flex flex-wrap bg-cyan-900 mx-10 p-3">
                          <img
                            className="w-16 h-16 object-cover items-center rounded-md mx-1 my-1"
                            src={playlist.img}
                            alt={playlist.name}
                          />
                          <div className="flex-col">
                            <p className="text-[1.2rem] text-white mx-2">
                              {playlist.name}
                            </p>
                            <span className="text-[1.0rem] text-white mx-2">
                              {playlist.desc}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <h1 className="text-[2.4rem] font-semibold mx-6 my-4 text-white">
              New releases.
            </h1>
            <div className="flex flex-wrap max-w-full h-auto justify-evenly">
              <Playlist playlists={secondPlaylists} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
