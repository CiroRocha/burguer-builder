import * as actionTypes from '../../actions/actionTypes'
import { navigate } from '@reach/router'

const initialState = {
  orders: [],
  purchasingBurger: false,
}

const reducer = (state = initialState, action ) => {
  switch ( action.type ) {

    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        purchasingBurger: true,
      }

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId,
      }

      localStorage.clear()
      navigate('/')

      return {
        ...state,
        purchasingBurger: false,
        orders: state.orders.concat(newOrder),
      }

    case actionTypes.PURCHASE_BURGER_FAILURE:
      return {
        ...state,
        purchasingBurger: false,
      }

    default:
      return state
  }
}

export default reducer