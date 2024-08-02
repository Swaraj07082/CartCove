import { createSlice } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  url: string;
}

// Initialize items to an empty array or load from localStorage if it exists
const initialItems: CartItem[] = [];

const loadInitialState = () => {
  if (typeof window !== "undefined") {
    // This check ensures the code only runs client-side
    const storedItems = localStorage.getItem("cartItems");
    if (storedItems) {
      return JSON.parse(storedItems) as CartItem[];
    }
  }
  return initialItems;
};

const initialState = {
  cart: loadInitialState(),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      const cartItem = {
        id: action.payload.id,
        name: action.payload.name,
        price: action.payload.price,
        quantity: action.payload.quantity,
        url: action.payload.url,
      };
      state.cart.push(cartItem);

      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(state.cart));
      }
    },

    removeCartItem: (state, action) => {
      state.cart = state.cart.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );

      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(state.cart));
      }
    },

    updateCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.cart.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(state.cart));
      }
    },
  },
});

export const { addCartItem, removeCartItem, updateCartItemQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
