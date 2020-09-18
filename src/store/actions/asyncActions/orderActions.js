import * as actionTypes from '../actionTypes'

import axios from '../../../components/axios-orders'

export const purchaseBurger = ( orderData, token ) => {
  return dispatch => {
    dispatch({ type: actionTypes.PURCHASE_BURGER_START })
    axios.post( `/orders-placed.json?auth=${ token }`, orderData )
      .then(response => {
        dispatch({ type: actionTypes.PURCHASE_BURGER_SUCCESS, response: response, orderData })
      })
      .catch(error => {
        dispatch({ type: actionTypes.PURCHASE_BURGER_FAILURE, error: error })
      })
  }
}

export const fetchOrders = ( token ) => {
  return dispatch => {
    dispatch( fetchOrdersStart() )
    axios.get(`/orders-placed.json?auth=${ token }`)
      .then(response => {
        const allOrders = []
        for ( let key in response.data ) {
          const currentData = response.data[key]
          allOrders.push({
            ...currentData,
            id: key,
          })
        }
        return (
          dispatch( fetchOrdersSuccess(allOrders) )
        )
      })
      .catch(err => {
        return (
          dispatch( fetchOrdersFailure(err) )
        )
      })
  }
}

export const fetchOrdersStart = () => {
  return dispatch => {
    dispatch({ type: actionTypes.FETCH_ORDERS_START })
  }
}

export const fetchOrdersSuccess = ( orders ) => {
  return dispatch => {
    dispatch({ type: actionTypes.FETCH_ORDERS_SUCCESS, orders: orders })
  }
}

export const fetchOrdersFailure = ( error ) => {
  return dispatch => {
    dispatch({ type: actionTypes.FETCH_ORDERS_FAILURE, error: error })
  }
}