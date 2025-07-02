import { configureStore } from "@reduxjs/toolkit";
import productSliceReducer from "../slices/productSlice";
import itemReducer from "../slices/ItemSlice";
import addressSliceReducer from "../slices/addressSlice";
import filterProductReducer from "../slices/filterProduct";

export const store = configureStore({
        reducer:{
                product: productSliceReducer,
                cartItem : itemReducer,
                address: addressSliceReducer,
                filterProduct:filterProductReducer
        }
})