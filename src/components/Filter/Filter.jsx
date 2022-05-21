import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterProducts,
  addBrandValue,
  removeBrandValue,
  addPriceValue,
  removePriceValue,
  addColorValue,
  removeColorValue,
  addFilters,
  clearFilters,
} from "../../store/filterSlice";
import "./Filter.css";

const Filter = () => {
  const dispatch = useDispatch();
  const filterState = useSelector((state) => state.product.filterQuery);
  const brandFilters = useSelector((state) => {
    return state.product.filters.filter((brand) => brand.id === "Brand");
  });
  const priceFilters = useSelector((state) => {
    return state.product.filters.filter((price) => price.id === "Price");
  });
  const colorFilters = useSelector((state) => {
    return state.product.filters.filter((color) => color.id === "Color");
  });
  const discountFilters = useSelector((state) => {
    return state.product.filters.filter(
      (discount) => discount.id === "Discount Range"
    );
  });
  const [value, setValue] = useState("");
  const handleValue = (e) => {
    e.preventDefault();
    dispatch(filterProducts(e.target.value));
    setValue(e.target.value);
  };

  const clearAllFilters = (e) => {
    e.preventDefault();
    dispatch(clearFilters());
    window.location.reload();
  };

  useEffect(() => {
    dispatch(addFilters());
  }, [filterState]);

  return (
    <div id="filterDiv">
      <div id="filterHead">
        <p className="filterText">FILTERS</p>
        <button onClick={(e) => clearAllFilters(e)} className="filterBtn">
          CLEAR ALL
        </button>
      </div>
      <div id="filter">
        <div id="genderFilters">
          <div className="radio-select">
            <input
              id="men"
              name="gender"
              type="radio"
              onClick={(e) => handleValue(e)}
              value="Men"
            />
            <label className="genderLabel" htmlFor="men">
              Men
            </label>
          </div>
          <div className="radio-select">
            <input
              id="women"
              name="gender"
              type="radio"
              onClick={(e) => handleValue(e)}
              value="Women"
            />
            <label className="genderLabel" htmlFor="women">
              Women
            </label>
          </div>
        </div>
        <div id="brandFilters">
          <p className="filterHead">BRAND</p>
          {brandFilters &&
            brandFilters[0].filterValues.slice(0, 7).map((brand, idx) => {
              return (
                <div className="filterRow" key={idx}>
                  <input
                    name={brand.value}
                    id={brand.id}
                    type="checkbox"
                    value={brand.value}
                    onClick={(e) => {
                      if (e.target.checked) {
                        dispatch(addBrandValue(brand.value));
                      } else {
                        dispatch(removeBrandValue(brand.value));
                      }
                    }}
                  />
                  <label className="brandName" htmlFor={brand.value}>
                    {brand.value}
                  </label>
                  <span className="brandValue">({brand.count})</span>
                </div>
              );
            })}
          <p className="moreText">+375 more</p>
        </div>
        <div id="priceFilters">
          <p className="filterHead">Price</p>
          {priceFilters &&
            priceFilters[0].filterValues.map((price, idx) => {
              return (
                <div className="filterRow" key={idx}>
                  <input
                    type="checkbox"
                    name={price.start}
                    id={price.start}
                    value={price.start}
                    onClick={(e) => {
                      const obj = {
                        start: price.start,
                        end: price.end,
                      };
                      if (e.target.checked) {
                        dispatch(addPriceValue(obj));
                      } else {
                        dispatch(removePriceValue(obj));
                      }
                    }}
                  />
                  <label className="priceName" htmlFor={price.start}>
                    Rs. {price.start} to Rs. {price.end}
                  </label>
                  <span className="priceValue">({price.count})</span>
                </div>
              );
            })}
        </div>
        <div id="colorFilters">
          <p className="filterHead">Color</p>
          {colorFilters &&
            colorFilters[0].filterValues.slice(0, 7).map((color, idx) => {
              return (
                <div className="filterRow" key={idx}>
                  <input
                    name={color.value}
                    id={color.value}
                    type="checkbox"
                    value={color.value}
                    onClick={(e) => {
                      if (e.target.checked) {
                        dispatch(addColorValue(color.value));
                      } else {
                        dispatch(removeColorValue(color.value));
                      }
                    }}
                  />
                  <span
                    style={{
                      width: "15px",
                      height: "15px",
                      marginLeft: "3px",
                      borderRadius: "50%",
                      backgroundColor: `#${color.meta}`,
                    }}
                  ></span>
                  <label className="colorName" htmlFor={color.value}>
                    {color.value}
                  </label>
                  <span className="brandValue">({color.count})</span>
                </div>
              );
            })}
          <p className="moreText">+37 more</p>
        </div>
        <div id="discountFilters">
          <p className="filterHead">Discount</p>
          {discountFilters &&
            discountFilters[0].filterValues.map((discount, idx) => {
              return (
                <div className="filterRow" key={idx}>
                  <input
                    type="checkbox"
                    name={discount.start}
                    id={discount.start}
                    value={discount.start}
                    checked=""
                  />
                  <label className="discountName" htmlFor={discount.start}>
                    {discount.start}% and above
                  </label>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Filter;
