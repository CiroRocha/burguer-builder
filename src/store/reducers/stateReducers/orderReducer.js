import * as actionTypes from '../../actions/actionTypes'
import { navigate } from '@reach/router'

const initialState = {
  orders: [],
  purchasingBurger: false,
  loadingOrders: false,
}

const reducer = (state = initialState, action ) => {
  switch ( action.type ) {

    // Burger purchaser handlers
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

      localStorage.removeItem('onCartBurger')
      localStorage.removeItem('onCartBurgerPrice')
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

    // Fetch orders handlers
    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loadingOrders: true,
      }

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loadingOrders: false,
      }

    case actionTypes.FETCH_ORDERS_FAILURE:
      return {
        ...state,
        loadingOrders: false,
      }

    default:
      return state
  }
}

export default reducer