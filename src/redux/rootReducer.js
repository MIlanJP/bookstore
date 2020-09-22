import {combineReducers} from 'redux'
import cartQuantity from './Cart/cardReducer'
const rootReducer=combineReducers({
    cardquantity:cartQuantity
})
export default rootReducer;