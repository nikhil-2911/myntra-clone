import React from "react";
import "./Navbar.css";

// Images
import Logo from "../../utils/images/logo.jpg";
import ProfileIcon from "../../utils/images/profile-icon.svg";
import HeartIcon from "../../utils/images/heart-icon.svg";
import BagIcon from "../../utils/images/bag-icon.svg";
import SearchIcon from "../../utils/images/icon-search.svg";

const Navbar = () => {
  return (
    <nav id="navbar">
      <div className="logoDiv">
        <img className="logo" src={Logo} alt="#logo" />
      </div>
      <div id="tabs">
        <div className="tab">
          <a className="tag" href="/">
            MEN
          </a>
        </div>
        <div className="tab">
          <a className="tag" href="/">
            WOMEN
          </a>
        </div>
        <div className="tab">
          <a className="tag" href="/">
            KIDS
          </a>
        </div>
        <div className="tab">
          <a className="tag" href="/">
            BEAUTY
          </a>
        </div>
      </div>
      <div id="searchDiv">
        <img className="searchIcon" src={SearchIcon} alt="#searchIcon" />
        <input
          className="searchInput"
          placeholder="Search for products, brands and more"
        />
      </div>
      <div id="features">
        <div className="featureDiv">
          <img className="featureSvg" src={ProfileIcon} alt="#profileIcon" />
          <p className="featureText">Profile</p>
        </div>
        <div className="featureDiv">
          <img className="featureSvg" src={HeartIcon} alt="#heartIcon" />
          <p className="featureText">Wishlist</p>
        </div>
        <div className="featureDiv">
          <img className="featureSvg" src={BagIcon} alt="#bagIcon" />
          <p className="featureText">Bag</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
