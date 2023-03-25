import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPlayList } from "../redux/playListSlice/apiCalls";
import { setCurrentSong } from "../redux/audioPlayer";
import { logout } from "../redux/authSlice";
// import { CircularProgress } from "@mui/material";
import { HeartIcon, RssIcon } from "@heroicons/react/outline";
import { CircularProgress } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";

const Sidebar = () => {
  const { playlists, getPlayListProgress, createPlayListProgress } =
    useSelector((state) => state.playlists);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const handleClick = () => {
    const data = {
      name: "My Playlist #" + (playlists.length + 1),
      user: user._id,
      desc: "by" + user.name,
      songs: [],
      img: "",
    };

    createPlayList(data, dispatch);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setCurrentSong(null));
    window.location = "/login";
  };

  return (
    <div className="fixed w-15 h-screen flex flex-col z-[100] left-0 top-0">
      <div className="">
        <div className="flex flex-col bg-gray-700 w-12 items-center rounded-3xl mx-10 my-10">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? "text-white" : "text-white"
            }
          >
            <HomeIcon className="h-5 w-5 text-yellow m-3 ml-4 mr-4" />
          </NavLink>

          <NavLink
            to="/search"
            className={({ isActive }) =>
              isActive ? "text-white" : "text-white"
            }
          >
            <SearchIcon className="h-5 w-5 text-white m-3 ml-4 mr-4" />
          </NavLink>

          <NavLink
            to="/collection/playlists"
            className={({ isActive }) =>
              isActive
                ? "text-[color:var(--white)] flex items-center space-x-2"
                : "flex items-center space-x-2 hover:text-white text-white"
            }
          >
            <LibraryMusicIcon className="h-5 w-5 text-white m-3 ml-4 mr-4" />
          </NavLink>

          <button className="flex items-center space-x-2 hover:text-white text-white">
            <RssIcon className="h-5 w-5 text-white m-3 ml-4 mr-4" />
          </button>
        </div>

        <div className="flex flex-col bg-gray-700 w-12 items-center rounded-3xl mx-10 my-6">
          <button
            onClick={handleClick}
            className="flex items-center space-x-2 hover:text-white text-white"
          >
            <AddIcon className="h-5 w-5 text-white m-3 ml-4 mr-4" />
          </button>

          <NavLink
            to="/collection/tracks"
            className={({ isActive }) =>
              isActive
                ? "text-[color:var(--white)] flex items-center space-x-2"
                : "flex items-center space-x-2 hover:text-white text-white"
            }
          >
            <HeartIcon className="h-5 w-5 text-white m-3 ml-4 mr-4" />
          </NavLink>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 hover:text-white text-white"
          >
            <LogoutIcon className="h-5 w-5 text-white m-3 ml-4 mr-4" />
          </button>

          <hr className="border-t-[0.1px] border-gray-900" />
        </div>
        {/* <div className="flex flex-col items-center space-x-2 hover:text-white text-white">
          {getPlayListProgress || createPlayListProgress ? (
            <div className="flex items-center justify-center h-40">
              <CircularProgress style={{ color: "#1ed760" }} size="3rem" />
            </div>
          ) : (
            <div className="space-y-4">
              {playlists.map((playlist) => (
                <NavLink
                  key={playlist._id}
                  to={`/playlist/${playlist._id}`}
                  className={({ isActive }) =>
                    isActive
                      ? "text-[color:var(--white)] flex items-center space-x-2"
                      : "flex items-center space-x-2 text-white hover:text-white text-white"
                  }
                >
                  {playlist.name}
                </NavLink>
              ))}
            </div>
          )}
        </div> */}

        {/* playlist */}
      </div>
    </div>
  );
};

export default Sidebar;
