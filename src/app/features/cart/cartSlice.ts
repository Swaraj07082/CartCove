import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  cart: [
    {
      id: "",
      name: "",
      price: 0,
      quantity: 0,
    },
  ],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      const CartItem = {
        id: action.payload.id,
        name: action.payload.name,
        price: action.payload.price,
        quantity: action.payload.quantity,
        // payload itself is an object
      };
      state.cart.push(CartItem);
    },

    removeCartItem: (state, action) => {
      state.cart = state.cart.filter(
        (Cartitem) => Cartitem.id !== action.payload
      );
    },
    updateCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.cart.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
  },
});

export const { addCartItem, removeCartItem , updateCartItemQuantity } = cartSlice.actions;

export default cartSlice.reducer;
