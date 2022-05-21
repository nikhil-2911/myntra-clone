import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  console.log(product);
  return (
    <div id="productCard">
      <img className="profilePhoto" src={product.images[0].src} alt="#photo" />
      <div id="productDetails">
        <p className="brandText">{product.brand}</p>
        <p className="infoText">{product.additionalInfo}</p>
        <span className="productPrice">{`Rs. ${product.price}`}</span>
        <span className="productMrp">
          <s>{`Rs. ${product.mrp}`}</s>
        </span>
        <span className="productDiscount">{`${product.discountDisplayLabel}`}</span>
      </div>
    </div>
  );
};

export default ProductCard;
