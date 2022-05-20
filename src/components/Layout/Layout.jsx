import React from "react";
import "./Layout.css";

// Components
import Navbar from "../Navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <section id="section">{children}</section>
    </>
  );
};

export default Layout;
