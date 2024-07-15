import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./cartSlics";

export default configureStore({
    reducer: {
        cart: cartSlice.reducer
    }
});