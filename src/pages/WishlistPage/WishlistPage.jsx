import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./WishlistPage.css";

// Component
import Navbar from "../../components/Navbar/Navbar";
import WishlistCard from "../../components/WishlistCard/WishlistCard";

const WishlistPage = () => {
  const products = useSelector((state) => state.wishlist.items);
  return (
    <>
      <Navbar />
      {products.length === 0 ? (
        <div id="vaccantBag">
          <p className="vaccantPara1">YOUR WISHLIST IS EMPTY</p>
          <p className="vaccantPara2">
            Add items that you like to your wishlist. Review them anytime and
            easily move them to the bag.
          </p>
          <img
            className="vaccantBagImage"
            src="https://constant.myntassets.com/checkout/assets/img/empty-bag.webp"
            alt="vaccantBag"
          />
          <p className="vaccantPara3">
            <a href="/" style={{ textDecoration: "none", color: "inherit" }}>
              CONTINUE SHOPPING
            </a>
          </p>
        </div>
      ) : (
        <div id="wishlistSection">
          <p className="wishlistHead">
            My Wishlist:{"  "}
            <span style={{ fontSize: "16px", fontWeight: "400" }}>
              {products.length} items
            </span>
          </p>
          <div id="wishlistDiv">
            {products.map((product) => {
              return <WishlistCard product={product} />;
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default WishlistPage;
