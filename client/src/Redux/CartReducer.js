import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  ungoingnotif:[],
  current:[],
  notif:[],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartAcc: (state, action) => {
      const { id,qnt, quantity } = action.payload;
      const existingItem = state.products.find((item) => item.id === id);
    if (existingItem) {
      const availableQuantity = qnt - existingItem.quantity;
      if (availableQuantity >= quantity) {
        existingItem.quantity += quantity;
      } else {
        // Handle case when quantity exceeds available quantity
        alert("Sorry sir, you reach the maximum of the quantity product")
      }
    } else {
      state.products.push(action.payload);
    }
    },
    
    addToCart: (state, action) => {
      const { id, tai, quantity } = action.payload;
      const item = state.products.find((item) => item.id === id && item.tai === tai);
    
      if (item) {
        if (item.qt > quantity) {
          item.qt -= quantity;
          item.quantity += quantity;
        }
        else{alert("Sorry sir, you reach the maximum of the quantity product")}
      } else {
        state.products.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      const { id, tai } = action.payload;
      state.products = state.products.filter((item) => !(item.id === id && item.tai === tai));
    },
    
    resetCart: (state) => {
      state.products = []
    },
    addTonot:(state, action)=>{
      state.notif.push(action.payload);
    },
    removenot: (state,action) => {
      state.notif= []
    },
    
    addcurrent: (state, action) => {
      if (state.current.length === 0) {
        state.current.push(action.payload);
      }
    },
    removeuser: (state,action) => {
      state.current= []
    },
    addnotif: (state, action) => {
        state.notif.push(action.payload);
    },
    removenotif: (state,action) => {
      state.notif= []

    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart,removeItem,resetCart,addTonot,removenot,addcurrent,removeuser,resetLike,addnotif,removenotif,addToCartAcc} = cartSlice.actions;

export default cartSlice.reducer;