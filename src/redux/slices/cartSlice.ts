import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface Product {
    id:number;
    title:string;
    image:string;
    price:number;
}

interface CartItem extends Product{
    quantity:number
}
interface cartState {
    cartItems: CartItem[],
    totalAmount: number 
}

const initialState:cartState = {
    cartItems:[],
    totalAmount: 0,
}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart : (state,action:PayloadAction<Product>)=>{
            const exists = state.cartItems.find(item=>item.id === action.payload.id);
            if(exists){
               exists.quantity +=1;
            }else{
                state.cartItems.push({...action.payload,quantity:1})
            }
        },
        removeFromCart:(state,action:PayloadAction<number>)=>{
            state.cartItems = state.cartItems.filter(item=>item.id!==action.payload);
            // if(state.cartItems.length === 0){
            //     state.totalAmount = 0;
            // }
        },
        increaseQty:(state,action:PayloadAction<number>)=>{
            const item = state.cartItems.find(item=>item.id === action.payload);
            if(item){
                item.quantity+=1;
            }
        },
        decreaseQty:(state,action:PayloadAction<number>)=>{
            const item = state.cartItems.find(item=>item.id === action.payload);
            if(item){
               if(item.quantity>1){
                item.quantity-=1;
               }else{
                state.cartItems = state.cartItems.filter(item=>item.id !== action.payload);
               }
            }
        },
        clearCart:(state)=>{
            state.cartItems = [];
        },
        calculateTotal:(state)=>{
            const totalAmount = state.cartItems.reduce((amount,item)=>{
                return amount+(item.price*item.quantity)
            },0)
            state.totalAmount = totalAmount;
        }
    }
});

export const {addToCart,removeFromCart,increaseQty,decreaseQty,calculateTotal,clearCart} = cartSlice.actions;

export default cartSlice.reducer;