import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md sticky top-0 bg-white z-10">
      <div className="logo mr-auto md:mx-5">logo</div>
      <div className="nav">
        <ul className="flex items-center space-x-4 font-bold md:text-md">
          <Link to="/">
            <li className="hover:text-blue-700">Home</li>
          </Link>
          <Link to="/about">
            <li className="hover:text-blue-700">About</li>
          </Link>
          <Link to="/signup">
            <li className="absolute top-2 right-4 hover:text-blue-700">
              Signup
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
