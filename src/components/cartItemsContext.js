import React from 'react'
const CartItemsContext=React.createContext();

export const CartItemsProvider=CartItemsContext.Provider;
export const CartItemsConsumer=CartItemsContext.Consumer;
export default CartItemsContext