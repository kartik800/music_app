import { useState, useEffect } from "react";
import Textfield from "../component/Inputs/Textfield";
import Button from "./Button";
import axiosInstance from "../redux/axiosInstance";
import { toast } from "react-toastify";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// import defaultImg from "../../images/music.png";
// import ReactDOM from "react-dom";

const PlaylistModel = ({ closeModel, playlist }) => {
  const [data, setData] = useState({
    name: "",
    desc: "",
    img: "",
  });
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setData({ name: playlist.name, desc: playlist.desc, img: playlist.img });
  }, [playlist]);

  const handleInputState = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsFetching(true);
      const url =
        process.env.REACT_APP_API_URL + `/playlists/edit/${playlist._id}`;
      const { data: res } = await axiosInstance.put(url, data);
      toast.success(res.message);
      setIsFetching(false);
      window.location.reload();
    } catch (error) {
      setIsFetching(false);
      console.log(error);
    }
  };

  return (
    <div className="w-[40rem] min-h-[25rem] bg-[color:var(--light-black)] fixed top-[calc(50%_-_20rem)] left-[calc(50%_-_20rem)] rounded-2xl bg-gray-400 z-[1000]">
      <IconButton className="absolute right-[0%] top-[0%]" onClick={closeModel}>
        <CloseIcon />
      </IconButton>
      <div>
        <h1 className="text-[1.8rem] font-medium mb-0 m-8">Edit Details</h1>
        <div className="px-4 py-2">
          <Textfield
            label="Name"
            name="name"
            value={data.name}
            handleInputState={handleInputState}
          />
        </div>
        <div className="px-4 py-2">
          <Textfield
            label="Description"
            name="desc"
            value={data.desc}
            handleInputState={handleInputState}
          />
        </div>
        <div className="px-4 py-2">
          Image leni hai
          {/* <FileInput
            label="Choose Image"
            type="image"
            name="img"
            value={
              data.img === ""
                ? "https://www.shutterstock.com/image-photo/dancing-modern-wireless-headphones-asian-260nw-1744996331.jpg"
                : data.img
            }
            handleInputState={handleInputState}
          /> */}
        </div>
        <Button
          label="Submit"
          onClick={handleSubmit}
          isFetching={isFetching}
          style={{
            position: "absolute",
            bottom: "0",
            right: "0",
            margin: "1rem",
          }}
        />
      </div>
    </div>
  );
};

export default PlaylistModel;
