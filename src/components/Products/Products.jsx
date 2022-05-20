import React from "react";
import "./Products.css";
import { useSelector } from "react-redux";

// images
import DownArrow from "../../utils/images/down-arrow.svg";

//Components
import ProductCard from "./ProductCard/ProductCard";

const Products = () => {
  const products = useSelector((state) => state.product.products);
  return (
    <>
      <div id="productsDiv">
        <div id="downTags">
          <div className="downtag">
            Add-Ons <img className="arrow" src={DownArrow} alt="#downArrow" />
          </div>
          <div className="downtag">
            Bundles <img className="arrow" src={DownArrow} alt="#downArrow" />
          </div>
          <div className="downtag">
            Character <img className="arrow" src={DownArrow} alt="#downArrow" />
          </div>
          <div className="downtag">
            Collar <img className="arrow" src={DownArrow} alt="#downArrow" />
          </div>
          <div className="downtag">
            Fabric <img className="arrow" src={DownArrow} alt="#downArrow" />
          </div>
          <div id="selectDiv">
            <select className="select">
              <option hidden selected>
                Sort By : <span className="span">Recommended</span>
              </option>
              <option className="option">Better Discount</option>
              <option className="option">Price : Low To High</option>
              <option className="option">Price : High To Low</option>
              <option className="option">Customer Rating</option>
            </select>
          </div>
        </div>
        <div id="productSection">
          {products.map((product) => {
            return <ProductCard product={product} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Products;
