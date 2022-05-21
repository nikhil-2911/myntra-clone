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
};

const filterSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    filterProducts: (state, action) => {
      console.log(action.payload);
      if (action.payload === "Men") {
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
  },
});
export const { filterProducts } = filterSlice.actions;
export default filterSlice.reducer;
