import { createSlice, nanoid } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  url : string
}

const items: CartItem[] =
  localStorage.getItem("cartItems") !== null
    ? JSON.parse(localStorage.getItem("cartItems") as string)
    : [];

// const initialState = {
//   cart: [
//     // {
//     //   id: "",
//     //   name: "",
//     //   price: 0,
//     //   quantity: 0,
//     // },
//   ] as CartItem[],
// };

const initialState = {
  cart: items,
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
        url : action.payload.url
        // payload itself is an object
      };
      state.cart.push(CartItem);

      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },

    removeCartItem: (state, action) => {
      state.cart = state.cart.filter(
        (Cartitem) => Cartitem.id !== action.payload.id
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },
    updateCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.cart.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },
  },
});

export const { addCartItem, removeCartItem, updateCartItemQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
