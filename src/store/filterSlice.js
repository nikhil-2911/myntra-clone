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
    sort: [],
  },
  men: true,
  women: false,
  selectedProduct: {},
};

const filterSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
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
      if (state.filterQuery.sort.length !== 0) {
        let sortQuery = state.filterQuery.sort[0];
        if (sortQuery === "discount") {
          let products = state.products;
          state.products = products.sort(
            (a, b) =>
              parseInt(b.discountDisplayLabel.substring(1, 3)) -
              parseInt(a.discountDisplayLabel.substring(1, 3))
          );
        } else if (sortQuery === "price_asc") {
          let products = state.products;
          state.products = products.sort((a, b) => a.price - b.price);
        } else if (sortQuery === "price_desc") {
          let products = state.products;
          state.products = products.sort((a, b) => b.price - a.price);
        } else {
          let products = state.products;
          state.products = products.sort((a, b) => b.rating - a.rating);
        }
      }
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
    addSortValue: (state, action) => {
      if (state.filterQuery.sort.length === 0) {
        state.filterQuery.sort.push(action.payload);
      } else {
        state.filterQuery.sort[0] = action.payload;
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
    searchByInput: (state, action) => {
      if (action.payload === "") {
        state.products = state.products;
      } else {
        const words = action.payload.toLowerCase().split(" ");
        let products;
        if (state.men) {
          products = [...MenData.products];
        } else {
          products = [...WomenData.products];
        }
        const resultProducts = [];
        products.forEach((product) => {
          const input = product.productName.toLocaleLowerCase();
          let count = 0;
          words.forEach((word) => {
            const regex = new RegExp(word, "g");
            const response = input.match(regex);
            count =
              response !== null && response.length >= 1 ? count + 1 : count;
          });
          if (count === words.length) {
            resultProducts.push(product);
          }
        });
        state.products = resultProducts;
      }
    },
    saveSelectedProduct: (state, action) => {
      const product = action.payload;
      state.selectedProduct = product;
    },
    sortByDiscount: (state, action) => {
      let products = state.products;
      state.products = products.sort(
        (a, b) =>
          parseInt(b.discountDisplayLabel.substring(1, 3)) -
          parseInt(a.discountDisplayLabel.substring(1, 3))
      );
    },
    sortByIncreasingOrder: (state, action) => {
      let products = state.products;
      state.products = products.sort((a, b) => a.price - b.price);
    },
    sortByDecreasingOrder: (state, action) => {
      let products = state.products;
      state.products = products.sort((a, b) => b.price - a.price);
    },
    sortByCustomerRating: (state, action) => {
      let products = state.products;
      state.products = products.sort((a, b) => b.rating - a.rating);
    },
    clearFilters: (state, action) => {
      state.filterQuery.brand = [];
      state.filterQuery.price = [];
      state.filterQuery.color = [];
      state.filterQuery.sort = [];
    },
  },
});
export const {
  filterProducts,
  addSortValue,
  addBrandValue,
  removeBrandValue,
  addPriceValue,
  removePriceValue,
  addColorValue,
  removeColorValue,
  addFilters,
  clearFilters,
  sortByDiscount,
  sortByCustomerRating,
  sortByDecreasingOrder,
  sortByIncreasingOrder,
  searchByInput,
  saveSelectedProduct,
} = filterSlice.actions;
export default filterSlice.reducer;
