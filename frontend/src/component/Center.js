import React, { useState, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { shuffle } from "lodash";
import Songs from "./Songs";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

const Center = () => {
  const [color, setColor] = useState(null);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, []);
  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 text-white">
          <img
            className="rounded-full w-10 h-10"
            src={
              "https://www.befunky.com/images/wp/wp-2020-12-header-1.jpg?auto=avif,webp&format=jpg&width=1200&crop=16:9"
            }
            alt=""
          />
          {/* <h2>{session?.user.name}</h2> */}
          <h2>Kartik Kumar</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        <img
          className="h-44 w-44 shadow-2xl"
          src={
            "https://www.befunky.com/images/wp/wp-2020-12-header-1.jpg?auto=avif,webp&format=jpg&width=1200&crop=16:9"
          }
          alt=""
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            Music Coder
          </h1>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  );
};

export default Center;
