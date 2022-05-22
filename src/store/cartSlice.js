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
      //   console.log(action.payload);
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
    updateQuantity: (state, action) => {
      state.items = state.items.map((item) => {
        if (
          (item.produtId === action.payload.product.productId,
          item.size === action.payload.product.size)
        ) {
          //   console.log(item.qty, action.payload.newQty);
          item.qty = action.payload.newQty;
          return item;
        }
        return item;
      });
    },
    updateSize: (state, action) => {
      state.items = state.items.map((item) => {
        if (
          item.productId === action.payload.product.productId &&
          item.size === action.payload.product.size
        ) {
          item.size = action.payload.newSize;
          return item;
        }
        return item;
      });
    },
  },
});

export const { addProduct, removeProduct, updateQuantity, updateSize } =
  cartSlice.actions;
export default cartSlice.reducer;
