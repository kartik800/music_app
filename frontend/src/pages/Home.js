import React from "react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

const Home = () => {
  return (
    <>
      <div>
        <Navbar></Navbar>
      </div>
      <div>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                Music App
              </h1>
              <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
                Listen Your Fav Music........
              </p>
            </div>
            <p className="font-bold text-xl mb-5">All Time favorite</p>
            <div className="flex flex-wrap -m-4">
              <div className="xl:w-1/2 md:w-1/2 p-4">
                <div className=" p-6 ">
                  <div className="inline-flex items-center justify-center bg-indigo-100 text-indigo-500 mb-4">
                    <img
                      className="w-30 h-30"
                      src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Arijit_Singh_at_the_concert.jpg"
                      alt="arijit"
                    />
                  </div>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                    Arijit Singh
                  </h2>
                  <p className="leading-relaxed text-base">
                    Best Singer All time favorite
                  </p>
                </div>
              </div>
              <div className="xl:w-1/2 md:w-1/2 p-4">
                <div className=" p-6 ">
                  <div className="inline-flex items-center justify-center bg-indigo-100 text-indigo-500 mb-4">
                    <img
                      className="w-30 h-30"
                      src="https://upload.wikimedia.org/wikipedia/commons/f/f3/Shreya_at_concert.jpg"
                      alt="shreya"
                    />
                  </div>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                    Shreya Ghoshal
                  </h2>
                  <p className="leading-relaxed text-base">
                    Best Singer All time favorite
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div>
        {" "}
        <Footer />
      </div>
    </>
  );
};

export default Home;
