import React from "react";
import Navbar from "@/components/Navbar";

const AppContainer = ({ children }) => {
  return (
    <div className="flex flex-col gap-5">
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default AppContainer;
