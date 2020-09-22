import * as actions from './cartTypes'

export function updateCartQuantity(quantity){
    return{
        type:actions.UPDATE_CART_QUANTITY,
        payload:quantity
    }
}