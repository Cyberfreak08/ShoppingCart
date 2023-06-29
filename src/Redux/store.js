import { combineReducers } from '@reduxjs/toolkit';
import { productReducer, PRODUCT_KEY } from './productSlice';
import { cartReducer, CART_KEY } from './cartSlice';

export const reducer = () => {
  return combineReducers({
    [PRODUCT_KEY]: productReducer,
    [CART_KEY]: cartReducer,
  });
};
