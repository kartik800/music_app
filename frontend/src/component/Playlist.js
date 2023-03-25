import { Link } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/outline";

const Playlist = ({ playlists }) => {
  return (
    <>
      {playlists.map((playlist) => (
        <Link key={playlist._id} to={`/playlist/${playlist._id}`}>
          <div className="bg-[color:var(--mini-black)] cursor-pointer p-1">
            {playlist.img === "" ? (
              <div className="">
                <img
                  className="w-52 h-52 items-center rounded-xl object-none"
                  src="https://static.thenounproject.com/png/17849-200.png"
                  alt={playlist.name}
                  style={{ background: "#919496" }}
                />
                <div className="flex flex-col text-white">
                  <p className="text-[1.2rem]  mx-2">{playlist.name}</p>
                  <span className="text-[1.0rem] mx-2">{playlist.desc}</span>
                </div>
              </div>
            ) : (
              <div className="">
                <img
                  className="w-52 h-52 object-none items-center rounded-xl"
                  src={playlist.img}
                  alt={playlist.name}
                />
                <div className="flex flex-col text-white">
                  <p className="ttext-[1.2rem]  mx-2">{playlist.name}</p>
                  <span className="text-[1.0rem] mx-2">{playlist.desc}</span>
                </div>
              </div>
            )}
          </div>
        </Link>
      ))}
    </>
  );
};

export default Playlist;
