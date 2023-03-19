import React from "react";
import { millisToMinutesAndSeconds } from "../lib/time";

const Song = () => {
  return (
    <div className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer">
      <div className="flex items-center space-x-4 ">
        <p>{1}</p>
        <img className="h-10 w-10" src={""} alt="" />
        <div>
          <p className="w-36 lg:w-64 text-white truncate">{"Kartik"}</p>
          <p className="w-40">{"kartik Kumar"}</p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-40 hidden md:inline">{"coder music"}</p>
        <p>{millisToMinutesAndSeconds(1000)}</p>
      </div>
    </div>
  );
};

export default Song;
