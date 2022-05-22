import React, { useState } from "react";
import "./ProductContent.css";

// images
import bagIcon from "../../../utils/images/add-cart.png";
import checkoutIcon from "../../../utils/images/checkout-arrow.png";

const ProductContent = ({ product }) => {
  const [size, setSize] = useState("");
  const [valid, setValid] = useState(true);
  const [show, setShow] = useState(false);
  const handleBagClick = (e) => {
    e.preventDefault();
    if (size === "") {
      setValid(false);
    } else {
      setValid(true);
      setShow(true);
    }
  };
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
        <button onClick={(e) => handleBagClick(e)} className="bag-button">
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
