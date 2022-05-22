import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Images
import Logo from "../../utils/images/logo.jpg";
import ProfileIcon from "../../utils/images/profile-icon.svg";
import HeartIcon from "../../utils/images/heart-icon.svg";
import BagIcon from "../../utils/images/bag-icon.svg";
import SearchIcon from "../../utils/images/icon-search.svg";
import { searchByInput, filterProducts } from "../../store/filterSlice";

const Navbar = ({ show }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cart.items);
  const wishlistState = useSelector((state) => state.wishlist.items);
  const [search, setSearch] = useState("");
  const onChangeHandler = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  useEffect(() => {
    dispatch(searchByInput(search));
  }, [search]);
  return (
    <nav id="navbar">
      <div className="logoDiv">
        <img
          onClick={(e) => navigate("/")}
          className="logo"
          src={Logo}
          alt="#logo"
        />
      </div>
      {show === false ? (
        ""
      ) : (
        <>
          <div id="tabs">
            <div
              onClick={(e) => dispatch(filterProducts("Men"))}
              className="tab"
            >
              <a className="tag" href="/">
                MEN
              </a>
            </div>
            <div
              onClick={(e) => dispatch(filterProducts("Women"))}
              className="tab"
            >
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
              value={search}
              onChange={(e) => onChangeHandler(e)}
            />
          </div>
          <div id="features">
            <div className="featureDiv">
              <img
                className="featureSvg"
                src={ProfileIcon}
                alt="#profileIcon"
              />
              <p className="featureText">Profile</p>
            </div>
            <div
              onClick={(e) => navigate("/wishlist")}
              className="featureBagDiv"
            >
              <img className="featureSvg" src={HeartIcon} alt="#heartIcon" />
              {wishlistState.length > 0 && (
                <p className="bagValue">{wishlistState.length}</p>
              )}
              <p className="featureText">Wishlist</p>
            </div>
            <div onClick={(e) => navigate("/cart")} className="featureBagDiv">
              <img className="featureSvg" src={BagIcon} alt="#bagIcon" />
              {state.length > 0 && <p className="bagValue">{state.length}</p>}
              <p className="featureText">Bag</p>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
