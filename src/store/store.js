import { configureStore } from "@reduxjs/toolkit";

// Reducers
import filterReducer from "./filterSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    product: filterReducer,
    cart: cartReducer,
  },
});
