import { createSlice } from '@reduxjs/toolkit';
import { notification } from 'antd';

export const CART_KEY = 'cart';

const cartSlice = createSlice({
  name: CART_KEY,
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
        notification.success({
          message: `Item Quantity Updated to ${existingItem.quantity}`,
          description: 'The item has been added to the cart.',
          placement:'bottomRight'
        });
      } else {
        state.items.push({ ...product, quantity: 1 });
        notification.success({
          message: 'Item Added',
          description: 'The item has been added to the cart.',
          placement:'bottomRight'
        });
      }

    },
    updateQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const item = state.items.find((item) => item.id === itemId);
      if (item) {
        item.quantity = quantity > 0 ? quantity : 0;
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
      notification.success({
        message: 'Item Removed',
        description: 'The item has been removed from the cart.',
        placement:'bottomRight'
      });
    },
    emptyCart: (state) => {
      state.items = [];
      notification.success({
        message: 'Removed all items from cart',
        description: 'All the items added to the cart has been removed.',
        placement:'bottomRight'
      });
    }
  },
});

export const { addToCart, updateQuantity, removeFromCart, emptyCart } = cartSlice.actions;
export const cartSelector = (state) => state.reducer.cart.items;
export const cartReducer = cartSlice.reducer;
