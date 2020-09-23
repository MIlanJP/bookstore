import * as actions from './cartTypes'
const initialState = {
    items:0,
    itemsInCart:[]
}

const reducer=(state=initialState ,action)=>{
    switch(action.type){
        case actions.UPDATE_CART_QUANTITY:{
            return {
                ...state,
                items:action.payload
            }
        }

        case actions.ADD_BOOKS_TO_CART:{
           let lists= state.itemsInCart
           lists.push(action.payload)
            return {
                ...state,
                itemsInCart:[...lists]

            }
        }
        case actions.REMOVE_BOOK_FROM_CART:{
            return{
                ...state,
                itemsInCart:state.itemsInCart.filter(item =>item.id!==action.payload.id)
            }
        }
        case actions.SET_BOOKS_IN_CART:{
            return{
                ...state,
                itemsInCart:[...action.payload]
            }
        }
        default: return state;
    }
}
export default reducer