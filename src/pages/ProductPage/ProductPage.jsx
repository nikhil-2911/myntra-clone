import React, { useState, useEffect } from "react";
import "./ProductPage.css";
import { useSelector } from "react-redux";

// Component
import Layout from "../../components/Layout/Layout";
import ProductImage from "../../components/ProductView/ProductImage/ProductImage";
import ProductContent from "../../components/ProductView/ProductContent/ProductContent";

const ProductPage = () => {
  const product = useSelector((state) => state.product.selectedProduct);
  return (
    <Layout>
      <p className="headText">
        Home / Clothing /{" "}
        <span className="spanText">
          Shirts for Men & Women / {product.brand} {"> "}
          {product.additionalInfo}
        </span>
      </p>
      <div id="mainDiv">
        <ProductImage images={product.images} />
        <ProductContent product={product} />
      </div>
    </Layout>
  );
};

export default ProductPage;
