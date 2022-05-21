import { createSlice } from "@reduxjs/toolkit";
import MenData from "../utils/data/men.json";
import WomenData from "../utils/data/women.json";

const initialState = {
  products: [...MenData.products],
  filters: [
    ...MenData.filters.primaryFilters.filter((category) => {
      return (
        category.id === "Color" ||
        category.id === "Brand" ||
        category.id === "Gender"
      );
    }),
    ...MenData.filters.rangeFilters.filter((category) => {
      return category.id === "Price" || category.id === "Discount Range";
    }),
  ],
  filterQuery: {
    brand: [],
    price: [],
    color: [],
  },
  men: true,
  women: false,
};

const filterSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearFilters: (state, action) => {
      state.filterQuery.brand = [];
      state.filterQuery.price = [];
      state.filterQuery.color = [];
    },
    addFilters: (state, action) => {
      const lower =
        state.filterQuery.price.length === 0
          ? 0
          : state.filterQuery.price
              .map((value) => value.start)
              .sort((a, b) => a - b)[0];
      const upper =
        state.filterQuery.price.length === 0
          ? Number.MAX_SAFE_INTEGER
          : state.filterQuery.price
              .map((value) => value.end)
              .sort((a, b) => b - a)[0];
      let filteredProducts;
      if (state.men) {
        filteredProducts = [...MenData.products];
      } else if (state.women) {
        filteredProducts = [...WomenData.products];
      }
      filteredProducts = filteredProducts.filter((product) => {
        return (
          (state.filterQuery.brand.includes(product.brand) ||
            state.filterQuery.brand.length === 0) &&
          (state.filterQuery.color.includes(product.primaryColour) ||
            state.filterQuery.color.length === 0) &&
          product.price >= lower &&
          product.price <= upper
        );
      });
      state.products = filteredProducts;
    },
    filterProducts: (state, action) => {
      if (action.payload === "Men") {
        state.men = true;
        state.women = false;
        state.products = [...MenData.products];
        state.filters = [
          ...MenData.filters.primaryFilters.filter((category) => {
            return (
              category.id === "Color" ||
              category.id === "Brand" ||
              category.id === "Gender"
            );
          }),
          ...MenData.filters.rangeFilters.filter((category) => {
            return category.id === "Price" || category.id === "Discount Range";
          }),
        ];
      }
      if (action.payload === "Women") {
        state.women = true;
        state.men = false;
        state.products = [...WomenData.products];
        state.filters = [
          ...WomenData.filters.primaryFilters.filter((category) => {
            return (
              category.id === "Color" ||
              category.id === "Brand" ||
              category.id === "Gender"
            );
          }),
          ...WomenData.filters.rangeFilters.filter((category) => {
            return category.id === "Price" || category.id === "Discount Range";
          }),
        ];
      }
    },
    addBrandValue: (state, action) => {
      state.filterQuery.brand.push(action.payload);
    },
    removeBrandValue: (state, action) => {
      state.filterQuery.brand = state.filterQuery.brand.filter((name) => {
        return name !== action.payload;
      });
    },
    addColorValue: (state, action) => {
      state.filterQuery.color.push(action.payload);
    },
    removeColorValue: (state, action) => {
      state.filterQuery.color = state.filterQuery.color.filter((name) => {
        return name !== action.payload;
      });
    },
    addPriceValue: (state, action) => {
      state.filterQuery.price.push(action.payload);
    },
    removePriceValue: (state, action) => {
      state.filterQuery.price = state.filterQuery.price.filter((obj) => {
        return (
          obj.start !== action.payload.start && obj.end !== action.payload.end
        );
      });
    },
  },
});
export const {
  filterProducts,
  addBrandValue,
  removeBrandValue,
  addPriceValue,
  removePriceValue,
  addColorValue,
  removeColorValue,
  addFilters,
  clearFilters,
} = filterSlice.actions;
export default filterSlice.reducer;
