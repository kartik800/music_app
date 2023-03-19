import React from "react";
import Center from "../component/Center";
import Sidebar from "../component/Sidebar";

const Main = () => {
  return (
    <>
      <div className="flex bg-black h-screen overflow-hidden">
        <Sidebar />
        <Center />
      </div>
    </>
  );
};

export default Main;
