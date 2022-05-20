import { configureStore } from "@reduxjs/toolkit";

// Reducers
import productReducer from "./productSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
  },
});
