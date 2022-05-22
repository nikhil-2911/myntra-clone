import React, { useState, useEffect } from "react";
import "./ProductContent.css";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../../store/cartSlice";
import { addProduct as addWishlist } from "../../../store/wishlistSlice";
import { useNavigate } from "react-router-dom";

// images
import bagIcon from "../../../utils/images/add-cart.png";
import checkoutIcon from "../../../utils/images/checkout-arrow.png";

const ProductContent = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.wishlist.items);
  const [size, setSize] = useState("");
  const [wishlisted, setWishlisted] = useState(false);
  const [valid, setValid] = useState(true);
  const [show, setShow] = useState(false);
  const handleBagClick = (e) => {
    e.preventDefault();
    if (size === "") {
      setValid(false);
    } else {
      setValid(true);
      setShow(true);
      const obj = { ...product, qty: 1, size: size };
      dispatch(addProduct(obj));
      // console.log(obj);
      toast.success("Added To Bag", {
        position: "top-right",
      });
    }
  };
  const handleCheckoutClick = (e) => {
    e.preventDefault();
    navigate("/cart");
  };
  const handleWishlistClick = (e) => {
    e.preventDefault();
    dispatch(addWishlist(product));
    setWishlisted(true);
  };
  useEffect(() => {
    if (state.length !== 0) {
      state.map((item) => {
        if (item.productId === product.productId) {
          setWishlisted(true);
        }
      });
    }
  }, []);
  return (
    <div id="product-content">
      <div id="productHeading">
        <p className="brand-name">{product.brand}</p>
        <p className="additional-info">
          {product.productName.substring(product.brand.length)}
        </p>
      </div>
      <div id="productRates">
        <span className="product-price">Rs. {product.price}</span>
        <span className="product-mrp">
          <s>Rs. {product.mrp}</s>
        </span>
        <span className="product-discount">{product.discountDisplayLabel}</span>
        <p className="product-tax">inclusive of all taxes</p>
      </div>
      <div id="productSizes">
        <p className="select-size">SELECT SIZE</p>
        {valid === false ? (
          <p className="show-error">Please select a size</p>
        ) : (
          ""
        )}
        <div id="size-div">
          {product.sizes.split(",").map((size) => {
            return (
              <button onClick={(e) => setSize(size)} className="size-button">
                {size}
              </button>
            );
          })}
        </div>
      </div>
      <div id="tagDiv">
        <button
          onClick={(e) => {
            show ? handleCheckoutClick(e) : handleBagClick(e);
          }}
          className="bag-button"
        >
          {show ? (
            <>
              <img className="bag-icon" src={checkoutIcon} alt="bag" />
              GO TO BAG
            </>
          ) : (
            <>
              <img className="bag-icon" src={bagIcon} alt="bag" />
              ADD TO BAG
            </>
          )}
        </button>
        {wishlisted ? (
          <button className="wishlist-button2">WISHLISTED</button>
        ) : (
          <button
            onClick={(e) => handleWishlistClick(e)}
            className="wishlist-button"
          >
            WISHLIST
          </button>
        )}
      </div>
      <div id="orderDetais">
        <p className="order-details-head">ORDER DETAILS</p>
        <p className="order-details">100% Original Products</p>
        <p className="order-details">Pay on delivery might be available</p>
        <p className="order-details">Easy 30 days returns and exchanges</p>
        <p className="order-details">Try & Buy might be available</p>
      </div>
    </div>
  );
};

export default ProductContent;
