import { useReducer } from "react";

import CartContext from "./cart-context"

const defaultCartState = {
    items:[],
    totalAmount:0
};

const cartReducer = (state,action) =>{
    if(action.type==="ADD"){

        const updatedAmount = state.totalAmount+ (action.item.price * action.item.amount);
        const updatedItemIndex = state.items.findIndex( item => item.id === action.item.id);

        const existingItem = state.items[updatedItemIndex];
        let updatedItems;

        if(existingItem){
            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount + action.item.amount
            };
            updatedItems=[...state.items];
            updatedItems[updatedItemIndex]=updatedItem;
        }else{
            updatedItems=state.items.concat(action.item);
        }
        
        return {
            items:updatedItems,
            totalAmount:updatedAmount
        };
    }
    if(action.type === "REMOVE"){
        const existingItemIndex = state.items.findIndex(item => item.id === action.id);
        const existingItem=state.items[existingItemIndex];
        const updatedAmount=state.totalAmount-existingItem.price;
        let updatedItems;
        if(existingItem.amount === 1){
            updatedItems=state.items.filter(item => item.id !== action.id);
        }else{
            const updatedItem={
                ...existingItem,
                amount: existingItem.amount-1
            };
            updatedItems=[...state.items];
            updatedItems[existingItemIndex]=updatedItem;
        };

        return {
            items:updatedItems,
            totalAmount:updatedAmount
        };
    }
    return defaultCartState;
};

const CartContextProvider = props =>{

    const [cartState,dispatchCartAction]=useReducer(cartReducer,defaultCartState);

    const addItemToCartHandler = (item) => {
        dispatchCartAction({
            type:"ADD",
            item:item
        });
    };

    const removeItemFromCartHandler = (id) =>{
        dispatchCartAction({
            type:"REMOVE",
            id:id
        });
    };
 
    const cartContext = {
        items:cartState.items,
        totalAmount:cartState.totalAmount,
        addItems:addItemToCartHandler,
        removeItems:removeItemFromCartHandler
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContextProvider