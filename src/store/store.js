import { configureStore } from "@reduxjs/toolkit";

// Reducers
import filterReducer from "./filterSlice";

export const store = configureStore({
  reducer: {
    product: filterReducer,
  },
});
