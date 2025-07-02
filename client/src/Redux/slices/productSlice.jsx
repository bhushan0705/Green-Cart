import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState:{
        // products :[],
        selectedProduct : [],
        categories: [],
        dummyProducts: [],
        dummyAddress :[],
    },
    reducers:{
        setSelectedProduct: (state, action)=>{
            state.selectedProduct = action.payload;
        },
        setCategories:(state, action)=>{
            state.categories = action.payload;
        },
        setDummyProducts:(state, action)=>{
            state.dummyProducts = action.payload;
        },
        // setDummyOrders:(state, action)=>{
        //     state.dummyProducts = action.payload;
        // },
        setDummyAddress:(state, action)=>{
            state.dummyAddress = action.payload;
        },
    }
})


export const {setProducts, setSelectedProduct, setCategories, setDummyProducts, setDummyOrders,setDummyAddress } = productSlice.actions;

export default productSlice.reducer;