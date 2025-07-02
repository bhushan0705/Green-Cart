import { createSlice } from "@reduxjs/toolkit";

// this slice for cart item (count)
const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const item = action.payload;
      const existingItem = state.cartItems.find(i => i._id === item._id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    increaseQuantity(state, action) {
      const item = state.cartItems.find(i => i._id === action.payload);
      if (item) {
        item.quantity += 1;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },

    decreaseQuantity(state, action) {
      const item = state.cartItems.find(i => i._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter(i => i._id !== action.payload);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeItem(state, action) {
      state.cartItems = state.cartItems.filter(i => i._id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    clearCart(state) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify([]));
    }
  }
});

export const {
  addItem,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
