import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      if (state.items.length === 0) {
        state.items.push(action.payload);
      } else {
        let find = false;
        state.items.map((item) => {
          if (item.productId === action.payload.productId) {
            if (item.size === action.payload.size) {
              item.qty++;
              find = true;
            }
          }
        });
        if (!find) {
          state.items.unshift(action.payload);
        }
      }
    },
    removeProduct: (state, action) => {
      console.log(action.payload);
      state.items = state.items.filter((item) => {
        if (
          item.productId === action.payload.id &&
          item.size === action.payload.size
        ) {
          console.log("inside");
          return false;
        }
        return true;
      });
    },
  },
});

export const { addProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
