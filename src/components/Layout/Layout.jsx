import React from "react";

// Components
import Navbar from "../Navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <section>{children}</section>
    </>
  );
};

export default Layout;
