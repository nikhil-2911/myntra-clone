import React from "react";
import "./HomePage.css";

// Component
import Layout from "../../components/Layout/Layout";
import Filter from "../../components/Filter/Filter";
import Products from "../../components/Products/Products";

const HomPage = () => {
  return (
    <Layout>
      <p className="headText">
        Home / Clothing /{" "}
        <span className="spanText">Shirts for Men & Women</span>
      </p>
      <p className="headText">
        Shirts for Men & Women - <span className="resultText">37289 items</span>
      </p>
      <div id="mainDiv">
        <Filter />
        <Products />
      </div>
    </Layout>
  );
};

export default HomPage;
