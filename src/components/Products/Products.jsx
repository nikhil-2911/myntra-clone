import React, { useState } from "react";
import "./Products.css";
import {
  sortByCustomerRating,
  sortByDecreasingOrder,
  sortByDiscount,
  sortByIncreasingOrder,
  addSortValue,
} from "../../store/filterSlice";
import { useSelector, useDispatch } from "react-redux";

// images
import DownArrow from "../../utils/images/down-arrow.svg";

//Components
import ProductCard from "./ProductCard/ProductCard";

const Products = () => {
  const dispatch = useDispatch();
  const [sortValue, setSortValue] = useState("");
  const products = useSelector((state) => state.product.products);

  const handleSelect = (e) => {
    e.preventDefault();
    setSortValue(e.target.value);
    switch (e.target.value) {
      case "discount":
        dispatch(addSortValue("discount"));
        dispatch(sortByDiscount());
        break;
      case "Customer Rating":
        dispatch(addSortValue("Customer Rating"));
        dispatch(sortByCustomerRating());
        break;
      case "price_asc":
        dispatch(addSortValue("price_asc"));
        dispatch(sortByIncreasingOrder());
        break;
      case "price_desc":
        dispatch(addSortValue("price_desc"));
        dispatch(sortByDecreasingOrder());
        break;
      default:
        break;
    }
  };
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
            <select onChange={(e) => handleSelect(e)} className="select">
              <option hidden selected>
                Sort By : <span className="span">Recommended</span>
              </option>
              <option value="discount" className="option">
                Better Discount
              </option>
              <option value="price_asc" className="option">
                Price : Low To High
              </option>
              <option value="price_desc" className="option">
                Price : High To Low
              </option>
              <option value="Customer Rating" className="option">
                Customer Rating
              </option>
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
