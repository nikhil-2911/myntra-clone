import { createSlice } from "@reduxjs/toolkit";
import MenData from "../utils/data/men.json";
import WomenData from "../utils/data/women.json";

const initialState = {
  products: [...MenData.products, ...WomenData.products],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducer: {
    add(state, action) {
      return state;
    },
  },
});

export default productSlice.reducer;
