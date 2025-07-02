import { createSlice } from "@reduxjs/toolkit";

const filterProduct = createSlice({
  name: "filterAllProduct",
  initialState: {
    all: [],
    filtered: [],
  },
  reducers: {
    setAllProducts: (state, action) => {
      state.all = action.payload;
      state.filtered = action.payload;
    },
    filterProducts: (state, action) => {
      const keyword = action.payload.toLowerCase();
      state.filtered = state.all.filter((item) =>
        item.name.toLowerCase().includes(keyword)
      );
    },
  },
});

export const { setAllProducts, filterProducts } = filterProduct.actions;

export default filterProduct.reducer;
