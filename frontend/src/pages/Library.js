import { useState } from "react";
import { useSelector } from "react-redux";
import Playlist from "../component/Playlist";
import { useNavigate } from "react-router-dom";

const Library = () => {
  const Navigate = useNavigate();
  const { playlists } = useSelector((state) => state.playlists);
  // const { user } = useSelector((state) => state.user);
  const [myCollection, setMyCollection] = useState(true);
  const [likedVideos, setLikedVideos] = useState(false);
  return (
    <>
      <div className="flex flex-col bg-gray-600">
        <div className=" mx-32 my-16">
          <div className="flex mx-32 my-16">
            <button
              className="rounded-2xl bg-gray-400 px-4 py-2 "
              onClick={() => setMyCollection(!myCollection)}
            >
              My collection
            </button>
            <button
              className="rounded-2xl bg-gray-400 px-4 py-2 mx-10"
              onClick={() => setLikedVideos(!likedVideos)}
            >
              Liked Videos
            </button>
          </div>
          <div className="flex flex-wrap justify-evenly">
            {!likedVideos && myCollection && <Playlist playlists={playlists} />}
          </div>
          {likedVideos && Navigate("/collection/tracks")}
          {/* {user.likedSongs.length} */}
        </div>
      </div>
    </>
  );
};

export default Library;
