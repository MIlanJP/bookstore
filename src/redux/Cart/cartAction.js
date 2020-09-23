import * as actions from './cartTypes'

export function updateCartQuantity(quantity){
    return{
        type:actions.UPDATE_CART_QUANTITY,
        payload:quantity
    }
}

export function addBookToCart(book){
    return{
        type:actions.ADD_BOOKS_TO_CART,
        payload:book
    }
}
export function removeBookFromCart(book){
    return{
        type:actions.REMOVE_BOOK_FROM_CART,
        payload:book
    }
}
export function setBookInCart(books){
    return{
        type:actions.SET_BOOKS_IN_CART,
        payload:books
    }
}

export function setBookQuantityInCart(id,number){
    return{ 
        type:actions.UPDATE_BOOKS_QUANTITY_IN_CART,
        payload:{id,number}
    }
}