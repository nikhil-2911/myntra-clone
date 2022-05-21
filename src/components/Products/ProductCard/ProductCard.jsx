import React, { useState } from "react";
import "./ProductCard.css";

// images
import HeartIcon from "../../../utils/images/heart-icon.svg";
import RedHeartIcon from "../../../utils/images/heart-icon-filled.svg";

const ProductCard = ({ product }) => {
  const [image, setImage] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  // console.log(product);
  return (
    <div
      id="productCard"
      onMouseEnter={() => setShowWishlist(true)}
      onMouseLeave={() => setShowWishlist(false)}
    >
      <img className="profilePhoto" src={product.images[0].src} alt="#photo" />
      <div id="productDetails">
        {showWishlist ? (
          <div id="productHover">
            <div className="wishlist">
              <img
                onClick={() => setImage(!image)}
                className="heartIcon"
                src={image ? RedHeartIcon : HeartIcon}
                alt="#icon"
              />
              <p className="wishlistText">WISHLIST</p>
            </div>
            <p className="sizesRow">
              Size -
              <span className="sizeSpan">
                {product.sizes.split(",").splice(0, 6).join(", ")}
              </span>
            </p>
          </div>
        ) : (
          <div className="brandInfoDiv">
            <p className="brandText">{product.brand}</p>
            <p className="infoText">{product.additionalInfo}</p>
          </div>
        )}
        <div className="discountDiv">
          <span className="productPrice">{`Rs. ${product.price}`}</span>
          <span className="productMrp">
            <s>{`Rs. ${product.mrp}`}</s>
          </span>
          <span className="productDiscount">{`${product.discountDisplayLabel}`}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
