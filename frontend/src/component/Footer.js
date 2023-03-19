import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <Link to="/">logo</Link>
            {/* <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                <Image src="/logo.png" alt="" width={200} height={40}></Image>
              </a> */}
            <p className="mt-2 text-sm text-gray-500 px-4"></p>
            Music App
            <p className="text-sm text-gray-500 px-4">
              Listen your fav music....
            </p>
          </div>
          <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                Categories
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <Link to="/">Hip Hop</Link>
                </li>
                <li>
                  <Link to="/">Rock</Link>
                </li>
                <li>
                  <Link to="/">Ryhtem</Link>
                </li>
                <li>
                  <Link to="/">Reggae</Link>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                Artist
              </h2>
              <nav className="list-none mb-10">
                <li className="text-gray-600 hover:text-gray-800">
                  Arjit Singh
                </li>

                <li className="text-gray-600 hover:text-gray-800">syx</li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                Policy
              </h2>
              <nav className="list-none mb-10">
                <li className="text-gray-600 hover:text-gray-800">
                  Company Policy
                </li>
                <li className="text-gray-600 hover:text-gray-800">
                  Company Policy
                </li>
                <li className="text-gray-600 hover:text-gray-800">
                  Company Policy
                </li>
              </nav>
            </div>
          </div>
        </div>
        <div className="bg-gray-100">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © 2023 musicapp.com — All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
