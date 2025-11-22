import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [] }; // {id,title,price,quantity}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload; // {id,title,price}
      const found = state.items.find((x) => x.id === item.id);
      if (found) found.quantity += 1;
      else state.items.push({ ...item, quantity: 1 });
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((x) => x.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
