import { Fragment, useState } from "react";
import axiosInstance from "../redux/axiosInstance";
import Song from "../component/Song";
import Playlist from "../component/Playlist";
import { IconButton, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const Search = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState({});
  const [isFetching, setIsFetching] = useState(false);

  const handleSearch = async ({ currentTarget: input }) => {
    setSearch(input.value);
    setResults({});
    try {
      setIsFetching(true);
      const url = process.env.REACT_APP_API_URL + `/?search=${input.value}`;
      const { data } = await axiosInstance.get(url);
      setResults(data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };

  console.log(results.songs);

  return (
    <div className="flex flex-col bg-gray-600">
      <div className=" mx-32 my-16">
        <div className="flex flex-col relative min-h-[80vh] px-0 py-8 mx-20">
          <div className="w-[60rem] self-center flex items-center justify-between z-[2] p-4 rounded-[3rem]">
            <IconButton className=" w-10 h-10">
              <SearchIcon className=" w-10 h-10" />
            </IconButton>
            <input
              className="grow text-[1.6rem] border-[none] outline-none bg-transparent"
              type="text"
              placeholder="Search for songs and playlists"
              onChange={handleSearch}
              value={search}
            />
            <IconButton className=" w-10 h-10" onClick={() => setSearch("")}>
              <ClearIcon className=" w-10 h-10;" />
            </IconButton>
          </div>
          {isFetching && (
            <div className="flex items-center justify-center absolute h-[80vh] w-full z-[1]">
              <CircularProgress style={{ color: "#1ed760" }} size="5rem" />
            </div>
          )}

          {Object.keys(results).length !== 0 && (
            <div className="flex z-[2] m-8">
              {results.songs.length !== 0 && (
                <div className="flex-[2]">
                  {results.songs.map((song) => (
                    <Fragment key={song._id}>
                      <Song song={song} />
                    </Fragment>
                  ))}
                </div>
              )}
              {results.playlists.length !== 0 && (
                <div className="flex flex-wrap flex-[2] justify-evenly">
                  <Playlist playlists={results.playlists} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
