import { getFromLocalStorage } from "@/lib/localStorage/localStorage";
import { createSlice } from "@reduxjs/toolkit";

// Helper function to load cart items from local storage
// const loadCartFromLocalStorage = () => {
//   const cartItems =
//     JSON.parse(localStorage.getItem("cartItems")) || [];
//   return cartItems;
// };

const cartSlice = createSlice({
  name: "cart",
  initialState: getFromLocalStorage("cartItems"), // Initialize with cart items from local storage
  reducers: {
    addToCart: (state: any, action) => {
      const newItem = action.payload;

      // Check if the product already exists in the cart
      const existingItemIndex = state?.findIndex(
        (item: any) => item.id === newItem.id
      );

      if (existingItemIndex !== -1) {
        // Replace the existing item with the new one
        state[existingItemIndex] = newItem;
      } else {
        // If the product is not in the cart, add it
        state.push(newItem);
      }
      localStorage.setItem(
        "cartItems",
        JSON.stringify(state)
      );
    },
    removeFromCart: (state: any, action) => {
      return state?.filter(
        (item: any) => item.id !== action.payload
      );
    },
    clearCart: () => {
      const newState: any = [];
      localStorage.removeItem("cartItems");
      return newState;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;