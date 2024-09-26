import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <Sidebar />
      <Navbar />
      {children}
      {/* <footer>copyright @ roles and profile</footer> */}
    </div>
  );
};

export default Layout;
