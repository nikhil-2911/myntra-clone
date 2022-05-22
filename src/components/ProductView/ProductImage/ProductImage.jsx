import React from "react";
import "./ProductImage.css";

const ProductImage = ({ images }) => {
  return (
    <div id="productImage">
      {images.map((image) => {
        if (
          image.view === "right" ||
          image.view === "front" ||
          image.view === "left" ||
          image.view === "back"
        ) {
          return <img className="product-image" src={image.src} alt="img" />;
        }
      })}
    </div>
  );
};

export default ProductImage;
