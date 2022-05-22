import React from "react";
import "./ProductImage.css";
import ImageZoom from "react-image-zooom";

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
          return (
            <div className="product-image">
              <ImageZoom src={image.src} alt="img" zoom="300" />
            </div>
          );
        }
      })}
    </div>
  );
};

export default ProductImage;
