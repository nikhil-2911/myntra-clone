import React, { useState } from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveSelectedProduct } from "../../../store/filterSlice";

// images
import HeartIcon from "../../../utils/images/heart-icon.svg";
import RedHeartIcon from "../../../utils/images/heart-icon-filled.svg";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [image, setImage] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  // console.log(product);
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(saveSelectedProduct(product));
    navigate("/product");
  };
  return (
    <div
      id="productCard"
      onMouseEnter={() => setShowWishlist(true)}
      onMouseLeave={() => setShowWishlist(false)}
    >
      <img
        onClick={(e) => handleClick(e)}
        className="profilePhoto"
        src={product.images[0].src}
        alt="#photo"
      />
      <div id="productDetails">
        {showWishlist ? (
          <div id="productHover">
            <div onClick={() => setImage(!image)} className="wishlist">
              <img
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
