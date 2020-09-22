import * as actions from './cartTypes'
const initialState = {
    items:0,
}

const reducer=(state=initialState ,action)=>{
    switch(action.type){
        case actions.UPDATE_CART_QUANTITY:{
            return {
                ...state,
                items:action.payload
            }
        }
        default: return state;
    }
}
export default reducer