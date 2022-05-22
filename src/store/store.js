import { configureStore } from "@reduxjs/toolkit";

// Reducers
import filterReducer from "./filterSlice";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";

export const store = configureStore({
  reducer: {
    product: filterReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});
