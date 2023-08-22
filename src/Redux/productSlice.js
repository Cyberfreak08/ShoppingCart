import { createSlice } from '@reduxjs/toolkit';
import { getProductsApi } from '../apis/product.api';
export const PRODUCT_KEY = "product";

const productSlice = createSlice({
  name: PRODUCT_KEY,
  initialState: {
    products: [],
  },
  reducers: {
    getProductsSuccess: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { getProductsSuccess } = productSlice.actions;
export const productSelector = (state) => state.reducer.product.products
export const productReducer = productSlice.reducer;

export const getProducts = () => {
    return async (dispatch) => {
          const modifiedData = await getProductsApi();
          dispatch(getProductsSuccess(modifiedData));      
    };
  };